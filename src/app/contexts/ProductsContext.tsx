import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const imgBrownieTradicional = '/images/product-placeholder.svg';
const imgBrownieRecheado = '/images/product-placeholder.svg';
const imgMiniOvos = '/images/product-placeholder.svg';
const imgTrufas = '/images/product-placeholder.svg';
const imgBolosCaseirinhos = '/images/product-placeholder.svg';
const imgNakedBrownie = '/images/product-placeholder.svg';

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
const PRODUCTS_CACHE_KEY = 'browneria_products_cache';

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

  const normalizeProducts = (rawProducts: any[]): Product[] => {
    const unique = new Map<string, Product>();

    rawProducts.forEach((item, index) => {
      const id = typeof item?.id === 'string' && item.id.trim() !== ''
        ? item.id
        : `temp:${Date.now()}-${index}`;

      unique.set(id, {
        id,
        name: String(item?.name ?? ''),
        category: String(item?.category ?? ''),
        description: String(item?.description ?? ''),
        price: String(item?.price ?? ''),
        image: String(item?.image ?? ''),
      });
    });

    return Array.from(unique.values());
  };

  // Fetch products from database
  useEffect(() => {
    const cachedProducts = localStorage.getItem(PRODUCTS_CACHE_KEY);
    if (cachedProducts) {
      try {
        const parsed = JSON.parse(cachedProducts) as Product[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(normalizeProducts(parsed));
        }
      } catch (error) {
        console.error('Error reading products cache:', error);
      }
    }

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

        const normalized = normalizeProducts(Array.isArray(data.products) ? data.products : []);
        setProducts(normalized);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      return;
    }
    localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(products));
  }, [products]);

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
        ...data.product,
        id: data.id || data.product?.id,
      };
      setProducts(prev => normalizeProducts([...prev, newProduct]));
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

      const updatedProduct: Product = {
        ...productData,
        ...data.product,
        id,
      };

      setProducts(prev => normalizeProducts([
        ...prev.filter((p) => p.id !== id),
        updatedProduct,
      ]));
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