// server/controllers/authController.js
// Admin Authentication Controller

import bcrypt from "bcryptjs";
import dataService from "../services/dataService.js";
import { generateToken } from "../middleware/authMiddleware.js";

// Rate limiting attempt tracker (in-memory)
const loginAttempts = new Map();

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "ইমেইল এবং পাসওয়ার্ড দুটিই আবশ্যক (Email and password required)"
      });
    }

    const clientIp = req.ip || req.connection.remoteAddress || "unknown";
    const attempts = loginAttempts.get(clientIp) || { count: 0, lastAttempt: Date.now() };

    // Rate limiting: 5 attempts per 10 minutes
    if (attempts.count >= 5 && Date.now() - attempts.lastAttempt < 10 * 60 * 1000) {
      return res.status(429).json({
        success: false,
        message: "অতিরিক্ত ভুল প্রচেষ্টার কারণে একাউন্ট সাময়িকভাবে লক করা হয়েছে। ১০ মিনিট পর আবার চেষ্টা করুন।"
      });
    }

    const admin = dataService.getAdmin();

    // Check email match (case-insensitive) or username "admin"
    const isEmailMatch = (
      admin.email.toLowerCase() === email.trim().toLowerCase() ||
      email.trim().toLowerCase() === "admin"
    );

    // Verify Password Hash
    const isPasswordValid = isEmailMatch && (await bcrypt.compare(password, admin.passwordHash));

    if (!isPasswordValid) {
      loginAttempts.set(clientIp, {
        count: attempts.count + 1,
        lastAttempt: Date.now()
      });
      return res.status(401).json({
        success: false,
        message: "ভুল ইমেইল অথবা পাসওয়ার্ড (Invalid credentials)"
      });
    }

    // Reset attempts on successful login
    loginAttempts.delete(clientIp);
    dataService.updateAdminLoginTime();
    dataService.logActivity("auth", "Admin logged in successfully", `IP: ${clientIp}`);

    const token = generateToken({ email: admin.email, role: "admin" });

    return res.status(200).json({
      success: true,
      message: "সফলভাবে লগইন হয়েছে (Login successful)",
      token,
      admin: {
        email: admin.email,
        lastLogin: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "সফলভাবে লগআউট সম্পন্ন হয়েছে (Logged out successfully)"
  });
};

export const getMe = (req, res, next) => {
  try {
    const admin = dataService.getAdmin();
    return res.status(200).json({
      success: true,
      admin: {
        email: admin.email,
        lastLogin: admin.lastLogin
      }
    });
  } catch (err) {
    next(err);
  }
};
