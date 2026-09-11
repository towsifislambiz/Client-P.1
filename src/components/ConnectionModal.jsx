import React, { useState } from "react";
import { X, Wifi, CheckCircle2 } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";

export default function ConnectionModal({ isOpen, onClose, preselectedPackage }) {
  const { activePackages: packages, submitInquiry } = useSiteData();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPkgId, setSelectedPkgId] = useState(preselectedPackage?.id || packages[0]?.id || "silver-plus");
  const [connType, setConnType] = useState("Home");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("অনুগ্রহ করে সব তথ্য দিন");
      return;
    }

    const pkgName = packages.find((p) => p.id === selectedPkgId)?.name || selectedPkgId;

    try {
      await submitInquiry({
        name,
        phone,
        address,
        package: pkgName,
        type: connType,
        source: "connection_modal"
      });
    } catch {
      // LocalStorage fallback
      const inquiries = JSON.parse(localStorage.getItem("linkbd_inquiries") || "[]");
      inquiries.unshift({
        id: "REQ-" + Date.now().toString().slice(-6),
        name,
        phone,
        address,
        package: pkgName,
        type: connType,
        date: new Date().toLocaleString(),
        status: "Pending"
      });
      localStorage.setItem("linkbd_inquiries", JSON.stringify(inquiries));
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative border border-slate-200 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">আবেদন সফল হয়েছে!</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              ধন্যবাদ <strong>{name}</strong>! আপনার নতুন ইন্টারনেট সংযোগের আবেদনটি জমা হয়েছে। আমাদের সাপোর্ট টিম দ্রুত আপনার সাথে ফোনে যোগাযোগ করবে।
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-xs sm:text-sm hover:bg-blue-700 transition cursor-pointer"
            >
              ঠিক আছে
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-2 text-blue-600 mb-1 pr-6">
              <Wifi className="w-5 h-5 shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">নতুন ইন্টারনেট সংযোগ আবেদন</h3>
            </div>
            <p className="text-xs text-slate-500 pb-2 border-b border-slate-100">
              নিচের ফর্মটি পূরণ করুন, আমাদের সাপোর্ট টিম ২৪ ঘণ্টার মধ্যে লাইন সংযোগ প্রদান করবে।
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">আপনার নাম *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: তানভীর হাসান"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">মোবাইল নম্বর *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">সম্পূর্ণ ঠিকানা *</label>
              <textarea
                required
                rows="2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="বাড়ি নং, রোড নং, এলাকা, থানা, জেলা"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">প্যাকেজ নির্বাচন</label>
                <select
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm bg-white"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.speed} Mbps - ৳{pkg.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">সংযোগ টাইপ</label>
                <select
                  value={connType}
                  onChange={(e) => setConnType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm bg-white"
                >
                  <option value="Home">হোম ব্রডব্যান্ড</option>
                  <option value="Corporate">কর্পোরেট ফাইবার</option>
                  <option value="SME">ক্ষুদ্র ব্যবসা (SME)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-md hover:from-blue-700 hover:to-cyan-700 transition text-xs sm:text-sm mt-2 cursor-pointer"
            >
              আবেদন জমা দিন
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
