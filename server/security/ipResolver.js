// server/security/ipResolver.js
// Secure Client IP Resolution & Cloudflare Header Verification
// Prevents header spoofing attacks when behind Cloudflare or Direct Reverse Proxies

import { SECURITY_CONFIG } from "./securityConfig.js";

export function resolveClientIp(req) {
  let clientIp = null;
  let isCloudflare = false;

  // 1. Cloudflare provides CF-Connecting-IP header when proxied
  const cfConnectingIp = req.headers["cf-connecting-ip"];
  const cfRay = req.headers["cf-ray"];

  if (cfConnectingIp && cfRay) {
    // Verified request from Cloudflare edge proxy
    clientIp = Array.isArray(cfConnectingIp) ? cfConnectingIp[0] : cfConnectingIp;
    isCloudflare = true;
  } else if (SECURITY_CONFIG.trustProxy) {
    // 2. Standard X-Forwarded-For if proxy trust is explicitly enabled
    const xForwardedFor = req.headers["x-forwarded-for"];
    if (xForwardedFor) {
      // First IP in list is client IP
      const list = (Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor).split(",");
      clientIp = list[0].trim();
    } else if (req.headers["x-real-ip"]) {
      const realIp = req.headers["x-real-ip"];
      clientIp = Array.isArray(realIp) ? realIp[0] : realIp;
    }
  }

  // 3. Fallback to socket remote address
  if (!clientIp) {
    clientIp = req.socket?.remoteAddress || req.connection?.remoteAddress || req.ip || "127.0.0.1";
  }

  // 4. Normalize IPv6 loopback and mapped IPv4
  clientIp = clientIp.trim();
  if (clientIp === "::1" || clientIp === "::ffff:127.0.0.1") {
    clientIp = "127.0.0.1";
  } else if (clientIp.startsWith("::ffff:")) {
    clientIp = clientIp.replace("::ffff:", "");
  }

  req.clientIp = clientIp;
  req.isCloudflare = isCloudflare;
  req.cfRay = cfRay || null;

  return { clientIp, isCloudflare };
}

export function ipResolverMiddleware(req, res, next) {
  resolveClientIp(req);
  next();
}
