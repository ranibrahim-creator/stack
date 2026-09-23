import { Logo } from "./Logo";

export function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl backdrop-saturate-150"
      style={{
        background: "rgb(255 255 255 / 0.055)",
        boxShadow: "0 16px 36px rgb(0 0 0 / 0.38)",
      }}
    >
      <div className="flex h-11 items-center px-5 md:h-12 md:px-8 lg:px-10">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-ink"
          aria-label="stack"
        >
          <Logo className="h-3.5 w-5" />
          <span className="text-[14px] font-medium tracking-[-0.02em]">
            stack
          </span>
        </a>
      </div>
    </header>
  );
}
