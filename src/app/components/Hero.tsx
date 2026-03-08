import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgHeroChocolate from "src/assets/977d8ce9c8848a8281951f09fde3a5e15fe73dba.png";

export function Hero() {
  const handleWhatsAppClick = () => {
    window.open("https://cbl.link/PBQBYJc", "_blank");
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 md:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgHeroChocolate}
          alt="Chocolate artesanal derretido"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Doces feitos com amor
          </h1>
          <p className="font-['Inter'] text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 leading-relaxed">
            Cada criação é única, elaborada artesanalmente com ingredientes selecionados para tornar seus momentos ainda mais especiais.
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-['Inter'] text-base md:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Fazer pedido via WhatsApp
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}