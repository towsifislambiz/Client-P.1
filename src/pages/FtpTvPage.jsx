import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tv, Film, Play, Download, Server, PlayCircle, ShieldCheck } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";

export default function FtpTvPage() {
  const { imageMap } = useSiteData();
  const [activeTab, setActiveTab] = useState("tv");

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

  const movies = [
    { title: "Toofan (4K HDR)", genre: "Action / Thriller", size: "6.8 GB", rating: "8.4" },
    { title: "Deadpool & Wolverine", genre: "Action / Sci-Fi", size: "8.2 GB", rating: "8.1" },
    { title: "Dune: Part Two", genre: "Adventure / Sci-Fi", size: "9.5 GB", rating: "8.6" },
    { title: "KGF Chapter 2", genre: "Action / Drama", size: "7.1 GB", rating: "8.3" },
    { title: "Interstellar", genre: "Sci-Fi / Space", size: "11.2 GB", rating: "8.7" },
    { title: "Oppenheimer", genre: "Biography / History", size: "10.4 GB", rating: "8.9" }
  ];

  return (
    <div className="py-8 sm:py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 pt-2 sm:pt-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3 backdrop-blur-md">
            <Server className="w-3.5 h-3.5 text-purple-400" />
            10 Gbps BDIX আল্ট্রা-স্পিড বিনোদন
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-snug sm:leading-tight">
            FTP & Live TV Server — সব বিনোদন এক ঠিকানায়
          </h1>
          <p className="mt-3 text-slate-300 text-xs sm:text-base font-light leading-relaxed">
            Link BD ফাইবার গ্রাহকদের জন্য সম্পূর্ণ বিনামূল্যে আল্ট্রা-ফাস্ট BDIX স্পিডে মুভি, নাটক, লাইভ টিভি ও স্পোর্টস
          </p>
        </motion.div>

        {/* Visual Banner Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
        >
          <img
            src={imageMap["ftptv_banner"]?.currentUrl || "/assets/banner-ftptv.png"}
            alt="FTP and Live TV Server"
            className="w-full h-auto object-cover max-h-[460px]"
            onError={(e) => {
              e.currentTarget.src = "/assets/banner-ftptv.png";
            }}
          />
        </motion.div>

        {/* Interactive Entertainment Tabs */}
        <div className="mb-14 sm:mb-16">
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="flex flex-col sm:inline-flex sm:flex-row w-full sm:w-auto p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl gap-1">
              <button
                onClick={() => setActiveTab("tv")}
                className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer text-center ${
                  activeTab === "tv" ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                📺 ১৫০+ লাইভ টিভি চ্যানেল
              </button>
              <button
                onClick={() => setActiveTab("movies")}
                className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer text-center ${
                  activeTab === "movies" ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                🎬 ৪K মুভি ও নাটক কালেকশন
              </button>
            </div>
          </div>

          {/* Tab 1: Live TV Channels Grid */}
          {activeTab === "tv" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
            >
              {tvChannels.map((ch, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition shadow-lg flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span className="text-xl sm:text-2xl shrink-0">{ch.icon}</span>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition truncate">
                        {ch.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">{ch.category}</span>
                    </div>
                  </div>
                  <PlayCircle className="w-5 h-5 text-cyan-400 opacity-60 group-hover:opacity-100 transition shrink-0 ml-1" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {movies.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white text-base">{m.title}</h4>
                      <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-800">★ {m.rating}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{m.genre} • {m.size}</p>
                  </div>
                  <button className="w-full py-2.5 bg-slate-800 hover:bg-purple-600 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer">
                    <Download className="w-3.5 h-3.5" />
                    BDIX ডিরেক্ট ডাউনলোড
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
