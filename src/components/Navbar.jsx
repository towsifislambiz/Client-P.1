import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, Mail, Wifi, CreditCard, Tv, Menu, X, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "../context/SiteDataContext";

export default function Navbar({ onOpenConnectionModal }) {
  const { branding, contact } = useSiteData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = (smooth = true) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: smooth ? 1.2 : 0, immediate: !smooth });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "auto" });
    }
  };

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      scrollToTop(true);
    } else {
      navigate("/");
      setTimeout(() => scrollToTop(false), 50);
    }
  };

  const handleNavLinkClick = (e, to) => {
    if (to === "/" && location.pathname === "/") {
      e.preventDefault();
      scrollToTop(true);
    }
  };

  const navLinks = [
    { to: "/", label: "হোম" },
    { to: "/packages", label: "প্যাকেজ সমূহ" },
    { to: "/coverage", label: "কাভারেজ এরিয়া" },
    { to: "/bill-pay", label: "বিল পরিশোধ" },
    { to: "/ftp-tv", label: "এফটিপি ও টিভি" },
    { to: "/clients", label: "ক্লায়েন্টবৃন্দ" },
    { to: "/offices", label: "আমাদের অফিস" },
    { to: "/contact", label: "যোগাযোগ" },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Notification & Utility Bar - Clean Responsive Layout */}
      <div className="bg-slate-950 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          {/* Hotline info */}
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <span className="flex items-center gap-1.5 text-slate-300 truncate">
              <Phone className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="hidden xs:inline">হেল্পলাইন:</span>
              <a
                href={`tel:${contact.mainHotline}`}
                className="font-semibold text-white hover:text-cyan-300 transition-colors truncate"
              >
                {contact.mainHotline}
              </a>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              {contact.mainEmail}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-signal-pulse" />
              {contact.operationalStatus || "Operational"}
            </span>
          </div>

          {/* Quick links on right */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <Link
              to="/bill-pay"
              className="flex items-center gap-1 text-cyan-300 hover:text-white px-2 py-0.5 rounded-md bg-blue-900/50 hover:bg-blue-800/70 border border-blue-700/40 transition-colors text-[10px] sm:text-[11px] font-medium"
            >
              <CreditCard className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              বিল পে
            </Link>
            <Link
              to="/ftp-tv"
              className="flex items-center gap-1 text-amber-300 hover:text-white px-2 py-0.5 rounded-md bg-amber-950/50 hover:bg-amber-900/60 border border-amber-600/40 transition-colors text-[10px] sm:text-[11px] font-medium"
            >
              <Tv className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              FTP/TV
            </Link>
            <Link
              to="/admin"
              className="hidden sm:inline-block text-slate-400 hover:text-cyan-300 text-[11px] font-semibold transition-colors ml-1 cursor-pointer"
              title="Admin Control Panel"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar with Glassmorphic Transition */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled ? "glass-nav-scrolled" : "glass-nav"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-3 xl:px-6 2xl:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-17">
            {/* Brand Logo */}
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center group shrink-0 mr-1.5 lg:mr-2 xl:mr-4 cursor-pointer"
              title="Link BD - হোম পেইজে যান"
            >
              <img
                src={branding.navbarLogo || "/assets/logo.png"}
                alt="Link BD"
                className="h-7 sm:h-8 lg:h-8 xl:h-9 2xl:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/assets/logo.png";
                }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 p-1 lg:p-1 xl:p-1.5 rounded-xl xl:rounded-2xl bg-gradient-to-r from-blue-50/90 via-slate-100/95 to-cyan-50/90 border border-blue-200/70 shadow-sm backdrop-blur-md shrink min-w-0">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={(e) => handleNavLinkClick(e, link.to)}
                    className={`relative px-1.5 lg:px-2 xl:px-2.5 2xl:px-3.5 py-1 xl:py-1.5 rounded-lg xl:rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer text-[11px] lg:text-[11.5px] xl:text-[13px] 2xl:text-[14px] font-bold ${
                      isActive
                        ? "text-white font-extrabold"
                        : "text-slate-800 hover:text-blue-700 hover:bg-white/90"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg xl:rounded-xl shadow-md shadow-blue-500/25 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center shrink-0 ml-1.5 lg:ml-2 xl:ml-3">
              <button
                onClick={onOpenConnectionModal}
                className="relative group overflow-hidden rounded-xl p-px font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer shrink-0"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 transition-all duration-300 group-hover:opacity-90"></span>
                <span className="relative flex items-center gap-1.5 px-2.5 lg:px-3 xl:px-4 py-1.5 lg:py-2 xl:py-2.5 rounded-[11px] bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[11px] lg:text-[11.5px] xl:text-xs transition-all duration-200 group-hover:bg-opacity-0 whitespace-nowrap">
                  <Wifi className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                  নতুন সংযোগ
                </span>
              </button>
            </div>

            {/* Mobile Actions: CTA + Hamburger */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
              <button
                onClick={onOpenConnectionModal}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[11px] sm:text-xs font-bold rounded-lg shadow-sm flex items-center gap-1"
              >
                <Wifi className="w-3 h-3" />
                <span className="hidden xs:inline">সংযোগ নিন</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={(e) => {
                      handleNavLinkClick(e, link.to);
                      setMobileMenuOpen(false);
                    }}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25"
                        : "text-slate-800 hover:bg-slate-100/80"
                    }`}
                  >
                    {link.label}
                  </NavLink>
                );
              })}

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConnectionModal();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wifi className="w-4 h-4" />
                  নতুন সংযোগ আবেদন করুন
                </button>
                <div className="flex justify-between items-center text-xs text-slate-500 pt-1 px-1">
                  <span>হটলাইন: {contact.mainHotline}</span>
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-cyan-600 hover:underline font-semibold text-[11px]"
                  >
                    Admin Portal
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
