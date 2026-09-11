// src/admin/pages/AdminSecurityPage.jsx
// Production Security Operations Center (SOC) & DDoS Shield Management Console

import React, { useState, useEffect, useCallback } from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Flame,
  Activity,
  RefreshCw,
  AlertTriangle,
  Lock,
  Unlock,
  Server,
  Globe,
  Cpu,
  CheckCircle2,
  XCircle,
  Info,
  ExternalLink,
  Trash2,
  Clock,
  Database,
  Filter,
  ArrowUpRight,
  Sliders
} from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";

export default function AdminSecurityPage() {
  const { token } = useSiteData();

  // State
  const [statusData, setStatusData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [events, setEvents] = useState([]);
  const [blockedIps, setBlockedIps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // overview | events | blocked | cloudflare

  // Filters
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // Attack Mode Toggle Modal
  const [showAttackModal, setShowAttackModal] = useState(false);
  const [isTogglingMode, setIsTogglingMode] = useState(false);

  // Unblock IP State
  const [actionLoadingIp, setActionLoadingIp] = useState(null);

  // Fetch all security telemetry
  const fetchSecurityData = useCallback(async (quiet = false) => {
    if (!token) return;
    if (!quiet) setIsRefreshing(true);

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [statusRes, statsRes, blockedRes, eventsRes] = await Promise.all([
        fetch("/api/security/status", { headers }),
        fetch("/api/security/stats", { headers }),
        fetch("/api/security/blocked-ips", { headers }),
        fetch(`/api/security/events?severity=${severityFilter}&eventType=${typeFilter}&limit=100`, { headers })
      ]);

      if (statusRes.ok) {
        const json = await statusRes.json();
        setStatusData(json.data);
      }
      if (statsRes.ok) {
        const json = await statsRes.json();
        setStatsData(json.data);
      }
      if (blockedRes.ok) {
        const json = await blockedRes.json();
        setBlockedIps(json.data.items || []);
      }
      if (eventsRes.ok) {
        const json = await eventsRes.json();
        setEvents(json.data.events || []);
      }
    } catch (err) {
      console.error("Failed to fetch security telemetry:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [token, severityFilter, typeFilter]);

  useEffect(() => {
    fetchSecurityData();
    // Auto refresh telemetry every 10 seconds
    const interval = setInterval(() => {
      fetchSecurityData(true);
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchSecurityData]);

  // Handle Under Attack Mode Toggle
  const handleToggleAttackMode = async () => {
    if (!token || !statusData) return;
    const targetMode = statusData.currentMode === "under_attack" ? "normal" : "under_attack";
    setIsTogglingMode(true);

    try {
      const res = await fetch("/api/security/toggle-attack-mode", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ mode: targetMode })
      });

      if (res.ok) {
        await fetchSecurityData(true);
        setShowAttackModal(false);
      } else {
        alert("মোড পরিবর্তনে সমস্যা হয়েছে");
      }
    } catch (err) {
      alert("সার্ভার এরর: " + err.message);
    } finally {
      setIsTogglingMode(false);
    }
  };

  // Handle Unblock Single IP
  const handleUnblockIp = async (ip) => {
    if (!window.confirm(`আপনি কি নিশ্চিতভাবে আইপি ${ip} আনব্লক করতে চান?`)) return;
    setActionLoadingIp(ip);

    try {
      const res = await fetch("/api/security/unblock-ip", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ip })
      });

      if (res.ok) {
        await fetchSecurityData(true);
      }
    } catch (err) {
      alert("আনব্লক করতে সমস্যা হয়েছে: " + err.message);
    } finally {
      setActionLoadingIp(null);
    }
  };

  // Handle Clear All Quarantined
  const handleClearAllQuarantined = async () => {
    if (!window.confirm("আপনি কি সকল ব্লকলিস্টেড আইপি এখনই মুক্ত করতে চান?")) return;
    setIsRefreshing(true);

    try {
      const res = await fetch("/api/security/clear-blacklist", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        await fetchSecurityData(true);
      }
    } catch (err) {
      alert("ব্লকলিস্ট ক্লিয়ার করতে সমস্যা হয়েছে: " + err.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const isUnderAttack = statusData?.currentMode === "under_attack";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-9 h-9 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-medium">সিকিউরিটি টেলিমেট্রি লোড হচ্ছে...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Alert */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isUnderAttack
          ? "bg-gradient-to-r from-red-950/80 via-orange-950/70 to-slate-900 border-red-500/60 shadow-xl shadow-red-900/30"
          : "bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border-slate-800"
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl border ${
              isUnderAttack
                ? "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse"
                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            }`}>
              {isUnderAttack ? <Flame className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                  isUnderAttack
                    ? "bg-red-500 text-white border-red-400 shadow-md shadow-red-500/40"
                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                }`}>
                  {isUnderAttack ? "🔥 EMERGENCY: UNDER ATTACK MODE" : "🟢 APPLICATION SHIELD ACTIVE"}
                </span>

                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {statusData?.redisStatus?.engine || "In-Memory Engine"}
                </span>

                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  statusData?.cloudflareEdge?.detected
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    : "bg-slate-800/80 text-slate-400 border-slate-700"
                }`}>
                  Edge Proxy: {statusData?.cloudflareEdge?.detected ? "Cloudflare Connected" : "Not Detected"}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Link BD DDoS Protection & Cyber Security Operations Center (SOC)
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Node.js Layer-7 অ্যাপ্লিকেশন শিল্ড, ডিস্ট্রিবিউটেড রেট লিমিটিং, স্লো-লরিস প্রোটেকশন ও ক্লাউডফ্লেয়ার এজ ডিফেন্স
              </p>
            </div>
          </div>

          {/* Right Quick Controls */}
          <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end">
            <button
              onClick={() => fetchSecurityData()}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="রিফ্রেশ করুন"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
              <span className="hidden sm:inline">রিফ্রেশ</span>
            </button>

            {/* Attack Mode Trigger Button */}
            <button
              onClick={() => setShowAttackModal(true)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                isUnderAttack
                  ? "bg-slate-800 hover:bg-slate-700 text-red-400 border border-red-500/40"
                  : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-red-600/30"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>{isUnderAttack ? "অ্যাটাক মোড বন্ধ করুন" : "Under Attack Mode চালু করুন"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: "overview", label: "সিকিউরিটি ওভারভিউ ও ডিফেন্স", icon: Shield },
          { id: "blocked", label: `কোয়ারেন্টাইন আইপি (${blockedIps.length})`, icon: Lock },
          { id: "events", label: `সিকিউরিটি ইভেন্ট লগ (${events.length})`, icon: Activity },
          { id: "cloudflare", label: "ক্লাউডফ্লেয়ার এজ গাইড", icon: Globe }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & ACTIVE DEFENSES */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Real-time Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">মোট রিকোয়েস্ট</span>
              <p className="text-2xl font-black text-white mt-1.5">{statsData?.totalRequests || 0}</p>
              <span className="text-[10px] text-slate-500 mt-1">সার্ভার চালুর পর থেকে</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">বৈধ ট্রাফিক</span>
              <p className="text-2xl font-black text-emerald-400 mt-1.5">{statsData?.allowedRequests || 0}</p>
              <span className="text-[10px] text-emerald-500/70 mt-1">পাস করেছে</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">ব্লকড অ্যাটাক</span>
              <p className="text-2xl font-black text-red-400 mt-1.5">{statsData?.blockedRequests || 0}</p>
              <span className="text-[10px] text-red-500/70 mt-1">মোট প্রতিহত আক্রমণ</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">রেট লিমিট</span>
              <p className="text-2xl font-black text-amber-400 mt-1.5">{statsData?.rateLimitedCount || 0}</p>
              <span className="text-[10px] text-amber-500/70 mt-1">ফ্লাড ঠেকানো হয়েছে</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">বট ও স্ক্যানার</span>
              <p className="text-2xl font-black text-purple-400 mt-1.5">{statsData?.botBlockedCount || 0}</p>
              <span className="text-[10px] text-purple-500/70 mt-1">হ্যাকিং টুলস ব্লক</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">কোয়ারেন্টাইন আইপি</span>
              <p className="text-2xl font-black text-orange-400 mt-1.5">{statsData?.activeQuarantinedIps || blockedIps.length}</p>
              <span className="text-[10px] text-orange-500/70 mt-1">বর্তমানে লকআউট</span>
            </div>
          </div>

          {/* Defense Matrix: Two-Tier Architecture Honest Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Active Defenses Breakdown */}
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white">সক্রিয় সুরক্ষা স্তরসমূহ (Active Defense Matrix)</h3>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  ৯টি লেয়ার সক্রিয়
                </span>
              </div>

              <div className="space-y-2.5">
                {(statusData?.activeDefenses || []).map((def, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <p className="text-xs font-bold text-slate-200">{def.name}</p>
                        <span className="text-[10px] text-slate-500 font-mono">{def.type}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {def.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Architecture & Limitations Note */}
            <div className="lg:col-span-5 space-y-4">
              {/* Architecture Reality Check Card */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3 text-amber-400">
                  <Info className="w-5 h-5" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">প্রতিরক্ষা নীতি (Defense Architecture)</h4>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed space-y-2.5">
                  <p>
                    <strong className="text-white">১. অ্যাপ্লিকেশন লেয়ার (Layer-7):</strong> আমাদের নোড সার্ভারে সক্রিয় শিল্ডটি রিকোয়েস্ট ফ্লাড, ব্রুট-ফোর্স, ক্ষতিকর বট এবং ডাটাবেজ ওভারলোড সরাসরি ১০০% প্রতিহত করছে।
                  </p>
                  <p>
                    <strong className="text-white">২. নেটওয়ার্ক ভলিউম (Layer 3/4):</strong> ৫০-১০০ জিবিপিএস SYN/UDP ফ্লাডের মতো বিশাল ব্যান্ডউইথ আক্রমণ ঠেকাতে ক্লাউডফ্লেয়ারের গ্লোবাল এজ স্ক্রাবিং প্রয়োজন। ক্লায়েন্টের ডোমেইনে এটি ফ্রিতে চালু করার গাইড ডানদিকের ট্যাবে যুক্ত আছে।
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">এজ সিকিউরিটি স্ট্যাটাস:</span>
                  <span className={`font-bold ${statusData?.cloudflareEdge?.detected ? "text-emerald-400" : "text-amber-400"}`}>
                    {statusData?.cloudflareEdge?.detected ? "সক্রিয় (Cloudflare Edge)" : "কনফিগারেশন বাকি"}
                  </span>
                </div>
              </div>

              {/* Mode Comparison Card */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                <h4 className="text-xs font-bold text-white mb-2.5 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  বর্তমান মোডের থ্রেশহোল্ড (Thresholds)
                </h4>
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span>গ্লোবাল রিকোয়েস্ট লিমিট:</span>
                    <span className="font-mono text-white font-bold">{isUnderAttack ? "৬০ req/min" : "২০০ req/min"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span>অ্যাডমিন লগইন ট্রাই:</span>
                    <span className="font-mono text-white font-bold">{isUnderAttack ? "৫ attempt/15m" : "১০ attempt/15m"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span>বার্স্ট ফ্লাড প্রতিরোধ:</span>
                    <span className="font-mono text-white font-bold">{isUnderAttack ? "২০ req/3s" : "৪৫ req/3s"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>কোয়ারেন্টাইন মেয়াদ:</span>
                    <span className="font-mono text-white font-bold">১৫ মিনিট (TTL Auto-Expiry)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QUARANTINED IPS */}
      {activeTab === "blocked" && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                কোয়ারেন্টাইনকৃত আইপি তালিকা (Quarantined Abuse IPs)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                ফ্লাড, ম্যালিশিয়াস স্ক্যানার বা ব্রুট-ফোর্সের কারণে যেসব আইপি সাময়িকভাবে ব্লক করা হয়েছে
              </p>
            </div>

            {blockedIps.length > 0 && (
              <button
                onClick={handleClearAllQuarantined}
                className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                সকল আইপি মুক্ত করুন ({blockedIps.length})
              </button>
            )}
          </div>

          {blockedIps.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white">বর্তমানে কোনো আইপি কোয়ারেন্টাইনে নেই</p>
              <p className="text-xs text-slate-500 mt-1">সবকিছু স্বাভাবিক ও সুরক্ষিত রয়েছে। আক্রমণ শনাক্ত হলে তা স্বয়ংক্রিয়ভাবে এখানে তালিকাভুক্ত হবে।</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">আইপি ঠিকানা</th>
                    <th className="py-2.5 px-3">ব্লকের কারণ</th>
                    <th className="py-2.5 px-3">অবশিষ্ট সময়</th>
                    <th className="py-2.5 px-3">মেয়াদ শেষ</th>
                    <th className="py-2.5 px-3 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {blockedIps.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3 font-mono font-bold text-cyan-400">{item.ip}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-semibold">
                          {item.reason}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-mono">
                        {Math.ceil(item.remainingSeconds / 60)} মিনিট ({item.remainingSeconds}s)
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">
                        {new Date(item.expiresAt).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleUnblockIp(item.ip)}
                          disabled={actionLoadingIp === item.ip}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-semibold transition cursor-pointer"
                        >
                          {actionLoadingIp === item.ip ? "আনব্লক হচ্ছে..." : "আনব্লক"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SECURITY EVENTS LOG */}
      {activeTab === "events" && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                লাইভ সিকিউরিটি অডিট ও ইনসিডেন্ট লগ (Live Events)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                আক্রমণ প্রচেষ্টা, স্ক্যানার ব্লক ও সিস্টেম সুরক্ষার রিয়েল-টাইম হিস্ট্রি
              </p>
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-slate-950 text-slate-300 text-xs px-2.5 py-1.5 rounded-xl border border-slate-800 cursor-pointer"
              >
                <option value="ALL">সকল সিভিয়ারিটি (All)</option>
                <option value="CRITICAL">🔴 Critical</option>
                <option value="HIGH">🟠 High</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="INFO">🔵 Info</option>
              </select>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-bold text-white">কোনো সিকিউরিটি ইনসিডেন্ট রেকর্ড হয়নি</p>
              <p className="text-xs text-slate-500 mt-1">সিস্টেম শতভাগ সুরক্ষিতভাবে চলছে।</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2 px-3">সময়</th>
                    <th className="py-2 px-3">লেভেল</th>
                    <th className="py-2 px-3">ইভেন্ট টাইপ</th>
                    <th className="py-2 px-3">আইপি</th>
                    <th className="py-2 px-3">পাথ ও স্ট্যাটাস</th>
                    <th className="py-2 px-3">বিবরণ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {events.map((ev) => {
                    const sevColors = {
                      CRITICAL: "bg-red-500/20 text-red-400 border-red-500/40",
                      HIGH: "bg-orange-500/20 text-orange-400 border-orange-500/40",
                      MEDIUM: "bg-amber-500/20 text-amber-400 border-amber-500/40",
                      INFO: "bg-blue-500/20 text-blue-400 border-blue-500/40",
                      LOW: "bg-slate-500/20 text-slate-400 border-slate-500/40"
                    };
                    const sevClass = sevColors[ev.severity] || sevColors.LOW;

                    return (
                      <tr key={ev.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                          {new Date(ev.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${sevClass}`}>
                            {ev.severity}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-200 whitespace-nowrap">
                          {ev.eventType}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-cyan-400 whitespace-nowrap">
                          {ev.ip}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="font-mono text-slate-300 font-semibold">{ev.method}</span>{" "}
                          <span className="text-slate-400">{ev.route}</span>{" "}
                          <span className="font-bold text-slate-400">({ev.statusCode})</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 max-w-xs truncate" title={ev.reason}>
                          {ev.reason}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CLOUDFLARE EDGE GUIDE */}
      {activeTab === "cloudflare" && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-7 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <Globe className="w-3.5 h-3.5" />
              Layer 3/4 & Anycast Edge Protection Guide
            </div>
            <h3 className="text-xl font-black text-white">
              Link BD ISP — ক্লাউডফ্লেয়ার (Cloudflare) ডোমেইন সিকিউরিটি গাইড
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              আইএসপি ক্লায়েন্টদের জন্য সম্পূর্ণ গাইড: কীভাবে আপনার ডোমেইনকে (যেমন <code className="text-cyan-400">linkbd.net</code>) ক্লাউডফ্লেয়ারের গ্লোবাল ডিডিওএস প্রক্সির সাথে সংযুক্ত করবেন
            </p>
          </div>

          {/* Defense Comparison Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
                <Globe className="w-4 h-4" />
                <span>ক্লাউডফ্লেয়ার এজ (Cloudflare Edge) এর দায়িত্ব:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>৫০-১০০ জিবিপিএস SYN/UDP ভলিউমেট্রিক ডিডিওএস আক্রমণ ফিল্টার করা</li>
                <li>গ্লোবাল Anycast নেটওয়ার্ক দিয়ে আক্রমণ ট্রাফিক বিশ্বের বিভিন্ন এজ নোডে ছড়িয়ে দেওয়া</li>
                <li>DNS হাইজ্যাকিং ও ব্রুট-ফোর্স রোধ করা</li>
                <li>মূল সার্ভারের আইপি (Origin IP) সম্পূর্ণ গোপন রাখা</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-2">
                <Server className="w-4 h-4" />
                <span>আমাদের Node.js অ্যাপ্লিকেশন শিল্ডের দায়িত্ব:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>লেয়ার-৭ অ্যাপ্লিকেশন রিকোয়েস্ট ফ্লাড ও স্প্যাম প্রতিরোধ</li>
                <li>ব্রুট-ফোর্স অ্যাডমিন লগইন অ্যাটাক ও পাসওয়ার্ড অনুমান রোধ</li>
                <li>পেমেন্ট ও বিল অনুসন্ধান এপিআইতে ডুপ্লিকেট রিপ্লে আক্রমণ রোধ</li>
                <li>স্বয়ংক্রিয় স্লাইডিং উইন্ডো রেট লিমিট ও সাময়িক কোয়ারেন্টাইন</li>
              </ul>
            </div>
          </div>

          {/* Step by Step Checklist */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-white">১২-ধাপের ক্লাউডফ্লেয়ার বাস্তবায়ন চেকলিস্ট (Setup Checklist):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              {[
                { title: "১. অ্যাকাউন্ট তৈরি", desc: "cloudflare.com এ একটি ফ্রি বা প্রো অ্যাকাউন্ট তৈরি করুন।" },
                { title: "২. ডোমেইন যুক্ত করুন", desc: "Add Site বাটনে ক্লিক করে linkbd.net ডোমেইনটি ইনপুট দিন।" },
                { title: "৩. নেমসার্ভার আপডেট", desc: "ডোমেইন রেজিস্ট্রারের প্যানেলে ক্লাউডফ্লেয়ারের দেওয়া দুটি নেমসার্ভার বসান।" },
                { title: "৪. DNS রেকর্ড নিশ্চিত করুন", desc: "A রেকর্ড (Origin IP) এবং CNAME রেকর্ডগুলো ঠিক আছে কিনা চেক করুন।" },
                { title: "৫. অরেঞ্জ ক্লাউড (Proxy) অন করুন", desc: "DNS ট্যাবে গিয়ে রেকর্ডগুলোতে কমলা রঙের Proxied আইকন চালু রাখুন।" },
                { title: "৬. SSL/TLS মোড সেট করুন", desc: "SSL সেকশনে গিয়ে Full (Strict) মোড নির্বাচন করুন।" },
                { title: "৭. Always Use HTTPS", desc: "Edge Certificates সেকশনে Always Use HTTPS টগল অন করুন।" },
                { title: "৮. Security Level নির্ধারণ", desc: "Security > Settings এ গিয়ে Security Level 'Medium' অথবা 'High' রাখুন।" },
                { title: "৯. Bot Fight Mode", desc: "Security > Bots সেকশনে গিয়ে Bot Fight Mode সক্রিয় করুন।" },
                { title: "১০. WAF Managed Rules", desc: "Web Application Firewall এ প্রয়োজনীয় রুলস চালু রাখুন।" },
                { title: "১১. অরিজিন আইপি সুরক্ষা", desc: "হোস্টিং ফায়ারওয়ালে শুধুমাত্র ক্লাউডফ্লেয়ারের আইপি রেঞ্জ থেকে পোর্ট ৮০/৪৪৩ অ্যালাউ করুন।" },
                { title: "১২. টেস্ট সম্পন্ন করুন", desc: "ব্রাউজার থেকে সাইট ওপেন করে হেডার চেক করুন, cf-ray হেডার আসবে।" },
              ].map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200">{step.title}</strong>
                    <p className="text-slate-400 text-[11px] mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: UNDER ATTACK MODE CONFIRMATION */}
      {showAttackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${isUnderAttack ? "bg-slate-800 text-slate-300" : "bg-red-500/20 text-red-400"}`}>
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {isUnderAttack ? "Under Attack Mode বন্ধ করবেন?" : "Under Attack Mode চালু করবেন?"}
                </h3>
                <p className="text-xs text-slate-400">জরুরী সাইবার আক্রমণ মোড নিয়ন্ত্রণ</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {isUnderAttack ? (
                <span>
                  স্বাভাবিক মোডে ফিরে গেলে গ্লোবাল রিকোয়েস্ট সীমা ২০০ req/min এবং লগইন সীমা ১০টি ফিরে আসবে।
                </span>
              ) : (
                <span>
                  <strong>সতর্কতা:</strong> Under Attack Mode চালু করলে সার্ভার রেট লিমিট সর্বোচ্চ কড়াকড়ি (৬০ req/min) করবে, বার্স্ট ফ্লাড ডিটেকশন সংবেদনশীল হবে এবং সন্দেহজনক আইপি সাথে সাথে ১৫ মিনিটের জন্য কোয়ারেন্টাইন করা হবে।
                </span>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAttackModal(false)}
                disabled={isTogglingMode}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
              >
                বাতিল
              </button>

              <button
                type="button"
                onClick={handleToggleAttackMode}
                disabled={isTogglingMode}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition shadow-lg flex items-center gap-2 cursor-pointer ${
                  isUnderAttack
                    ? "bg-slate-700 hover:bg-slate-600"
                    : "bg-red-600 hover:bg-red-500 shadow-red-600/40"
                }`}
              >
                {isTogglingMode ? "প্রসেসিং হচ্ছে..." : (isUnderAttack ? "স্বাভাবিক মোডে ফিরুন" : "হ্যাঁ, চালু করুন")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
