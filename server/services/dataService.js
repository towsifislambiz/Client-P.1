// server/services/dataService.js
// Persistent JSON Database Access Layer with Atomic Writes & Automatic Backups

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import {
  defaultLogo,
  defaultPageImages,
  defaultPackages,
  defaultOffices,
  defaultGlobalContact
} from "../config/defaultData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "..", "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const BACKUP_DIR = path.join(DATA_DIR, "backups");

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

class DataService {
  constructor() {
    this.initDatabase();
  }

  // Initialize DB with authentic default data if file doesn't exist
  initDatabase() {
    if (!fs.existsSync(DB_FILE)) {
      const initialData = {
        branding: { ...defaultLogo },
        images: JSON.parse(JSON.stringify(defaultPageImages)),
        packages: JSON.parse(JSON.stringify(defaultPackages)),
        offices: JSON.parse(JSON.stringify(defaultOffices)),
        contact: { ...defaultGlobalContact },
        admin: {
          email: process.env.ADMIN_EMAIL || "admin@linkbd.net",
          passwordHash: bcrypt.hashSync(process.env.ADMIN_INITIAL_PASSWORD || "admin123456", 10),
          lastLogin: null
        },
        inquiries: [],
        payments: [],
        recentActivity: [
          {
            id: "act-init",
            type: "system",
            action: "System Initialized",
            description: "Link BD Content Management System initialized with authentic client data",
            timestamp: new Date().toISOString()
          }
        ]
      };
      this.writeDatabase(initialData);
      console.log("[DataService] Initialized new persistent database with authentic Link BD data.");
    }
  }

