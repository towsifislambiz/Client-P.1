import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Wifi, ShieldCheck, Zap, Headphones, Tv } from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import PackagesSlider from "../components/PackagesSlider";
import FaqSection from "../components/FaqSection";
import { useSiteData } from "../context/SiteDataContext";

export default function HomePage({ onOpenConnectionModal, onSelectPackage }) {
  const { imageMap } = useSiteData();
  return (
    <div>
      {/* 1. Dynamic Hero Carousel */}
      <HeroSlider onOpenConnectionModal={onOpenConnectionModal} />

      {/* 2. Key Why Choose Us Features */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
          >
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
              কেন Link BD সেরা?
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-2.5 tracking-tight">
              আপসহীন স্পিড ও আধুনিক ফাইবার প্রযুক্তি
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { title: "10 Gbps BDIX স্পিড", desc: "ইউটিউব, ফেসবুক, নেটফ্লিক্স ও লোকাল সার্ভার থেকে পাবেন বাফারলেস 4K স্ট্রিমিং অভিজ্ঞতা।", icon: Zap, color: "bg-blue-600 text-white" },
              { title: "৯৯.৯% আপটাইম SLA", desc: "ডুয়াল ফাইবার রিং ও অপটিক্যাল ব্যাকবোন ব্যাকআপ থাকায় সংযোগ ড্রপ হওয়ার কোনো সুযোগ নেই।", icon: ShieldCheck, color: "bg-emerald-600 text-white" },
              { title: "ফ্রি লাইভ টিভি ও FTP", desc: "১৫০+ লাইভ চ্যানেল এবং ১০,০০০+ মুভি ও ওয়েব সিরিজ সম্পূর্ণ ফ্রিতে উপভোগ করার সুযোগ।", icon: Tv, color: "bg-purple-600 text-white" },
              { title: "২৪/৭ ডেডিকেটেড কেয়ার", desc: "হটলাইন, হোয়াটসঅ্যাপ ও অন-সাইট টেকনিশিয়ান সাপোর্ট সর্বদা প্রস্তুত আপনার সহায়তায়।", icon: Headphones, color: "bg-amber-500 text-white" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all hover:shadow-xl shadow-sm"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${f.color} flex items-center justify-center mb-4 sm:mb-5 shadow-lg`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Packages Slider */}
      <PackagesSlider onSelectPackage={onSelectPackage} />

      {/* 4. Coverage Teaser Banner */}
      <section className="py-14 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800">
                সারাদেশব্যাপী কাভারেজ
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug sm:leading-tight">
                আপনার এলাকায় কি Link BD নেটওয়ার্ক রয়েছে?
              </h2>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-light">
                উত্তরা ঢাকা, মধুখালী ফরিদপুর, কুষ্টিয়া সদর সহ দেশের বিভিন্ন গুরুত্বপূর্ণ জেলায় আমাদের অপটিক্যাল ফাইবার লাইন সক্রিয়। এক ক্লিকে আপনার এলাকা সার্চ করে স্ট্যাটাস চেক করুন।
              </p>
              <div className="pt-2">
                <Link
                  to="/coverage"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl transition shadow-xl shadow-cyan-500/20"
                >
                  কাভারেজ এরিয়া চেক করুন
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src={imageMap?.["coverage_banner"]?.currentUrl || "/assets/banner-coverage.png"}
                  alt="Coverage Map"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/banner-coverage.png";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <FaqSection />
    </div>
  );
}
