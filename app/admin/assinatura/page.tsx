'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { loadData, saveData } from '@/lib/data-client';

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

export default function AdminAssinatura() {
  const [assinatura, setAssinatura] = useState<any>(DEFAULT_ASSINATURA);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadData('buna_assinatura_content', DEFAULT_ASSINATURA).then(data => {
      setAssinatura(data);
    });
  }, []);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await saveData('buna_assinatura_content', assinatura);
      setTimeout(() => {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 500);
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const handleChange = (field: string, value: string) => {
    setAssinatura((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlanChange = (index: number, field: string, value: any) => {
    setAssinatura((prev: any) => {
      const newPlans = [...prev.plans];
      newPlans[index] = { ...newPlans[index], [field]: value };
      return {
        ...prev,
        plans: newPlans
      };
    });
  };

  const handleFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    setAssinatura((prev: any) => {
      const newPlans = [...prev.plans];
      const newFeatures = [...newPlans[planIndex].features];
      newFeatures[featureIndex] = value;
      newPlans[planIndex] = { ...newPlans[planIndex], features: newFeatures };
      return {
        ...prev,
        plans: newPlans
      };
    });
  };

  const addFeature = (planIndex: number) => {
    setAssinatura((prev: any) => {
      const newPlans = [...prev.plans];
      newPlans[planIndex].features.push('Nova característica');
      return {
        ...prev,
        plans: newPlans
      };
    });
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    setAssinatura((prev: any) => {
      const newPlans = [...prev.plans];
      newPlans[planIndex].features.splice(featureIndex, 1);
      return {
        ...prev,
        plans: newPlans
      };
    });
  };

  const addPlan = () => {
    setAssinatura((prev: any) => ({
      ...prev,
      plans: [
        ...prev.plans,
        {
          name: 'Novo Plano',
          price: '0',
          description: '',
          features: ['Nova característica'],
          isPopular: false
        }
      ]
    }));
  };

  const removePlan = (index: number) => {
    setAssinatura((prev: any) => {
      const newPlans = [...prev.plans];
      newPlans.splice(index, 1);
      return {
        ...prev,
        plans: newPlans
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Assinatura</h1>
          <p className="text-slate-500 text-sm">Gerencie o conteúdo e os planos do Clube de Assinatura.</p>
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
              value={assinatura.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Subtítulo / Descrição</label>
            <textarea
              value={assinatura.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Planos de Assinatura</h3>
            <button
              onClick={addPlan}
              className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar Plano
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {assinatura.plans.map((plan: any, planIndex: number) => (
              <div key={planIndex} className={`bg-slate-50 p-6 rounded-lg border ${plan.isPopular ? 'border-primary' : 'border-slate-100'} space-y-4 relative`}>
                <button
                  onClick={() => removePlan(planIndex)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                  title="Remover Plano"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <div className="space-y-2 pr-8">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Nome do Plano</label>
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => handlePlanChange(planIndex, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Preço (R$)</label>
                  <input
                    type="text"
                    value={plan.price}
                    onChange={(e) => handlePlanChange(planIndex, 'price', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Descrição Curta</label>
                  <textarea
                    value={plan.description}
                    onChange={(e) => handlePlanChange(planIndex, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id={`popular-${planIndex}`}
                    checked={plan.isPopular}
                    onChange={(e) => handlePlanChange(planIndex, 'isPopular', e.target.checked)}
                    className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                  />
                  <label htmlFor={`popular-${planIndex}`} className="text-sm font-bold text-slate-700">
                    Destacar como &quot;Mais Popular&quot;
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Benefícios</label>
                    <button
                      onClick={() => addFeature(planIndex)}
                      className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Adicionar
                    </button>
                  </div>
                  
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <div key={featureIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(planIndex, featureIndex, e.target.value)}
                        className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                      <button
                        onClick={() => removeFeature(planIndex, featureIndex)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
