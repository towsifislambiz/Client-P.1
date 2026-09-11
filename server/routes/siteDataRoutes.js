// server/routes/siteDataRoutes.js
import { Router } from "express";
import { getSiteData } from "../controllers/siteDataController.js";

const router = Router();

// Public endpoint to retrieve all active site content
router.get("/site-data", getSiteData);

export default router;
