import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, Plus, Minus, Check, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function ProductDetail() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary">Início</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-bold text-slate-900">Bourbon Amarelo</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white p-8 rounded-2xl boxed-section flex items-center justify-center relative shadow-sm">
            <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded">DESTAQUE</span>
            <div className="relative w-full aspect-square max-w-md">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHSxLuV1nexcsYLWANrqleH1N6gJwPY41y8_JosXs_GBWAE9K0aO_17GpDUiPUXRDujE3GQZigaxIn3uFNm-IF5FlZdoO_yhUT15HH0xVMjI3dUQOT2BqZYY7O7b3yV8oPjTEykdq0zd1llIwQ5KPq34i2RaCktxtUYoyeqmlYz2ryl5QjeMmFZhN8PfbDfXdCsHaB5QJT5DfUrxYYrH-7eohnLVry9vhE3XIVuQTNLLkUN1Aji5GcVNH_CiYVXRiVM89yFq8ZZKTd"
                alt="Bags of artisanal roasted coffee beans"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight uppercase text-slate-900">Bourbon Amarelo</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-slate-500">(24 avaliações)</span>
              </div>
            </div>

            <div className="text-3xl font-black text-primary">R$ 65,00</div>

            <p className="text-slate-600 leading-relaxed">
              Um café excepcional cultivado nas montanhas de Minas Gerais. Apresenta corpo aveludado, acidez cítrica brilhante e notas marcantes de caramelo, mel e um leve toque de frutas amarelas. Perfeito para métodos filtrados.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-primary/10">
              <div>
                <span className="block text-xs text-slate-500 uppercase font-bold">Torra</span>
                <span className="font-semibold text-slate-900">Média Clara</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500 uppercase font-bold">Processo</span>
                <span className="font-semibold text-slate-900">Cereja Descascado</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500 uppercase font-bold">Variedade</span>
                <span className="font-semibold text-slate-900">Bourbon Amarelo</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500 uppercase font-bold">Pontuação</span>
                <span className="font-semibold text-slate-900">86 Pontos SCAA</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-primary/20 rounded-lg">
                  <button className="p-3 hover:bg-primary/5 text-slate-500 transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-bold text-slate-900">1</span>
                  <button className="p-3 hover:bg-primary/5 text-slate-500 transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
                <Link href="/shop" className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" /> ADICIONAR AO CARRINHO
                </Link>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 justify-center">
                <Check className="w-3 h-3 text-green-500" /> Em estoque. Envio em até 24h úteis.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
