import { LineField } from "./LineField";

export function Footer() {
  return (
    <div>
      <section id="close" className="relative overflow-hidden">
        <LineField className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black_8%,transparent_70%)]" />
        <div className="section-shell relative flex flex-col items-center justify-center text-center">
          <h2 className="section-display max-w-4xl text-center text-balance">
            <span className="section-display-muted block">Built by noon.</span>
            <span className="section-display-strong block">Embedded into noon.</span>
          </h2>
        </div>
      </section>

      <footer
        id="contact"
        className="section-shell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/[0.06] text-[12px] leading-none text-[#a3a8a2]"
      >
        <a href="mailto:stack@noon.com" className="underline underline-offset-2">
          stack@noon.com
        </a>
        <nav className="flex items-center gap-6" aria-label="Legal">
          <a href="#terms" className="underline underline-offset-2">Terms</a>
          <a href="#privacy" className="underline underline-offset-2">Privacy</a>
        </nav>
      </footer>
    </div>
  );
}
