'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalAds from '@/components/GlobalAds';
import { loadData } from '@/lib/data-client';

const DEFAULT_ASSINATURA = {
  title: 'Clube de Assinatura',
  subtitle: 'Receba os melhores cafés especiais do Brasil no conforto da sua casa, todos os meses. Frescor garantido e curadoria exclusiva.',
  plans: [
    {
      name: 'Iniciante',
      price: '59',
      description: 'Ideal para quem está começando a explorar o mundo dos cafés especiais.',
      features: [
        '1 pacote de 250g por mês',
        'Curadoria de cafés clássicos',
        'Frete grátis'
      ],
      isPopular: false
    },
    {
      name: 'Avançado',
      price: '109',
      description: 'Para os apaixonados que consomem café diariamente e buscam variedade.',
      features: [
        '2 pacotes de 250g por mês',
        'Cafés de diferentes regiões',
        'Brinde surpresa a cada 3 meses',
        'Frete grátis'
      ],
      isPopular: true
    },
    {
      name: 'Expert',
      price: '199',
      description: 'A experiência definitiva com microlotes exclusivos e edições limitadas.',
      features: [
        '3 pacotes de 250g por mês',
        'Acesso a microlotes raros',
        'Acesso antecipado a lançamentos',
        'Frete grátis'
      ],
      isPopular: false
    }
  ]
};

export default function Assinatura() {
  const [assinatura, setAssinatura] = useState<any>(DEFAULT_ASSINATURA);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_assinatura_content', DEFAULT_ASSINATURA).then(data => {
      setAssinatura(data);
    });
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">{assinatura.title}</h2>
          <p className="text-lg text-slate-600">{assinatura.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {assinatura.plans.map((plan: any, index: number) => (
            <div 
              key={index} 
              className={`border rounded-2xl p-8 space-y-6 relative bg-white transition-all ${
                plan.isPopular 
                  ? 'border-2 border-primary shadow-md transform md:-translate-y-4' 
                  : 'border-primary/20 hover:shadow-lg'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  MAIS POPULAR
                </span>
              )}
              <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
              <div className="text-4xl font-black text-primary">
                R$ {plan.price}<span className="text-lg text-slate-500 font-normal">/mês</span>
              </div>
              <p className="text-slate-600">{plan.description}</p>
              <ul className="space-y-3">
                {plan.features.map((feature: string, fIndex: number) => (
                  <li key={fIndex} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-primary shrink-0" /> 
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href={plan.checkoutUrl || '#'}
                target={plan.checkoutUrl ? "_blank" : "_self"}
                rel={plan.checkoutUrl ? "noopener noreferrer" : ""}
                className={`w-full font-bold py-3 rounded-lg transition-colors text-center block ${
                  plan.isPopular 
                    ? 'bg-primary text-white hover:opacity-90' 
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                }`}
              >
                ASSINAR AGORA
              </a>
            </div>
          ))}
        </div>
        
        <GlobalAds />
      </main>

      <Footer />
    </div>
  );
}
