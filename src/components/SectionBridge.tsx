"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MatrixRain } from "./MatrixRain";

export function SectionBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-64, 64]);

  return (
    <div ref={ref} className="relative h-36 overflow-hidden md:h-48" aria-hidden>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-28 -bottom-28">
        <MatrixRain mode="field" className="h-full w-full" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
