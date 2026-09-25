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
    <section id="layers" className="section-shell">
      <Reveal>
        <div className="relative overflow-hidden rounded-[12px] border border-white/8 bg-[#0a0a0a] px-4 py-6 sm:px-5 md:px-8 md:py-8">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_50%_120%,rgb(28_132_72/0.32),transparent_62%)]" />

          <h2 className="page-title page-title-sm relative max-w-[22ch]">
            One platform. Four connected stages.
          </h2>

          <div className="relative mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-8 lg:grid-cols-4">
            {nodes.map((node, index) => {
              const last = index === nodes.length - 1;
              return (
                <div
                  key={node.title}
                  className={`min-w-0 border-t pt-4 ${
                    last ? "border-white" : "border-white/16"
                  }`}
                >
                  <p className="inline-flex items-center gap-1 rounded-[6px] bg-[#1a1a1a] px-2 py-1 font-[family-name:var(--font-plex-mono)] text-[12px] leading-none text-[#C8CBC4]">
                    {last ? (
                      <span className="hidden items-center gap-1 sm:flex" aria-hidden>
                        <span className="size-1 rounded-full bg-[#7ae0a4]" />
                        <span className="size-1 rounded-full bg-[#1c8448]" />
                        <span className="size-1 rounded-full bg-[#0e5c34]" />
                      </span>
                    ) : null}
                    {node.step}
                  </p>
                  <h3 className="mt-4 text-[16px] font-medium text-white">
                    {node.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.5] text-[#8A8F98] md:text-[14px]">
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
