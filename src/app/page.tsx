import { ConnectedLayers } from "@/components/ConnectedLayers";
import { Ecosystem } from "@/components/Ecosystem";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Gone } from "@/components/Gone";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCards } from "@/components/ProductCards";

export default function Home() {
  if (process.env.GITHUB_PAGES === "1") {
    return <Gone />;
  }

  return (
    <div id="top" className="pt-12" style={{ background: "var(--bg)" }}>
      <Header />
      <main>
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
