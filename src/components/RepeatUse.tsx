"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./ui/SectionTitle";

export function RepeatUse() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [count, setCount] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(3);
      return;
    }
    const controls = animate(0, 3, {
      duration: 1.25,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setCount(Math.round(value)),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  return (
    <section id="repeat" ref={ref} className="relative py-16">
      <div className="page-wrap">
        <div className="repeat-panel relative w-full overflow-hidden rounded-[16px] md:rounded-[24px]">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="repeat-field-dots absolute inset-0" />
            <div className="repeat-stat-glow-primary" />
            <div className="repeat-stat-glow-secondary" />
          </div>
          <div className="relative z-10 flex w-full min-w-0 flex-col gap-6 px-6 py-8 sm:px-8 md:px-10 md:py-10 lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:py-12">
            <SectionTitle
              className="relative z-10 min-w-0 text-left"
              line1="Built for"
              line2="repeat use."
            />
            <div
              className="repeat-stat-rule hidden h-px min-w-10 flex-1 lg:block"
              aria-hidden
            />
            <div className="relative z-10 min-w-0 lg:text-right">
              <p className="font-[family-name:var(--font-inter-tight)] text-[48px] font-semibold leading-none tracking-[-0.06em] text-ink sm:text-[64px] md:text-[72px] lg:text-[96px]">
                <span>{inView || reduce ? count : 0}</span>
                <span>+</span>
              </p>
              <p className="mt-2 max-w-[20ch] text-[15px] font-medium leading-[1.35] tracking-[-0.02em] text-[#d5d8d3] sm:max-w-none sm:text-[16px] md:text-[18px] font-[family-name:var(--font-inter-tight)] lg:ml-auto">
                financing cycles per seller on average
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
