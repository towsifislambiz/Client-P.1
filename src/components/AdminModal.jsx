import React, { useState, useEffect } from "react";
import { X, ShieldAlert, Users, CreditCard, RefreshCw, Trash2 } from "lucide-react";

export default function AdminModal({ isOpen, onClose }) {
  const [tab, setTab] = useState("inquiries");
  const [inquiries, setInquiries] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    const inq = JSON.parse(localStorage.getItem("linkbd_inquiries") || "[]");
    const pay = JSON.parse(localStorage.getItem("linkbd_payments") || "[]");
    setInquiries(inq);
    setPayments(pay);
  };

  const clearData = () => {
    if (window.confirm("আপনি কি সব ডেমো ডেটা মুছে ফেলতে চান?")) {
      localStorage.removeItem("linkbd_inquiries");
      localStorage.removeItem("linkbd_payments");
      loadData();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-bold text-slate-900">Link BD Admin Center</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">সংযোগ রিকোয়েস্ট ও বিল ট্র্যাকিং ড্যাশবোর্ড</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 py-3 border-b border-slate-100">
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => setTab("inquiries")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                tab === "inquiries" ? "bg-blue-600 text-white shadow" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              আবেদন ({inquiries.length})
            </button>
            <button
              onClick={() => setTab("payments")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                tab === "payments" ? "bg-blue-600 text-white shadow" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              পেমেন্ট ({payments.length})
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={loadData}
              className="p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">রিফ্রেশ</span>
            </button>
            <button
              onClick={clearData}
              className="p-1.5 sm:p-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">ক্লিয়ার</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-y-auto py-3">
          {tab === "inquiries" ? (
            inquiries.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
                এখনো কোনো নতুন সংযোগের আবেদন আসেনি। ওয়েবসাইটে টেস্ট রিকোয়েস্ট সাবমিট করুন।
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[540px]">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold">
                    <tr>
                      <th className="p-2.5">আইডি</th>
                      <th className="p-2.5">নাম</th>
                      <th className="p-2.5">মোবাইল</th>
                      <th className="p-2.5">প্যাকেজ</th>
                      <th className="p-2.5">টাইপ</th>
                      <th className="p-2.5">ঠিকানা</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-mono font-bold text-blue-600">{item.id}</td>
                        <td className="p-2.5 font-semibold text-slate-900">{item.name}</td>
                        <td className="p-2.5 text-slate-600">{item.phone}</td>
                        <td className="p-2.5 text-cyan-600 font-bold">{item.package}</td>
                        <td className="p-2.5 text-slate-500">{item.type}</td>
                        <td className="p-2.5 text-slate-600 text-[11px] max-w-xs truncate">{item.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : payments.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
              এখনো কোনো বিল পেমেন্ট রেকর্ড নেই।
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-slate-50 text-slate-600 uppercase font-bold">
                  <tr>
                    <th className="p-2.5">আইডি</th>
                    <th className="p-2.5">কাস্টমার</th>
                    <th className="p-2.5">পরিমাণ</th>
                    <th className="p-2.5">তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono font-bold text-emerald-600">{p.id}</td>
                      <td className="p-2.5 font-semibold text-slate-900">{p.customerId || p.name || p.phone || "N/A"}</td>
                      <td className="p-2.5 font-bold text-slate-900">৳{p.amount}</td>
                      <td className="p-2.5 text-slate-500 text-[11px]">{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
