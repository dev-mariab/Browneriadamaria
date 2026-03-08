import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductGallery } from "./components/ProductGallery";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";

export default function App() {
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