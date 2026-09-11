// server/server.js
// Production-Ready Express REST API Server for Link BD Content Management System

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
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

// 2. CORS Configuration
app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: ["X-Request-ID", "Retry-After", "X-Shield-Protection", "X-Shield-Mode", "X-RateLimit-Limit", "X-RateLimit-Remaining"],
}));

// 3. Request IP Normalization & Anti-Spoofing
app.use(ipResolverMiddleware);

// 4. Layer-7 DDoS, Rate Limiter, Burst Flood & Bot Shield
app.use(ddosShieldMiddleware);

// 5. Body Parsing with Safe Memory Limits (2MB default to prevent memory exhaustion)
app.use(express.json({ limit: SECURITY_CONFIG.payloadLimits.defaultBody }));
app.use(express.urlencoded({ extended: true, limit: SECURITY_CONFIG.payloadLimits.defaultBody }));

// 6. Static file serving for uploads
const UPLOAD_DIR = path.join(__dirname, "..", "public", "uploads");
app.use("/uploads", express.static(UPLOAD_DIR));

// 7. API Routes
app.use("/api/auth", authRoutes);
app.use("/api", siteDataRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/branding", brandingRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/security", securityRoutes);

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
