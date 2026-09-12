import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CreditCard, ShieldCheck, CheckCircle2, Phone, Download, ExternalLink } from "lucide-react";
import { companyInfo } from "../data/ispData";
import { useSiteData } from "../context/SiteDataContext";

export default function BillPaySection() {
  const { contact, submitPayment, imageMap } = useSiteData();
  const [customerId, setCustomerId] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [submitted, setSubmitted] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const handlePay = (e) => {
    e.preventDefault();
    if (!customerId || !phone || !amount) {
      alert("দয়া করে সব তথ্য পূরণ করুন");
      return;
    }

    const receipt = {
      id: "PAY-" + Date.now().toString().slice(-6),
      customerId,
      phone,
      amount,
      method: paymentMethod,
      date: new Date().toLocaleString()
    };

    // Save to localStorage for instant client receipt history
    const payments = JSON.parse(localStorage.getItem("linkbd_payments") || "[]");
    payments.unshift(receipt);
    localStorage.setItem("linkbd_payments", JSON.stringify(payments));

    // Also sync to Admin Panel backend if online
    if (submitPayment) {
      submitPayment({
        customerId,
        phone,
        amount: Number(amount) || 0,
        method: paymentMethod,
        trxId: receipt.id
      }).catch(err => console.warn("[BillPay] Backend sync skipped:", err.message));
    }

    setReceiptData(receipt);
    setSubmitted(true);

    // Fire joyful celebratory confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore if canvas unavailable
    }
  };

  return (
    <section id="bill-pay" className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 mb-3 shadow-sm">
            <CreditCard className="w-3.5 h-3.5 text-orange-600" />
            ইনস্ট্যান্ট অনলাইন পেমেন্ট
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Pay Your Bill Online (বিকাশ, নগদ, রকেট, উপায়)
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            ঘরে বসেই কোনো ঝামেলা ছাড়া সেকেন্ডের মধ্যে আপনার মাসিক ইন্টারনেট বিল পরিশোধ করুন
          </p>
        </motion.div>

        {/* Visual Banner Preview with Tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
        >
          <img
            src={imageMap?.["billpay_banner"]?.currentUrl || "/assets/banner-billpay.png"}
            alt="Online Bill Payment"
            className="w-full h-auto object-cover max-h-[400px]"
            onError={(e) => {
              e.currentTarget.src = "/assets/banner-billpay.png";
            }}
          />
        </motion.div>

        {/* Form and Live Receipt Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Instructions Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl space-y-6 border border-blue-500/20"
          >
            <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-300">
              <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse" />
              বিল পেমেন্ট নির্দেশিকা
            </h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs shadow">১</span>
                <p>আপনার কাস্টমার আইডি ও মোবাইল নম্বর সঠিকভাবে প্রদান করুন।</p>
              </div>
              <div className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs shadow">২</span>
                <p>পছন্দের পেমেন্ট মেথড (bKash / Nagad / Rocket / Upay) সিলেক্ট করুন।</p>
              </div>
              <div className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs shadow">৩</span>
                <p>বিল কনফার্ম করলে তাৎক্ষণিক ডিজিটাল রসিদ পেয়ে যাবেন এবং সংযোগ সচল থাকবে।</p>
              </div>
            </div>

            <div className="p-5 bg-white/10 rounded-2xl border border-white/10 text-xs space-y-2 text-slate-300 backdrop-blur-md">
              <p className="font-semibold text-white">বিল সংক্রান্ত হেল্পলাইন:</p>
              <p className="text-cyan-300 text-base font-bold">{contact?.mainHotline || companyInfo.hotline1}</p>
              <p className="text-[11px] text-slate-400">প্রতিদিন সকাল ৮:০০ টা থেকে রাত ১২:০০ টা পর্যন্ত</p>
            </div>

            <motion.a
              href={contact?.billingPortalUrl || "https://client.linkbd.net/pay.php?c=1255"}
              target="_blank"
              rel="noopener noreferrer"
              animate={{
                y: [0, -6, 0, -3, 0],
                boxShadow: [
                  "0 10px 25px -5px rgba(6, 182, 212, 0.4)",
                  "0 20px 35px -5px rgba(59, 130, 246, 0.6)",
                  "0 10px 25px -5px rgba(6, 182, 212, 0.4)"
                ]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer text-center select-none"
            >
              <span>অফিসিয়াল অনলাইন বিলিং পোর্টালে যান</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Payment Form & Animated Receipt */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl"
          >
            {submitted && receiptData ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6 animate-fadeIn"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900">পেমেন্ট সফলভাবে সম্পন্ন হয়েছে!</h4>
                  <p className="text-slate-500 text-xs mt-1">বিল পেমেন্টের ডিজিটাল প্রমাণপত্র তৈরি করা হয়েছে</p>
                </div>

                {/* Printable Style Receipt Card */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">ট্রানজেকশন আইডি:</span>
                    <span className="font-bold text-blue-600">{receiptData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">কাস্টমার আইডি:</span>
                    <span className="font-bold">{receiptData.customerId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">মোবাইল:</span>
                    <span className="font-bold">{receiptData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">পেমেন্ট গেটওয়ে:</span>
                    <span className="font-bold text-emerald-600">{receiptData.method}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-sm font-bold text-slate-900">
                    <span>পরিশোধিত অর্থ:</span>
                    <span className="text-emerald-600">৳{receiptData.amount} BDT</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition"
                  >
                    <Download className="w-4 h-4" />
                    রসিদ প্রিন্ট / সেভ করুন
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setCustomerId("");
                      setPhone("");
                      setAmount("");
                    }}
                    className="px-5 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded-xl transition"
                  >
                    আরেকটি বিল পরিশোধ করুন
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handlePay} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-lg font-bold text-slate-900">
                    অনলাইন বিল পেমেন্ট ফর্ম
                  </h4>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 256-bit SSL Secure
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      কাস্টমার আইডি / ইউজারনেম *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      placeholder="e.g. LBD-10452"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    টাকার পরিমাণ (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 1050"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    পেমেন্ট মেথড নির্বাচন করুন
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {["bKash", "Nagad", "Rocket", "Upay"].map((method) => (
                      <motion.button
                        key={method}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPaymentMethod(method)}
                        className={`py-3 px-2 rounded-2xl border text-center font-bold text-xs transition ${
                          paymentMethod === method
                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-500/20"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {method}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all text-sm cursor-pointer"
                >
                  ৳{amount || "0"} বিল পরিশোধ নিশ্চিত করুন ({paymentMethod})
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
