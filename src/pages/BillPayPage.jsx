import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, Search, CheckCircle2, ShieldCheck, Zap, Phone, 
  HelpCircle, Sparkles, Building, ArrowRight, Smartphone, AlertCircle 
} from "lucide-react";
import confetti from "canvas-confetti";
import { useSiteData } from "../context/SiteDataContext";

export default function BillPayPage() {
  const { imageMap, submitPayment, contact } = useSiteData();
  const [customerId, setCustomerId] = useState("");
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [activeTab, setActiveTab] = useState("bkash");

  const handleQueryBill = (e) => {
    e.preventDefault();
    if (!customerId.trim()) return;

    setLoading(true);
    setPaid(false);

    // Simulate instant bill inquiry
    setTimeout(() => {
      setLoading(false);
      setBillData({
        id: customerId.toUpperCase(),
        name: "Md. Hasan Mahmud",
        phone: "017******82",
        package: "Platinum+ 100 Mbps",
        amount: 1260,
        month: "মার্চ ২০২৬",
        dueDate: "১০ মার্চ ২০২৬",
        status: "Unpaid",
      });
    }, 700);
  };

  const handlePayNow = async () => {
    setPaid(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (billData) {
      await submitPayment({
        customerId: billData.id,
        phone: billData.phone,
        amount: billData.amount,
        method: activeTab,
        trxId: `TRX-${Date.now().toString().slice(-6)}`
      }).catch(() => {});
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-950 text-white min-h-screen relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[300px] bg-purple-600/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 pt-2 sm:pt-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3 backdrop-blur-md">
            <CreditCard className="w-3.5 h-3.5 text-purple-400" />
            সহজ ও নিরাপদ বিল পরিশোধ
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-snug sm:leading-tight">
            ঘরে বসেই ইনস্ট্যান্ট <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">বিল পরিশোধ</span> করুন
          </h1>
          <p className="mt-3 text-slate-300 text-xs sm:text-base font-light leading-relaxed">
            bKash, Nagad, Rocket ও কার্ডের মাধ্যমে বিল পরিশোধ মাত্র ১ মিনিটে। বিল পরিশোধের সাথে সাথে স্বয়ংক্রিয়ভাবে অ্যাকাউন্ট রিচার্জ নিশ্চিত।
          </p>
        </motion.div>

        {/* Visual Banner Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
        >
          <img
            src={imageMap["billpay_banner"]?.currentUrl || "/assets/banner-billpay.png"}
            alt="Bill Payment Gateway"
            className="w-full h-auto object-cover max-h-[360px]"
            onError={(e) => {
              e.currentTarget.src = "/assets/banner-billpay.png";
            }}
          />
        </motion.div>

        {/* Interactive Instant Bill Query & Quick Pay Box */}
        <div className="max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 shadow-2xl backdrop-blur-xl"
          >
            <h3 className="text-xl sm:text-2xl font-black text-white text-center mb-1.5">
              আপনার বকেয়া বিল অনুসন্ধান করুন
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 text-center mb-6 sm:mb-8 font-light">
              আপনার কাস্টমার আইডি (যেমন: LBD-1049) অথবা রেজিস্টার্ড মোবাইল নম্বর প্রদান করুন
            </p>

            <form onSubmit={handleQueryBill} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <input
                type="text"
                required
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="কাস্টমার আইডি / মোবাইল নম্বর..."
                className="flex-1 px-4 py-3 sm:py-3.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:to-pink-500 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>যাচাই হচ্ছে...</span>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>বিল দেখুন</span>
                  </>
                )}
              </button>
            </form>

            {/* Bill Statement Card */}
            {billData && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 sm:p-6 rounded-2xl bg-slate-950 border border-purple-500/40 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800 gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-800">
                      ID: {billData.id}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">{billData.name}</h4>
                    <p className="text-xs text-slate-400">{billData.package}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400">বিলিং মাস: {billData.month}</span>
                    <div className="text-2xl font-black text-pink-400">৳{billData.amount}</div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-amber-400 w-full sm:w-auto">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>লাস্ট ডেট: {billData.dueDate}</span>
                  </div>

                  {!paid ? (
                    <button
                      onClick={handlePayNow}
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition cursor-pointer text-center"
                    >
                      💳 এখনই পেমেন্ট সম্পন্ন করুন
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                      পেমেন্ট সফলভাবে গৃহীত হয়েছে!
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Step-by-Step Payment Instructions Tabs */}
        <div className="max-w-4xl mx-auto mb-14 sm:mb-20">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              মোবাইল ব্যাংকিং পেমেন্ট গাইড
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              অ্যাপ অথবা ইউএসএসডি (USSD) কোডের মাধ্যমে বিল পরিশোধের সহজ নিয়ম
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6 max-w-sm mx-auto">
            <button
              onClick={() => setActiveTab("bkash")}
              className={`py-2.5 rounded-xl text-xs font-bold transition text-center cursor-pointer ${
                activeTab === "bkash" ? "bg-pink-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:bg-slate-800"
              }`}
            >
              bKash পেমেন্ট
            </button>
            <button
              onClick={() => setActiveTab("nagad")}
              className={`py-2.5 rounded-xl text-xs font-bold transition text-center cursor-pointer ${
                activeTab === "nagad" ? "bg-orange-600 text-white shadow-lg" : "bg-slate-900 text-slate-400 hover:bg-slate-800"
              }`}
            >
              Nagad পেমেন্ট
            </button>
          </div>

          <div className="p-5 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800">
            {activeTab === "bkash" ? (
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <p className="font-bold text-pink-400 mb-2">bKash মার্চেন্ট পেমেন্ট ধাপসমূহ:</p>
                <div className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-pink-900/60 text-pink-300 flex items-center justify-center text-xs font-bold shrink-0">১</span><span>bKash অ্যাপ ওপেন করে 'Make Payment' অপশনে যান।</span></div>
                <div className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-pink-900/60 text-pink-300 flex items-center justify-center text-xs font-bold shrink-0">২</span><span>আমাদের মার্চেন্ট নম্বর দিন: <strong>01995648616</strong></span></div>
                <div className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-pink-900/60 text-pink-300 flex items-center justify-center text-xs font-bold shrink-0">৩</span><span>আপনার মাসিক প্যাকেজ অনুযায়ী টাকার পরিমাণ লিখুন।</span></div>
                <div className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-pink-900/60 text-pink-300 flex items-center justify-center text-xs font-bold shrink-0">৪</span><span>রেফারেন্সে আপনার কাস্টমার আইডি লিখুন এবং পিন দিয়ে কনফার্ম করুন।</span></div>
              </div>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <p className="font-bold text-orange-400 mb-2">Nagad মার্চেন্ট পেমেন্ট ধাপসমূহ:</p>
                <div className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-orange-900/60 text-orange-300 flex items-center justify-center text-xs font-bold shrink-0">১</span><span>নগদ অ্যাপ ওপেন করে 'মার্চেন্ট পে' সিলেক্ট করুন।</span></div>
                <div className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-orange-900/60 text-orange-300 flex items-center justify-center text-xs font-bold shrink-0">২</span><span>মার্চেন্ট অ্যাকাউন্ট দিন: <strong>01995648616</strong></span></div>
                <div className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-orange-900/60 text-orange-300 flex items-center justify-center text-xs font-bold shrink-0">৩</span><span>টাকার পরিমাণ লিখুন এবং রেফারেন্সে কাস্টমার আইডি দিন।</span></div>
                <div className="flex gap-2.5"><span className="w-5 h-5 rounded-full bg-orange-900/60 text-orange-300 flex items-center justify-center text-xs font-bold shrink-0">৪</span><span>পিন নম্বর দিয়ে ট্যাপ করে ধরে রাখুন।</span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
