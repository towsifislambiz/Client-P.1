// src/admin/components/AdminBottomNav.jsx
// Native App-Style Bottom Navigation Dock for Mobile Phones (Thumb-Friendly)

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  Building2,
  Menu
} from "lucide-react";

export default function AdminBottomNav({ onOpenMenu }) {
  const location = useLocation();

  const navTabs = [
    { to: "/admin", label: "ড্যাশবোর্ড", icon: LayoutDashboard, exact: true },
    { to: "/admin/packages", label: "প্যাকেজ", icon: Package },
    { to: "/admin/images", label: "ছবি", icon: ImageIcon },
    { to: "/admin/offices", label: "অফিস", icon: Building2 },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.exact
            ? location.pathname === tab.to
            : location.pathname.startsWith(tab.to);

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.exact}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 min-w-[62px] min-h-[50px] active:scale-95 ${
                isActive
                  ? "text-cyan-400 bg-blue-500/15 font-bold"
                  : "text-slate-400 hover:text-slate-200 font-medium"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110 text-cyan-400" : ""}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight leading-none">
                {tab.label}
              </span>
            </NavLink>
          );
        })}

        {/* More Menu Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl text-slate-400 hover:text-slate-200 font-medium transition-all active:scale-95 min-w-[62px] min-h-[50px] cursor-pointer"
        >
          <Menu className="w-5 h-5 text-slate-400" />
          <span className="text-[11px] mt-1 tracking-tight leading-none">
            মেনু
          </span>
        </button>
      </div>
    </nav>
  );
}
