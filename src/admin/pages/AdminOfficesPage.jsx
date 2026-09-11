// src/admin/pages/AdminOfficesPage.jsx
// Offices and Global Site Contact Management

import React, { useState } from "react";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Check,
  X,
  ExternalLink,
  MessageCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { useSiteData } from "../../context/SiteDataContext";
import ToastNotification from "../components/ToastNotification";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminOfficesPage() {
  const {
    offices,
    contact,
    createOffice,
    updateOffice,
    deleteOffice,
    resetOffices,
    updateGlobalContact,
    resetGlobalContact
  } = useSiteData();

  const [toast, setToast] = useState(null);
  const [editingOffice, setEditingOffice] = useState(null);
  const [isCreatingOffice, setIsCreatingOffice] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Global Contact Form
  const [contactForm, setContactForm] = useState({
    mainHotline: contact.mainHotline || "+8801995-648616",
    supportHotline: contact.supportHotline || "+8801897-785024",
    whatsapp: contact.whatsapp || "+8801995648616",
    mainEmail: contact.mainEmail || "linkbd86@gmail.com",
    supportEmail: contact.supportEmail || "linkbd86@gmail.com",
    website: contact.website || "www.linkbd.net",
    wazeLink: contact.wazeLink || ""
  });
  const [isSavingContact, setIsSavingContact] = useState(false);

  // Office Form
  const [officeForm, setOfficeForm] = useState({
    name: "",
    type: "Branch Office",
    city: "",
    country: "Bangladesh",
    address: "",
    phone: "",
    hotline: "",
    supportNumber: "",
    email: "",
    website: "www.linkbd.net",
    mapsUrl: "",
    wazeLink: "",
    isHead: false,
    isActive: true
  });

  const handleSaveContact = async (e) => {
    e.preventDefault();
    setIsSavingContact(true);
    try {
      await updateGlobalContact(contactForm);
      setToast({
        type: "success",
        title: "যোগাযোগ তথ্য আপডেট হয়েছে",
        message: "নেভবার ও ফুটারে নতুন হটলাইন ও ইমেইল কার্যকর হয়েছে।"
      });
    } catch (err) {
      setToast({ type: "error", title: "ব্যর্থ হয়েছে", message: err.message });
    } finally {
      setIsSavingContact(false);
    }
  };

  const handleOpenCreateOffice = () => {
    setOfficeForm({
      name: "",
      type: "Branch Office",
      city: "",
      country: "Bangladesh",
      address: "",
      phone: contact.mainHotline || "",
      hotline: contact.mainHotline || "",
      supportNumber: contact.supportHotline || "",
      email: contact.mainEmail || "",
      website: "www.linkbd.net",
      mapsUrl: "",
      wazeLink: "",
      isHead: false,
      isActive: true
    });
    setIsCreatingOffice(true);
    setEditingOffice(null);
  };

  const handleOpenEditOffice = (office) => {
    setOfficeForm({ ...office });
    setEditingOffice(office);
    setIsCreatingOffice(false);
  };

  const handleSaveOfficeForm = async (e) => {
    e.preventDefault();
    if (!officeForm.name.trim() || !officeForm.address.trim()) {
      setToast({ type: "error", title: "তথ্য অসম্পূর্ণ", message: "অফিসের নাম ও ঠিকানা আবশ্যক।" });
      return;
    }

    try {
      if (isCreatingOffice) {
        await createOffice(officeForm);
        setToast({
          type: "success",
          title: "নতুন অফিস যুক্ত হয়েছে",
          message: `"${officeForm.name}" সফলভাবে যুক্ত হয়েছে।`
        });
      } else if (editingOffice) {
        await updateOffice(editingOffice.id, officeForm);
        setToast({
          type: "success",
          title: "অফিস আপডেট হয়েছে",
          message: `"${officeForm.name}" সফলভাবে আপডেট হয়েছে।`
        });
      }
      setIsCreatingOffice(false);
      setEditingOffice(null);
    } catch (err) {
      setToast({ type: "error", title: "ব্যর্থ হয়েছে", message: err.message });
    }
  };

  const handleDeleteOfficeConfirm = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteOffice(deleteConfirmId);
      setToast({
        type: "success",
        title: "অফিস মুছে ফেলা হয়েছে",
        message: "অফিসটি তালিকা থেকে সফলভাবে সরানো হয়েছে।"
      });
    } catch (err) {
      setToast({ type: "error", title: "ডিলিট ব্যর্থ", message: err.message });
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleResetOfficesConfirm = async () => {
    try {
      await resetOffices();
      setToast({
        type: "success",
        title: "অফিস তালিকা রিসেট সম্পন্ন",
        message: "লিংক বিডির আসল ৪টি অফিস (উত্তরা, কুষ্টিয়া, ফরিদপুর, সিঙ্গাপুর) পুনর্বহাল করা হয়েছে।"
      });
    } catch (err) {
      setToast({ type: "error", title: "ব্যর্থ হয়েছে", message: err.message });
    } finally {
      setResetConfirmOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-cyan-400" />
            অফিস ও যোগাযোগ ব্যবস্থাপনা (Offices & Contact)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            হেড অফিস, ব্রাঞ্চ অফিস এবং সাইটওয়াইড হটলাইন/ইমেইল পরিবর্তন করুন।
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>অফিস রিসেট</span>
          </button>

          <button
            onClick={handleOpenCreateOffice}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন অফিস</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: GLOBAL CONTACT SETTINGS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" />
              গ্লোবাল হেল্পলাইন ও সাইট কন্টাক্ট সেটিংস
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              এখানে পরিবর্তন করলে নেভবার, ফুটার এবং সব পেজের সাপোর্ট বাটন সাথে সাথে আপডেট হবে।
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveContact} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              মূল হটলাইন (Main Helpline)
            </label>
            <input
              type="text"
              required
              value={contactForm.mainHotline}
              onChange={(e) => setContactForm({ ...contactForm, mainHotline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              সাপোর্ট হটলাইন (Support Hotline)
            </label>
            <input
              type="text"
              value={contactForm.supportHotline}
              onChange={(e) => setContactForm({ ...contactForm, supportHotline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              হোয়াটসঅ্যাপ নম্বর (WhatsApp Call & Chat)
            </label>
            <input
              type="text"
              value={contactForm.whatsapp}
              onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              অফিসিয়াল ইমেইল (Official Email)
            </label>
            <input
              type="email"
              value={contactForm.mainEmail}
              onChange={(e) => setContactForm({ ...contactForm, mainEmail: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              অফিসিয়াল ওয়েবসাইট ডোমেইন
            </label>
            <input
              type="text"
              value={contactForm.website}
              onChange={(e) => setContactForm({ ...contactForm, website: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isSavingContact}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSavingContact ? (
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              গ্লোবাল কন্টাক্ট সেভ করুন
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: OFFICES LIST */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            শাখা ও আঞ্চলিক অফিসসমূহ ({offices.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {offices.map((office) => (
            <div
              key={office.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-cyan-300 border border-blue-500/30">
                      {office.type}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                      {office.name}
                    </h3>
                  </div>

                  {office.isHead && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Headquarters
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{office.address}</span>
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>হটলাইন/ফোন:</span>
                    <strong className="text-slate-200 font-mono">{office.phone || "N/A"}</strong>
                  </div>
                  {office.supportNumber && (
                    <div className="flex items-center justify-between">
                      <span>সাপোর্ট নাম্বার:</span>
                      <strong className="text-slate-200 font-mono">{office.supportNumber}</strong>
                    </div>
                  )}
                  {office.email && (
                    <div className="flex items-center justify-between">
                      <span>ইমেইল:</span>
                      <span className="text-slate-200">{office.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 mt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => handleOpenEditOffice(office)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/40 hover:border-blue-400 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  এডিট
                </button>

                {!office.isHead && (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(office.id)}
                    className="p-1.5 rounded-xl text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 transition cursor-pointer"
                    title="অফিস মুছে ফেলুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Office Modal */}
      {(isCreatingOffice || editingOffice) && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl relative my-0 sm:my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                {isCreatingOffice ? "নতুন অফিস যোগ করুন" : `"${editingOffice?.name}" এডিট`}
              </h2>
              <button
                onClick={() => {
                  setIsCreatingOffice(false);
                  setEditingOffice(null);
                }}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOfficeForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    অফিসের নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={officeForm.name}
                    onChange={(e) => setOfficeForm({ ...officeForm, name: e.target.value })}
                    placeholder="Link BD - Kushtia Office"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    অফিসের ধরন
                  </label>
                  <select
                    value={officeForm.type}
                    onChange={(e) => setOfficeForm({ ...officeForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Head Office">Head Office</option>
                    <option value="Branch Office">Branch Office</option>
                    <option value="Regional Office">Regional Office</option>
                    <option value="Singapore Office">Singapore Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    শহর / অঞ্চল
                  </label>
                  <input
                    type="text"
                    value={officeForm.city}
                    onChange={(e) => setOfficeForm({ ...officeForm, city: e.target.value })}
                    placeholder="কুষ্টিয়া সদর / উত্তরা ঢাকা"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    হটলাইন / ফোন
                  </label>
                  <input
                    type="text"
                    value={officeForm.phone}
                    onChange={(e) => setOfficeForm({ ...officeForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  সম্পূর্ণ ঠিকানা *
                </label>
                <textarea
                  required
                  rows="2"
                  value={officeForm.address}
                  onChange={(e) => setOfficeForm({ ...officeForm, address: e.target.value })}
                  placeholder="মার্কেট, ফ্লোর, রোড নং, এলাকা, পোস্টকোড"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ইমেইল অ্যাড্রেস
                  </label>
                  <input
                    type="email"
                    value={officeForm.email}
                    onChange={(e) => setOfficeForm({ ...officeForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Waze / Google Map ডিরেকশন লিংক
                  </label>
                  <input
                    type="url"
                    value={officeForm.wazeLink || officeForm.mapsUrl}
                    onChange={(e) => setOfficeForm({ ...officeForm, wazeLink: e.target.value, mapsUrl: e.target.value })}
                    placeholder="https://maps.google.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingOffice(false);
                    setEditingOffice(null);
                  }}
                  className="w-full sm:w-auto px-4 py-3 sm:py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer text-center min-h-[42px]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-3 sm:py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 cursor-pointer text-center min-h-[42px]"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Office Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        title="অফিস মুছে ফেলতে চান?"
        message="এই অফিসটি মুছে ফেললে তা ওয়েবসাইট ও কাভারেজ সেকশন থেকে অপসারিত হবে।"
        confirmText="হ্যাঁ, মুছে ফেলুন"
        isDanger={true}
        onConfirm={handleDeleteOfficeConfirm}
        onCancel={() => setDeleteConfirmId(null)}
      />

      {/* Reset Offices Confirmation */}
      <ConfirmDialog
        isOpen={resetConfirmOpen}
        title="সব অফিসের তথ্য ডিফল্টে রিসেট করবেন?"
        message="এটি লিংক বিডি-র মূল ৪টি অফিস (উত্তরা হেড অফিস, কুষ্টিয়া শাখা, মধুখালী ফরিদপুর অফিস, সিঙ্গাপুর অফিস) পুনর্বহাল করবে।"
        confirmText="হ্যাঁ, রিসেট করুন"
        isDanger={true}
        onConfirm={handleResetOfficesConfirm}
        onCancel={() => setResetConfirmOpen(false)}
      />

      {/* Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
