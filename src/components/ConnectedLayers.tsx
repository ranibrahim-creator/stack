"use client";

import { IsoBox } from "./iso";
import { Reveal } from "./ui/Reveal";

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

function FlowDiagram() {
  return (
    <svg
      viewBox="0 0 960 280"
      className="h-auto w-full max-w-[960px]"
      fill="none"
      aria-hidden
    >
      <defs>
        <marker
          id="flow-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M1 1 L7 4 L1 7" stroke="#D0D6E0" strokeWidth="0.8" fill="none" />
        </marker>
        <filter id="node-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#node-glow)">
        <IsoBox x={0} y={0} z={0} w={18} h={14} d={16} ox={92} oy={118} s={1.85} />
      </g>
      <g filter="url(#node-glow)">
        <IsoBox x={0} y={0} z={0} w={16} h={24} d={16} ox={318} oy={126} s={1.85} />
      </g>
      <g filter="url(#node-glow)">
        {[0, 1, 2].map((i) => (
          <IsoBox
            key={i}
            x={0}
            y={i * 6}
            z={0}
            w={20}
            h={4}
            d={18}
            ox={548}
            oy={124}
            s={1.7}
          />
        ))}
      </g>
      <g filter="url(#node-glow)">
        <IsoBox x={0} y={0} z={0} w={20} h={10} d={14} ox={778} oy={118} s={1.85} />
        <IsoBox
          x={22}
          y={0}
          z={2}
          w={5}
          h={10}
          d={12}
          ox={778}
          oy={118}
          s={1.85}
          stroke="#7ae0a4"
        />
      </g>

      <path
        className="fig-flow-line"
        d="M148 108 L 268 108"
        stroke="#D0D6E0"
        strokeWidth="0.8"
        markerEnd="url(#flow-arrow)"
      />
      <path
        className="fig-flow-line"
        d="M376 108 L 498 108"
        stroke="#D0D6E0"
        strokeWidth="0.8"
        markerEnd="url(#flow-arrow)"
      />
      <path
        className="fig-flow-line"
        d="M608 108 L 728 108"
        stroke="#D0D6E0"
        strokeWidth="0.8"
        markerEnd="url(#flow-arrow)"
      />
      <path
        className="fig-flow-loop"
        d="M868 148 C 890 214, 72 214, 92 148"
        stroke="#1c8448"
        strokeWidth="0.9"
        markerEnd="url(#flow-arrow)"
      />
      <text
        x="480"
        y="246"
        textAnchor="middle"
        fill="#5c6166"
        fontSize="11"
        letterSpacing="0.08em"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        Data → Capital → Commerce → Repayment → Data
      </text>
    </svg>
  );
}

export function ConnectedLayers() {
  return (
    <section
      id="layers"
      className="scroll-mt-24 px-5 pt-24 font-[family-name:var(--font-inter-tight)] md:px-8 md:pt-32 lg:px-12"
    >
      <Reveal>
        <h2 className="max-w-[640px] text-[28px] font-normal leading-[1.12] tracking-[-0.038em] text-ink sm:text-[32px] lg:text-[36px]">
          One platform. Four connected stages.
        </h2>
      </Reveal>

      <Reveal delay={0.08} className="mt-14 md:mt-16">
        <FlowDiagram />
      </Reveal>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {nodes.map((node) => (
          <div key={node.title} className="min-w-0">
            <h3 className="text-[15px] font-medium tracking-[-0.025em] text-ink">
              {node.title}
            </h3>
            <p className="mt-2 text-[13px] leading-[1.45] tracking-[-0.018em] text-[#8A8F98]">
              {node.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
