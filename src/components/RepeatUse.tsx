"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./ui/SectionTitle";

export function RepeatUse() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [count, setCount] = useState(reduce ? 3 : 0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

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

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!drag.current) return;
      setPos({
        x: drag.current.originX + event.clientX - drag.current.startX,
        y: drag.current.originY + event.clientY - drag.current.startY,
      });
    };
    const onUp = () => {
      drag.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <section id="repeat" ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="repeat-field-dots absolute inset-0" />
        <div className="repeat-stat-glow-primary" />
        <div className="repeat-stat-glow-secondary" />
      </div>
      <div className="relative z-10 w-full px-4 py-10 md:px-6 md:py-14 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="flex w-full flex-col justify-center">
          <SectionTitle line1="Built for" line2="repeat use." />
          <div
            className="relative mt-4 w-full cursor-grab pr-6 text-right select-none md:pr-10 lg:pr-16 active:cursor-grabbing"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            onPointerDown={(event) => {
              drag.current = {
                startX: event.clientX,
                startY: event.clientY,
                originX: pos.x,
                originY: pos.y,
              };
            }}
          >
            <p className="relative font-[family-name:var(--font-inter-tight)] text-[72px] font-semibold leading-none tracking-[-0.06em] text-ink sm:text-[88px] lg:text-[112px]">
              <span>{inView || reduce ? count : 0}</span>
              <span>+</span>
            </p>
            <p className="relative mt-4 font-[family-name:var(--font-inter-tight)] text-[18px] font-medium leading-[1.35] tracking-[-0.02em] text-[#d5d8d3] md:text-[22px]">
              financing cycles per seller on average
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