  // Safe Read
  readDatabase() {
    try {
      if (!fs.existsSync(DB_FILE)) {
        this.initDatabase();
      }
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw);
    } catch (err) {
      console.error("[DataService] Error reading database, attempting to recover:", err);
      // If corrupted, check for latest backup
      const backups = this.listBackups();
      if (backups.length > 0) {
        console.log(`[DataService] Recovering from latest backup: ${backups[0].filename}`);
        return this.restoreBackup(backups[0].filename);
      }
      // Otherwise reinitialize
      this.initDatabase();
      return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    }
  }

  // Safe Atomic Write to prevent corruption
  writeDatabase(data) {
    const tempFile = `${DB_FILE}.tmp`;
    try {
      fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
      fs.renameSync(tempFile, DB_FILE);
      return true;
    } catch (err) {
      console.error("[DataService] Error writing database:", err);
      if (fs.existsSync(tempFile)) {
        try { fs.unlinkSync(tempFile); } catch (e) {}
      }
      throw err;
    }
  }

  // Automatic Backup before destructive actions
  createBackup(label = "auto") {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `backup-${label}-${timestamp}.json`;
      const backupPath = path.join(BACKUP_DIR, filename);
      if (fs.existsSync(DB_FILE)) {
        fs.copyFileSync(DB_FILE, backupPath);
      }
      // Retain max 20 backups
      const files = fs.readdirSync(BACKUP_DIR)
        .filter(f => f.endsWith(".json"))
        .map(f => ({ name: f, time: fs.statSync(path.join(BACKUP_DIR, f)).mtime.getTime() }))
        .sort((a, b) => b.time - a.time);

      if (files.length > 20) {
        files.slice(20).forEach(f => {
          try { fs.unlinkSync(path.join(BACKUP_DIR, f.name)); } catch (e) {}
        });
      }
      return filename;
    } catch (err) {
      console.error("[DataService] Failed to create backup:", err);
      return null;
    }
  }

  listBackups() {
    try {
      if (!fs.existsSync(BACKUP_DIR)) return [];
      return fs.readdirSync(BACKUP_DIR)
        .filter(f => f.endsWith(".json"))
        .map(f => {
          const stat = fs.statSync(path.join(BACKUP_DIR, f));
          return {
            filename: f,
            size: stat.size,
            createdAt: stat.mtime.toISOString()
          };
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (err) {
      return [];
    }
  }

  restoreBackup(filename) {
    const backupPath = path.join(BACKUP_DIR, filename);
    if (!fs.existsSync(backupPath)) {
      throw new Error("Backup file not found");
    }
    const data = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
    this.writeDatabase(data);
    this.logActivity("restore", `Restored database from ${filename}`);
    return data;
  }

  // Activity Logger
  logActivity(type, action, description) {
    try {
      const db = this.readDatabase();
      if (!db.recentActivity) db.recentActivity = [];
      db.recentActivity.unshift({
        id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        type,
        action,
        description: description || action,
        timestamp: new Date().toISOString()
      });
      // Keep last 50 activities
      if (db.recentActivity.length > 50) {
        db.recentActivity = db.recentActivity.slice(0, 50);
      }
      this.writeDatabase(db);
    } catch (e) {
      console.warn("[DataService] Could not log activity:", e.message);
    }
  }

  // ===================== SITE DATA =====================
  getSiteData() {
    const db = this.readDatabase();
    return {
      branding: db.branding || defaultLogo,
      images: db.images || defaultPageImages,
      packages: (db.packages || defaultPackages).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
      offices: (db.offices || defaultOffices).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
      contact: db.contact || defaultGlobalContact,
      recentActivity: db.recentActivity ? db.recentActivity.slice(0, 10) : []
    };
  }

  // ===================== BRANDING (LOGO) =====================
  getBranding() {
    const db = this.readDatabase();
    return db.branding || defaultLogo;
  }

  updateBranding(updates) {
    const db = this.readDatabase();
    db.branding = {
      ...db.branding,
      ...updates
    };
    this.writeDatabase(db);
    this.logActivity("branding", "Updated site logo / branding", `Changed: ${Object.keys(updates).join(", ")}`);
    return db.branding;
  }

  resetBranding(type = "all") {
    const db = this.readDatabase();
    if (type === "navbar" || type === "navbarLogo") {
      db.branding.navbarLogo = defaultLogo.navbarLogo;
    } else if (type === "footer" || type === "footerLogo") {
      db.branding.footerLogo = defaultLogo.footerLogo;
    } else {
      db.branding = { ...defaultLogo };
    }
    this.writeDatabase(db);
    this.logActivity("branding", `Reset logo to default (${type})`);
    return db.branding;
  }

  // ===================== IMAGES =====================
  getImages() {
    const db = this.readDatabase();
    return db.images || defaultPageImages;
  }

  getImageById(id) {
    const db = this.readDatabase();
    return (db.images || []).find(img => img.id === id);
  }

  updateImage(id, newUrl) {
    const db = this.readDatabase();
    const index = (db.images || []).findIndex(img => img.id === id);
    if (index === -1) {
      throw new Error(`Image with ID "${id}" not found`);
    }
    const oldUrl = db.images[index].currentUrl;
    db.images[index].currentUrl = newUrl;
    db.images[index].updatedAt = new Date().toISOString();
    this.writeDatabase(db);
    this.logActivity("image", `Updated image: ${db.images[index].name}`, `Replaced ${oldUrl} with ${newUrl}`);
    return db.images[index];
  }

  resetImage(id) {
    const db = this.readDatabase();
    const index = (db.images || []).findIndex(img => img.id === id);
    if (index === -1) {
      throw new Error(`Image with ID "${id}" not found`);
    }
    const defaultImg = defaultPageImages.find(img => img.id === id);
    db.images[index].currentUrl = defaultImg ? defaultImg.defaultUrl : db.images[index].defaultUrl;
    db.images[index].updatedAt = new Date().toISOString();
    this.writeDatabase(db);
    this.logActivity("image", `Reset image to default: ${db.images[index].name}`);
    return db.images[index];
  }

  // ===================== PACKAGES =====================
  getPackages() {
    const db = this.readDatabase();
    return (db.packages || defaultPackages).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  getPackageById(id) {
    const db = this.readDatabase();
    return (db.packages || []).find(p => p.id === id);
  }

  createPackage(pkgData) {
    const db = this.readDatabase();
    if (!pkgData.name) throw new Error("Package name is required");
    if (!pkgData.speed) throw new Error("Speed is required");
    if (!pkgData.price) throw new Error("Price is required");

    const id = pkgData.id || `pkg-${Date.now()}`;
    // Check duplicate
    if (db.packages.some(p => p.id === id)) {
      throw new Error(`Package with ID "${id}" already exists`);
    }

    const newPkg = {
      id,
      name: pkgData.name.trim(),
      speed: Number(pkgData.speed),
      speedUnit: pkgData.speedUnit || "Mbps",
      price: Number(pkgData.price),
      currency: pkgData.currency || "৳",
      badge: pkgData.badge || "",
      category: pkgData.category || "home",
      featured: Boolean(pkgData.featured),
      accentColor: pkgData.accentColor || "from-blue-600 to-cyan-500",
      isActive: pkgData.isActive !== false,
      sortOrder: Number(pkgData.sortOrder) || db.packages.length + 1,
      features: Array.isArray(pkgData.features) ? pkgData.features : [
        "High speed BDIX and CDN connectivity",
        "4K Youtube and Facebook Stream",
        "Optical Fiber Connection",
        "IPv6 Public IP Only",
        "24/7 Phone and Online Support",
        "1:8 Contention Ratio"
      ],
      createdAt: new Date().toISOString()
    };

    db.packages.push(newPkg);
    this.writeDatabase(db);
    this.logActivity("package", `Added new package: ${newPkg.name}`, `${newPkg.speed} Mbps @ ৳${newPkg.price}`);
    return newPkg;
  }

  updatePackage(id, updates) {
    const db = this.readDatabase();
    const index = db.packages.findIndex(p => p.id === id);
    if (index === -1) throw new Error(`Package with ID "${id}" not found`);

    if (updates.name !== undefined) updates.name = updates.name.trim();
    if (updates.speed !== undefined) updates.speed = Number(updates.speed);
    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.sortOrder !== undefined) updates.sortOrder = Number(updates.sortOrder);

    db.packages[index] = {
      ...db.packages[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.writeDatabase(db);
    this.logActivity("package", `Updated package: ${db.packages[index].name}`, `Price: ৳${db.packages[index].price}, Speed: ${db.packages[index].speed} Mbps`);
    return db.packages[index];
  }

  deletePackage(id) {
    this.createBackup("before-delete-pkg");
    const db = this.readDatabase();
    const index = db.packages.findIndex(p => p.id === id);
    if (index === -1) throw new Error(`Package with ID "${id}" not found`);

    const deleted = db.packages.splice(index, 1)[0];
    this.writeDatabase(db);
    this.logActivity("package", `Deleted package: ${deleted.name}`);
    return deleted;
  }

  resetPackages() {
    this.createBackup("before-reset-packages");
    const db = this.readDatabase();
    db.packages = JSON.parse(JSON.stringify(defaultPackages));
    this.writeDatabase(db);
    this.logActivity("package", "Reset all packages to default Link BD packages");
    return db.packages;
  }

  // ===================== OFFICES =====================
  getOffices() {
    const db = this.readDatabase();
    return (db.offices || defaultOffices).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  getOfficeById(id) {
    const db = this.readDatabase();
    return (db.offices || []).find(o => o.id === id);
  }

  createOffice(officeData) {
    const db = this.readDatabase();
    if (!officeData.name) throw new Error("Office name is required");
    if (!officeData.address) throw new Error("Address is required");

    const id = officeData.id || `office-${Date.now()}`;
    const newOffice = {
      id,
      type: officeData.type || "Branch Office",
      name: officeData.name.trim(),
      city: officeData.city || "",
      cityEn: officeData.cityEn || "",
      country: officeData.country || "Bangladesh",
      address: officeData.address.trim(),
      phone: officeData.phone || "",
      hotline: officeData.hotline || officeData.phone || "",
      supportNumber: officeData.supportNumber || "",
      email: officeData.email || "",
      website: officeData.website || "www.linkbd.net",
      wazeLink: officeData.wazeLink || "",
      mapsUrl: officeData.mapsUrl || "",
      isHead: Boolean(officeData.isHead),
      isActive: officeData.isActive !== false,
      sortOrder: Number(officeData.sortOrder) || db.offices.length + 1,
      createdAt: new Date().toISOString()
    };

    db.offices.push(newOffice);
    this.writeDatabase(db);
    this.logActivity("office", `Added new office: ${newOffice.name}`, newOffice.city);
    return newOffice;
  }

  updateOffice(id, updates) {
    const db = this.readDatabase();
    const index = db.offices.findIndex(o => o.id === id);
    if (index === -1) throw new Error(`Office with ID "${id}" not found`);

    db.offices[index] = {
      ...db.offices[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.writeDatabase(db);
    this.logActivity("office", `Updated office: ${db.offices[index].name}`, updates.address ? `Address updated` : "Details updated");
    return db.offices[index];
  }

  deleteOffice(id) {
    this.createBackup("before-delete-office");
    const db = this.readDatabase();
    const index = db.offices.findIndex(o => o.id === id);
    if (index === -1) throw new Error(`Office with ID "${id}" not found`);

    const deleted = db.offices.splice(index, 1)[0];
    this.writeDatabase(db);
    this.logActivity("office", `Deleted office: ${deleted.name}`);
    return deleted;
  }

  resetOffices() {
    this.createBackup("before-reset-offices");
    const db = this.readDatabase();
    db.offices = JSON.parse(JSON.stringify(defaultOffices));
    this.writeDatabase(db);
    this.logActivity("office", "Reset all offices to default Link BD locations");
    return db.offices;
  }

  // ===================== GLOBAL CONTACT =====================
  getContact() {
    const db = this.readDatabase();
    return db.contact || defaultGlobalContact;
  }

  updateContact(updates) {
    const db = this.readDatabase();
    db.contact = {
      ...db.contact,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.writeDatabase(db);
    this.logActivity("contact", "Updated global site contact settings", `Hotline: ${db.contact.mainHotline}`);
    return db.contact;
  }

  resetContact() {
    const db = this.readDatabase();
    db.contact = { ...defaultGlobalContact };
    this.writeDatabase(db);
    this.logActivity("contact", "Reset global contact settings to default");
    return db.contact;
  }

  // ===================== ADMIN CREDENTIALS =====================
  getAdmin() {
    const db = this.readDatabase();
    return db.admin;
  }

  updateAdminLoginTime() {
    const db = this.readDatabase();
    if (db.admin) {
      db.admin.lastLogin = new Date().toISOString();
      this.writeDatabase(db);
    }
  }

  updateAdminCredentials(newEmail, newPassword) {
    const db = this.readDatabase();
    if (newEmail) db.admin.email = newEmail.trim();
    if (newPassword) {
      db.admin.passwordHash = bcrypt.hashSync(newPassword, 10);
    }
    this.writeDatabase(db);
    this.logActivity("security", "Updated admin security credentials");
    return { email: db.admin.email };
  }

  // ===================== INQUIRIES & BILLS =====================
  getInquiries() {
    const db = this.readDatabase();
    return db.inquiries || [];
  }

  addInquiry(inquiry) {
    const db = this.readDatabase();
    if (!db.inquiries) db.inquiries = [];
    const newInq = {
      id: `INQ-${Date.now().toString().slice(-6)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...inquiry
    };
    db.inquiries.unshift(newInq);
    this.writeDatabase(db);
    this.logActivity("lead", `New connection lead from ${newInq.name || newInq.phone}`, newInq.package);
    return newInq;
  }

  updateInquiryStatus(id, status, notes = "") {
    const db = this.readDatabase();
    const inq = (db.inquiries || []).find(i => i.id === id);
    if (!inq) throw new Error("Inquiry not found");
    inq.status = status;
    if (notes) inq.notes = notes;
    inq.updatedAt = new Date().toISOString();
    this.writeDatabase(db);
    return inq;
  }

  getPayments() {
    const db = this.readDatabase();
    return db.payments || [];
  }

  addPayment(payment) {
    const db = this.readDatabase();
    if (!db.payments) db.payments = [];
    const newPay = {
      id: `PAY-${Date.now().toString().slice(-6)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...payment
    };
    db.payments.unshift(newPay);
    this.writeDatabase(db);
    this.logActivity("payment", `Bill submission: ৳${newPay.amount} (Trx: ${newPay.trxId || "N/A"})`);
    return newPay;
  }

  updatePaymentStatus(id, status) {
    const db = this.readDatabase();
    const pay = (db.payments || []).find(p => p.id === id);
    if (!pay) throw new Error("Payment record not found");
    pay.status = status;
    pay.updatedAt = new Date().toISOString();
    this.writeDatabase(db);
    return pay;
  }
}

export const dataService = new DataService();
export default dataService;
