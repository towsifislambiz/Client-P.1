import React from "react";
import { MapPin, Phone, Mail, UserCheck } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import { companyInfo } from "../data/ispData";

export default function OwnerAndOffices() {
  const { activeOffices, contact } = useSiteData();
  const displayOffices = activeOffices?.length > 0 ? activeOffices : companyInfo.offices;
  return (
    <section id="offices" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 mb-3">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            অফিস ও যোগাযোগ কেন্দ্র
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            আমাদের প্রধান শাখা ও আন্তর্জাতিক অফিস
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            উত্তরা ঢাকা, ফরিদপুর, কুষ্টিয়া ও সিঙ্গাপুর থেকে সার্বক্ষণিক সেবা দেওয়া হচ্ছে
          </p>
        </div>

        {/* Owner Credential & Offices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Owner Profile Card */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {contact?.ownerName || companyInfo?.ownerName || companyInfo?.owner || "Md. Hasan Mahmud"}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600">
                    {contact?.ownerTitle || companyInfo?.ownerTitle || "Owner, Link BD / Vison Broadband"}
                  </p>
                </div>
              </div>

              {/* Owner Screenshot Card */}
              <div className="rounded-xl overflow-hidden border border-slate-200 mb-4 bg-slate-50">
                <img
                  src={contact?.ownerPhoto || "/assets/owner-info.png"}
                  alt="Owner Info"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/owner-info.png";
                  }}
                />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                "{contact?.ownerQuote || "আমরা গ্রাহকদের নিরবচ্ছিন্ন ও ঝামেলামুক্ত ইন্টারনেট সেবা প্রদানে অঙ্গীকারবদ্ধ। সঠিক গতি এবং নির্ভরযোগ্য ২৪/৭ সাপোর্ট আমাদের মূল লক্ষ্য।"}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>মোবাইল: {contact?.ownerPhone || contact?.mainHotline || "+8801995-648616"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>ইমেইল: {contact?.ownerEmail || contact?.mainEmail || "linkbd86@gmail.com"}</span>
              </div>
            </div>
          </div>

          {/* 4 Offices Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {displayOffices.map((office, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-3">
                    {office.type}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{office.city} Office</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{(office.address && !office.address.toLowerCase().includes("hudai")) ? office.address : "Sarmin Market, 4th floor 27/4, Road No.13, Uttara House Building, Dhaka 1230 Bangladesh"}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{office.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Banner Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
          <img
            src="/assets/banner-contact.png"
            alt="Link BD Support Team"
            className="w-full h-auto object-cover max-h-[380px]"
          />
        </div>
      </div>
    </section>
  );
}
