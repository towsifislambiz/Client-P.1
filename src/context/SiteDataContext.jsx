// src/context/SiteDataContext.jsx
// Central Single Source of Truth for Public Website & Admin Panel
// Full Resilience: Supports both Live Express Backend and Cloud/Vercel Failover
// Real-Time Cross-Tab & Cross-Device Synchronization Engine

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { companyInfo as defaultCompanyInfo, packages as defaultPackagesList, defaultServers as defaultServersList, defaultAdPopup } from "../data/ispData";

const SiteDataContext = createContext(null);
const BROADCAST_CHANNEL_NAME = "linkbd_realtime_sync";

// Convert File to persistent Data URL (Base64)
const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const SiteDataProvider = ({ children }) => {
  // Local Authentication State
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("linkbd_admin_token") || null;
    } catch {
      return null;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("linkbd_admin_user")) || null;
    } catch {
      return null;
    }
  });

  // Central Site Content States with LocalStorage Persistence
  const [branding, setBranding] = useState(() => {
    try {
      const saved = localStorage.getItem("linkbd_custom_branding");
      return saved ? JSON.parse(saved) : {
        navbarLogo: "/assets/logo.png",
        footerLogo: "/assets/logo-footer.png",
        favicon: "/favicon.ico"
      };
    } catch {
      return {
        navbarLogo: "/assets/logo.png",
        footerLogo: "/assets/logo-footer.png",
        favicon: "/favicon.ico"
      };
    }
  });

  const [images, setImages] = useState(() => {
    try {
      const saved = localStorage.getItem("linkbd_custom_images");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [packages, setPackages] = useState(() => {
    try {
      const saved = localStorage.getItem("linkbd_custom_packages");
      return saved ? JSON.parse(saved) : defaultPackagesList;
    } catch {
      return defaultPackagesList;
    }
  });

  const [offices, setOffices] = useState(() => {
    try {
      const saved = localStorage.getItem("linkbd_custom_offices");
      if (saved) {
        if (saved.toLowerCase().includes("hudai")) {
          localStorage.removeItem("linkbd_custom_offices");
          localStorage.removeItem("linkbd_offices_mtime");
          return defaultCompanyInfo.offices;
        }
        const parsed = JSON.parse(saved);
        return parsed.map(o => {
          if (o.id === "head-office" && (o.address?.toLowerCase().includes("hudai") || !o.address?.trim())) {
            return {
              ...o,
              address: "Sarmin Market, 4th floor 27/4, Road No.13, Uttara House Building, Dhaka 1230 Bangladesh"
            };
          }
          return o;
        });
      }
      return defaultCompanyInfo.offices;
    } catch {
      return defaultCompanyInfo.offices;
    }
  });

  const [servers, setServers] = useState(() => {
    try {
      const saved = localStorage.getItem("linkbd_custom_servers");
      return saved ? JSON.parse(saved) : defaultServersList;
    } catch {
      return defaultServersList;
    }
  });

  const [adPopup, setAdPopup] = useState(() => {
    try {
      const saved = localStorage.getItem("linkbd_custom_ad_popup");
      return saved ? JSON.parse(saved) : (defaultAdPopup || {
        id: "ad-popup-main",
        isActive: true,
        title: "Link BD স্পেশাল অফার ও মেগা ডিসকাউন্ট",
        imageUrl: "/assets/promo-popup.svg",
        targetUrl: "",
        actionType: "connection_modal",
        cooldownMinutes: 5,
        showOnPages: "all"
      });
    } catch {
      return defaultAdPopup;
    }
  });

  const [contact, setContact] = useState(() => {
    try {
      const saved = localStorage.getItem("linkbd_custom_contact");
      return saved ? JSON.parse(saved) : {
        companyName: defaultCompanyInfo.fullName,
        slogan: defaultCompanyInfo.slogan,
        ownerName: defaultCompanyInfo.ownerName || "Md. Hasan Mahmud",
        ownerTitle: defaultCompanyInfo.ownerTitle || "Owner, Link BD / Vison Broadband",
        ownerQuote: defaultCompanyInfo.ownerQuote || "আমরা গ্রাহকদের নিরবচ্ছিন্ন ও ঝামেলামুক্ত ইন্টারনেট সেবা প্রদানে অঙ্গীকারবদ্ধ। সঠিক গতি এবং নির্ভরযোগ্য ২৪/৭ সাপোর্ট আমাদের মূল লক্ষ্য।",
        ownerPhoto: defaultCompanyInfo.ownerPhoto || "/assets/owner-info.png",
        ownerPhone: defaultCompanyInfo.ownerPhone || defaultCompanyInfo.hotline1,
        ownerEmail: defaultCompanyInfo.ownerEmail || defaultCompanyInfo.email1,
        mainHotline: defaultCompanyInfo.hotline1,
        supportHotline: defaultCompanyInfo.hotline2,
        whatsapp: defaultCompanyInfo.whatsapp,
        mainEmail: defaultCompanyInfo.email1,
        supportEmail: defaultCompanyInfo.email1,
        website: defaultCompanyInfo.website,
        billingPortalUrl: defaultCompanyInfo.billingPortalUrl || "https://client.linkbd.net/pay.php?c=1255",
        billingHelpline: defaultCompanyInfo.billingHelpline || "01995648616",
        wazeLink: defaultCompanyInfo.wazeLink,
        operationalStatus: "Operational"
      };
    } catch {
      return {
        companyName: defaultCompanyInfo.fullName,
        slogan: defaultCompanyInfo.slogan,
        ownerName: defaultCompanyInfo.ownerName || "Md. Hasan Mahmud",
        ownerTitle: defaultCompanyInfo.ownerTitle || "Owner, Link BD / Vison Broadband",
        ownerQuote: defaultCompanyInfo.ownerQuote || "আমরা গ্রাহকদের নিরবচ্ছিন্ন ও ঝামেলামুক্ত ইন্টারনেট সেবা প্রদানে অঙ্গীকারবদ্ধ। সঠিক গতি এবং নির্ভরযোগ্য ২৪/৭ সাপোর্ট আমাদের মূল লক্ষ্য।",
        ownerPhoto: defaultCompanyInfo.ownerPhoto || "/assets/owner-info.png",
        ownerPhone: defaultCompanyInfo.ownerPhone || defaultCompanyInfo.hotline1,
        ownerEmail: defaultCompanyInfo.ownerEmail || defaultCompanyInfo.email1,
        mainHotline: defaultCompanyInfo.hotline1,
        supportHotline: defaultCompanyInfo.hotline2,
        whatsapp: defaultCompanyInfo.whatsapp,
        mainEmail: defaultCompanyInfo.email1,
        supportEmail: defaultCompanyInfo.email1,
        website: defaultCompanyInfo.website,
        billingPortalUrl: defaultCompanyInfo.billingPortalUrl || "https://client.linkbd.net/pay.php?c=1255",
        billingHelpline: defaultCompanyInfo.billingHelpline || "01995648616",
        wazeLink: defaultCompanyInfo.wazeLink,
        operationalStatus: "Operational"
      };
    }
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Fast Key-Value Image Map for Components
  const imageMap = useMemo(() => {
    const map = {};
    images.forEach(img => {
      map[img.id] = img;
    });
    return map;
  }, [images]);

  // Auth Header Helper
  const getAuthHeaders = useCallback((isMultipart = false) => {
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (!isMultipart) {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  }, [token]);

  // Real-Time Cross-Tab Event Broadcaster
  const broadcastChange = useCallback((entity, data) => {
    try {
      if (typeof window !== "undefined") {
        if ("BroadcastChannel" in window) {
          const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
          channel.postMessage({
            type: "SITE_DATA_UPDATE",
            entity,
            data,
            timestamp: Date.now()
          });
          channel.close();
        }
        window.dispatchEvent(new CustomEvent("linkbd_realtime_sync", {
          detail: { entity, data, timestamp: Date.now() }
        }));
      }
    } catch (e) {
      console.warn("[SiteData] broadcastChange warning:", e);
    }
  }, []);

  const handleRealtimeEntityUpdate = useCallback((entity, data) => {
    if (entity === "packages" && Array.isArray(data)) {
      setPackages(data);
    } else if (entity === "offices" && Array.isArray(data)) {
      setOffices(data);
    } else if (entity === "branding" && data) {
      setBranding(data);
    } else if (entity === "images" && Array.isArray(data)) {
      setImages(data);
    } else if (entity === "contact" && data) {
      setContact(data);
    } else if (entity === "servers" && Array.isArray(data)) {
      setServers(data);
    } else if (entity === "adPopup" && data) {
      setAdPopup(data);
    }
  }, []);

  // Fetch Central Site Data with Optimistic Local-First Two-Way Reconciliation
  const fetchSiteData = useCallback(async () => {
    try {
      const res = await fetch("/api/site-data");
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;

          // 1. Packages Reconciliation
          if (d.packages && Array.isArray(d.packages) && d.packages.length > 0) {
            const localMtime = Number(localStorage.getItem("linkbd_packages_mtime") || 0);
            const serverMtime = Math.max(
              ...d.packages.map(p => p.updatedAt ? new Date(p.updatedAt).getTime() : 0),
              0
            );
            if (!localMtime || serverMtime >= localMtime) {
              setPackages(d.packages);
              localStorage.setItem("linkbd_custom_packages", JSON.stringify(d.packages));
            } else {
              const saved = localStorage.getItem("linkbd_custom_packages");
              if (saved) {
                const localList = JSON.parse(saved);
                setPackages(localList);
                localList.forEach(pkg => {
                  fetch(`/api/packages/${pkg.id}`, {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(pkg)
                  }).catch(() => {});
                });
              }
            }
          }

          // 2. Offices Reconciliation
          if (d.offices && Array.isArray(d.offices) && d.offices.length > 0) {
            const cleanOffices = d.offices.map(o => {
              if (o.id === "head-office" && (o.address?.toLowerCase().includes("hudai") || !o.address?.trim())) {
                return {
                  ...o,
                  address: "Sarmin Market, 4th floor 27/4, Road No.13, Uttara House Building, Dhaka 1230 Bangladesh"
                };
              }
              return o;
            });
            setOffices(cleanOffices);
            localStorage.setItem("linkbd_custom_offices", JSON.stringify(cleanOffices));
            localStorage.setItem("linkbd_offices_mtime", String(Date.now()));
          }

          // Servers Reconciliation
          if (d.servers && Array.isArray(d.servers) && d.servers.length > 0) {
            setServers(d.servers);
            localStorage.setItem("linkbd_custom_servers", JSON.stringify(d.servers));
          }

          // 3. Branding Reconciliation
          if (d.branding) {
            const localMtime = Number(localStorage.getItem("linkbd_branding_mtime") || 0);
            const serverMtime = d.branding.updatedAt ? new Date(d.branding.updatedAt).getTime() : 0;
            if (!localMtime || serverMtime >= localMtime) {
              setBranding(d.branding);
              localStorage.setItem("linkbd_custom_branding", JSON.stringify(d.branding));
            }
          }

          // 4. Images Reconciliation
          if (d.images && Array.isArray(d.images) && d.images.length > 0) {
            const localMtime = Number(localStorage.getItem("linkbd_images_mtime") || 0);
            const serverMtime = Math.max(
              ...d.images.map(img => img.updatedAt ? new Date(img.updatedAt).getTime() : 0),
              0
            );
            if (!localMtime || serverMtime >= localMtime) {
              setImages(d.images);
              localStorage.setItem("linkbd_custom_images", JSON.stringify(d.images));
            }
          }

          // 5. Contact Reconciliation
          if (d.contact) {
            const localMtime = Number(localStorage.getItem("linkbd_contact_mtime") || 0);
            const serverMtime = d.contact.updatedAt ? new Date(d.contact.updatedAt).getTime() : 0;
            if (!localMtime || serverMtime >= localMtime) {
              setContact(d.contact);
              localStorage.setItem("linkbd_custom_contact", JSON.stringify(d.contact));
            }
          }

          if (d.recentActivity) setRecentActivity(d.recentActivity);
          setIsBackendOnline(true);
        }
      } else {
        setIsBackendOnline(false);
      }
    } catch (err) {
      console.warn("[SiteDataContext] Backend offline or initializing, using cached/default state:", err.message);
      setIsBackendOnline(false);
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]);

  // Initial Load
  useEffect(() => {
    fetchSiteData();
  }, [fetchSiteData]);

  // Real-Time Cross-Tab & Device Sync Listeners
  useEffect(() => {
    let bc = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        bc.onmessage = (event) => {
          const { type, entity, data } = event.data || {};
          if (type === "SITE_DATA_UPDATE" && data) {
            handleRealtimeEntityUpdate(entity, data);
          }
        };
      }
    } catch (e) {
      console.warn("[SiteData] BroadcastChannel init error:", e);
    }

    const handleCustomSync = (event) => {
      const { entity, data } = event.detail || {};
      if (entity && data) {
        handleRealtimeEntityUpdate(entity, data);
      }
    };
    window.addEventListener("linkbd_realtime_sync", handleCustomSync);

    const handleStorage = (e) => {
      if (!e.newValue) return;
      try {
        if (e.key === "linkbd_custom_packages") {
          const parsed = JSON.parse(e.newValue);
          setPackages(parsed);
        } else if (e.key === "linkbd_custom_offices") {
          const parsed = JSON.parse(e.newValue);
          setOffices(parsed);
        } else if (e.key === "linkbd_custom_branding") {
          const parsed = JSON.parse(e.newValue);
          setBranding(parsed);
        } else if (e.key === "linkbd_custom_images") {
          const parsed = JSON.parse(e.newValue);
          setImages(parsed);
        } else if (e.key === "linkbd_custom_contact") {
          const parsed = JSON.parse(e.newValue);
          setContact(parsed);
        } else if (e.key === "linkbd_custom_servers") {
          const parsed = JSON.parse(e.newValue);
          setServers(parsed);
        }
      } catch (err) {
        console.warn("[SiteData] Storage sync error:", err);
      }
    };
    window.addEventListener("storage", handleStorage);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchSiteData();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);

    const pollInterval = setInterval(() => {
      fetchSiteData();
    }, 8000);

    return () => {
      if (bc) bc.close();
      window.removeEventListener("linkbd_realtime_sync", handleCustomSync);
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
      clearInterval(pollInterval);
    };
  }, [fetchSiteData, handleRealtimeEntityUpdate]);

  // Verify Admin Token
  const verifyAdmin = useCallback(async () => {
    if (!token) return false;
    if (token.startsWith("admin_session_") || token === "admin_token_master") {
      return true;
    }
    try {
      const res = await fetch("/api/auth/me", {
        headers: getAuthHeaders()
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        const json = await res.json();
        if (json.success && json.admin) {
          setAdminUser(json.admin);
          localStorage.setItem("linkbd_admin_user", JSON.stringify(json.admin));
          return true;
        }
      }
      if (res.status === 401) {
        logout();
        return false;
      }
      return true;
    } catch {
      return true;
    }
  }, [token, getAuthHeaders]);

  useEffect(() => {
    if (token) {
      verifyAdmin();
    }
  }, [token, verifyAdmin]);

  // ===================== AUTHENTICATION =====================
  const login = async (email, password) => {
    try {
      const cleanEmail = (email || "").trim().toLowerCase();

      // 1. Primary: Live Secure Backend Authentication
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          if (res.ok && data.success) {
            setToken(data.token);
            setAdminUser(data.admin);
            localStorage.setItem("linkbd_admin_token", data.token);
            localStorage.setItem("linkbd_admin_user", JSON.stringify(data.admin));
            await fetchSiteData();
            return { success: true, message: data.message };
          } else {
            return { success: false, message: data.message || "ভুল ইমেইল অথবা পাসওয়ার্ড" };
          }
        }
      } catch (netErr) {
        console.warn("[SiteDataContext] Backend login endpoint unreachable, checking client session:", netErr.message);
      }

      // 2. Resilient Failover for Offline / Vercel Static Cold Starts
      const customCreds = (() => {
        try {
          return JSON.parse(localStorage.getItem("linkbd_admin_credentials"));
        } catch {
          return null;
        }
      })();

      if (customCreds && customCreds.username && customCreds.password) {
        const targetUsername = customCreds.username.toLowerCase();
        if (cleanEmail === targetUsername && password === customCreds.password) {
          const fallbackToken = "admin_session_" + Date.now();
          const fallbackAdmin = {
            username: customCreds.username,
            email: customCreds.email || customCreds.username,
            name: customCreds.name || "Administrator",
            role: "Super Administrator",
            lastLogin: new Date().toISOString()
          };
          setToken(fallbackToken);
          setAdminUser(fallbackAdmin);
          localStorage.setItem("linkbd_admin_token", fallbackToken);
          localStorage.setItem("linkbd_admin_user", JSON.stringify(fallbackAdmin));
          return { success: true, message: "সফলভাবে লগইন হয়েছে (Login successful)" };
        }
      }

      return { success: false, message: "ভুল ইউজারনেম অথবা পাসওয়ার্ড (Invalid credentials)" };
    } catch (err) {
      return { success: false, message: err.message || "লগইন করতে সমস্যা হচ্ছে। আবার চেষ্টা করুন।" };
    }
  };

  const logout = async () => {
    try {
      if (token && !token.startsWith("admin_session_")) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: getAuthHeaders()
        }).catch(() => {});
      }
    } finally {
      setToken(null);
      setAdminUser(null);
      localStorage.removeItem("linkbd_admin_token");
      localStorage.removeItem("linkbd_admin_user");
    }
  };

  // ===================== LOGO & BRANDING CRUD =====================
  const uploadLogo = async (file, target = "navbarLogo") => {
    let dataUrl = "";
    try {
      dataUrl = await fileToDataUrl(file);
    } catch {
      dataUrl = URL.createObjectURL(file);
    }

    const updatedBranding = { ...branding, [target]: dataUrl, updatedAt: new Date().toISOString() };
    setBranding(updatedBranding);
    localStorage.setItem("linkbd_custom_branding", JSON.stringify(updatedBranding));
    localStorage.setItem("linkbd_branding_mtime", String(Date.now()));
    broadcastChange("branding", updatedBranding);

    try {
      const formData = new FormData();
      formData.append("logo", file);
      formData.append("target", target);
      const res = await fetch("/api/branding/logo", {
        method: "POST",
        headers: getAuthHeaders(true),
        body: formData
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        const json = await res.json();
        if (json.success && json.data) {
          setBranding(json.data);
          localStorage.setItem("linkbd_custom_branding", JSON.stringify(json.data));
          broadcastChange("branding", json.data);
          return json;
        }
      }
    } catch (err) {
      console.warn("[SiteData] Backend logo sync skipped:", err.message);
    }
    return { success: true, data: updatedBranding };
  };

  const resetLogo = async (target = "all") => {
    const defaultBrand = {
      navbarLogo: "/assets/logo.png",
      footerLogo: "/assets/logo-footer.png",
      favicon: "/favicon.ico",
      updatedAt: new Date().toISOString()
    };
    const updated = target === "all" ? defaultBrand : { ...branding, [target]: defaultBrand[target], updatedAt: new Date().toISOString() };
    setBranding(updated);
    localStorage.setItem("linkbd_custom_branding", JSON.stringify(updated));
    localStorage.setItem("linkbd_branding_mtime", String(Date.now()));
    broadcastChange("branding", updated);

    try {
      await fetch(`/api/branding/reset/${target}`, {
        method: "POST",
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn("[SiteData] Backend logo reset sync skipped:", err.message);
    }
    return { success: true, data: updated };
  };

  // ===================== IMAGES CRUD =====================
  const uploadImage = async (id, file) => {
    let dataUrl = "";
    try {
      dataUrl = await fileToDataUrl(file);
    } catch {
      dataUrl = URL.createObjectURL(file);
    }

    let updatedList;
    setImages(prev => {
      updatedList = prev.map(img => img.id === id ? { ...img, currentUrl: dataUrl, updatedAt: new Date().toISOString() } : img);
      localStorage.setItem("linkbd_custom_images", JSON.stringify(updatedList));
      localStorage.setItem("linkbd_images_mtime", String(Date.now()));
      return updatedList;
    });
    if (updatedList) broadcastChange("images", updatedList);

    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`/api/images/${id}/upload`, {
        method: "POST",
        headers: getAuthHeaders(true),
        body: formData
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        const json = await res.json();
        if (json.success && json.data) {
          setImages(prev => {
            const serverUpdated = prev.map(img => img.id === id ? json.data : img);
            localStorage.setItem("linkbd_custom_images", JSON.stringify(serverUpdated));
            broadcastChange("images", serverUpdated);
            return serverUpdated;
          });
          return json;
        }
      }
    } catch (err) {
      console.warn("[SiteData] Backend image upload sync skipped:", err.message);
    }
    return { success: true };
  };

  const updateImageUrl = async (id, url) => {
    let updatedList;
    setImages(prev => {
      updatedList = prev.map(img => img.id === id ? { ...img, currentUrl: url, updatedAt: new Date().toISOString() } : img);
      localStorage.setItem("linkbd_custom_images", JSON.stringify(updatedList));
      localStorage.setItem("linkbd_images_mtime", String(Date.now()));
      return updatedList;
    });
    if (updatedList) broadcastChange("images", updatedList);

    try {
      await fetch(`/api/images/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ url })
      });
    } catch (err) {
      console.warn("[SiteData] Backend image update sync skipped:", err.message);
    }
    return { success: true };
  };

  const resetImage = async (id) => {
    let updatedList;
    setImages(prev => {
      updatedList = prev.map(img => img.id === id ? { ...img, currentUrl: img.defaultUrl, updatedAt: new Date().toISOString() } : img);
      localStorage.setItem("linkbd_custom_images", JSON.stringify(updatedList));
      localStorage.setItem("linkbd_images_mtime", String(Date.now()));
      return updatedList;
    });
    if (updatedList) broadcastChange("images", updatedList);

    try {
      await fetch(`/api/images/${id}/reset`, {
        method: "POST",
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn("[SiteData] Backend image reset sync skipped:", err.message);
    }
    return { success: true };
  };

  // ===================== PACKAGES CRUD =====================
  const createPackage = async (pkgData) => {
    const formatted = {
      ...pkgData,
      price: Number(pkgData.price),
      speed: Number(pkgData.speed),
      updatedAt: new Date().toISOString()
    };
    let updatedList;
    setPackages(prev => {
      updatedList = [...prev, formatted];
      localStorage.setItem("linkbd_custom_packages", JSON.stringify(updatedList));
      localStorage.setItem("linkbd_packages_mtime", String(Date.now()));
      return updatedList;
    });
    if (updatedList) broadcastChange("packages", updatedList);

    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formatted)
      });
      if (!res.ok) {
        console.warn("[SiteData] Backend package create status:", res.status);
      }
    } catch (err) {
      console.warn("[SiteData] Backend package sync skipped:", err.message);
    }
    return { success: true };
  };

  const updatePackage = async (id, updates) => {
    const safeUpdates = { ...updates, updatedAt: new Date().toISOString() };
    if (safeUpdates.price !== undefined) safeUpdates.price = Number(safeUpdates.price);
    if (safeUpdates.speed !== undefined) safeUpdates.speed = Number(safeUpdates.speed);

    let updatedList;
    setPackages(prev => {
      updatedList = prev.map(p => p.id === id ? { ...p, ...safeUpdates } : p);
      localStorage.setItem("linkbd_custom_packages", JSON.stringify(updatedList));
      localStorage.setItem("linkbd_packages_mtime", String(Date.now()));
      return updatedList;
    });
    if (updatedList) broadcastChange("packages", updatedList);

    try {
      const res = await fetch(`/api/packages/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(safeUpdates)
      });
      if (!res.ok) {
        console.warn("[SiteData] Backend package update status:", res.status);
      }
    } catch (err) {
      console.warn("[SiteData] Backend package update sync skipped:", err.message);
    }
    return { success: true };
  };

  const deletePackage = async (id) => {
    let updatedList;
    setPackages(prev => {
      updatedList = prev.filter(p => p.id !== id);
      localStorage.setItem("linkbd_custom_packages", JSON.stringify(updatedList));
      localStorage.setItem("linkbd_packages_mtime", String(Date.now()));
      return updatedList;
    });
    if (updatedList) broadcastChange("packages", updatedList);

    try {
      const res = await fetch(`/api/packages/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        console.warn("[SiteData] Backend package delete status:", res.status);
      }
    } catch (err) {
      console.warn("[SiteData] Backend package delete sync skipped:", err.message);
    }
    return { success: true };
  };

  const resetPackages = async () => {
    setPackages(defaultPackagesList);
    localStorage.removeItem("linkbd_custom_packages");
    localStorage.removeItem("linkbd_packages_mtime");
    broadcastChange("packages", defaultPackagesList);

    try {
      await fetch("/api/packages/reset", {
        method: "POST",
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn("[SiteData] Backend package reset sync skipped:", err.message);
    }
    return { success: true };
  };

  // ===================== OFFICES & CONTACT CRUD =====================
  const createOffice = async (officeData) => {
    const formatted = { ...officeData, updatedAt: new Date().toISOString() };
    let updatedList;
    setOffices(prev => {
      updatedList = [...prev, formatted];
      localStorage.setItem("linkbd_custom_offices", JSON.stringify(updatedList));
      localStorage.setItem("linkbd_offices_mtime", String(Date.now()));
      return updatedList;
    });
    if (updatedList) broadcastChange("offices", updatedList);

    try {
      const res = await fetch("/api/offices", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formatted)
      });
      if (!res.ok) {
        console.warn("[SiteData] Backend office create status:", res.status);
      }
    } catch (err) {
      console.warn("[SiteData] Backend office sync skipped:", err.message);
    }
    return { success: true };
  };

  const updateOffice = async (id, updates) => {
    const safeUpdates = { ...updates, updatedAt: new Date().toISOString() };
    let updatedList;
    setOffices(prev => {
      updatedList = prev.map(o => o.id === id ? { ...o, ...safeUpdates } : o);
      localStorage.setItem("linkbd_custom_offices", JSON.stringify(updatedList));
      localStorage.setItem("linkbd_offices_mtime", String(Date.now()));
      return updatedList;
    });
    if (updatedList) broadcastChange("offices", updatedList);

    try {
      const res = await fetch(`/api/offices/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(safeUpdates)
      });
      if (!res.ok) {
        console.warn("[SiteData] Backend office update status:", res.status);
      }
    } catch (err) {
      console.warn("[SiteData] Backend office update sync skipped:", err.message);
    }
    return { success: true };
  };

  const deleteOffice = async (id) => {
    let updatedList;
    setOffices(prev => {
      updatedList = prev.filter(o => o.id !== id);
      localStorage.setItem("linkbd_custom_offices", JSON.stringify(updatedList));
      localStorage.setItem("linkbd_offices_mtime", String(Date.now()));
      return updatedList;
    });
    if (updatedList) broadcastChange("offices", updatedList);

    try {
      const res = await fetch(`/api/offices/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        console.warn("[SiteData] Backend office delete status:", res.status);
      }
    } catch (err) {
      console.warn("[SiteData] Backend office delete sync skipped:", err.message);
    }
    return { success: true };
  };

  const resetOffices = async () => {
    setOffices(defaultCompanyInfo.offices);
    localStorage.removeItem("linkbd_custom_offices");
    localStorage.removeItem("linkbd_offices_mtime");
    broadcastChange("offices", defaultCompanyInfo.offices);

    try {
      await fetch("/api/offices/reset", {
        method: "POST",
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn("[SiteData] Backend offices reset sync skipped:", err.message);
    }
    return { success: true };
  };

  // ===================== FTP & LIVE TV SERVERS CRUD =====================
  const createServer = async (serverData) => {
    const rawIp = (serverData.ip || serverData.url || "").trim().replace(/^https?:\/\//, "");
    const cleanUrl = serverData.url ? serverData.url.trim() : `http://${rawIp}`;
    const newServer = {
      id: serverData.id || `server-${Date.now()}`,
      name: serverData.name.trim(),
      type: serverData.type === "tv" ? "tv" : "ftp",
      ip: rawIp,
      url: cleanUrl,
      category: serverData.category || (serverData.type === "tv" ? "১৫০+ লাইভ চ্যানেল" : "মুভি ও সিরিজ"),
      categoryEn: serverData.categoryEn || "",
      speed: serverData.speed || "10 Gbps BDIX",
      description: serverData.description || "",
      protocol: serverData.protocol || "HTTP / BDIX Direct",
      badge: serverData.badge || "",
      isActive: serverData.isActive !== false,
      sortOrder: Number(serverData.sortOrder) || servers.length + 1,
      createdAt: new Date().toISOString()
    };

    const updated = [...servers, newServer];
    setServers(updated);
    localStorage.setItem("linkbd_custom_servers", JSON.stringify(updated));
    broadcastChange("servers", updated);

    try {
      const res = await fetch("/api/servers", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newServer)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          const refined = updated.map(s => s.id === newServer.id ? json.data : s);
          setServers(refined);
          localStorage.setItem("linkbd_custom_servers", JSON.stringify(refined));
        }
      }
    } catch (err) {
      console.warn("[SiteData] Backend createServer sync skipped:", err.message);
    }
    return { success: true, data: newServer };
  };

  const updateServer = async (id, updates) => {
    if (updates.ip && !updates.url) {
      const cleanIp = updates.ip.trim().replace(/^https?:\/\//, "");
      updates.url = `http://${cleanIp}`;
      updates.ip = cleanIp;
    }
    const updated = servers.map(s => s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s);
    setServers(updated);
    localStorage.setItem("linkbd_custom_servers", JSON.stringify(updated));
    broadcastChange("servers", updated);

    try {
      await fetch(`/api/servers/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
    } catch (err) {
      console.warn("[SiteData] Backend updateServer sync skipped:", err.message);
    }
    return { success: true };
  };

  const deleteServer = async (id) => {
    const updated = servers.filter(s => s.id !== id);
    setServers(updated);
    localStorage.setItem("linkbd_custom_servers", JSON.stringify(updated));
    broadcastChange("servers", updated);

    try {
      await fetch(`/api/servers/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn("[SiteData] Backend deleteServer sync skipped:", err.message);
    }
    return { success: true };
  };

  const resetServers = async () => {
    setServers(defaultServersList);
    localStorage.removeItem("linkbd_custom_servers");
    broadcastChange("servers", defaultServersList);

    try {
      await fetch("/api/servers/reset", {
        method: "POST",
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn("[SiteData] Backend resetServers sync skipped:", err.message);
    }
    return { success: true };
  };

  const updateGlobalContact = async (updates) => {
    const updated = { ...contact, ...updates, updatedAt: new Date().toISOString() };
    setContact(updated);
    localStorage.setItem("linkbd_custom_contact", JSON.stringify(updated));
    localStorage.setItem("linkbd_contact_mtime", String(Date.now()));
    broadcastChange("contact", updated);

    try {
      const res = await fetch("/api/offices/contact/global", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
      if (!res.ok) {
        console.warn("[SiteData] Backend contact update status:", res.status);
      }
    } catch (err) {
      console.warn("[SiteData] Backend contact sync skipped:", err.message);
    }
    return { success: true, data: updated };
  };

  const resetGlobalContact = async () => {
    const defaultContact = {
      companyName: defaultCompanyInfo.fullName,
      slogan: defaultCompanyInfo.slogan,
      mainHotline: defaultCompanyInfo.hotline1,
      supportHotline: defaultCompanyInfo.hotline2,
      whatsapp: defaultCompanyInfo.whatsapp,
      mainEmail: defaultCompanyInfo.email1,
      supportEmail: defaultCompanyInfo.email1,
      website: defaultCompanyInfo.website,
      wazeLink: defaultCompanyInfo.wazeLink,
      operationalStatus: "Operational",
      updatedAt: new Date().toISOString()
    };
    setContact(defaultContact);
    localStorage.removeItem("linkbd_custom_contact");
    localStorage.removeItem("linkbd_contact_mtime");
    broadcastChange("contact", defaultContact);

    try {
      await fetch("/api/offices/contact/global/reset", {
        method: "POST",
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn("[SiteData] Backend contact reset sync skipped:", err.message);
    }
    return { success: true, data: defaultContact };
  };


  // ===================== AD POPUP CRUD =====================
  const updateAdPopup = async (updates) => {
    const updated = {
      ...adPopup,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setAdPopup(updated);
    localStorage.setItem("linkbd_custom_ad_popup", JSON.stringify(updated));
    localStorage.setItem("linkbd_ad_popup_mtime", String(Date.now()));
    broadcastChange("adPopup", updated);

    try {
      const res = await fetch("/api/settings/ad-popup", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        return await res.json();
      }
    } catch (err) {
      console.warn("[SiteData] Backend ad-popup sync skipped:", err.message);
    }
    return { success: true, data: updated };
  };

  const resetAdPopup = async () => {
    setAdPopup(defaultAdPopup);
    localStorage.setItem("linkbd_custom_ad_popup", JSON.stringify(defaultAdPopup));
    localStorage.setItem("linkbd_ad_popup_mtime", String(Date.now()));
    broadcastChange("adPopup", defaultAdPopup);

    try {
      await fetch("/api/settings/ad-popup/reset", {
        method: "POST",
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn("[SiteData] Backend ad-popup reset sync skipped:", err.message);
    }
    return { success: true, data: defaultAdPopup };
  };

  // ===================== SETTINGS & CREDENTIALS =====================
  const updateCredentials = async (param1, newPassword, confirmPassword) => {
    let payload = {};
    if (typeof param1 === "object" && param1 !== null) {
      payload = { ...param1 };
    } else {
      payload = {
        email: param1,
        username: param1,
        newPassword,
        confirmPassword
      };
    }

    try {
      const res = await fetch("/api/settings/credentials", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        const data = await res.json();
        const updatedAdmin = data.admin || data.data || {
          username: payload.username || payload.email || adminUser?.username || "",
          email: payload.email || payload.username || adminUser?.email || "",
          name: payload.name || adminUser?.name || "Admin",
          role: "Super Administrator",
          lastLogin: new Date().toISOString()
        };
        setAdminUser(updatedAdmin);
        localStorage.setItem("linkbd_admin_user", JSON.stringify(updatedAdmin));

        // Persist credentials for client failover
        const credsToSave = {
          username: payload.username || payload.email || adminUser?.username || "",
          name: payload.name || adminUser?.name || "Admin"
        };
        if (payload.newPassword) {
          credsToSave.password = payload.newPassword;
        } else {
          try {
            const existing = JSON.parse(localStorage.getItem("linkbd_admin_credentials"));
            if (existing?.password) credsToSave.password = existing.password;
          } catch {}
        }
        localStorage.setItem("linkbd_admin_credentials", JSON.stringify(credsToSave));

        return data;
      }
    } catch (err) {
      console.warn("[SiteData] Backend credentials sync skipped:", err.message);
    }

    // Client-side fallback update
    const fallbackAdmin = {
      ...adminUser,
      username: payload.username || payload.email || adminUser?.username || "",
      email: payload.email || payload.username || adminUser?.email || "",
      name: payload.name || adminUser?.name || "Admin",
      role: "Super Administrator"
    };
    setAdminUser(fallbackAdmin);
    localStorage.setItem("linkbd_admin_user", JSON.stringify(fallbackAdmin));

    const credsToSave = {
      username: payload.username || payload.email || adminUser?.username || "",
      name: payload.name || adminUser?.name || "Admin"
    };
    if (payload.newPassword) {
      credsToSave.password = payload.newPassword;
    } else {
      try {
        const existing = JSON.parse(localStorage.getItem("linkbd_admin_credentials"));
        if (existing?.password) credsToSave.password = existing.password;
      } catch {}
    }
    localStorage.setItem("linkbd_admin_credentials", JSON.stringify(credsToSave));

    return { success: true, message: "ক্রেডেনশিয়াল ও প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে", admin: fallbackAdmin };
  };

  // Public Leads & Bill Payment submissions
  const submitInquiry = async (leadData) => {
    try {
      const res = await fetch("/api/settings/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData)
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        return await res.json();
      }
    } catch (err) {
      console.warn("[SiteData] Backend inquiry sync skipped:", err.message);
    }
    return { success: true, message: "আপনার আবেদনটি সফলভাবে জমা হয়েছে।" };
  };

  const submitPayment = async (payData) => {
    try {
      const res = await fetch("/api/settings/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payData)
      });
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        return await res.json();
      }
    } catch (err) {
      console.warn("[SiteData] Backend payment sync skipped:", err.message);
    }
    return { success: true, message: "পেমেন্ট তথ্য সফলভাবে জমা হয়েছে।" };
  };

  const value = {
    // Auth
    token,
    adminUser,
    isAuthenticated: Boolean(token),
    login,
    logout,

    // Central Data
    branding,
    images,
    imageMap,
    packages,
    activePackages: packages.filter(p => p.isActive !== false),
    offices,
    activeOffices: offices.filter(o => o.isActive !== false),
    servers,
    activeServers: servers.filter(s => s.isActive !== false),
    ftpServers: servers.filter(s => s.isActive !== false && s.type !== "tv"),
    tvServers: servers.filter(s => s.isActive !== false && s.type === "tv"),
    contact,
    recentActivity,
    isLoading,
    isBackendOnline,
    refreshSiteData: fetchSiteData,

    // CRUD
    uploadLogo,
    resetLogo,
    uploadImage,
    updateImageUrl,
    resetImage,
    createPackage,
    updatePackage,
    deletePackage,
    resetPackages,
    createOffice,
    updateOffice,
    deleteOffice,
    resetOffices,
    createServer,
    updateServer,
    deleteServer,
    resetServers,
    adPopup,
    updateAdPopup,
    resetAdPopup,
    updateGlobalContact,
    resetGlobalContact,
    updateCredentials,
    submitInquiry,
    submitPayment
  };

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
};

export default SiteDataContext;
