// src/admin/components/ConfirmDialog.jsx
import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmDialog({
  isOpen,
  title = "আপনি কি নিশ্চিত?",
  message = "এই কাজটি সম্পন্ন করলে পূর্ববর্তী ডেটা পরিবর্তিত হবে।",
  confirmText = "হ্যাঁ, নিশ্চিত",
  cancelText = "বাতিল",
  isDanger = true,
  isLoading = false,
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative text-white"
        >
          <div className="flex items-start gap-3.5 mb-4">
            <div className={`p-2.5 rounded-xl shrink-0 ${isDanger ? "bg-rose-500/15 text-rose-400 border border-rose-500/30" : "bg-amber-500/15 text-amber-400 border border-amber-500/30"}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">{title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">{message}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition cursor-pointer disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition shadow-lg cursor-pointer flex items-center gap-1.5 disabled:opacity-50 ${
                isDanger
                  ? "bg-rose-600 hover:bg-rose-500 shadow-rose-600/20"
                  : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20"
              }`}
            >
              {isLoading && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
