// server/routes/serverRoutes.js
// REST API Endpoints for FTP and Live TV Servers

import { Router } from "express";
import {
  getServers,
  createServer,
  updateServer,
  deleteServer,
  resetServers
} from "../controllers/serverController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Public Read Endpoint
router.get("/", getServers);

// Protected Admin Endpoints
router.post("/", authenticateAdmin, createServer);
router.put("/:id", authenticateAdmin, updateServer);
router.delete("/:id", authenticateAdmin, deleteServer);
router.post("/reset", authenticateAdmin, resetServers);

export default router;
