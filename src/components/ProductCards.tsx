"use client";

import { IsoBox } from "./iso";
import { Reveal } from "./ui/Reveal";

const FIG = { w: 280, h: 260, s: 1.5 };

function DataFigure() {
  const ox = 100;
  const oy = 172;
  const s = FIG.s;
  const heights = [20, 32, 24, 46, 36, 52, 40];
  const pitch = 10;

  return (
    <svg viewBox={`0 0 ${FIG.w} ${FIG.h}`} className="size-[200px]" fill="none" aria-hidden>
      {heights.map((height, i) => (
        <g key={i} className="fig-sale-bar" style={{ ["--i" as string]: i }}>
          <IsoBox
            x={i * pitch}
            y={0}
            z={0}
            w={8}
            h={height}
            d={20}
            ox={ox}
            oy={oy}
            s={s}
          />
        </g>
      ))}
    </svg>
  );
}

function InventoryFigure() {
  const ox = 140;
  const oy = 172;
  const s = FIG.s;
  const w = 50;
  const d = 50;
  const h = 6;
  const gap = 2.2;
  const layers = 5;
  const topY = (layers - 1) * (h + gap) + h;
  const cx = ox + (w / 2 - d / 2) * 0.866 * s;
  const cy = oy + (w / 2 + d / 2) * 0.5 * s - topY * s;

  return (
    <svg viewBox={`0 0 ${FIG.w} ${FIG.h}`} className="size-[200px]" fill="none" aria-hidden>
      {Array.from({ length: layers }, (_, i) => (
        <g key={i} className="fig-inv-layer" style={{ ["--i" as string]: i }}>
          <IsoBox x={0} y={i * (h + gap)} z={0} w={w} h={h} d={d} ox={ox} oy={oy} s={s} />
          {i === layers - 1 ? (
            <>
              <ellipse cx={cx} cy={cy} rx={14} ry={8} stroke="#D0D6E0" strokeWidth="0.7" />
              <ellipse cx={cx} cy={cy} rx={8} ry={4.6} stroke="#D0D6E0" strokeWidth="0.7" />
            </>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

function RepaymentFigure() {
  const ox = 122;
  const oy = 172;
  const s = FIG.s;

  return (
    <svg viewBox={`0 0 ${FIG.w} ${FIG.h}`} className="size-[200px]" fill="none" aria-hidden>
      <IsoBox x={0} y={0} z={0} w={42} h={36} d={42} ox={ox} oy={oy} s={s} />
      <g className="fig-pay-slice">
        <IsoBox
          x={42}
          y={0}
          z={0}
          w={9}
          h={36}
          d={42}
          ox={ox}
          oy={oy}
          s={s}
          stroke="#C5CBD3"
        />
      </g>
    </svg>
  );
}

const figures = [
  {
    id: "FIG 0.1",
    title: "Pre-qualified from your data",
    body: "No separate application. Eligibility comes from your existing noon sales and inventory.",
    Figure: DataFigure,
  },
  {
    id: "FIG 0.2",
    title: "Tied to your inventory",
    body: "Capital sits on stock noon already holds. Not a separate credit check.",
    Figure: InventoryFigure,
  },
  {
    id: "FIG 0.3",
    title: "Repaid as you sell",
    body: "A share of sales, taken from the weekly payout noon already sends.",
    Figure: RepaymentFigure,
  },
];

export function ProductCards() {
  return (
    <section
      id="products"
      className="scroll-mt-24 px-5 pt-24 font-[family-name:var(--font-inter-tight)] md:px-8 md:pt-32 lg:px-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        {figures.map((item, index) => (
          <Reveal
            key={item.id}
            delay={index * 0.08}
            className={`fig-stage flex min-w-0 flex-col px-6 py-10 md:px-8 md:py-12 ${
              index > 0 ? "border-t border-[#1a1a1a] md:border-t-0 md:border-l" : ""
            }`}
          >
            <p className="font-[family-name:var(--font-plex-mono)] text-[11px] tracking-[0.08em] text-[#5c6166]">
              {item.id}
            </p>
            <div className="fig-visual flex h-[240px] items-center justify-center lg:h-[280px]">
              <item.Figure />
            </div>
            <h3 className="text-[15px] font-medium tracking-[-0.025em] text-ink">
              {item.title}
            </h3>
            <p className="mt-2 max-w-[320px] text-[13px] leading-[1.45] tracking-[-0.018em] text-[#8A8F98]">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
