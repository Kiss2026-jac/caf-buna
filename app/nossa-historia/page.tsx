'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalAds from '@/components/GlobalAds';
import PageMascots from '@/components/PageMascots';
import { loadData } from '@/lib/data-client';

type HistorySection = {
  id?: string;
  title: string;
  content: string;
  youtubeUrl: string;
  imageUrl?: string;
  leftMascotId?: string;
  rightMascotId?: string;
};

const DEFAULT_HISTORY = {
  title: 'Nossa História',
  content: 'A BunaShop nasceu da paixão por descobrir os sabores ocultos nos grãos de café brasileiros. Viajamos pelas principais regiões produtoras do país em busca de pequenos produtores que tratam o café como uma verdadeira arte.\n\nAcreditamos que um bom café tem o poder de transformar o dia de alguém. Por isso, nossa missão é conectar pessoas através de experiências sensoriais únicas, valorizando toda a cadeia produtiva, do grão à xícara.\n\nTorramos nossos cafés artesanalmente, em pequenos lotes, para garantir que cada pacote entregue o máximo de frescor e sabor.',
  youtubeUrl: '',
  imageUrl: '',
  leftMascotId: '',
  rightMascotId: '',
};

export default function NossaHistoria() {
  const [historyData, setHistoryData] = useState<HistorySection>(DEFAULT_HISTORY);
  const [customHistories, setCustomHistories] = useState<HistorySection[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_history', null).then(data => {
      if (data) {
        if (data.nossaHistoria) {
          setHistoryData(data.nossaHistoria);
        }
        if (data.customHistories) {
          setCustomHistories(data.customHistories);
        }
      }
    });
  }, []);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(historyData.youtubeUrl);

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Main History Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">{historyData.title}</h2>
            {historyData.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="text-lg text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              )
            ))}
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            ) : (
              <Image
                src={historyData.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBHSxLuV1nexcsYLWANrqleH1N6gJwPY41y8_JosXs_GBWAE9K0aO_17GpDUiPUXRDujE3GQZigaxIn3uFNm-IF5FlZdoO_yhUT15HH0xVMjI3dUQOT2BqZYY7O7b3yV8oPjTEykdq0zd1llIwQ5KPq34i2RaCktxtUYoyeqmlYz2ryl5QjeMmFZhN8PfbDfXdCsHaB5QJT5DfUrxYYrH-7eohnLVry9vhE3XIVuQTNLLkUN1Aji5GcVNH_CiYVXRiVM89yFq8ZZKTd"}
                alt={historyData.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>

        {/* Custom History Sections */}
        {customHistories.map((history, index) => {
          const customVideoId = getYoutubeId(history.youtubeUrl);
          const isEven = index % 2 === 0;

          return (
            <div key={history.id || index} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
              <div className={`space-y-6 ${isEven ? 'md:order-2' : ''}`}>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900">{history.title}</h2>
                {history.content.split('\n').map((paragraph, pIndex) => (
                  paragraph.trim() && (
                    <p key={pIndex} className="text-lg text-slate-600 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ${isEven ? 'md:order-1' : ''}`}>
                {customVideoId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${customVideoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                ) : (
                  <Image
                    src={history.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDBYhH38osCOSmrn_L6akKPfrF1ytxRltx-nFuW22vBuQ23IMYszxp3-e6PqQjA4236q5Ygh6rJT6rict_Gw4C2eYuQ1uRsZ3LdToLYF6mCJng7RYz81V1CmjUp5WS4jrJD1646dyke0nhlubVfCt7OeAkIHlP8FNdepUjhMIJhMxeJBl3-Bio8IxMzu7x3sSSw-k3J0Aa4suLijiMLsSp7wU9wkhXGSbN-Tt5UdmS9vYfJjLhQythis7sWC-b5gJQ7ZL2RQ8y1NGsa"}
                    alt={history.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            </div>
          );
        })}
        
        <GlobalAds />
      </main>

      <PageMascots leftMascotId={historyData.leftMascotId} rightMascotId={historyData.rightMascotId} />
      <Footer />
    </div>
  );
}
