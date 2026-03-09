import { Header } from "./Header";
import { Hero } from "./Hero";
import { ProductGallery } from "./ProductGallery";
import { About } from "./About";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

export function LandingPage() {
  return (
    <div className="min-h-screen font-['Inter']">
      <Header />
      <main>
        <Hero />
        <ProductGallery />
        <About />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
