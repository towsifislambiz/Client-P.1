import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle, Clock, Headphones, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import { useSiteData } from "../context/SiteDataContext";
import { companyInfo } from "../data/ispData";

export default function ContactPage() {
  const { contact, imageMap, submitInquiry, activeOffices } = useSiteData();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("new_line");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setIsSubmitting(true);
    try {
      await submitInquiry({ name, phone, topic, message, source: "contact_page" });
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-5 sm:py-8 lg:py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10 pt-1 sm:pt-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10.5px] sm:text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 mb-2.5">
            <Headphones className="w-3.5 h-3.5 text-blue-600" />
            সহায়তা, অভিযোগ ও ২৪/৭ হেল্পডেস্ক
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-snug">
            আমরা আছি আপনার পাশে, <span className="text-blue-600">সার্বক্ষণিক</span>
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm font-normal max-w-2xl mx-auto leading-relaxed">
            নতুন সংযোগের আবেদন, বিলিং সহায়তা বা জরুরি টেকনিক্যাল সাপোর্টের জন্য হটলাইনে কল করুন অথবা সরাসরি বার্তা পাঠান
          </p>
        </motion.div>

        {/* Support Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xl mb-10 sm:mb-16"
        >
          <img
            src={imageMap["contact_banner"]?.currentUrl || "/assets/banner-contact.png"}
            alt="Link BD Customer Support"
            className="w-full h-auto object-cover max-h-[380px]"
            onError={(e) => {
              e.currentTarget.src = "/assets/banner-contact.png";
            }}
          />
        </motion.div>

        {/* Helpdesk Support Infographic if customized */}
        {imageMap?.["contact_support"]?.currentUrl && imageMap?.["contact_support"]?.currentUrl !== imageMap?.["contact_banner"]?.currentUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xl mb-10 sm:mb-16"
          >
            <img
              src={imageMap["contact_support"].currentUrl}
              alt="24/7 Helpdesk Support"
              className="w-full h-auto object-cover max-h-[380px]"
              onError={(e) => {
                e.currentTarget.src = "/assets/banner-contact.png";
              }}
            />
          </motion.div>
        )}

        {/* Hotlines and Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-14 sm:mb-16">
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="p-5 sm:p-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl space-y-5">
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl pb-3 border-b border-slate-100">
                জরুরি হটলাইন ও সাপোর্ট
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">হেড অফিস হটলাইন (২৪/৭)</p>
                    <a href={`tel:${contact.mainHotline}`} className="font-black text-slate-900 text-sm sm:text-base hover:text-blue-600">
                      {contact.mainHotline}
                    </a>
                    <p className="text-[11px] text-slate-500">সাপোর্ট: {contact.supportHotline}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-600 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">কুষ্টিয়া ব্রাঞ্চ হটলাইন</p>
                    <a href="tel:01731326832" className="font-black text-slate-900 text-sm sm:text-base hover:text-teal-600">
                      01731326832
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">WhatsApp সরাসরি চ্যাট</p>
                    <a
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-emerald-600 text-xs sm:text-sm hover:underline"
                    >
                      {contact.whatsapp} (Live Agent)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">অফিসিয়াল ইমেইল</p>
                    <p className="font-semibold text-slate-900 text-xs">{contact.mainEmail}</p>
                    <p className="text-[11px] text-slate-500">{contact.supportEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase">কাস্টমার কেয়ার সময়</p>
                    <p className="font-semibold text-slate-900 text-xs">২৪ ঘণ্টা নিরবচ্ছিন্ন সেবা</p>
                  </div>
                </div>
              </div>

              {/* Direct Waze Link */}
              <div className="pt-3 border-t border-slate-100">
                <a
                  href={contact.wazeLink || companyInfo?.wazeLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition shadow-md text-center"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  Open in Waze (উত্তরা হেড অফিস ম্যাপ)
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Ticket Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-10 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl">
              <h3 className="font-extrabold text-slate-900 text-xl sm:text-2xl mb-1">সাপোর্ট টিকেট ও বার্তা পাঠান</h3>
              <p className="text-xs text-slate-500 mb-5 sm:mb-6">
                আপনার বার্তাটি আমাদের সেন্ট্রাল টেকনিক্যাল ডেস্কে সরাসরি পৌঁছে যাবে এবং দ্রুত সমাধান নিশ্চিত করা হবে।
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম:</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="নাম লিখুন..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর:</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">বিষয় / সার্ভিসের ধরন:</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="new_line">নতুন ইন্টারনেট লাইন সংযোগ</option>
                      <option value="speed">ইন্টারনেট স্পিড বা বাফারিং অনুসন্ধান</option>
                      <option value="billing">বিল সংক্রান্ত অনুসন্ধান</option>
                      <option value="shifting">লাইন স্থানান্তরের আবেদন (Shifting)</option>
                      <option value="corporate">কর্পোরেট ডেডিকেটেড ব্যান্ডউইডথ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">আপনার বার্তা বা এলাকার বিবরণ:</label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="বিস্তারিত ঠিকানা বা বার্তা এখানে লিখুন..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    টিকেট সাবমিট করুন
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 sm:py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-xl font-black text-slate-900">টিকেট সফলভাবে তৈরি হয়েছে!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    আপনার টিকেট রেফারেন্স নম্বর: <strong>#LBD-TK{Math.floor(100000 + Math.random() * 900000)}</strong>। আমাদের সাপোর্ট ইঞ্জিনিয়ার দ্রুত আপনার মোবাইলে যোগাযোগ করবেন।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Client Official 4 Offices Grid */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              ক্লায়েন্ট অফিসিয়াল অফিস লোকেশন
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              আমাদের সকল রেজিস্টার্ড কার্যালয়ের সঠিক ঠিকানা ও হটলাইন
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(activeOffices?.length ? activeOffices : companyInfo.offices).map((off, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {off.type}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mt-2 mb-1">{off.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                    {(off.address && !off.address.toLowerCase().includes("hudai")) ? off.address : "Sarmin Market, 4th floor 27/4, Road No.13, Uttara House Building, Dhaka 1230 Bangladesh"}
                  </p>
                  <p className="text-xs font-bold text-emerald-600">ফোন: {off.phone}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${off.phone.split(',')[0].trim()}`}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" /> কল করুন
                  </a>
                  {off.wazeLink && (
                    <a
                      href={off.wazeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" /> Waze
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
