import Link from 'next/link';
import { Coffee, Share2, AtSign, Globe } from 'lucide-react';

export default function Footer() {
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
            <Link className="text-slate-400 hover:text-primary" href="/"><Share2 className="w-5 h-5" /></Link>
            <Link className="text-slate-400 hover:text-primary" href="/"><AtSign className="w-5 h-5" /></Link>
            <Link className="text-slate-400 hover:text-primary" href="/"><Globe className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">© 2024 bunashop.com.br. TODOS OS DIREITOS RESERVADOS. PÁGINA CONSTRUÍDA POR AVP SOLUÇÕES DIGITAIS.</p>
        <Link href="/admin" className="text-[10px] text-slate-400 hover:text-primary uppercase tracking-widest font-bold">Área Admin</Link>
      </div>
    </div>
  </footer>
  );
}
