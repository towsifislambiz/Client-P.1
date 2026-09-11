// server/server.js
// Production-Ready Express REST API Server for Link BD Content Management System

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes.js";
import siteDataRoutes from "./routes/siteDataRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import officeRoutes from "./routes/officeRoutes.js";
import brandingRoutes from "./routes/brandingRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import securityRoutes from "./routes/securityRoutes.js";
import serverRoutes from "./routes/serverRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { ipResolverMiddleware } from "./security/ipResolver.js";
import { ddosShieldMiddleware } from "./security/ddosShield.js";
import { SECURITY_CONFIG } from "./security/securityConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5100;

// Trust Proxy for Cloudflare / Reverse Proxy IP Resolution
if (SECURITY_CONFIG.trustProxy) {
  app.set("trust proxy", 1);
}

// 1. HTTP Security Headers (Helmet)
app.use(helmet({
  contentSecurityPolicy: false, // Preserves frontend dynamic assets & Vite HMR
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allows static /uploads to render in frontend
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
}));

// 2. CORS Configuration (Allows Vercel domains, localhost, and custom domains)
app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: ["X-Request-ID", "Retry-After", "X-Shield-Protection", "X-Shield-Mode", "X-RateLimit-Limit", "X-RateLimit-Remaining"],
}));

// 3. Request IP Normalization & Anti-Spoofing
app.use(ipResolverMiddleware);

// 4. Layer-7 DDoS, Rate Limiter, Burst Flood & Bot Shield
app.use(ddosShieldMiddleware);

// 5. Body Parsing with Safe Memory Limits
app.use(express.json({ limit: SECURITY_CONFIG.payloadLimits.defaultBody }));
app.use(express.urlencoded({ extended: true, limit: SECURITY_CONFIG.payloadLimits.defaultBody }));

// 6. Static file serving for uploads
const isVercelEnv = Boolean(process.env.VERCEL);
const UPLOAD_DIR = isVercelEnv ? "/tmp/uploads" : path.join(__dirname, "..", "public", "uploads");
try {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
} catch (e) {}
app.use("/uploads", express.static(UPLOAD_DIR));

// URL normalization for Vercel Serverless Function rewrites
app.use((req, res, next) => {
  if (req.url && !req.url.startsWith("/api") && !req.url.startsWith("/uploads")) {
    req.url = "/api" + (req.url.startsWith("/") ? req.url : "/" + req.url);
  }
  next();
});

// 7. API Routes (Dual-mounted for direct /api/... and stripped /... paths)
app.use(["/api/auth", "/auth"], authRoutes);
app.use(["/api/images", "/images"], imageRoutes);
app.use(["/api/packages", "/packages"], packageRoutes);
app.use(["/api/offices", "/offices"], officeRoutes);
app.use(["/api/branding", "/branding"], brandingRoutes);
app.use(["/api/servers", "/servers"], serverRoutes);
app.use(["/api/settings", "/settings"], settingsRoutes);
app.use(["/api/security", "/security"], securityRoutes);
app.use(["/api", "/"], siteDataRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Link BD CMS API & Cyber Shield Server",
    shieldStatus: "ACTIVE",
    timestamp: new Date().toISOString()
  });
});

// Central Error Handler
app.use(errorHandler);

// Start Server & Configure Anti-Slowloris Timeouts
let server;
if (!process.env.VERCEL) {
  server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Link BD CMS Backend & DDoS Shield running on port ${PORT}`);
    console.log(`   Health Check: http://localhost:${PORT}/api/health`);
    console.log(`   API Endpoint: http://localhost:${PORT}/api/site-data`);
    console.log(`   Security SOC: http://localhost:${PORT}/api/security/status`);
    console.log(`   Uploads Dir:  ${UPLOAD_DIR}`);
    console.log(`====================================================`);
  });

  // Mitigate Slowloris & Slow HTTP Connection Floods
  if (server) {
    server.headersTimeout = SECURITY_CONFIG.timeouts.headersTimeout;
    server.requestTimeout = SECURITY_CONFIG.timeouts.requestTimeout;
    server.keepAliveTimeout = SECURITY_CONFIG.timeouts.keepAliveTimeout;
  }
}

export default app;
