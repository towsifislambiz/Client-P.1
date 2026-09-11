import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Phone, MessageCircle } from "lucide-react";
import { companyInfo } from "../data/ispData";
import { useSiteData } from "../context/SiteDataContext";

export default function FaqSection() {
  const { contact } = useSiteData();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "নতুন ফাইবার সংযোগ নিতে কত সময় লাগে?",
      a: "আমাদের কাভারেজ এলাকার ভেতরে থাকলে অনলাইনে বা হটলাইনে আবেদন করার ২৪ থেকে সর্বোচ্চ ৪৮ ঘণ্টার মধ্যে আমাদের টেকনিশিয়ান টিম আপনার বাসা বা অফিসে উপস্থিত হয়ে সম্পূর্ণ অপটিক্যাল ফাইবার ড্রপ ক্যাবলিং ও রাউটার কনফিগারেশন সম্পন্ন করে লাইন বুঝিয়ে দেবে।"
    },
    {
      q: "প্যাকেজগুলোর সাথে কি রিয়েল পাবলিক আইপি ও BDIX স্পিড পাওয়া যাবে?",
      a: "হ্যাঁ, আমাদের প্রতিটি প্যাকেজের সাথে রিয়েল IPv6 পাবলিক আইপি অন্তর্ভুক্ত থাকে এবং প্রয়োজন অনুযায়ী ডেডিকেটেড IPv4 পাবলিক আইপির ব্যবস্থা রয়েছে। এছাড়া 10 Gbps BDIX ব্যাকবোনের কারণে ইউটিউব, ফেসবুক, নেটফ্লিক্স এবং লোকাল সার্ভার থেকে বাফারলেস 4K স্ট্রিমিং ও সুপারফাস্ট ডাউনলোড উপভোগ করা যায়।"
    },
    {
      q: "বিকাশ বা নগদে কীভাবে প্রতি মাসের বিল পরিশোধ করব?",
      a: "আপনি ঘরে বসেই bKash, Nagad, Rocket বা ব্যাংক কার্ডের মাধ্যমে বিল দিতে পারবেন। আমাদের ওয়েবসাইটের 'বিল পরিশোধ' অপশনে আপনার কাস্টমার আইডি লিখলেই বকেয়া বিল দেখা যাবে এবং পেমেন্ট সম্পন্ন হওয়ার ৬০ সেকেন্ডের মধ্যে স্বয়ংক্রিয়ভাবে অ্যাকাউন্ট রিচার্জ হয়ে যায়।"
    },
    {
      q: "ইন্টারনেটে কোনো সমস্যা বা স্পিড ড্রপ হলে কীভাবে সাপোর্ট পাব?",
      a: `আমাদের ২৪/৭ সেন্ট্রাল টেকনিক্যাল সাপোর্ট টিম সর্বদা সক্রিয়। আপনি সরাসরি আমাদের ২৪ ঘণ্টা খোলা হটলাইনে (${contact?.mainHotline || companyInfo.hotline1}) অথবা হোয়াটসঅ্যাপে মেসেজ দিলেই আমাদের সাপোর্ট ইঞ্জিনিয়াররা তাৎক্ষণিক সমস্যার সমাধান করবেন।`
    },
    {
      q: "আমার নিজের রাউটার থাকলে কি ব্যবহার করতে পারব?",
      a: "হ্যাঁ, আপনার কাছে পূর্ববর্তী যেকোনো ব্র্যান্ডের (TP-Link, Tenda, Netgear, Xiaomi ইত্যাদি) ওয়াইফাই রাউটার থাকলে তা ব্যবহার করতে পারবেন। আমাদের টেকনিশিয়ান সম্পূর্ণ ফ্রিতে আপনার রাউটারে ফাইবার অপটিক কনফিগার করে দেবে।"
    },
    {
      q: "বাসা বা অফিস স্থানান্তর (Shifting) করার নিয়ম কী?",
      a: "আমাদের কাভারেজ জোনের মধ্যে বাসা বা অফিস পরিবর্তন করতে চাইলে স্থানান্তরের অন্তত ২৪-৪৮ ঘণ্টা পূর্বে আমাদের হটলাইনে জানালে আমাদের টিম কোনো প্রকার সার্ভিস ড্রপ ছাড়াই নতুন ঠিকানায় আপনার সংযোগ স্থানান্তর করে দেবে।"
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-50/60 border-t border-slate-200/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 mb-2.5">
            <HelpCircle className="w-3 h-3 text-blue-600" />
            সাধারণ জিজ্ঞাসা
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
          </h2>
          <p className="mt-1.5 text-slate-600 text-xs sm:text-sm font-light">
            Link BD ইন্টারনেট সংযোগ সম্পর্কে প্রয়োজনীয় কিছু প্রশ্নের সহজ উত্তর
          </p>
        </div>

        {/* Elegant Clean Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? "bg-white border-blue-400 shadow-md ring-1 ring-blue-400/30"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3.5 cursor-pointer"
                >
                  <span
                    className={`font-bold text-xs sm:text-base leading-snug transition-colors ${
                      isOpen ? "text-blue-600" : "text-slate-800 hover:text-blue-600"
                    }`}
                  >
                    {faq.q}
                  </span>

                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-blue-600 text-white rotate-180 shadow-md shadow-blue-500/25"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact Links in Footer */}
        <div className="mt-8 sm:mt-10 text-center text-xs sm:text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>আরও কোনো প্রশ্ন আছে? সরাসরি কল করুন</span>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${contact?.mainHotline || companyInfo.hotline1}`}
              className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline"
            >
              <Phone className="w-3 h-3" /> {contact?.mainHotline || companyInfo.hotline1}
            </a>
            <span>•</span>
            <a
              href={`https://wa.me/${(contact?.whatsapp || companyInfo.whatsapp).replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:underline"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
