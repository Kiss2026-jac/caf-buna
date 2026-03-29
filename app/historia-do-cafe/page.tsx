'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalAds from '@/components/GlobalAds';
import PageMascots from '@/components/PageMascots';
import { Globe, MapPin, Coffee, Ship } from 'lucide-react';
import { loadData } from '@/lib/data-client';

const DEFAULT_HISTORY = {
  title: 'A História do Café',
  content: 'Da lenda de um pastor na Etiópia até se tornar a bebida mais amada do mundo. Conheça a jornada milenar do café.',
  youtubeUrl: '',
  imageUrl: '',
  leftMascotId: '',
  rightMascotId: '',
};

export default function HistoriaDoCafe() {
  const [historyData, setHistoryData] = useState(DEFAULT_HISTORY);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_history', null).then(data => {
      if (data && data.historiaCafe) {
        setHistoryData(data.historiaCafe);
      }
    });
  }, []);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(historyData.youtubeUrl);

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">{historyData.title}</h2>
          <p className="text-lg text-slate-600">{historyData.content}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
                src={historyData.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDBYhH38osCOSmrn_L6akKPfrF1ytxRltx-nFuW22vBuQ23IMYszxp3-e6PqQjA4236q5Ygh6rJT6rict_Gw4C2eYuQ1uRsZ3LdToLYF6mCJng7RYz81V1CmjUp5WS4jrJD1646dyke0nhlubVfCt7OeAkIHlP8FNdepUjhMIJhMxeJBl3-Bio8IxMzu7x3sSSw-k3J0Aa4suLijiMLsSp7wU9wkhXGSbN-Tt5UdmS9vYfJjLhQythis7sWC-b5gJQ7ZL2RQ8y1NGsa"}
                alt="Grãos de café"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <MapPin className="w-6 h-6" />
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">A Lenda de Kaldi</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                A lenda mais famosa conta que no século IX, na Etiópia, um pastor de cabras chamado Kaldi notou que seu rebanho ficava cheio de energia após mastigar os frutos vermelhos de um certo arbusto. Ao experimentar os frutos, Kaldi sentiu a mesma vitalidade, descobrindo assim o poder do café.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Globe className="w-6 h-6" />
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">A Expansão Árabe</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Da Etiópia, o café atravessou o Mar Vermelho até o Iêmen e a Península Arábica. Os árabes foram os primeiros a cultivar e comercializar o café em larga escala. No século XV, a bebida já era popular em Meca e Medina, e logo se espalhou por todo o Oriente Médio.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Ship className="w-6 h-6" />
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">A Chegada na Europa</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                No século XVII, o café chegou à Europa através de comerciantes venezianos. Inicialmente visto com desconfiança, logo conquistou o continente. As &quot;casas de café&quot; (coffeehouses) tornaram-se importantes centros de encontro, debate intelectual e negócios em cidades como Londres, Paris e Viena.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Coffee className="w-6 h-6" />
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">O Café no Brasil</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                O café chegou ao Brasil em 1727, trazido da Guiana Francesa pelo sargento-mor Francisco de Melo Palheta. O clima e o solo brasileiros provaram ser perfeitos para o cultivo. No século XIX, o café tornou-se o principal produto de exportação do país, impulsionando a economia e moldando a história do Brasil, que hoje é o maior produtor mundial.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB92vOe_9cEQ9TWNcwYkgHBiXbTMvNbxF9L6qVmhbgcSYroz9t1HxDAeBdoN4oYDkkM0AoWV-8IWsFNM_nSqCBAVBvtoO-gN8FAI3I27_PdrPMZlkdrS2g_UYMze6HVXUMuLiF66sVF5ZH_9XbT_h0cFhGWb5jQzwa7v7l2_Do1FfEi0MZrT7wpOGRAosvtxk4iq1C0rTsaJBVj88mpwmpWjQQXRsp9aonoxhWRLt0dccdg-GuSxnc2c9mYQkmkOOrcjdmzkqg6qnGw"
              alt="Preparo de café"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        <GlobalAds />
      </main>

      <PageMascots leftMascotId={historyData.leftMascotId} rightMascotId={historyData.rightMascotId} />
      <Footer />
    </div>
  );
}
