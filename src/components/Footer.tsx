import { Logo } from "./Logo";

export function Footer() {
  return (
    <div className="font-[family-name:var(--font-inter-tight)]">
      <section
        id="close"
        className="section-shell flex flex-col items-center text-center !py-16 md:!py-24 lg:!py-32"
      >
        <p className="page-title page-title-md max-w-2xl">
          Built for the future. Available today.
        </p>
      </section>

      <footer id="contact" className="section-shell border-t border-white/[0.06]">
        <div className="flex flex-col gap-2 text-[12px] leading-[1.5] text-[#5c6166] sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
          <p>
            Sellers{" "}
            <a href="mailto:stack@noon.com">stack@noon.com</a>
          </p>
          <p>
            Partners{" "}
            <a href="mailto:stack@noon.com">stack@noon.com</a>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 text-[#5c6166]">
            <a
              href="#top"
              className="flex items-center gap-2"
              aria-label="stack"
            >
              <Logo className="h-4 w-5" />
            </a>
            <p className="text-[12px] leading-[1.5]">© noon</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] leading-[1.5] text-[#5c6166]" aria-label="Legal">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
