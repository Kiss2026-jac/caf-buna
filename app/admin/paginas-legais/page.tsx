'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import { loadData, saveData } from '@/lib/data-client';

const DEFAULT_LEGAL = {
  envios: 'Nossos cafés são torrados sob demanda e enviados em até 2 dias úteis após a confirmação do pagamento. Trabalhamos com diversas transportadoras para garantir que seu café chegue fresco e rápido em qualquer lugar do Brasil. O código de rastreio será enviado para o seu e-mail assim que o pedido for despachado.',
  trocas: 'Garantimos a qualidade de todos os nossos produtos. Caso você receba um produto com defeito ou diferente do que pediu, entre em contato conosco em até 7 dias corridos após o recebimento. Por se tratar de um produto alimentício, não aceitamos devoluções de cafés abertos, a menos que apresentem defeito de fabricação.',
  contato: 'Estamos sempre prontos para ajudar você a ter a melhor experiência com nossos cafés.\n\nE-mail: contato@bunashop.com.br\nWhatsApp: (11) 99999-9999\nHorário de atendimento: Segunda a Sexta, das 9h às 18h.'
};

export default function AdminPaginasLegais() {
  const [legalData, setLegalData] = useState<any>(DEFAULT_LEGAL);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_legal_pages', DEFAULT_LEGAL).then(data => {
      setLegalData(data);
    });
  }, []);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await saveData('buna_legal_pages', legalData);
      setTimeout(() => {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 500);
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const handleChange = (field: string, value: string) => {
    setLegalData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Páginas de Suporte</h1>
          <p className="text-slate-500 text-sm">Gerencie o conteúdo das páginas de Envios, Trocas e Contato.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-lg flex items-center gap-2 border border-emerald-100">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-medium">Conteúdo salvo com sucesso!</p>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 border border-red-100">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">Erro ao salvar. Tente novamente.</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden p-6 space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <FileText className="w-6 h-6 text-slate-400" />
          <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">
            Textos das Páginas
          </h2>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Envios e Entregas</label>
            <p className="text-xs text-slate-500 mb-2">Texto exibido na página /envios</p>
            <textarea
              rows={6}
              value={legalData.envios || ''}
              onChange={(e) => handleChange('envios', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-y"
              placeholder="Digite a política de envios..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Trocas e Devoluções</label>
            <p className="text-xs text-slate-500 mb-2">Texto exibido na página /trocas</p>
            <textarea
              rows={6}
              value={legalData.trocas || ''}
              onChange={(e) => handleChange('trocas', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-y"
              placeholder="Digite a política de trocas..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Página de Contato</label>
            <p className="text-xs text-slate-500 mb-2">Texto exibido na página /contato</p>
            <textarea
              rows={6}
              value={legalData.contato || ''}
              onChange={(e) => handleChange('contato', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-y"
              placeholder="Digite as informações de contato..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
