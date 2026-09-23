"use client";

import { Reveal } from "./ui/Reveal";

function p(
  x: number,
  y: number,
  z: number,
  ox: number,
  oy: number,
  s = 1,
) {
  return `${ox + (x - z) * 0.866 * s},${oy + (x + z) * 0.5 * s - y * s}`;
}

function IsoBox({
  x,
  y,
  z,
  w,
  h,
  d,
  ox,
  oy,
  s = 1,
  stroke = "#D0D6E0",
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  ox: number;
  oy: number;
  s?: number;
  stroke?: string;
}) {
  const pt = (dx: number, dy: number, dz: number) => p(x + dx, y + dy, z + dz, ox, oy, s);
  return (
    <g fill="#000" stroke={stroke} strokeWidth="0.7" strokeLinejoin="round">
      <path d={`M ${pt(0, h, d)} L ${pt(w, h, d)} L ${pt(w, 0, d)} L ${pt(0, 0, d)} Z`} />
      <path d={`M ${pt(w, h, 0)} L ${pt(w, h, d)} L ${pt(w, 0, d)} L ${pt(w, 0, 0)} Z`} />
      <path d={`M ${pt(0, h, 0)} L ${pt(w, h, 0)} L ${pt(w, h, d)} L ${pt(0, h, d)} Z`} />
    </g>
  );
}

function InventoryFigure() {
  const ox = 132;
  const oy = 188;
  const s = 1.35;
  const w = 54;
  const d = 54;
  const h = 6;
  const gap = 2.2;
  const layers = 5;
  const topY = (layers - 1) * (h + gap) + h;
  const cx = ox + (w / 2 - d / 2) * 0.866 * s;
  const cy = oy + (w / 2 + d / 2) * 0.5 * s - topY * s;

  return (
    <svg viewBox="0 0 264 260" className="h-[200px] w-[204px]" fill="none" aria-hidden>
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
  const ox = 118;
  const oy = 188;
  const s = 1.35;
  const w = 44;
  const slice = 9;
  const h = 38;
  const d = 44;

  return (
    <svg viewBox="0 0 264 260" className="h-[200px] w-[204px]" fill="none" aria-hidden>
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
  const ox = 72;
  const oy = 196;
  const s = 1.2;
  const heights = [22, 34, 26, 50, 38, 58, 44];
  const pitch = 11;
  const barW = 8;
  const barD = 16;

  return (
    <svg viewBox="0 0 264 260" className="h-[200px] w-[204px]" fill="none" aria-hidden>
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
    title: "Based on sales you already make",
    body: "Eligibility uses existing commerce signals. Total shown before you accept.",
    Figure: SalesFigure,
  },
];

export function ProductCards() {
  return (
    <section
      id="products"
      className="scroll-mt-24 px-5 pt-24 font-[family-name:var(--font-inter-tight)] md:px-8 md:pt-32 lg:px-12 lg:pt-40"
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
            className={`flex min-w-0 flex-col ${
              index === 0
                ? "pr-4 md:pr-10"
                : index === figures.length - 1
                  ? "border-l border-[#1a1a1a] pl-4 md:pl-10"
                  : "border-l border-[#1a1a1a] px-4 md:px-10"
            }`}
          >
            <p className="text-[11px] tracking-[0.08em] text-[#5c6166]">{item.id}</p>
            <div className="flex h-[260px] items-center justify-center lg:h-[320px]">
              <item.Figure />
            </div>
            <h3 className="text-[14px] font-medium tracking-[-0.025em] text-ink">
              {item.title}
            </h3>
            <p className="mt-2 max-w-[280px] text-[13px] leading-[1.45] tracking-[-0.018em] text-[#8A8F98]">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
