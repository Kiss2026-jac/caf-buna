'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalAds from '@/components/GlobalAds';
import PageMascots from '@/components/PageMascots';
import { loadData } from '@/lib/data-client';

const DEFAULT_GUIA = {
  title: 'Guia de Preparo',
  subtitle: 'Extraia o máximo de sabor do seu café especial com nossas dicas para os métodos mais populares.',
  methods: [
    {
      title: 'V60 / Filtro de Papel',
      description: 'Ideal para destacar a acidez e as notas florais/frutadas do café.',
      proporcao: '10g de café para 150ml de água.',
      moagem: 'Média (textura de areia grossa).',
      agua: '90°C a 96°C (nunca fervendo).',
      preparo: 'Escalde o filtro. Despeje um pouco de água para a pré-infusão (30s). Despeje o restante da água em movimentos circulares lentos.'
    },
    {
      title: 'Prensa Francesa',
      description: 'Resulta em uma bebida mais encorpada e com óleos essenciais preservados.',
      proporcao: '10g de café para 150ml de água.',
      moagem: 'Grossa (textura de sal grosso).',
      agua: '90°C a 96°C.',
      preparo: 'Adicione o café e a água. Misture levemente. Aguarde 4 minutos. Pressione o êmbolo lentamente até o fundo.'
    },
    {
      title: 'Moka (Cafeteira Italiana)',
      description: 'Bebida intensa, que lembra um espresso, ideal para cafés com notas de chocolate e caramelo.',
      proporcao: 'Preencha o filtro sem compactar.',
      moagem: 'Média-fina.',
      agua: 'Pré-aquecida (ajuda a não queimar o café).',
      preparo: 'Coloque água até a válvula. Adicione o filtro com café. Leve ao fogo baixo. Retire do fogo assim que começar a borbulhar na parte superior.'
    },
    {
      title: 'Espresso',
      description: 'A quintessência da extração sob pressão. Corpo denso e crema persistente.',
      proporcao: '18g a 20g para um espresso duplo (aprox. 40g na xícara).',
      moagem: 'Fina.',
      agua: 'Tempo: 25 a 30 segundos de extração.',
      preparo: 'Distribua e compacte o café uniformemente no porta-filtro. Encaixe no grupo e inicie a extração imediatamente.'
    }
  ]
};

export default function GuiaDePreparo() {
  const [guia, setGuia] = useState<any>(DEFAULT_GUIA);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_guia_content', DEFAULT_GUIA).then(data => {
      setGuia(data);
    });
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">{guia.title}</h2>
          <p className="text-lg text-slate-600">{guia.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {guia.methods.map((method: any, index: number) => (
            <div key={index} className="bg-slate-50 rounded-2xl p-8 space-y-6 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">{method.title}</h3>
              <p className="text-slate-600">{method.description}</p>
              <ul className="space-y-4 text-sm text-slate-700">
                <li><strong className="text-slate-900">Proporção:</strong> {method.proporcao}</li>
                <li><strong className="text-slate-900">Moagem:</strong> {method.moagem}</li>
                <li><strong className="text-slate-900">Água / Tempo:</strong> {method.agua}</li>
                <li><strong className="text-slate-900">Preparo:</strong> {method.preparo}</li>
              </ul>
            </div>
          ))}
        </div>
        
        <GlobalAds />
      </main>

      <PageMascots leftMascotId={guia.leftMascotId} rightMascotId={guia.rightMascotId} />
      <Footer />
    </div>
  );
}
