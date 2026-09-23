"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./ui/Reveal";

const items = [
  {
    q: "What is Stack?",
    a: "Stack is noon's B2B financing platform. We use data and infrastructure from within the noon ecosystem to provide embedded working capital to businesses.",
  },
  {
    q: "Who can use it?",
    a: "Eligible noon sellers in the UAE, based on business performance and other relevant signals.",
  },
  {
    q: "How does repayment work?",
    a: "Linked to your future noon sales and collected through noon's existing weekly seller payout — not a separate bill.",
  },
  {
    q: "Are there any fees I should know about?",
    a: "Your total repayment is shown upfront before you accept — no hidden costs.",
  },
  {
    q: "Does Stack work with financial institutions?",
    a: "Yes — Stack's technology and embedded infrastructure can support financing programs with banks and other financial institutions.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="relative z-10 scroll-mt-24 px-5 py-16 font-[family-name:var(--font-inter-tight)] md:px-8 md:py-20 lg:px-12"
    >
      <Reveal className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <h2 className="text-balance text-[24px] font-medium leading-[1.2] tracking-[-0.025em] text-ink md:text-[28px] lg:w-[240px] lg:shrink-0">
            Frequently asked questions
          </h2>
          <div className="flex flex-1 flex-col gap-2.5 lg:max-w-[780px]">
            {items.map((item, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={item.q}
                  className={`faq-pill flex flex-col rounded-2xl px-5 py-4`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 text-left text-[16px] leading-[1.45] tracking-[-0.02em] text-ink"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className="min-w-0 flex-1 font-medium">{item.q}</span>
                    <span
                      className="flex size-6 shrink-0 items-center justify-center text-[18px] leading-none text-green"
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.28,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 pr-8 pb-1 text-[14px] leading-[1.5] tracking-[-0.015em] text-[#8A8F98]">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
