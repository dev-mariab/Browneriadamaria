import { useState } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { AlertCircle, Trash2 } from 'lucide-react';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d2e7a431`;

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<string>('');

  const clearDatabase = async () => {
    if (!confirm('⚠️ ATENÇÃO: Isso vai deletar TODOS os produtos do banco de dados. Tem certeza?')) {
      return;
    }

    try {
      setStatus('Buscando produtos...');
      const response = await fetch(`${API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();
      const products = data.products || [];

      setStatus(`Encontrados ${products.length} produtos. Deletando...`);

      for (const product of products) {
        await fetch(`${API_URL}/products/${product.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        });
      }

      setStatus('✅ Banco de dados limpo! Recarregue a página.');
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setStatus(`❌ Erro: ${error}`);
      console.error('Error clearing database:', error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors z-50"
        title="Painel de Debug"
      >
        <AlertCircle className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 bg-white p-6 rounded-xl shadow-2xl border-2 border-red-500 z-50 max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-['Playfair_Display'] text-lg font-bold text-red-600">
          🔧 Debug Panel
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Use este painel para resolver problemas com imagens e banco de dados.
        </p>

        <button
          onClick={clearDatabase}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Limpar Banco de Dados
        </button>

        {status && (
          <div className="bg-gray-100 p-3 rounded-lg text-sm font-mono text-gray-700">
            {status}
          </div>
        )}

        <p className="text-xs text-gray-500">
          ⚠️ Isso vai deletar todos os produtos e reinicializar com os padrões.
        </p>
      </div>
    </div>
  );
}
