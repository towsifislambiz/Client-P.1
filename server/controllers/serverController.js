// server/controllers/serverController.js
// FTP and Live TV Servers Management Controller

import dataService from "../services/dataService.js";

export const getServers = (req, res, next) => {
  try {
    const servers = dataService.getServers();
    res.status(200).json({
      success: true,
      data: servers
    });
  } catch (err) {
    next(err);
  }
};

export const createServer = (req, res, next) => {
  try {
    const { name, ip, url } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "সার্ভারের নাম আবশ্যক (Server name is required)"
      });
    }

    if ((!ip || !ip.trim()) && (!url || !url.trim())) {
      return res.status(400).json({
        success: false,
        message: "সার্ভার আইপি বা লিংক আবশ্যক (IP address or URL required)"
      });
    }

    const newServer = dataService.createServer(req.body);

    res.status(201).json({
      success: true,
      message: `সার্ভার "${newServer.name}" সফলভাবে যুক্ত হয়েছে`,
      data: newServer
    });
  } catch (err) {
    next(err);
  }
};

export const updateServer = (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = dataService.updateServer(id, req.body);

    res.status(200).json({
      success: true,
      message: `সার্ভার "${updated.name}" সফলভাবে আপডেট হয়েছে`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

export const deleteServer = (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = dataService.deleteServer(id);

    res.status(200).json({
      success: true,
      message: `সার্ভার "${deleted.name}" সফলভাবে মুছে ফেলা হয়েছে`,
      data: deleted
    });
  } catch (err) {
    next(err);
  }
};

export const resetServers = (req, res, next) => {
  try {
    const reset = dataService.resetServers();
    res.status(200).json({
      success: true,
      message: "সকল FTP এবং Live TV সার্ভার লিংক বিডি ডিফল্ট তালিকায় রিসেট করা হয়েছে",
      data: reset
    });
  } catch (err) {
    next(err);
  }
};
