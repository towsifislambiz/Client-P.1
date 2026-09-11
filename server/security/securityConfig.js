// server/security/securityConfig.js
// Centralized Security Configuration for Link BD ISP Defense-in-Depth Shield

export const SECURITY_CONFIG = {
  serviceName: "Link BD ISP DDoS & Cyber Shield",
  version: "2.0.0",

  // Attack Mode: "normal" | "under_attack"
  defaultMode: process.env.ATTACK_MODE === "true" ? "under_attack" : "normal",

  // Rate Limiting Config: Normal Mode vs Emergency "Under Attack Mode"
  limits: {
    normal: {
      global: {
        windowMs: 60 * 1000, // 1 minute
        max: parseInt(process.env.GLOBAL_RATE_LIMIT || "200", 10), // 200 reqs/min
      },
      auth: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: parseInt(process.env.AUTH_RATE_LIMIT || "10", 10), // 10 attempts
      },
      payment: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: parseInt(process.env.PAYMENT_RATE_LIMIT || "15", 10), // 15 submissions
      },
      inquiry: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: parseInt(process.env.INQUIRY_RATE_LIMIT || "20", 10), // 20 inquiries
      },
      upload: {
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 20,
      },
      // Burst Detection: Max requests allowed in 3 seconds from same IP
      burstWindowMs: 3 * 1000,
      burstMax: 45,
      // Number of rate-limit violations before triggering temporary quarantine
      abuseThreshold: 3,
    },
    underAttack: {
      global: {
        windowMs: 60 * 1000, // 1 minute
        max: parseInt(process.env.ATTACK_MODE_RATE_LIMIT || "60", 10), // 60 reqs/min
      },
      auth: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5,
      },
      payment: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5,
      },
      inquiry: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 8,
      },
      upload: {
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 5,
      },
      burstWindowMs: 3 * 1000,
      burstMax: 20,
      abuseThreshold: 1, // immediate quarantine on abuse in emergency mode
    },
  },

  // Quarantine Duration: How long an abusive IP stays blocked (seconds)
  quarantineDurationSeconds: parseInt(process.env.QUARANTINE_DURATION || "900", 10), // 15 minutes default

  // Payload Limits
  payloadLimits: {
    defaultBody: "2mb", // General API body limit
    authBody: "64kb",   // Login payload limit
    inquiryBody: "128kb",
    paymentBody: "128kb",
    uploadMaxBytes: parseInt(process.env.UPLOAD_MAX_SIZE || "5242880", 10), // 5MB
  },

  // Slow HTTP / Slowloris Mitigation Timeouts (ms)
  timeouts: {
    headersTimeout: 20000,   // 20 seconds
    requestTimeout: 30000,   // 30 seconds
    keepAliveTimeout: 5000,  // 5 seconds
  },

  // Malicious Scanner / Bot User-Agent Signatures
  scannerSignatures: [
    /sqlmap/i,
    /nikto/i,
    /acunetix/i,
    /nessus/i,
    /masscan/i,
    /gobuster/i,
    /dirbuster/i,
    /wpscan/i,
    /nmap/i,
    /zgrab/i,
    /openvas/i,
    /netsparker/i,
    /havij/i,
    /arachni/i,
  ],

  // Suspicious Scanner Probing Paths (Exploit probes to non-existent admin/config paths)
  sensitiveProbePaths: [
    /^\/\.env/i,
    /^\/\.git/i,
    /^\/wp-admin/i,
    /^\/wp-login/i,
    /^\/phpmyadmin/i,
    /^\/server-status/i,
    /^\/xmlrpc\.php/i,
    /^\/actuator/i,
    /^\/config\.json/i,
    /^\/backup\./i,
    /^\/\.aws/i,
    /^\/\.ssh/i,
    /^\/eval-stdin/i,
    /^\/boaform/i,
  ],

  // Proxy Trust
  trustProxy: process.env.TRUST_PROXY !== "false",

  // Security Event Limits
  maxStoredEvents: 500,
};
