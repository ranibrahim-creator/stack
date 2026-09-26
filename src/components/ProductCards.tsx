"use client";

import { IsoBox } from "./iso";
import { Reveal } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

const FIG = { w: 280, h: 260, s: 1.5 };

function DataFigure() {
  const ox = 72;
  const oy = 176;
  const s = FIG.s;
  const heights = [16, 26, 20, 36, 30, 44];
  const pitch = 13;

  return (
    <svg viewBox={`0 0 ${FIG.w} ${FIG.h}`} className="size-36 max-w-full sm:size-44" fill="none" aria-hidden>
      {heights.map((height, i) => (
        <g key={i} className="fig-data-bar" style={{ ["--i" as string]: i }}>
          <IsoBox
            x={i * pitch}
            y={0}
            z={0}
            w={8}
            h={height}
            d={16}
            ox={ox}
            oy={oy}
            s={s}
            stroke={height >= 36 ? "#7ae0a4" : "#D0D6E0"}
          />
        </g>
      ))}
    </svg>
  );
}

function InventoryFigure() {
  const ox = 140;
  const oy = 176;
  const s = FIG.s;
  const w = 50;
  const d = 50;
  const h = 6;
  const gap = 2.2;
  const layers = 5;

  return (
    <svg viewBox={`0 0 ${FIG.w} ${FIG.h}`} className="size-36 max-w-full sm:size-44" fill="none" aria-hidden>
      {Array.from({ length: layers }, (_, i) => {
        const capital = i === 2;
        return (
          <g
            key={i}
            className="fig-inv-layer"
            style={{ ["--i" as string]: i }}
          >
            <IsoBox
              x={0}
              y={i * (h + gap)}
              z={0}
              w={w}
              h={h}
              d={d}
              ox={ox}
              oy={oy}
              s={s}
              stroke={capital ? "#7ae0a4" : "#D0D6E0"}
            />
          </g>
        );
      })}
    </svg>
  );
}

function RepaymentFigure() {
  const ox = 86;
  const oy = 168;
  const s = FIG.s;

  return (
    <svg viewBox={`0 0 ${FIG.w} ${FIG.h}`} className="size-36 max-w-full sm:size-44" fill="none" aria-hidden>
      <IsoBox x={0} y={0} z={0} w={40} h={16} d={28} ox={ox} oy={oy} s={s} />
      <g className="fig-pay-share">
        <IsoBox
          x={41}
          y={0}
          z={0}
          w={7}
          h={16}
          d={28}
          ox={ox}
          oy={oy}
          s={s}
          stroke="#7ae0a4"
        />
      </g>
    </svg>
  );
}

const figures = [
  {
    title: "Pre-qualified from your data",
    body: "No separate application. Eligibility comes from your existing noon sales and inventory.",
    Figure: DataFigure,
  },
  {
    title: "Tied to your inventory",
    body: "Capital sits on stock noon already holds. Not a separate credit check.",
    Figure: InventoryFigure,
  },
  {
    title: "Repaid as you sell",
    body: "A share of sales, taken from the weekly payout noon already sends.",
    Figure: RepaymentFigure,
  },
];

export function ProductCards() {
  return (
    <section id="products" className="section-shell">
      <Reveal>
        <SectionTitle emphasize="none" line1="Why choose" line2="Stack" />
      </Reveal>
      <div className="mt-6 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">
        {figures.map((item, index) => (
          <Reveal
            key={item.title}
            delay={index * 0.08}
            className={`fig-stage flex min-w-0 flex-col px-0 py-5 sm:px-4 lg:px-6 ${
              index > 0 ? "border-t border-[#1a1a1a] sm:border-t-0 sm:border-l" : ""
            } ${index === 2 ? "sm:col-span-2 sm:border-t sm:border-l-0 lg:col-span-1 lg:border-t-0 lg:border-l" : ""}`}
          >
            <div className="fig-visual flex h-40 items-center justify-center sm:h-52">
              <item.Figure />
            </div>
            <h3 className="text-[16px] font-medium text-ink">
              {item.title}
            </h3>
            <p className="mt-2 max-w-xs text-[14px] leading-[1.5] text-[#8A8F98]">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
