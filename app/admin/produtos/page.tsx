'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { loadData, saveData } from '@/lib/data-client';

const DEFAULT_PRODUCTS = [
  {
    id: '1',
    name: 'Bourbon Amarelo',
    description: 'Notas de Caramelo e Mel',
    price: '65,00',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHSxLuV1nexcsYLWANrqleH1N6gJwPY41y8_JosXs_GBWAE9K0aO_17GpDUiPUXRDujE3GQZigaxIn3uFNm-IF5FlZdoO_yhUT15HH0xVMjI3dUQOT2BqZYY7O7b3yV8oPjTEykdq0zd1llIwQ5KPq34i2RaCktxtUYoyeqmlYz2ryl5QjeMmFZhN8PfbDfXdCsHaB5QJT5DfUrxYYrH-7eohnLVry9vhE3XIVuQTNLLkUN1Aji5GcVNH_CiYVXRiVM89yFq8ZZKTd',
    mercadoLivreUrl: '/shop',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Catuaí Vermelho',
    description: 'Frutas Vermelhas e Cítrico',
    price: '58,00',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBYhH38osCOSmrn_L6akKPfrF1ytxRltx-nFuW22vBuQ23IMYszxp3-e6PqQjA4236q5Ygh6rJT6rict_Gw4C2eYuQ1uRsZ3LdToLYF6mCJng7RYz81V1CmjUp5WS4jrJD1646dyke0nhlubVfCt7OeAkIHlP8FNdepUjhMIJhMxeJBl3-Bio8IxMzu7x3sSSw-k3J0Aa4suLijiMLsSp7wU9wkhXGSbN-Tt5UdmS9vYfJjLhQythis7sWC-b5gJQ7ZL2RQ8y1NGsa',
    mercadoLivreUrl: '/shop',
    isFeatured: false,
  }
];

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>(DEFAULT_PRODUCTS);
  const [isMounted, setIsMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_products', DEFAULT_PRODUCTS).then(data => {
      setProducts(data);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedProducts;
    
    if (currentProduct.id) {
      // Update existing
      updatedProducts = products.map(p => p.id === currentProduct.id ? currentProduct : p);
    } else {
      // Create new
      const newProduct = {
        ...currentProduct,
        id: Date.now().toString(),
      };
      updatedProducts = [...products, newProduct];
    }
    
    setProducts(updatedProducts);
    await saveData('buna_products', updatedProducts);
    setIsEditing(false);
    setCurrentProduct(null);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      await saveData('buna_products', updatedProducts);
    }
  };

  const openNewProduct = () => {
    setCurrentProduct({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      mercadoLivreUrl: '',
      isFeatured: false,
    });
    setIsEditing(true);
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Produtos</h1>
          <p className="text-slate-500 mt-2">Gerencie o catálogo da sua loja.</p>
        </div>
        <div className="flex items-center gap-4">
          {isSaved && <span className="text-emerald-600 font-bold text-sm">Produto salvo com sucesso!</span>}
          <button 
            onClick={openNewProduct}
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" /> Novo Produto
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              {currentProduct.id ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nome do Produto</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    value={currentProduct.name}
                    onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                    placeholder="Ex: Café Especial Bourbon"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Descrição Curta</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    value={currentProduct.description}
                    onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                    placeholder="Ex: Notas de Caramelo e Chocolate"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Preço (R$)</label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      value={currentProduct.price}
                      onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})}
                      placeholder="65,00"
                    />
                  </div>
                  <div className="flex items-end pb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded text-primary focus:ring-primary"
                        checked={currentProduct.isFeatured}
                        onChange={e => setCurrentProduct({...currentProduct, isFeatured: e.target.checked})}
                      />
                      <span className="text-sm font-bold text-slate-700">Destaque na Vitrine</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">URL da Imagem</label>
                  <input 
                    type="url" 
                    required
                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    value={currentProduct.imageUrl}
                    onChange={e => setCurrentProduct({...currentProduct, imageUrl: e.target.value})}
                    placeholder="https://..."
                  />
                  <p className="text-xs text-slate-500 mt-1">Cole o link de uma imagem hospedada (ex: Imgur, Cloudinary)</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Link de Compra (Mercado Livre / Checkout)</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    value={currentProduct.mercadoLivreUrl}
                    onChange={e => setCurrentProduct({...currentProduct, mercadoLivreUrl: e.target.value})}
                    placeholder="https://produto.mercadolivre.com.br/..."
                  />
                </div>

                {currentProduct.imageUrl && (
                  <div className="mt-4 border border-slate-200 rounded-lg p-2 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-slate-100">
                      <Image src={currentProduct.imageUrl} alt="Preview" fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-sm text-slate-500 font-medium">Pré-visualização da imagem</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Save className="w-5 h-5" /> Salvar Produto
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-bold text-slate-600 text-sm">Produto</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Preço</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Destaque</th>
                  <th className="p-4 font-bold text-slate-600 text-sm text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      Nenhum produto cadastrado ainda.
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                            {product.imageUrl ? (
                              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <ImageIcon className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{product.name}</p>
                            <p className="text-xs text-slate-500 truncate max-w-[200px]">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-slate-900">R$ {product.price}</td>
                      <td className="p-4">
                        {product.isFeatured ? (
                          <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Sim</span>
                        ) : (
                          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded">Não</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => {
                              setCurrentProduct(product);
                              setIsEditing(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
