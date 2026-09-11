import React from "react";
import { MessageCircle, PhoneCall } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";

export default function WhatsAppWidget() {
  const { contact } = useSiteData();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3.5 sm:gap-5 pointer-events-auto">
      {/* Direct Phone Dial */}
      <a
        href={`tel:${contact.mainHotline}`}
        className="p-3 sm:p-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center border-2 border-white/30"
        title="২৪/৭ হটলাইনে কল করুন"
        aria-label="Direct Phone Dial"
      >
        <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>

      {/* WhatsApp Click to Chat with safe bounce clearance */}
      <a
        href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("হ্যালো Link BD, আমি নতুন ইন্টারনেট সংযোগ সম্পর্কে জানতে চাই।")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group p-3.5 sm:p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center animate-bounce duration-1000 border-2 border-white/30"
        title="WhatsApp Chat"
        aria-label="WhatsApp Live Chat"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
      </a>
    </div>
  );
}
