import { useProducts } from "../contexts/ProductsContext";

export function ProductGallery() {
  const { products } = useProducts();

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