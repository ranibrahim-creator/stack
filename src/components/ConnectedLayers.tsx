"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";
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
const JUNCTION = 12;
const LABEL = "FEEDS THE NEXT CYCLE";
const BEAM_SECONDS = 8;

type LoopGeom = {
  width: number;
  height: number;
  loop: string;
  visible: string;
  staticTop: string;
  nodes: { x: number; y: number }[];
  arrowX: number;
  arrowY: number;
  labelX: number;
  labelY: number;
  stageHits: number[];
};

function relBox(wrap: DOMRect, el: Element) {
  const r = el.getBoundingClientRect();
  return {
    left: r.left - wrap.left,
    right: r.right - wrap.left,
    top: r.top - wrap.top,
    bottom: r.bottom - wrap.top,
  };
}

function quarter(r: number) {
  return (Math.PI * r) / 2;
}

function buildLoop(wrap: HTMLElement): LoopGeom | null {
  const rules = [...wrap.querySelectorAll("[data-stage-rule]")];
  if (rules.length !== 4) return null;

  const wr = wrap.getBoundingClientRect();
  if (wr.width < 40 || wr.height < 40) return null;

  const boxes = rules.map((el) => relBox(wr, el));
  const aligned = boxes.every((b) => Math.abs(b.top - boxes[0].top) < 12);
  if (!aligned) return null;

  const inset = 1;
  const radius =
    parseFloat(getComputedStyle(wrap).borderTopLeftRadius) || 12;
  const L = inset;
  const R = wr.width - inset;
  const T = inset;
  const B = wr.height - inset;
  const y = boxes[0].top + 0.5;
  const J = JUNCTION;
  const r1 = boxes[0];

  const alongRules = boxes.flatMap((box, i) => {
    const parts = [`L ${box.right} ${y}`];
    if (i < boxes.length - 1) parts.push(`L ${boxes[i + 1].left} ${y}`);
    return parts;
  });

  const loop = [
    `M ${L} ${y + J}`,
    `Q ${L} ${y} ${L + J} ${y}`,
    `L ${r1.left} ${y}`,
    ...alongRules,
    `L ${R - J} ${y}`,
    `Q ${R} ${y} ${R} ${y + J}`,
    `L ${R} ${B - radius}`,
    `Q ${R} ${B} ${R - radius} ${B}`,
    `L ${L + radius} ${B}`,
    `Q ${L} ${B} ${L} ${B - radius}`,
    `L ${L} ${y + J}`,
    "Z",
  ].join(" ");

  const mid = wr.width / 2;
  const gap = 120;
  const gapL = Math.max(L + radius + 8, mid - gap);
  const gapR = Math.min(R - radius - 8, mid + gap);

  const visible = [
    `M ${L} ${y + J}`,
    `Q ${L} ${y} ${L + J} ${y}`,
    `L ${r1.left} ${y}`,
    ...alongRules,
    `L ${R - J} ${y}`,
    `Q ${R} ${y} ${R} ${y + J}`,
    `L ${R} ${B - radius}`,
    `Q ${R} ${B} ${R - radius} ${B}`,
    `L ${gapR} ${B}`,
    `M ${gapL} ${B}`,
    `L ${L + radius} ${B}`,
    `Q ${L} ${B} ${L} ${B - radius}`,
    `L ${L} ${y + J}`,
  ].join(" ");

  const staticTop = [
    `M ${L} ${y}`,
    `L ${L} ${T + radius}`,
    `Q ${L} ${T} ${L + radius} ${T}`,
    `L ${R - radius} ${T}`,
    `Q ${R} ${T} ${R} ${T + radius}`,
    `L ${R} ${y}`,
  ].join(" ");

  let dist = quarter(J) + Math.max(0, r1.left - (L + J));
  const stageHits = [dist];
  boxes.forEach((box, i) => {
    if (i === 0) return;
    dist += boxes[i - 1].right - boxes[i - 1].left;
    dist += box.left - boxes[i - 1].right;
    stageHits.push(dist);
  });

  return {
    width: wr.width,
    height: wr.height,
    loop,
    visible,
    staticTop,
    nodes: boxes.map((b) => ({ x: b.left, y })),
    arrowX: r1.left,
    arrowY: y,
    labelX: mid,
    labelY: B,
    stageHits,
  };
}

function LoopOverlay({
  wrapRef,
  onStageHit,
}: {
  wrapRef: RefObject<HTMLDivElement | null>;
  onStageHit: (index: number) => void;
}) {
  const reduce = useReducedMotion();
  const [geom, setGeom] = useState<LoopGeom | null>(null);
  const [pathLen, setPathLen] = useState(0);
  const measurePath = useRef<SVGPathElement>(null);
  const lastDist = useRef(0);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      setGeom(buildLoop(wrap));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    wrap.querySelectorAll("[data-stage-rule]").forEach((el) => ro.observe(el));
    window.addEventListener("resize", measure);
    const fonts = document.fonts?.ready.then(measure);
    const again = window.setTimeout(measure, 120);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(again);
      void fonts;
    };
  }, [wrapRef]);

  useLayoutEffect(() => {
    const el = measurePath.current;
    setPathLen(el ? el.getTotalLength() : 0);
  }, [geom?.loop]);

  if (!geom) return null;

  const tail = Math.max(40, pathLen * 0.05);
  const head = Math.max(12, pathLen * 0.014);

  return (
    <>
      <svg
        viewBox={`0 0 ${geom.width} ${geom.height}`}
        className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block"
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
        </defs>

        <path d={geom.staticTop} stroke="rgb(255 255 255 / 0.16)" strokeWidth="1" />
        <path
          d={geom.visible}
          stroke={TRACE}
          strokeWidth="1.25"
          strokeOpacity="0.72"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path ref={measurePath} d={geom.loop} stroke="none" />

        {geom.nodes.map((node, i) => (
          <circle key={i} cx={node.x} cy={node.y} r="2.25" fill={TRACE} />
        ))}

        <path
          d={`M ${geom.arrowX - 8} ${geom.arrowY - 4} L ${geom.arrowX} ${geom.arrowY} L ${geom.arrowX - 8} ${geom.arrowY + 4}`}
          stroke={TRACE}
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

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
                    dist >= prev ? prev < hit && dist >= hit : prev < hit || dist >= hit;
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
      <p
        className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 bg-[#0a0b0a] px-2.5 font-[family-name:var(--font-plex-mono)] text-[12px] tracking-[0.16em] text-[#c4c7c2] uppercase lg:block"
        style={{ left: geom.labelX, top: geom.labelY }}
      >
        {LABEL}
      </p>
    </>
  );
}

export function ConnectedLayers() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState<number | null>(null);
  const litTimer = useRef(0);
  const lastHit = useRef(-1);

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

  return (
    <section id="layers" className="section-shell">
      <Reveal>
        <div
          ref={wrapRef}
          className="glass-card-mint stages-card relative overflow-hidden rounded-[12px] border-[rgb(255_255_255/0.08)] px-8 py-10 sm:px-10 md:px-14 md:py-14 lg:border-transparent"
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

          <LoopOverlay wrapRef={wrapRef} onStageHit={onStageHit} />
        </div>
      </Reveal>
    </section>
  );
}
