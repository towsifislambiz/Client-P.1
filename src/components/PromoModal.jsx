// src/components/PromoModal.jsx
// High-Impact Promotional Advertisement Popup Modal
// Supports 5-Minute Dismissal Cooldown, Image Upload from Admin, and Interactive Actions

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Wifi, Clock, Sparkles } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";

export default function PromoModal({ onOpenConnectionModal }) {
  const { adPopup } = useSiteData();
  const [isOpen, setIsOpen] = useState(false);
  const reShowTimerRef = React.useRef(null);

  // 1. Show immediately when visitor enters the website or reloads the page
  useEffect(() => {
    if (!adPopup || adPopup.isActive === false) {
      setIsOpen(false);
      return;
    }

    // Show on entrance / reload (smooth entrance after initial DOM render)
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 350);

    return () => {
      clearTimeout(initialTimer);
      if (reShowTimerRef.current) {
        clearTimeout(reShowTimerRef.current);
      }
    };
  }, [adPopup?.isActive]);

  // Support manual trigger from admin preview
  useEffect(() => {
    const handleManualOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener("linkbd_open_promo_modal", handleManualOpen);
    return () => window.removeEventListener("linkbd_open_promo_modal", handleManualOpen);
  }, []);

  // When visitor deletes/closes the popup, re-show after 5 minutes
  const handleClose = () => {
    setIsOpen(false);

    if (reShowTimerRef.current) {
      clearTimeout(reShowTimerRef.current);
    }

    const cooldownMinutes = Number(adPopup?.cooldownMinutes) || 5;
    const cooldownMs = cooldownMinutes * 60 * 1000; // 5 minutes = 300,000ms

    // Schedule re-appearance after 5 minutes
    reShowTimerRef.current = setTimeout(() => {
      if (adPopup?.isActive !== false) {
        setIsOpen(true);
      }
    }, cooldownMs);
  };

  const handleAction = () => {
    handleClose();
    if (adPopup?.actionType === "connection_modal" || (!adPopup?.targetUrl && onOpenConnectionModal)) {
      if (onOpenConnectionModal) {
        setTimeout(() => onOpenConnectionModal(), 150);
      }
    } else if (adPopup?.targetUrl) {
      window.open(adPopup.targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!adPopup || adPopup.isActive === false) return null;

  const imageUrl = adPopup.imageUrl || "/assets/promo-popup.svg";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Frosted Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md -z-10"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="relative w-full max-w-[440px] sm:max-w-[480px] my-auto bg-slate-950 rounded-3xl sm:rounded-[32px] overflow-visible shadow-2xl shadow-blue-950/60 border border-slate-700/80"
          >
            {/* Top Right Floating Close Button (Identical to reference screenshot) */}
            <button
              onClick={handleClose}
              className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-100 text-slate-900 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 z-30 cursor-pointer border border-slate-200"
              title="বিজ্ঞাপন বন্ধ করুন (৫ মিনিট পর আবার দেখাবে)"
              aria-label="Close Promo Modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Main Interactive Promo Image */}
            <div
              onClick={handleAction}
              className="relative overflow-hidden rounded-3xl sm:rounded-[32px] group cursor-pointer bg-slate-950"
            >
              <img
                src={imageUrl}
                alt={adPopup.title || "Link BD Special Offer"}
                className="w-full h-auto object-contain max-h-[80vh] transition-transform duration-300 group-hover:scale-[1.01]"
                onError={(e) => {
                  e.currentTarget.src = "/assets/promo-popup.svg";
                }}
              />

              {/* Subtle hover overlay hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg">
                  <Wifi className="w-3.5 h-3.5" />
                  <span>অফারটি নিতে এখানে ক্লিক করুন</span>
                </span>
              </div>
            </div>

            {/* Bottom 5-Minute Cooldown Subtle Pill */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-medium text-slate-400 backdrop-blur-md shadow-md">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>বন্ধ করলে ৫ মিনিট পর আবার দেখতে পাবেন</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
