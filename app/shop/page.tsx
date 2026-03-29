'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Palette, ShoppingCart, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalAds from '@/components/GlobalAds';
import { useCart } from '@/contexts/CartContext';
import { loadData } from '@/lib/data-client';

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
  },
  {
    id: '3',
    name: 'Geisha Reserve',
    description: 'Floral e Complexo',
    price: '120,00',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB92vOe_9cEQ9TWNcwYkgHBiXbTMvNbxF9L6qVmhbgcSYroz9t1HxDAeBdoN4oYDkkM0AoWV-8IWsFNM_nSqCBAVBvtoO-gN8FAI3I27_PdrPMZlkdrS2g_UYMze6HVXUMuLiF66sVF5ZH_9XbT_h0cFhGWb5jQzwa7v7l2_Do1FfEi0MZrT7wpOGRAosvtxk4iq1C0rTsaJBVj88mpwmpWjQQXRsp9aonoxhWRLt0dccdg-GuSxnc2c9mYQkmkOOrcjdmzkqg6qnGw',
    mercadoLivreUrl: '/shop',
    isFeatured: false,
  },
  {
    id: '4',
    name: 'Espresso Blend',
    description: 'Intenso e Encorpado',
    price: '52,00',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAju4AZoVZL-K93F2RVnv99R9RgwjOjDV34y90kVL3EVPWpfwls5NPYoENntDnn-JxLvFC9S0j4nwrt5HJKYV28jEvw29Jmg40Bkw4yL9GdL1k4KS2FuZQGzi2VX4G72LyqXIvRlDzdWx36juk1hBQ4lnnx662cXps23wi_mXGq2a5eavaBbnhULrLhKpJok82vLmiKsl77D_S7E_WqdnUZWYwvosAECNPYtdPXInbqGW6etmwUWl7MZr5U2UyEsAobbkpj0W7wnvpQ',
    mercadoLivreUrl: '/shop',
    isFeatured: false,
  }
];

export default function Shop() {
  const [products, setProducts] = useState<any[]>(DEFAULT_PRODUCTS);
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();

  const [sortBy, setSortBy] = useState('relevance');
  const [selectedRoasts, setSelectedRoasts] = useState<string[]>([]);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_products', DEFAULT_PRODUCTS).then(data => {
      setProducts(data);
    });
  }, []);

  const handleRoastChange = (roast: string) => {
    setSelectedRoasts(prev => 
      prev.includes(roast) ? prev.filter(r => r !== roast) : [...prev, roast]
    );
  };

  const handleProcessChange = (process: string) => {
    setSelectedProcesses(prev => 
      prev.includes(process) ? prev.filter(p => p !== process) : [...prev, process]
    );
  };

  const filteredAndSortedProducts = [...products]
    .filter(product => {
      // Assuming description contains roast and process info for demo purposes
      // In a real app, these would be separate fields
      const matchesRoast = selectedRoasts.length === 0 || selectedRoasts.some(roast => product.description.toLowerCase().includes(roast.toLowerCase()));
      const matchesProcess = selectedProcesses.length === 0 || selectedProcesses.some(process => product.description.toLowerCase().includes(process.toLowerCase()));
      return matchesRoast && matchesProcess;
    })
    .sort((a, b) => {
      const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(',', '.')) : a.price;
      const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(',', '.')) : b.price;
      
      switch (sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'newest':
          // Assuming higher ID means newer for demo
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary">Início</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-bold text-slate-900">Shop</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="flex items-center gap-2 font-bold text-lg border-b border-primary/10 pb-2 text-slate-900">
              <Filter className="w-5 h-5 text-primary" /> Filtros
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900">Torra</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={selectedRoasts.includes('clara')} onChange={() => handleRoastChange('clara')} className="rounded border-primary/20 text-primary focus:ring-primary" /> Clara
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={selectedRoasts.includes('média')} onChange={() => handleRoastChange('média')} className="rounded border-primary/20 text-primary focus:ring-primary" /> Média
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={selectedRoasts.includes('escura')} onChange={() => handleRoastChange('escura')} className="rounded border-primary/20 text-primary focus:ring-primary" /> Escura
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900">Processo</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={selectedProcesses.includes('natural')} onChange={() => handleProcessChange('natural')} className="rounded border-primary/20 text-primary focus:ring-primary" /> Natural
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={selectedProcesses.includes('cereja descascado')} onChange={() => handleProcessChange('cereja descascado')} className="rounded border-primary/20 text-primary focus:ring-primary" /> Cereja Descascado
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={selectedProcesses.includes('fermentado')} onChange={() => handleProcessChange('fermentado')} className="rounded border-primary/20 text-primary focus:ring-primary" /> Fermentado
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Todos os Cafés</h2>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-primary/20 rounded-lg px-4 py-2 text-sm focus:ring-primary focus:border-primary outline-none text-slate-900"
              >
                <option value="relevance">Mais Relevantes</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="newest">Lançamentos</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <div key={product.id} className="group bg-white p-4 rounded-xl boxed-section hover:shadow-lg transition-all">
                  <div 
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: typeof product.price === 'string' ? parseFloat(product.price.replace(',', '.')) : product.price,
                      imageUrl: product.imageUrl,
                      quantity: 1
                    })}
                    className="block aspect-square bg-slate-50 rounded-lg overflow-hidden mb-4 relative cursor-pointer"
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {product.isFeatured && <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">DESTAQUE</span>}
                  </div>
                  <div className="space-y-1">
                    <div 
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: typeof product.price === 'string' ? parseFloat(product.price.replace(',', '.')) : product.price,
                        imageUrl: product.imageUrl,
                        quantity: 1
                      })}
                      className="font-bold text-lg group-hover:text-primary transition-colors block text-slate-900 cursor-pointer"
                    >
                      {product.name}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><Palette className="w-3 h-3" /> {product.description}</p>
                    <div className="pt-3 flex items-center justify-between">
                      <span className="text-xl font-black text-slate-900">R$ {product.price}</span>
                      <button 
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          price: typeof product.price === 'string' ? parseFloat(product.price.replace(',', '.')) : product.price,
                          imageUrl: product.imageUrl,
                          quantity: 1
                        })}
                        className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-all"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <GlobalAds />
      </main>

      <Footer />
    </div>
  );
}
