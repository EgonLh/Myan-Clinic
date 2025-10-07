"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingPillsProps {
  message?: string;
}

export default function LoadingPills({
  message = "Loading",
}: LoadingPillsProps) {
  const [dots, setDots] = useState(".");

  // Animate the dots in "Loading..."
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center">
      {/* Pills Animation */}
      <div className="flex space-x-3 mb-6">
        {[1].map((i) => (
          <motion.div
            key={i}
            className="w-15 h-5 rounded-full flex overflow-hidden border border-black shadow "
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          >
            <div className="w-1/2 h-full bg-green" />
            <div className="w-1/2 h-full bg-black" />
          </motion.div>
        ))}
      </div>

      {/* Loading Text */}
      <motion.p
        key={dots} // triggers smooth animation on dot change
        className="text-lg font-bold text-black font-mono tracking-widest"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {message}
        {dots}
      </motion.p>
    </div>
  );
}
