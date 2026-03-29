'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalAds from '@/components/GlobalAds';
import { Truck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { loadData } from '@/lib/data-client';

const DEFAULT_CONTENT = {
  title: 'Entrega Expressa',
  subtitle: 'Seu café chega em sua casa poucos dias após a torra para o máximo de sabor e aroma.',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBYhH38osCOSmrn_L6akKPfrF1ytxRltx-nFuW22vBuQ23IMYszxp3-e6PqQjA4236q5Ygh6rJT6rict_Gw4C2eYuQ1uRsZ3LdToLYF6mCJng7RYz81V1CmjUp5WS4jrJD1646dyke0nhlubVfCt7OeAkIHlP8FNdepUjhMIJhMxeJBl3-Bio8IxMzu7x3sSSw-k3J0Aa4suLijiMLsSp7wU9wkhXGSbN-Tt5UdmS9vYfJjLhQythis7sWC-b5gJQ7ZL2RQ8y1NGsa',
  items: [
    { title: 'Embalagem com Válvula', description: 'Utilizamos embalagens especiais com válvula desgaseificadora, que permite a saída do CO2 sem deixar o oxigênio entrar, preservando o café.' },
    { title: 'Envio Rápido', description: 'Despachamos seu pedido em até 24 horas úteis após a confirmação. Trabalhamos com as melhores transportadoras para garantir agilidade.' },
    { title: 'Rastreamento em Tempo Real', description: 'Acompanhe cada passo do seu pedido, desde a saída da nossa torrefação até a chegada na sua porta.' }
  ]
};

export default function EntregaExpressa() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_pages_content', null).then(data => {
      if (data && data.entrega) {
        setContent(data.entrega);
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
            <Truck className="w-10 h-10" />
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
            <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Como funciona?</h3>
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
