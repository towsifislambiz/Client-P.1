// src/admin/pages/AdminImagesPage.jsx
// Comprehensive Page-by-Page Image & Banner Management

import React, { useState } from "react";
import { Image as ImageIcon, Filter, CheckCircle2, RotateCcw, Search } from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";
import ImageUploadCard from "../components/ImageUploadCard";
import ToastNotification from "../components/ToastNotification";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminImagesPage() {
  const { images, uploadImage, resetImage } = useSiteData();
  const [selectedPage, setSelectedPage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [resetConfirmId, setResetConfirmId] = useState(null);
  const [isResettingAll, setIsResettingAll] = useState(false);

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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-cyan-400" />
            ছবি ও ব্যানার কন্ট্রোল (Images & Banners)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            ওয়েবসাইটের প্রতিটি পেইজের ব্যানার ও গ্রাফিক ছবি কম্পিউটার থেকে সরাসরি আপলোড বা রিসেট করুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">
            মোট ছবি: <strong className="text-white">{images.length}</strong>
          </span>
        </div>
      </div>

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

        {/* Search */}
        <div className="relative shrink-0 md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="ছবির নাম খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Image Cards Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-300">কোনো ছবি পাওয়া যায়নি</p>
          <p className="text-xs text-slate-500 mt-1">ফিল্টার অথবা সার্চ কোয়েরি পরিবর্তন করুন</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredImages.map((img) => (
            <ImageUploadCard
              key={img.id}
              image={img}
              onUpload={uploadImage}
              onReset={(id) => setResetConfirmId(id)}
              onNotify={setToast}
            />
          ))}
        </div>
      )}

      {/* Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Reset Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(resetConfirmId)}
        title="আসল ডিফল্ট ছবিতে রিসেট করবেন?"
        message="আপনি কি এই ছবিটিকে তার আসল ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান? বর্তমান কাস্টমাইজেশন মুছে যাবে।"
        confirmText="হ্যাঁ, রিসেট করুন"
        isDanger={false}
        onConfirm={handleResetConfirm}
        onCancel={() => setResetConfirmId(null)}
      />
    </div>
  );
}
