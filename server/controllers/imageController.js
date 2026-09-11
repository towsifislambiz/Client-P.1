// server/controllers/imageController.js
// Image and Banner Management Controller

import dataService from "../services/dataService.js";

export const getImages = (req, res, next) => {
  try {
    const images = dataService.getImages();
    res.status(200).json({
      success: true,
      data: images
    });
  } catch (err) {
    next(err);
  }
};

export const uploadAndReplaceImage = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "কোনো ছবি আপলোড করা হয়নি (No image file received)"
      });
    }

    // Public URL path
    const fileUrl = `/uploads/${req.file.filename}`;

    const updated = dataService.updateImage(id, fileUrl);

    res.status(200).json({
      success: true,
      message: `"${updated.name}" সফলভাবে পরিবর্তন করা হয়েছে`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const updateImageUrl = (req, res, next) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "ছবির URL প্রদান করা আবশ্যক (Image URL required)"
      });
    }

    const updated = dataService.updateImage(id, url);

    res.status(200).json({
      success: true,
      message: `"${updated.name}" ছবি আপডেট হয়েছে`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const resetImage = (req, res, next) => {
  try {
    const { id } = req.params;
    const reset = dataService.resetImage(id);

    res.status(200).json({
      success: true,
      message: `"${reset.name}" সফলভাবে আসল ডিফল্ট ছবিতে রিসেট করা হয়েছে`,
      data: reset
    });
  } catch (err) {
    next(err);
  }
};
