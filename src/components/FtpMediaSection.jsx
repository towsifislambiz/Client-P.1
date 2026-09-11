import React from "react";
import { Tv, Film, Play, Download, Server, Sparkles, Gamepad2, Radio } from "lucide-react";

export default function FtpMediaSection() {
  const mediaCategories = [
    { name: "Live TV (১৫০+ চ্যানেল)", icon: Tv, count: "HD & 4K Stream", color: "from-blue-600 to-cyan-500" },
    { name: "মুভি ও নাটক", icon: Film, count: "১০,০০০+ কালেকশন", color: "from-purple-600 to-indigo-600" },
    { name: "লাইভ স্পোর্টস", icon: Radio, count: "ক্রিকেট ও ফুটবল HD", color: "from-emerald-600 to-teal-500" },
    { name: "ওয়েব সিরিজ ও এনিমেশন", icon: Play, count: "লেটেস্ট রিলিজ", color: "from-amber-500 to-orange-600" },
  ];

  return (
    <section id="ftp-tv" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3">
            <Server className="w-3.5 h-3.5 text-purple-400" />
            BDIX আল্ট্রা-স্পিড বিনোদন
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            FTP & Live TV Server — সব বিনোদন এক ঠিকানায়
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Link BD ইউজারদের জন্য সম্পূর্ণ বিনামূল্যে আল্ট্রা-ফাস্ট 10 Gbps BDIX স্পিডে মুভি, নাটক, লাইভ টিভি ও স্পোর্টস
          </p>
        </div>

        {/* Visual Banner Preview */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
          <img
            src="/assets/banner-ftptv.png"
            alt="FTP and Live TV Server"
            className="w-full h-auto object-cover max-h-[460px]"
          />
        </div>

        {/* Media Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mediaCategories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 shadow-lg flex items-center gap-4"
              >
                <div className={`p-3.5 rounded-xl bg-gradient-to-br ${cat.color} text-white shrink-0 shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{cat.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{cat.count}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Server Access CTA */}
        <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-slate-900 border border-blue-500/30 rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-2">
            Link BD ব্রডব্যান্ড নেটওয়ার্ক থেকে সরাসরি ভিজিট করুন
          </h3>
          <p className="text-sm text-slate-300 mb-6">
            আমাদের অপটিক্যাল ফাইবার সংযোগের সাথে কানেক্টেড থাকলে কোনো বাফারিং ছাড়াই সর্বোচ্চ গতিতে কন্টেন্ট স্ট্রিম করুন।
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="http://ftp.linkbd.net"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              BDIX FTP সার্ভার ওপেন করুন
            </a>
            <a
              href="http://tv.linkbd.net"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl transition flex items-center gap-2"
            >
              <Tv className="w-4 h-4" />
              লাইভ টিভি চ্যানেল পোর্টাল
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
