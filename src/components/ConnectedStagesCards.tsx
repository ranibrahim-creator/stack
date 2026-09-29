"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
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

const RAD = 16;
const THREAD = "#2f9a5c";

type ThreadGeom = {
  width: number;
  height: number;
  d: string;
  gutters: { x: number; y: number }[];
  bottomChevron: { x: number; y: number };
  enterUp: { x: number; y: number };
};

function chevron(x: number, y: number, dir: "right" | "left" | "up") {
  if (dir === "right") return `M ${x - 4} ${y - 3.2} L ${x + 2} ${y} L ${x - 4} ${y + 3.2}`;
  if (dir === "left") return `M ${x + 4} ${y - 3.2} L ${x - 2} ${y} L ${x + 4} ${y + 3.2}`;
  return `M ${x - 3.2} ${y + 4} L ${x} ${y - 2} L ${x + 3.2} ${y + 4}`;
}

function boxIn(wrap: HTMLElement, el: HTMLElement) {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== wrap) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return {
    left,
    right: left + el.offsetWidth,
    top,
    bottom: top + el.offsetHeight,
    midX: left + el.offsetWidth / 2,
    midY: top + el.offsetHeight / 2,
  };
}

function buildThread(wrap: HTMLElement, cards: HTMLElement[]): ThreadGeom | null {
  if (cards.length !== 4) return null;
  if (wrap.offsetWidth < 80 || wrap.offsetHeight < 80) return null;

  const boxes = cards.map((el) => boxIn(wrap, el));

  const aligned = boxes.every((b) => Math.abs(b.top - boxes[0].top) < 12);
  if (!aligned) return null;

  const L = boxes[0].midX;
  const R = boxes[3].midX;
  const T = boxes[0].top + (boxes[0].bottom - boxes[0].top) / 2;
  const B = boxes[0].bottom + 40;

  const d = [
    `M ${L + RAD} ${T}`,
    `L ${R - RAD} ${T}`,
    `Q ${R} ${T} ${R} ${T + RAD}`,
    `L ${R} ${B - RAD}`,
    `Q ${R} ${B} ${R - RAD} ${B}`,
    `L ${L + RAD} ${B}`,
    `Q ${L} ${B} ${L} ${B - RAD}`,
    `L ${L} ${T + RAD}`,
    `Q ${L} ${T} ${L + RAD} ${T}`,
    "Z",
  ].join(" ");

  const gutters = [0, 1, 2].map((i) => ({
    x: (boxes[i].right + boxes[i + 1].left) / 2,
    y: T,
  }));

  return {
    width: wrap.offsetWidth,
    height: wrap.offsetHeight,
    d,
    gutters,
    bottomChevron: { x: wrap.offsetWidth / 2, y: B },
    enterUp: { x: L, y: boxes[0].bottom + 12 },
  };
}

export function ConnectedStagesCards() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();
  const inView = useInView(wrapRef, { once: true, amount: 0.2 });
  const [geom, setGeom] = useState<ThreadGeom | null>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const cards = cardRefs.current.filter((el): el is HTMLLIElement => !!el);
      setGeom(buildThread(wrap, cards));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    const later = window.setTimeout(measure, 0);
    void document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(later);
    };
  }, [inView]);

  const showThread = inView && !!geom;

  return (
    <section id="layers" className="section-shell">
      <div className="glass-card-mint stages-card relative overflow-hidden rounded-[12px] px-8 pt-10 pb-16 sm:px-10 md:px-14 md:pt-14">
        <SectionTitle
          line1="One platform."
          line2="Four connected stages."
        />

        <div ref={wrapRef} className="relative mt-12 pb-10 lg:mt-14">
          {geom ? (
            <motion.svg
              viewBox={`0 0 ${geom.width} ${geom.height}`}
              width={geom.width}
              height={geom.height}
              className="pointer-events-none absolute top-0 left-0 z-0 hidden lg:block"
              fill="none"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: showThread ? 1 : 0 }}
              transition={{
                delay: reduce ? 0 : 0.7,
                duration: reduce ? 0 : 0.45,
              }}
            >
              <motion.path
                d={geom.d}
                stroke={THREAD}
                strokeWidth="1.5"
                strokeOpacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 8"
                animate={reduce ? undefined : { strokeDashoffset: [0, -14] }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 1, repeat: Infinity, ease: "linear" }
                }
              />
              {geom.gutters.map((g, i) => (
                <path
                  key={`g-${i}`}
                  d={chevron(g.x, g.y, "right")}
                  stroke={THREAD}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              <path
                d={chevron(geom.bottomChevron.x, geom.bottomChevron.y, "left")}
                stroke={THREAD}
                strokeWidth="1.5"
                strokeOpacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={chevron(geom.enterUp.x, geom.enterUp.y, "up")}
                stroke={THREAD}
                strokeWidth="1.5"
                strokeOpacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          ) : null}

          <ol className="relative z-10 m-0 grid list-none grid-cols-1 gap-10 p-0 lg:grid-cols-4 lg:items-stretch lg:gap-x-10 lg:gap-y-0">
            {stages.map((stage, index) => (
              <motion.li
                key={stage.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="min-w-0 rounded-[12px] border border-white/12 bg-[#16181a] p-6 transition-colors duration-200 hover:border-white/20"
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
                <h3 className="mt-4 font-[family-name:var(--font-inter-tight)] text-[18px] font-medium leading-none tracking-[-0.03em] text-white">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-[28ch] text-[14px] leading-[1.5] text-[#8A8F98]">
                  {stage.body}
                </p>
              </motion.li>
            ))}
          </ol>

          <p className="sr-only">Repayment feeds back into Data.</p>
          <p className="mt-6 font-[family-name:var(--font-plex-mono)] text-[12px] tracking-[0.04em] text-[#a3a8a2] lg:hidden">
            ↺ Repayment feeds back into Data
          </p>
        </div>
      </div>
    </section>
  );
}
