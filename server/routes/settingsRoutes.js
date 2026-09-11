// server/routes/settingsRoutes.js
import { Router } from "express";
import {
  updateCredentials,
  listBackups,
  createManualBackup,
  restoreFromBackup,
  getInquiries,
  createInquiry,
  updateInquiry,
  getPayments,
  createPayment,
  updatePayment
} from "../controllers/settingsController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { inquiryGuard, paymentGuard } from "../security/routeGuards.js";

const router = Router();

// Credentials
router.put("/credentials", authenticateAdmin, updateCredentials);

// Backups
router.get("/backups", authenticateAdmin, listBackups);
router.post("/backups", authenticateAdmin, createManualBackup);
router.post("/backups/restore", authenticateAdmin, restoreFromBackup);

// Leads & Inquiries
router.get("/inquiries", authenticateAdmin, getInquiries);
router.post("/inquiries", inquiryGuard, createInquiry); // Public submission with flood guard
router.put("/inquiries/:id", authenticateAdmin, updateInquiry);

// Bill Payments
router.get("/payments", authenticateAdmin, getPayments);
router.post("/payments", paymentGuard, createPayment); // Public submission with replay & flood guard
router.put("/payments/:id", authenticateAdmin, updatePayment);

export default router;
