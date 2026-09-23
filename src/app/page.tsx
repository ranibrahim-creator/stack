import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCards } from "@/components/ProductCards";

export default function Home() {
  return (
    <div id="top" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="relative z-10" style={{ background: "var(--bg)" }}>
        <Hero />
        <ProductCards />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
