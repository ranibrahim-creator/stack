"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SectionTitle } from "./ui/SectionTitle";

const stages = [
  {
    title: "Data",
    body: "Commerce signals from across noon help Stack understand seller performance and determine eligibility.",
  },
  {
    title: "Financing",
    body: "Eligible businesses receive working capital based on their business activity and financing requirements.",
  },
  {
    title: "Commerce",
    body: "Financing supports inventory and sales activity within the noon ecosystem.",
  },
  {
    title: "Repayment",
    body: "Collections are embedded into the same infrastructure noon already uses to settle sellers every week.",
  },
];

const LINE = "rgb(255 255 255 / 0.45)";
const RETURN_INSET = "calc((100% - 7.5rem) / 8)";

export function ConnectedStagesMinimal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(wrapRef, { once: true, amount: 0.2 });

  return (
    <section
      id="layers"
      className="section-shell relative"
    >
      <div className="relative">
        <SectionTitle
          line1="One platform."
          line2="Four connected stages."
        />

        <div ref={wrapRef} className="relative mt-12 lg:mt-14">
          <ol className="relative z-10 m-0 grid list-none grid-cols-1 gap-10 bg-transparent p-0 lg:grid-cols-4 lg:items-stretch lg:gap-x-10 lg:gap-y-0">
            {stages.map((stage, index) => (
              <motion.li
                key={stage.title}
                className="stage-card group relative flex h-full min-w-0 flex-col rounded-[12px] border border-white/[0.06] p-6 backdrop-blur-[24px] backdrop-saturate-150"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  duration: reduce ? 0 : 0.45,
                  delay: reduce ? 0 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="font-[family-name:var(--font-plex-mono)] text-[12px] tracking-[0.16em] text-[#a3a8a2] uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-inter-tight)] text-[18px] font-medium leading-none tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-[#3cb86a]">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-[28ch] text-[14px] leading-[1.5] text-[#8A8F98]">
                  {stage.body}
                </p>
                {index < 3 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-[-2.5rem] hidden h-px w-10 lg:block"
                    style={{ background: LINE }}
                  />
                ) : null}
              </motion.li>
            ))}
          </ol>

          <div
            aria-hidden
            className="pointer-events-none relative mt-0 hidden h-16 lg:block"
          >
            <div
              className="absolute top-0 h-10 rounded-b-[16px] border-x border-b"
              style={{
                left: RETURN_INSET,
                right: RETURN_INSET,
                borderColor: LINE,
              }}
            />
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              className="absolute top-0 -translate-x-1/2 -translate-y-[1px]"
              style={{ left: RETURN_INSET }}
              fill="none"
            >
              <path
                d="M1 7 L5 1.5 L9 7"
                stroke={LINE}
                strokeWidth="1.15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="sr-only">Repayment feeds back into Data.</p>
          <p className="mt-6 font-[family-name:var(--font-plex-mono)] text-[12px] tracking-[0.04em] text-[#a3a8a2] lg:hidden">
            ↺ Repayment feeds back into Data
          </p>
        </div>
      </div>
    </section>
  );
}
