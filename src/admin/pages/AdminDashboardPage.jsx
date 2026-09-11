// src/admin/pages/AdminDashboardPage.jsx
// Overview Admin Dashboard with Metrics, Logo Preview, Quick Actions, and Live Activity

import React from "react";
import { Link } from "react-router-dom";
import {
  Image as ImageIcon,
  Package,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
  Zap
} from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";

export default function AdminDashboardPage() {
  const { images, packages, activePackages, offices, branding, recentActivity, contact } = useSiteData();

  const stats = [
    {
      label: "মোট পরিবর্তনযোগ্য ছবি",
      value: images.length || 18,
      sub: "৮টি ভিন্ন পেইজের জন্য",
      icon: ImageIcon,
      link: "/admin/images",
      color: "from-blue-600 to-cyan-500",
      btnText: "ছবি পরিবর্তন করুন"
    },
    {
      label: "সক্রিয় প্যাকেজ সংখ্যা",
      value: activePackages.length,
      sub: `মোট ${packages.length} টির মধ্যে সক্রিয়`,
      icon: Package,
      link: "/admin/packages",
      color: "from-purple-600 to-indigo-600",
      btnText: "প্যাকেজ এডিট করুন"
    },
    {
      label: "অফিস ও ব্রাঞ্চ সংখ্যা",
      value: offices.length,
      sub: "হেড অফিস, কুষ্টিয়া, ফরিদপুর, সিঙ্গাপুর",
      icon: Building2,
      link: "/admin/offices",
      color: "from-emerald-600 to-teal-600",
      btnText: "ঠিকানা পরিবর্তন করুন"
    },
    {
      label: "বর্তমান সাইট লোগো",
      value: "২টি ভার্সন",
      sub: "হেডার ও ফুটার লোগো",
      icon: Sparkles,
      link: "/admin/branding",
      color: "from-amber-500 to-orange-600",
      btnText: "লোগো আপডেট করুন"
    },
    {
      label: "DDoS ও সাইবার নিরাপত্তা",
      value: "ACTIVE",
      sub: "Layer 7 Shield ও রেট লিমিটার সচল",
      icon: ShieldAlert,
      link: "/admin/security",
      color: "from-cyan-600 to-blue-600",
      btnText: "SOC ড্যাশবোর্ড দেখুন"
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-cyan-300 border border-blue-500/30 mb-3">
            Link BD কন্ট্রোল সেন্টার
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            স্বাগতম, অ্যাডমিন প্যানেলে
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            এখানে থেকে আপনি সহজেই ওয়েবসাইটের ছবি, প্যাকেজ তালিকা ও রেট, অফিসের ঠিকানা ও হটলাইন এবং সাইট লোগো সম্পূর্ণ নিজের মতো পরিবর্তন করতে পারবেন।
          </p>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 mt-5">
            <Link
              to="/admin/packages"
              className="py-2.5 px-3 sm:px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-1.5 text-center min-h-[44px]"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>প্যাকেজ ম্যানেজ</span>
            </Link>
            <Link
              to="/admin/images"
              className="py-2.5 px-3 sm:px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-1.5 text-center min-h-[44px]"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>ছবি পরিবর্তন</span>
            </Link>
            <Link
              to="/admin/security"
              className="py-2.5 px-3 sm:px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/30 transition flex items-center justify-center gap-1.5 text-center min-h-[44px]"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>DDoS শিল্ড</span>
            </Link>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 sm:px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-1.5 text-center min-h-[44px]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>লাইভ সাইট</span>
            </Link>
          </div>
        </div>

        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-white">{s.value}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-200">{s.label}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80">
                <Link
                  to={s.link}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center justify-between group-hover:translate-x-0.5 transition-transform"
                >
                  <span>{s.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Branding Preview & Quick Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Current Logo Preview */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                বর্তমান ব্র্যান্ড লোগো
              </h3>
              <Link to="/admin/branding" className="text-xs text-cyan-400 hover:underline">
                এডিট
              </Link>
            </div>

            {/* Dark background preview */}
            <div className="mb-3">
              <p className="text-[11px] text-slate-400 mb-1">হেডার লোগো (ডার্ক ব্যাকগ্রাউন্ড):</p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[60px]">
                <img
                  src={branding.navbarLogo || "/assets/logo.png"}
                  alt="Navbar Logo"
                  className="max-h-9 object-contain"
                />
              </div>
            </div>

            {/* Light background preview */}
            <div>
              <p className="text-[11px] text-slate-400 mb-1">ফুটার লোগো (লাইট ব্যাকগ্রাউন্ড):</p>
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-center min-h-[60px]">
                <img
                  src={branding.footerLogo || "/assets/logo-footer.png"}
                  alt="Footer Logo"
                  className="max-h-9 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800">
            <Link
              to="/admin/branding"
              className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 transition"
            >
              নতুন লোগো আপলোড করুন
            </Link>
          </div>
        </div>

        {/* Global Hotline Summary & Recent Activity */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                সাম্প্রতিক কন্টেন্ট আপডেট লগ
              </h3>
              <span className="text-[10px] text-slate-500">স্বয়ংক্রিয় ব্যাকআপ সহ</span>
            </div>

            <div className="space-y-2.5">
              {recentActivity.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  এখনো কোনো আপডেট রেকর্ড করা হয়নি।
                </div>
              ) : (
                recentActivity.slice(0, 5).map((act, i) => (
                  <div
                    key={act.id || i}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-200">{act.action}</p>
                        {act.description && (
                          <p className="text-[11px] text-slate-400 mt-0.5">{act.description}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">
                      {act.timestamp ? new Date(act.timestamp).toLocaleTimeString() : ""}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>সাইটওয়াইড হেল্পলাইন: <strong className="text-white font-mono">{contact.mainHotline}</strong></span>
            <Link to="/admin/offices" className="text-cyan-400 hover:underline">
              হটলাইন এডিট করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
