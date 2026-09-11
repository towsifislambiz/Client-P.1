import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, ArrowRight, Flame } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";

export default function PackagesSlider({ onSelectPackage }) {
  const { activePackages: packages } = useSiteData();
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      const card = sliderRef.current.querySelector(".package-proper-card");
      if (card) {
        const cardWidth = card.offsetWidth + 16; // 16px gap on mobile, 24px on desktop
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(packages.length - 1, Math.max(0, index)));
      }
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      checkScroll();
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".package-proper-card");
      const cardWidth = card ? card.offsetWidth + 20 : 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToCard = (index) => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".package-proper-card");
      const cardWidth = card ? card.offsetWidth + 20 : 300;
      sliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-14 sm:py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-14">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-2.5">
              জনপ্রিয় প্যাকেজ
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              সেরা ইন্টারনেট প্ল্যানগুলো দেখুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              আপনার বাসা বা অফিসের জন্য নিখুঁত স্পিড ও সাশ্রয়ী মূল্যের অফার
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition cursor-pointer ${
                  canScrollLeft
                    ? "text-slate-800 hover:bg-blue-600 hover:text-white"
                    : "text-slate-300 cursor-not-allowed opacity-40"
                }`}
                aria-label="Previous Package"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="w-px h-4 bg-slate-200"></div>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition cursor-pointer ${
                  canScrollRight
                    ? "text-slate-800 hover:bg-blue-600 hover:text-white"
                    : "text-slate-300 cursor-not-allowed opacity-40"
                }`}
                aria-label="Next Package"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View All Packages Link */}
            <Link
              to="/packages"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 bg-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md whitespace-nowrap"
            >
              সব প্যাকেজ দেখুন
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scrollable Package Cards Row with Mobile-Optimized Width & Smooth Snap */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-3 px-1"
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="package-proper-card snap-center sm:snap-start shrink-0 w-[84vw] max-w-[310px] sm:w-[300px] md:w-[320px] lg:w-[calc(25%-18px)] bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between select-none"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {pkg.badge}
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-white text-center my-4 sm:my-5 shadow-md shadow-blue-500/20">
                  <div className="font-black text-2xl sm:text-3xl">{pkg.speed}/{pkg.speedUnit}</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/90 mt-0.5">High-Speed Internet</div>
                </div>

                <div className="text-center mb-4 sm:mb-5">
                  <span className="text-xs text-slate-400 font-bold">TK</span>
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 mx-1">{pkg.price}</span>
                  <span className="text-xs text-slate-500 font-semibold">/ মাস</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 mb-5 sm:mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    Optical Fiber Connection
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    High speed BDIX & CDN
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    4K Bufferless Stream
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    1:8 Contention Ratio
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPackage(pkg)}
                className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition shadow cursor-pointer active:scale-98"
              >
                সংযোগ নিন
              </button>
            </div>
          ))}
        </div>

        {/* Clean Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
          {packages.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-7 sm:w-8 bg-blue-600 shadow-md shadow-blue-500/40"
                  : "w-2 sm:w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to package ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
