"use client";

import { motion } from "framer-motion";
import { LineField } from "./LineField";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="hero-bloom pointer-events-none absolute inset-0" aria-hidden />
      <LineField className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_90%_at_78%_48%,black_10%,transparent_72%)]" />
      <div className="section-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="page-title page-title-lg max-w-[16ch]">
            Financing built into{" "}
            <span className="hero-commerce">commerce.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="mt-4 max-w-xl text-[14px] leading-[1.5] text-[#8A8F98] md:text-[16px]"
        >
          Stack is noon’s B2B financing platform. Working capital for inventory,
          using data and infrastructure noon already has — no separate
          application, no separate credit check.
        </motion.p>
      </div>
    </section>
  );
}
