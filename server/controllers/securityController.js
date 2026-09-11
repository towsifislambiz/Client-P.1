// server/controllers/securityController.js
// Security Operations Center (SOC) Controller for Link BD Admin Panel

import securityEvents from "../security/securityEvents.js";
import redisService from "../security/redisService.js";
import { getCurrentAttackMode, setAttackMode } from "../security/ddosShield.js";
import dataService from "../services/dataService.js";

// GET /api/security/status
export async function getSecurityStatus(req, res, next) {
  try {
    const currentMode = await getCurrentAttackMode();
    const redisStatus = redisService.getStatus();
    const isCloudflare = Boolean(req.isCloudflare || req.headers["cf-ray"]);

    res.status(200).json({
      success: true,
      data: {
        applicationShield: "ACTIVE",
        protectionLayer: "Layer 7 DDoS & Application Shield",
        currentMode,
        redisStatus,
        cloudflareEdge: {
          detected: isCloudflare,
          status: isCloudflare ? "CONNECTED" : "NOT_CONNECTED",
          cfRay: req.headers["cf-ray"] || null,
          note: isCloudflare
            ? "Cloudflare Edge Anycast proxy detected and protecting origin."
            : "Cloudflare proxy not detected on this request. See setup guide to enable Edge Anycast.",
        },
        activeDefenses: [
          { name: "Layer 7 Request Flood Mitigation", status: "ACTIVE", type: "Rate Limiter" },
          { name: "Distributed Rate Limiting Engine", status: redisStatus.connected ? "ACTIVE (Redis)" : "ACTIVE (In-Memory Fallback)", type: "Rate Limiter" },
          { name: "Brute-Force Authentication Shield", status: "ACTIVE", type: "Auth Guard" },
          { name: "Slowloris / Slow HTTP Connection Timeout", status: "ACTIVE", type: "Network Timeout" },
          { name: "Malicious Bot & Vulnerability Scanner Blocker", status: "ACTIVE", type: "Bot Shield" },
          { name: "Exploit Path & Sensitive Probe Trap", status: "ACTIVE", type: "Path Trap" },
          { name: "HTTP Parameter & Security Headers (Helmet)", status: "ACTIVE", type: "Headers" },
          { name: "Payment Replay & Idempotency Lock", status: "ACTIVE", type: "Payment Guard" },
          { name: "Automatic Temporary IP Quarantine (TTL-based)", status: "ACTIVE", type: "Quarantine" },
        ],
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/security/stats
export async function getSecurityStats(req, res, next) {
  try {
    const currentMode = await getCurrentAttackMode();
    const telemetry = await securityEvents.getTelemetry(currentMode);

    res.status(200).json({
      success: true,
      data: telemetry,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/security/events
export async function getSecurityEvents(req, res, next) {
  try {
    const { severity, eventType, limit, page } = req.query;
    const result = await securityEvents.getEvents({
      severity,
      eventType,
      limit: parseInt(limit || "50", 10),
      page: parseInt(page || "1", 10),
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/security/blocked-ips
export async function getBlockedIps(req, res, next) {
  try {
    const keys = await redisService.keys("quarantine:*");
    const blockedList = [];

    for (const key of keys) {
      const ip = key.replace("quarantine:", "");
      const reason = (await redisService.get(key)) || "Abuse violation";
      const ttl = await redisService.ttl(key);

      blockedList.push({
        ip,
        reason,
        remainingSeconds: ttl,
        expiresAt: new Date(Date.now() + Math.max(0, ttl) * 1000).toISOString(),
        status: "QUARANTINED",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        total: blockedList.length,
        items: blockedList,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/security/toggle-attack-mode
export async function toggleAttackMode(req, res, next) {
  try {
    const { mode } = req.body;
    const targetMode = mode === "under_attack" ? "under_attack" : "normal";
    const updated = await setAttackMode(targetMode);

    // Record audit event
    await securityEvents.logEvent({
      eventType: targetMode === "under_attack" ? "ATTACK_MODE_ENABLED" : "ATTACK_MODE_DISABLED",
      severity: targetMode === "under_attack" ? "CRITICAL" : "INFO",
      ip: req.clientIp || "admin",
      method: "POST",
      route: req.path,
      statusCode: 200,
      reason: `Admin toggled attack mode to: ${targetMode}`,
      userAgent: req.headers["user-agent"],
      requestId: req.requestId,
    });

    dataService.logActivity(
      "security",
      `Security Attack Mode Changed: ${targetMode.toUpperCase()}`,
      `Triggered by Admin (${req.admin?.email || "Admin User"})`
    );

    res.status(200).json({
      success: true,
      message: targetMode === "under_attack"
        ? "Emergency 'Under Attack Mode' সক্রিয় করা হয়েছে। রেট লিমিট সর্বোচ্চ কড়াকড়ি করা হয়েছে।"
        : "স্বাভাবিক সুরক্ষা মোড (Normal Protection) সক্রিয় করা হয়েছে।",
      currentMode: updated,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/security/unblock-ip
export async function unblockIp(req, res, next) {
  try {
    const { ip } = req.body;
    if (!ip) {
      return res.status(400).json({ success: false, message: "IP address is required" });
    }

    const cleanIp = ip.trim();
    const key = `quarantine:${cleanIp}`;
    await redisService.del(key, `rate:global:${cleanIp}`, `burst:${cleanIp}`, `abuse:${cleanIp}`);

    await securityEvents.logEvent({
      eventType: "ADMIN_SECURITY_ACTION",
      severity: "INFO",
      ip: cleanIp,
      method: "POST",
      route: req.path,
      statusCode: 200,
      reason: `Admin unblocked IP: ${cleanIp}`,
      userAgent: req.headers["user-agent"],
      requestId: req.requestId,
    });

    dataService.logActivity("security", `Unblocked IP: ${cleanIp}`, `Admin unblocked quarantined IP`);

    res.status(200).json({
      success: true,
      message: `আইপি ${cleanIp} সফলভাবে আনব্লক করা হয়েছে।`,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/security/clear-blacklist
export async function clearBlacklist(req, res, next) {
  try {
    const keys = await redisService.keys("quarantine:*");
    const burstKeys = await redisService.keys("burst:*");
    const abuseKeys = await redisService.keys("abuse:*");
    const allKeysToClear = [...keys, ...burstKeys, ...abuseKeys];

    if (allKeysToClear.length > 0) {
      await redisService.del(...allKeysToClear);
    }

    await securityEvents.logEvent({
      eventType: "ADMIN_SECURITY_ACTION",
      severity: "INFO",
      ip: req.clientIp || "admin",
      method: "POST",
      route: req.path,
      statusCode: 200,
      reason: `Admin cleared all ${keys.length} quarantined IPs`,
      userAgent: req.headers["user-agent"],
      requestId: req.requestId,
    });

    dataService.logActivity("security", "Cleared all quarantined IPs", `Unblocked ${keys.length} IPs`);

    res.status(200).json({
      success: true,
      message: `সকল কোয়ারেন্টাইনকৃত (${keys.length}টি) আইপি মুক্ত করা হয়েছে।`,
      clearedCount: keys.length,
    });
  } catch (err) {
    next(err);
  }
}
