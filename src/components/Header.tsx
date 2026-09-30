import { Logo } from "./Logo";

export function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 overflow-hidden border-b border-white/[0.06] font-[family-name:var(--font-inter-tight)] backdrop-blur-xl backdrop-saturate-150"
      style={{
        background: "rgb(0 0 0 / 0.72)",
        boxShadow: "0 16px 36px rgb(0 0 0 / 0.38)",
      }}
    >
      <div className="chrome-bloom pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative flex h-14 items-center px-4 sm:h-16 sm:px-6 md:px-8 lg:px-10">
        <a
          href="#top"
          className="flex items-center gap-2 text-ink"
          aria-label="stack by noon"
        >
          <Logo className="h-4 w-5" />
          <span className="text-[12px] font-medium leading-none">stack by noon</span>
        </a>
      </div>
    </header>
  );
}
