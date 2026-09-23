"use client";

import { NumberLanes } from "./NumberLanes";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-visible bg-bg pt-0 font-[family-name:var(--font-inter-tight)]"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-[140px] bottom-0 md:-top-[160px]">
        <NumberLanes className="h-full w-full" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 pb-28 pt-32 text-center md:pb-36 md:pt-40">
        <p className="max-w-[720px] text-[32px] font-normal leading-[1.12] tracking-[-0.038em] text-[#8A8F98] sm:text-[36px] lg:text-[40px]">
          <span className="text-ink">Built for the future. </span>
          Available today.
        </p>
        <a href="mailto:stack@noon.com" className="raycast-pill mt-6">
          <span className="raycast-pill-label">stack@noon.com</span>
        </a>
      </div>
    </footer>
  );
}
