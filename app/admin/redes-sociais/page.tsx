'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { loadData, saveData } from '@/lib/data-client';

const DEFAULT_SOCIAL = {
  instagram: '',
  facebook: '',
  whatsapp: '',
  youtube: '',
  tiktok: ''
};

export default function AdminRedesSociais() {
  const [social, setSocial] = useState<any>(DEFAULT_SOCIAL);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadData('buna_social_media', DEFAULT_SOCIAL).then(data => {
      setSocial(data);
    });
  }, []);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await saveData('buna_social_media', social);
      setTimeout(() => {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 500);
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const handleChange = (field: string, value: string) => {
    setSocial((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Redes Sociais</h1>
          <p className="text-slate-500 text-sm">Gerencie os links das suas redes sociais que aparecem no rodapé do site.</p>
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
          <p className="font-medium">Links salvos com sucesso!</p>
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
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <Instagram className="w-4 h-4 text-pink-600" /> Instagram
            </label>
            <input
              type="text"
              value={social.instagram || ''}
              onChange={(e) => handleChange('instagram', e.target.value)}
              placeholder="Ex: https://instagram.com/bunashop"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <Facebook className="w-4 h-4 text-blue-600" /> Facebook
            </label>
            <input
              type="text"
              value={social.facebook || ''}
              onChange={(e) => handleChange('facebook', e.target.value)}
              placeholder="Ex: https://facebook.com/bunashop"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp (Link)
            </label>
            <input
              type="text"
              value={social.whatsapp || ''}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="Ex: https://wa.me/5511999999999"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <Youtube className="w-4 h-4 text-red-600" /> YouTube
            </label>
            <input
              type="text"
              value={social.youtube || ''}
              onChange={(e) => handleChange('youtube', e.target.value)}
              placeholder="Ex: https://youtube.com/@bunashop"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg> TikTok
            </label>
            <input
              type="text"
              value={social.tiktok || ''}
              onChange={(e) => handleChange('tiktok', e.target.value)}
              placeholder="Ex: https://tiktok.com/@bunashop"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
