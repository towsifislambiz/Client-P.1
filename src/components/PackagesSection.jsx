import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Wifi, Flame, ArrowRight } from "lucide-react";
import { packages as defaultPackages } from "../data/ispData";
import { useSiteData } from "../context/SiteDataContext";

export default function PackagesSection({ onSelectPackage }) {
  const { activePackages } = useSiteData();
  const packageList = activePackages?.length > 0 ? activePackages : defaultPackages;
  const [filter, setFilter] = useState("all");
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly vs yearly (10% off)

  const filteredPackages = packageList.filter((pkg) => {
    if (filter === "home") return pkg.category === "home";
    if (filter === "pro") return pkg.category === "pro";
    return true;
  });

  return (
    <section id="packages" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute left-1/2 -top-40 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 mb-3 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
            সেরা ফাইবার ব্রডব্যান্ড অফার
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            আপনার প্রয়োজন অনুযায়ী সেরা প্যাকেজটি বেছে নিন
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            প্রতিটি প্যাকেজেই পাচ্ছেন রিয়েল হাই-স্পিড অপটিক্যাল ফাইবার, ২৪/৭ হটলাইন সাপোর্ট এবং 1:8 কন্টেনশন রেশিও
          </p>

          {/* Filter & Billing Cycle Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* Category Filter Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/90 border border-slate-300 shadow-inner">
              <button
                onClick={() => setFilter("all")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  filter === "all" ? "bg-white text-blue-600 shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                সব প্যাকেজ ({packages.length}টি)
              </button>
              <button
                onClick={() => setFilter("home")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  filter === "home" ? "bg-white text-blue-600 shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                হোম ইউজার (৫০ - ১৫০ Mbps)
              </button>
              <button
                onClick={() => setFilter("pro")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  filter === "pro" ? "bg-white text-blue-600 shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                গেমিং ও আল্ট্রা (২০০ - ৩০০ Mbps)
              </button>
            </div>

            {/* Monthly vs Yearly Switcher */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-bold text-slate-700">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-3 py-2 rounded-xl transition ${billingCycle === "monthly" ? "bg-blue-600 text-white shadow-sm" : "hover:text-blue-600"}`}
              >
                মাসিক
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-3 py-2 rounded-xl transition flex items-center gap-1 ${billingCycle === "yearly" ? "bg-blue-600 text-white shadow-sm" : "hover:text-blue-600"}`}
              >
                বাৎসরিক <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.5 rounded font-black">১০% ছাড়</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Packages Grid with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredPackages.map((pkg, index) => {
              const isFeatured = pkg.featured;
              const displayPrice = billingCycle === "yearly" ? Math.round(pkg.price * 0.9) : pkg.price;

              return (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className={`relative flex flex-col justify-between rounded-3xl bg-white border transition-shadow overflow-hidden group ${
                    isFeatured 
                      ? "border-blue-500 shadow-xl shadow-blue-500/15 ring-2 ring-blue-500" 
                      : "border-slate-200 shadow-md hover:shadow-2xl"
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className={`absolute top-4 right-4 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider text-white bg-gradient-to-r ${pkg.accentColor} shadow-md`}>
                      {pkg.badge}
                    </div>
                  )}

                  <div className="p-6 sm:p-7">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Wifi className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                        <p className="text-[11px] text-slate-500">Optical Fiber Broadband</p>
                      </div>
                    </div>

                    {/* Speed Dial Banner */}
                    <div className={`py-4 px-4 rounded-2xl bg-gradient-to-r ${pkg.accentColor} text-white text-center shadow-lg my-5 group-hover:scale-105 transition-transform duration-300`}>
                      <span className="text-4xl font-black tracking-tight">{pkg.speed}</span>
                      <span className="text-base font-bold ml-1.5">{pkg.speedUnit}</span>
                    </div>

                    {/* Price with Animation */}
                    <div className="mb-6 pb-6 border-b border-slate-100 flex items-baseline justify-center">
                      <span className="text-xs font-bold text-slate-400 mr-1">TK</span>
                      <motion.span
                        key={displayPrice}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-black text-slate-900 tracking-tight"
                      >
                        {displayPrice}
                      </motion.span>
                      <span className="text-xs font-semibold text-slate-500 ml-1.5">
                        / {billingCycle === "yearly" ? "মাস (বার্ষিক বিল)" : "মাস"}
                      </span>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-3 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                          <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 mt-0.5 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Button */}
                  <div className="p-6 sm:p-7 pt-0">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectPackage(pkg)}
                      className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isFeatured
                          ? "bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                          : "bg-slate-900 hover:bg-blue-600 text-white"
                      }`}
                    >
                      সংযোগ নিন ({pkg.name})
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
