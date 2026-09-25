"use client";

import { motion } from "framer-motion";
import { IsoBox } from "./iso";

function Signature() {
  return (
    <svg
      viewBox="0 0 640 220"
      className="mx-auto h-auto w-full max-w-[640px]"
      fill="none"
      aria-hidden
    >
      <IsoBox x={0} y={0} z={0} w={16} h={12} d={14} ox={78} oy={118} s={1.7} />
      {[0, 1, 2, 3].map((i) => (
        <IsoBox
          key={i}
          x={0}
          y={i * 6.2}
          z={0}
          w={22}
          h={4}
          d={22}
          ox={200}
          oy={128}
          s={1.35}
        />
      ))}
      <IsoBox x={0} y={0} z={0} w={14} h={22} d={14} ox={440} oy={122} s={1.55} />
      <IsoBox x={0} y={0} z={0} w={18} h={10} d={14} ox={560} oy={118} s={1.5} />
      <IsoBox
        x={20}
        y={0}
        z={2}
        w={5}
        h={10}
        d={12}
        ox={560}
        oy={118}
        s={1.5}
        stroke="#C5CBD3"
      />

      <path
        className="fig-sig-line"
        d="M118 108 L 268 108"
        stroke="#5c6166"
        strokeWidth="0.7"
      />
      <path
        className="fig-sig-line"
        d="M372 108 L 418 108"
        stroke="#5c6166"
        strokeWidth="0.7"
      />
      <path
        className="fig-sig-line"
        d="M200 86 C 248 48, 392 48, 440 86"
        stroke="#5c6166"
        strokeWidth="0.7"
      />
      <path
        className="fig-sig-line"
        d="M200 148 C 260 186, 500 186, 560 136"
        stroke="#5c6166"
        strokeWidth="0.7"
      />

      <g className="fig-sig-core">
        <IsoBox
          x={0}
          y={0}
          z={0}
          w={22}
          h={16}
          d={18}
          ox={320}
          oy={128}
          s={2.05}
          stroke="#7ae0a4"
        />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-48 pb-0 md:pt-60 lg:pt-72">
      <div className="px-5 md:px-8 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-left font-[family-name:var(--font-inter-tight)] text-[42px] font-normal leading-[1.12] tracking-[-0.038em] text-ink sm:text-[52px] lg:text-[60px]"
        >
          Financing built into commerce
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          className="mt-16 md:mt-20"
        >
          <Signature />
        </motion.div>
      </div>
    </section>
  );
}
