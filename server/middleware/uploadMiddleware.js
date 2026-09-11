// server/middleware/uploadMiddleware.js
// Secure Multer File Upload Middleware with Strict MIME & Extension Validation

import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Uploads saved in public/uploads (or /tmp/uploads on Vercel)
const isVercel = Boolean(process.env.VERCEL);
const UPLOAD_DIR = isVercel ? "/tmp/uploads" : path.join(__dirname, "..", "..", "public", "uploads");

try {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
} catch (e) {
  console.warn("[UploadMiddleware] Directory setup notice:", e.message);
}

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Generate safe, unguessable, unique filename
    const ext = path.extname(file.originalname).toLowerCase();
    const randomHex = crypto.randomBytes(8).toString("hex");
    const safeName = `img-${Date.now()}-${randomHex}${ext}`;
    cb(null, safeName);
  }
});

// Strict MIME & Extension filter
const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  const allowedExts = [".jpg", ".jpeg", ".png", ".webp"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("শুধুমাত্র JPG, PNG বা WebP ফরম্যাটের ছবি আপলোড করা যাবে (Only JPG, PNG, and WebP are allowed)"), false);
  }
};

const maxSizeBytes = parseInt(process.env.UPLOAD_MAX_SIZE || "5242880", 10); // 5MB default

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxSizeBytes,
    files: 1
  }
});
