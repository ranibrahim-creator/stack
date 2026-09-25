"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./ui/Reveal";

const items = [
  {
    q: "What is Stack?",
    a: "Stack is noon’s B2B financing platform. We use data and infrastructure from within the noon ecosystem to provide embedded working capital to businesses.",
  },
  {
    q: "Who can use Stack?",
    a: "Eligible noon sellers — businesses already operating on noon.",
  },
  {
    q: "How are sellers assessed?",
    a: "Commerce and operational signals from the seller’s activity on noon determine eligibility and potential financing limits.",
  },
  {
    q: "Is Stack available outside the UAE?",
    a: "No. Stack’s current financing proposition is focused on the UAE.",
  },
  {
    q: "How does repayment work?",
    a: "Repayment is linked to future noon sales and collected through noon’s existing weekly seller payout — not a separate bill.",
  },
  {
    q: "Are there any fees I should know about?",
    a: "Your total repayment is shown upfront before you accept — no hidden costs.",
  },
  {
    q: "Does Stack work with financial institutions?",
    a: "Yes — Stack’s embedded infrastructure and access to real-time commerce data can support financing programs with banks and other financial institutions. Get in touch to discuss what a partnership could look like.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section-shell relative z-10">
      <Reveal>
        <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:gap-12">
          <h2 className="page-title page-title-sm text-balance lg:w-56 lg:shrink-0">
            Frequently asked questions
          </h2>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {items.map((item, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={item.q}
                  className="faq-pill flex flex-col rounded-[16px] px-4 py-3.5 sm:px-5 sm:py-4"
                >
                  <button
                    type="button"
                    className="group flex w-full items-center gap-4 text-left text-[16px] leading-[1.5] break-words text-ink"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className="min-w-0 flex-1 font-medium">{item.q}</span>
                    <span
                      className="flex size-6 shrink-0 items-center justify-center rounded-[8px] text-[16px] leading-none text-green transition-colors duration-200 group-hover:bg-green-tint group-hover:text-[#7ae0a4]"
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
                        <p className="pt-3 pr-0 pb-0 text-[14px] leading-[1.5] text-[#8A8F98] sm:pr-8 sm:pt-4">
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
