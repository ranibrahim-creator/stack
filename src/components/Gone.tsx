"use client";

import { Header } from "./Header";
import { NumberLanes } from "./NumberLanes";

export function Gone() {
  return (
    <div className="relative min-h-dvh overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-0">
        <NumberLanes className="h-full w-full" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <Header />

      <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 text-center font-[family-name:var(--font-inter-tight)]">
        <p className="font-[family-name:var(--font-plex-mono)] text-[11px] tracking-[0.08em] text-[#5c6166]">
          FIG 4.0.4
        </p>
        <h1 className="mt-5 text-[40px] font-normal leading-[1.12] tracking-[-0.038em] text-ink sm:text-[48px] lg:text-[56px]">
          This page isn’t live.
        </h1>
        <p className="mt-4 max-w-[420px] text-[15px] leading-[1.45] tracking-[-0.02em] text-[#8A8F98]">
          The public site has been taken down. If you need Stack, write to us.
        </p>
        <a href="mailto:stack@noon.com" className="raycast-pill mt-8">
          <span className="raycast-pill-label">stack@noon.com</span>
        </a>
      </main>
    </div>
  );
}
