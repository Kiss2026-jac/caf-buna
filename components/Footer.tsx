'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Coffee, Share2, AtSign, Globe, Instagram, Facebook, Youtube } from 'lucide-react';
import { loadData } from '@/lib/data-client';

const DEFAULT_SOCIAL = {
  instagram: '',
  facebook: '',
  whatsapp: '',
  youtube: '',
  tiktok: ''
};

export default function Footer() {
  const [social, setSocial] = useState<any>(DEFAULT_SOCIAL);
  const [layout, setLayout] = useState<any>({
    copyrightYear: '2026',
    developerName: 'AVP SOLUÇÕES DIGITAIS',
    developerUrl: 'https://avpsolucoesdigitais.com.br'
  });

  useEffect(() => {
    loadData('buna_social_media', DEFAULT_SOCIAL).then(data => {
      setSocial(data);
    });
    loadData('buna_layout', {}).then(data => {
      if (data) {
        setLayout((prev: any) => ({
          ...prev,
          copyrightYear: data.copyrightYear || prev.copyrightYear,
          developerName: data.developerName || prev.developerName,
          developerUrl: data.developerUrl || prev.developerUrl
        }));
      }
    });
  }, []);

  return (
    <footer className="bg-white border-t border-primary/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-12 border-b border-primary/10">
          <div className="space-y-4">
            <h4 className="text-2xl font-black uppercase tracking-tight text-slate-900">Clube do Grão</h4>
            <p className="text-slate-500">Assine nossa newsletter e receba dicas de preparo, lançamentos exclusivos e 10% de desconto na primeira compra.</p>
          </div>
          <div className="flex gap-2">
            <input className="flex-1 bg-primary/5 border-primary/20 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary outline-none text-slate-900" placeholder="Seu melhor e-mail" type="email" />
            <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">INSCREVER</button>
          </div>
        </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Coffee className="text-primary w-6 h-6" />
            <span className="font-black uppercase tracking-tighter text-slate-900">bunashop.com.br</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">O melhor do café especial brasileiro selecionado e torrado com carinho para você.</p>
        </div>
        <div className="space-y-3">
          <h6 className="font-bold text-sm uppercase text-slate-900">Shop</h6>
          <ul className="text-xs text-slate-500 space-y-2">
            <li><Link className="hover:text-primary" href="/shop">Todos os Cafés</Link></li>
            <li><Link className="hover:text-primary" href="/shop">Acessórios</Link></li>
            <li><Link className="hover:text-primary" href="/assinatura">Assinaturas</Link></li>
            <li><Link className="hover:text-primary" href="/shop">Kits de Presente</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h6 className="font-bold text-sm uppercase text-slate-900">Suporte</h6>
          <ul className="text-xs text-slate-500 space-y-2">
            <li><Link className="hover:text-primary" href="/">Envios e Entregas</Link></li>
            <li><Link className="hover:text-primary" href="/">Trocas e Devoluções</Link></li>
            <li><Link className="hover:text-primary" href="/">Perguntas Frequentes</Link></li>
            <li><Link className="hover:text-primary" href="/">Contato</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h6 className="font-bold text-sm uppercase text-slate-900">Siga-nos</h6>
          <div className="flex gap-4">
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary">
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {social.youtube && (
              <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary">
                <Youtube className="w-5 h-5" />
              </a>
            )}
            {social.tiktok && (
              <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
            )}
            {social.whatsapp && (
              <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary">
                <Share2 className="w-5 h-5" />
              </a>
            )}
            {!social.instagram && !social.facebook && !social.youtube && !social.tiktok && !social.whatsapp && (
              <span className="text-xs text-slate-400">Nenhuma rede social configurada.</span>
            )}
          </div>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          © {layout.copyrightYear} bunashop.com.br. TODOS OS DIREITOS RESERVADOS. PÁGINA CONSTRUÍDA POR <a href={layout.developerUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline underline-offset-2">{layout.developerName}</a>.
        </p>
        <Link href="/admin" className="text-[10px] text-slate-400 hover:text-primary uppercase tracking-widest font-bold">Área Admin</Link>
      </div>
    </div>
  </footer>
  );
}
