// server/routes/securityRoutes.js
// Protected Admin Security API Endpoints for Link BD ISP

import { Router } from "express";
import {
  getSecurityStatus,
  getSecurityStats,
  getSecurityEvents,
  getBlockedIps,
  toggleAttackMode,
  unblockIp,
  clearBlacklist,
} from "../controllers/securityController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// All security routes require authenticated Admin access
router.use(authenticateAdmin);

router.get("/status", getSecurityStatus);
router.get("/stats", getSecurityStats);
router.get("/events", getSecurityEvents);
router.get("/blocked-ips", getBlockedIps);
router.post("/toggle-attack-mode", toggleAttackMode);
router.post("/unblock-ip", unblockIp);
router.post("/clear-blacklist", clearBlacklist);

export default router;
