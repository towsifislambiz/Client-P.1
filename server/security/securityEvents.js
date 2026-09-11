// server/security/securityEvents.js
// Centralized Security Event System, Telemetry Tracker & Audit Logger

import crypto from "crypto";
import redisService from "./redisService.js";
import { SECURITY_CONFIG } from "./securityConfig.js";

class SecurityEvents {
  constructor() {
    this.events = [];
    this.telemetry = {
      totalRequests: 0,
      allowedRequests: 0,
      blockedRequests: 0,
      rateLimitedCount: 0,
      quarantinedCount: 0,
      botBlockedCount: 0,
      authAttacksCount: 0,
      probeBlockedCount: 0,
      attackModeToggles: 0,
      serverStartedAt: new Date().toISOString(),
    };
  }

  // Log a structured security event
  async logEvent({
    eventType,
    severity = "MEDIUM",
    ip,
    method = "GET",
    route = "/",
    statusCode = 400,
    reason = "",
    userAgent = "",
    requestId = "",
  }) {
    const event = {
      id: `sec-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`,
      timestamp: new Date().toISOString(),
      eventType,
      severity: severity.toUpperCase(), // "CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"
      ip: ip || "unknown",
      method,
      route,
      statusCode,
      reason,
      userAgent: userAgent ? userAgent.substring(0, 150) : "none",
      requestId,
    };

    // Update telemetry counts
    this.telemetry.totalRequests++;
    this.telemetry.blockedRequests++;

    switch (eventType) {
      case "RATE_LIMIT":
        this.telemetry.rateLimitedCount++;
        break;
      case "IP_QUARANTINED":
        this.telemetry.quarantinedCount++;
        break;
      case "BOT_BLOCKED":
        this.telemetry.botBlockedCount++;
        break;
      case "AUTH_BRUTE_FORCE":
        this.telemetry.authAttacksCount++;
        break;
      case "SCANNER_PROBE":
        this.telemetry.probeBlockedCount++;
        break;
      default:
        break;
    }

    // Add to in-memory bounded ring buffer
    this.events.unshift(event);
    if (this.events.length > SECURITY_CONFIG.maxStoredEvents) {
      this.events.pop();
    }

    // Persist event in Redis / Upstash if active
    try {
      const redisKey = `sec:event:${event.id}`;
      await redisService.set(redisKey, JSON.stringify(event), "EX", 86400 * 3); // 3 days retention
    } catch (e) {
      // Non-blocking
    }

    return event;
  }

  // Record a passed legitimate request
  recordAllowedRequest() {
    this.telemetry.totalRequests++;
    this.telemetry.allowedRequests++;
  }

  // Get telemetry statistics
  async getTelemetry(currentAttackMode = "normal") {
    // Check total active quarantined IPs
    let activeQuarantineCount = 0;
    try {
      const keys = await redisService.keys("quarantine:*");
      activeQuarantineCount = keys.length;
    } catch {
      activeQuarantineCount = 0;
    }

    return {
      ...this.telemetry,
      activeQuarantinedIps: activeQuarantineCount,
      currentMode: currentAttackMode,
      uptimeSeconds: Math.floor((Date.now() - new Date(this.telemetry.serverStartedAt).getTime()) / 1000),
      timestamp: new Date().toISOString(),
    };
  }

  // Get paginated / filtered security events
  async getEvents({ severity, eventType, limit = 50, page = 1 }) {
    let filtered = [...this.events];

    if (severity && severity !== "ALL") {
      filtered = filtered.filter(e => e.severity === severity.toUpperCase());
    }

    if (eventType && eventType !== "ALL") {
      filtered = filtered.filter(e => e.eventType === eventType);
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const items = filtered.slice(startIndex, startIndex + limit);

    return {
      total,
      page,
      limit,
      events: items,
    };
  }

  // Clear events
  clearEvents() {
    this.events = [];
  }
}

const securityEvents = new SecurityEvents();
export default securityEvents;
