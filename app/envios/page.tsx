'use client';

import { useState, useEffect } from 'react';
import { loadData } from '@/lib/data-client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DEFAULT_LEGAL = {
  envios: 'Nossos cafés são torrados sob demanda e enviados em até 2 dias úteis após a confirmação do pagamento. Trabalhamos com diversas transportadoras para garantir que seu café chegue fresco e rápido em qualquer lugar do Brasil. O código de rastreio será enviado para o seu e-mail assim que o pedido for despachado.',
  trocas: 'Garantimos a qualidade de todos os nossos produtos. Caso você receba um produto com defeito ou diferente do que pediu, entre em contato conosco em até 7 dias corridos após o recebimento. Por se tratar de um produto alimentício, não aceitamos devoluções de cafés abertos, a menos que apresentem defeito de fabricação.',
  contato: 'Estamos sempre prontos para ajudar você a ter a melhor experiência com nossos cafés.\n\nE-mail: contato@bunashop.com.br\nWhatsApp: (11) 99999-9999\nHorário de atendimento: Segunda a Sexta, das 9h às 18h.'
};

export default function EnviosPage() {
  const [content, setContent] = useState(DEFAULT_LEGAL.envios);

  useEffect(() => {
    loadData('buna_legal_pages', DEFAULT_LEGAL).then(data => {
      if (data && data.envios) {
        setContent(data.envios);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-primary/20">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-6">
              Envios e Entregas
            </h1>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600 leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
