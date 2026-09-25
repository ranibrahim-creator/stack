"use client";

import { IsoBox } from "./iso";
import { Reveal } from "./ui/Reveal";

function LabFigure() {
  return (
    <svg viewBox="0 0 200 160" className="h-[132px] w-[164px]" fill="none" aria-hidden>
      <IsoBox x={0} y={8} z={0} w={36} h={28} d={28} ox={92} oy={118} s={1.35} />
      <g className="fig-lab-lid">
        <IsoBox x={10} y={38} z={6} w={16} h={4} d={16} ox={92} oy={118} s={1.35} />
      </g>
    </svg>
  );
}

function FulfilmentFigure() {
  return (
    <svg viewBox="0 0 200 160" className="h-[132px] w-[164px]" fill="none" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="fig-inv-layer" style={{ ["--i" as string]: i }}>
          <IsoBox x={0} y={i * 7.8} z={0} w={42} h={5} d={42} ox={100} oy={118} s={1.25} />
        </g>
      ))}
    </svg>
  );
}

function DataFigure() {
  const heights = [16, 26, 20, 36, 28];
  return (
    <svg viewBox="0 0 200 160" className="h-[132px] w-[164px]" fill="none" aria-hidden>
      {heights.map((height, i) => (
        <g key={i} className="fig-sale-bar" style={{ ["--i" as string]: i }}>
          <IsoBox
            x={i * 9}
            y={0}
            z={0}
            w={7}
            h={height}
            d={16}
            ox={78}
            oy={122}
            s={1.25}
          />
        </g>
      ))}
    </svg>
  );
}

function PayoutFigure() {
  return (
    <svg viewBox="0 0 200 160" className="h-[132px] w-[164px]" fill="none" aria-hidden>
      <IsoBox x={0} y={0} z={0} w={34} h={22} d={22} ox={88} oy={118} s={1.3} />
      <g className="fig-pay-slice">
        <IsoBox x={36} y={0} z={2} w={8} h={22} d={18} ox={88} oy={118} s={1.3} stroke="#C5CBD3" />
      </g>
    </svg>
  );
}

const items = [
  {
    id: "FIG 0.1",
    title: "Seller Lab",
    body: "Distribution and seller experience",
    Figure: LabFigure,
  },
  {
    id: "FIG 0.2",
    title: "noon fulfilment",
    body: "Inventory visibility and control",
    Figure: FulfilmentFigure,
  },
  {
    id: "FIG 0.3",
    title: "Commerce data",
    body: "Pre-qualification and financing decisions",
    Figure: DataFigure,
  },
  {
    id: "FIG 0.4",
    title: "Seller payouts",
    body: "Revenue-based collections",
    Figure: PayoutFigure,
  },
];

export function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="scroll-mt-24 px-5 pt-24 font-[family-name:var(--font-inter-tight)] md:px-8 md:pt-32 lg:px-12"
    >
      <Reveal>
        <p className="max-w-[860px] text-[28px] font-normal leading-[1.12] tracking-[-0.038em] text-[#8A8F98] sm:text-[32px] lg:text-[36px]">
          <span className="text-ink">
            Stack isn’t a financing product sitting outside the commerce
            experience.{" "}
          </span>
          It’s built around infrastructure that already exists within noon.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal
            key={item.id}
            delay={index * 0.06}
            className={`fig-stage flex min-w-0 flex-col px-4 py-6 md:px-6 ${
              index % 2 === 1 ? "border-l border-[#1a1a1a]" : ""
            } ${index > 1 ? "border-t border-[#1a1a1a] lg:border-t-0" : ""} ${
              index > 0 ? "lg:border-l" : "lg:border-l-0"
            }`}
          >
            <p className="font-[family-name:var(--font-plex-mono)] text-[11px] tracking-[0.08em] text-[#5c6166]">
              {item.id}
            </p>
            <div className="fig-visual flex h-[160px] items-center justify-center">
              <item.Figure />
            </div>
            <h3 className="text-[15px] font-medium tracking-[-0.025em] text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-[13px] leading-[1.45] tracking-[-0.018em] text-[#8A8F98]">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>

      <p className="mt-12 max-w-[640px] text-[15px] leading-[1.45] tracking-[-0.02em] text-[#8A8F98] md:mt-14">
        Stack connects these capabilities into a single embedded financing
        platform.
      </p>
    </section>
  );
}
