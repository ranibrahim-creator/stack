import { ConnectedLayers } from "@/components/ConnectedLayers";
import { Ecosystem } from "@/components/Ecosystem";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCards } from "@/components/ProductCards";
import { RepeatUse } from "@/components/RepeatUse";
import { SectionBridge } from "@/components/SectionBridge";

export default function Home() {
  return (
    <div id="top" style={{ background: "var(--bg)" }}>
      <Header />
      <main>
        <Hero />
        <ProductCards />
        <Ecosystem />
        <RepeatUse />
        <ConnectedLayers />
        <SectionBridge />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
