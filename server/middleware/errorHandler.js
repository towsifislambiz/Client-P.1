// server/middleware/errorHandler.js
// Centralized Error Handling Middleware

export const errorHandler = (err, req, res, next) => {
  console.error(`[API Error] ${req.method} ${req.url}:`, err.message || err);

  // Multer Specific Errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "ফাইলের আকার সর্বোচ্চ ৫ মেগাবাইট (5MB) হতে পারে (File too large)"
    });
  }

  if (err.message && err.message.includes("ফরম্যাট")) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

  // Production: Hide internal error details from clients
  const isProduction = process.env.NODE_ENV === "production";
  const safeMessage = (statusCode === 500 && isProduction)
    ? "সার্ভারে একটি অপ্রত্যাশিত ত্রুটি ঘটেছে (Internal Server Error)"
    : err.message || "সার্ভারে একটি অপ্রত্যাশিত ত্রুটি ঘটেছে (Internal Server Error)";

  res.status(statusCode).json({
    success: false,
    message: safeMessage,
    ...(isProduction ? {} : { stack: err.stack }) // Dev only: include stack trace
  });
};
