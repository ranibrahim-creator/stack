"use client";

import { CircuitBoard } from "./CircuitBoard";
import { IsoBox } from "./iso";
import { Reveal } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

function LabFig() {
  return (
    <svg viewBox="0 0 64 52" className="h-8 w-10 md:h-9 md:w-11" fill="none" aria-hidden>
      <IsoBox x={0} y={0} z={0} w={22} h={3} d={16} ox={20} oy={44} s={1.05} />
      <IsoBox x={2} y={4} z={2} w={8} h={10} d={8} ox={20} oy={44} s={1.05} />
      <IsoBox x={12} y={4} z={3} w={8} h={7} d={8} ox={20} oy={44} s={1.05} />
    </svg>
  );
}

function StackFig() {
  return (
    <svg viewBox="0 0 64 52" className="h-8 w-10 md:h-9 md:w-11" fill="none" aria-hidden>
      <IsoBox x={0} y={0} z={0} w={18} h={4} d={18} ox={32} oy={44} s={1.15} stroke="#7ae0a4" />
      <IsoBox x={0} y={6} z={0} w={18} h={4} d={18} ox={32} oy={44} s={1.15} stroke="#7ae0a4" />
      <IsoBox x={0} y={12} z={0} w={18} h={4} d={18} ox={32} oy={44} s={1.15} stroke="#7ae0a4" />
    </svg>
  );
}

function FulfilmentFig() {
  return (
    <svg viewBox="0 0 64 52" className="h-8 w-10 md:h-9 md:w-11" fill="none" aria-hidden>
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
    <svg viewBox="0 0 64 52" className="h-8 w-10 md:h-9 md:w-11" fill="none" aria-hidden>
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
    <svg viewBox="0 0 64 52" className="h-8 w-10 md:h-9 md:w-11" fill="none" aria-hidden>
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
  "Assessed from activity already on noon",
  "One payout rail for sales and repayment",
];

export function Ecosystem() {
  return (
    <section id="ecosystem" className="section-shell">
      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
        <Reveal className="min-w-0 md:pt-2">
          <SectionTitle
            className="max-w-[20ch]"
            emphasize="start"
            line1="Stack."
            line2="Built into noon."
          />
          <p className="mt-4 max-w-[32rem] text-[14px] leading-[1.5] text-[#8A8F98]">
            Seller Lab, fulfilment, commerce data, and weekly payouts — now
            powering financing too.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mx-auto min-w-0 w-full max-w-[400px] md:mx-0 md:ml-auto">
          <CircuitBoard
            className="w-full"
            width={500}
            height={300}
            pulseSpeed={2}
            nodes={[
              {
                id: "lab",
                x: 250,
                y: 58,
                label: "Seller Lab",
                icon: <LabFig />,
              },
              {
                id: "fulfil",
                x: 78,
                y: 150,
                label: "noon fulfilment",
                icon: <FulfilmentFig />,
              },
              { id: "stack", x: 250, y: 150, label: "Stack", icon: <StackFig /> },
              {
                id: "pay",
                x: 422,
                y: 150,
                label: "Seller payouts",
                icon: <PayoutFig />,
              },
              {
                id: "data",
                x: 250,
                y: 232,
                label: "Commerce data",
                icon: <DataFig />,
              },
            ]}
            connections={[
              { from: "stack", to: "lab", animated: true },
              { from: "stack", to: "fulfil", animated: true },
              { from: "stack", to: "data", animated: true },
              { from: "stack", to: "pay", animated: true },
            ]}
          />
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-10 md:mt-16">
        <div className="overflow-hidden">
          <div className="eco-marquee flex w-max items-center gap-8 pr-8">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex items-center gap-8 font-[family-name:var(--font-plex-mono)] text-[12px] text-white/80"
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
