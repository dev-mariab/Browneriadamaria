import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const imgBrownieTradicional = '/images/brownie-tradicional.png';
const imgBrownieRecheado = '/images/brownie-recheado.png';
const imgMiniOvos = '/images/mini-ovos.png';
const imgTrufas = '/images/trufas.png';
const imgBolosCaseirinhos = '/images/bolos-caseirinhos.png';
const imgNakedBrownie = '/images/naked-brownie.png';

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
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loading: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d2e7a431`;

const defaultProducts: Product[] = [
  {
    id: 'product:1',
    name: "Brownie Tradicional",
    category: "Brownies",
    description: "Brownie clássico de chocolate, crocante por fora e macio por dentro",
    price: "Consulte preços",
    image: String(imgBrownieTradicional),
  },
  {
    id: 'product:2',
    name: "Brownie Recheado",
    category: "Brownies",
    description: "Brownie irresistível com recheio cremoso de chocolate",
    price: "Consulte preços",
    image: String(imgBrownieRecheado),
  },
  {
    id: 'product:3',
    name: "Naked Brownie",
    category: "Brownies",
    description: "Brownie em camadas com recheio de brigadeiro branco e morangos frescos",
    price: "Consulte preços",
    image: String(imgNakedBrownie),
  },
  {
    id: 'product:4',
    name: "Trufas de 30g",
    category: "Trufas",
    description: "Trufas artesanais de chocolate em diversos sabores",
    price: "Consulte preços",
    image: String(imgTrufas),
  },
  {
    id: 'product:5',
    name: "Mini Ovos de Colher 50g",
    category: "Ovos de Colher",
    description: "Mini ovos de chocolate recheados, perfeitos para presentear",
    price: "Consulte preços",
    image: String(imgMiniOvos),
  },
  {
    id: 'product:6',
    name: "Bolos Caseirinhos",
    category: "Bolos",
    description: "Bolinhos individuais cobertos com chocolate, macios e deliciosos",
    price: "Consulte preços",
    image: String(imgBolosCaseirinhos),
  },
];

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from database...');
        const response = await fetch(`${API_URL}/products`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Products fetched:', data.products?.length || 0);

        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          // Initialize with default products if database is empty
          console.log('Database empty, initializing with default products');
          for (const product of defaultProducts) {
            await fetch(`${API_URL}/products`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`,
              },
              body: JSON.stringify(product),
            });
          }
          setProducts(defaultProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to default products on error
        setProducts(defaultProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      console.log('Adding product:', productData);
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product: ${response.status}`);
      }

      const data = await response.json();
      console.log('Product added:', data);
      
      const newProduct: Product = {
        ...productData,
        id: data.id,
      };
      setProducts(prev => [...prev, newProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, productData: Omit<Product, 'id'>) => {
    try {
      console.log('Updating product:', id, productData);
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status}`);
      }

      const data = await response.json();
      console.log('Product updated:', data);

      setProducts(prev =>
        prev.map(p => (p.id === id ? { ...productData, id } : p))
      );
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      console.log('Deleting product:', id);
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }

      const data = await response.json();
      console.log('Product deleted:', data);

      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, loading }}>
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