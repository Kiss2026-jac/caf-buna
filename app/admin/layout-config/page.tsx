'use client';

import { useState, useEffect } from 'react';
import { Save, Palette, Type, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { loadData, saveData } from '@/lib/data-client';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const DEFAULT_DATA = {
  heroTitle: 'A ARTE DA TORRA PERFEITA',
  heroSubtitle: 'Descubra a curadoria exclusiva de cafés torrados artesanalmente para uma experiência sensorial única e inesquecível.',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxuXbUGe0cigxJrsnrw3nGBHezJc9XUOKC6BQOfNfatqPAfrIIMNdTtzy45dCOPhE-upZu6J4ye08Vo-IhY1z1njc09v_EbbqW7yh1lUCnUHqsbc3Tt0iz9llhoh8egZolkhSm8ZlN8QsII1v7RzmwpyN_VoJWTTiyajLhqFj13dym-il-zKhFnDyRuX89KG6iVs-LK_2iho9oGkhIZs8I1BwKhZ9pjHU2zria-8lux05-R40fAcFY82cshnGrxGYpPc8YzRM79dQj',
  primaryColor: '#8B4513',
  whatsappNumber: '5511999999999',
  banners: [] as Banner[],
};

export default function AdminLayoutConfig() {
  const [layoutData, setLayoutData] = useState(() => ({
    ...DEFAULT_DATA,
    banners: [{
      id: 'default-1',
      title: DEFAULT_DATA.heroTitle,
      subtitle: DEFAULT_DATA.heroSubtitle,
      image: DEFAULT_DATA.heroImage
    }]
  }));
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_layout', {
      ...DEFAULT_DATA,
      banners: [{
        id: 'default-1',
        title: DEFAULT_DATA.heroTitle,
        subtitle: DEFAULT_DATA.heroSubtitle,
        image: DEFAULT_DATA.heroImage
      }]
    }).then(parsed => {
      if (!parsed.banners || parsed.banners.length === 0) {
        parsed.banners = [{
          id: 'default-1',
          title: parsed.heroTitle || DEFAULT_DATA.heroTitle,
          subtitle: parsed.heroSubtitle || DEFAULT_DATA.heroSubtitle,
          image: parsed.heroImage || DEFAULT_DATA.heroImage
        }];
      }
      setLayoutData(parsed);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveData('buna_layout', layoutData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, bannerId: string) => {
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
          const maxWidth = 1920; // Padrão 16:9 para Hero
          const maxHeight = 1080;

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
          setLayoutData((prev: any) => {
            const newBanners = prev.banners.map((b: any) => 
              b.id === bannerId ? { ...b, image: base64 } : b
            );
            return { ...prev, banners: newBanners };
          });
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const addBanner = () => {
    setLayoutData((prev: any) => ({
      ...prev,
      banners: [
        ...prev.banners,
        {
          id: Date.now().toString(),
          title: 'Novo Banner',
          subtitle: 'Descrição do novo banner',
          image: ''
        }
      ]
    }));
  };

  const removeBanner = (id: string) => {
    if (layoutData.banners.length <= 1) {
      alert('Você precisa ter pelo menos um banner.');
      return;
    }
    setLayoutData((prev: any) => ({
      ...prev,
      banners: prev.banners.filter((b: any) => b.id !== id)
    }));
  };

  const updateBanner = (id: string, field: keyof Banner, value: string) => {
    setLayoutData((prev: any) => ({
      ...prev,
      banners: prev.banners.map((b: any) => 
        b.id === id ? { ...b, [field]: value } : b
      )
    }));
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Layout & Aparência</h1>
        <p className="text-slate-500 mt-2">Personalize as cores, textos principais e imagens da página inicial.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Hero Section Config */}
        <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <Type className="w-6 h-6 text-slate-400" />
              <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                Banners Principais (Carrossel)
              </h2>
            </div>
            <button
              type="button"
              onClick={addBanner}
              className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold hover:bg-primary/20 transition-colors flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Adicionar Banner
            </button>
          </div>
          
          <div className="space-y-8">
            {layoutData.banners.map((banner: any, index: number) => (
              <div key={banner.id} className="p-6 border border-slate-100 rounded-xl bg-slate-50 relative">
                <div className="absolute top-4 right-4">
                  <button
                    type="button"
                    onClick={() => removeBanner(banner.id)}
                    className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg transition-colors"
                    title="Remover Banner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="font-bold text-slate-700 mb-4 uppercase text-sm tracking-widest">Banner {index + 1}</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Título Principal</label>
                    <input
                      type="text"
                      value={banner.title}
                      onChange={e => updateBanner(banner.id, 'title', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Subtítulo (Descrição)</label>
                    <textarea
                      rows={3}
                      value={banner.subtitle}
                      onChange={e => updateBanner(banner.id, 'subtitle', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-slate-400" /> Imagem de Fundo
                    </label>
                    <p className="text-xs text-slate-500 mb-3">
                      Tamanho recomendado: <strong className="text-slate-700">1920x1080 pixels</strong> (Formato 16:9).<br/>
                      A imagem será redimensionada automaticamente se for maior. Formatos aceitos: JPG, PNG, WebP (Máx. 30MB).
                    </p>
                    <div className="flex items-center gap-4">
                      {banner.image && (
                        <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={banner.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, banner.id)}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        <p className="text-xs text-slate-500 mt-1">Ou cole a URL da imagem abaixo:</p>
                        <input
                          type="url"
                          value={banner.image}
                          onChange={e => updateBanner(banner.id, 'image', e.target.value)}
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
        </div>

        {/* Colors Config */}
        <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <Palette className="w-6 h-6 text-slate-400" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">
              Cores da Marca e Contato
            </h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Cor Principal (Botões e Destaques)</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={layoutData.primaryColor}
                  onChange={e => setLayoutData({...layoutData, primaryColor: e.target.value})}
                  className="w-16 h-16 rounded cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={layoutData.primaryColor}
                  onChange={e => setLayoutData({...layoutData, primaryColor: e.target.value})}
                  className="w-32 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Esta cor será aplicada em botões, links e elementos de destaque.</p>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <label className="block text-sm font-bold text-slate-700 mb-2">Número do WhatsApp (Checkout)</label>
              <input
                type="text"
                value={layoutData.whatsappNumber || ''}
                onChange={e => setLayoutData({...layoutData, whatsappNumber: e.target.value})}
                className="w-full max-w-md px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Ex: 5511999999999"
              />
              <p className="text-xs text-slate-500 mt-2">Apenas números, incluindo código do país (55) e DDD. Ex: 5511988887777</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 sticky bottom-4 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-lg">
          {isSaved && <span className="text-emerald-600 font-bold text-sm">Configurações salvas com sucesso!</span>}
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar Layout
          </button>
        </div>
      </form>
    </div>
  );
}
