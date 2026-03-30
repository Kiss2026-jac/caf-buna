'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Palette, ShoppingCart, Leaf, Flame, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalAds from '@/components/GlobalAds';
import { useCart } from '@/contexts/CartContext';
import { loadData } from '@/lib/data-client';

const DEFAULT_LAYOUT = {
  heroTitle: 'A ARTE DA TORRA PERFEITA',
  heroSubtitle: 'Descubra a curadoria exclusiva de cafés torrados artesanalmente para uma experiência sensorial única e inesquecível.',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxuXbUGe0cigxJrsnrw3nGBHezJc9XUOKC6BQOfNfatqPAfrIIMNdTtzy45dCOPhE-upZu6J4ye08Vo-IhY1z1njc09v_EbbqW7yh1lUCnUHqsbc3Tt0iz9llhoh8egZolkhSm8ZlN8QsII1v7RzmwpyN_VoJWTTiyajLhqFj13dym-il-zKhFnDyRuX89KG6iVs-LK_2iho9oGkhIZs8I1BwKhZ9pjHU2zria-8lux05-R40fAcFY82cshnGrxGYpPc8YzRM79dQj',
  banners: [] as any[],
};

export default function Home() {
  const { addToCart } = useCart();
  const [layoutData, setLayoutData] = useState(DEFAULT_LAYOUT);

  const [products, setProducts] = useState<any[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const [homeContent, setHomeContent] = useState({
    title: 'Do Grão à Xícara',
    subtitle: 'Uma jornada de cuidado e excelência em cada etapa do processo.',
    items: [
      { title: '1. Curadoria', description: 'Selecionamos apenas grãos de fazendas sustentáveis com pontuação acima de 80 SCAA.' },
      { title: '2. Torra Artesanal', description: 'Torramos em pequenos lotes para garantir o frescor e realçar as notas sensoriais únicas.' },
      { title: '3. Entrega Expressa', description: 'Seu café chega em sua casa poucos dias após a torra para o máximo de sabor.' }
    ]
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    
    async function fetchData() {
      const savedLayout = await loadData('buna_layout', DEFAULT_LAYOUT);
      setLayoutData(savedLayout);

      const savedProducts = await loadData('buna_products', [
        {
          id: '1',
          name: 'Bourbon Amarelo',
          description: 'Notas de Caramelo e Mel',
          price: '65,00',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHSxLuV1nexcsYLWANrqleH1N6gJwPY41y8_JosXs_GBWAE9K0aO_17GpDUiPUXRDujE3GQZigaxIn3uFNm-IF5FlZdoO_yhUT15HH0xVMjI3dUQOT2BqZYY7O7b3yV8oPjTEykdq0zd1llIwQ5KPq34i2RaCktxtUYoyeqmlYz2ryl5QjeMmFZhN8PfbDfXdCsHaB5QJT5DfUrxYYrH-7eohnLVry9vhE3XIVuQTNLLkUN1Aji5GcVNH_CiYVXRiVM89yFq8ZZKTd',
          mercadoLivreUrl: '/shop',
          isFeatured: true,
        },
        {
          id: '2',
          name: 'Catuaí Vermelho',
          description: 'Frutas Vermelhas e Cítrico',
          price: '58,00',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBYhH38osCOSmrn_L6akKPfrF1ytxRltx-nFuW22vBuQ23IMYszxp3-e6PqQjA4236q5Ygh6rJT6rict_Gw4C2eYuQ1uRsZ3LdToLYF6mCJng7RYz81V1CmjUp5WS4jrJD1646dyke0nhlubVfCt7OeAkIHlP8FNdepUjhMIJhMxeJBl3-Bio8IxMzu7x3sSSw-k3J0Aa4suLijiMLsSp7wU9wkhXGSbN-Tt5UdmS9vYfJjLhQythis7sWC-b5gJQ7ZL2RQ8y1NGsa',
          mercadoLivreUrl: '/shop',
          isFeatured: false,
        },
        {
          id: '3',
          name: 'Geisha Reserve',
          description: 'Floral e Complexo',
          price: '120,00',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB92vOe_9cEQ9TWNcwYkgHBiXbTMvNbxF9L6qVmhbgcSYroz9t1HxDAeBdoN4oYDkkM0AoWV-8IWsFNM_nSqCBAVBvtoO-gN8FAI3I27_PdrPMZlkdrS2g_UYMze6HVXUMuLiF66sVF5ZH_9XbT_h0cFhGWb5jQzwa7v7l2_Do1FfEi0MZrT7wpOGRAosvtxk4iq1C0rTsaJBVj88mpwmpWjQQXRsp9aonoxhWRLt0dccdg-GuSxnc2c9mYQkmkOOrcjdmzkqg6qnGw',
          mercadoLivreUrl: '/shop',
          isFeatured: false,
        },
        {
          id: '4',
          name: 'Espresso Blend',
          description: 'Intenso e Encorpado',
          price: '52,00',
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAju4AZoVZL-K93F2RVnv99R9RgwjOjDV34y90kVL3EVPWpfwls5NPYoENntDnn-JxLvFC9S0j4nwrt5HJKYV28jEvw29Jmg40Bkw4yL9GdL1k4KS2FuZQGzi2VX4G72LyqXIvRlDzdWx36juk1hBQ4lnnx662cXps23wi_mXGq2a5eavaBbnhULrLhKpJok82vLmiKsl77D_S7E_WqdnUZWYwvosAECNPYtdPXInbqGW6etmwUWl7MZr5U2UyEsAobbkpj0W7wnvpQ',
          mercadoLivreUrl: '/shop',
          isFeatured: false,
        }
      ]);
      setProducts(savedProducts);

      const savedPages = await loadData('buna_pages_content', null);
      if (savedPages && savedPages.home) {
        setHomeContent(savedPages.home);
      }
    }
    fetchData();
  }, []);

  const banners = layoutData.banners && layoutData.banners.length > 0 
    ? layoutData.banners 
    : [
        {
          title: layoutData.heroTitle,
          subtitle: layoutData.heroSubtitle,
          image: layoutData.heroImage,
        }
      ];

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const activeBanner = banners[currentBannerIndex];

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <AnimatePresence mode="wait">
          <motion.section
            key={currentBannerIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-xl overflow-hidden boxed-section shadow-sm"
          >
            <div className="p-8 lg:p-16 space-y-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase rounded">Café de Especialidade</span>
              <h2 className="text-5xl lg:text-7xl font-black leading-none text-slate-900 tracking-tighter" dangerouslySetInnerHTML={{ __html: activeBanner.title.replace('\n', '<br />') }} />
              <p className="text-lg text-slate-600 max-w-md">
                {activeBanner.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/shop" className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                  EXPLORAR SELEÇÃO <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/assinatura" className="border border-primary/20 text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-primary/5 transition-colors inline-flex items-center justify-center">
                  CONHECER ASSINATURA
                </Link>
              </div>
            </div>
            <div className="h-full min-h-[400px] relative">
              <Image
                src={activeBanner.image}
                alt="Hero Image"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:block hidden"></div>
            </div>
          </motion.section>
        </AnimatePresence>

        {/* Our Selection Section */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-primary/10 pb-4">
            <div>
              <h3 className="text-2xl font-black tracking-tight uppercase text-slate-900">Nossa Seleção</h3>
              <p className="text-slate-500 text-sm">Os grãos mais premiados da temporada</p>
            </div>
            <Link className="text-primary font-bold text-sm hover:underline flex items-center gap-1" href="/shop">
              VER TUDO <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="group bg-white p-4 rounded-xl boxed-section hover:shadow-lg transition-all">
                <div className="block aspect-square bg-slate-50 rounded-lg overflow-hidden mb-4 relative cursor-pointer" onClick={() => addToCart({
                  id: product.id,
                  name: product.name,
                  price: typeof product.price === 'string' ? parseFloat(product.price.replace(',', '.')) : product.price,
                  imageUrl: product.imageUrl,
                  quantity: 1
                })}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {product.isFeatured && <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">DESTAQUE</span>}
                </div>
                <div className="space-y-1">
                  <button onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: typeof product.price === 'string' ? parseFloat(product.price.replace(',', '.')) : product.price,
                    imageUrl: product.imageUrl,
                    quantity: 1
                  })} className="font-bold text-lg group-hover:text-primary transition-colors block text-slate-900 text-left">{product.name}</button>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><Palette className="w-3 h-3" /> {product.description}</p>
                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-xl font-black text-slate-900">R$ {product.price}</span>
                    <button onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: typeof product.price === 'string' ? parseFloat(product.price.replace(',', '.')) : product.price,
                      imageUrl: product.imageUrl,
                      quantity: 1
                    })} className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-all">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white rounded-xl p-8 lg:p-16 boxed-section shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900">{homeContent.title}</h3>
            <p className="text-slate-500 italic">{homeContent.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Link href="/curadoria" className="text-center space-y-4 group block hover:scale-105 transition-transform cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-all">
                <Leaf className="w-8 h-8" />
              </div>
              <h5 className="font-bold text-xl uppercase tracking-tighter text-slate-900">{homeContent.items[0].title}</h5>
              <p className="text-sm text-slate-500">{homeContent.items[0].description}</p>
              <span className="text-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-2">Saiba mais <ArrowRight className="w-3 h-3" /></span>
            </Link>
            <Link href="/torra-artesanal" className="text-center space-y-4 group block hover:scale-105 transition-transform cursor-pointer border-y md:border-y-0 md:border-x border-primary/10 py-8 md:py-0 md:px-8">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-all">
                <Flame className="w-8 h-8" />
              </div>
              <h5 className="font-bold text-xl uppercase tracking-tighter text-slate-900">{homeContent.items[1].title}</h5>
              <p className="text-sm text-slate-500">{homeContent.items[1].description}</p>
              <span className="text-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-2">Saiba mais <ArrowRight className="w-3 h-3" /></span>
            </Link>
            <Link href="/entrega-expressa" className="text-center space-y-4 group block hover:scale-105 transition-transform cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-all">
                <Truck className="w-8 h-8" />
              </div>
              <h5 className="font-bold text-xl uppercase tracking-tighter text-slate-900">{homeContent.items[2].title}</h5>
              <p className="text-sm text-slate-500">{homeContent.items[2].description}</p>
              <span className="text-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-2">Saiba mais <ArrowRight className="w-3 h-3" /></span>
            </Link>
          </div>
        </section>

        {/* About Us Teaser */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-900 rounded-xl overflow-hidden boxed-section shadow-sm text-white">
          <div className="h-full min-h-[400px] relative order-2 lg:order-1">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB92vOe_9cEQ9TWNcwYkgHBiXbTMvNbxF9L6qVmhbgcSYroz9t1HxDAeBdoN4oYDkkM0AoWV-8IWsFNM_nSqCBAVBvtoO-gN8FAI3I27_PdrPMZlkdrS2g_UYMze6HVXUMuLiF66sVF5ZH_9XbT_h0cFhGWb5jQzwa7v7l2_Do1FfEi0MZrT7wpOGRAosvtxk4iq1C0rTsaJBVj88mpwmpWjQQXRsp9aonoxhWRLt0dccdg-GuSxnc2c9mYQkmkOOrcjdmzkqg6qnGw"
              alt="História da BunaShop"
              fill
              className="object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8 lg:p-16 space-y-6 order-1 lg:order-2">
            <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-bold tracking-widest uppercase rounded">Nossa História</span>
            <h2 className="text-4xl lg:text-5xl font-black leading-none tracking-tighter">Muito mais que uma xícara de café.</h2>
            <p className="text-lg text-slate-300">
              A BunaShop nasceu da paixão por conectar pequenos produtores a amantes de café exigentes. Cada grão conta uma história de dedicação, sustentabilidade e amor pela terra.
            </p>
            <div className="pt-4">
              <Link href="/nossa-historia" className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
                CONHEÇA NOSSA HISTÓRIA <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <GlobalAds />
      </main>

      <Footer />
    </div>
  );
}
