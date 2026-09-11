import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, ExternalLink, ShieldCheck, CheckCircle2, Lock, Zap, Phone, 
  HelpCircle, Sparkles, ArrowRight, Smartphone, RefreshCw, AlertCircle, 
  Eye, X, ChevronRight, ChevronLeft, Copy, Check, MessageSquare, Award,
  CheckCircle, ChevronDown
} from "lucide-react";
import confetti from "canvas-confetti";
import { useSiteData } from "../context/SiteDataContext";

export default function BillPayPage() {
  const { contact } = useSiteData();
  const [selectedStepModal, setSelectedStepModal] = useState(null);
  const [copiedHelpline, setCopiedHelpline] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const billingUrl = contact?.billingPortalUrl || "https://client.linkbd.net/pay.php?c=1255";
  const billingHelpline = contact?.billingHelpline || "01995648616";

  const handlePayClick = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  const handleCopyHelpline = () => {
    navigator.clipboard.writeText(billingHelpline);
    setCopiedHelpline(true);
    setTimeout(() => setCopiedHelpline(false), 2000);
  };

  const stepsData = [
    {
      step: 1,
      badge: "ধাপ ০১ • এন্ট্রি",
      title: "কাস্টমার আইডি বা মোবাইল নম্বর লিখুন",
      summary: "পেমেন্ট পোর্টালে গিয়ে আপনার কাস্টমার আইডি, ইউজার আইডি অথবা রেজিস্টার্ড মোবাইল নম্বর দিন।",
      image: "/assets/payment-step1.jpg",
      bullets: [
        "উপরে থাকা 'অনলাইন বিল পরিশোধ করুন' বাটনে ক্লিক করলে সরাসরি Link BD-এর বিলিং পোর্টাল ওপেন হবে।",
        "সেখানে 'Customer ID/User ID/Mobile No' বক্সে আপনার আইডি অথবা মোবাইল নম্বরটি লিখুন।",
        "এরপর নীল রঙের 'Continue' বাটনে ক্লিক করুন।"
      ],
      highlights: "কাস্টমার আইডি অথবা মোবাইল নম্বর উভয়ের যেকোনো একটি দিয়েই বিল দেখা সম্ভব।"
    },
    {
      step: 2,
      badge: "ধাপ ০২ • যাচাই ও নির্বাচন",
      title: "অ্যাকাউন্টের তথ্য যাচাই ও পেমেন্ট মাধ্যম নির্বাচন",
      summary: "স্ক্রিনে আপনার নাম, প্যাকেজ, বকেয়া বিল এবং এক্সপায়ার ডেট দেখে bKash অথবা shurjoPay সিলেক্ট করুন।",
      image: "/assets/payment-step2.jpg",
      bullets: [
        "আপনার নাম (Name), ইউজার আইডি (UserID), প্যাকেজ (Package Name) এবং বকেয়া টাকা (Payable Amount) যাচাই করুন।",
        "সরাসরি বিকাশ থেকে পেমেন্ট করতে 'bKash' বাটনে ক্লিক করুন।",
        "নগদ, রকেট, উপায়, ভিসা, মাস্টারকার্ড বা ব্যাংক অ্যাকাউন্টের জন্য 'Other Cards & MFS (shurjoPay)' নির্বাচন করুন।"
      ],
      highlights: "১০০% নির্ভুল বিলিং—টাকার পরিমাণ সিস্টেম থেকে স্বয়ংক্রিয়ভাবে ক্যালকুলেট করা থাকে।"
    },
    {
      step: 3,
      badge: "ধাপ ০৩ • ইনস্ট্যান্ট নবায়ন",
      title: "পেমেন্ট সম্পন্ন ও স্বয়ংক্রিয় কানেকশন সচল",
      summary: "গেটওয়েতে পিন বা ওটিপি দিয়ে কনফার্ম করলেই ২-৩ সেকেন্ডে আপনার ইন্টারনেট অটো-রিনিউয়াল হয়ে যাবে।",
      image: "/assets/payment-step3.jpg",
      bullets: [
        "নির্বাচিত গেটওয়েতে আপনার অ্যাকাউন্ট পিন বা ওটিপি (OTP) দিয়ে পেমেন্ট সফল করুন।",
        "পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই SmartISP ক্লাউড সিস্টেমের মাধ্যমে আপনার ইন্টারনেট লাইন তাৎক্ষণিক সচল হয়ে যাবে!",
        "কোনো ম্যানুয়াল ফোন দেওয়া বা মেসেজ পাঠানোর দরকার নেই; সাথে সাথে ডিজিটাল কনফার্মেশন পাবেন।"
      ],
      highlights: "SmartISP ও Radius সার্ভার ইন্টিগ্রেশন থাকায় দিন-রাত ২৪ ঘণ্টাই লাইন ইনস্ট্যান্ট সক্রিয় হয়।"
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "২৫৬-বিট এসএসএল এনক্রিপশন",
      desc: "সকল আর্থিক লেনদেন সর্বোচ্চ আন্তর্জাতিক ব্যাংকিং গ্রেড 256-Bit SSL/TLS এনক্রিপশনের মাধ্যমে সম্পূর্ণ সুরক্ষিত।"
    },
    {
      icon: Award,
      title: "বাংলাদেশ ব্যাংক অনুমোদিত গেটওয়ে",
      desc: "আমাদের গেটওয়ে পার্টনার bKash এবং shurjoPay বাংলাদেশ ব্যাংক কর্তৃক লাইসেন্সপ্রাপ্ত ও নিয়ন্ত্রিত পেমেন্ট সিস্টেম অপারেটর (PSO)।"
    },
    {
      icon: Zap,
      title: "SmartISP ক্লাউড অটো-রিচার্জ",
      desc: "পেমেন্ট পাওয়ার সাথে সাথেই Radius সার্ভারে অ্যাকাউন্ট ভেরিফিকেশন ও ২ সেকেন্ডে স্বয়ংক্রিয়ভাবে সংযোগ নবায়ন নিশ্চিত।"
    },
    {
      icon: ShieldCheck,
      title: "জিরো ফ্রড ও পূর্ণ তথ্য সুরক্ষা",
      desc: "আপনার পিন নম্বর, সিভিভি বা কোনো ব্যাংকিং পাসওয়ার্ড সার্ভারে সংরক্ষণ করা হয় না। গ্রাহকের তথ্যের গোপনীয়তা শতভাগ সুরক্ষিত।"
    },
    {
      icon: CheckCircle2,
      title: "তাৎক্ষণিক ডিজিটাল রসিদ ও ট্রানজাকশন আইডি",
      desc: "পেমেন্ট সফল হওয়ামাত্রই স্ক্রিনে ডিজিটাল ট্রানজাকশন ভাউচার পাবেন এবং আপনার রেজিস্টার্ড মোবাইলে কনফার্মেশন এসএমএস পৌঁছাবে।"
    },
    {
      icon: Phone,
      title: "২৪/৭ ডেডিকেটেড বিলিং হেল্পলাইন",
      desc: "বিল প্রদান বা ট্রানজাকশন সংক্রান্ত যেকোনো তথ্যে আমাদের সার্বক্ষণিক সাপোর্ট টিম (01995648616) তাৎক্ষণিক সমাধানে প্রস্তুত।"
    }
  ];

  const paymentMethods = [
    { name: "bKash", color: "bg-pink-600/15 border-pink-500/30 text-pink-400", label: "বিকাশ পেমেন্ট" },
    { name: "shurjoPay", color: "bg-emerald-600/15 border-emerald-500/30 text-emerald-400", label: "সূর্যপে গেটওয়ে" },
    { name: "Nagad", color: "bg-orange-600/15 border-orange-500/30 text-orange-400", label: "নগদ পে" },
    { name: "Rocket", color: "bg-purple-600/15 border-purple-500/30 text-purple-400", label: "রকেট (DBBL)" },
    { name: "Upay", color: "bg-blue-600/15 border-blue-500/30 text-blue-400", label: "উপায় পে" },
    { name: "Visa / Mastercard", color: "bg-cyan-600/15 border-cyan-500/30 text-cyan-400", label: "ডেবিট/ক্রেডিট কার্ড" },
    { name: "Internet Banking", color: "bg-indigo-600/15 border-indigo-500/30 text-indigo-400", label: "অনলাইন ব্যাংকিং" }
  ];

  const faqs = [
    {
      q: "বিল পরিশোধের পর কতক্ষণের মধ্যে ইন্টারনেট সংযোগ চালু বা নবায়ন হবে?",
      a: "পেমেন্ট সফল হওয়ার সাথে সাথে আমাদের SmartISP অটোমেশন সিস্টেমের মাধ্যমে মাত্র কয়েক সেকেন্ডের মধ্যে স্বয়ংক্রিয়ভাবে আপনার ইন্টারনেট লাইন নবায়ন বা পুনরায় সচল হয়ে যায়। কোনো প্রকার ম্যানুয়াল অপেক্ষা বা হেল্পলাইনে ফোন দেওয়ার প্রয়োজন নেই।"
    },
    {
      q: "আমি কি কাস্টমার আইডি ছাড়াও মোবাইল নম্বর দিয়ে বিল দিতে পারব?",
      a: "হ্যাঁ, নিশ্চয়ই! সংযোগ নেওয়ার সময় আপনার যে মোবাইল নম্বরটি সিস্টেমে নথিভুক্ত করা হয়েছিল, সেই মোবাইল নম্বরটি আইডি বক্সে লিখে Continue করলেই আপনার অ্যাকাউন্টের সম্পূর্ণ তথ্য চলে আসবে।"
    },
    {
      q: "আমি আমার কাস্টমার আইডি ভুলে গেলে কীভাবে জানতে পারব?",
      a: "আপনার মোবাইলে আসা পূর্ববর্তী মাসের বিলের এসএমএস চেক করুন। সেখানে কাস্টমার আইডি উল্লেখ থাকে। অথবা আমাদের ২৪/৭ হেল্পলাইনে (01995648616) কল করলে তাৎক্ষণিক আপনার আইডি জানিয়ে দেওয়া হবে।"
    },
    {
      q: "অ্যাকাউন্ট থেকে টাকা কেটে নেওয়ার পরেও লাইন চালু না হলে করণীয় কী?",
      a: "সাধারণত সিস্টেম অটোমেটিক রিচার্জ করে দেয়। নেটওয়ার্ক ত্রুটির কারণে বিলম্ব হলে ট্রানজাকশন আইডি (TrxID) সহ সরাসরি আমাদের বিলিং হেল্পলাইন 01995-648616 এ যোগাযোগ করুন; আমাদের সাপোর্ট টিম ২ মিনিটের মধ্যে ব্যবস্থা গ্রহণ করবে।"
    },
    {
      q: "আমি কি অগ্রিম একাধিক মাসের বিল একসঙ্গে পরিশোধ করতে পারব?",
      a: "হ্যাঁ, পেমেন্ট পোর্টালে আপনার অ্যাকাউন্টে লগইন করে অ্যাডভান্স পেমেন্ট করার অপশন রয়েছে, অথবা আমাদের কাস্টমার কেয়ারে যোগাযোগ করে অগ্রিম রিচার্জ করে নিতে পারেন।"
    }
  ];

  return (
    <div className="py-8 sm:py-14 bg-slate-950 text-white min-h-screen relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Ambience & Glowing Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[800px] h-[350px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 -right-40 w-96 h-96 bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 pt-2 sm:pt-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-cyan-300 border border-blue-500/30 mb-4 backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            অফিসিয়াল অনলাইন বিলিং ও ইনস্ট্যান্ট রিচার্জ পোর্টাল
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-snug sm:leading-tight">
            সহজে ও নিরাপদে ঘরে বসেই আপনার <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              মাসিক ইন্টারনেট বিল পরিশোধ
            </span> করুন
          </h1>
          <p className="mt-3.5 text-slate-300 text-xs sm:text-base font-light leading-relaxed">
            Link BD-এর স্মার্ট অনলাইন বিলিং পোর্টালে সরাসরি কাস্টমার আইডি অথবা রেজিস্টার্ড মোবাইল নম্বর দিয়ে 
            মাত্র ১ মিনিটে bKash, shurjoPay (নগদ, রকেট, উপায়, কার্ড) দিয়ে বিল পরিশোধ করুন এবং পান 
            <strong className="text-cyan-300 font-semibold"> তাৎক্ষণিক স্বয়ংক্রিয় কানেকশন নবায়ন</strong>।
          </p>
        </motion.div>

        {/* 1. Main Payment Action Card (Prominent Designed CTA Button) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16 sm:mb-24"
        >
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950 border border-blue-500/30 shadow-2xl backdrop-blur-2xl overflow-hidden group">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

            {/* Portal Header Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white tracking-wide">Link BD SmartISP Billing Portal</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Portal
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">অফিসিয়াল পেমেন্ট পোর্টাল</p>
                </div>
              </div>

              {/* Direct Link Tag */}
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg w-fit font-mono">
                <span className="text-cyan-400">URL:</span>
                <span className="truncate max-w-[200px] sm:max-w-[260px]">{billingUrl.replace(/^https?:\/\//, '')}</span>
              </div>
            </div>

            {/* Description Text */}
            <div className="space-y-4 mb-6">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                নিচের বাটনে ক্লিক করে সরাসরি Link BD-এর সিকিউর বিলিং পোর্টালে যান। সেখানে আপনার কাস্টমার আইডি অথবা মোবাইল নম্বর প্রবেশ করিয়ে <strong className="text-cyan-300 font-semibold">bKash, নগদ, রকেট, উপায় অথবা যেকোনো ব্যাংক কার্ডের</strong> মাধ্যমে সরাসরি বিল পরিশোধ সম্পন্ন করুন।
              </p>
            </div>

            {/* Primary High-Impact CTA Button */}
            <div>
              <a
                href={billingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePayClick}
                className="w-full py-4 px-6 sm:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-[0.99] text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-600/30 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group text-center"
              >
                <CreditCard className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
                <span>অনলাইন বিল পরিশোধ করুন (Link BD Portal)</span>
                <ExternalLink className="w-4 h-4 text-cyan-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Quick Guarantees & Helpline Footer */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-300">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>তাৎক্ষণিক অটো রিচার্জ</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SSL এনক্রিপ্টেড পেমেন্ট</span>
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-1.5 text-xs text-slate-300">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>হেল্পলাইন:</span>
                <a href={`tel:${billingHelpline}`} className="font-bold text-cyan-300 hover:underline">
                  {billingHelpline}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Step-by-Step Payment Documentation (সচিত্র নির্দেশিকা ও গাইড) */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              সচিত্র ব্যবহার নির্দেশিকা
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              অনলাইন বিল পেমেন্টের সহজ ৩টি ধাপ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light">
              আমাদের অফিসিয়াল পেমেন্ট গেটওয়েতে কীভাবে সহজে বিল পরিশোধ করবেন তা নিচে ধাপে ধাপে দেখানো হলো। বড় করে দেখতে যেকোনো ছবির ওপর ক্লিক করুন।
            </p>
          </div>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {stepsData.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/20"
              >
                {/* Step Top Bar */}
                <div className="p-5 pb-3 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/50">
                  <span className="text-[11px] font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    স্টেপ {item.step} / ৩
                  </span>
                </div>

                {/* Screenshot Preview with Interactive Zoom Trigger */}
                <div 
                  className="relative h-64 sm:h-72 bg-slate-950 overflow-hidden cursor-pointer group/img border-b border-slate-800"
                  onClick={() => setSelectedStepModal(idx)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center backdrop-blur-xs">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                      <Eye className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-white bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700">
                      ছবিটি বড় করে দেখুন
                    </span>
                  </div>
                </div>

                {/* Card Text & Instructions */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed font-light">
                      {item.summary}
                    </p>

                    <div className="space-y-2 mb-4">
                      {item.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Callout */}
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-cyan-300/90 bg-blue-950/30 p-2.5 rounded-xl border border-blue-900/40">
                    💡 <span className="font-semibold text-white">নোট: </span>{item.highlights}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Pay CTA Bar below instructions */}
          <div className="mt-8 text-center">
            <a
              href={billingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePayClick}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
            >
              <span>পেমেন্ট পোর্টালে যেতে এখানে ক্লিক করুন</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3. Security Guarantee & Assurances (নিরাপত্তা ও নির্ভরযোগ্যতা) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-24 p-6 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Security Badge */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              ১০০% নিরাপদ ও এনক্রিপ্টেড পেমেন্ট গ্যারান্টি
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              আপনার আর্থিক নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light">
              Link BD-এর সাথে প্রতিটি পেমেন্ট ট্রানজাকশন সম্পূর্ণ স্বচ্ছ, নির্ভুল এবং আন্তর্জাতিক সিকিউরিটি স্ট্যান্ডার্ড অনুযায়ী পরিচালিত হয়।
            </p>
          </div>

          {/* 6 Grid Security Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {securityFeatures.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-blue-500/40 transition-all space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {sec.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 4. Supported Payment Gateways Showcase */}
        <div className="mb-16 sm:mb-20 text-center">
          <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-4">
            সমর্থিত মোবাইল ব্যাংকিং ও কার্ড পেমেন্ট মেথড
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {paymentMethods.map((m, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${m.color} backdrop-blur-sm shadow-sm transition-transform hover:scale-105`}
              >
                {m.label} ({m.name})
              </div>
            ))}
          </div>
        </div>

        {/* 5. Frequently Asked Questions (FAQ) Section */}
        <div className="max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              বিল সংক্রান্ত সাধারণ প্রশ্ন ও সমাধান
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              যেকোনো দ্বিধাদ্বন্দ্বে নিচের সাধারণ উত্তরগুলো দেখে নিতে পারেন
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-cyan-400" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-300 leading-relaxed font-light border-t border-slate-800/60 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Dedicated Billing Assistance Callout Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900/50 via-slate-900 to-indigo-900/50 border border-cyan-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Phone className="w-5 h-5 text-cyan-400 animate-pulse" />
              বিল পেমেন্ট নিয়ে কোনো সমস্যায় পড়েছেন?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
              আইডি সংক্রান্ত সমস্যা বা যেকোনো বিলিং জটিলতায় আমাদের ডেডিকেটেড বিলিং হেল্পলাইনে সরাসরি কল অথবা হোয়াটসঅ্যাপে মেসেজ দিন।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${billingHelpline}`}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>কল করুন: {billingHelpline}</span>
            </a>

            <button
              onClick={handleCopyHelpline}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              title="নম্বর কপি করুন"
            >
              {copiedHelpline ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>নম্বর কপি</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

      </div>

      {/* 7. High-Resolution Interactive Screenshot Zoom Modal */}
      <AnimatePresence>
        {selectedStepModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-cyan-300 bg-cyan-950 border border-cyan-800 px-2.5 py-0.5 rounded-full">
                    {stepsData[selectedStepModal].badge}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
                    {stepsData[selectedStepModal].title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedStepModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image Display */}
              <div className="p-3 sm:p-6 overflow-y-auto max-h-[65vh] flex items-center justify-center bg-black/50">
                <img
                  src={stepsData[selectedStepModal].image}
                  alt={stepsData[selectedStepModal].title}
                  className="max-h-[58vh] w-auto object-contain rounded-xl border border-slate-800 shadow-2xl"
                />
              </div>

              {/* Modal Footer Controls & Description */}
              <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-300 text-center sm:text-left">
                  {stepsData[selectedStepModal].summary}
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    disabled={selectedStepModal === 0}
                    onClick={() => setSelectedStepModal(prev => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    পূর্ববর্তী
                  </button>
                  <button
                    disabled={selectedStepModal === stepsData.length - 1}
                    onClick={() => setSelectedStepModal(prev => Math.min(stepsData.length - 1, prev + 1))}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
                  >
                    পরবর্তী
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
