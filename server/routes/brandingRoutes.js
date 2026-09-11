// server/routes/brandingRoutes.js
import { Router } from "express";
import {
  getBranding,
  uploadLogo,
  updateBrandingUrls,
  resetBranding
} from "../controllers/brandingController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = Router();

// Public Read
router.get("/", getBranding);

// Protected Branding Actions
router.post("/logo", authenticateAdmin, uploadImage.single("logo"), uploadLogo);
router.put("/", authenticateAdmin, updateBrandingUrls);
router.post("/reset/:target", authenticateAdmin, resetBranding);

export default router;
