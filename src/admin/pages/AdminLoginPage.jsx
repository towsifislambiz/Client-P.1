// src/admin/pages/AdminLoginPage.jsx
// Secure Admin Login Portal with Password Visibility, Validation, and Rate Limit Handling

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Home } from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated, branding } = useSiteData();
  const navigate = useNavigate();

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("ইমেইল ও পাসওয়ার্ড প্রদান করুন");
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/admin");
      } else {
        setErrorMessage(result.message || "লগইন ব্যর্থ হয়েছে");
      }
    } catch (err) {
      setErrorMessage(err.message || "সার্ভার এরর");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Back to Public Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800"
      >
        <Home className="w-3.5 h-3.5 text-cyan-400" />
        <span>ওয়েবসাইটে ফিরে যান</span>
      </Link>

      <div className="max-w-md w-full relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-3">
            <img
              src={branding.navbarLogo || "/assets/logo.png"}
              alt="Link BD"
              className="h-10 sm:h-12 w-auto mx-auto object-contain"
            />
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            অ্যাডমিন লগইন পোর্টাল
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Link BD Content Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Username */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                অ্যাডমিন ইমেইল / ইউজারনেম
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@linkbd.net"
                  autoComplete="username"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>যাচাই করা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <span>লগইন করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Setup Credential Hint */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-500">
              ডিফল্ট অ্যাডমিন ক্রেডেনশিয়াল: <code className="text-cyan-400 font-mono">admin@linkbd.net</code> / <code className="text-cyan-400 font-mono">admin123456</code>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>নিরাপদ এনক্রিপ্টেড সেশন (Bcrypt + JWT Secured)</span>
        </div>
      </div>
    </div>
  );
}
