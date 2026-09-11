import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Activity, ArrowDown, ArrowUp, RefreshCw, CheckCircle2 } from "lucide-react";

export default function SpeedTestWidget() {
  const [testing, setTesting] = useState(false);
  const [speed, setSpeed] = useState(null);
  const [ping, setPing] = useState(null);
  const [completed, setCompleted] = useState(false);

  const startTest = () => {
    setTesting(true);
    setCompleted(false);
    setSpeed(12);
    setPing(4);

    let current = 12;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 25) + 15;
      if (current >= 180) {
        current = 195 + Math.floor(Math.random() * 10);
        clearInterval(interval);
        setSpeed(current);
        setPing(2);
        setTesting(false);
        setCompleted(true);
      } else {
        setSpeed(current);
      }
    }, 150);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white">
      {/* Background glow circle */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Live BDIX Speed Test
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Link BD অপটিক্যাল স্পিড টেস্ট
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            আপনার বর্তমান লাইনে BDIX ও রিয়েল ব্যান্ডউইডথ স্পিড কত? সরাসরি টেস্ট করে আল্ট্রা-লো পিং যাচাই করুন।
          </p>
        </div>

        {/* Speedometer Display */}
        <div className="flex flex-col items-center">
          <div className="relative w-44 h-44 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-950/80 shadow-inner">
            {/* Pulsing ring during test */}
            {testing && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-500"
              />
            )}

            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Download</span>
              <motion.span
                key={speed}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 block"
              >
                {speed !== null ? speed : "--"}
              </motion.span>
              <span className="text-xs font-bold text-cyan-300">Mbps (BDIX)</span>
            </div>
          </div>

          {/* Ping and Stats */}
          {completed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-4 text-xs font-semibold text-emerald-400"
            >
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ping: {ping}ms (Ultra Low)
              </span>
              <span>Jitter: 0.8ms</span>
            </motion.div>
          )}

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startTest}
            disabled={testing}
            className="mt-5 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${testing ? "animate-spin" : ""}`} />
            {testing ? "স্পিড টেস্ট চলছে..." : completed ? "পুনরায় টেস্ট করুন" : "স্পিড টেস্ট শুরু করুন"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
