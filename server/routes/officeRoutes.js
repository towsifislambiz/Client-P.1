// server/routes/officeRoutes.js
import { Router } from "express";
import {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
  resetOffices,
  getContact,
  updateContact,
  resetContact
} from "../controllers/officeController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Global Contact Settings
router.get("/contact/global", getContact);
router.put("/contact/global", authenticateAdmin, updateContact);
router.post("/contact/global/reset", authenticateAdmin, resetContact);

// Offices CRUD
router.get("/", getOffices);
router.post("/", authenticateAdmin, createOffice);
router.post("/reset", authenticateAdmin, resetOffices);
router.put("/:id", authenticateAdmin, updateOffice);
router.delete("/:id", authenticateAdmin, deleteOffice);

export default router;
