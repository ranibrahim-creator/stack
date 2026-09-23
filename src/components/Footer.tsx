"use client";

import { Logo } from "./Logo";

function p(x: number, y: number, z: number, ox: number, oy: number, s = 1) {
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
}) {
  const pt = (dx: number, dy: number, dz: number) => p(x + dx, y + dy, z + dz, ox, oy, s);
  return (
    <g fill="#000" stroke="#D0D6E0" strokeWidth="0.6" strokeLinejoin="round">
      <path d={`M ${pt(0, h, d)} L ${pt(w, h, d)} L ${pt(w, 0, d)} L ${pt(0, 0, d)} Z`} />
      <path d={`M ${pt(w, h, 0)} L ${pt(w, h, d)} L ${pt(w, 0, d)} L ${pt(w, 0, 0)} Z`} />
      <path d={`M ${pt(0, h, 0)} L ${pt(w, h, 0)} L ${pt(w, h, d)} L ${pt(0, h, d)} Z`} />
    </g>
  );
}

function InventoryFinanceMark() {
  const ox = 200;
  const oy = 210;
  const s = 2.05;
  const w = 54;
  const d = 54;
  const h = 6;
  const gap = 2.2;
  const layers = 5;
  const topY = (layers - 1) * (h + gap) + h;
  const cx = ox + (w / 2 - d / 2) * 0.866 * s;
  const cy = oy + (w / 2 + d / 2) * 0.5 * s - topY * s;

  return (
    <svg viewBox="0 0 480 420" className="h-full w-full overflow-visible" fill="none" aria-hidden>
      {Array.from({ length: layers }, (_, i) => (
        <g key={i} className="fig-inv-layer" style={{ ["--i" as string]: i }}>
          <IsoBox x={0} y={i * (h + gap)} z={0} w={w} h={h} d={d} ox={ox} oy={oy} s={s} />
          {i === layers - 1 ? (
            <>
              <ellipse cx={cx} cy={cy} rx={18} ry={10} stroke="#D0D6E0" strokeWidth="0.6" />
              <ellipse cx={cx} cy={cy} rx={10} ry={5.6} stroke="#D0D6E0" strokeWidth="0.6" />
            </>
          ) : null}
        </g>
      ))}
      <g className="fig-pay-slice" opacity="0.7">
        <IsoBox x={56} y={8} z={8} w={8} h={28} d={38} ox={ox} oy={oy} s={s} />
      </g>
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-bg px-5 pb-8 pt-16 font-[family-name:var(--font-inter-tight)] md:px-8 md:pb-10 md:pt-20 lg:px-12"
    >
      <div className="relative flex items-center justify-between gap-8">
        <p className="relative max-w-[640px] text-[32px] font-normal leading-[1.12] tracking-[-0.038em] text-[#8A8F98] sm:text-[36px] lg:text-[40px]">
          <span className="text-ink">Built for the future. </span>
          Available today.
        </p>
        <div
          aria-hidden
          className="pointer-events-none hidden h-[280px] w-[min(480px,42vw)] shrink-0 opacity-[0.22] md:block md:h-[320px] md:opacity-[0.26]"
        >
          <InventoryFinanceMark />
        </div>
      </div>

      <div className="relative mt-12 flex flex-col gap-8 border-t border-[#1a1a1a] pt-6 md:mt-14 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5 text-ink" aria-label="stack">
            <Logo className="h-3.5 w-5" />
            <span className="text-[15px] font-medium tracking-[-0.02em]">stack</span>
          </a>
          <div className="mt-4 space-y-2 text-[13px] leading-relaxed text-slate">
            <p>
              For sellers:{" "}
              <a href="mailto:stack@noon.com" className="text-green hover:text-ink">
                stack@noon.com
              </a>
            </p>
            <p>For financial institutions: partnership enquiries → email TBD</p>
            <p>
              <a
                href="https://www.noon.com"
                target="_blank"
                rel="noreferrer"
                className="text-green hover:text-ink"
              >
                Not selling on noon yet? →
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <nav className="flex gap-5 text-[13px] text-slate">
            <a href="#top" className="hover:text-ink">
              Terms
            </a>
            <a href="#top" className="hover:text-ink">
              Privacy
            </a>
          </nav>
          <p className="text-[12px] text-slate">© noon</p>
        </div>
      </div>
    </footer>
  );
}
