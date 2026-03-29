import type {Metadata} from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css'; // Global styles
import ThemeProvider from '@/components/ThemeProvider';
import { CartProvider } from '@/contexts/CartContext';
import CartDrawer from '@/components/CartDrawer';

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: 'BunaShop - Café de Especialidade',
  description: 'Descubra a curadoria exclusiva de cafés torrados artesanalmente para uma experiência sensorial única e inesquecível.',
  keywords: ['café', 'café especial', 'torra artesanal', 'café em grãos', 'cafeteria', 'comprar café online', 'bunashop'],
  openGraph: {
    title: 'BunaShop - Café de Especialidade',
    description: 'Descubra a curadoria exclusiva de cafés torrados artesanalmente para uma experiência sensorial única e inesquecível.',
    url: 'https://bunashop.com.br',
    siteName: 'BunaShop',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxuXbUGe0cigxJrsnrw3nGBHezJc9XUOKC6BQOfNfatqPAfrIIMNdTtzy45dCOPhE-upZu6J4ye08Vo-IhY1z1njc09v_EbbqW7yh1lUCnUHqsbc3Tt0iz9llhoh8egZolkhSm8ZlN8QsII1v7RzmwpyN_VoJWTTiyajLhqFj13dym-il-zKhFnDyRuX89KG6iVs-LK_2iho9oGkhIZs8I1BwKhZ9pjHU2zria-8lux05-R40fAcFY82cshnGrxGYpPc8YzRM79dQj',
        width: 1200,
        height: 630,
        alt: 'BunaShop - Café de Especialidade',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BunaShop - Café de Especialidade',
    description: 'Descubra a curadoria exclusiva de cafés torrados artesanalmente.',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCxuXbUGe0cigxJrsnrw3nGBHezJc9XUOKC6BQOfNfatqPAfrIIMNdTtzy45dCOPhE-upZu6J4ye08Vo-IhY1z1njc09v_EbbqW7yh1lUCnUHqsbc3Tt0iz9llhoh8egZolkhSm8ZlN8QsII1v7RzmwpyN_VoJWTTiyajLhqFj13dym-il-zKhFnDyRuX89KG6iVs-LK_2iho9oGkhIZs8I1BwKhZ9pjHU2zria-8lux05-R40fAcFY82cshnGrxGYpPc8YzRM79dQj'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={workSans.variable}>
      <body className="font-sans antialiased bg-white text-slate-900" suppressHydrationWarning>
        <ThemeProvider />
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
