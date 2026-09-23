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
    <section id="faq" className="scroll-mt-24 px-6 py-14 md:py-16">
      <Reveal className="mx-auto max-w-6xl rounded-2xl border border-border bg-surface p-6 md:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          <h2 className="text-balance text-[24px] font-medium leading-[1.2] tracking-tight text-ink md:text-[32px] lg:w-[240px] lg:shrink-0">
            Frequently asked questions
          </h2>
          <div className="flex flex-1 flex-col gap-3 lg:max-w-[780px]">
            {items.map((item, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={item.q}
                  className="flex flex-col rounded-2xl border border-border bg-bg px-5 py-4"
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 text-left text-[16px] leading-[1.45] text-ink"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className="min-w-0 flex-1 font-medium">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-green"
                      aria-hidden
                    >
                      {isOpen ? (
                        <svg viewBox="0 0 12 12" className="size-3">
                          <path
                            d="M9 5.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1h6Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 12 12" className="size-3">
                          <path
                            d="M6 2.5a.5.5 0 0 1 .5.5v2.5H9a.5.5 0 0 1 0 1H6.5V9a.5.5 0 0 1-1 0V6.5H3a.5.5 0 0 1 0-1h2.5V3a.5.5 0 0 1 .5-.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </motion.span>
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
                        <p className="pt-3 text-[15px] leading-[1.5] text-slate">
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
