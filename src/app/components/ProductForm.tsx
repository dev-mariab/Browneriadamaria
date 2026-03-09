import { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Product } from '../contexts/ProductsContext';

interface ProductFormProps {
  product?: Product;
  onSave: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    description: product?.description || '',
    price: product?.price || '',
    image: product?.image || '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Converte imagem para base64 para armazenar no localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Por favor, adicione uma imagem do produto');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-['Playfair_Display'] text-gray-900">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto do Produto *
            </label>
            <div className="space-y-4">
              {formData.image && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-[#D4A5A5] hover:bg-[#FFF5F5] transition-all group"
              >
                <div className="flex flex-col items-center gap-2">
                  {formData.image ? (
                    <>
                      <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-[#8B4513]" />
                      <span className="text-sm text-gray-600 group-hover:text-[#8B4513]">
                        Trocar Foto
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#8B4513]" />
                      <span className="text-sm text-gray-600 group-hover:text-[#8B4513]">
                        Clique para fazer upload
                      </span>
                      <span className="text-xs text-gray-500">PNG, JPG até 5MB</span>
                    </>
                  )}
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Produto *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A5A5] focus:border-transparent outline-none"
              placeholder="Ex: Brownie Tradicional"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoria *
            </label>
            <input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A5A5] focus:border-transparent outline-none"
              placeholder="Ex: Brownies, Trufas, Bolos"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A5A5] focus:border-transparent outline-none resize-none"
              placeholder="Descreva o produto..."
              required
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Preço *
            </label>
            <input
              id="price"
              type="text"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A5A5] focus:border-transparent outline-none"
              placeholder="Ex: R$ 15,00 ou Consulte preços"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#D4A5A5] to-[#8B4513] text-white rounded-lg hover:shadow-lg transition-all font-medium"
            >
              {product ? 'Salvar Alterações' : 'Adicionar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
