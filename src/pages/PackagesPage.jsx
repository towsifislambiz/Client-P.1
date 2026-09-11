import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, Wifi, Sparkles, ArrowRight, ShieldCheck, Zap, Sliders, 
  Calculator, HelpCircle, Flame, Server, Monitor, Shield, PlusCircle, CheckCircle2 
} from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import FaqSection from "../components/FaqSection";

export default function PackagesPage({ onSelectPackage }) {
  const { activePackages: packages, contact, imageMap } = useSiteData();
  const [filter, setFilter] = useState("all");
  const [billingCycle, setBillingCycle] = useState("monthly");

  // Recommender Wizard
  const [deviceCount, setDeviceCount] = useState("4-6");
  const [usageType, setUsageType] = useState("streaming");

  // Router Addon Calculator
  const [includeRouter, setIncludeRouter] = useState(true);
  const [includeOnu, setIncludeOnu] = useState(true);

  const filtered = packages.filter((pkg) => {
    if (filter === "home") return pkg.category === "home";
    if (filter === "pro") return pkg.category === "pro";
    return true;
  });

  // Recommender Logic
  const getRecommendedPkg = () => {
    if (!packages.length) return null;
    if (usageType === "gaming" || deviceCount === "7+") return packages[5] || packages[0];
    if (usageType === "streaming" && deviceCount === "4-6") return packages[2] || packages[0];
    if (deviceCount === "1-3") return packages[0];
    return packages[3] || packages[0];
  };
  const recommended = getRecommendedPkg();

  return (
    <div className="py-8 sm:py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white min-h-screen relative overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-96 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 pt-2 sm:pt-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-cyan-300 border border-blue-500/30 mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            আল্ট্রা-হাইস্পিড ফাইবার প্যাকেজসমূহ
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            আপনার জীবন ও কাজের জন্য <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">সেরা ব্রডব্যান্ড</span> প্যাকেজ
          </h1>
          <p className="mt-3 text-slate-300 text-xs sm:text-base font-light leading-relaxed">
            ৫০ Mbps থেকে ৩০০ Mbps পর্যন্ত নিরবচ্ছিন্ন অপটিক্যাল ফাইবার, রিয়েল BDIX ও 1:8 কন্টেনশন রেশিও
          </p>

          {/* Monthly vs Yearly Switcher */}
          <div className="mt-6 inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                billingCycle === "monthly" 
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              মাসিক বিলিং
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly" 
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              বাৎসরিক বিলিং <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.5 rounded-full font-black">১০% ছাড়</span>
            </button>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {[
              { id: "all", label: "সব প্যাকেজ (৭টি)" },
              { id: "home", label: "হোম ও ফ্যামিলি" },
              { id: "pro", label: "গেমিং ও এন্টারপ্রাইজ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  filter === tab.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Interactive Smart Package Recommender */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-20 p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-950/80 via-slate-900/95 to-indigo-950/80 border border-blue-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 relative z-10">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-cyan-400" />
                স্মার্ট প্যাকেজ ক্যালকুলেটর
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                আপনার কয়টি ডিভাইস বা কেমন ব্যবহার?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light">
                নিচের অপশনগুলো সিলেক্ট করুন, আমাদের স্মার্ট অ্যালগরিদম আপনাকে সবচেয়ে উপযুক্ত প্যাকেজ সাজেস্ট করবে।
              </p>

              {/* Step 1: Device Count */}
              <div className="space-y-2 pt-2 text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">১. কতজন মানুষ বা ডিভাইস ব্যবহার করবেন?</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "1-3", label: "১-৩ টি ডিভাইস" },
                    { id: "4-6", label: "৪-৬ টি ডিভাইস" },
                    { id: "7+", label: "৭+ ডিভাইস / অফিস" },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDeviceCount(d.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition text-center ${
                        deviceCount === d.id
                          ? "bg-blue-600 border-blue-400 text-white shadow-md shadow-blue-500/30"
                          : "bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Usage Profile */}
              <div className="space-y-2 pt-2 text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">২. আপনার প্রধান ব্যবহার কি?</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "browsing", label: "📰 ব্রাউজিং ও সোশ্যাল মিডিয়া" },
                    { id: "streaming", label: "📺 4K ইউটিউব ও মুভি" },
                    { id: "gaming", label: "🎮 আল্ট্রা-লো পিং গেমিং" },
                    { id: "office", label: "💼 রিমোট জব / ফ্রিল্যান্সিং" },
                  ].map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setUsageType(u.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition text-left ${
                        usageType === u.id
                          ? "bg-cyan-600 border-cyan-400 text-white shadow-md shadow-cyan-500/30"
                          : "bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="w-full lg:w-80 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-blue-900/60 to-slate-900 border-2 border-cyan-400 shadow-2xl text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-500/30 inline-block mb-3">
                  ✨ আপনার জন্য সেরা সুপারিশ
                </span>
                <h3 className="text-2xl font-black text-white">{recommended.name}</h3>
                <div className="my-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-3xl font-black text-cyan-400">{recommended.speed}</span>
                  <span className="text-xs font-bold text-slate-400 ml-1">Mbps Fiber</span>
                </div>
                <div className="text-2xl font-black text-white">
                  ৳{billingCycle === "yearly" ? Math.round(recommended.price * 0.9) : recommended.price}
                  <span className="text-xs text-slate-400 font-normal"> / মাস</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-2 font-light">
                  {deviceCount} ডিভাইসে বাফারহীন 4K স্ট্রিমিং ও দ্রুত ফাইল আদান-প্রদান নিশ্চিত করবে।
                </p>
              </div>

              <button
                onClick={() => onSelectPackage(recommended)}
                className="mt-4 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition"
              >
                এই প্যাকেজটি সিলেক্ট করুন
              </button>
            </div>
          </div>
        </motion.div>

        {/* 7 All Packages Grid - Fully Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {filtered.map((pkg, idx) => {
            const calculatedPrice = billingCycle === "yearly" ? Math.round(pkg.price * 0.9) : pkg.price;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                whileHover={{ y: -8 }}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 border ${
                  pkg.featured
                    ? "bg-gradient-to-b from-slate-900 via-blue-950/40 to-slate-900 border-cyan-400 shadow-2xl shadow-cyan-500/15"
                    : "bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-xl"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-white">{pkg.name}</h3>
                      <span className="text-[11px] text-slate-400 font-medium">{pkg.category === "home" ? "Home Broadband" : "Pro & Gaming"}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Speed Box */}
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${pkg.accentColor} text-white text-center shadow-lg my-4`}>
                    <div className="text-4xl font-black">{pkg.speed}</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-white/90">{pkg.speedUnit} High-Speed Fiber</div>
                  </div>

                  {/* Price */}
                  <div className="text-center my-4 pb-4 border-b border-slate-800">
                    <span className="text-xs text-slate-400 font-bold">TK</span>
                    <span className="text-4xl font-black text-white mx-1">{calculatedPrice}</span>
                    <span className="text-xs text-slate-400 font-semibold">/ মাস</span>
                    {billingCycle === "yearly" && (
                      <span className="block text-[10px] text-amber-400 font-bold mt-1">বাৎসরিক ১০% সাশ্রয়ী অফার</span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition shadow-md cursor-pointer ${
                    pkg.featured
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black"
                      : "bg-slate-800 hover:bg-blue-600 text-white"
                  }`}
                >
                  সংযোগের আবেদন করুন
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Device Add-on Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 shadow-xl mb-16"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                আপনার কি নতুন গিগাবিট রাউটার বা ONU প্রয়োজন?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                আপনার কাছে পূর্ববর্তী রাউটার থাকলে বাড়তি কোনো ডিভাইস কেনা লাগবে না। নতুন গ্রাহক হিসেবে মানসম্মত ডিভাইস সিলেক্ট করে তাৎক্ষণিক খরচ হিসাব করুন।
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-4 pt-2 justify-center lg:justify-start">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300 bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700">
                  <input
                    type="checkbox"
                    checked={includeRouter}
                    onChange={(e) => setIncludeRouter(e.target.checked)}
                    className="rounded text-cyan-500 focus:ring-cyan-400 cursor-pointer"
                  />
                  Dual-Band AC1200 Router (+৳২,৪৫০)
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300 bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700">
                  <input
                    type="checkbox"
                    checked={includeOnu}
                    onChange={(e) => setIncludeOnu(e.target.checked)}
                    className="rounded text-cyan-500 focus:ring-cyan-400 cursor-pointer"
                  />
                  Optical GPON/EPON ONU (+৳১,১৫০)
                </label>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center w-full sm:w-auto min-w-[240px]">
              <span className="text-[11px] font-bold text-slate-400">ডিভাইস বাবদ আনুমানিক খরচ</span>
              <div className="text-3xl font-black text-emerald-400 my-1.5">
                ৳{(includeRouter ? 2450 : 0) + (includeOnu ? 1150 : 0)}
              </div>
              <span className="text-[10px] text-slate-500 block">ইনস্টলেশন ও ফাইবার অপটিক ড্রপ ক্যাবল অন্তর্ভুক্ত</span>
            </div>
          </div>
        </motion.div>

        {/* Feature Comparison Matrix Table - Mobile Scrollable */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-800 p-5 sm:p-8 shadow-2xl mb-16 overflow-hidden"
        >
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h3 className="text-xl sm:text-3xl font-black text-white mb-1.5">
              প্যাকেজ ফিচার তুলনা ও কারিগরি বিবরণ
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              সমস্ত প্যাকেজে সমমানের আন্তর্জাতিক আপস্ট্রিম, BDIX ও আল্ট্রা-লো পিং গেমিং অপটিমাইজেশন অন্তর্ভুক্ত
            </p>
          </div>

          {/* Swipe Hint for Mobile */}
          <div className="sm:hidden text-center text-[11px] text-cyan-400 font-semibold mb-3 flex items-center justify-center gap-1.5 bg-blue-950/60 py-1.5 px-3 rounded-lg border border-blue-800/40">
            <span>👈</span> সম্পূর্ণ টেবিল দেখতে ডানে-বামে স্ক্রোল করুন <span>👉</span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 min-w-[580px]">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3 sm:p-4">প্যাকেজ</th>
                  <th className="p-3 sm:p-4">গতি</th>
                  <th className="p-3 sm:p-4">মূল্য</th>
                  <th className="p-3 sm:p-4">BDIX কানেক্টিভিটি</th>
                  <th className="p-3 sm:p-4">ইউটিউব/FB</th>
                  <th className="p-3 sm:p-4">IPv6 পাবলিক আইপি</th>
                  <th className="p-3 sm:p-4">কন্টেনশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {packages.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/50 transition">
                    <td className="p-3 sm:p-4 font-bold text-cyan-400">{p.name}</td>
                    <td className="p-3 sm:p-4 font-bold text-white">{p.speed} Mbps</td>
                    <td className="p-3 sm:p-4 font-extrabold text-amber-400">৳{p.price}</td>
                    <td className="p-3 sm:p-4 text-emerald-400 font-semibold">10 Gbps আনলিমিটেড</td>
                    <td className="p-3 sm:p-4">4K বাফারলেস</td>
                    <td className="p-3 sm:p-4 text-cyan-300">অন্তর্ভুক্ত</td>
                    <td className="p-3 sm:p-4 font-mono font-bold">1:8</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <FaqSection />
      </div>
    </div>
  );
}
