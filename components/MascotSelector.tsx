'use client';

import { useState, useEffect } from 'react';
import { loadData } from '@/lib/data-client';
import { Personagem } from '@/app/admin/personagens/page';

type MascotSelectorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function MascotSelector({ label, value, onChange }: MascotSelectorProps) {
  const [personagens, setPersonagens] = useState<Personagem[]>([]);

  useEffect(() => {
    loadData('buna_personagens', null).then(data => {
      if (data && data.personagens) {
        setPersonagens(data.personagens);
      }
    });
  }, []);

  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-1">{label}</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
      >
        <option value="">Nenhum personagem</option>
        {personagens.map(p => (
          <option key={p.id} value={p.id}>
            {p.name || 'Personagem sem nome'}
          </option>
        ))}
      </select>
    </div>
  );
}
