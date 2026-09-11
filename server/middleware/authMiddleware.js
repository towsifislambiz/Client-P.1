// server/middleware/authMiddleware.js
// Secure JWT Token Verification Middleware

import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_SECRET || "link-bd-secure-jwt-auth-secret-key-2025";

export const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "অননুমোদিত অ্যাক্সেস: অনুগ্রহ করে লগইন করুন (Unauthorized: No token provided)"
      });
    }

    const decoded = jwt.verify(token, AUTH_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "সেশন মেয়াদোত্তীর্ণ বা অবৈধ টোকেন (Session expired or invalid token)"
    });
  }
};

export const generateToken = (payload) => {
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: "7d" });
};
