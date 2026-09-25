"use client";

import { Reveal } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

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

export function ConnectedLayers() {
  return (
    <section id="layers" className="section-shell">
      <Reveal>
        <div className="glass-card-mint relative overflow-hidden rounded-[12px] px-8 py-10 sm:px-10 md:px-14 md:py-14">
          <SectionTitle
            emphasize="none"
            line1="One platform."
            line2="Four connected stages."
          />

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {nodes.map((node, index) => (
              <div
                key={node.title}
                className="group min-w-0 border-t border-white/12 pt-5 transition-colors duration-200 hover:border-[#2f9a5c]"
              >
                <p className="font-[family-name:var(--font-plex-mono)] text-[11px] tracking-[0.16em] text-[#5c6166] uppercase transition-colors duration-200 group-hover:text-[#2f9a5c]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-inter-tight)] text-[19px] font-medium leading-none tracking-[-0.03em] text-white transition-colors duration-200 group-hover:text-[#2f9a5c]">
                  {node.title}
                </h3>
                <p className="mt-3 max-w-[28ch] text-[14px] leading-[1.65] text-[#8A8F98]">
                  {node.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
