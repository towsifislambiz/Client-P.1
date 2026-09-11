// src/admin/pages/AdminBrandingPage.jsx
// Logo and Branding Management with Dark/Light Previews, File Upload, and Default Reset

import React, { useState, useRef } from "react";
import { Sparkles, Upload, RotateCcw, Check, Sun, Moon, Info } from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";
import ToastNotification from "../components/ToastNotification";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminBrandingPage() {
  const { branding, uploadLogo, resetLogo } = useSiteData();
  const [toast, setToast] = useState(null);
  const [resetTarget, setResetTarget] = useState(null);

  const [uploadingTarget, setUploadingTarget] = useState(null);
  const [navbarPreview, setNavbarPreview] = useState(null);
  const [footerPreview, setFooterPreview] = useState(null);
  const [selectedNavbarFile, setSelectedNavbarFile] = useState(null);
  const [selectedFooterFile, setSelectedFooterFile] = useState(null);

  const navbarInputRef = useRef(null);
  const footerInputRef = useRef(null);

  const handleSelectLogo = (e, target) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowed.includes(file.type)) {
      setToast({
        type: "error",
        title: "অসমর্থিত ফাইল ফরম্যাট",
        message: "শুধুমাত্র PNG, JPG বা WebP ফরম্যাটের লোগো আপলোড করুন।"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setToast({
        type: "error",
        title: "ফাইল অত্যন্ত বড়",
        message: "ফাইলের আকার সর্বোচ্চ ৫ মেগাবাইট (5MB) হতে পারে।"
      });
      return;
    }

    const localUrl = URL.createObjectURL(file);
    if (target === "navbarLogo") {
      setSelectedNavbarFile(file);
      setNavbarPreview(localUrl);
    } else {
      setSelectedFooterFile(file);
      setFooterPreview(localUrl);
    }
  };

  const handleSaveLogo = async (target) => {
    const file = target === "navbarLogo" ? selectedNavbarFile : selectedFooterFile;
    if (!file) return;

    setUploadingTarget(target);
    try {
      await uploadLogo(file, target);
      setToast({
        type: "success",
        title: "লোগো সফলভাবে সংরক্ষিত হয়েছে",
        message: "নতুন লোগো অবিলম্বে পুরো ওয়েবসাইটে কার্যকর হয়েছে।"
      });
      if (target === "navbarLogo") {
        setSelectedNavbarFile(null);
        setNavbarPreview(null);
      } else {
        setSelectedFooterFile(null);
        setFooterPreview(null);
      }
    } catch (err) {
      setToast({ type: "error", title: "আপলোড ব্যর্থ", message: err.message });
    } finally {
      setUploadingTarget(null);
    }
  };

  const handleCancelLogo = (target) => {
    if (target === "navbarLogo") {
      setSelectedNavbarFile(null);
      setNavbarPreview(null);
      if (navbarInputRef.current) navbarInputRef.current.value = "";
    } else {
      setSelectedFooterFile(null);
      setFooterPreview(null);
      if (footerInputRef.current) footerInputRef.current.value = "";
    }
  };

  const handleResetConfirm = async () => {
    if (!resetTarget) return;
    try {
      await resetLogo(resetTarget);
      setToast({
        type: "success",
        title: "লোগো রিসেট সম্পন্ন",
        message: "লোগোটি আসল লিংক বিডি ডিফল্ট লোগোতে ফিরিয়ে আনা হয়েছে।"
      });
    } catch (err) {
      setToast({ type: "error", title: "রিসেট ব্যর্থ", message: err.message });
    } finally {
      setResetTarget(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            লোগো ও ব্র্যান্ডিং কন্ট্রোল (Logo & Branding)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            ওয়েবসাইটের হেডার ও ফুটার লোগো পরিবর্তন করুন। স্বচ্ছ ব্যাকগ্রাউন্ডের (Transparent PNG/WebP) লোগো সেরা ফলাফল প্রদান করে।
          </p>
        </div>

        <button
          onClick={() => setResetTarget("all")}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>ডিফল্ট লোগোতে রিসেট</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ITEM 1: NAVBAR HEADER LOGO */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  মূল নেভিগেশন বার
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  হেডার লোগো (Navbar Header Logo)
                </h2>
              </div>

              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-500/15 text-cyan-300 border border-blue-500/30">
                Top Nav
              </span>
            </div>

            {/* Dark & Light Preview Grid */}
            <div className="space-y-3 mb-5">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                  <Moon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ডার্ক মোড প্রিভিউ (Dark Background):</span>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[90px]">
                  <img
                    src={navbarPreview || branding.navbarLogo || "/assets/logo.png"}
                    alt="Header Logo Dark"
                    className="max-h-11 object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>লাইট মোড প্রিভিউ (Light Background):</span>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-center min-h-[90px]">
                  <img
                    src={navbarPreview || branding.navbarLogo || "/assets/logo.png"}
                    alt="Header Logo Light"
                    className="max-h-11 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Pending Selection Controls */}
            {navbarPreview && (
              <div className="p-3.5 rounded-xl bg-blue-950/70 border border-blue-800/80 mb-4 flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-cyan-300 truncate">নতুন লোগো সিলেক্টেড</span>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSaveLogo("navbarLogo")}
                    disabled={uploadingTarget === "navbarLogo"}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    {uploadingTarget === "navbarLogo" ? (
                      <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    সেভ করুন
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancelLogo("navbarLogo")}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
            <input
              ref={navbarInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) => handleSelectLogo(e, "navbarLogo")}
            />
            <button
              type="button"
              onClick={() => navbarInputRef.current?.click()}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/40 hover:border-blue-400 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{selectedNavbarFile ? "অন্য লোগো ফাইল পছন্দ করুন" : "নতুন হেডার লোগো আপলোড"}</span>
            </button>

            <button
              type="button"
              onClick={() => setResetTarget("navbarLogo")}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              title="ডিফল্ট হেডার লোগোতে রিসেট করুন"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ITEM 2: FOOTER LOGO */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  ওয়েবসাইটের তলদেশ
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  ফুটার লোগো (Footer Logo)
                </h2>
              </div>

              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Footer Section
              </span>
            </div>

            {/* Dark & Light Preview Grid */}
            <div className="space-y-3 mb-5">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                  <Moon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ডার্ক মোড প্রিভিউ (Dark Background):</span>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[90px]">
                  <img
                    src={footerPreview || branding.footerLogo || "/assets/logo-footer.png"}
                    alt="Footer Logo Dark"
                    className="max-h-11 object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>লাইট মোড প্রিভিউ (Light Background):</span>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-center min-h-[90px]">
                  <img
                    src={footerPreview || branding.footerLogo || "/assets/logo-footer.png"}
                    alt="Footer Logo Light"
                    className="max-h-11 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Pending Selection Controls */}
            {footerPreview && (
              <div className="p-3.5 rounded-xl bg-blue-950/70 border border-blue-800/80 mb-4 flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-cyan-300 truncate">নতুন লোগো সিলেক্টেড</span>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSaveLogo("footerLogo")}
                    disabled={uploadingTarget === "footerLogo"}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    {uploadingTarget === "footerLogo" ? (
                      <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    সেভ করুন
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancelLogo("footerLogo")}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
            <input
              ref={footerInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) => handleSelectLogo(e, "footerLogo")}
            />
            <button
              type="button"
              onClick={() => footerInputRef.current?.click()}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/40 hover:border-blue-400 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{selectedFooterFile ? "অন্য লোগো ফাইল পছন্দ করুন" : "নতুন ফুটার লোগো আপলোড"}</span>
            </button>

            <button
              type="button"
              onClick={() => setResetTarget("footerLogo")}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              title="ডিফল্ট ফুটার লোগোতে রিসেট করুন"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/60 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-white mb-0.5">লোগো আপলোড টিপস:</p>
          <p className="leading-relaxed">
            ওয়েবসাইটের ডার্ক ও লাইট ব্যাকগ্রাউন্ডে পরিষ্কার রেন্ডারিংয়ের জন্য স্বচ্ছ ট্রান্সপারেন্ট পিএনজি (Transparent PNG) ফাইল ব্যবহার করুন। উচ্চতা কমপক্ষে ১২০ পিক্সেল এবং প্রস্থ ২০০–৪০০ পিক্সেল হলে চমৎকার দেখাবে।
          </p>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(resetTarget)}
        title="লোগো আসল ডিফল্ট চিত্রে রিসেট করবেন?"
        message="আপনি কি লোগোটিকে লিংক বিডি-র মূল ডিফল্ট লোগোতে ফিরিয়ে নিতে চান?"
        confirmText="হ্যাঁ, রিসেট করুন"
        isDanger={false}
        onConfirm={handleResetConfirm}
        onCancel={() => setResetTarget(null)}
      />

      {/* Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
