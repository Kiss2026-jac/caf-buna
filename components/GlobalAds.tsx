'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { loadData } from '@/lib/data-client';

const DEFAULT_ADS = [
  {
    id: 'default-ad-1',
    title: 'Frete Grátis',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxuXbUGe0cigxJrsnrw3nGBHezJc9XUOKC6BQOfNfatqPAfrIIMNdTtzy45dCOPhE-upZu6J4ye08Vo-IhY1z1njc09v_EbbqW7yh1lUCnUHqsbc3Tt0iz9llhoh8egZolkhSm8ZlN8QsII1v7RzmwpyN_VoJWTTiyajLhqFj13dym-il-zKhFnDyRuX89KG6iVs-LK_2iho9oGkhIZs8I1BwKhZ9pjHU2zria-8lux05-R40fAcFY82cshnGrxGYpPc8YzRM79dQj',
    linkUrl: '/shop',
    isActive: true,
  }
];

export default function GlobalAds() {
  const pathname = usePathname();
  const [ads, setAds] = useState<any[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_ads', { ads: DEFAULT_ADS }).then(data => {
      const loadedAds = data?.ads || DEFAULT_ADS;
      if (loadedAds && loadedAds.length > 0) {
        setAds(loadedAds.filter((ad: any) => ad.isActive));
      } else {
        setAds(DEFAULT_ADS);
      }
    });
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 6000); // Rotate every 6 seconds
      return () => clearInterval(interval);
    }
  }, [ads.length]);

  // Don't render on admin pages or if not mounted or if no ads
  if (!isMounted || pathname?.startsWith('/admin') || ads.length === 0) {
    return null;
  }

  const activeAd = ads[currentAdIndex];

  return (
    <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <a 
        href={activeAd.linkUrl || '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block relative h-32 md:h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group w-full max-w-4xl mx-auto"
      >
        <Image
          src={activeAd.imageUrl}
          alt={activeAd.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded text-slate-500 uppercase tracking-wider">
          Publicidade
        </div>
      </a>
    </section>
  );
}
