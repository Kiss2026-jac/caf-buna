'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalAds from '@/components/GlobalAds';
import { Flame, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { loadData } from '@/lib/data-client';

const DEFAULT_CONTENT = {
  title: 'Torra Artesanal',
  subtitle: 'Torramos em pequenos lotes para garantir o frescor e realçar as notas sensoriais únicas de cada grão.',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAju4AZoVZL-K93F2RVnv99R9RgwjOjDV34y90kVL3EVPWpfwls5NPYoENntDnn-JxLvFC9S0j4nwrt5HJKYV28jEvw29Jmg40Bkw4yL9GdL1k4KS2FuZQGzi2VX4G72LyqXIvRlDzdWx36juk1hBQ4lnnx662cXps23wi_mXGq2a5eavaBbnhULrLhKpJok82vLmiKsl77D_S7E_WqdnUZWYwvosAECNPYtdPXInbqGW6etmwUWl7MZr5U2UyEsAobbkpj0W7wnvpQ',
  items: [
    { title: 'Pequenos Lotes (Micro-roasting)', description: 'Torrar em pequenas quantidades nos permite ter controle total sobre a curva de temperatura, extraindo o melhor de cada grão.' },
    { title: 'Perfis Customizados', description: 'Cada variedade de café exige um perfil de torra específico para destacar sua doçura, acidez e corpo.' },
    { title: 'Frescor Garantido', description: 'Nossos cafés não ficam meses na prateleira. Torramos sob demanda para que chegue até você no pico do sabor.' }
  ]
};

export default function TorraArtesanal() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_pages_content', null).then(data => {
      if (data && data.torra) {
        setContent(data.torra);
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
            <Flame className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">{content.title}</h1>
          <p className="text-lg text-slate-600">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">A Arte da Torra</h3>
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
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2">
            <Image
              src={content.imageUrl}
              alt={content.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        <GlobalAds />
      </main>
      <Footer />
    </div>
  );
}
