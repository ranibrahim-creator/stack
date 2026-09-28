"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

const nodes = [
  {
    title: "Data",
    body: "Commerce signals from across noon help Stack understand seller performance and determine eligibility.",
  },
  {
    title: "Capital",
    body: "Eligible businesses receive working capital based on their business activity and financing requirements.",
  },
  {
    title: "Commerce",
    body: "That capital funds real inventory and sales activity across noon.",
  },
  {
    title: "Repayment",
    body: "Collections are embedded into the same infrastructure noon already uses to settle sellers every week.",
  },
];

const RAD = 12;

type LoopGeom = {
  width: number;
  height: number;
  ret: string;
};

function buildLoop(wrap: HTMLElement): LoopGeom | null {
  const rules = [...wrap.querySelectorAll("[data-stage-rule]")];
  const wr = wrap.getBoundingClientRect();
  if (wr.width < 80 || wr.height < 80) return null;

  const boxes = rules.map((el) => {
    const r = el.getBoundingClientRect();
    return {
      left: r.left - wr.left,
      right: r.right - wr.left,
      top: r.top - wr.top,
    };
  });

  const aligned =
    boxes.length === 4 && boxes.every((b) => Math.abs(b.top - boxes[0].top) < 16);
  if (!aligned) return null;

  const y = boxes[0].top + 0.5;
  const r1 = boxes[0];
  const r4 = boxes[3];
  const L = 0.5;
  const R = wr.width - 0.5;
  const B = wr.height - 0.5;

  const ret = [
    `M ${r4.left} ${y}`,
    `L ${R - RAD} ${y}`,
    `Q ${R} ${y} ${R} ${y + RAD}`,
    `L ${R} ${B - RAD}`,
    `Q ${R} ${B} ${R - RAD} ${B}`,
    `L ${L + RAD} ${B}`,
    `Q ${L} ${B} ${L} ${B - RAD}`,
    `L ${L} ${y + RAD}`,
    `Q ${L} ${y} ${L + RAD} ${y}`,
    `L ${r1.right} ${y}`,
  ].join(" ");

  return {
    width: wr.width,
    height: wr.height,
    ret,
  };
}

export function ConnectedLayers() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapEl, setWrapEl] = useState<HTMLDivElement | null>(null);
  const [geom, setGeom] = useState<LoopGeom | null>(null);

  useLayoutEffect(() => {
    const wrap = wrapEl ?? wrapRef.current;
    if (!wrap) return;

    const measure = () => setGeom(buildLoop(wrap));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    window.addEventListener("resize", measure);
    const later = window.setTimeout(measure, 0);
    void document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(later);
    };
  }, [wrapEl]);

  return (
    <section id="layers" className="section-shell">
      <Reveal>
        <div
          ref={(node) => {
            wrapRef.current = node;
            setWrapEl(node);
          }}
          className="glass-card-mint stages-card relative overflow-hidden rounded-[12px] px-8 py-10 sm:px-10 md:px-14 md:py-14"
        >
          <SectionTitle
            line1="One platform."
            line2="Four connected stages."
          />

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {nodes.map((node, index) => (
              <div
                key={node.title}
                data-stage-rule
                className="group min-w-0 border-t border-[#3cb86a]/25 pt-5 transition-colors duration-200 hover:border-[#2f9a5c]"
              >
                <p className="font-[family-name:var(--font-plex-mono)] text-[12px] tracking-[0.16em] text-[#a3a8a2] uppercase transition-colors duration-200 group-hover:text-[#3cb86a]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-inter-tight)] text-[18px] font-medium leading-none tracking-[-0.03em] text-white transition-colors duration-200 group-hover:text-[#3cb86a]">
                  {node.title}
                </h3>
                <p className="mt-3 max-w-[28ch] text-[14px] leading-[1.5] text-[#8A8F98]">
                  {node.body}
                </p>
              </div>
            ))}
          </div>

          <p className="sr-only">Repayment feeds back into Data.</p>
          <p className="mt-6 font-[family-name:var(--font-plex-mono)] text-[12px] tracking-[0.04em] text-[#a3a8a2] lg:hidden">
            ↺ Repayment feeds back into Data
          </p>

          {geom ? (
            <svg
              viewBox={`0 0 ${geom.width} ${geom.height}`}
              className="stages-loop pointer-events-none absolute inset-0 z-10 h-full w-full"
              fill="none"
              aria-hidden
            >
              <path
                d={geom.ret}
                stroke="#3cb86a"
                strokeWidth="1.35"
                strokeOpacity="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
