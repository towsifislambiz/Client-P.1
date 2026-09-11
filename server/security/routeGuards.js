// server/security/routeGuards.js
// Specialized Route Guards: Auth Brute-Force, Payment Idempotency & Inquiry Spam Protectors

import { SECURITY_CONFIG } from "./securityConfig.js";
import redisService from "./redisService.js";
import securityEvents from "./securityEvents.js";
import { getCurrentAttackMode } from "./ddosShield.js";

// 1. Auth Guard (Strict Brute-Force Shield for /api/auth/login)
export async function authGuard(req, res, next) {
  const clientIp = req.clientIp || req.ip || "unknown";
  const currentMode = await getCurrentAttackMode();
  const limits = currentMode === "under_attack" ? SECURITY_CONFIG.limits.underAttack.auth : SECURITY_CONFIG.limits.normal.auth;

  try {
    const authKey = `rate:auth:${clientIp}`;
    const attemptCount = await redisService.incr(authKey);
    if (attemptCount === 1) {
      await redisService.expire(authKey, Math.ceil(limits.windowMs / 1000));
    }

    if (attemptCount > limits.max) {
      const ttl = await redisService.ttl(authKey);

      await securityEvents.logEvent({
        eventType: "AUTH_BRUTE_FORCE",
        severity: "CRITICAL",
        ip: clientIp,
        method: req.method,
        route: req.path,
        statusCode: 429,
        reason: `Excessive failed login attempts (${attemptCount}/${limits.max}). Lockout active.`,
        userAgent: req.headers["user-agent"],
        requestId: req.requestId,
      });

      res.setHeader("Retry-After", Math.max(1, ttl));
      return res.status(429).json({
        success: false,
        error: "AUTH_RATE_LIMIT",
        message: `অতিরিক্ত লগইন চেষ্টার কারণে অ্যাক্সেস সাময়িকভাবে লক করা হয়েছে। ${Math.ceil(ttl / 60)} মিনিট পর চেষ্টা করুন।`,
        retryAfterSeconds: ttl,
        requestId: req.requestId,
      });
    }

    // Payload sanity check
    const { email, password } = req.body || {};
    if (email && typeof email === "string" && email.length > 255) {
      return res.status(400).json({ success: false, message: "অবৈধ ইমেইল ফরম্যাট" });
    }
    if (password && typeof password === "string" && password.length > 255) {
      return res.status(400).json({ success: false, message: "অবৈধ পাসওয়ার্ড ফরম্যাট" });
    }

    next();
  } catch (err) {
    console.error("[Auth Guard] Error:", err.message);
    next();
  }
}

// 2. Payment Guard (Protects /api/settings/payments with Replay & Rate Protection)
export async function paymentGuard(req, res, next) {
  const clientIp = req.clientIp || req.ip || "unknown";
  const currentMode = await getCurrentAttackMode();
  const limits = currentMode === "under_attack" ? SECURITY_CONFIG.limits.underAttack.payment : SECURITY_CONFIG.limits.normal.payment;

  try {
    // Rate limit
    const payKey = `rate:payment:${clientIp}`;
    const count = await redisService.incr(payKey);
    if (count === 1) {
      await redisService.expire(payKey, Math.ceil(limits.windowMs / 1000));
    }

    if (count > limits.max) {
      const ttl = await redisService.ttl(payKey);
      res.setHeader("Retry-After", Math.max(1, ttl));
      return res.status(429).json({
        success: false,
        error: "PAYMENT_RATE_LIMIT",
        message: "বিল অনুসন্ধান বা পেমেন্ট জমার অতিরিক্ত রিকোয়েস্ট। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।",
        retryAfterSeconds: ttl,
        requestId: req.requestId,
      });
    }

    // Idempotency & Replay Attack Protection for POST payments
    if (req.method === "POST") {
      const { customerId, phone, amount, trxId } = req.body || {};

      // Input Validation
      if (!customerId || !phone || !amount || !trxId) {
        return res.status(400).json({
          success: false,
          message: "সবগুলো ঘর সঠিকভাবে পূরণ করুন (Customer ID, Phone, Amount, TrxID required)",
        });
      }

      if (typeof trxId === "string" && trxId.trim()) {
        const cleanTrx = trxId.trim().toUpperCase();
        const trxKey = `trx:seen:${cleanTrx}`;
        const alreadySeen = await redisService.get(trxKey);

        if (alreadySeen) {
          await securityEvents.logEvent({
            eventType: "SUSPICIOUS_REQUEST",
            severity: "HIGH",
            ip: clientIp,
            method: "POST",
            route: req.path,
            statusCode: 409,
            reason: `Replay submission detected for TrxID: ${cleanTrx}`,
            userAgent: req.headers["user-agent"],
            requestId: req.requestId,
          });

          return res.status(409).json({
            success: false,
            error: "DUPLICATE_TRANSACTION",
            message: "এই ট্রানজ্যাকশন আইডি (TrxID) ইতিপূর্বে জমা দেওয়া হয়েছে। অনুগ্রহ করে যাচাই করুন।",
            requestId: req.requestId,
          });
        }

        // Lock TrxID for 15 minutes to prevent concurrent race-condition replay
        await redisService.set(trxKey, "processed", "EX", 900);
      }
    }

    next();
  } catch (err) {
    console.error("[Payment Guard] Error:", err.message);
    next();
  }
}

// 3. Inquiry Guard (Protects /api/settings/inquiries against Form Flooding)
export async function inquiryGuard(req, res, next) {
  const clientIp = req.clientIp || req.ip || "unknown";
  const currentMode = await getCurrentAttackMode();
  const limits = currentMode === "under_attack" ? SECURITY_CONFIG.limits.underAttack.inquiry : SECURITY_CONFIG.limits.normal.inquiry;

  try {
    const inqKey = `rate:inquiry:${clientIp}`;
    const count = await redisService.incr(inqKey);
    if (count === 1) {
      await redisService.expire(inqKey, Math.ceil(limits.windowMs / 1000));
    }

    if (count > limits.max) {
      const ttl = await redisService.ttl(inqKey);
      res.setHeader("Retry-After", Math.max(1, ttl));
      return res.status(429).json({
        success: false,
        error: "INQUIRY_RATE_LIMIT",
        message: "অতিরিক্ত অনুসন্ধান রিকোয়েস্ট গ্রহণ করা যাবে না। কিছুক্ষণ পর চেষ্টা করুন।",
        retryAfterSeconds: ttl,
        requestId: req.requestId,
      });
    }

    // Input Validation for POST
    if (req.method === "POST") {
      const { name, phone, message } = req.body || {};
      if (!name || !phone || (req.path.includes("contact") && !message)) {
        return res.status(400).json({
          success: false,
          message: "নাম এবং মোবাইল নম্বর দেওয়া আবশ্যক",
        });
      }

      // Check lengths to prevent payload ballooning
      if (typeof name === "string" && name.length > 100) {
        return res.status(400).json({ success: false, message: "নাম ১০০ অক্ষরের মধ্যে হতে হবে" });
      }
      if (typeof phone === "string" && (phone.length < 6 || phone.length > 25)) {
        return res.status(400).json({ success: false, message: "সঠিক মোবাইল নম্বর দিন" });
      }
      if (typeof message === "string" && message.length > 1500) {
        return res.status(400).json({ success: false, message: "বার্তা ১৫০০ অক্ষরের মধ্যে হতে হবে" });
      }
    }

    next();
  } catch (err) {
    console.error("[Inquiry Guard] Error:", err.message);
    next();
  }
}
