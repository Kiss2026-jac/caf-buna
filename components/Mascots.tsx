'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { loadData } from '@/lib/data-client';

type Personagem = {
  id: string;
  imageUrl: string;
  altText: string;
  active: boolean;
  position: 'left' | 'right';
};

export default function Mascots() {
  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    loadData('buna_personagens', null).then(data => {
      if (data && data.personagens) {
        setPersonagens(data.personagens);
      }
    });
  }, []);

  if (!isMounted || personagens.length === 0) return null;

  const leftMascot = personagens.find(p => p.id === 'personagem1' && p.active);
  const rightMascot = personagens.find(p => p.id === 'personagem2' && p.active);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {leftMascot && leftMascot.imageUrl && (
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 pointer-events-auto transition-transform hover:scale-105">
          <Image
            src={leftMascot.imageUrl}
            alt={leftMascot.altText || "Mascote Esquerda"}
            fill
            className="object-contain object-left-bottom"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
      
      {rightMascot && rightMascot.imageUrl && (
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 pointer-events-auto transition-transform hover:scale-105">
          <Image
            src={rightMascot.imageUrl}
            alt={rightMascot.altText || "Mascote Direita"}
            fill
            className="object-contain object-right-bottom"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
}
