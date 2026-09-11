// server/controllers/settingsController.js
// Admin Settings, Backups, and CRM Leads Controller

import dataService from "../services/dataService.js";

export const updateCredentials = async (req, res, next) => {
  try {
    const { username, email, name, avatar, currentPassword, newPassword, confirmPassword } = req.body;
    const admin = dataService.getAdmin();

    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে (Password must be at least 6 characters)"
        });
      }

      if (confirmPassword && newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মেলেনি (Passwords do not match)"
        });
      }
    }

    const updated = dataService.updateAdminCredentials({
      username: username || email,
      email: email || username,
      name,
      avatar,
      newPassword
    });

    res.status(200).json({
      success: true,
      message: "অ্যাডমিন ক্রেডেনশিয়াল ও প্রোফাইল সফলভাবে পরিবর্তন করা হয়েছে",
      admin: updated,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};


export const listBackups = (req, res, next) => {
  try {
    const backups = dataService.listBackups();
    res.status(200).json({
      success: true,
      data: backups
    });
  } catch (err) {
    next(err);
  }
};

export const createManualBackup = (req, res, next) => {
  try {
    const filename = dataService.createBackup("manual");
    res.status(201).json({
      success: true,
      message: `ব্যাকআপ সফলভাবে তৈরি হয়েছে (${filename})`,
      filename
    });
  } catch (err) {
    next(err);
  }
};

export const restoreFromBackup = (req, res, next) => {
  try {
    const { filename } = req.body;
    if (!filename) {
      return res.status(400).json({
        success: false,
        message: "ব্যাকআপ ফাইলের নাম প্রদান করা আবশ্যক"
      });
    }
    const data = dataService.restoreBackup(filename);
    res.status(200).json({
      success: true,
      message: "ব্যাকআপ থেকে সফলভাবে সম্পূর্ণ ডেটাবেজ রিস্টোর করা হয়েছে",
      data: {
        branding: data.branding,
        imagesCount: data.images?.length,
        packagesCount: data.packages?.length,
        officesCount: data.offices?.length
      }
    });
  } catch (err) {
    next(err);
  }
};

// Customer Leads / Inquiries
export const getInquiries = (req, res, next) => {
  try {
    const list = dataService.getInquiries();
    res.status(200).json({
      success: true,
      data: list
    });
  } catch (err) {
    next(err);
  }
};

export const createInquiry = (req, res, next) => {
  try {
    const { name, phone } = req.body;
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "মোবাইল নম্বর আবশ্যক (Phone number required)"
      });
    }
    const inq = dataService.addInquiry(req.body);
    res.status(201).json({
      success: true,
      message: "আপনার আবেদনটি সফলভাবে জমা হয়েছে। আমাদের প্রতিনিধি দ্রুত যোগাযোগ করবেন।",
      data: inq
    });
  } catch (err) {
    next(err);
  }
};

export const updateInquiry = (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const inq = dataService.updateInquiryStatus(id, status, notes);
    res.status(200).json({
      success: true,
      message: "আবেদনের স্ট্যাটাস আপডেট হয়েছে",
      data: inq
    });
  } catch (err) {
    next(err);
  }
};

// Customer Bill Payments
export const getPayments = (req, res, next) => {
  try {
    const list = dataService.getPayments();
    res.status(200).json({
      success: true,
      data: list
    });
  } catch (err) {
    next(err);
  }
};

export const createPayment = (req, res, next) => {
  try {
    const { customerId, phone, amount } = req.body;
    if (!customerId && !phone) {
      return res.status(400).json({
        success: false,
        message: "কাস্টমার আইডি অথবা ফোন নম্বর প্রয়োজন"
      });
    }
    const pay = dataService.addPayment(req.body);
    res.status(201).json({
      success: true,
      message: "বিল পেমেন্ট তথ্য সফলভাবে জমা হয়েছে। ভেরিফিকেশনের পর কনফার্মেশন পাবেন।",
      data: pay
    });
  } catch (err) {
    next(err);
  }
};

export const updatePayment = (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const pay = dataService.updatePaymentStatus(id, status);
    res.status(200).json({
      success: true,
      message: "পেমেন্ট স্ট্যাটাস আপডেট হয়েছে",
      data: pay
    });
  } catch (err) {
    next(err);
  }
};


// ===================== AD POPUP CONTROLLER =====================
export const getAdPopup = (req, res, next) => {
  try {
    const ad = dataService.getAdPopup();
    res.status(200).json({
      success: true,
      data: ad
    });
  } catch (err) {
    next(err);
  }
};

export const updateAdPopup = (req, res, next) => {
  try {
    const updated = dataService.updateAdPopup(req.body);
    res.status(200).json({
      success: true,
      message: "বিজ্ঞাপন পপআপ সেটিংস সফলভাবে আপডেট করা হয়েছে",
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const resetAdPopup = (req, res, next) => {
  try {
    const reset = dataService.resetAdPopup();
    res.status(200).json({
      success: true,
      message: "বিজ্ঞাপন পপআপ ডিফল্ট অবস্থায় রিসেট করা হয়েছে",
      data: reset
    });
  } catch (err) {
    next(err);
  }
};
