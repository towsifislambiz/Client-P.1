// src/admin/components/AdminLayout.jsx
// Responsive Cyber-Dark Admin Layout with Sidebar, Header, and Mobile Drawer

import React, { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Package,
  Building2,
  Sparkles,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ShieldAlert,
  Radio,
  ChevronRight
} from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";

export default function AdminLayout({ children }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { adminUser, logout, branding, isBackendOnline } = useSiteData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    if (window.confirm("আপনি কি অ্যাডমিন প্যানেল থেকে লগআউট করতে চান?")) {
      await logout();
      navigate("/admin/login");
    }
  };

  const navItems = [
    { to: "/admin", label: "ড্যাশবোর্ড", icon: LayoutDashboard, exact: true },
    { to: "/admin/images", label: "ছবি ও ব্যানার", icon: ImageIcon },
    { to: "/admin/packages", label: "প্যাকেজ সমূহ", icon: Package },
    { to: "/admin/offices", label: "অফিস ও যোগাযোগ", icon: Building2 },
    { to: "/admin/branding", label: "লোগো ও ব্র্যান্ডিং", icon: Sparkles },
    { to: "/admin/security", label: "DDoS ও সাইবার নিরাপত্তা", icon: ShieldAlert },
    { to: "/admin/settings", label: "সেটিংস ও ডেটা", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand & Portal Title */}
          <Link to="/admin" className="flex items-center gap-2.5 group">
            <img
              src={branding.navbarLogo || "/assets/logo.png"}
              alt="Link BD Logo"
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="text-xs font-black tracking-wider uppercase bg-blue-500/20 text-cyan-400 px-2 py-0.5 rounded-md border border-blue-500/30">
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Status & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Backend Status Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-medium text-slate-300">
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span>{isBackendOnline ? "Server Online" : "Connecting..."}</span>
          </div>

          {/* DDoS Shield Indicator */}
          <Link
            to="/admin/security"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-medium text-emerald-400 transition cursor-pointer"
            title="DDoS Shield & SOC Status"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DDoS Shield: Active</span>
          </Link>

          {/* View Public Website */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition border border-slate-700 cursor-pointer"
            title="নতুন ট্যাবে পাবলিক ওয়েবসাইট দেখুন"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xs:inline">ওয়েবসাইট দেখুন</span>
          </Link>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="hidden xl:block text-right">
              <p className="text-xs font-bold text-slate-200 truncate max-w-[150px]">
                {adminUser?.email || "admin@linkbd.net"}
              </p>
              <span className="text-[10px] text-cyan-400">সিস্টেম অ্যাডমিন</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition cursor-pointer"
              title="লগআউট করুন"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 xl:w-72 bg-slate-900/70 border-r border-slate-800/80 flex-col justify-between p-4 shrink-0">
          <div className="space-y-1">
            <div className="px-3 py-2 mb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                কন্টেন্ট ম্যানেজমেন্ট
              </p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? location.pathname === item.to
                  : location.pathname.startsWith(item.to);

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    className={({ isActive: linkActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition group ${
                        linkActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Support Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 mb-1.5 text-cyan-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Link BD CMS Engine</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              যেকোনো পরিবর্তন সাথে সাথে লাইভ ওয়েবসাইটে কার্যকর হবে।
            </p>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="fixed top-0 bottom-0 left-0 w-72 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between z-10 shadow-2xl animate-slideRight">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={branding.navbarLogo || "/assets/logo.png"}
                      alt="Logo"
                      className="h-7 w-auto"
                    />
                    <span className="text-xs font-bold text-cyan-400">Admin</span>
                  </div>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.exact}
                        onClick={() => setMobileDrawerOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                            isActive
                              ? "bg-blue-600 text-white shadow"
                              : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 text-cyan-400" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-500/15 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-rose-500/25 transition"
                >
                  <LogOut className="w-4 h-4" />
                  লগআউট করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
