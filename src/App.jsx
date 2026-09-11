import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SiteDataProvider } from "./context/SiteDataContext";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ConnectionModal from "./components/ConnectionModal";
import WhatsAppWidget from "./components/WhatsAppWidget";
import PromoModal from "./components/PromoModal";

import HomePage from "./pages/HomePage";
import PackagesPage from "./pages/PackagesPage";
import CoveragePage from "./pages/CoveragePage";
import BillPayPage from "./pages/BillPayPage";
import FtpTvPage from "./pages/FtpTvPage";
import ClientsPage from "./pages/ClientsPage";
import OfficesPage from "./pages/OfficesPage";
import ContactPage from "./pages/ContactPage";
import AdminRouter from "./admin/AdminRouter";

function AppContent() {
  const [connectionModalOpen, setConnectionModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setConnectionModalOpen(true);
  };

  const handleOpenConnectionModal = () => {
    setSelectedPackage(null);
    setConnectionModalOpen(true);
  };

  // If on Admin Panel, render dedicated Admin Portal without public shell
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    );
  }

  // Public Website Shell (100% Preserved)
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
        <ScrollToTop />
        <ScrollProgress />
        <CustomCursor />

        {/* Navbar */}
        <Navbar onOpenConnectionModal={handleOpenConnectionModal} />

        {/* Routes for 8 Public Pages */}
        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  onOpenConnectionModal={handleOpenConnectionModal}
                  onSelectPackage={handleSelectPackage}
                />
              } 
            />
            <Route 
              path="/packages" 
              element={<PackagesPage onSelectPackage={handleSelectPackage} />} 
            />
            <Route 
              path="/coverage" 
              element={<CoveragePage onOpenConnectionModal={handleOpenConnectionModal} />} 
            />
            <Route 
              path="/bill-pay" 
              element={<BillPayPage />} 
            />
            <Route 
              path="/ftp-tv" 
              element={<FtpTvPage />} 
            />
            <Route 
              path="/clients" 
              element={<ClientsPage />} 
            />
            <Route 
              path="/offices" 
              element={<OfficesPage />} 
            />
            <Route 
              path="/contact" 
              element={<ContactPage />} 
            />
            {/* Route Aliases & Fallbacks */}
            <Route path="/billpay" element={<Navigate to="/bill-pay" replace />} />
            <Route path="/ftptv" element={<Navigate to="/ftp-tv" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer onOpenConnectionModal={handleOpenConnectionModal} />

        {/* Connection Request Modal & Floating WhatsApp */}
        <ConnectionModal
          isOpen={connectionModalOpen}
          onClose={() => setConnectionModalOpen(false)}
          preselectedPackage={selectedPackage}
        />

        <WhatsAppWidget />
        <PromoModal onOpenConnectionModal={handleOpenConnectionModal} />
      </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <AppContent />
    </SiteDataProvider>
  );
}
