import { ConnectedLayers } from "@/components/ConnectedLayers";
import { Ecosystem } from "@/components/Ecosystem";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCards } from "@/components/ProductCards";

export default function Home() {
  return (
    <div id="top" className="relative overflow-x-hidden pt-12" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="relative z-10">
        <Hero />
        <ProductCards />
        <ConnectedLayers />
        <Ecosystem />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
