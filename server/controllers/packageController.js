// server/controllers/packageController.js
// Internet Packages Management Controller

import dataService from "../services/dataService.js";

export const getPackages = (req, res, next) => {
  try {
    const pkgs = dataService.getPackages();
    res.status(200).json({
      success: true,
      data: pkgs
    });
  } catch (err) {
    next(err);
  }
};

export const createPackage = (req, res, next) => {
  try {
    const { name, speed, price, category } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "প্যাকেজের নাম আবশ্যক (Package name is required)"
      });
    }

    if (isNaN(speed) || Number(speed) <= 0) {
      return res.status(400).json({
        success: false,
        message: "প্যাকেজের স্পিড একটি ধনাত্মক সংখ্যা হতে হবে (Speed must be a positive number)"
      });
    }

    if (isNaN(price) || Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "প্যাকেজের মূল্য একটি ধনাত্মক সংখ্যা হতে হবে (Price must be a positive number)"
      });
    }

    const newPkg = dataService.createPackage(req.body);

    res.status(201).json({
      success: true,
      message: `নতুন প্যাকেজ "${newPkg.name}" সফলভাবে যুক্ত হয়েছে`,
      data: newPkg
    });
  } catch (err) {
    next(err);
  }
};

export const updatePackage = (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.speed !== undefined && (isNaN(updates.speed) || Number(updates.speed) <= 0)) {
      return res.status(400).json({
        success: false,
        message: "স্পিড অবশ্যই ধনাত্মক সংখ্যা হতে হবে"
      });
    }

    if (updates.price !== undefined && (isNaN(updates.price) || Number(updates.price) <= 0)) {
      return res.status(400).json({
        success: false,
        message: "মূল্য অবশ্যই ধনাত্মক সংখ্যা হতে হবে"
      });
    }

    const updated = dataService.updatePackage(id, updates);

    res.status(200).json({
      success: true,
      message: `প্যাকেজ "${updated.name}" সফলভাবে আপডেট হয়েছে`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const deletePackage = (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = dataService.deletePackage(id);

    res.status(200).json({
      success: true,
      message: `প্যাকেজ "${deleted.name}" সফলভাবে মুছে ফেলা হয়েছে`,
      data: deleted
    });
  } catch (err) {
    next(err);
  }
};

export const reorderPackages = (req, res, next) => {
  try {
    const { order } = req.body; // array of { id, sortOrder }

    if (!Array.isArray(order)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order array"
      });
    }

    order.forEach(item => {
      dataService.updatePackage(item.id, { sortOrder: item.sortOrder });
    });

    const updated = dataService.getPackages();

    res.status(200).json({
      success: true,
      message: "প্যাকেজের ক্রম সফলভাবে সাজানো হয়েছে",
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const resetPackages = (req, res, next) => {
  try {
    const reset = dataService.resetPackages();
    res.status(200).json({
      success: true,
      message: "সকল প্যাকেজ সফলভাবে আসল ডিফল্ট প্যাকেজে রিসেট করা হয়েছে",
      data: reset
    });
  } catch (err) {
    next(err);
  }
};
