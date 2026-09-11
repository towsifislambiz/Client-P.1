// server/routes/authRoutes.js
import { Router } from "express";
import { login, logout, getMe } from "../controllers/authController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { authGuard } from "../security/routeGuards.js";

const router = Router();

router.post("/login", authGuard, login);
router.post("/logout", logout);
router.get("/me", authenticateAdmin, getMe);

export default router;
