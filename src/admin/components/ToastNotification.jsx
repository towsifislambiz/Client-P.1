// src/admin/components/ToastNotification.jsx
import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastNotification({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm max-w-md ${
          isSuccess
            ? "bg-slate-900 text-white border-emerald-500/50 shadow-emerald-500/10"
            : isError
            ? "bg-slate-900 text-white border-rose-500/50 shadow-rose-500/10"
            : "bg-slate-900 text-white border-blue-500/50 shadow-blue-500/10"
        }`}
      >
        <div className="shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400" />}
        </div>

        <div className="flex-1 pr-2">
          <p className="font-semibold text-slate-100">{toast.title || (isSuccess ? "সফল হয়েছে" : isError ? "ত্রুটি" : "তথ্য")}</p>
          {toast.message && <p className="text-xs text-slate-300 mt-0.5">{toast.message}</p>}
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
