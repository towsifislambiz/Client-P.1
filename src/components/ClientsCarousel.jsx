import React from "react";
import { motion } from "framer-motion";
import { Building2, Award, Users, ShieldCheck, Zap, Headphones } from "lucide-react";
import { corporateClients } from "../data/ispData";

export default function ClientsCarousel() {
  return (
    <section id="clients" className="py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            আস্থার প্রতীক ও ক্লায়েন্টবৃন্দ
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            OUR VALUABLE CORPORATE CLIENTS
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            দেশের শীর্ষস্থানীয় ব্যাংক, শিল্প প্রতিষ্ঠান ও বাণিজ্যিক প্রতিষ্ঠান Link BD-এর ডেডিকেটেড নেটওয়ার্কে আস্থাশীল
          </p>
        </motion.div>

        {/* 4 Animated Trust Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center shadow-sm"
          >
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="text-3xl font-black text-slate-900">৫০,০০০+</h4>
            <p className="text-xs text-slate-500 font-semibold mt-1">সক্রিয় হোম ও কর্পোরেট ইউজার</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center shadow-sm"
          >
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-3xl font-black text-slate-900">৯৯.৯৮%</h4>
            <p className="text-xs text-slate-500 font-semibold mt-1">নেটওয়ার্ক আপটাইম SLA</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center shadow-sm"
          >
            <Zap className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h4 className="text-3xl font-black text-slate-900">10 Gbps</h4>
            <p className="text-xs text-slate-500 font-semibold mt-1">ডেডিকেটেড BDIX ব্যাকবোন</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center shadow-sm"
          >
            <Headphones className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="text-3xl font-black text-slate-900">২৪/৭</h4>
            <p className="text-xs text-slate-500 font-semibold mt-1">অন-কল ও ফিল্ড সাপোর্ট টিম</p>
          </motion.div>
        </div>

        {/* Extracted Client Banners from Doc with Motion */}
        <div className="space-y-8 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-50 p-4 hover:shadow-xl transition"
          >
            <img
              src="/assets/clients-1.png"
              alt="Valuable Clients - Banks and Groups"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-50 p-4 hover:shadow-xl transition"
          >
            <img
              src="/assets/clients-2.png"
              alt="Valuable Clients - Corporate and Industries"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>

        {/* Corporate Client Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {corporateClients.map((client, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              {client}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
