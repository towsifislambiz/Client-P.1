// server/security/ddosShield.js
// Central Layer-7 DDoS, Rate Limiter, Malicious Scanner & Quarantine Middleware

import crypto from "crypto";
import { SECURITY_CONFIG } from "./securityConfig.js";
import redisService from "./redisService.js";
import securityEvents from "./securityEvents.js";
import { resolveClientIp } from "./ipResolver.js";

// Attack Mode State Manager
let inMemoryAttackMode = SECURITY_CONFIG.defaultMode;

export async function getCurrentAttackMode() {
  try {
    const mode = await redisService.get("security:attack_mode");
    if (mode === "under_attack" || mode === "normal") {
      inMemoryAttackMode = mode;
      return mode;
    }
  } catch {
    // Fallback to in-memory state
  }
  return inMemoryAttackMode;
}

export async function setAttackMode(newMode) {
  if (newMode !== "normal" && newMode !== "under_attack") {
    throw new Error("Invalid attack mode. Must be 'normal' or 'under_attack'");
  }
  inMemoryAttackMode = newMode;
  try {
    await redisService.set("security:attack_mode", newMode);
  } catch {
    // Fail safe
  }
  return inMemoryAttackMode;
}

// Main DDoS & Bot Shield Middleware
export async function ddosShieldMiddleware(req, res, next) {
  // 1. Assign or validate X-Request-ID
  const incomingReqId = req.headers["x-request-id"];
  const requestId = (typeof incomingReqId === "string" && incomingReqId.length < 64)
    ? incomingReqId
    : `req-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

  req.requestId = requestId;
  res.setHeader("X-Request-ID", requestId);

  // 2. Resolve verified client IP
  const { clientIp, isCloudflare } = resolveClientIp(req);
  const userAgent = req.headers["user-agent"] || "";
  const urlPath = req.path || req.url || "/";
  const currentMode = await getCurrentAttackMode();
  const limits = currentMode === "under_attack" ? SECURITY_CONFIG.limits.underAttack : SECURITY_CONFIG.limits.normal;

  // Set Security Header indicator
  res.setHeader("X-Shield-Protection", "Active-L7");
  res.setHeader("X-Shield-Mode", currentMode);

  // 3. Quarantine Check: Is this IP actively quarantined?
  try {
    const quarantineKey = `quarantine:${clientIp}`;
    const isQuarantined = await redisService.get(quarantineKey);
    if (isQuarantined) {
      const ttl = await redisService.ttl(quarantineKey);
      res.setHeader("Retry-After", Math.max(1, ttl));

      await securityEvents.logEvent({
        eventType: "IP_QUARANTINED",
        severity: "HIGH",
        ip: clientIp,
        method: req.method,
        route: urlPath,
        statusCode: 403,
        reason: `IP temporarily quarantined (${ttl}s remaining)`,
        userAgent,
        requestId,
      });

      return res.status(403).json({
        success: false,
        error: "ACCESS_QUARANTINED",
        message: "আপনার আইপি সাময়িকভাবে কোয়ারেন্টাইন করা হয়েছে। (Your IP is temporarily quarantined due to detected flood/abuse patterns).",
        retryAfterSeconds: ttl,
        requestId,
      });
    }
  } catch (err) {
    console.error("[DDoS Shield] Quarantine check error:", err.message);
  }

  // 4. Malicious Scanner & Vulnerability Probing Filter
  // Check User-Agent
  for (const sig of SECURITY_CONFIG.scannerSignatures) {
    if (sig.test(userAgent)) {
      await securityEvents.logEvent({
        eventType: "BOT_BLOCKED",
        severity: "CRITICAL",
        ip: clientIp,
        method: req.method,
        route: urlPath,
        statusCode: 403,
        reason: `Malicious scanner signature detected in User-Agent: ${userAgent.substring(0, 50)}`,
        userAgent,
        requestId,
      });

      // Instantly quarantine aggressive automated scanners (except local loopback)
      if (clientIp !== "127.0.0.1") {
        try {
          await redisService.set(`quarantine:${clientIp}`, "scanner_detected", "EX", SECURITY_CONFIG.quarantineDurationSeconds);
        } catch {}
      }

      return res.status(403).json({
        success: false,
        error: "SCANNER_BLOCKED",
        message: "অননুমোদিত স্ক্যানার টুল ব্লক করা হয়েছে (Automated malicious tool blocked).",
        requestId,
      });
    }
  }

  // Check Sensitive Probing Paths (e.g. /.env, /wp-admin, /phpmyadmin)
  for (const probeRegex of SECURITY_CONFIG.sensitiveProbePaths) {
    if (probeRegex.test(urlPath)) {
      await securityEvents.logEvent({
        eventType: "SCANNER_PROBE",
        severity: "HIGH",
        ip: clientIp,
        method: req.method,
        route: urlPath,
        statusCode: 404,
        reason: `Probing suspicious non-existent path: ${urlPath}`,
        userAgent,
        requestId,
      });

      // Record strike for this probing IP
      try {
        const probeKey = `probes:${clientIp}`;
        const probeCount = await redisService.incr(probeKey);
        if (probeCount === 1) await redisService.expire(probeKey, 120);

        if (probeCount >= 3 && clientIp !== "127.0.0.1") {
          await redisService.set(`quarantine:${clientIp}`, "path_probing", "EX", SECURITY_CONFIG.quarantineDurationSeconds);
        }
      } catch {}

      return res.status(404).json({
        success: false,
        error: "NOT_FOUND",
        message: "পাওয়া যায়নি (Resource not found)",
        requestId,
      });
    }
  }

  // Skip strict rate limiting on static assets and health checks
  if (urlPath.startsWith("/uploads/") || urlPath.startsWith("/assets/") || urlPath === "/api/health") {
    securityEvents.recordAllowedRequest();
    return next();
  }

  // 5. Burst Rate Limiter (Detect sudden spikes: e.g. 45 reqs in 3 seconds)
  try {
    const burstKey = `burst:${clientIp}`;
    const burstCount = await redisService.incr(burstKey);
    if (burstCount === 1) {
      await redisService.expire(burstKey, Math.ceil(limits.burstWindowMs / 1000));
    }

    if (burstCount > limits.burstMax) {
      // Immediate quarantine on burst flood! (except local loopback)
      if (clientIp !== "127.0.0.1") {
        await redisService.set(`quarantine:${clientIp}`, "burst_flood", "EX", SECURITY_CONFIG.quarantineDurationSeconds);
      }

      await securityEvents.logEvent({
        eventType: "RATE_LIMIT",
        severity: "CRITICAL",
        ip: clientIp,
        method: req.method,
        route: urlPath,
        statusCode: 429,
        reason: `Burst flood detected (${burstCount} reqs in ${limits.burstWindowMs / 1000}s). Instant quarantine applied.`,
        userAgent,
        requestId,
      });

      res.setHeader("Retry-After", SECURITY_CONFIG.quarantineDurationSeconds);
      return res.status(429).json({
        success: false,
        error: "BURST_LIMIT_EXCEEDED",
        message: "অতিরিক্ত দ্রুত রিকোয়েস্ট পাঠানোর কারণে সংযোগ সীমিত করা হয়েছে।",
        retryAfterSeconds: SECURITY_CONFIG.quarantineDurationSeconds,
        requestId,
      });
    }
  } catch (err) {
    console.error("[DDoS Shield] Burst check error:", err.message);
  }

  // 6. Global Sliding Window Rate Limiter
  try {
    const windowSec = Math.ceil(limits.global.windowMs / 1000);
    const globalKey = `rate:global:${clientIp}`;
    const requestCount = await redisService.incr(globalKey);
    if (requestCount === 1) {
      await redisService.expire(globalKey, windowSec);
    }

    res.setHeader("X-RateLimit-Limit", limits.global.max);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, limits.global.max - requestCount));

    if (requestCount > limits.global.max) {
      // Record abuse strike
      const abuseKey = `abuse:${clientIp}`;
      const abuseCount = await redisService.incr(abuseKey);
      if (abuseCount === 1) await redisService.expire(abuseKey, 300); // 5 mins abuse window

      let isNowQuarantined = false;
      if (abuseCount >= limits.abuseThreshold && clientIp !== "127.0.0.1") {
        await redisService.set(`quarantine:${clientIp}`, "rate_limit_abuse", "EX", SECURITY_CONFIG.quarantineDurationSeconds);
        isNowQuarantined = true;
      }

      await securityEvents.logEvent({
        eventType: "RATE_LIMIT",
        severity: isNowQuarantined ? "CRITICAL" : "MEDIUM",
        ip: clientIp,
        method: req.method,
        route: urlPath,
        statusCode: 429,
        reason: isNowQuarantined
          ? `Repeated rate limit breach. Quarantined for ${SECURITY_CONFIG.quarantineDurationSeconds}s.`
          : `Global rate limit exceeded (${requestCount}/${limits.global.max} in ${windowSec}s)`,
        userAgent,
        requestId,
      });

      const ttl = await redisService.ttl(globalKey);
      res.setHeader("Retry-After", Math.max(1, ttl));

      return res.status(429).json({
        success: false,
        error: "RATE_LIMIT_EXCEEDED",
        message: "প্রতি মিনিটে অনুমোদিত রিকোয়েস্ট সীমা অতিক্রম করেছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",
        retryAfterSeconds: Math.max(1, ttl),
        quarantined: isNowQuarantined,
        requestId,
      });
    }
  } catch (err) {
    console.error("[DDoS Shield] Global rate limiter error:", err.message);
  }

  // Record allowed request
  securityEvents.recordAllowedRequest();
  next();
}
