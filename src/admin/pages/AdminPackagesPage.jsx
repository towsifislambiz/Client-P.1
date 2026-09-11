// src/admin/pages/AdminPackagesPage.jsx
// Complete Internet Packages Management with Add, Edit, Duplicate, Toggle Active, and Feature Editor

import React, { useState } from "react";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  RotateCcw,
  Check,
  X,
  Zap,
  Sparkles,
  Layers,
  ArrowUpDown
} from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";
import ToastNotification from "../components/ToastNotification";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminPackagesPage() {
  const { packages, createPackage, updatePackage, deletePackage, resetPackages } = useSiteData();
  const [editingPackage, setEditingPackage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    speed: 50,
    speedUnit: "Mbps",
    price: 890,
    currency: "৳",
    badge: "",
    category: "home",
    featured: false,
    accentColor: "from-blue-600 to-cyan-500",
    isActive: true,
    sortOrder: 1,
    features: []
  });

  const [newFeatureText, setNewFeatureText] = useState("");

  const handleOpenCreate = () => {
    setFormData({
      id: `pkg-${Date.now()}`,
      name: "",
      speed: 60,
      speedUnit: "Mbps",
      price: 900,
      currency: "৳",
      badge: "New Offer",
      category: "home",
      featured: false,
      accentColor: "from-blue-600 to-cyan-500",
      isActive: true,
      sortOrder: packages.length + 1,
      features: [
        "High speed BDIX and CDN connectivity",
        "4K Youtube and Facebook Stream",
        "Optical Fiber Connection",
        "IPv6 Public IP Only",
        "24/7 Phone and Online Support",
        "1:8 Contention Ratio"
      ]
    });
    setIsCreating(true);
    setEditingPackage(null);
  };

  const handleOpenEdit = (pkg) => {
    setFormData({
      ...pkg,
      features: [...(pkg.features || [])]
    });
    setEditingPackage(pkg);
    setIsCreating(false);
  };

  const handleDuplicate = async (pkg) => {
    try {
      const duplicateData = {
        ...pkg,
        id: `pkg-${Date.now()}`,
        name: `${pkg.name} (Copy)`,
        sortOrder: packages.length + 1
      };
      await createPackage(duplicateData);
      setToast({
        type: "success",
        title: "প্যাকেজ ডুপ্লিকেট করা হয়েছে",
        message: `"${duplicateData.name}" সফলভাবে যুক্ত হয়েছে।`
      });
    } catch (err) {
      setToast({ type: "error", title: "ব্যর্থ হয়েছে", message: err.message });
    }
  };

  const handleToggleActive = async (pkg) => {
    try {
      await updatePackage(pkg.id, { isActive: !pkg.isActive });
      setToast({
        type: "success",
        title: pkg.isActive ? "প্যাকেজ নিষ্ক্রিয় করা হয়েছে" : "প্যাকেজ সক্রিয় করা হয়েছে",
        message: `পাবলিক ওয়েবসাইটে এর অবস্থা পরিবর্তন হয়েছে।`
      });
    } catch (err) {
      setToast({ type: "error", title: "ব্যর্থ হয়েছে", message: err.message });
    }
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeatureText.trim()]
    }));
    setNewFeatureText("");
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setToast({ type: "error", title: "নাম আবশ্যক", message: "প্যাকেজের নাম লিখুন।" });
      return;
    }

    try {
      if (isCreating) {
        await createPackage(formData);
        setToast({
          type: "success",
          title: "প্যাকেজ তৈরি সম্পন্ন",
          message: `"${formData.name}" সফলভাবে তৈরি হয়েছে।`
        });
      } else if (editingPackage) {
        await updatePackage(editingPackage.id, formData);
        setToast({
          type: "success",
          title: "প্যাকেজ আপডেট সম্পন্ন",
          message: `"${formData.name}" সফলভাবে আপডেট হয়েছে।`
        });
      }
      setIsCreating(false);
      setEditingPackage(null);
    } catch (err) {
      setToast({ type: "error", title: "সংরক্ষণ ব্যর্থ", message: err.message });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    try {
      await deletePackage(deleteConfirmId);
      setToast({
        type: "success",
        title: "প্যাকেজ মুছে ফেলা হয়েছে",
        message: "প্যাকেজটি সফলভাবে ডিলিট করা হয়েছে।"
      });
    } catch (err) {
      setToast({ type: "error", title: "ডিলিট ব্যর্থ", message: err.message });
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleResetPackagesConfirm = async () => {
    try {
      await resetPackages();
      setToast({
        type: "success",
        title: "রিসেট সম্পন্ন",
        message: "সব প্যাকেজ লিংক বিডি-র মূল ৭টি ডিফল্ট প্যাকেজে ফিরে গেছে।"
      });
    } catch (err) {
      setToast({ type: "error", title: "রিসেট ব্যর্থ", message: err.message });
    } finally {
      setResetConfirmOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Package className="w-6 h-6 text-cyan-400" />
            প্যাকেজ ও রেট কার্ড এডিটর (Packages Manager)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            ইন্টারনেট প্যাকেজের নাম, স্পিড, মাসিক মূল্য, ফিচার এবং সক্রিয়/নিষ্ক্রিয় স্ট্যাটাস পরিচালনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            title="সব প্যাকেজ লিংক বিডির আসল প্যাকেজে রিসেট করুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ডিফল্ট রিসেট</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন প্যাকেজ</span>
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-slate-900/90 border rounded-2xl p-5 flex flex-col justify-between transition shadow-lg relative ${
              pkg.isActive
                ? "border-slate-800 hover:border-slate-700"
                : "border-slate-800/50 opacity-60 bg-slate-950/60"
            }`}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${pkg.isActive ? "bg-emerald-400" : "bg-slate-600"}`} />
                  <h3 className="text-base sm:text-lg font-bold text-white">{pkg.name}</h3>
                  {pkg.badge && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                  {pkg.category}
                </span>
              </div>

              {/* Price & Speed Box */}
              <div className="flex items-baseline justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 mb-4">
                <div>
                  <span className="text-xs text-slate-400">স্পিড:</span>
                  <div className="text-xl font-black text-white flex items-baseline gap-1">
                    <span>{pkg.speed}</span>
                    <span className="text-xs text-cyan-400 font-semibold">{pkg.speedUnit || "Mbps"}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400">মাসিক বিল:</span>
                  <div className="text-xl font-black text-emerald-400 flex items-baseline justify-end gap-0.5">
                    <span>৳{pkg.price}</span>
                    <span className="text-[10px] text-slate-400 font-normal">/মাস</span>
                  </div>
                </div>
              </div>

              {/* Features Preview */}
              <div className="space-y-1.5 mb-4">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">সুবিধাসমূহ ({pkg.features?.length || 0}):</p>
                <ul className="text-xs text-slate-300 space-y-1">
                  {(pkg.features || []).slice(0, 3).map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300 text-[11px] truncate">
                      <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                  {(pkg.features?.length || 0) > 3 && (
                    <li className="text-[10px] text-slate-500 italic pl-5">
                      + আরও {pkg.features.length - 3} টি সুবিধা
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="flex items-center justify-between gap-1.5 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleToggleActive(pkg)}
                  title={pkg.isActive ? "প্যাকেজটি লুকান (Inactive)" : "প্যাকেজটি সক্রিয় করুন"}
                  className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    pkg.isActive
                      ? "bg-slate-800 text-emerald-400 hover:bg-slate-700"
                      : "bg-slate-800 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {pkg.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleDuplicate(pkg)}
                  title="প্যাকেজ ডুপ্লিকেট / কপি করুন"
                  className="p-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(pkg)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/40 hover:border-blue-400 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  এডিট
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(pkg.id)}
                  className="p-2 rounded-xl text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 transition cursor-pointer"
                  title="প্যাকেজটি মুছে ফেলুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Package Modal */}
      {(isCreating || editingPackage) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-cyan-400" />
                {isCreating ? "নতুন প্যাকেজ তৈরি করুন" : `"${editingPackage?.name}" প্যাকেজ এডিট`}
              </h2>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingPackage(null);
                }}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    প্যাকেজের নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="যেমন: Silver+, Gold+, Gaming Special"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ব্যাজ (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="যেমন: Popular, Hot, Best Value"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Speed */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    স্পিড (Mbps) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.speed}
                    onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    মাসিক মূল্য (টাকা ৳) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="home">Home Packages</option>
                    <option value="pro">Corporate / Pro Packages</option>
                  </select>
                </div>

                {/* Status Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    পাবলিক অবস্থা
                  </label>
                  <select
                    value={formData.isActive ? "active" : "inactive"}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "active" })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="active">সক্রিয় (ওয়েবসাইটে প্রদর্শিত হবে)</option>
                    <option value="inactive">লুকানো (Inactive)</option>
                  </select>
                </div>
              </div>

              {/* Features List Manager */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  প্যাকেজের ফিচারের তালিকা ({formData.features.length})
                </label>

                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    placeholder="নতুন ফিচার লিখুন (যেমন: 4K Youtube Stream, IPv6 Support)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
                  >
                    যোগ করুন
                  </button>
                </div>

                <div className="max-h-36 overflow-y-auto space-y-1.5 p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                  {formData.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-1.5 px-2.5 rounded-lg bg-slate-900 text-xs text-slate-200"
                    >
                      <span className="truncate">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-rose-400 hover:text-rose-300 cursor-pointer p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingPackage(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        title="প্যাকেজটি মুছে ফেলতে চান?"
        message="প্যাকেজটি ডিলিট করলে তা পাবলিক ওয়েবসাইট থেকে সরে যাবে। আপনি চাইলে ডিলিট না করে এটিকে 'Inactive' বা হাইড করেও রাখতে পারেন।"
        confirmText="হ্যাঁ, ডিলিট করুন"
        isDanger={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />

      {/* Reset Packages Confirmation */}
      <ConfirmDialog
        isOpen={resetConfirmOpen}
        title="সব প্যাকেজ আসল ডিফল্টে রিসেট করবেন?"
        message="এটি সব কাস্টম প্যাকেজ মুছে লিংক বিডি-র মূল ৭টি প্যাকেজ (Silver+ থেকে Sky+) পুনর্বহাল করবে।"
        confirmText="হ্যাঁ, রিসেট করুন"
        isDanger={true}
        onConfirm={handleResetPackagesConfirm}
        onCancel={() => setResetConfirmOpen(false)}
      />

      {/* Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
