'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalAds from '@/components/GlobalAds';
import { Leaf, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { loadData } from '@/lib/data-client';

const DEFAULT_CONTENT = {
  title: 'Curadoria de Excelência',
  subtitle: 'Selecionamos apenas grãos de fazendas sustentáveis com pontuação acima de 80 SCAA. Conheça nosso rigoroso processo de escolha.',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHSxLuV1nexcsYLWANrqleH1N6gJwPY41y8_JosXs_GBWAE9K0aO_17GpDUiPUXRDujE3GQZigaxIn3uFNm-IF5FlZdoO_yhUT15HH0xVMjI3dUQOT2BqZYY7O7b3yV8oPjTEykdq0zd1llIwQ5KPq34i2RaCktxtUYoyeqmlYz2ryl5QjeMmFZhN8PfbDfXdCsHaB5QJT5DfUrxYYrH-7eohnLVry9vhE3XIVuQTNLLkUN1Aji5GcVNH_CiYVXRiVM89yFq8ZZKTd',
  items: [
    { title: 'Pontuação SCAA 80+', description: 'Garantimos que todos os nossos cafés sejam classificados como especiais pela Specialty Coffee Association.' },
    { title: 'Sustentabilidade', description: 'Trabalhamos apenas com produtores que respeitam o meio ambiente e as leis trabalhistas.' },
    { title: 'Rastreabilidade', description: 'Você sabe exatamente de onde vem o seu café, quem o produziu e em qual altitude.' }
  ]
};

export default function Curadoria() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_pages_content', null).then(data => {
      if (data && data.curadoria) {
        setContent(data.curadoria);
      }
    });
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <Leaf className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">{content.title}</h1>
          <p className="text-lg text-slate-600">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={content.imageUrl}
              alt={content.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">O que buscamos?</h3>
            <ul className="space-y-4">
              {content.items.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <strong className="block text-slate-900">{item.title}</strong>
                    <span className="text-slate-600">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <GlobalAds />
      </main>
      <Footer />
    </div>
  );
}
