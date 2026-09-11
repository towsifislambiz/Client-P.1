// server/routes/imageRoutes.js
import { Router } from "express";
import {
  getImages,
  uploadAndReplaceImage,
  updateImageUrl,
  resetImage
} from "../controllers/imageController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = Router();

// Public read
router.get("/", getImages);

// Protected image management
router.post("/:id/upload", authenticateAdmin, uploadImage.single("image"), uploadAndReplaceImage);
router.put("/:id", authenticateAdmin, updateImageUrl);
router.post("/:id/reset", authenticateAdmin, resetImage);

export default router;
