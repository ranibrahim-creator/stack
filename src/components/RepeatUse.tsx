"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function RepeatUse() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="px-5 pt-24 font-[family-name:var(--font-inter-tight)] md:px-8 md:pt-32 lg:px-12"
    >
      <p className="font-[family-name:var(--font-plex-mono)] text-[11px] tracking-[0.08em] text-[#5c6166]">
        Built for repeat use
      </p>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-[88px] font-medium leading-none tracking-[-0.06em] text-ink sm:text-[120px] lg:text-[148px]"
      >
        3+
      </motion.p>
      <p className="mt-4 max-w-[360px] font-[family-name:var(--font-plex-mono)] text-[13px] leading-[1.45] tracking-[0.04em] text-[#5c6166]">
        financing cycles per seller, on average
      </p>
    </section>
  );
}
