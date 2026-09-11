import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tv, Film, Play, Download, Server, PlayCircle, ShieldCheck, 
  ExternalLink, Copy, Check, Search, Zap, Globe, Sparkles, 
  HelpCircle, ArrowRight, Layers, PhoneCall
} from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import { defaultServers } from "../data/ispData";

export default function FtpTvPage() {
  const { imageMap, servers, activeServers, contact } = useSiteData();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const displayServers = (servers && servers.length > 0 ? servers : defaultServers).filter(
    (s) => s.isActive !== false
  );

  const filteredServers = displayServers.filter((s) => {
    const matchesFilter =
      activeFilter === "all" ? true : activeFilter === "ftp" ? s.type !== "tv" : s.type === "tv";
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      s.name?.toLowerCase().includes(q) ||
      s.ip?.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const tvChannels = [
    { name: "T Sports HD", category: "Sports", icon: "🏏", res: "1080p 60fps" },
    { name: "Star Sports 1 HD", category: "Sports", icon: "⚽", res: "1080p 60fps" },
    { name: "Sony Sports Ten 1", category: "Sports", icon: "🥊", res: "1080p HD" },
    { name: "Somoy TV HD", category: "News", icon: "📰", res: "1080p HD" },
    { name: "Jamuna TV", category: "News", icon: "📺", res: "1080p HD" },
    { name: "Zee Cinema HD", category: "Movies", icon: "🎬", res: "1080p HD" },
    { name: "Star Gold HD", category: "Movies", icon: "🎥", res: "1080p HD" },
    { name: "Discovery HD", category: "Infotainment", icon: "🌍", res: "1080p HD" },
    { name: "National Geographic", category: "Infotainment", icon: "🦁", res: "1080p HD" },
    { name: "Cartoon Network HD", category: "Kids", icon: "🐱", res: "1080p HD" },
    { name: "Sony Yay", category: "Kids", icon: "🎨", res: "1080p HD" },
    { name: "HBO HD", category: "Hollywood", icon: "🍿", res: "4K UHD" }
  ];

  return (
    <div className="py-8 sm:py-14 bg-slate-950 text-white min-h-screen relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Ambience Glowing Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[800px] h-[350px] bg-gradient-to-b from-purple-600/15 via-blue-600/10 to-transparent blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 -right-40 w-96 h-96 bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 pt-2 sm:pt-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-4 backdrop-blur-md shadow-sm">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            10 Gbps BDIX আল্ট্রা-স্পিড বিনোদন ও লাইভ টিভি নেটওয়ার্ক
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-snug sm:leading-tight">
            Link BD হাই-স্পিড <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              FTP ও লাইভ টিভি সার্ভার
            </span>
          </h1>
          <p className="mt-3.5 text-slate-300 text-xs sm:text-base font-light leading-relaxed">
            Link BD অপটিক্যাল ফাইবার গ্রাহকদের জন্য সম্পূর্ণ বাফারলেস 10 Gbps BDIX স্পিডে আনলিমিটেড ৪K মুভি, নাটক, ওয়েব সিরিজ, সফটওয়্যার ডাউনলোড এবং ১৫০+ লাইভ টিভি চ্যানেল দেখার সেরা ব্যবস্থা।
          </p>
        </motion.div>

        {/* Visual Banner Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
        >
          <img
            src={imageMap["ftptv_banner"]?.currentUrl || "/assets/banner-ftptv.png"}
            alt="FTP and Live TV Server"
            className="w-full h-auto object-cover max-h-[420px]"
            onError={(e) => {
              e.currentTarget.src = "/assets/banner-ftptv.png";
            }}
          />
        </motion.div>

        {/* Server Directory Filter & Search Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-xl">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                সকল সার্ভার ({displayServers.length})
              </button>
              <button
                onClick={() => setActiveFilter("ftp")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeFilter === "ftp"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>BDIX এফটিপি সার্ভার ({displayServers.filter(s => s.type !== "tv").length})</span>
              </button>
              <button
                onClick={() => setActiveFilter("tv")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeFilter === "tv"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>লাইভ টিভি পোর্টাল ({displayServers.filter(s => s.type === "tv").length})</span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="সার্ভারের নাম বা আইপি দিয়ে খুঁজুন..."
                className="w-full px-4 py-2.5 pl-9 rounded-xl bg-slate-950 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Server Cards Grid (Professional ISP Showcase) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-24">
          {filteredServers.map((server, idx) => {
            const isTv = server.type === "tv";
            const isCopied = copiedId === server.id;
            const targetUrl = server.url || `http://${server.ip}`;

            return (
              <motion.div
                key={server.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-3xl bg-slate-900/95 border transition-all duration-300 p-6 sm:p-7 shadow-xl flex flex-col justify-between group hover:shadow-2xl ${
                  isTv
                    ? "border-emerald-500/30 hover:border-emerald-400 hover:shadow-emerald-950/30"
                    : "border-slate-800 hover:border-blue-500/50 hover:shadow-blue-950/30"
                }`}
              >
                <div>
                  {/* Top Badges Row */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          isTv
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : "bg-blue-500/15 text-cyan-300 border border-blue-500/30"
                        }`}
                      >
                        {isTv ? "Live TV Portal" : "BDIX FTP Server"}
                      </span>
                      {server.badge && (
                        <span className="text-[10px] font-bold text-purple-300 bg-purple-950/80 border border-purple-800/60 px-2 py-0.5 rounded-md">
                          {server.badge}
                        </span>
                      )}
                    </div>

                    {/* Online Status Dot */}
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Online</span>
                    </div>
                  </div>

                  {/* Server Name & Category */}
                  <div className="mb-3.5">
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {server.name}
                    </h3>
                    <span className="inline-block mt-1 text-[11px] font-bold text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2.5 py-0.5 rounded-lg">
                      {server.category}
                    </span>
                  </div>

                  {/* IP Address Pill with Fast Copy */}
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 mb-4 flex items-center justify-between gap-2 group/ip">
                    <div className="flex items-center gap-2 min-w-0">
                      <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-mono font-bold text-slate-200 truncate">
                        {server.ip || targetUrl}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(server.id, server.ip || targetUrl)}
                      className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] sm:text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0 border border-slate-700/80"
                      title="আইপি কপি করুন"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">কপি হয়েছে!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>কপি</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed font-light">
                    {server.description || "Link BD হাই-স্পিড অপটিক্যাল ফাইবার নেটওয়ার্কের আওতায় সম্পূর্ণ বাফারলেস BDIX আনলিমিটেড বিনোদন সম্ভার।"}
                  </p>

                  {/* Speed & Protocol Tags */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mb-5 font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-bold">
                      ⚡ {server.speed || "10 Gbps BDIX"}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                      {server.protocol || "HTTP Direct"}
                    </span>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="pt-3 border-t border-slate-800">
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg text-center ${
                      isTv
                        ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-600/20"
                        : "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-600/25"
                    }`}
                  >
                    <span>{isTv ? "📺 লাইভ টিভি চালু করুন" : "🚀 সার্ভার ব্রাউজ করুন"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live TV Channels Lineup Showcase */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800">
              জনপ্রিয় লাইভ টিভি চ্যানেল
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2.5">
              খেলাধুলা, খবর ও সিনেমার ১৫০+ ফুল এইচডি চ্যানেল
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-light">
              Link BD লাইভ টিভি পোর্টালে সম্পূর্ণ স্মুথ ও লো-লেটেন্সিতে উপভোগ করুন পছন্দের চ্যানেলগুলো
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {tvChannels.map((ch, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-emerald-500/50 transition-all shadow-md flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <span className="text-xl sm:text-2xl shrink-0">{ch.icon}</span>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                      {ch.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">{ch.category}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/60 shrink-0 ml-1">
                  {ch.res}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Important BDIX Connection Guidelines & Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-blue-500/25 shadow-xl space-y-6"
        >
          <div className="flex items-center gap-2.5 text-white font-black text-base sm:text-lg">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>BDIX সার্ভার ব্যবহারের গুরুত্বপূর্ণ নিয়মাবলী ও নির্দেশিকা</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
              <span className="font-bold text-cyan-300 text-sm">১. Link BD লাইন আবশ্যক</span>
              <p className="leading-relaxed font-light">
                এই BDIX এফটিপি ও লাইভ টিভি সার্ভারগুলো শুধুমাত্র Link BD ব্রডব্যান্ড নেটওয়ার্কে কানেক্টেড থাকলে ব্রাউজ করা যাবে।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
              <span className="font-bold text-emerald-300 text-sm">২. জিরো ইন্টারনেট খরচ</span>
              <p className="leading-relaxed font-light">
                সার্ভারগুলো ব্রাউজ বা ডাউনলোড করার সময় আপনার মূল ইন্টারনেট কোটা বা ডাটা প্যাক থেকে কোনো ডাটা খরচ হবে না।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
              <span className="font-bold text-purple-300 text-sm">৩. 10 Gbps ফুল স্পিড</span>
              <p className="leading-relaxed font-light">
                প্রতিটি সার্ভার সরাসরি লোকাল অপটিক্যাল ক্যাশে হোস্ট করা, ফলে পাবেন সর্বোচ্চ ৪K বাফারলেস স্ট্রিমিং ও দ্রুত ডাউনলোড।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
              <span className="font-bold text-amber-300 text-sm">৪. ২৪/৭ টেকনিক্যাল সাপোর্ট</span>
              <p className="leading-relaxed font-light">
                সার্ভার ব্রাউজিংয়ে কোনো সমস্যা হলে সরাসরি আমাদের হেল্পলাইনে কল করুন: <a href={`tel:${contact?.mainHotline || "01995648616"}`} className="text-cyan-300 font-bold hover:underline">{contact?.mainHotline || "01995-648616"}</a>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
