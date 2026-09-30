import { Ecosystem } from "@/components/Ecosystem";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCards } from "@/components/ProductCards";
import { RepeatUse } from "@/components/RepeatUse";
import { StagesSection } from "@/components/StagesSection";

export default function Home() {
  return (
    <div id="top" className="relative overflow-x-hidden pt-16" style={{ background: "var(--bg)" }}>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="content" className="relative z-10" tabIndex={-1}>
        <Hero />
        <ProductCards />
        <StagesSection />
        <Ecosystem />
        <RepeatUse />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
