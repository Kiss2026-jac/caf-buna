'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Megaphone, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { loadData, saveData } from '@/lib/data-client';

interface Ad {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
}

const DEFAULT_ADS: Ad[] = [
  {
    id: 'default-ad-1',
    title: 'Frete Grátis',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxuXbUGe0cigxJrsnrw3nGBHezJc9XUOKC6BQOfNfatqPAfrIIMNdTtzy45dCOPhE-upZu6J4ye08Vo-IhY1z1njc09v_EbbqW7yh1lUCnUHqsbc3Tt0iz9llhoh8egZolkhSm8ZlN8QsII1v7RzmwpyN_VoJWTTiyajLhqFj13dym-il-zKhFnDyRuX89KG6iVs-LK_2iho9oGkhIZs8I1BwKhZ9pjHU2zria-8lux05-R40fAcFY82cshnGrxGYpPc8YzRM79dQj',
    linkUrl: '/shop',
    isActive: true,
  }
];

export default function AdminPublicidade() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_ads', { ads: DEFAULT_ADS }).then(data => {
      const loadedAds = data?.ads || DEFAULT_ADS;
      setAds(loadedAds.length > 0 ? loadedAds : DEFAULT_ADS);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    try {
      await saveData('buna_ads', { ads });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error: any) {
      console.error('Erro ao salvar publicidade:', error);
      setSaveError('Erro ao salvar. Verifique se as imagens não estão muito grandes.');
    }
  };

  const addAd = () => {
    setAds([
      ...ads,
      {
        id: Date.now().toString(),
        title: 'Nova Publicidade',
        imageUrl: '',
        linkUrl: '',
        isActive: true,
      }
    ]);
  };

  const removeAd = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta publicidade?')) {
      setAds(ads.filter(ad => ad.id !== id));
    }
  };

  const updateAd = (id: string, field: keyof Ad, value: any) => {
    setAds(ads.map(ad => ad.id === id ? { ...ad, [field]: value } : ad));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
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
          const maxWidth = 1200; // Banner horizontal
          const maxHeight = 400;

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
          
          const base64 = canvas.toDataURL('image/webp', 0.7);
          updateAd(id, 'imageUrl', base64);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Publicidade</h1>
          <p className="text-slate-500 mt-2">Gerencie os banners de anúncios e parcerias exibidos na página inicial.</p>
        </div>
        <button
          onClick={addAd}
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar Anúncio
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {ads.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Megaphone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Nenhuma publicidade cadastrada</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Adicione banners de parceiros ou promoções especiais para exibi-los na página inicial da sua loja.
            </p>
            <button
              type="button"
              onClick={addAd}
              className="text-primary font-bold hover:underline"
            >
              Criar meu primeiro anúncio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {ads.map((ad, index) => (
              <div key={ad.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative">
                <div className="absolute top-6 right-6 flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ad.isActive}
                      onChange={(e) => updateAd(ad.id, 'isActive', e.target.checked)}
                      className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                    />
                    <span className="text-sm font-bold text-slate-700">Ativo</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeAd(ad.id)}
                    className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg transition-colors"
                    title="Excluir Anúncio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                  <Megaphone className="w-5 h-5 text-slate-400" />
                  <h2 className="text-lg font-black uppercase tracking-tighter text-slate-900">
                    Anúncio {index + 1}
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Título Interno</label>
                      <input
                        type="text"
                        value={ad.title}
                        onChange={e => updateAd(ad.id, 'title', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Ex: Promoção Dia das Mães"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-slate-400" /> Link de Destino
                      </label>
                      <input
                        type="url"
                        value={ad.linkUrl}
                        onChange={e => updateAd(ad.id, 'linkUrl', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-slate-400" /> Imagem do Banner
                    </label>
                    <p className="text-xs text-slate-500 mb-3">
                      Tamanho recomendado: <strong className="text-slate-700">1200x400 pixels</strong> (Formato 3:1).<br/>
                      A imagem será redimensionada automaticamente se for maior. Formatos aceitos: JPG, PNG, WebP (Máx. 30MB).
                    </p>
                    <div className="space-y-4">
                      {ad.imageUrl ? (
                        <div className="w-full h-32 bg-slate-100 rounded-lg overflow-hidden relative border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={ad.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                          Nenhuma imagem selecionada
                        </div>
                      )}
                      
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, ad.id)}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        <p className="text-xs text-slate-500 mt-1">Ou cole a URL da imagem abaixo:</p>
                        <input
                          type="url"
                          value={ad.imageUrl}
                          onChange={e => updateAd(ad.id, 'imageUrl', e.target.value)}
                          className="w-full px-4 py-3 mt-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {ads.length > 0 && (
          <div className="flex items-center justify-end gap-4 sticky bottom-4 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-lg">
            {saveError && <span className="text-red-600 font-bold text-sm">{saveError}</span>}
            {isSaved && <span className="text-emerald-600 font-bold text-sm">Publicidades salvas com sucesso!</span>}
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Salvar Alterações
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
