import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";

export default function Footer({ onOpenConnectionModal }) {
  const { branding, contact, activePackages } = useSiteData();
  const location = useLocation();

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 sm:pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link to="/" onClick={handleHomeClick} className="inline-block cursor-pointer" title="Link BD - উপরে উঠুন">
              <img
                src={branding.footerLogo || "/assets/logo-footer.png"}
                alt="Link BD"
                className="h-10 sm:h-12 object-contain transition-transform hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/assets/logo-footer.png";
                }}
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              {contact.companyName} — {contact.slogan || "Connect to The World"}! সারা বাংলাদেশ জুড়ে নির্ভরযোগ্য অপটিক্যাল ফাইবার ব্রডব্যান্ড ও ডেডিকেটেড ইন্টারনেট সেবা প্রদানকারী।
            </p>
            <div className="pt-1 text-xs space-y-1 text-slate-300">
              <p><strong>Hotlines:</strong> {contact.mainHotline}, {contact.supportHotline}</p>
              <p><strong>Support Email:</strong> {contact.mainEmail}</p>
              <p><strong>Official Web:</strong> {contact.website}</p>
            </div>
          </div>

          {/* Col 2: Separate Pages Links */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <h4 className="text-white font-bold text-sm tracking-wide">সকল পেইজ</h4>
            <ul className="space-y-1.5">
              <li><Link to="/" onClick={handleHomeClick} className="hover:text-cyan-400 transition cursor-pointer py-0.5 inline-block">হোম পেইজ</Link></li>
              <li><Link to="/packages" className="hover:text-cyan-400 transition cursor-pointer py-0.5 inline-block">প্যাকেজ সমূহ</Link></li>
              <li><Link to="/coverage" className="hover:text-cyan-400 transition cursor-pointer py-0.5 inline-block">কাভারেজ এরিয়া</Link></li>
              <li><Link to="/bill-pay" className="hover:text-cyan-400 transition cursor-pointer py-0.5 inline-block">বিল পরিশোধ</Link></li>
              <li><Link to="/ftp-tv" className="hover:text-cyan-400 transition cursor-pointer py-0.5 inline-block">এফটিপি ও টিভি</Link></li>
              <li><Link to="/clients" className="hover:text-cyan-400 transition cursor-pointer py-0.5 inline-block">ক্লায়েন্টবৃন্দ</Link></li>
              <li><Link to="/offices" className="hover:text-cyan-400 transition cursor-pointer py-0.5 inline-block">আমাদের অফিস</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition cursor-pointer py-0.5 inline-block">যোগাযোগ</Link></li>
              <li><Link to="/admin" className="text-slate-500 hover:text-cyan-400 transition cursor-pointer py-0.5 inline-block">অ্যাডমিন পোর্টাল</Link></li>
            </ul>
          </div>

          {/* Col 3: Dynamic Packages */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <h4 className="text-white font-bold text-sm tracking-wide">জনপ্রিয় প্যাকেজ</h4>
            <ul className="space-y-1.5">
              {activePackages.slice(0, 5).map((pkg) => (
                <li key={pkg.id}>
                  <Link to="/packages" className="hover:text-cyan-400 transition py-0.5 inline-block">
                    {pkg.name} ({pkg.speed} Mbps) — ৳{pkg.price}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Corporate CTA */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <h4 className="text-white font-bold text-sm tracking-wide">নতুন সংযোগ</h4>
            <p className="text-xs text-slate-400">
              আপনার বাসা বা অফিসের জন্য দ্রুতগতির ফাইবার সংযোগ নিতে এখনই রিকোয়েস্ট পাঠান।
            </p>
            <button
              onClick={() => onOpenConnectionModal()}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl transition shadow cursor-pointer text-center"
            >
              সংযোগের আবেদন করুন
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {contact.companyName || "Link BD"}. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-3">
            <span>24/7 Hotline: {contact.mainHotline}</span>
            <span>•</span>
            <button onClick={scrollToTop} className="hover:text-white transition cursor-pointer">উপরে উঠুন ↑</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
