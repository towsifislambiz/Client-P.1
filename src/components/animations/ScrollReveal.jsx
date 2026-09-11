import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Default viewport configuration with threshold
const defaultViewport = { once: true, margin: "-60px" };

// Reduced motion check helper
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
};

// 1. FadeUp
export function FadeUp({
  children,
  delay = 0,
  duration = 0.55,
  className = "",
  distance = 30,
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: reduced ? 0.2 : duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 2. FadeDown
export function FadeDown({
  children,
  delay = 0,
  duration = 0.55,
  className = "",
  distance = 30,
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : -distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: reduced ? 0.2 : duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. FadeLeft (enters from right towards left)
export function FadeLeft({
  children,
  delay = 0,
  duration = 0.55,
  className = "",
  distance = 35,
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, x: reduced ? 0 : distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={defaultViewport}
      transition={{ duration: reduced ? 0.2 : duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. FadeRight (enters from left towards right)
export function FadeRight({
  children,
  delay = 0,
  duration = 0.55,
  className = "",
  distance = 35,
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, x: reduced ? 0 : -distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={defaultViewport}
      transition={{ duration: reduced ? 0.2 : duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 5. FadeIn
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={defaultViewport}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 6. ZoomIn / ScaleUp
export function ZoomIn({
  children,
  delay = 0,
  duration = 0.55,
  className = "",
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={defaultViewport}
      transition={{ duration: reduced ? 0.2 : duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleUp({ children, delay = 0, duration = 0.5, className = "" }) {
  return <ZoomIn delay={delay} duration={duration} className={className}>{children}</ZoomIn>;
}

// 7. StaggerContainer & StaggerItem
export function StaggerContainer({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  className = "",
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  distance = 25,
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 8. Animated CounterNumber (0 -> target number with prefix/suffix)
export function CounterNumber({
  target,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseFloat(target) || 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let frameId;
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (end - start) * ease;

      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setDisplayValue(end);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, duration]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// 9. PageTransition Wrapper for React Router
export function PageTransition({ children }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -8 }}
      transition={{ duration: reduced ? 0.15 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

// 10. GlowingBadge
export function GlowingBadge({
  children,
  icon: Icon,
  variant = "blue",
  className = "",
}) {
  const variants = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-cyan-300 border-blue-500/20 shadow-blue-500/10",
    cyan: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20 shadow-cyan-500/10",
    emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 shadow-emerald-500/10",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20 shadow-amber-500/10",
    purple: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20 shadow-purple-500/10",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
        variants[variant] || variants.blue
      } ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}
