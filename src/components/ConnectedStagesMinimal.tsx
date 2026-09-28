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

const RAD = 16;
const RETURN = "rgb(255 255 255 / 0.45)";

type Geom = {
  width: number;
  height: number;
  d: string;
  arrow: string;
};

function boxIn(wrap: HTMLElement, el: HTMLElement) {
  const wr = wrap.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return {
    left: r.left - wr.left,
    right: r.right - wr.left,
    top: r.top - wr.top,
    bottom: r.bottom - wr.top,
    midX: r.left - wr.left + r.width / 2,
    midY: r.top - wr.top + r.height / 2,
  };
}

function buildGeom(wrap: HTMLElement, cards: HTMLElement[]): Geom | null {
  if (cards.length !== 4) return null;
  if (wrap.offsetWidth < 80 || wrap.offsetHeight < 80) return null;

  const boxes = cards.map((el) => boxIn(wrap, el));
  const aligned = boxes.every((b) => Math.abs(b.top - boxes[0].top) < 12);
  if (!aligned) return null;

  const c1 = boxes[0];
  const c4 = boxes[3];
  const drop = 40;
  const yB = c4.bottom + drop;
  const sx = c4.midX;
  const ex = c1.midX;

  const d = [
    `M ${sx} ${c4.bottom}`,
    `L ${sx} ${yB - RAD}`,
    `Q ${sx} ${yB} ${sx - RAD} ${yB}`,
    `L ${ex + RAD} ${yB}`,
    `Q ${ex} ${yB} ${ex} ${yB - RAD}`,
    `L ${ex} ${c1.bottom}`,
  ].join(" ");

  const tipY = c1.bottom;
  const arrow = `M ${ex - 4} ${tipY + 7} L ${ex} ${tipY + 1} L ${ex + 4} ${tipY + 7}`;

  return {
    width: wrap.offsetWidth,
    height: wrap.offsetHeight,
    d,
    arrow,
  };
}

export function ConnectedStagesMinimal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();
  const inView = useInView(wrapRef, { once: true, amount: 0.2 });
  const [geom, setGeom] = useState<Geom | null>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const cards = cardRefs.current.filter((el): el is HTMLLIElement => !!el);
      setGeom(buildGeom(wrap, cards));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    const later = window.setTimeout(measure, 0);
    const afterMotion = window.setTimeout(measure, 900);
    void document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(later);
      window.clearTimeout(afterMotion);
    };
  }, [inView]);

  const showPath = inView && !!geom;

  return (
    <section
      id="layers"
      className="section-shell relative !pt-12 !pb-12 md:!pt-16 md:!pb-16 lg:!pt-24 lg:!pb-24"
    >
      <div className="relative">
        <SectionTitle
          emphasize="none"
          line1="One platform."
          line2="Four connected stages."
        />

        <div ref={wrapRef} className="relative mt-12 pb-16 lg:mt-14">
          {geom ? (
            <motion.svg
              viewBox={`0 0 ${geom.width} ${geom.height}`}
              width={geom.width}
              height={geom.height}
              className="pointer-events-none absolute top-0 left-0 z-0 hidden lg:block"
              fill="none"
              aria-hidden
              initial={false}
              animate={{ opacity: showPath ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
            >
              <path
                id="minimal-return"
                d={geom.d}
                stroke={RETURN}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={geom.arrow}
                stroke={RETURN}
                strokeWidth="1.15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          ) : null}

          <ol className="relative z-10 m-0 grid list-none grid-cols-1 gap-10 bg-transparent p-0 lg:grid-cols-4 lg:items-stretch lg:gap-x-10 lg:gap-y-0">
            {stages.map((stage, index) => (
              <motion.li
                key={stage.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="relative flex h-full min-w-0 flex-col rounded-[12px] border border-white/[0.06] p-6 backdrop-blur-[24px] backdrop-saturate-150"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 80% at 88% 0%, rgb(28 132 72 / 0.22), rgb(14 92 52 / 0.08) 42%, transparent 70%), rgb(8 10 12 / 0.42)",
                }}
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
                {index < 3 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-[-2.5rem] hidden h-px w-10 bg-[rgb(255_255_255/0.45)] lg:block"
                  />
                ) : null}
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
