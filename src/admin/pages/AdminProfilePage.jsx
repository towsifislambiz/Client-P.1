// src/admin/pages/AdminProfilePage.jsx
// Comprehensive Admin Profile, Username, and Password Management Console

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  KeyRound,
  ShieldCheck,
  Check,
  Eye,
  EyeOff,
  AlertCircle,
  Save,
  Clock,
  Sparkles,
  ShieldAlert,
  UserCheck
} from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";
import ToastNotification from "../components/ToastNotification";

export default function AdminProfilePage() {
  const { adminUser, updateCredentials, isBackendOnline, isBackendChecked } = useSiteData();
  const [toast, setToast] = useState(null);

  // Profile Information State
  const [name, setName] = useState(adminUser?.name || "Admin");
  const [username, setUsername] = useState(adminUser?.username || adminUser?.email || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Sync state if adminUser loads or updates
  useEffect(() => {
    if (adminUser) {
      if (adminUser.name) setName(adminUser.name);
      if (adminUser.username || adminUser.email) setUsername(adminUser.username || adminUser.email);
    }
  }, [adminUser]);

  // Password Strength Calculation
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, text: "", color: "bg-slate-700" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score: 1, text: "দুর্বল (Weak)", color: "bg-rose-500" };
    if (score <= 4) return { score: 2, text: "মাঝারি (Medium)", color: "bg-amber-500" };
    return { score: 3, text: "শক্তিশালী (Strong)", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(newPassword);

  // Handle Profile (Name & Username) Update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setToast({
        type: "error",
        title: "ইউজারনেম আবশ্যক",
        message: "অ্যাডমিন ইউজারনেম বা ইমেইল ফাঁকা রাখা যাবে না।"
      });
      return;
    }

    setIsSavingProfile(true);
    try {
      const res = await updateCredentials({
        name: name.trim(),
        username: username.trim(),
        email: username.trim()
      });

      setToast({
        type: "success",
        title: "প্রোফাইল সংরক্ষিত",
        message: "অ্যাডমিন ইউজারনেম ও তথ্য সফলভাবে আপডেট করা হয়েছে।"
      });
    } catch (err) {
      setToast({
        type: "error",
        title: "আপডেট ব্যর্থ",
        message: err.message || "প্রোফাইল আপডেট করা যায়নি।"
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle Password Change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setToast({
        type: "error",
        title: "পাসওয়ার্ড দিন",
        message: "অনুগ্রহ করে নতুন পাসওয়ার্ড প্রদান করুন।"
      });
      return;
    }

    if (newPassword.length < 6) {
      setToast({
        type: "error",
        title: "পাসওয়ার্ড ছোট",
        message: "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setToast({
        type: "error",
        title: "পাসওয়ার্ড মেলেনি",
        message: "নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড একই হতে হবে।"
      });
      return;
    }

    setIsSavingPassword(true);
    try {
      const res = await updateCredentials({
        name: name.trim(),
        username: username.trim(),
        email: username.trim(),
        currentPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
        confirmPassword: confirmPassword.trim()
      });

      setToast({
        type: "success",
        title: "পাসওয়ার্ড পরিবর্তিত",
        message: "আপনার নতুন পাসওয়ার্ড সফলভাবে সক্রিয় করা হয়েছে।"
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setToast({
        type: "error",
        title: "পাসওয়ার্ড পরিবর্তন ব্যর্থ",
        message: err.message || "পাসওয়ার্ড পরিবর্তন করা সম্ভব হয়নি।"
      });
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-cyan-400" />
            অ্যাডমিন প্রোফাইল ও নিরাপত্তা সেটিংস
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            প্যানেলের ইউজারনেম, ব্যক্তিগত তথ্য এবং লগইন পাসওয়ার্ড সম্পূর্ণভাবে এখান থেকেই পরিবর্তন ও নিয়ন্ত্রণ করুন।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Profile Overview Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-600/15 blur-[60px] rounded-full pointer-events-none" />

            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-1 shadow-xl shadow-blue-500/20 mx-auto">
                <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-blue-400">
                    {(name && name[0] ? name[0] : "H").toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-emerald-500 text-white shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Name & Role */}
            <h2 className="text-lg font-black text-white">{name || "Hasan"}</h2>
            <p className="text-xs text-cyan-400 font-mono mt-0.5">{username}</p>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>সুপার অ্যাডমিনিস্ট্রেটর</span>
            </div>

            {/* Account Details Specs */}
            <div className="mt-6 pt-5 border-t border-slate-800 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">অ্যাকাউন্ট স্ট্যাটাস</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  সক্রিয় ও সুরক্ষিত
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">সার্ভার সংযোগ</span>
                <span className={`font-semibold ${isBackendOnline ? "text-emerald-400" : isBackendChecked ? "text-cyan-400" : "text-amber-400"}`}>
                  {isBackendOnline ? "Online (Node.js API)" : isBackendChecked ? "Active (Host Standalone CMS)" : "Connecting..."}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">নিরাপত্তা স্তর</span>
                <span className="text-slate-200 font-semibold font-mono">Bcrypt Salt + JWT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">সর্বশেষ লগইন</span>
                <span className="text-slate-300 text-[11px] font-mono">
                  {adminUser?.lastLogin ? new Date(adminUser.lastLogin).toLocaleDateString("bn-BD") : "আজ"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Security Tips Banner */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>নিরাপত্তা পরামর্শ</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              ইউজারনেম বা পাসওয়ার্ড পরিবর্তন করার সাথে সাথে পুরো সিস্টেমে তা অবিলম্বে কার্যকর হয়। নতুন তথ্য দিয়ে পরবর্তীতে লগইন নিশ্চিত করুন।
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Profile & Password Forms (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* CARD 1: Edit Profile & Username */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">অ্যাডমিন প্রোফাইল ও ইউজারনেম পরিবর্তন</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  লগইন করার ইউজারনেম এবং অ্যাডমিনের প্রদর্শিত নাম এখান থেকে পরিবর্তন করতে পারবেন।
                </p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>অ্যাডমিনের পুরো নাম</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="অ্যাডমিনের নাম লিখুন"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Username / Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>অ্যাডমিন ইউজারনেম / ইমেইল *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ইউজারনেম বা ইমেইল লিখুন"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-slate-500">
                  বর্তমান লগইন আইডি: <code className="text-cyan-400 font-mono">{username}</code>
                </p>

                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSavingProfile ? (
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>প্রোফাইল তথ্য সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>

          {/* CARD 2: Change Password */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">অ্যাডমিন পাসওয়ার্ড পরিবর্তন</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  প্যানেলের নিরাপত্তা বৃদ্ধির জন্য নিয়মিত পাসওয়ার্ড পরিবর্তন করুন। পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>বর্তমান পাসওয়ার্ড (ঐচ্ছিক / যাচাইয়ের জন্য)</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="বর্তমান পাসওয়ার্ড লিখুন"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* New Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                    <span>নতুন পাসওয়ার্ড *</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="নতুন পাসওয়ার্ড লিখুন"
                      className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden flex gap-1">
                        <div className={`h-full flex-1 ${strength.score >= 1 ? strength.color : "bg-slate-800"}`} />
                        <div className={`h-full flex-1 ${strength.score >= 2 ? strength.color : "bg-slate-800"}`} />
                        <div className={`h-full flex-1 ${strength.score >= 3 ? strength.color : "bg-slate-800"}`} />
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{strength.text}</span>
                    </div>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>কনফার্ম নতুন পাসওয়ার্ড *</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="পুনরায় পাসওয়ার্ডটি লিখুন"
                      className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> পাসওয়ার্ড মেলেনি
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingPassword || !newPassword || newPassword !== confirmPassword}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSavingPassword ? (
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>পাসওয়ার্ড পরিবর্তন করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

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
