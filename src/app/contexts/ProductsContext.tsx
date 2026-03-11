import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import imgBrownieTradicional from "../../assets/97fc1f3f34de047560cc47bbb7ee00740cf7dd58.png";
import imgBrownieRecheado from "../../assets/8c974d68960917ab7897863a3c81664c1e355ebb.png";
import imgMiniOvos from "../../assets/a12121596bda846ad84ea69030d31c9e86daa964.png";
import imgTrufas from "../../assets/eb16197c67678a230d9f24affc48f69f1c3cb47e.png";
import imgBolosCaseirinhos from "../../assets/0daa0b45fd468a8c48fbd341600ea01184af5bde.png";
import imgNakedBrownie from "../../assets/d4a6d4e98cb83184272005bfb2295742d725f2d4.png";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const defaultProducts: Product[] = [
  {
    id: '1',
    name: "Brownie Tradicional",
    category: "Brownies",
    description: "Brownie clássico de chocolate, crocante por fora e macio por dentro",
    price: "Consulte preços",
    image: imgBrownieTradicional,
  },
  {
    id: '2',
    name: "Brownie Recheado",
    category: "Brownies",
    description: "Brownie irresistível com recheio cremoso de chocolate",
    price: "Consulte preços",
    image: imgBrownieRecheado,
  },
  {
    id: '3',
    name: "Naked Brownie",
    category: "Brownies",
    description: "Brownie em camadas com recheio de brigadeiro branco e morangos frescos",
    price: "Consulte preços",
    image: imgNakedBrownie,
  },
  {
    id: '4',
    name: "Trufas de 30g",
    category: "Trufas",
    description: "Trufas artesanais de chocolate em diversos sabores",
    price: "Consulte preços",
    image: imgTrufas,
  },
  {
    id: '5',
    name: "Mini Ovos de Colher 50g",
    category: "Ovos de Colher",
    description: "Mini ovos de chocolate recheados, perfeitos para presentear",
    price: "Consulte preços",
    image: imgMiniOvos,
  },
  {
    id: '6',
    name: "Bolos Caseirinhos",
    category: "Bolos",
    description: "Bolinhos individuais cobertos com chocolate, macios e deliciosos",
    price: "Consulte preços",
    image: imgBolosCaseirinhos,
  },
];

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    // Carrega produtos do localStorage ou usa os padrões
    const saved = localStorage.getItem('browneria_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultProducts;
      }
    }
    return defaultProducts;
  });

  useEffect(() => {
    // Salva produtos no localStorage sempre que mudar
    localStorage.setItem('browneria_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Omit<Product, 'id'>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...productData, id } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
