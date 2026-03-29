'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, BookOpen, Settings, ArrowRight } from 'lucide-react';
import { loadData } from '@/lib/data-client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, historyUpdated: false });

  useEffect(() => {
    async function fetchStats() {
      const products = await loadData('buna_products', []);
      const history = await loadData('buna_history', {});
      setStats({
        products: products.length || 4,
        historyUpdated: !!history.nossaHistoria,
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Bem-vindo ao painel de controle da BunaShop.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Produtos</h3>
              <p className="text-sm text-slate-500">{stats.products} cadastrados</p>
            </div>
          </div>
          <Link href="/admin/produtos" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
            Gerenciar <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">História</h3>
              <p className="text-sm text-slate-500">{stats.historyUpdated ? 'Atualizada' : 'Padrão'}</p>
            </div>
          </div>
          <Link href="/admin/historia" className="text-blue-500 font-bold text-sm flex items-center gap-1 hover:underline">
            Editar Textos e Vídeos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Layout</h3>
              <p className="text-sm text-slate-500">Cores e Textos Iniciais</p>
            </div>
          </div>
          <Link href="/admin/layout-config" className="text-emerald-500 font-bold text-sm flex items-center gap-1 hover:underline">
            Configurar <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
