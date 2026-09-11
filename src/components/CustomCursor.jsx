import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Strictly disable on touch screens, mobile devices, and screen widths under 768px
    const isMobileOrTouch = () => {
      return (
        window.innerWidth < 768 ||
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };

    if (isMobileOrTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const handleResize = () => {
      if (isMobileOrTouch()) {
        setIsTouchDevice(true);
      } else {
        setIsTouchDevice(false);
      }
    };

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleElementHover = (e) => {
      const target = e.target;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.closest(".clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleElementHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.75 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? "rgba(6, 182, 212, 0.9)" : "rgba(59, 130, 246, 0.5)",
          backgroundColor: isHovered ? "rgba(6, 182, 212, 0.12)" : "rgba(59, 130, 246, 0.03)",
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-blue-500/50 pointer-events-none z-[99999] backdrop-blur-[0.5px] shadow-[0_0_15px_rgba(6,182,212,0.3)] hidden md:block"
      />

      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.5 : isHovered ? 1.4 : 1,
          backgroundColor: isHovered ? "#22d3ee" : "#3b82f6",
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] shadow-[0_0_8px_#38bdf8] hidden md:block"
      />
    </>
  );
}
