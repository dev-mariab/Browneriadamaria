import { Heart, Award, Users } from "lucide-react";

const imgConfeiteira = '/images/confeiteira.png';

export function About() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imgConfeiteira}
                alt="Maria Barros - Confeiteira"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sobre Mim
            </h2>
            <div className="space-y-4 font-['Inter'] text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Olá! Sou Maria Barros, estudante de Engenharia de Software que encontrou nos doces 
                uma forma de ter uma renda extra e acabei me apaixonando por esse mundo da confeitaria.
              </p>
              <p>
                Cada doce é feito com muito carinho e dedicação, usando ingredientes de qualidade 
                selecionados para garantir o melhor sabor e textura em cada mordida.
              </p>
              <p>
                É uma alegria poder compartilhar essa doçura com você e fazer parte dos seus 
                momentos especiais!
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div className="font-['Playfair_Display'] text-2xl font-bold text-foreground">100%</div>
                <div className="font-['Inter'] text-sm text-muted-foreground">Artesanal</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="font-['Playfair_Display'] text-2xl font-bold text-foreground">Premium</div>
                <div className="font-['Inter'] text-sm text-muted-foreground">Ingredientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}