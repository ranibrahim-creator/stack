"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-48 pb-0 md:pt-60 lg:pt-72">
      <div className="px-5 md:px-8 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-left font-[family-name:var(--font-inter-tight)] leading-[1.08] tracking-[-0.038em]"
        >
          <span className="block text-[42px] font-medium text-[#C8CBC4] sm:text-[52px] lg:text-[60px]">
            Financing built into
          </span>
          <span className="block text-[48px] font-semibold tracking-[-0.045em] text-ink sm:text-[58px] lg:text-[68px]">
            commerce
            <span className="hero-commerce-dot">.</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="mt-6 max-w-[720px] text-[16px] leading-[1.5] tracking-[-0.018em] text-[#8A8F98] sm:text-[17px]"
        >
          Stack is noon’s B2B financing platform. Working capital for inventory,
          using data and infrastructure noon already has — no separate
          application, no separate credit check.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="raycast-pill">
            <span className="raycast-pill-label">
              Built by noon. Embedded into noon.
            </span>
          </p>
          <a
            href="#faq"
            className="group inline-flex items-center gap-1.5 text-[12px] tracking-[-0.015em] text-ink"
          >
            FAQs
            <span className="flex size-5 items-center justify-center rounded-full border border-border text-green transition-colors duration-200 group-hover:border-green group-hover:bg-green-tint">
              <svg
                viewBox="0 0 16 16"
                className="size-2.5 transition-transform duration-200 group-hover:translate-y-px"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3.5 6.25 L8 10.75 L12.5 6.25"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
