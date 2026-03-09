import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold mb-4 text-primary">
              Browneria da Maria
            </h3>
            <p className="font-['Inter'] text-white/80 text-sm md:text-base leading-relaxed">
              Doces artesanais feitos com amor e ingredientes selecionados para tornar seus momentos inesquecíveis.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 font-['Inter'] text-sm md:text-base">
              <li>
                <button
                  onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  Sobre
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-4">
              Contato
            </h4>
            <ul className="space-y-3 font-['Inter'] text-sm md:text-base">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:+5588994136820" className="text-white/80 hover:text-primary transition-colors">
                  (88) 99413-6820
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:pinhom913@gmail.com" className="text-white/80 hover:text-primary transition-colors">
                  pinhom913@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Quixadá, CE</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-4">
              Redes Sociais
            </h4>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/mbarros5/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors font-['Inter'] text-sm md:text-base"
              >
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <span>@mbarros5</span>
              </a>
              <p className="font-['Inter'] text-sm text-white/60 mt-4">
                Siga-nos no Instagram para ver nossas criações diárias e novidades!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-['Inter'] text-sm text-white/60 text-center md:text-left">
              © 2026 Browneria da Maria. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="/login" 
                className="font-['Inter'] text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Admin
              </a>
              <p className="font-['Inter'] text-sm text-white/60 text-center md:text-right">
                Feito com amor em Quixadá, CE
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}