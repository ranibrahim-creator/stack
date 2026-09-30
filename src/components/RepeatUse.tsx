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
    <section
      id="repeat"
      ref={ref}
      className="relative px-6 py-16 md:px-8 lg:px-12"
    >
      <div className="repeat-panel relative flex items-center overflow-hidden rounded-[24px]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="repeat-field-dots absolute inset-0" />
          <div className="repeat-stat-glow-primary" />
          <div className="repeat-stat-glow-secondary" />
        </div>
        <div className="relative z-10 grid w-full grid-cols-[auto_minmax(2.5rem,1fr)_auto] items-center gap-x-4 px-6 pt-12 pb-20 md:gap-x-6 md:px-8 md:pt-14 md:pb-24 lg:gap-x-8 lg:px-12 lg:pt-16">
          <SectionTitle
            className="relative z-10 text-left"
            line1="Built for"
            line2="repeat use."
          />
          <div className="repeat-stat-rule h-px w-full self-center" aria-hidden />
          <div className="relative z-10 text-right">
            <p className="font-[family-name:var(--font-inter-tight)] text-[72px] font-semibold leading-none tracking-[-0.06em] text-ink sm:text-[88px] lg:text-[112px]">
              <span>{inView || reduce ? count : 0}</span>
              <span>+</span>
            </p>
            <p className="absolute top-full right-0 mt-3 font-[family-name:var(--font-inter-tight)] text-[18px] font-medium leading-[1.35] tracking-[-0.02em] text-[#d5d8d3] md:text-[22px]">
              financing cycles per seller on average
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
