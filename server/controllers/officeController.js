// server/controllers/officeController.js
// Offices & Global Contact Management Controller

import dataService from "../services/dataService.js";

export const getOffices = (req, res, next) => {
  try {
    const offices = dataService.getOffices();
    res.status(200).json({
      success: true,
      data: offices
    });
  } catch (err) {
    next(err);
  }
};

export const createOffice = (req, res, next) => {
  try {
    const { name, address } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "অফিসের নাম আবশ্যক (Office name required)"
      });
    }

    if (!address || !address.trim()) {
      return res.status(400).json({
        success: false,
        message: "অফিসের ঠিকানা আবশ্যক (Office address required)"
      });
    }

    const newOffice = dataService.createOffice(req.body);

    res.status(201).json({
      success: true,
      message: `নতুন অফিস "${newOffice.name}" সফলভাবে যুক্ত হয়েছে`,
      data: newOffice
    });
  } catch (err) {
    next(err);
  }
};

export const updateOffice = (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = dataService.updateOffice(id, updates);

    res.status(200).json({
      success: true,
      message: `"${updated.name}" অফিসের তথ্য সফলভাবে আপডেট হয়েছে`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOffice = (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = dataService.deleteOffice(id);

    res.status(200).json({
      success: true,
      message: `"${deleted.name}" অফিস মুছে ফেলা হয়েছে`,
      data: deleted
    });
  } catch (err) {
    next(err);
  }
};

export const resetOffices = (req, res, next) => {
  try {
    const reset = dataService.resetOffices();
    res.status(200).json({
      success: true,
      message: "সকল অফিস সফলভাবে আসল ডিফল্ট ঠিকানায় রিসেট করা হয়েছে",
      data: reset
    });
  } catch (err) {
    next(err);
  }
};

// Global Contact Settings
export const getContact = (req, res, next) => {
  try {
    const contact = dataService.getContact();
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    next(err);
  }
};

export const updateContact = (req, res, next) => {
  try {
    const updates = req.body;
    const updated = dataService.updateContact(updates);

    res.status(200).json({
      success: true,
      message: "সাইটওয়াইড যোগাযোগ ও হটলাইন তথ্য সফলভাবে আপডেট হয়েছে",
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const resetContact = (req, res, next) => {
  try {
    const reset = dataService.resetContact();
    res.status(200).json({
      success: true,
      message: "সাইটওয়াইড যোগাযোগ সেটিংস ডিফল্টে রিসেট করা হয়েছে",
      data: reset
    });
  } catch (err) {
    next(err);
  }
};
