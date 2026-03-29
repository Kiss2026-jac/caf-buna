'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { loadData, saveData } from '@/lib/data-client';
import MascotSelector from '@/components/MascotSelector';

const DEFAULT_GUIA = {
  title: 'Guia de Preparo',
  subtitle: 'Extraia o máximo de sabor do seu café especial com nossas dicas para os métodos mais populares.',
  leftMascotId: '',
  rightMascotId: '',
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

export default function AdminGuia() {
  const [guia, setGuia] = useState<any>(DEFAULT_GUIA);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadData('buna_guia_content', DEFAULT_GUIA).then(data => {
      setGuia(data);
    });
  }, []);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await saveData('buna_guia_content', guia);
      setTimeout(() => {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 500);
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const handleChange = (field: string, value: string) => {
    setGuia((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMethodChange = (index: number, field: string, value: string) => {
    setGuia((prev: any) => {
      const newMethods = [...prev.methods];
      newMethods[index] = { ...newMethods[index], [field]: value };
      return {
        ...prev,
        methods: newMethods
      };
    });
  };

  const addMethod = () => {
    setGuia((prev: any) => ({
      ...prev,
      methods: [
        ...prev.methods,
        {
          title: 'Novo Método',
          description: '',
          proporcao: '',
          moagem: '',
          agua: '',
          preparo: ''
        }
      ]
    }));
  };

  const removeMethod = (index: number) => {
    setGuia((prev: any) => {
      const newMethods = [...prev.methods];
      newMethods.splice(index, 1);
      return {
        ...prev,
        methods: newMethods
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Guia de Preparo</h1>
          <p className="text-slate-500 text-sm">Gerencie o conteúdo da página do Guia de Preparo.</p>
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
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Título da Página</label>
            <input
              type="text"
              value={guia.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Subtítulo / Descrição</label>
            <textarea
              value={guia.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6 mt-2">
            <MascotSelector
              label="Personagem Esquerda"
              value={guia.leftMascotId || ''}
              onChange={(val) => handleChange('leftMascotId', val)}
            />
            <MascotSelector
              label="Personagem Direita"
              value={guia.rightMascotId || ''}
              onChange={(val) => handleChange('rightMascotId', val)}
            />
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Métodos de Preparo</h3>
            <button
              onClick={addMethod}
              className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar Método
            </button>
          </div>
          
          {guia.methods.map((method: any, index: number) => (
            <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-100 space-y-4 relative">
              <button
                onClick={() => removeMethod(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                title="Remover Método"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="space-y-2 pr-8">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Nome do Método</label>
                <input
                  type="text"
                  value={method.title}
                  onChange={(e) => handleMethodChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Descrição Curta</label>
                <textarea
                  value={method.description}
                  onChange={(e) => handleMethodChange(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Proporção</label>
                  <input
                    type="text"
                    value={method.proporcao}
                    onChange={(e) => handleMethodChange(index, 'proporcao', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Moagem</label>
                  <input
                    type="text"
                    value={method.moagem}
                    onChange={(e) => handleMethodChange(index, 'moagem', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Água / Tempo</label>
                  <input
                    type="text"
                    value={method.agua}
                    onChange={(e) => handleMethodChange(index, 'agua', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Preparo (Passo a Passo)</label>
                  <textarea
                    value={method.preparo}
                    onChange={(e) => handleMethodChange(index, 'preparo', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
