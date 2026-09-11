import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Headphones, ArrowRight, Award } from "lucide-react";
import { heroSlides } from "../data/ispData";
import { useSiteData } from "../context/SiteDataContext";

export default function HeroSlider({ onOpenConnectionModal }) {
  const { imageMap } = useSiteData();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  };

  const slide = heroSlides[current];
  const theme = slide.theme;

  const currentDynamicImage = (
    current === 0
      ? imageMap["home_slide1"]?.currentUrl
      : current === 1
      ? imageMap["home_slide2"]?.currentUrl
      : current === 2
      ? imageMap["home_slide3"]?.currentUrl
      : imageMap["home_slide4"]?.currentUrl
  ) || slide.bannerImg;

  const handleCtaClick = () => {
    if (slide.ctaAction === "order") {
      onOpenConnectionModal();
    } else if (slide.ctaLink) {
      navigate(slide.ctaLink);
    }
  };

  return (
    <section className="relative bg-slate-950 overflow-hidden">
      {/* Slider Container with Mobile Safe Height */}
      <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 flex items-center"
          >
            {/* Background visual image with subtle Ken-Burns zoom */}
            <div className="absolute inset-0 bg-slate-950 overflow-hidden">
              <motion.img
                src={currentDynamicImage}
                alt={slide.title}
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 6.5, ease: "easeOut" }}
                className="w-full h-full object-cover object-center opacity-40 sm:opacity-50 lg:opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>
              <div className={`absolute -left-20 top-0 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] ${theme.glowBg} rounded-full blur-[100px] sm:blur-[140px] pointer-events-none transition-all duration-700`}></div>
            </div>

            {/* Slide Content with Staggered Entrance */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-white w-full">
              <div className="max-w-2xl space-y-4 sm:space-y-6">
                {/* Dynamic Themed Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border backdrop-blur-md shadow-lg transition-all duration-500 ${theme.badgeClass}`}
                >
                  <span className={`w-2 h-2 rounded-full ${theme.badgeDot} animate-ping`}></span>
                  <Award className="w-3.5 h-3.5" />
                  {slide.badge}
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug sm:leading-tight"
                >
                  {slide.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-slate-300 text-xs sm:text-base leading-relaxed font-light line-clamp-3 sm:line-clamp-none"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Dynamic Themed Tagline Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className={`p-3 sm:p-3.5 border-l-4 rounded-r-xl text-xs sm:text-sm font-medium backdrop-blur-md shadow-md transition-all duration-500 ${theme.taglineClass}`}
                >
                  ⚡ {slide.tagline}
                </motion.div>

                {/* Dynamic Themed Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-2 sm:pt-3"
                >
                  {/* Primary CTA */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCtaClick}
                    className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r ${theme.btnGradient} text-white font-black rounded-xl sm:rounded-2xl shadow-xl ${theme.btnShadow} flex items-center justify-center gap-2 transition-all duration-500 text-xs sm:text-base cursor-pointer`}
                  >
                    {slide.ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  {/* Secondary Link Button */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      to="/packages"
                      className={`w-full sm:w-auto text-center inline-block px-6 sm:px-7 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 border ${theme.secondaryBorder} rounded-xl sm:rounded-2xl transition-all duration-300 backdrop-blur-md text-xs sm:text-base font-bold cursor-pointer`}
                    >
                      প্যাকেজ রেট দেখুন
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Arrows - Hidden on small mobile to avoid blocking content */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.85)" }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 z-20 p-3 rounded-full bg-black/50 text-white border border-white/20 transition backdrop-blur-md cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.85)" }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 z-20 p-3 rounded-full bg-black/50 text-white border border-white/20 transition backdrop-blur-md cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Dynamic Themed Slide Indicators / Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                i === current ? s.theme.dotActive : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Feature Strip under Banner */}
      <div className="bg-slate-900 border-t border-slate-800 py-5 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-white">
          <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl">
            <div className="p-2.5 sm:p-3 rounded-xl bg-blue-500/20 text-cyan-400 border border-blue-500/30 shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold">Highest Speed</h4>
              <p className="text-[10px] sm:text-xs text-slate-400">দ্রুত ফাইবার</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl">
            <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold">99.9% Uptime</h4>
              <p className="text-[10px] sm:text-xs text-slate-400">নিরবচ্ছিন্ন সংযোগ</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl">
            <div className="p-2.5 sm:p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold">10G BDIX</h4>
              <p className="text-[10px] sm:text-xs text-slate-400">বাফারহীন স্ট্রিমিং</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl">
            <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold">24/7 Support</h4>
              <p className="text-[10px] sm:text-xs text-slate-400">সর্বদা আপনার পাশে</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
