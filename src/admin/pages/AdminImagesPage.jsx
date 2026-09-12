// src/admin/pages/AdminImagesPage.jsx
// Comprehensive Page-by-Page Image, Banner & Promotional Ad Popup Management

import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Filter,
  CheckCircle2,
  RotateCcw,
  Search,
  Megaphone,
  Upload,
  Eye,
  Clock,
  Sparkles,
  Link as LinkIcon,
  Check,
  X,
  Radio,
  Sliders,
  AlertCircle
} from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";
import ImageUploadCard from "../components/ImageUploadCard";
import ToastNotification from "../components/ToastNotification";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminImagesPage() {
  const { images, uploadImage, resetImage, resetAllImages, adPopup, updateAdPopup, resetAdPopup } = useSiteData();
  const [activeTab, setActiveTab] = useState("banners"); // "banners" | "popup"
  const [selectedPage, setSelectedPage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [resetConfirmId, setResetConfirmId] = useState(null);
  const [resetAllConfirmOpen, setResetAllConfirmOpen] = useState(false);

  // Ad Popup Form State
  const [adIsActive, setAdIsActive] = useState(adPopup?.isActive !== false);
  const [adTitle, setAdTitle] = useState(adPopup?.title || "Link BD স্পেশাল অফার ও মেগা ডিসকাউন্ট");
  const [adImageUrl, setAdImageUrl] = useState(adPopup?.imageUrl || "/assets/promo-popup.svg");
  const [adTargetUrl, setAdTargetUrl] = useState(adPopup?.targetUrl || "");
  const [adActionType, setAdActionType] = useState(adPopup?.actionType || "connection_modal");
  const [adCooldown, setAdCooldown] = useState(adPopup?.cooldownMinutes || 5);
  const [isSavingAd, setIsSavingAd] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    if (adPopup) {
      setAdIsActive(adPopup.isActive !== false);
      if (adPopup.title) setAdTitle(adPopup.title);
      if (adPopup.imageUrl) setAdImageUrl(adPopup.imageUrl);
      if (adPopup.targetUrl !== undefined) setAdTargetUrl(adPopup.targetUrl);
      if (adPopup.actionType) setAdActionType(adPopup.actionType);
      if (adPopup.cooldownMinutes !== undefined) setAdCooldown(adPopup.cooldownMinutes);
    }
  }, [adPopup]);

  const pagesList = [
    { key: "all", label: "সকল পেইজ" },
    { key: "Home", label: "হোম পেইজ" },
    { key: "Packages", label: "প্যাকেজ পেইজ" },
    { key: "Coverage", label: "কাভারেজ এরিয়া" },
    { key: "BillPay", label: "বিল পরিশোধ" },
    { key: "FtpTv", label: "এফটিপি ও টিভি" },
    { key: "Clients", label: "ক্লায়েন্টবৃন্দ" },
    { key: "Offices", label: "আমাদের অফিস" },
    { key: "Contact", label: "যোগাযোগ" },
  ];

  const filteredImages = images.filter((img) => {
    const matchesPage = selectedPage === "all" || img.page.toLowerCase() === selectedPage.toLowerCase();
    const matchesSearch = !searchQuery.trim() ||
      img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (img.description && img.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPage && matchesSearch;
  });

  // Handle Ad Image File Upload
  const handleAdImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setToast({ type: "error", title: "ভুল ফরম্যাট", message: "শুধুমাত্র ছবি (PNG, JPG, WebP, SVG) নির্বাচন করুন।" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target.result;
      setAdImageUrl(dataUrl);
      setPreviewFile(file.name);
      setToast({ type: "success", title: "ছবি আপলোড সম্পন্ন", message: "নতুন বিজ্ঞাপন ছবিটি প্রিভিউতে লোড হয়েছে।" });
    };
    reader.readAsDataURL(file);
  };

  // Save Ad Popup Settings
  const handleSaveAdPopup = async (e) => {
    if (e) e.preventDefault();
    setIsSavingAd(true);
    try {
      await updateAdPopup({
        isActive: adIsActive,
        title: adTitle.trim(),
        imageUrl: adImageUrl,
        targetUrl: adTargetUrl.trim(),
        actionType: adActionType,
        cooldownMinutes: Number(adCooldown) || 5
      });

      setToast({
        type: "success",
        title: "বিজ্ঞাপন পপআপ সংরক্ষিত",
        message: adIsActive
          ? "পপআপ বিজ্ঞাপনটি সফলভাবে সক্রিয় করা হয়েছে। ওয়েবসাইটে ভিজিটরদের সামনে অবিলম্বে কার্যকর হবে।"
          : "পপআপ বিজ্ঞাপনটি সাময়িকভাবে নিষ্ক্রিয় (Inactive) করা হয়েছে।"
      });
    } catch (err) {
      setToast({ type: "error", title: "সংরক্ষণ ব্যর্থ", message: err.message || "পপআপ আপডেট করা যায়নি।" });
    } finally {
      setIsSavingAd(false);
    }
  };

  // Trigger Live Test Popup
  const handleTestLivePopup = () => {
    // Clear dismissal timestamp in this tab to allow immediate test
    localStorage.removeItem("linkbd_ad_dismissed_at");
    window.dispatchEvent(new CustomEvent("linkbd_open_promo_modal"));
    setToast({
      type: "success",
      title: "লাইভ পপআপ টেস্ট চালু",
      message: "ওয়েবসাইটের পপআপটি স্ক্রিনে প্রদর্শিত হয়েছে।"
    });
  };

  // Reset to default
  const handleResetAdPopup = async () => {
    if (!window.confirm("আপনি কি বিজ্ঞাপন পপআপটি আসল ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?")) return;
    try {
      await resetAdPopup();
      setToast({ type: "success", title: "রিসেট সম্পন্ন", message: "বিজ্ঞাপন পপআপ ডিফল্ট অবস্থায় ফিরে এসেছে।" });
    } catch (err) {
      setToast({ type: "error", title: "রিসেট ব্যর্থ", message: err.message });
    }
  };

  const handleResetConfirm = async () => {
    if (!resetConfirmId) return;
    try {
      await resetImage(resetConfirmId);
      setToast({
        type: "success",
        title: "ডিফল্টে রিসেট সম্পন্ন",
        message: "ছবিটি আসল ডিফল্ট অবস্থায় ফিরিয়ে আনা হয়েছে।"
      });
    } catch (err) {
      setToast({
        type: "error",
        title: "রিসেট ব্যর্থ হয়েছে",
        message: err.message
      });
    } finally {
      setResetConfirmId(null);
    }
  };

  const handleResetAllConfirm = async () => {
    try {
      await resetAllImages();
      setToast({
        type: "success",
        title: "সব ছবি ডিফল্টে রিসেট সম্পন্ন",
        message: "ওয়েবসাইটের সকল ছবি ও ব্যানার আসল অবস্থায় ফিরিয়ে আনা হয়েছে।"
      });
    } catch (err) {
      setToast({
        type: "error",
        title: "রিসেট ব্যর্থ হয়েছে",
        message: err.message
      });
    } finally {
      setResetAllConfirmOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-cyan-400" />
            ছবি, ব্যানার ও বিজ্ঞাপন পপআপ কন্ট্রোল
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            ভিজিটরদের সামনে আসা পপআপ বিজ্ঞাপন পরিচালনা করুন এবং ওয়েবসাইটের প্রতিটি পেইজের ব্যানার কম্পিউটার থেকে সরাসরি পরিবর্তন করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setResetAllConfirmOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-slate-700"
            title="সব পেইজ ব্যানার মূল ছবিতে রিসেট করুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ডিফল্ট রিসেট</span>
          </button>

          {/* Primary Tab Switcher */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-lg">
            <button
              onClick={() => setActiveTab("banners")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === "banners"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ImageIcon className="w-4 h-4 text-cyan-300" />
              <span>পেইজের ব্যানার সমূহ ({images.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("popup")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === "popup"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Megaphone className="w-4 h-4 text-cyan-300" />
              <span>বিজ্ঞাপন পপআপ</span>
              <span className={`w-2 h-2 rounded-full ${adIsActive ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ===================== TAB 1: AD POPUP MODAL SUITE ===================== */}
      {activeTab === "popup" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Header & Status Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                  <Megaphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-white">বিজ্ঞাপন ও অফার পপআপ সেটিংস</h2>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        adIsActive
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      {adIsActive ? "অনলাইনে সক্রিয় (Active)" : "নিষ্ক্রিয় (Inactive)"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    কোনো ভিজিটর ওয়েবসাইটে আসার সাথে সাথে তার সামনে এই বিজ্ঞাপনটি পপআপ হবে। ভিজিটর বন্ধ করলে ৫ মিনিট পর আবার দেখতে পাবেন।
                  </p>
                </div>
              </div>

              {/* Master Active/Inactive Toggle Button */}
              <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800">
                <span className="text-xs font-semibold text-slate-300">পপআপ স্ট্যাটাস:</span>
                <button
                  type="button"
                  onClick={() => setAdIsActive(!adIsActive)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors cursor-pointer ${
                    adIsActive ? "bg-emerald-500" : "bg-slate-800"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      adIsActive ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveAdPopup} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT COL: Live Image Preview (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>পপআপ ব্যানার লাইভ প্রিভিউ</span>
                  </label>

                  {/* Mock Popup Box */}
                  <div className="relative rounded-3xl bg-slate-950 p-2 border border-slate-800 shadow-2xl overflow-hidden group">
                    {/* Simulated Close Button */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg pointer-events-none z-10 border border-slate-300">
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </div>

                    <img
                      src={adImageUrl}
                      alt="Ad Preview"
                      className="w-full h-auto max-h-96 object-contain rounded-2xl bg-slate-900"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/promo-popup.svg";
                      }}
                    />

                    {/* Overlay status tag */}
                    <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700 text-[11px] font-medium backdrop-blur-md">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>রি-শো বিরতি: {adCooldown} মিনিট</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleTestLivePopup}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-700 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>স্ক্রিনে লাইভ টেস্ট করুন</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetAdPopup}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
                      title="ডিফল্ট ব্যানারে রিসেট করুন"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>রিসেট</span>
                    </button>
                  </div>
                </div>

                {/* RIGHT COL: Settings & Upload Controls (7 Cols) */}
                <div className="lg:col-span-7 space-y-5">
                  {/* File Upload Dropzone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>কম্পিউটার থেকে নতুন বিজ্ঞাপন ছবি আপলোড করুন</span>
                    </label>
                    <div className="relative border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-2xl p-5 text-center transition bg-slate-950/60 cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAdImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center gap-2 pointer-events-none">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-slate-200">
                          {previewFile ? `নির্বাচিত: ${previewFile}` : "ছবি নির্বাচন করতে এখানে ক্লিক করুন"}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          সাপোর্টেড ফরম্যাট: PNG, JPG, WebP, SVG (সাইজ রেশিও: ৪:৫ অথবা ১:১ প্রস্তাবিত)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image URL Input (Alternative) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>অথবা সরাসরি ছবির লিংক দিন (Image URL)</span>
                    </label>
                    <input
                      type="text"
                      value={adImageUrl}
                      onChange={(e) => setAdImageUrl(e.target.value)}
                      placeholder="/assets/promo-popup.svg"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    />
                  </div>

                  {/* Title / Internal Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      বিজ্ঞাপনের শিরোনাম / অফার নাম
                    </label>
                    <input
                      type="text"
                      value={adTitle}
                      onChange={(e) => setAdTitle(e.target.value)}
                      placeholder="Link BD স্পেশাল অফার ও মেগা ডিসকাউন্ট"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    />
                  </div>

                  {/* Action Type Selector & Cooldown in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Action Type */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        বিজ্ঞাপনে ক্লিক করলে কী হবে?
                      </label>
                      <select
                        value={adActionType}
                        onChange={(e) => setAdActionType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                      >
                        <option value="connection_modal">নতুন সংযোগ আবেদন ফর্ম ওপেন হবে (প্রস্তাবিত)</option>
                        <option value="custom_url">কাস্টম ওয়েবসাইট লিংকে যাবে</option>
                        <option value="none">শুধু বিজ্ঞাপন প্রদর্শিত হবে (কোনো অ্যাকশন নেই)</option>
                      </select>
                    </div>

                    {/* Cooldown Timer */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>ভিজিটর বন্ধ করলে কতক্ষণ পর আবার দেখাবে?</span>
                      </label>
                      <select
                        value={adCooldown}
                        onChange={(e) => setAdCooldown(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                      >
                        <option value={5}>৫ মিনিট পর (ক্লায়েন্টের চাহিদা অনুযায়ী ডিফল্ট)</option>
                        <option value={10}>১০ মিনিট পর</option>
                        <option value={15}>১৫ মিনিট পর</option>
                        <option value={30}>৩০ মিনিট পর</option>
                        <option value={60}>১ ঘণ্টা পর</option>
                        <option value={0}>প্রতিবার পেজ রিফ্রেশে</option>
                      </select>
                    </div>
                  </div>

                  {/* Conditional Target URL */}
                  {adActionType === "custom_url" && (
                    <div className="animate-fadeIn">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>কাস্টম অফার লিংক (Target URL)</span>
                      </label>
                      <input
                        type="url"
                        value={adTargetUrl}
                        onChange={(e) => setAdTargetUrl(e.target.value)}
                        placeholder="https://facebook.com/... বা অন্য কোনো লিংক"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition font-mono"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSavingAd}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSavingAd ? (
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      <span>বিজ্ঞাপন সেটিংস সংরক্ষণ করুন</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: PAGE BANNERS GRID ===================== */}
      {activeTab === "banners" && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
            {/* Page Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {pagesList.map((p) => {
                const isActive = selectedPage === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => setSelectedPage(p.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Live Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ছবির নাম দিয়ে খুঁজুন..."
                className="w-full px-3 py-1.5 pl-8 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Image Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredImages.map((img) => (
              <ImageUploadCard
                key={img.id}
                image={img}
                onUpload={uploadImage}
                onReset={(id) => setResetConfirmId(id)}
              />
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800">
              <p className="text-sm text-slate-400">কোনো ছবি পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      )}

      {/* Reset Single Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(resetConfirmId)}
        title="ডিফল্ট ছবিতে রিসেট করবেন?"
        message="আপনি কি নিশ্চিত যে এই ছবিটি আসল ডিফল্ট অবস্থায় ফিরিয়ে আনতে চান? আপনার আপলোড করা কাস্টম ছবিটি মুছে যাবে।"
        confirmLabel="হ্যাঁ, রিসেট করুন"
        onConfirm={handleResetConfirm}
        onCancel={() => setResetConfirmId(null)}
      />

      {/* Reset All Confirmation Dialog */}
      <ConfirmDialog
        isOpen={resetAllConfirmOpen}
        title="সব ছবি ডিফল্টে রিসেট করবেন?"
        message="আপনি কি ওয়েবসাইটের সকল ব্যানার ও ছবি আসল ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান? আপনার আপলোড করা সব কাস্টম ছবি মুছে গিয়ে মূল ছবিগুলো ফিরে আসবে।"
        confirmLabel="হ্যাঁ, সব রিসেট করুন"
        onConfirm={handleResetAllConfirm}
        onCancel={() => setResetAllConfirmOpen(false)}
      />

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
