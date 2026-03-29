'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { loadData, saveData } from '@/lib/data-client';

const DEFAULT_PAGES = {
  home: {
    title: 'Do Grão à Xícara',
    subtitle: 'Uma jornada de cuidado e excelência em cada etapa do processo.',
    imageUrl: '',
    items: [
      { title: '1. Curadoria', description: 'Selecionamos apenas grãos de fazendas sustentáveis com pontuação acima de 80 SCAA.' },
      { title: '2. Torra Artesanal', description: 'Torramos em pequenos lotes para garantir o frescor e realçar as notas sensoriais únicas.' },
      { title: '3. Entrega Expressa', description: 'Seu café chega em sua casa poucos dias após a torra para o máximo de sabor.' }
    ]
  },
  curadoria: {
    title: 'Curadoria de Excelência',
    subtitle: 'Selecionamos apenas grãos de fazendas sustentáveis com pontuação acima de 80 SCAA. Conheça nosso rigoroso processo de escolha.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHSxLuV1nexcsYLWANrqleH1N6gJwPY41y8_JosXs_GBWAE9K0aO_17GpDUiPUXRDujE3GQZigaxIn3uFNm-IF5FlZdoO_yhUT15HH0xVMjI3dUQOT2BqZYY7O7b3yV8oPjTEykdq0zd1llIwQ5KPq34i2RaCktxtUYoyeqmlYz2ryl5QjeMmFZhN8PfbDfXdCsHaB5QJT5DfUrxYYrH-7eohnLVry9vhE3XIVuQTNLLkUN1Aji5GcVNH_CiYVXRiVM89yFq8ZZKTd',
    items: [
      { title: 'Pontuação SCAA 80+', description: 'Garantimos que todos os nossos cafés sejam classificados como especiais pela Specialty Coffee Association.' },
      { title: 'Sustentabilidade', description: 'Trabalhamos apenas com produtores que respeitam o meio ambiente e as leis trabalhistas.' },
      { title: 'Rastreabilidade', description: 'Você sabe exatamente de onde vem o seu café, quem o produziu e em qual altitude.' }
    ]
  },
  torra: {
    title: 'Torra Artesanal',
    subtitle: 'Torramos em pequenos lotes para garantir o frescor e realçar as notas sensoriais únicas de cada grão.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAju4AZoVZL-K93F2RVnv99R9RgwjOjDV34y90kVL3EVPWpfwls5NPYoENntDnn-JxLvFC9S0j4nwrt5HJKYV28jEvw29Jmg40Bkw4yL9GdL1k4KS2FuZQGzi2VX4G72LyqXIvRlDzdWx36juk1hBQ4lnnx662cXps23wi_mXGq2a5eavaBbnhULrLhKpJok82vLmiKsl77D_S7E_WqdnUZWYwvosAECNPYtdPXInbqGW6etmwUWl7MZr5U2UyEsAobbkpj0W7wnvpQ',
    items: [
      { title: 'Pequenos Lotes (Micro-roasting)', description: 'Torrar em pequenas quantidades nos permite ter controle total sobre a curva de temperatura, extraindo o melhor de cada grão.' },
      { title: 'Perfis Customizados', description: 'Cada variedade de café exige um perfil de torra específico para destacar sua doçura, acidez e corpo.' },
      { title: 'Frescor Garantido', description: 'Nossos cafés não ficam meses na prateleira. Torramos sob demanda para que chegue até você no pico do sabor.' }
    ]
  },
  entrega: {
    title: 'Entrega Expressa',
    subtitle: 'Seu café chega em sua casa poucos dias após a torra para o máximo de sabor e aroma.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBYhH38osCOSmrn_L6akKPfrF1ytxRltx-nFuW22vBuQ23IMYszxp3-e6PqQjA4236q5Ygh6rJT6rict_Gw4C2eYuQ1uRsZ3LdToLYF6mCJng7RYz81V1CmjUp5WS4jrJD1646dyke0nhlubVfCt7OeAkIHlP8FNdepUjhMIJhMxeJBl3-Bio8IxMzu7x3sSSw-k3J0Aa4suLijiMLsSp7wU9wkhXGSbN-Tt5UdmS9vYfJjLhQythis7sWC-b5gJQ7ZL2RQ8y1NGsa',
    items: [
      { title: 'Embalagem com Válvula', description: 'Utilizamos embalagens especiais com válvula desgaseificadora, que permite a saída do CO2 sem deixar o oxigênio entrar, preservando o café.' },
      { title: 'Envio Rápido', description: 'Despachamos seu pedido em até 24 horas úteis após a confirmação. Trabalhamos com as melhores transportadoras para garantir agilidade.' },
      { title: 'Rastreamento em Tempo Real', description: 'Acompanhe cada passo do seu pedido, desde a saída da nossa torrefação até a chegada na sua porta.' }
    ]
  }
};

export default function AdminPaginas() {
  const [pages, setPages] = useState<any>(DEFAULT_PAGES);
  const [activeTab, setActiveTab] = useState<'home' | 'curadoria' | 'torra' | 'entrega'>('home');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_pages_content', DEFAULT_PAGES).then(data => {
      setPages(data);
    });
  }, []);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await saveData('buna_pages_content', pages);
      setTimeout(() => {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 500);
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const handleChange = (field: string, value: string) => {
    setPages((prev: any) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value
      }
    }));
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    setPages((prev: any) => {
      const newItems = [...prev[activeTab].items];
      newItems[index] = { ...newItems[index], [field]: value };
      return {
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          items: newItems
        }
      };
    });
  };

  const activePage = pages[activeTab];

  if (!isMounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Páginas Institucionais</h1>
          <p className="text-slate-500 text-sm">Gerencie o conteúdo das páginas de Curadoria, Torra e Entrega.</p>
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

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'home' ? 'bg-slate-50 text-primary border-b-2 border-primary' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Home (Do Grão à Xícara)
          </button>
          <button
            onClick={() => setActiveTab('curadoria')}
            className={`flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'curadoria' ? 'bg-slate-50 text-primary border-b-2 border-primary' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Curadoria
          </button>
          <button
            onClick={() => setActiveTab('torra')}
            className={`flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'torra' ? 'bg-slate-50 text-primary border-b-2 border-primary' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Torra Artesanal
          </button>
          <button
            onClick={() => setActiveTab('entrega')}
            className={`flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'entrega' ? 'bg-slate-50 text-primary border-b-2 border-primary' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Entrega Expressa
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Título da Página</label>
              <input
                type="text"
                value={activePage.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            {activeTab !== 'home' && (
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">URL da Imagem</label>
                <input
                  type="text"
                  value={activePage.imageUrl}
                  onChange={(e) => handleChange('imageUrl', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            )}
            <div className={`space-y-2 ${activeTab === 'home' ? 'md:col-span-1' : 'md:col-span-2'}`}>
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Subtítulo / Descrição</label>
              <textarea
                value={activePage.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Tópicos (Lista)</h3>
            
            {activePage.items.map((item: any, index: number) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Título do Tópico {index + 1}</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Descrição do Tópico {index + 1}</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
