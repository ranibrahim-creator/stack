"use client";

import { motion, useReducedMotion } from "framer-motion";
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

const TRACE = "#8A8F98";
const BEAM = "#3cb86a";
const BEAM_HEAD = "#7ae0a4";
const RAD = 12;
const INSET = 16;
const LABEL = "FEEDS THE NEXT CYCLE";
const BEAM_SECONDS = 8;

type Box = { left: number; right: number; top: number };

type LoopGeom = {
  width: number;
  height: number;
  loop: string;
  nodes: { x: number; y: number }[];
  sourceX: number;
  sourceY: number;
  arrowTipX: number;
  arrowY: number;
  labelX: number;
  labelY: number;
  stageHits: number[];
};

function buildLoop(wrap: HTMLElement): LoopGeom | null {
  const rules = [...wrap.querySelectorAll("[data-stage-rule]")];
  const wr = wrap.getBoundingClientRect();
  if (wr.width < 80 || wr.height < 80) return null;

  let boxes: Box[] = rules.map((el) => {
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
  const run = Math.min(r1.left - INSET, wr.width - INSET - r4.right);
  if (run < RAD + 20) return null;
  const L = r1.left - run;
  const R = r4.right + run;
  const B = wr.height - INSET;

  const alongRules = [
    `L ${r1.left} ${y}`,
    ...boxes.flatMap((box, i) => {
      const parts = [`L ${box.right} ${y}`];
      if (i < boxes.length - 1) parts.push(`L ${boxes[i + 1].left} ${y}`);
      return parts;
    }),
  ];

  const loop = [
    `M ${L} ${y + RAD}`,
    `Q ${L} ${y} ${L + RAD} ${y}`,
    ...alongRules,
    `L ${R - RAD} ${y}`,
    `Q ${R} ${y} ${R} ${y + RAD}`,
    `L ${R} ${B - RAD}`,
    `Q ${R} ${B} ${R - RAD} ${B}`,
    `L ${L + RAD} ${B}`,
    `Q ${L} ${B} ${L} ${B - RAD}`,
    `L ${L} ${y + RAD}`,
    "Z",
  ].join(" ");

  let dist = (Math.PI * RAD) / 2 + Math.max(0, r1.left - (L + RAD));
  const stageHits = [dist];
  boxes.forEach((_, i) => {
    if (i === 0) return;
    dist += boxes[i - 1].right - boxes[i - 1].left;
    dist += boxes[i].left - boxes[i - 1].right;
    stageHits.push(dist);
  });

  return {
    width: wr.width,
    height: wr.height,
    loop,
    nodes: boxes.slice(0, 3).map((b) => ({ x: b.left, y })),
    sourceX: r4.right,
    sourceY: y,
    arrowTipX: r1.left - 24,
    arrowY: y,
    labelX: wr.width / 2,
    labelY: B,
    stageHits,
  };
}

export function ConnectedLayers() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapEl, setWrapEl] = useState<HTMLDivElement | null>(null);
  const measurePath = useRef<SVGPathElement>(null);
  const labelRef = useRef<SVGTextElement>(null);
  const lastDist = useRef(0);
  const litTimer = useRef(0);
  const lastHit = useRef(-1);
  const reduce = useReducedMotion();
  const [geom, setGeom] = useState<LoopGeom | null>(null);
  const [pathLen, setPathLen] = useState(0);
  const [labelW, setLabelW] = useState(196);
  const [lit, setLit] = useState<number | null>(null);

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

  useLayoutEffect(() => {
    setPathLen(measurePath.current?.getTotalLength() ?? 0);
    const text = labelRef.current;
    if (text) setLabelW(text.getComputedTextLength());
  }, [geom?.loop]);

  const onStageHit = (index: number) => {
    if (lastHit.current === index) return;
    lastHit.current = index;
    window.clearTimeout(litTimer.current);
    setLit(index);
    litTimer.current = window.setTimeout(() => {
      setLit((current) => (current === index ? null : current));
      if (lastHit.current === index) lastHit.current = -1;
    }, 600);
  };

  const tail = Math.max(40, pathLen * 0.05);
  const head = Math.max(12, pathLen * 0.014);
  const gap = labelW / 2 + 12;

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
            emphasize="none"
            line1="One platform."
            line2="Four connected stages."
          />

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {nodes.map((node, index) => (
              <div
                key={node.title}
                data-stage-rule
                className={`group min-w-0 border-t pt-5 transition-colors duration-200 hover:border-[#2f9a5c] ${
                  lit === index ? "border-[#3cb86a]" : "border-white/12"
                }`}
              >
                <p
                  className={`font-[family-name:var(--font-plex-mono)] text-[12px] tracking-[0.16em] uppercase transition-colors duration-200 group-hover:text-[#3cb86a] ${
                    lit === index ? "text-[#7ae0a4]" : "text-[#a3a8a2]"
                  }`}
                >
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
              <defs>
                <linearGradient id="stages-beam-fade" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={BEAM} stopOpacity="0" />
                  <stop offset="55%" stopColor={BEAM} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={BEAM_HEAD} stopOpacity="1" />
                </linearGradient>
                <filter id="stages-beam-glow" x="-50%" y="-80%" width="200%" height="260%">
                  <feGaussianBlur stdDeviation="2.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <mask id="stages-label-gap" maskUnits="userSpaceOnUse">
                  <rect width={geom.width} height={geom.height} fill="white" />
                  <rect
                    x={geom.labelX - gap}
                    y={geom.labelY - 9}
                    width={gap * 2}
                    height="18"
                    fill="black"
                  />
                </mask>
              </defs>

              <path
                d={geom.loop}
                stroke={TRACE}
                strokeWidth="1.2"
                strokeOpacity="0.42"
                strokeLinecap="round"
                strokeLinejoin="round"
                mask="url(#stages-label-gap)"
              />
              <path ref={measurePath} d={geom.loop} stroke="none" />

              {geom.nodes.map((node, i) => (
                <circle key={i} cx={node.x} cy={node.y} r="2.1" fill={TRACE} />
              ))}
              <circle cx={geom.sourceX} cy={geom.sourceY} r="2.6" fill={BEAM} />

              <path
                d={`M ${geom.arrowTipX - 8} ${geom.arrowY - 5} L ${geom.arrowTipX} ${geom.arrowY} L ${geom.arrowTipX - 8} ${geom.arrowY + 5}`}
                stroke={TRACE}
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <text
                ref={labelRef}
                x={geom.labelX}
                y={geom.labelY}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#c4c7c2"
                fontSize="12"
                letterSpacing="1.92"
                style={{ fontFamily: "var(--font-plex-mono)" }}
              >
                {LABEL}
              </text>

              {!reduce && pathLen > 0 ? (
                <>
                  <motion.path
                    d={geom.loop}
                    stroke={BEAM}
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeOpacity="0.32"
                    strokeDasharray={`${tail} ${Math.max(1, pathLen - tail)}`}
                    filter="url(#stages-beam-glow)"
                    animate={{ strokeDashoffset: [0, -pathLen] }}
                    transition={{ duration: BEAM_SECONDS, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path
                    d={geom.loop}
                    stroke={BEAM_HEAD}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeDasharray={`${head} ${Math.max(1, pathLen - head)}`}
                    filter="url(#stages-beam-glow)"
                    animate={{ strokeDashoffset: [0, -pathLen] }}
                    transition={{ duration: BEAM_SECONDS, repeat: Infinity, ease: "linear" }}
                    onUpdate={(latest) => {
                      const raw = Number(latest.strokeDashoffset);
                      if (!Number.isFinite(raw) || pathLen <= 0) return;
                      const dist = ((-raw % pathLen) + pathLen) % pathLen;
                      const prev = lastDist.current;
                      const step = dist >= prev ? dist - prev : pathLen - prev + dist;
                      lastDist.current = dist;
                      if (step <= 0 || step > pathLen * 0.12) return;
                      geom.stageHits.forEach((hit, i) => {
                        const crossed =
                          dist >= prev
                            ? prev < hit && dist >= hit
                            : prev < hit || dist >= hit;
                        if (crossed) onStageHit(i);
                      });
                    }}
                  />
                  <motion.rect
                    width="52"
                    height="2"
                    rx="1"
                    fill="url(#stages-beam-fade)"
                    filter="url(#stages-beam-glow)"
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{ duration: BEAM_SECONDS, repeat: Infinity, ease: "linear" }}
                    style={{
                      offsetPath: `path('${geom.loop}')`,
                      offsetRotate: "auto",
                    }}
                  />
                </>
              ) : null}
            </svg>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
