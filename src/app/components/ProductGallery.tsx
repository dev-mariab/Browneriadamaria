import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgBrownieTradicional from "@/assets/97fc1f3f34de047560cc47bbb7ee00740cf7dd58.png";
import imgBrownieRecheado from "@/assets/8c974d68960917ab7897863a3c81664c1e355ebb.png";
import imgMiniOvos from "@/assets/a12121596bda846ad84ea69030d31c9e86daa964.png";
import imgTrufas from "@/assets/eb16197c67678a230d9f24affc48f69f1c3cb47e.png";
import imgBolosCaseirinhos from "@/assets/0daa0b45fd468a8c48fbd341600ea01184af5bde.png";
import imgNakedBrownie from "@/assets/d4a6d4e98cb83184272005bfb2295742d725f2d4.png";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Brownie Tradicional",
    category: "Brownies",
    description: "Brownie clássico de chocolate, crocante por fora e macio por dentro",
    price: "Consulte preços",
    image: imgBrownieTradicional,
  },
  {
    id: 2,
    name: "Brownie Recheado",
    category: "Brownies",
    description: "Brownie irresistível com recheio cremoso de chocolate",
    price: "Consulte preços",
    image: imgBrownieRecheado,
  },
  {
    id: 3,
    name: "Naked Brownie",
    category: "Brownies",
    description: "Brownie em camadas com recheio de brigadeiro branco e morangos frescos",
    price: "Consulte preços",
    image: imgNakedBrownie,
  },
  {
    id: 4,
    name: "Trufas de 30g",
    category: "Trufas",
    description: "Trufas artesanais de chocolate em diversos sabores",
    price: "Consulte preços",
    image: imgTrufas,
  },
  {
    id: 5,
    name: "Mini Ovos de Colher 50g",
    category: "Ovos de Colher",
    description: "Mini ovos de chocolate recheados, perfeitos para presentear",
    price: "Consulte preços",
    image: imgMiniOvos,
  },
  {
    id: 6,
    name: "Bolos Caseirinhos",
    category: "Bolos",
    description: "Bolinhos individuais cobertos com chocolate, macios e deliciosos",
    price: "Consulte preços",
    image: imgBolosCaseirinhos,
  },
];

export function ProductGallery() {
  return (
    <section id="produtos" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nossos Produtos
          </h2>
          <p className="font-['Inter'] text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Brownies artesanais, trufas e mini ovos de colher feitos com ingredientes premium
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-['Inter'] font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-semibold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="font-['Inter'] text-muted-foreground text-sm md:text-base mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-['Inter'] text-primary text-lg md:text-xl font-semibold">
                    {product.price}
                  </span>
                  <button className="bg-accent hover:bg-primary hover:text-white text-accent-foreground px-4 py-2 rounded-full font-['Inter'] text-sm font-medium transition-all duration-300"
                    onClick={() => window.open("https://cbl.link/PBQBYJc", "_blank")}
                  >
                    Encomendar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}