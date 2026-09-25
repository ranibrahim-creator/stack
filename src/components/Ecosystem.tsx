"use client";

import { CircuitBoard } from "./CircuitBoard";
import { IsoBox } from "./iso";
import { Reveal } from "./ui/Reveal";

function StackFig() {
  return (
    <svg viewBox="0 0 64 52" className="h-12 w-14" fill="none" aria-hidden>
      <IsoBox x={0} y={0} z={0} w={18} h={4} d={18} ox={32} oy={44} s={1.15} stroke="#7ae0a4" />
      <IsoBox x={0} y={6} z={0} w={18} h={4} d={18} ox={32} oy={44} s={1.15} stroke="#7ae0a4" />
      <IsoBox x={0} y={12} z={0} w={18} h={4} d={18} ox={32} oy={44} s={1.15} stroke="#7ae0a4" />
    </svg>
  );
}

function FulfilmentFig() {
  return (
    <svg viewBox="0 0 64 52" className="h-12 w-14" fill="none" aria-hidden>
      <IsoBox x={0} y={0} z={0} w={13} h={18} d={15} ox={20} oy={44} s={1.05} />
      <IsoBox x={3} y={0} z={15} w={7} h={7} d={3} ox={20} oy={44} s={1.05} />
      <IsoBox x={16} y={0} z={3} w={11} h={2} d={11} ox={20} oy={44} s={1.05} />
      <IsoBox x={17} y={3} z={4} w={9} h={3.2} d={9} ox={20} oy={44} s={1.05} />
      <IsoBox x={17} y={7.2} z={4} w={9} h={3.2} d={9} ox={20} oy={44} s={1.05} />
    </svg>
  );
}

function DataFig() {
  const heights = [9, 16, 12, 21, 14];
  return (
    <svg viewBox="0 0 64 52" className="h-12 w-14" fill="none" aria-hidden>
      {heights.map((h, i) => (
        <IsoBox
          key={i}
          x={i * 6.2}
          y={0}
          z={0}
          w={4.5}
          h={h}
          d={11}
          ox={14}
          oy={44}
          s={1.05}
        />
      ))}
    </svg>
  );
}

function PayoutFig() {
  return (
    <svg viewBox="0 0 64 52" className="h-12 w-14" fill="none" aria-hidden>
      <IsoBox x={0} y={0} z={0} w={20} h={7} d={13} ox={22} oy={40} s={1.05} />
      <IsoBox x={2} y={9} z={2} w={16} h={2} d={9} ox={22} oy={40} s={1.05} />
      {[0, 1, 2].map((i) => (
        <IsoBox
          key={i}
          x={22}
          y={i * 2.6}
          z={4}
          w={8}
          h={2}
          d={8}
          ox={22}
          oy={40}
          s={1.05}
          stroke={i === 2 ? "#7ae0a4" : "#D0D6E0"}
        />
      ))}
    </svg>
  );
}

const ticker = [
  "3+ financing cycles per seller, on average",
  "Built for repeat use",
  "Same infrastructure. New capability.",
  "Repaid as you sell",
  "Built by noon. Embedded into noon.",
];

export function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="scroll-mt-24 px-5 pt-24 font-[family-name:var(--font-inter-tight)] md:px-8 md:pt-32 lg:px-12"
    >
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
        <Reveal className="min-w-0">
          <h2 className="max-w-[640px] leading-[1.05] tracking-[-0.038em]">
            <span className="block text-[22px] font-medium text-[#C8CBC4] sm:text-[24px] lg:text-[26px]">
              Same infrastructure.
            </span>
            <span className="block text-[36px] font-semibold text-white sm:text-[44px] lg:text-[52px]">
              New capability.
            </span>
          </h2>
          <p className="mt-3 max-w-[38rem] text-[14px] leading-[1.5] tracking-[-0.018em] text-[#8A8F98]">
            Seller Lab, fulfilment, commerce data, and weekly payouts — now
            powering financing too.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="min-w-0">
          <CircuitBoard
            width={500}
            height={300}
            pulseSpeed={2}
            nodes={[
              { id: "stack", x: 80, y: 150, label: "Stack", icon: <StackFig /> },
              {
                id: "fulfil",
                x: 250,
                y: 52,
                label: "noon fulfilment",
                icon: <FulfilmentFig />,
              },
              {
                id: "data",
                x: 250,
                y: 248,
                label: "Commerce data",
                icon: <DataFig />,
              },
              {
                id: "pay",
                x: 420,
                y: 150,
                label: "Seller payouts",
                icon: <PayoutFig />,
              },
            ]}
            connections={[
              { from: "stack", to: "fulfil", animated: true },
              { from: "stack", to: "data", animated: true },
              { from: "fulfil", to: "pay", animated: true },
              { from: "data", to: "pay", animated: true },
            ]}
          />
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-10 md:mt-12">
        <div className="glass-card-green overflow-hidden rounded-full py-3">
          <div className="eco-marquee flex w-max items-center gap-8 pr-8">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex items-center gap-8 font-[family-name:var(--font-plex-mono)] text-[12px] tracking-[0.04em] text-white/80"
              >
                {ticker.map((item) => (
                  <li key={`${copy}-${item}`} className="flex items-center gap-8">
                    <span className="size-1 rounded-full bg-[#7ae0a4]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
