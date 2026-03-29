'use client';

import { useState, useEffect, useRef } from 'react';
import { loadData, saveData } from '@/lib/data-client';
import { Upload, Save, Trash2, Image as ImageIcon, Plus } from 'lucide-react';
import Image from 'next/image';

export type Personagem = {
  id: string;
  name: string;
  imageUrl: string;
  altText: string;
};

const DEFAULT_PERSONAGENS: Personagem[] = [
  {
    id: 'personagem1',
    name: 'Mascote Esquerda',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHSxLuV1nexcsYLWANrqleH1N6gJwPY41y8_JosXs_GBWAE9K0aO_17GpDUiPUXRDujE3GQZigaxIn3uFNm-IF5FlZdoO_yhUT15HH0xVMjI3dUQOT2BqZYY7O7b3yV8oPjTEykdq0zd1llIwQ5KPq34i2RaCktxtUYoyeqmlYz2ryl5QjeMmFZhN8PfbDfXdCsHaB5QJT5DfUrxYYrH-7eohnLVry9vhE3XIVuQTNLLkUN1Aji5GcVNH_CiYVXRiVM89yFq8ZZKTd',
    altText: 'Personagem 1',
  },
  {
    id: 'personagem2',
    name: 'Mascote Direita',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBYhH38osCOSmrn_L6akKPfrF1ytxRltx-nFuW22vBuQ23IMYszxp3-e6PqQjA4236q5Ygh6rJT6rict_Gw4C2eYuQ1uRsZ3LdToLYF6mCJng7RYz81V1CmjUp5WS4jrJD1646dyke0nhlubVfCt7OeAkIHlP8FNdepUjhMIJhMxeJBl3-Bio8IxMzu7x3sSSw-k3J0Aa4suLijiMLsSp7wU9wkhXGSbN-Tt5UdmS9vYfJjLhQythis7sWC-b5gJQ7ZL2RQ8y1NGsa',
    altText: 'Personagem 2',
  }
];

export default function AdminPersonagens() {
  const [personagens, setPersonagens] = useState<Personagem[]>(DEFAULT_PERSONAGENS);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    loadData('buna_personagens', null).then(data => {
      if (data && data.personagens) {
        setPersonagens(data.personagens);
      }
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await saveData('buna_personagens', { personagens });
      setMessage({ type: 'success', text: 'Personagens salvos com sucesso!' });
    } catch (error) {
      console.error("Erro ao salvar personagens:", error);
      setMessage({ type: 'error', text: 'Erro ao salvar. Tente novamente.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) { // 1MB limit
      alert('A imagem é muito grande. Por favor, escolha uma imagem com menos de 1MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPersonagens(prev => prev.map(p => p.id === id ? { ...p, imageUrl: base64String } : p));
    };
    reader.readAsDataURL(file);
  };

  const updatePersonagem = (id: string, field: keyof Personagem, value: any) => {
    setPersonagens(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addPersonagem = () => {
    const newId = `personagem_${Date.now()}`;
    setPersonagens(prev => [
      ...prev,
      { id: newId, name: 'Novo Personagem', imageUrl: '', altText: '' }
    ]);
  };

  const removePersonagem = (id: string) => {
    if (confirm('Tem certeza que deseja remover este personagem?')) {
      setPersonagens(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Biblioteca de Personagens</h1>
          <p className="text-slate-500 mt-1">Crie e gerencie os personagens que poderão ser usados nas páginas.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          <Save className="w-5 h-5" />
          {isSaving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={addPersonagem}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar Personagem
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {personagens.map((personagem) => (
          <div key={personagem.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6 relative">
            <button
              onClick={() => removePersonagem(personagem.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
              title="Remover Personagem"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="space-y-4 pr-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Personagem (Interno)</label>
                <input
                  type="text"
                  value={personagem.name || ''}
                  onChange={(e) => updatePersonagem(personagem.id, 'name', e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Ex: Mascote Buna Sorrindo"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Imagem do Personagem</label>
                <div className="flex items-start gap-6">
                  <div className="relative w-32 h-32 bg-slate-100 rounded-lg overflow-hidden border-2 border-dashed border-slate-300 flex-shrink-0">
                    {personagem.imageUrl ? (
                      <Image src={personagem.imageUrl} alt={personagem.altText} fill className="object-contain p-2" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={el => { fileInputRefs.current[personagem.id] = el; }}
                      onChange={(e) => handleImageUpload(e, personagem.id)}
                    />
                    <button
                      onClick={() => fileInputRefs.current[personagem.id]?.click()}
                      className="w-full bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Escolher Imagem
                    </button>
                    <p className="text-xs text-slate-500">Recomendado: Imagem PNG com fundo transparente.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Texto Alternativo (Acessibilidade)</label>
                <input
                  type="text"
                  value={personagem.altText || ''}
                  onChange={(e) => updatePersonagem(personagem.id, 'altText', e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="Ex: Mascote Buna sorrindo"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
