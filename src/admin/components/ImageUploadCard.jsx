// src/admin/components/ImageUploadCard.jsx
// Image Management Card with Live Preview, File Picker, Upload, and Reset

import React, { useState, useRef } from "react";
import { Upload, RotateCcw, Image as ImageIcon, Check, AlertCircle } from "lucide-react";

export default function ImageUploadCard({
  image,
  onUpload,
  onReset,
  onNotify
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate client-side extension & MIME
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowed.includes(file.type)) {
      onNotify?.({
        type: "error",
        title: "অসমর্থিত ফাইল ফরম্যাট",
        message: "শুধুমাত্র JPG, PNG বা WebP ফরম্যাটের ছবি আপলোড করুন।"
      });
      return;
    }

    // 5MB Limit
    if (file.size > 5 * 1024 * 1024) {
      onNotify?.({
        type: "error",
        title: "ফাইল অত্যন্ত বড়",
        message: "ছবির আকার সর্বোচ্চ ৫ মেগাবাইট (5MB) হতে পারে।"
      });
      return;
    }

    setSelectedFile(file);
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
  };

  const handleSaveUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      await onUpload(image.id, selectedFile);
      onNotify?.({
        type: "success",
        title: "ছবি সফলভাবে সংরক্ষিত হয়েছে",
        message: `"${image.name}" ওয়েবসাইটে কার্যকর হয়েছে।`
      });
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      onNotify?.({
        type: "error",
        title: "আপলোড ব্যর্থ হয়েছে",
        message: err.message || "ছবি আপলোড করার সময় সমস্যা হয়েছে।"
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCancelSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await onReset(image.id);
      onNotify?.({
        type: "success",
        title: "ডিফল্টে রিসেট সম্পন্ন",
        message: `"${image.name}" আসল ছবিতে ফিরে গেছে।`
      });
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      onNotify?.({
        type: "error",
        title: "রিসেট ব্যর্থ হয়েছে",
        message: err.message
      });
    } finally {
      setIsResetting(false);
    }
  };

  const displayUrl = previewUrl || image.currentUrl;
  const isModified = image.currentUrl !== image.defaultUrl;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition shadow-lg relative group">
      <div>
        {/* Top Info */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-500/15 text-cyan-300 border border-blue-500/30">
              {image.pageLabel || image.page}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-slate-100 mt-1">
              {image.name}
            </h4>
          </div>
          {isModified && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              কাস্টমাইজড
            </span>
          )}
        </div>

        {/* Thumbnail Preview Area */}
        <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center mb-3">
          {displayUrl ? (
            <img
              src={displayUrl}
              alt={image.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = image.defaultUrl;
              }}
            />
          ) : (
            <div className="flex flex-col items-center text-slate-500">
              <ImageIcon className="w-8 h-8 mb-1" />
              <span className="text-xs">ছবি পাওয়া যায়নি</span>
            </div>
          )}

          {/* Pending Save Overlay */}
          {previewUrl && (
            <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center">
              <span className="text-xs font-bold text-cyan-300 mb-1">নতুন ছবি সিলেক্ট করা হয়েছে</span>
              <p className="text-[11px] text-slate-300 mb-2 truncate max-w-xs">{selectedFile?.name}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveUpload}
                  disabled={isUploading}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? (
                    <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  সেভ করুন
                </button>
                <button
                  type="button"
                  onClick={handleCancelSelection}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  বাতিল
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {image.description || "এই ছবিটি সংশ্লিষ্ট পেইজের নির্ধারিত স্থানে প্রদর্শিত হয়।"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={handleFileSelect}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/40 hover:border-blue-400 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Upload className="w-3.5 h-3.5" />
          {selectedFile ? "অন্য ছবি পছন্দ করুন" : "নতুন ছবি আপলোড"}
        </button>

        {isModified && (
          <button
            type="button"
            onClick={handleReset}
            disabled={isResetting}
            title="আসল ডিফল্ট ছবিতে ফিরে যান"
            className="p-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            {isResetting ? (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <RotateCcw className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
