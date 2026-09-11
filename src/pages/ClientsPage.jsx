import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, ShieldCheck, Network, Send, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useSiteData } from "../context/SiteDataContext";

export default function ClientsPage() {
  const { imageMap, submitInquiry } = useSiteData();
  const [formData, setFormData] = useState({ company: "", name: "", phone: "", bandwidth: "100 Mbps" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company || !formData.phone) return;
    try {
      await submitInquiry({
        name: formData.name || formData.company,
        phone: formData.phone,
        package: `Corporate ${formData.bandwidth}`,
        address: formData.company,
        source: "corporate_clients_page"
      });
    } catch {}
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 pt-2 sm:pt-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 mb-3">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            কর্পোরেট পার্টনার্স ও এন্টারপ্রাইজ ক্লায়েন্টস
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-snug sm:leading-tight">
            বাংলাদেশের শীর্ষস্থানীয় প্রতিষ্ঠানের <span className="text-blue-600">আস্থা</span>
          </h1>
          <p className="mt-3 text-slate-600 text-xs sm:text-base font-light leading-relaxed">
            ৫০০+ ব্যাংক, আর্থিক প্রতিষ্ঠান, পোশাক শিল্প ও এন্টারপ্রাইজ ক্লায়েন্টকে সার্বক্ষণিক নিরবচ্ছিন্ন ডেডিকেটেড ফাইবার সেবা প্রদান করছি
          </p>
        </motion.div>

        {/* Corporate Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-md text-center">
            <div className="text-2xl sm:text-4xl font-black text-blue-600 mb-1">৫০০+</div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase">কর্পোরেট গ্রাহক</div>
          </div>
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-md text-center">
            <div className="text-2xl sm:text-4xl font-black text-emerald-600 mb-1">৯৯.৯৯%</div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase">আপটাইম SLA</div>
          </div>
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-md text-center">
            <div className="text-2xl sm:text-4xl font-black text-purple-600 mb-1">১৫,০০০+</div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase">সক্রিয় ইউজার</div>
          </div>
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-md text-center">
            <div className="text-2xl sm:text-4xl font-black text-amber-500 mb-1">২৪/৭</div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase">NOC সাপোর্ট</div>
          </div>
        </div>

        {/* Client Banners Showcase */}
        <div className="mb-14 sm:mb-20 space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900">
              আমাদের সম্মানিত ক্লায়েন্টবৃন্দ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              যাদের নিরবচ্ছিন্ন ডাটা ও অফিস কানেক্টিভিটি সুরক্ষায় Link BD সার্বক্ষণিক নিয়োজিত
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-3 sm:p-4"
          >
            <img
              src={imageMap["clients_banner"]?.currentUrl || "/assets/clients-1.png"}
              alt="Corporate Clients 1"
              className="w-full h-auto object-contain max-h-[300px] mx-auto"
              onError={(e) => {
                e.currentTarget.src = "/assets/clients-1.png";
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-3 sm:p-4"
          >
            <img
              src={imageMap["clients_grid"]?.currentUrl || "/assets/clients-2.png"}
              alt="Corporate Clients 2"
              className="w-full h-auto object-contain max-h-[300px] mx-auto"
              onError={(e) => {
                e.currentTarget.src = "/assets/clients-2.png";
              }}
            />
          </motion.div>
        </div>

        {/* Corporate Bandwidth Inquiry Form */}
        <div className="max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="p-5 sm:p-10 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 text-center mb-1">
              কর্পোরেট ডেডিকেটেড ব্যান্ডউইডথ কোটেশন
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 text-center mb-6">
              আপনার প্রতিষ্ঠানের জন্য কাস্টমাইজড ব্যান্ডউইডথ ও এসএলএ প্রস্তাবনা পেতে ফর্মটি পূরণ করুন
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">প্রতিষ্ঠানের নাম *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="কোম্পানির নাম..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">যোগাযোগকারীর নাম *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="নাম লিখুন..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">প্রত্যাশিত ব্যান্ডউইডথ</label>
                    <select
                      value={formData.bandwidth}
                      onChange={(e) => setFormData({ ...formData, bandwidth: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="50 Mbps">৫০ Mbps ডেডিকেটেড</option>
                      <option value="100 Mbps">১০০ Mbps ডেডিকেটেড</option>
                      <option value="200 Mbps">২০০ Mbps ডেডিকেটেড</option>
                      <option value="500 Mbps+">৫০০ Mbps+ এন্টারপ্রাইজ</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  কর্পোরেট প্রস্তাবনার আবেদন জমা দিন
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">ধন্যবাদ! প্রস্তাবনা আবেদন জমা হয়েছে</h4>
                <p className="text-xs text-slate-600">আমাদের কর্পোরেট রিলেশনশিপ ম্যানেজার দ্রুত আপনার সাথে যোগাযোগ করবেন।</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
