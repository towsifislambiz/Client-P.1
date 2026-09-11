// src/admin/pages/AdminServersPage.jsx
// Complete FTP and Live TV Servers Management with Real-Time CRUD, Live Testing, and BDIX Control

import React, { useState } from "react";
import {
  Server,
  Tv,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Check,
  X,
  ExternalLink,
  Copy,
  Search,
  Filter,
  Activity,
  Zap,
  ShieldCheck,
  Radio,
  Sparkles,
  Layers,
  Globe
} from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";
import ToastNotification from "../components/ToastNotification";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminServersPage() {
  const {
    servers,
    createServer,
    updateServer,
    deleteServer,
    resetServers
  } = useSiteData();

  const [toast, setToast] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServer, setEditingServer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirm Dialogs
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    type: "ftp",
    ip: "",
    url: "",
    category: "মুভি ও ওয়েব সিরিজ",
    categoryEn: "",
    speed: "10 Gbps BDIX",
    description: "",
    protocol: "HTTP / BDIX Direct",
    badge: "BDIX Fast",
    isActive: true,
    sortOrder: 1
  });

  const handleCopyIp = (id, ip) => {
    navigator.clipboard.writeText(ip);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleOpenCreate = () => {
    setEditingServer(null);
    setForm({
      name: "",
      type: "ftp",
      ip: "",
      url: "",
      category: "মুভি ও ওয়েব সিরিজ",
      categoryEn: "",
      speed: "10 Gbps BDIX",
      description: "",
      protocol: "HTTP / BDIX Fast Cache",
      badge: "Fast Cache",
      isActive: true,
      sortOrder: (servers?.length || 0) + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (server) => {
    setEditingServer(server);
    setForm({
      name: server.name || "",
      type: server.type || "ftp",
      ip: server.ip || "",
      url: server.url || "",
      category: server.category || "",
      categoryEn: server.categoryEn || "",
      speed: server.speed || "10 Gbps BDIX",
      description: server.description || "",
      protocol: server.protocol || "HTTP / BDIX Direct",
      badge: server.badge || "",
      isActive: server.isActive !== false,
      sortOrder: server.sortOrder || 1
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setToast({ type: "error", title: "নাম আবশ্যক", message: "সার্ভারের নাম অবশ্যই পূরণ করুন।" });
      return;
    }
    if (!form.ip.trim()) {
      setToast({ type: "error", title: "আইপি আবশ্যক", message: "সার্ভারের আইপি অ্যাড্রেস প্রদান করুন।" });
      return;
    }

    const cleanIp = form.ip.trim().replace(/^https?:\/\//, "");
    const cleanUrl = form.url.trim() ? form.url.trim() : `http://${cleanIp}`;

    const payload = {
      ...form,
      name: form.name.trim(),
      ip: cleanIp,
      url: cleanUrl,
      sortOrder: Number(form.sortOrder) || 1
    };

    setIsSubmitting(true);
    try {
      if (editingServer) {
        await updateServer(editingServer.id, payload);
        setToast({
          type: "success",
          title: "সার্ভার আপডেট সম্পন্ন",
          message: `"${payload.name}" সফলভাবে আপডেট করা হয়েছে।`
        });
      } else {
        await createServer(payload);
        setToast({
          type: "success",
          title: "নতুন সার্ভার যুক্ত হয়েছে",
          message: `"${payload.name}" তালিকায় যুক্ত হয়েছে এবং ওয়েবসাইটে কার্যকর হয়েছে।`
        });
      }
      setIsModalOpen(false);
    } catch (err) {
      setToast({ type: "error", title: "অপারেশন ব্যর্থ", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (server) => {
    try {
      await updateServer(server.id, { isActive: !server.isActive });
      setToast({
        type: "success",
        title: "স্ট্যাটাস পরিবর্তন হয়েছে",
        message: `"${server.name}" এখন ${!server.isActive ? "সক্রিয় (Active)" : "নিষ্ক্রিয় (Inactive)"}।`
      });
    } catch (err) {
      setToast({ type: "error", title: "ব্যর্থ হয়েছে", message: err.message });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteServer(deleteConfirmId);
      setToast({
        type: "success",
        title: "সার্ভার মুছে ফেলা হয়েছে",
        message: "সার্ভারটি তালিকা থেকে সফলভাবে সরানো হয়েছে।"
      });
    } catch (err) {
      setToast({ type: "error", title: "ডিলিট ব্যর্থ", message: err.message });
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleResetConfirm = async () => {
    try {
      await resetServers();
      setToast({
        type: "success",
        title: "ডিফল্ট তালিকা রিস্টোর হয়েছে",
        message: "লিংক বিডির আসল ৫টি এফটিপি ও ১টি লাইভ টিভি সার্ভার রিস্টোর করা হয়েছে।"
      });
    } catch (err) {
      setToast({ type: "error", title: "রিসেট ব্যর্থ", message: err.message });
    } finally {
      setResetConfirmOpen(false);
    }
  };

  // Filtered List
  const filteredServers = (servers || []).filter((s) => {
    const matchesType =
      filterType === "all" ? true : filterType === "ftp" ? s.type !== "tv" : s.type === "tv";
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      s.name?.toLowerCase().includes(q) ||
      s.ip?.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q);
    return matchesType && matchesQuery;
  });

  const ftpCount = (servers || []).filter((s) => s.type !== "tv" && s.isActive !== false).length;
  const tvCount = (servers || []).filter((s) => s.type === "tv" && s.isActive !== false).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Server className="w-6 h-6 text-cyan-400" />
            FTP ও লাইভ টিভি সার্ভার ব্যবস্থাপনা (Servers CMS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Link BD-এর আসল BDIX এফটিপি সার্ভার ও লাইভ টিভি পোর্টাল আইপি পরিচালনা, এডিট ও পরিবর্তন করুন।
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ডিফল্ট রিসেট</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন সার্ভার যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">মোট সার্ভার</span>
            <p className="text-xl font-black text-white">{servers?.length || 0} টি</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">BDIX FTP সার্ভার</span>
            <p className="text-xl font-black text-white">{ftpCount} টি সক্রিয়</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">লাইভ টিভি পোর্টাল</span>
            <p className="text-xl font-black text-white">{tvCount} টি সক্রিয়</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">BDIX নেটওয়ার্ক গতি</span>
            <p className="text-xl font-black text-white">10 Gbps Ultra</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterType === "all" ? "bg-blue-600 text-white shadow" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            সকল সার্ভার ({servers?.length || 0})
          </button>
          <button
            onClick={() => setFilterType("ftp")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterType === "ftp" ? "bg-blue-600 text-white shadow" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            FTP সার্ভার ({servers?.filter(s => s.type !== "tv").length || 0})
          </button>
          <button
            onClick={() => setFilterType("tv")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterType === "tv" ? "bg-blue-600 text-white shadow" : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Live TV ({servers?.filter(s => s.type === "tv").length || 0})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম বা আইপি খুঁজুন..."
            className="w-full px-3 py-1.5 pl-8 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Servers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServers.map((server) => {
          const isTv = server.type === "tv";
          const isCopied = copiedId === server.id;

          return (
            <div
              key={server.id}
              className={`rounded-3xl bg-slate-900 border transition-all duration-200 p-5 sm:p-6 shadow-xl flex flex-col justify-between group ${
                server.isActive
                  ? "border-slate-800 hover:border-cyan-500/50"
                  : "border-slate-800/50 opacity-60 bg-slate-950/40"
              }`}
            >
              <div>
                {/* Card Top: Badges & Status Toggle */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isTv
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : "bg-blue-500/15 text-cyan-300 border border-blue-500/30"
                      }`}
                    >
                      {isTv ? "Live TV Portal" : "FTP Server"}
                    </span>
                    {server.badge && (
                      <span className="text-[10px] font-semibold text-purple-300 bg-purple-950 border border-purple-800 px-2 py-0.5 rounded-md">
                        {server.badge}
                      </span>
                    )}
                  </div>

                  {/* Active / Inactive Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(server)}
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 transition cursor-pointer ${
                      server.isActive
                        ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800 hover:bg-emerald-900"
                        : "bg-rose-950/80 text-rose-400 border border-rose-800 hover:bg-rose-900"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        server.isActive ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                      }`}
                    />
                    <span>{server.isActive ? "Active" : "Disabled"}</span>
                  </button>
                </div>

                {/* Server Title & Category */}
                <div className="space-y-1 mb-3">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {server.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{server.category}</p>
                </div>

                {/* IP Box */}
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 mb-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-xs font-mono font-bold text-slate-200 truncate">
                      {server.ip || server.url}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyIp(server.id, server.ip || server.url)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold flex items-center gap-1 transition cursor-pointer shrink-0"
                    title="আইপি কপি করুন"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">কপি!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>কপি</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Description & Speed */}
                <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed font-light">
                  {server.description || "Link BD হাই-স্পিড অপটিক্যাল ফাইবার নেটওয়ার্কের আওতায় BDIX আনলিমিটেড বিনোদন।"}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-4 font-mono">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-cyan-300">
                    ⚡ {server.speed || "10 Gbps BDIX"}
                  </span>
                  <span className="truncate text-slate-500">{server.protocol}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <a
                  href={server.url || `http://${server.ip}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/40 text-xs font-bold transition cursor-pointer"
                  title="ব্রাউজারে সরাসরি সার্ভার টেস্ট করুন"
                >
                  <span>টেস্ট করুন</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(server)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                    title="সার্ভার তথ্য এডিট করুন"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>এডিট</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(server.id)}
                    className="p-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 transition cursor-pointer"
                    title="সার্ভার মুছে ফেলুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Server Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center">
                  <Server className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {editingServer ? `"${editingServer.name}" এডিট করুন` : "নতুন সার্ভার যুক্ত করুন"}
                </h2>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Type selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  সার্ভারের ধরন (Server Type) *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: "ftp" })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                      form.type === "ftp"
                        ? "bg-blue-600/20 border-blue-500 text-cyan-300 shadow"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Server className="w-4 h-4" />
                    <span>BDIX FTP সার্ভার</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: "tv" })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                      form.type === "tv"
                        ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Tv className="w-4 h-4" />
                    <span>লাইভ টিভি / IPTV</span>
                  </button>
                </div>
              </div>

              {/* Server Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  সার্ভারের নাম (Server Name) *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="যেমন: Link BD Primary FTP Server"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* IP and URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    সার্ভার আইপি (IP Address) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.ip}
                    onChange={(e) => setForm({ ...form, ip: e.target.value })}
                    placeholder="যেমন: 10.16.100.244"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    সম্পূর্ণ লিংক (URL - ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder={`http://${form.ip.trim() || "10.16.100.244"}`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ক্যাটেগরি (Category)
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="যেমন: মুভি ও ওয়েব সিরিজ"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ব্যাজ / হাইলাইট ট্যাগ
                  </label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="যেমন: Primary Hub, Ultra 4K"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Speed & Protocol */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    গতি (Network Speed)
                  </label>
                  <input
                    type="text"
                    value={form.speed}
                    onChange={(e) => setForm({ ...form, speed: e.target.value })}
                    placeholder="10 Gbps BDIX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    প্রটোকল (Protocol)
                  </label>
                  <input
                    type="text"
                    value={form.protocol}
                    onChange={(e) => setForm({ ...form, protocol: e.target.value })}
                    placeholder="HTTP / BDIX Direct"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  সংক্ষিপ্ত বিবরণ (Description)
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="সার্ভারের কনটেন্ট সম্পর্কে ছোট বিবরণ..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Active & Sort Order */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-800"
                  />
                  <span className="text-xs font-semibold text-slate-200">সার্ভারটি ওয়েবসাইটে প্রদর্শন করুন (Active)</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">সিরিয়াল:</span>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                    className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-center text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                >
                  বাতিল
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>{editingServer ? "আপডেট সংরক্ষণ করুন" : "সার্ভার যোগ করুন"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirmId && (
        <ConfirmDialog
          isOpen={true}
          title="সার্ভার মুছে ফেলতে চান?"
          message="আপনি কি নিশ্চিত যে এই সার্ভারটি তালিকা থেকে মুছে ফেলতে চান? এটি মুছে ফেললে ওয়েবসাইট থেকেও মুছে যাবে।"
          confirmText="হ্যাঁ, মুছে ফেলুন"
          cancelText="না, থাক"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteConfirmId(null)}
        />
      )}

      {/* Reset Confirm */}
      {resetConfirmOpen && (
        <ConfirmDialog
          isOpen={true}
          title="ডিফল্ট সার্ভার তালিকায় রিসেট করবেন?"
          message="লিংক বিডির আসল ৫টি এফটিপি সার্ভার (10.16.100.244, 103.179.128.246, 172.16.16.10, 172.16.50.4, 103.179.58.126) এবং ১টি লাইভ টিভি পোর্টাল (10.9.9.10) পুনর্বহাল করা হবে।"
          confirmText="হ্যাঁ, রিসেট করুন"
          cancelText="বাতিল"
          onConfirm={handleResetConfirm}
          onCancel={() => setResetConfirmOpen(false)}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
