import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useProducts, Product } from '../contexts/ProductsContext';
import { ProductForm } from './ProductForm';
import { LogOut, Home, Package, MessageCircle, BarChart3, Settings, Plus, Edit2, Trash2 } from 'lucide-react';

export function AdminPanel() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja remover "${name}" do cardápio?`)) {
      deleteProduct(id).catch(error => {
        console.error('Error deleting product:', error);
        alert('Erro ao deletar produto. Tente novamente.');
      });
    }
  };

  const handleSaveProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      setShowForm(false);
      setEditingProduct(undefined);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erro ao salvar produto. Tente novamente.');
    }
  };

  const stats = [
    { label: 'Produtos', value: products.length.toString(), icon: Package, color: 'from-pink-500 to-rose-500' },
    { label: 'Mensagens WhatsApp', value: '24', icon: MessageCircle, color: 'from-purple-500 to-indigo-500' },
    { label: 'Visualizações', value: '1.2k', icon: BarChart3, color: 'from-amber-500 to-orange-500' },
  ];

  const quickActions = [
    { label: 'Ver Site', icon: Home, action: () => navigate('/') },
    { label: 'Adicionar Produto', icon: Plus, action: handleAddProduct },
    { label: 'Configurações', icon: Settings, action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-['Playfair_Display'] text-[#8B4513]">
                Painel Administrativo
              </h1>
              <p className="text-sm text-gray-600 mt-1">Browneria da Maria</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#D4A5A5] to-[#8B4513] rounded-2xl p-8 text-white mb-8 shadow-lg">
          <h2 className="text-3xl font-['Playfair_Display'] mb-2">Bem-vinda, Maria! 👋</h2>
          <p className="text-white/90">Gerencie sua confeitaria de forma simples e eficiente</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-['Playfair_Display'] text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4A5A5] hover:bg-[#FFF5F5] transition-all group"
              >
                <action.icon className="w-5 h-5 text-gray-600 group-hover:text-[#8B4513]" />
                <span className="text-gray-700 group-hover:text-[#8B4513] font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Overview */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-['Playfair_Display'] text-gray-900">Produtos Ativos</h3>
            <span className="text-sm text-gray-500">{products.length} produtos</span>
          </div>
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">{product.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-sm text-[#8B4513] hover:underline"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id, product.name)}
                    className="text-sm text-[#8B4513] hover:underline"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-gradient-to-r from-[#FFF5F5] to-[#FFE8E8] rounded-xl p-6 border border-[#FFD4D4]">
          <h3 className="text-lg font-['Playfair_Display'] text-gray-900 mb-3">Informações de Contato</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">WhatsApp:</span>
              <span className="ml-2 text-gray-900 font-medium">(88) 99413-6820</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 text-gray-900 font-medium">pinhom913@gmail.com</span>
            </div>
            <div>
              <span className="text-gray-600">Localização:</span>
              <span className="ml-2 text-gray-900 font-medium">Quixadá-CE</span>
            </div>
            <div>
              <span className="text-gray-600">Instagram:</span>
              <span className="ml-2 text-gray-900 font-medium">@browneria_damaria</span>
            </div>
          </div>
        </div>
      </main>

      {/* Product Form */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(undefined);
          }}
        />
      )}
    </div>
  );
}