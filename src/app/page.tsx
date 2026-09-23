import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCards } from "@/components/ProductCards";
import { SectionBridge } from "@/components/SectionBridge";

export default function Home() {
  return (
    <div id="top" style={{ background: "var(--bg)" }}>
      <Header />
      <main>
        <Hero />
        <ProductCards />
        <SectionBridge />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
