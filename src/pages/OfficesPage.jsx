import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, UserCheck, ExternalLink, Building, Clock, Compass } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import { companyInfo } from "../data/ispData";

export default function OfficesPage() {
  const { activeOffices: offices, contact, imageMap } = useSiteData();
  const [selectedOffice, setSelectedOffice] = useState(0);

  const activeOffice = offices[selectedOffice] || offices[0] || {};

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 pt-2 sm:pt-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 mb-3">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            অফিসিয়াল কার্যালয় ও যোগাযোগ কেন্দ্র
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-snug sm:leading-tight">
            আমাদের অফিস ও শাখা সমূহ
          </h1>
          <p className="mt-3 text-slate-600 text-xs sm:text-base font-light leading-relaxed">
            উত্তরা ঢাকা হেড অফিস, কুষ্টিয়া শাখা, মধুখালী ফরিদপুর ও সিঙ্গাপুর আন্তর্জাতিক কার্যালয়
          </p>
        </motion.div>

        {/* Owner Card & Interactive Branch Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-14 sm:mb-20">
          {/* Owner Credential Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                    {contact?.owner || companyInfo?.owner || "Md. Hasan Mahmud"}
                  </h3>
                  <p className="text-xs font-bold text-blue-600">Owner, Link BD / Vison Broadband</p>
                </div>
              </div>

              {/* Owner Screenshot Card */}
              <div className="rounded-xl overflow-hidden border border-slate-200 mb-4 bg-slate-50 shadow-sm">
                <img
                  src={imageMap["head_office_img"]?.currentUrl || "/assets/owner-info.png"}
                  alt="Head Office Credentials"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/owner-info.png";
                  }}
                />
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-700 leading-relaxed font-medium">
                "আমরা গ্রাহকদের নিরবচ্ছিন্ন ও ঝামেলামুক্ত ইন্টারনেট সেবা প্রদানে অঙ্গীকারবদ্ধ। সঠিক গতি এবং নির্ভরযোগ্য ২৪/৭ সাপোর্ট আমাদের মূল লক্ষ্য।"
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold">{contact.mainHotline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold">{contact.mainEmail}</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Branch Switcher */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Branch Tab Buttons - 2x2 Grid on Mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-6 sm:mb-8">
                {offices.map((off, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOffice(idx)}
                    className={`py-2.5 sm:py-3 px-2 rounded-xl text-xs font-bold text-center transition cursor-pointer ${
                      selectedOffice === idx
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {off.city}
                  </button>
                ))}
              </div>

              {/* Active Branch Showcase */}
              <motion.div
                key={selectedOffice}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                      {activeOffice.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5">{activeOffice.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> ২৪/৭ হেল্পলাইন
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">অফিসের ঠিকানা</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5 leading-relaxed">{activeOffice.address}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">হটলাইন ও ফোন</p>
                        <a href={`tel:${activeOffice.phone.split(',')[0].trim()}`} className="text-xs sm:text-sm font-bold text-blue-600 hover:underline">
                          {activeOffice.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">ইমেইল</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800">{activeOffice.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1">
                  {activeOffice.wazeLink ? (
                    <a
                      href={activeOffice.wazeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition shadow-md text-center"
                    >
                      <Compass className="w-4 h-4 text-cyan-400" />
                      Open in Waze (ম্যাপে রুট দেখুন)
                    </a>
                  ) : null}

                  <a
                    href={`tel:${activeOffice.phone.split(',')[0].trim()}`}
                    className="w-full sm:w-auto px-5 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition border border-blue-200 text-center"
                  >
                    <Phone className="w-4 h-4" />
                    সরাসরি কথা বলুন
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Support Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xl"
        >
          <img
            src={imageMap["contact_banner"]?.currentUrl || "/assets/banner-contact.png"}
            alt="Link BD Support Team"
            className="w-full h-auto object-cover max-h-[400px]"
          />
        </motion.div>
      </div>
    </div>
  );
}
