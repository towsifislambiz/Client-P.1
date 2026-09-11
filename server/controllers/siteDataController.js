// server/controllers/siteDataController.js
// Central Public & Admin Site Data Controller

import dataService from "../services/dataService.js";

export const getSiteData = (req, res, next) => {
  try {
    const data = dataService.getSiteData();
    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};
