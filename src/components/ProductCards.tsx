"use client";

import { IsoBox } from "./iso";
import { Reveal } from "./ui/Reveal";

const FIG = { w: 280, h: 260, s: 1.5 };

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
  const w = 42;
  const slice = 9;
  const h = 36;
  const d = 42;

  return (
    <svg viewBox={`0 0 ${FIG.w} ${FIG.h}`} className="size-[200px]" fill="none" aria-hidden>
      <IsoBox x={0} y={0} z={0} w={w} h={h} d={d} ox={ox} oy={oy} s={s} />
      <g className="fig-pay-slice">
        <IsoBox
          x={w}
          y={0}
          z={0}
          w={slice}
          h={h}
          d={d}
          ox={ox}
          oy={oy}
          s={s}
          stroke="#C5CBD3"
        />
      </g>
    </svg>
  );
}

function SalesFigure() {
  const ox = 100;
  const oy = 172;
  const s = FIG.s;
  const heights = [20, 32, 24, 46, 36, 52, 40];
  const pitch = 10;
  const barW = 8;
  const barD = 20;

  return (
    <svg viewBox={`0 0 ${FIG.w} ${FIG.h}`} className="size-[200px]" fill="none" aria-hidden>
      {heights.map((height, i) => (
        <g key={i} className="fig-sale-bar" style={{ ["--i" as string]: i }}>
          <IsoBox
            x={i * pitch}
            y={0}
            z={0}
            w={barW}
            h={height}
            d={barD}
            ox={ox}
            oy={oy}
            s={s}
          />
        </g>
      ))}
    </svg>
  );
}

const figures = [
  {
    id: "FIG 0.1",
    title: "Tied to inventory",
    body: "Capital sits on stock noon already holds. Not a separate credit check.",
    Figure: InventoryFigure,
  },
  {
    id: "FIG 0.2",
    title: "Repaid as you sell",
    body: "A share of sales, taken from the weekly payout noon already sends.",
    Figure: RepaymentFigure,
  },
  {
    id: "FIG 0.3",
    title: "Based on your sales",
    body: "Eligibility uses existing commerce signals. Total shown before you accept.",
    Figure: SalesFigure,
  },
];

export function ProductCards() {
  return (
    <section
      id="products"
      className="scroll-mt-24 px-5 pt-28 font-[family-name:var(--font-inter-tight)] md:px-8 md:pt-36 lg:px-12"
    >
      <Reveal>
        <p
          id="product-terms"
          className="max-w-[920px] scroll-mt-28 text-[32px] font-normal leading-[1.12] tracking-[-0.038em] text-[#8A8F98] sm:text-[36px] lg:text-[40px]"
        >
          <span className="text-ink">Seller Financing is live. </span>
          Purpose-built for noon sellers in the UAE. Capital sits on inventory
          noon already holds, and is repaid from the weekly payout noon already
          sends.
        </p>
      </Reveal>

      <div className="mt-24 grid grid-cols-3 md:mt-28 lg:mt-32">
        {figures.map((item, index) => (
          <Reveal
            key={item.id}
            delay={index * 0.08}
            className={`flex min-w-0 flex-col px-5 md:px-8 ${
              index > 0 ? "border-l border-[#1a1a1a]" : ""
            }`}
          >
            <p className="font-[family-name:var(--font-plex-mono)] text-[11px] tracking-[0.08em] text-[#5c6166]">
              {item.id}
            </p>
            <div className="flex h-[240px] items-center justify-center lg:h-[280px]">
              <item.Figure />
            </div>
            <h3 className="min-h-[1.3em] text-[15px] font-medium tracking-[-0.025em] text-ink">
              {item.title}
            </h3>
            <p className="mt-2 min-h-[4em] text-[13px] leading-[1.45] tracking-[-0.018em] text-[#8A8F98]">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 grid grid-cols-3 items-start border-t border-[#1a1a1a] pt-6 md:mt-20">
        <p className="col-span-2 px-5 text-[15px] leading-[1.4] tracking-[-0.022em] text-[#8A8F98] md:px-8">
          Built within the noon ecosystem — Seller Lab, fulfilment, commerce
          data, and weekly payouts.
        </p>
        <p className="px-5 text-left font-[family-name:var(--font-plex-mono)] text-[11px] leading-[1.4] tracking-[0.04em] text-[#5c6166] md:px-8">
          3+ financing cycles per seller, on average
        </p>
      </Reveal>
    </section>
  );
}
