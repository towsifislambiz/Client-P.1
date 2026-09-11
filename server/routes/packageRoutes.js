// server/routes/packageRoutes.js
import { Router } from "express";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  reorderPackages,
  resetPackages
} from "../controllers/packageController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Public read
router.get("/", getPackages);

// Protected package management
router.post("/", authenticateAdmin, createPackage);
router.put("/reorder", authenticateAdmin, reorderPackages);
router.post("/reset", authenticateAdmin, resetPackages);
router.put("/:id", authenticateAdmin, updatePackage);
router.delete("/:id", authenticateAdmin, deletePackage);

export default router;
