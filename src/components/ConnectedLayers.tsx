"use client";

import { Reveal } from "./ui/Reveal";

const nodes = [
  {
    step: "Step 1",
    title: "Data",
    body: "Commerce signals from across noon help Stack understand seller performance and determine eligibility.",
  },
  {
    step: "Step 2",
    title: "Capital",
    body: "Eligible businesses receive working capital based on their business activity and financing requirements.",
  },
  {
    step: "Step 3",
    title: "Commerce",
    body: "That capital funds real inventory and sales activity across noon.",
  },
  {
    step: "Step 4",
    title: "Repayment",
    body: "Collections are embedded into the same infrastructure noon already uses to settle sellers every week.",
  },
];

export function ConnectedLayers() {
  return (
    <section
      id="layers"
      className="scroll-mt-24 px-5 pt-24 font-[family-name:var(--font-inter-tight)] md:px-8 md:pt-32 lg:px-12"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-[22px] border border-white/8 bg-[#0a0a0a] px-5 py-8 md:rounded-[26px] md:px-8 md:py-10 lg:px-10 lg:py-11">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[radial-gradient(ellipse_at_50%_120%,rgb(28_132_72/0.32),transparent_62%)]" />

          <h2 className="relative max-w-[22ch] text-[24px] font-semibold leading-[1.1] tracking-[-0.038em] text-white sm:text-[28px] lg:text-[32px]">
            One platform. Four connected stages.
          </h2>

          <div className="relative mt-8 grid grid-cols-4 gap-3 sm:mt-10 sm:gap-6">
            {nodes.map((node, index) => {
              const last = index === nodes.length - 1;
              return (
                <div
                  key={node.title}
                  className={`min-w-0 border-t pt-4 ${
                    last ? "border-white" : "border-white/16"
                  }`}
                >
                  <p className="inline-flex items-center gap-1 rounded-[4px] bg-[#1a1a1a] px-1.5 py-0.5 font-[family-name:var(--font-plex-mono)] text-[9px] leading-none tracking-[0.02em] text-[#C8CBC4]">
                    {last ? (
                      <span className="hidden items-center gap-[2px] sm:flex" aria-hidden>
                        <span className="size-[5px] rounded-full bg-[#7ae0a4]" />
                        <span className="size-[5px] rounded-full bg-[#1c8448]" />
                        <span className="size-[5px] rounded-full bg-[#0e5c34]" />
                      </span>
                    ) : null}
                    {node.step}
                  </p>
                  <h3 className="mt-3 text-[14px] font-medium tracking-[-0.03em] text-white sm:text-[17px]">
                    {node.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-[1.45] tracking-[-0.018em] text-[#8A8F98] sm:text-[13px]">
                    {node.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
