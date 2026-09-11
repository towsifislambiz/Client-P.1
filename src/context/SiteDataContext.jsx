// src/context/SiteDataContext.jsx
// Central Single Source of Truth for Public Website & Admin Panel

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { companyInfo as defaultCompanyInfo, packages as defaultPackagesList } from "../data/ispData";

const SiteDataContext = createContext(null);

export const SiteDataProvider = ({ children }) => {
  // Local Authentication State
  const [token, setToken] = useState(() => localStorage.getItem("linkbd_admin_token") || null);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("linkbd_admin_user")) || null;
    } catch {
      return null;
    }
  });

  // Central Site Content States
  const [branding, setBranding] = useState({
    navbarLogo: "/assets/logo.png",
    footerLogo: "/assets/logo-footer.png",
    favicon: "/favicon.ico"
  });

  const [images, setImages] = useState([]);
  const [packages, setPackages] = useState(defaultPackagesList);
  const [offices, setOffices] = useState(defaultCompanyInfo.offices);
  const [contact, setContact] = useState({
    companyName: defaultCompanyInfo.fullName,
    slogan: defaultCompanyInfo.slogan,
    mainHotline: defaultCompanyInfo.hotline1,
    supportHotline: defaultCompanyInfo.hotline2,
    whatsapp: defaultCompanyInfo.whatsapp,
    mainEmail: defaultCompanyInfo.email1,
    supportEmail: defaultCompanyInfo.email1,
    website: defaultCompanyInfo.website,
    wazeLink: defaultCompanyInfo.wazeLink,
    operationalStatus: "Operational"
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

  // Fetch Central Site Data
  const fetchSiteData = useCallback(async () => {
    try {
      const res = await fetch("/api/site-data");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          if (d.branding) setBranding(d.branding);
          if (d.images && d.images.length > 0) setImages(d.images);
          if (d.packages && d.packages.length > 0) setPackages(d.packages);
          if (d.offices && d.offices.length > 0) setOffices(d.offices);
          if (d.contact) setContact(d.contact);
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
  }, []);

  // Initial Load & Auth Check
  useEffect(() => {
    fetchSiteData();
  }, [fetchSiteData]);

  // Verify Admin Token
  const verifyAdmin = useCallback(async () => {
    if (!token) return false;
    try {
      const res = await fetch("/api/auth/me", {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.admin) {
          setAdminUser(json.admin);
          localStorage.setItem("linkbd_admin_user", JSON.stringify(json.admin));
          return true;
        }
      }
      // If invalid
      logout();
      return false;
    } catch {
      return false;
    }
  }, [token, getAuthHeaders]);

  useEffect(() => {
    if (token) {
      verifyAdmin();
    }
  }, [token, verifyAdmin]);

  // Authentication Methods
  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "লগইন ব্যর্থ হয়েছে");
      }

      setToken(data.token);
      setAdminUser(data.admin);
      localStorage.setItem("linkbd_admin_token", data.token);
      localStorage.setItem("linkbd_admin_user", JSON.stringify(data.admin));
      await fetchSiteData();
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    try {
      if (token) {
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
    const formData = new FormData();
    formData.append("logo", file);
    formData.append("target", target);

    const res = await fetch("/api/branding/logo", {
      method: "POST",
      headers: getAuthHeaders(true),
      body: formData
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "লোগো আপলোড ব্যর্থ হয়েছে");

    setBranding(json.data);
    await fetchSiteData();
    return json;
  };

  const resetLogo = async (target = "all") => {
    const res = await fetch(`/api/branding/reset/${target}`, {
      method: "POST",
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "লোগো রিসেট ব্যর্থ হয়েছে");

    setBranding(json.data);
    await fetchSiteData();
    return json;
  };

  // ===================== IMAGES CRUD =====================
  const uploadImage = async (id, file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`/api/images/${id}/upload`, {
      method: "POST",
      headers: getAuthHeaders(true),
      body: formData
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "ছবি আপলোড ব্যর্থ হয়েছে");

    setImages(prev => prev.map(img => img.id === id ? json.data : img));
    await fetchSiteData();
    return json;
  };

  const updateImageUrl = async (id, url) => {
    const res = await fetch(`/api/images/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ url })
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "ছবি আপডেট ব্যর্থ হয়েছে");

    setImages(prev => prev.map(img => img.id === id ? json.data : img));
    await fetchSiteData();
    return json;
  };

  const resetImage = async (id) => {
    const res = await fetch(`/api/images/${id}/reset`, {
      method: "POST",
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "ছবি রিসেট ব্যর্থ হয়েছে");

    setImages(prev => prev.map(img => img.id === id ? json.data : img));
    await fetchSiteData();
    return json;
  };

  // ===================== PACKAGES CRUD =====================
  const createPackage = async (pkgData) => {
    const res = await fetch("/api/packages", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(pkgData)
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "প্যাকেজ তৈরি ব্যর্থ হয়েছে");

    await fetchSiteData();
    return json;
  };

  const updatePackage = async (id, updates) => {
    const res = await fetch(`/api/packages/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "প্যাকেজ আপডেট ব্যর্থ হয়েছে");

    await fetchSiteData();
    return json;
  };

  const deletePackage = async (id) => {
    const res = await fetch(`/api/packages/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "প্যাকেজ ডিলিট ব্যর্থ হয়েছে");

    await fetchSiteData();
    return json;
  };

  const resetPackages = async () => {
    const res = await fetch("/api/packages/reset", {
      method: "POST",
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "প্যাকেজ রিসেট ব্যর্থ হয়েছে");

    await fetchSiteData();
    return json;
  };

  // ===================== OFFICES & CONTACT CRUD =====================
  const createOffice = async (officeData) => {
    const res = await fetch("/api/offices", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(officeData)
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "অফিস যোগ করা ব্যর্থ হয়েছে");

    await fetchSiteData();
    return json;
  };

  const updateOffice = async (id, updates) => {
    const res = await fetch(`/api/offices/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "অফিস আপডেট ব্যর্থ হয়েছে");

    await fetchSiteData();
    return json;
  };

  const deleteOffice = async (id) => {
    const res = await fetch(`/api/offices/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "অফিস ডিলিট ব্যর্থ হয়েছে");

    await fetchSiteData();
    return json;
  };

  const resetOffices = async () => {
    const res = await fetch("/api/offices/reset", {
      method: "POST",
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "অফিস রিসেট ব্যর্থ হয়েছে");

    await fetchSiteData();
    return json;
  };

  const updateGlobalContact = async (updates) => {
    const res = await fetch("/api/offices/contact/global", {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "যোগাযোগ সেটিংস আপডেট ব্যর্থ হয়েছে");

    setContact(json.data);
    await fetchSiteData();
    return json;
  };

  const resetGlobalContact = async () => {
    const res = await fetch("/api/offices/contact/global/reset", {
      method: "POST",
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "যোগাযোগ সেটিংস রিসেট ব্যর্থ হয়েছে");

    setContact(json.data);
    await fetchSiteData();
    return json;
  };

  // ===================== SETTINGS & CREDENTIALS =====================
  const updateCredentials = async (email, newPassword, confirmPassword) => {
    const res = await fetch("/api/settings/credentials", {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, newPassword, confirmPassword })
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || "ক্রেডেনশিয়াল আপডেট ব্যর্থ হয়েছে");
    return json;
  };

  // Public Leads & Bill Payment submissions
  const submitInquiry = async (leadData) => {
    const res = await fetch("/api/settings/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData)
    });
    return await res.json();
  };

  const submitPayment = async (payData) => {
    const res = await fetch("/api/settings/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payData)
    });
    return await res.json();
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
