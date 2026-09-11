import React, { useState } from "react";
import { MapPin, Search, CheckCircle2, PhoneCall, Wifi, ExternalLink } from "lucide-react";
import { coverageAreas, companyInfo } from "../data/ispData";
import { useSiteData } from "../context/SiteDataContext";

export default function CoverageChecker({ onOpenConnectionModal }) {
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
        message: `অভিনন্দন! আপনার এলাকায় Link BD ফাইবার লাইন সরাসরি সক্রিয়!`
      });
    } else {
      setSearchResult({
        status: "expansion",
        query: query,
        message: `Link BD সারা বাংলাদেশ জুড়ে ফাইবার নেটওয়ার্ক দ্রুত সম্প্রসারণ করছে!`
      });
    }
  };

  return (
    <section id="coverage" className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img src="/assets/banner-coverage.png" alt="Coverage" className="w-full h-full object-cover" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2.5">
            <MapPin className="w-3 h-3 text-emerald-400" />
            সারা বাংলাদেশ জুড়ে আমাদের NETWORK
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight">
            বাংলাদেশের সব জেলা-শহরে আমাদের নেটওয়ার্ক — <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">দ্রুত সংযোগ, সবার জন্য</span>
          </h2>
          <p className="mt-2 text-slate-300 text-xs sm:text-base font-light">
            এক নেটওয়ার্কে সারা বাংলাদেশ। আপনার এলাকায় Link BD হাই-স্পিড অপটিক্যাল ফাইবার কাভারেজ এখনই চেক করুন।
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-12">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="আপনার জেলা, থানা বা এলাকার নাম লিখুন..."
                className="w-full pl-10 pr-4 py-3 sm:py-4 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-xs sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              কাভারেজ খুঁজুন
            </button>
          </form>

          {/* Search Result Box */}
          {searchResult && (
            <div className="mt-4 p-4 sm:p-5 rounded-2xl border border-slate-700/80 animate-fadeIn">
              {searchResult.status === "available" ? (
                <div className="bg-emerald-950/70 border border-emerald-500/40 p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-300 text-base sm:text-lg">
                        {searchResult.message}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        হাব ঠিকানা: {searchResult.hub.address}
                      </p>
                      <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                        হটলাইন: {searchResult.hub.phone}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenConnectionModal()}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg whitespace-nowrap shadow transition cursor-pointer text-center"
                  >
                    সংযোগের আবেদন করুন
                  </button>
                </div>
              ) : (
                <div className="bg-blue-950/70 border border-blue-500/40 p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Wifi className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-cyan-300 text-sm sm:text-base">
                        {searchResult.message}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        "{searchResult.query}" এলাকায় ফাইবার লাইন পৌঁছানোর সাথে সাথে লাইন নিতে এখনই প্রি-বুকিং করুন।
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => onOpenConnectionModal()}
                      className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold rounded-lg shadow transition cursor-pointer text-center"
                    >
                      প্রি-বুকিং
                    </button>
                    <a
                      href={`tel:${contact?.mainHotline || companyInfo.hotline1}`}
                      className="flex-1 sm:flex-none px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-lg border border-slate-600 flex items-center justify-center gap-1.5 text-center"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      হটলাইন
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Coverage Banner Display */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 mb-8 sm:mb-12">
          <img
            src="/assets/banner-coverage.png"
            alt="Link BD Coverage Map"
            className="w-full h-auto object-cover max-h-[420px]"
          />
        </div>

        {/* Active Hubs Quick Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {coverageAreas.map((hub, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-cyan-300 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">
                    {hub.badge}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    {hub.status}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">{hub.hubName}</h4>
                <p className="text-xs text-slate-300 mb-2 leading-relaxed">{hub.address}</p>
                <p className="text-xs font-semibold text-emerald-400">হটলাইন: {hub.phone}</p>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <button
                  onClick={() => onOpenConnectionModal()}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                >
                  লাইন আবেদন করুন →
                </button>
                {hub.wazeLink && (
                  <a
                    href={hub.wazeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Waze
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
