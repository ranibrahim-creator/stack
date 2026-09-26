import { LineField } from "./LineField";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <div className="font-[family-name:var(--font-inter-tight)]">
      <section
        id="close"
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 72% 64% at 50% 45%, rgba(28, 132, 72, 0.22) 0%, rgba(14, 92, 52, 0.1) 42%, rgba(0, 0, 0, 0) 70%)",
        }}
      >
        <LineField className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black_8%,transparent_70%)]" />
        <div className="section-shell relative flex flex-col items-center justify-center text-center">
          <p className="page-title page-title-md max-w-4xl text-center text-balance">
            <span className="font-medium tracking-[-0.05em] text-white">
              Built by noon.
            </span>{" "}
            <span className="font-normal tracking-[-0.03em] text-[#c4c7c2]">
              Embedded into noon.
            </span>
          </p>
        </div>
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
