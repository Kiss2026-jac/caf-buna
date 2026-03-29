'use client';

import { useState } from 'react';
import { Download, Server, HardDrive, CheckCircle2 } from 'lucide-react';

export default function AdminExportar() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Create an invisible link to trigger the download
    const link = document.createElement('a');
    link.href = '/api/export-code';
    link.download = 'bunashop-codigo-fonte.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 3000); // Reset button state after a few seconds
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Exportar & Publicar</h1>
        <p className="text-slate-500 mt-2">Baixe o código-fonte completo da sua loja para publicar em seu próprio servidor.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
            <Download className="w-8 h-8" />
          </div>
          <div className="space-y-4 flex-1">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Baixar Código-Fonte</h2>
            <p className="text-slate-600">
              Clique no botão abaixo para gerar um arquivo <strong>.zip</strong> contendo todo o código da sua loja (Next.js, Tailwind, Firebase config).
            </p>
            
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-3 disabled:opacity-70"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Gerando Arquivo...
                </>
              ) : (
                <>
                  <HardDrive className="w-5 h-5" />
                  Baixar Projeto (.zip)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-xl shadow-sm border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <Server className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-black uppercase tracking-tighter">Como publicar (Deploy)</h2>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 1. Vercel (Recomendado e Gratuito)
            </h3>
            <p className="text-slate-400 pl-7">
              A Vercel é a plataforma oficial do Next.js. Basta criar uma conta em <strong>vercel.com</strong>, subir este código para o seu GitHub e importar o repositório lá. Não se esqueça de configurar as variáveis de ambiente (chaves do Firebase) nas configurações do projeto na Vercel.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 2. Servidor Próprio (VPS / Hostinger / AWS)
            </h3>
            <p className="text-slate-400 pl-7">
              Se você tem um servidor Linux com Node.js instalado, envie o arquivo .zip para lá, extraia e rode os seguintes comandos no terminal:
            </p>
            <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm text-slate-300 ml-7 border border-slate-800">
              npm install<br/>
              npm run build<br/>
              npm run start
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
