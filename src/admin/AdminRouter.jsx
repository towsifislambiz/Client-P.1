// src/admin/AdminRouter.jsx
// Protected Admin Router with Authentication Guard and Layout Wrapper

import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import AdminLayout from "./components/AdminLayout";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminImagesPage from "./pages/AdminImagesPage";
import AdminPackagesPage from "./pages/AdminPackagesPage";
import AdminOfficesPage from "./pages/AdminOfficesPage";
import AdminBrandingPage from "./pages/AdminBrandingPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminSecurityPage from "./pages/AdminSecurityPage";
import AdminServersPage from "./pages/AdminServersPage";
import AdminProfilePage from "./pages/AdminProfilePage";

// Authentication Guard Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSiteData();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-medium">অ্যাডমিন লোড হচ্ছে...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default function AdminRouter() {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="login" element={<AdminLoginPage />} />

      {/* Protected Routes */}
      <Route
        index
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="images"
        element={
          <ProtectedRoute>
            <AdminImagesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="packages"
        element={
          <ProtectedRoute>
            <AdminPackagesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="offices"
        element={
          <ProtectedRoute>
            <AdminOfficesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="branding"
        element={
          <ProtectedRoute>
            <AdminBrandingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="settings"
        element={
          <ProtectedRoute>
            <AdminSettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="servers"
        element={
          <ProtectedRoute>
            <AdminServersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="security"
        element={
          <ProtectedRoute>
            <AdminSecurityPage />
          </ProtectedRoute>
        }
      />

            <Route
        path="profile"
        element={
          <ProtectedRoute>
            <AdminProfilePage />
          </ProtectedRoute>
        }
      />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
