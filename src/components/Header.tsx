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
      <div className="flex h-12 items-center px-4 md:px-5">
        <a
          href="#top"
          className="flex items-center gap-2 text-ink"
          aria-label="stack by noon"
        >
          <Logo className="h-4 w-5" />
          <span className="text-[14px] font-medium">stack by noon</span>
        </a>
      </div>
    </header>
  );
}
