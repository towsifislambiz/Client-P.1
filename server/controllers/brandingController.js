// server/controllers/brandingController.js
// Logo & Branding Controller

import dataService from "../services/dataService.js";

export const getBranding = (req, res, next) => {
  try {
    const branding = dataService.getBranding();
    res.status(200).json({
      success: true,
      data: branding
    });
  } catch (err) {
    next(err);
  }
};

export const uploadLogo = (req, res, next) => {
  try {
    const { target } = req.body; // 'navbarLogo' or 'footerLogo' or 'favicon'

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "কোনো লোগো ফাইল আপলোড করা হয়নি (No logo file received)"
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const fieldName = target === "footerLogo" ? "footerLogo" : (target === "favicon" ? "favicon" : "navbarLogo");

    const updated = dataService.updateBranding({ [fieldName]: fileUrl });

    res.status(200).json({
      success: true,
      message: `${fieldName === "footerLogo" ? "ফুটার" : "হেডার"} লোগো সফলভাবে পরিবর্তন করা হয়েছে`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const updateBrandingUrls = (req, res, next) => {
  try {
    const updates = req.body;
    const updated = dataService.updateBranding(updates);

    res.status(200).json({
      success: true,
      message: "লোগো ও ব্র্যান্ডিং সেটিংস সফলভাবে আপডেট হয়েছে",
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const resetBranding = (req, res, next) => {
  try {
    const { target } = req.params; // 'all' or 'navbar' or 'footer'
    const reset = dataService.resetBranding(target || "all");

    res.status(200).json({
      success: true,
      message: "লোগো সফলভাবে আসল ডিফল্টে রিসেট করা হয়েছে",
      data: reset
    });
  } catch (err) {
    next(err);
  }
};
