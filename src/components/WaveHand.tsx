"use client";

import { motion } from "framer-motion";

export default function WaveHand() {
  return (
    <motion.span
      aria-hidden
      className="inline-block origin-[70%_70%]"
      animate={{ rotate: [0, 18, -10, 18, -6, 0] }}
      transition={{
        duration: 1.8,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3.2,
      }}
    >
      👋
    </motion.span>
  );
}
