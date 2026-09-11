// src/admin/pages/AdminSettingsPage.jsx
// Security Settings, Backups, Bill Payment Portal Links, and CRM Customer Leads Viewer

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  PhoneCall,
  ExternalLink,
  Sparkles,
  Link as LinkIcon
} from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";
import ToastNotification from "../components/ToastNotification";

export default function AdminSettingsPage() {
  const { adminUser, updateCredentials, token, contact, updateGlobalContact } = useSiteData();
  const [toast, setToast] = useState(null);

  // Billing Portal Link State
  const [billingPortalUrl, setBillingPortalUrl] = useState(
    contact?.billingPortalUrl || "https://client.linkbd.net/pay.php?c=1255"
  );
  const [billingHelpline, setBillingHelpline] = useState(
    contact?.billingHelpline || "01995648616"
  );
  const [isSavingBilling, setIsSavingBilling] = useState(false);

  // Password Change State
  const [email, setEmail] = useState(adminUser?.username || adminUser?.email || "");
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

  useEffect(() => {
    if (contact?.billingPortalUrl) setBillingPortalUrl(contact.billingPortalUrl);
    if (contact?.billingHelpline) setBillingHelpline(contact.billingHelpline);
  }, [contact]);

  const handleSaveBillingPortal = async (e) => {
    e.preventDefault();
    if (!billingPortalUrl.trim()) {
      setToast({
        type: "error",
        title: "লিংক আবশ্যক",
        message: "বিল পেমেন্ট পোর্টাল লিঙ্ক ফাঁকা রাখা যাবে না।"
      });
      return;
    }

    setIsSavingBilling(true);
    try {
      await updateGlobalContact({
        billingPortalUrl: billingPortalUrl.trim(),
        billingHelpline: billingHelpline.trim()
      });
      setToast({
        type: "success",
        title: "বিল পেমেন্ট লিংক সংরক্ষিত",
        message: "অনলাইন বিল পেমেন্ট লিংক সফলভাবে আপডেট হয়েছে। পুরো ওয়েবসাইটের বাটনে অবিলম্বে কার্যকর হয়েছে।"
      });
    } catch (err) {
      setToast({
        type: "error",
        title: "আপডেট ব্যর্থ",
        message: err.message
      });
    } finally {
      setIsSavingBilling(false);
    }
  };

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
            অনলাইন বিল পেমেন্ট লিংক কন্ট্রোল, অ্যাডমিন পাসওয়ার্ড পরিবর্তন, ডাটাবেজ ব্যাকআপ এবং ওয়েবসাইট থেকে জমা হওয়া গ্রাহকদের রেকর্ড।
          </p>
        </div>
      </div>

      {/* 1. ONLINE BILL PAYMENT PORTAL LINK MANAGEMENT (Prominent Control Card) */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                অনলাইন বিল পেমেন্ট পোর্টাল লিংক ও সেটিংস
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full">
                  Live Control
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                ওয়েবসাইটের বিল পে বাটনে ক্লিক করলে গ্রাহককে যে লিংকে নিয়ে যাওয়া হবে তা এখান থেকে পরিচালনা করুন।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={billingPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
              title="বর্তমান লিঙ্কটি ব্রাউজারে টেস্ট করুন"
            >
              <span>বর্তমান লিঙ্ক টেস্ট করুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <form onSubmit={handleSaveBillingPortal} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Payment URL Input */}
            <div className="lg:col-span-8">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>বিল পেমেন্ট পোর্টাল লিঙ্ক (Customer Payment URL) *</span>
              </label>
              <input
                type="url"
                required
                value={billingPortalUrl}
                onChange={(e) => setBillingPortalUrl(e.target.value)}
                placeholder="https://client.linkbd.net/pay.php?c=1255"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono transition"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                যেমন: <code className="text-cyan-300">https://client.linkbd.net/pay.php?c=1255</code>
              </p>
            </div>

            {/* Helpline Input */}
            <div className="lg:col-span-4">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>বিলিং হেল্পলাইন নম্বর</span>
              </label>
              <input
                type="text"
                value={billingHelpline}
                onChange={(e) => setBillingHelpline(e.target.value)}
                placeholder="01995648616"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono transition"
              />
              <p className="text-[11px] text-slate-400 mt-1">বিল পেমেন্ট পেজে সাপোর্ট নম্বর হিসেবে প্রদর্শিত হবে।</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setBillingPortalUrl("https://client.linkbd.net/pay.php?c=1255");
                setBillingHelpline("01995648616");
                setToast({
                  type: "info",
                  title: "ডিফল্ট মান লোড হয়েছে",
                  message: "কার্যকর করতে নিচের 'সংরক্ষণ করুন' বাটনে চাপুন।"
                });
              }}
              className="text-xs text-slate-400 hover:text-cyan-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>লিংক বিডি আসল পেমেন্ট লিঙ্কে রিসেট করুন</span>
            </button>

            <button
              type="submit"
              disabled={isSavingBilling}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSavingBilling ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>বিল পেমেন্ট লিংক পরিবর্তন সংরক্ষণ করুন</span>
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. PASSWORD & SECURITY CARD */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <KeyRound className="w-5 h-5 text-cyan-400" />
                <span>অ্যাডমিন নিরাপত্তা ও পাসওয়ার্ড পরিবর্তন</span>
              </div>
              <Link
                to="/admin/profile"
                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-1 rounded-lg"
              >
                প্রোফাইল পেজ &rarr;
              </Link>
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

        {/* 3. DATABASE BACKUP & RECOVERY */}
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
              {isLoadingBackups ? (
                <div className="text-center py-6 text-xs text-slate-500">লোড হচ্ছে...</div>
              ) : backups.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">কোনো ব্যাকআপ ফাইল নেই</div>
              ) : (
                backups.map((b) => (
                  <div
                    key={b.filename}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-200 font-mono">{b.filename}</p>
                      <p className="text-[10px] text-slate-500">{new Date(b.created).toLocaleString()}</p>
                    </div>

                    <button
                      onClick={() => handleRestoreBackup(b.filename)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-amber-500/30"
                      title="এই ব্যাকআপে রিস্টোর করুন"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>রিস্টোর</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>স্বয়ংক্রিয় সেভ পয়েন্ট: db.json ফাইল নিরাপদ ব্যাকআপ ফোল্ডারে সংরক্ষিত হয়।</span>
          </div>
        </div>
      </div>

      {/* 4. CRM INQUIRIES & PAYMENTS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">
              গ্রাহক অনুসন্ধান ও অনলাইন ট্রানজাকশন রেকর্ড
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              সংযোগ আবেদন ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "payments"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              পেমেন্ট রেকর্ড ({payments.length})
            </button>
          </div>
        </div>

        {/* Inquiries Table */}
        {activeTab === "inquiries" && (
          <div className="overflow-x-auto">
            {inquiries.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">
                এখনো কোনো নতুন সংযোগের আবেদন জমা পড়েনি।
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">তারিখ</th>
                    <th className="pb-3 font-semibold">গ্রাহকের নাম</th>
                    <th className="pb-3 font-semibold">ফোন নম্বর</th>
                    <th className="pb-3 font-semibold">প্যাকেজ</th>
                    <th className="pb-3 font-semibold">ঠিকানা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 text-slate-400">{new Date(inq.createdAt || inq.timestamp).toLocaleDateString()}</td>
                      <td className="py-3 font-bold text-white">{inq.name}</td>
                      <td className="py-3 font-mono text-cyan-300">
                        <a href={`tel:${inq.phone}`} className="hover:underline flex items-center gap-1">
                          <PhoneCall className="w-3 h-3" />
                          {inq.phone}
                        </a>
                      </td>
                      <td className="py-3 text-slate-300">{inq.package || inq.packageName || "N/A"}</td>
                      <td className="py-3 text-slate-400">{inq.address || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Payments Table */}
        {activeTab === "payments" && (
          <div className="overflow-x-auto">
            {payments.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">
                এখনো কোনো অনলাইন বিল পেমেন্ট রেকর্ড জমা পড়েনি।
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">তারিখ</th>
                    <th className="pb-3 font-semibold">কাস্টমার আইডি</th>
                    <th className="pb-3 font-semibold">মোবাইল নম্বর</th>
                    <th className="pb-3 font-semibold">টাকার পরিমাণ</th>
                    <th className="pb-3 font-semibold">মেথড</th>
                    <th className="pb-3 font-semibold">ট্রানজাকশন আইডি</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {payments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 text-slate-400">{new Date(pay.createdAt || pay.timestamp).toLocaleString()}</td>
                      <td className="py-3 font-bold text-white font-mono">{pay.customerId}</td>
                      <td className="py-3 text-slate-300 font-mono">{pay.phone}</td>
                      <td className="py-3 font-bold text-emerald-400">৳{pay.amount}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-cyan-300 border border-blue-500/30">
                          {pay.method}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-slate-400">{pay.trxId || pay.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
