// src/admin/pages/AdminSettingsPage.jsx
// Security Settings, Backups, and CRM Customer Leads Viewer

import React, { useState, useEffect } from "react";
import {
  Settings,
  Lock,
  Database,
  Users,
  CreditCard,
  Download,
  RotateCcw,
  Check,
  Shield,
  KeyRound,
  RefreshCw,
  PhoneCall
} from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";
import ToastNotification from "../components/ToastNotification";

export default function AdminSettingsPage() {
  const { adminUser, updateCredentials, token } = useSiteData();
  const [toast, setToast] = useState(null);

  // Password Change State
  const [email, setEmail] = useState(adminUser?.email || "admin@linkbd.net");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Backups State
  const [backups, setBackups] = useState([]);
  const [isLoadingBackups, setIsLoadingBackups] = useState(false);

  // Leads & Payments State
  const [activeTab, setActiveTab] = useState("inquiries");
  const [inquiries, setInquiries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoadingCrm, setIsLoadingCrm] = useState(false);

  const fetchBackups = async () => {
    setIsLoadingBackups(true);
    try {
      const res = await fetch("/api/settings/backups", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setBackups(data.data || []);
    } catch {
      // ignore
    } finally {
      setIsLoadingBackups(false);
    }
  };

  const handleCreateBackup = async () => {
    try {
      const res = await fetch("/api/settings/backups", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setToast({
          type: "success",
          title: "ব্যাকআপ তৈরি সম্পন্ন",
          message: data.message
        });
        fetchBackups();
      }
    } catch (err) {
      setToast({ type: "error", title: "ব্যাকআপ ব্যর্থ", message: err.message });
    }
  };

  const handleRestoreBackup = async (filename) => {
    if (!window.confirm(`আপনি কি "${filename}" ব্যাকআপ ফাইলটি থেকে সম্পূর্ণ ডেটাবেজ রিস্টোর করতে চান?`)) return;
    try {
      const res = await fetch("/api/settings/backups/restore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ filename })
      });
      const data = await res.json();
      if (data.success) {
        setToast({
          type: "success",
          title: "রিস্টোর সম্পন্ন",
          message: data.message
        });
        setTimeout(() => window.location.reload(), 1200);
      }
    } catch (err) {
      setToast({ type: "error", title: "রিস্টোর ব্যর্থ", message: err.message });
    }
  };

  const fetchCrmData = async () => {
    setIsLoadingCrm(true);
    try {
      const [inqRes, payRes] = await Promise.all([
        fetch("/api/settings/inquiries", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/settings/payments", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const [inqData, payData] = await Promise.all([inqRes.json(), payRes.json()]);
      if (inqData.success) setInquiries(inqData.data || []);
      if (payData.success) setPayments(payData.data || []);
    } catch {
      // fallback
    } finally {
      setIsLoadingCrm(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBackups();
      fetchCrmData();
    }
  }, [token]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword.length < 6) {
      setToast({ type: "error", title: "পাসওয়ার্ড ছোট", message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" });
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setToast({ type: "error", title: "পাসওয়ার্ড মেলেনি", message: "নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড একই হতে হবে।" });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await updateCredentials(email, newPassword, confirmPassword);
      setToast({
        type: "success",
        title: "ক্রেডেনশিয়াল আপডেট সম্পন্ন",
        message: res.message || "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।"
      });
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setToast({ type: "error", title: "আপডেট ব্যর্থ", message: err.message });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-cyan-400" />
            সেটিংস, ব্যাকআপ ও গ্রাহকদের রেকর্ড
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            অ্যাডমিন পাসওয়ার্ড পরিবর্তন, ডাটাবেজ ব্যাকআপ এবং ওয়েবসাইট থেকে জমা হওয়া আবেদন ও বিল রেকর্ড দেখুন।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. PASSWORD & SECURITY CARD */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4 text-white font-bold text-base">
              <KeyRound className="w-5 h-5 text-cyan-400" />
              <span>অ্যাডমিন নিরাপত্তা ও পাসওয়ার্ড পরিবর্তন</span>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  অ্যাডমিন ইমেইল / ইউজারনেম
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  নতুন পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  কনফার্ম নতুন পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  placeholder="পুনরায় পাসওয়ার্ডটি লিখুন"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdatingPassword || (!newPassword && email === adminUser?.email)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isUpdatingPassword ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                পাসওয়ার্ড পরিবর্তন করুন
              </button>
            </form>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>পাসওয়ার্ডটি সার্ভারে Bcrypt সল্ট দিয়ে নিরাপদে হ্যাশ করে সেভ হবে।</span>
          </div>
        </div>

        {/* 2. DATABASE BACKUP & RECOVERY */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Database className="w-5 h-5 text-cyan-400" />
                <span>ডেটাবেজ ব্যাকআপ ও রিস্টোর</span>
              </div>

              <button
                onClick={handleCreateBackup}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>নতুন ব্যাকআপ তৈরি</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              যেকোনো বড় পরিবর্তনের আগে সিস্টেম স্বয়ংক্রিয়ভাবে ব্যাকআপ সংরক্ষণ করে। আপনি চাইলে যেকোনো পূর্বের পয়েন্টে রিস্টোর করতে পারেন:
            </p>

            <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
              {backups.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs">
                  এখনো কোনো ম্যানুয়াল ব্যাকআপ নেই।
                </div>
              ) : (
                backups.map((b) => (
                  <div
                    key={b.filename}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-slate-200 truncate">{b.filename}</p>
                      <span className="text-[10px] text-slate-500">
                        {new Date(b.createdAt).toLocaleString()} • {(b.size / 1024).toFixed(1)} KB
                      </span>
                    </div>

                    <button
                      onClick={() => handleRestoreBackup(b.filename)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-[11px] shrink-0 cursor-pointer"
                      title="এই ব্যাকআপটি রিস্টোর করুন"
                    >
                      রিস্টোর
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-500">
            ফাইল পারসিস্টেন্স: <code className="text-cyan-400">server/data/db.json</code>
          </div>
        </div>
      </div>

      {/* 3. CUSTOMER INQUIRIES & BILL PAY CRM RECORDS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              সংযোগ আবেদন ({inquiries.length})
            </button>

            <button
              onClick={() => setActiveTab("payments")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === "payments"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              বিল পরিশোধ রেকর্ড ({payments.length})
            </button>
          </div>

          <button
            onClick={fetchCrmData}
            disabled={isLoadingCrm}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 text-xs flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCrm ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">রিফ্রেশ</span>
          </button>
        </div>

        {activeTab === "inquiries" ? (
          inquiries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs sm:text-sm">
              এখনো কোনো নতুন সংযোগ আবেদন আসেনি।
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">আইডি</th>
                    <th className="p-3">নাম</th>
                    <th className="p-3">মোবাইল</th>
                    <th className="p-3">প্যাকেজ</th>
                    <th className="p-3">ঠিকানা</th>
                    <th className="p-3">তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-cyan-400">{inq.id}</td>
                      <td className="p-3 font-semibold text-white">{inq.name || "N/A"}</td>
                      <td className="p-3 text-slate-300 font-mono">{inq.phone}</td>
                      <td className="p-3 text-blue-400 font-bold">{inq.package || "Custom"}</td>
                      <td className="p-3 text-slate-400 truncate max-w-xs">{inq.address || "N/A"}</td>
                      <td className="p-3 text-slate-500 text-[11px] whitespace-nowrap">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : payments.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs sm:text-sm">
            এখনো কোনো বিল পেমেন্ট তথ্য জমা হয়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">আইডি</th>
                  <th className="p-3">গ্রাহক/ফোন</th>
                  <th className="p-3">টাকার পরিমাণ</th>
                  <th className="p-3">মেথড / TrxID</th>
                  <th className="p-3">তারিখ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {payments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-emerald-400">{pay.id}</td>
                    <td className="p-3 font-semibold text-white">{pay.customerId || pay.phone}</td>
                    <td className="p-3 font-bold text-emerald-300">৳{pay.amount}</td>
                    <td className="p-3 text-slate-300 font-mono">{pay.method || "bKash"} • {pay.trxId || "N/A"}</td>
                    <td className="p-3 text-slate-500 text-[11px] whitespace-nowrap">
                      {pay.createdAt ? new Date(pay.createdAt).toLocaleDateString() : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
