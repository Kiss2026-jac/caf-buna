'use client';

import { useState, useEffect } from 'react';
import { Save, Youtube, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { loadData, saveData } from '@/lib/data-client';
import MascotSelector from '@/components/MascotSelector';

type HistorySection = {
  id?: string;
  title: string;
  content: string;
  youtubeUrl: string;
  imageUrl?: string;
  leftMascotId?: string;
  rightMascotId?: string;
};

type HistoryData = {
  nossaHistoria: HistorySection;
  historiaCafe: HistorySection;
  customHistories: HistorySection[];
};

const DEFAULT_HISTORY = {
  nossaHistoria: {
    title: 'Nossa História',
    content: 'A BunaShop nasceu da paixão por cafés especiais e do desejo de conectar pequenos produtores a amantes de café em todo o Brasil. Nossa jornada começou em 2020, quando decidimos transformar nosso hobby em um negócio com propósito.',
    youtubeUrl: '',
    imageUrl: '',
  },
  historiaCafe: {
    title: 'A História do Café',
    content: 'A lenda conta que o café foi descoberto na Etiópia por um pastor de cabras chamado Kaldi. Ele notou que suas cabras ficavam cheias de energia após comerem os frutos vermelhos de um certo arbusto.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: '',
  },
  customHistories: [],
};

export default function AdminHistoria() {
  const [historyData, setHistoryData] = useState<HistoryData>(DEFAULT_HISTORY);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadData('buna_history', DEFAULT_HISTORY).then(parsed => {
      const data = parsed || {};
      setHistoryData({
        nossaHistoria: { ...DEFAULT_HISTORY.nossaHistoria, ...(data.nossaHistoria || {}) },
        historiaCafe: { ...DEFAULT_HISTORY.historiaCafe, ...(data.historiaCafe || {}) },
        customHistories: data.customHistories || [],
      });
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveData('buna_history', historyData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: 'nossaHistoria' | 'historiaCafe' | number) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 30 * 1024 * 1024) {
        alert('A imagem é muito grande. Por favor, escolha uma imagem com menos de 30MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxWidth = 1200; // Padrão 4:3 para histórias
          const maxHeight = 900;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const base64 = canvas.toDataURL('image/jpeg', 0.8);
          
          if (section === 'nossaHistoria' || section === 'historiaCafe') {
            setHistoryData((prev) => ({
              ...prev,
              [section]: { ...prev[section], imageUrl: base64 }
            }));
          } else {
            setHistoryData((prev) => {
              const newCustom = [...(prev.customHistories || [])];
              newCustom[section] = { ...newCustom[section], imageUrl: base64 };
              return { ...prev, customHistories: newCustom };
            });
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const addCustomHistory = () => {
    setHistoryData({
      ...historyData,
      customHistories: [
        ...(historyData.customHistories || []),
        {
          id: Date.now().toString(),
          title: 'Nova História',
          content: '',
          youtubeUrl: '',
          imageUrl: '',
        }
      ]
    });
  };

  const removeCustomHistory = (index: number) => {
    if (confirm('Tem certeza que deseja excluir esta história?')) {
      const newCustom = [...(historyData.customHistories || [])];
      newCustom.splice(index, 1);
      setHistoryData({ ...historyData, customHistories: newCustom });
    }
  };

  const updateCustomHistory = (index: number, field: keyof HistorySection, value: string) => {
    const newCustom = [...(historyData.customHistories || [])];
    newCustom[index] = { ...newCustom[index], [field]: value };
    setHistoryData({ ...historyData, customHistories: newCustom });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">História & Vídeos</h1>
        <p className="text-slate-500 mt-2">Edite os textos e adicione links do YouTube para as páginas de história.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Nossa História */}
        <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-6 border-b border-slate-100 pb-4">
            Página: Nossa História
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Título Principal</label>
              <input
                type="text"
                value={historyData.nossaHistoria.title || ''}
                onChange={e => setHistoryData({...historyData, nossaHistoria: {...historyData.nossaHistoria, title: e.target.value}})}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Texto da História</label>
              <textarea
                rows={5}
                value={historyData.nossaHistoria.content || ''}
                onChange={e => setHistoryData({...historyData, nossaHistoria: {...historyData.nossaHistoria, content: e.target.value}})}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" /> Link do Vídeo no YouTube (Opcional)
              </label>
              <input
                type="url"
                value={historyData.nossaHistoria.youtubeUrl || ''}
                onChange={e => setHistoryData({...historyData, nossaHistoria: {...historyData.nossaHistoria, youtubeUrl: e.target.value}})}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-slate-500 mt-1">Cole o link completo do vídeo. Ele será incorporado automaticamente na página.</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" /> Imagem (Aparece se não houver vídeo)
              </label>
              <div className="flex items-center gap-4">
                {historyData.nossaHistoria.imageUrl && (
                  <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={historyData.nossaHistoria.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'nossaHistoria')}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  <p className="text-xs text-slate-500 mt-1">Ou cole a URL da imagem abaixo:</p>
                  <input
                    type="url"
                    value={historyData.nossaHistoria.imageUrl || ''}
                    onChange={e => setHistoryData({...historyData, nossaHistoria: {...historyData.nossaHistoria, imageUrl: e.target.value}})}
                    className="w-full px-4 py-3 mt-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6 mt-6">
              <MascotSelector
                label="Personagem Esquerda"
                value={historyData.nossaHistoria.leftMascotId || ''}
                onChange={(val) => setHistoryData({...historyData, nossaHistoria: {...historyData.nossaHistoria, leftMascotId: val}})}
              />
              <MascotSelector
                label="Personagem Direita"
                value={historyData.nossaHistoria.rightMascotId || ''}
                onChange={(val) => setHistoryData({...historyData, nossaHistoria: {...historyData.nossaHistoria, rightMascotId: val}})}
              />
            </div>
          </div>
        </div>

        {/* História do Café */}
        <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-6 border-b border-slate-100 pb-4">
            Página: História do Café
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Título Principal</label>
              <input
                type="text"
                value={historyData.historiaCafe.title || ''}
                onChange={e => setHistoryData({...historyData, historiaCafe: {...historyData.historiaCafe, title: e.target.value}})}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Texto da História</label>
              <textarea
                rows={5}
                value={historyData.historiaCafe.content || ''}
                onChange={e => setHistoryData({...historyData, historiaCafe: {...historyData.historiaCafe, content: e.target.value}})}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" /> Link do Vídeo no YouTube (Opcional)
              </label>
              <input
                type="url"
                value={historyData.historiaCafe.youtubeUrl || ''}
                onChange={e => setHistoryData({...historyData, historiaCafe: {...historyData.historiaCafe, youtubeUrl: e.target.value}})}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" /> Imagem (Aparece se não houver vídeo)
              </label>
              <div className="flex items-center gap-4">
                {historyData.historiaCafe.imageUrl && (
                  <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={historyData.historiaCafe.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'historiaCafe')}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  <p className="text-xs text-slate-500 mt-1">Ou cole a URL da imagem abaixo:</p>
                  <input
                    type="url"
                    value={historyData.historiaCafe.imageUrl || ''}
                    onChange={e => setHistoryData({...historyData, historiaCafe: {...historyData.historiaCafe, imageUrl: e.target.value}})}
                    className="w-full px-4 py-3 mt-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6 mt-6">
              <MascotSelector
                label="Personagem Esquerda"
                value={historyData.historiaCafe.leftMascotId || ''}
                onChange={(val) => setHistoryData({...historyData, historiaCafe: {...historyData.historiaCafe, leftMascotId: val}})}
              />
              <MascotSelector
                label="Personagem Direita"
                value={historyData.historiaCafe.rightMascotId || ''}
                onChange={(val) => setHistoryData({...historyData, historiaCafe: {...historyData.historiaCafe, rightMascotId: val}})}
              />
            </div>
          </div>
        </div>

        {/* Novas Histórias */}
        <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">
              Novas Histórias
            </h2>
            <button
              type="button"
              onClick={addCustomHistory}
              className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold hover:bg-primary/20 transition-colors flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Adicionar História
            </button>
          </div>

          <div className="space-y-8">
            {(historyData.customHistories || []).map((history, index) => (
              <div key={history.id || index} className="p-6 border border-slate-200 rounded-xl bg-slate-50 relative">
                <button
                  type="button"
                  onClick={() => removeCustomHistory(index)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                  title="Remover História"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <h3 className="font-bold text-slate-900 mb-4">História #{index + 1}</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Título Principal</label>
                    <input
                      type="text"
                      value={history.title || ''}
                      onChange={e => updateCustomHistory(index, 'title', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Texto da História</label>
                    <textarea
                      rows={5}
                      value={history.content || ''}
                      onChange={e => updateCustomHistory(index, 'content', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-500" /> Link do Vídeo no YouTube (Opcional)
                    </label>
                    <input
                      type="url"
                      value={history.youtubeUrl || ''}
                      onChange={e => updateCustomHistory(index, 'youtubeUrl', e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-slate-400" /> Imagem (Aparece se não houver vídeo)
                    </label>
                    <div className="flex items-center gap-4">
                      {history.imageUrl && (
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 relative border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={history.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 bg-white"
                        />
                        <p className="text-xs text-slate-500 mt-1">Ou cole a URL da imagem abaixo:</p>
                        <input
                          type="url"
                          value={history.imageUrl || ''}
                          onChange={e => updateCustomHistory(index, 'imageUrl', e.target.value)}
                          className="w-full px-4 py-3 mt-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {(!historyData.customHistories || historyData.customHistories.length === 0) && (
              <p className="text-slate-500 text-center py-8">Nenhuma história adicional cadastrada. Clique em &quot;Adicionar História&quot; para criar uma nova.</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 sticky bottom-4 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-lg">
          {isSaved && <span className="text-emerald-600 font-bold text-sm">Alterações salvas com sucesso!</span>}
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
