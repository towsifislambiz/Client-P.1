import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, CheckCircle2, Wifi, PhoneCall, Radio, ShieldCheck, Zap, Globe, Headphones, ExternalLink } from "lucide-react";
import { coverageAreas, coverageFeatures, companyInfo } from "../data/ispData";
import { useSiteData } from "../context/SiteDataContext";

export default function CoveragePage({ onOpenConnectionModal }) {
  const { contact } = useSiteData();
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const q = query.toLowerCase().trim();
    let found = null;

    for (const item of coverageAreas) {
      if (
        item.district.toLowerCase().includes(q) ||
        item.division.toLowerCase().includes(q) ||
        item.hubName.toLowerCase().includes(q) ||
        item.hubTitle.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.areas.some((a) => a.toLowerCase().includes(q))
      ) {
        found = item;
        break;
      }
    }

    if (found) {
      setSearchResult({
        status: "available",
        hub: found,
        message: `অভিনন্দন! আপনার কাঙ্ক্ষিত এলাকায় Link BD অপটিক্যাল ফাইবার সরাসরি সক্রিয় রয়েছে।`
      });
    } else {
      setSearchResult({
        status: "expansion",
        query: query,
        message: `Link BD সারা বাংলাদেশে হাই-স্পিড অপটিক্যাল ফাইবার নেটওয়ার্ক দ্রুত সম্প্রসারণ করছে!`
      });
    }
  };

  const getPillarIcon = (idx) => {
    switch (idx) {
      case 0: return <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />;
      case 1: return <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />;
      case 2: return <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />;
      case 3: return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />;
      default: return <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />;
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-950 text-white min-h-screen relative overflow-hidden">
      {/* Background Ambience Glows */}
      <div className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-600/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-96 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-600/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-16 pt-2 sm:pt-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              সারা বাংলাদেশ জুড়ে আমাদের NETWORK
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-snug sm:leading-tight">
              বাংলাদেশের সব জেলা-শহরে আমাদের নেটওয়ার্ক — <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">দ্রুত সংযোগ, সবার জন্য</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-base font-light leading-relaxed">
              এক নেটওয়ার্কে সারা বাংলাদেশ। কাজ হোক, পড়াশোনা হোক, বিনোদন হোক — সবকিছু এখন আরও সহজ ও নিরবচ্ছিন্ন Link BD হাই-স্পিড অপটিক্যাল ফাইবারে!
            </p>

            {/* Quick Stats Strip - Compact & Responsive on Mobile */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-lg sm:text-3xl font-black text-emerald-400">১০০%</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">পিওর ফাইবার</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-lg sm:text-3xl font-black text-cyan-400">১০ Gbps</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">BDIX ব্যাকবোন</div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-lg sm:text-3xl font-black text-amber-400">২৪/৭</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">মনিটরিং</div>
              </div>
            </div>
          </motion.div>

          {/* Animated High-Tech Live Pulse Radar - Scaled for Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center py-2"
          >
            <div className="relative w-48 h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border border-emerald-500/30 flex items-center justify-center bg-slate-900/70 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.18)]">
              {/* Concentric rings */}
              <div className="absolute w-3/4 h-3/4 rounded-full border border-emerald-500/20"></div>
              <div className="absolute w-1/2 h-1/2 rounded-full border border-emerald-500/30"></div>
              <div className="absolute w-1/4 h-1/4 rounded-full border border-emerald-500/40"></div>

              {/* Rotating Radar Sweep */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 via-transparent to-transparent"
                style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 50%)" }}
              />

              {/* Glowing Center Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-400 shadow-[0_0_20px_#34d399] animate-ping"></div>
                <span className="text-[11px] sm:text-xs font-black text-emerald-300 mt-2">Link BD Active</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400">Optical Grid</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Live Search Engine Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="আপনার জেলা বা এলাকার নাম (যেমন: Uttara, Kushtia)..."
                className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-xs sm:text-sm shadow-xl"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-xl shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              কাভারেজ খুঁজুন
            </button>
          </form>

          {/* Search Result Display */}
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5"
            >
              {searchResult.status === "available" ? (
                <div className="bg-emerald-950/80 border border-emerald-500/40 p-5 sm:p-7 rounded-2xl shadow-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {searchResult.hub.badge}
                        </span>
                        <h4 className="font-extrabold text-emerald-300 text-base sm:text-xl mt-1">
                          {searchResult.message}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1">
                          হাব ঠিকানা: <strong>{searchResult.hub.address}</strong>
                        </p>
                        <p className="text-xs text-emerald-400 font-medium mt-1">
                          হটলাইন: {searchResult.hub.phone}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenConnectionModal()}
                      className="w-full sm:w-auto px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl whitespace-nowrap shadow-lg transition cursor-pointer text-center"
                    >
                      নতুন সংযোগের আবেদন করুন
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-950/80 border border-blue-500/40 p-5 sm:p-7 rounded-2xl shadow-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <Wifi className="w-7 h-7 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-900/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                          Nationwide Network
                        </span>
                        <h4 className="font-extrabold text-cyan-300 text-base sm:text-lg mt-1">
                          {searchResult.message}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1">
                          "{searchResult.query}" এলাকায় অপটিক্যাল ফাইবার সংযোগের জন্য এখনই প্রি-বুকিং করে রাখুন।
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
                      <button
                        onClick={() => onOpenConnectionModal()}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer text-center"
                      >
                        প্রি-বুকিং আবেদন
                      </button>
                      <a
                        href={`tel:${contact?.mainHotline || companyInfo.hotline1}`}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 text-center"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        হটলাইন
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Client Official Coverage Banner Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mb-14 sm:mb-20 bg-slate-900"
        >
          <img
            src="/assets/banner-coverage.png"
            alt="Link BD Coverage Network Map"
            className="w-full h-auto object-cover max-h-[440px]"
          />
        </motion.div>

        {/* 5 Core Pillars from Client Banner */}
        <div className="mb-14 sm:mb-20">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-cyan-300 border border-blue-500/30 mb-2.5">
              <Radio className="w-3 h-3 text-cyan-400" />
              এক নেটওয়ার্কে সারা বাংলাদেশ
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Link BD ফাইবার নেটওয়ার্কের মূল বৈশিষ্ঠ্যসমূহ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
              সারা বাংলাদেশ জুড়ে আমাদের আধুনিক অপটিক্যাল ফাইবার নেটওয়ার্কের শীর্ষ ৫টি সেবা নিশ্চয়তা
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coverageFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-800 border border-slate-700/60 shadow-inner">
                      {getPillarIcon(idx)}
                    </div>
                    <span className="text-xs font-black text-cyan-400 tracking-wider">
                      {feat.num}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
                <div className="pt-3.5 mt-3.5 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  সারাদেশে সক্রিয়
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Operational Hubs Section */}
        <div className="mb-14 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              সক্রিয় হাব ও অপারেশনাল সেন্টার
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
              ক্লায়েন্ট ডকুমেন্টে উল্লেখিত আমাদের অফিসিয়াল ফাইবার হাব ও সাপোর্ট লোকেশন সমূহ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {coverageAreas.map((hub, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                      {hub.badge}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {hub.status}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2">
                    {hub.hubName}
                  </h3>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-4 space-y-1.5 text-xs">
                    <div className="flex items-start gap-2 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{hub.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
                      <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                      <span>হটলাইন: {hub.phone}</span>
                    </div>
                  </div>

                  {hub.wazeLink && (
                    <a
                      href={hub.wazeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 mb-4 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Waze ম্যাপে সঠিক লোকেশন দেখুন
                    </a>
                  )}
                </div>

                <div className="pt-3.5 border-t border-slate-800 flex gap-2">
                  <button
                    onClick={() => onOpenConnectionModal()}
                    className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md text-center"
                  >
                    নতুন সংযোগ নিন
                  </button>
                  <a
                    href={`tel:${hub.phone ? hub.phone.split(",")[0].trim() : (contact?.mainHotline || companyInfo.hotline1)}`}
                    className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs rounded-xl transition flex items-center justify-center"
                    title="সরাসরি কল করুন"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
