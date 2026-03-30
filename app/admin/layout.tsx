'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, BookOpen, Settings, LogOut, Menu, X, Mail, Lock, Download, Users, HelpCircle, FileText } from 'lucide-react';
import { auth } from '@/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Erro ao fazer login com o Google. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin');
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Produtos', href: '/admin/produtos', icon: ShoppingBag },
    { name: 'História & Vídeos', href: '/admin/historia', icon: BookOpen },
    { name: 'Layout & Banners', href: '/admin/layout-config', icon: Settings },
    { name: 'Publicidade', href: '/admin/publicidade', icon: LayoutDashboard },
    { name: 'Páginas', href: '/admin/paginas', icon: BookOpen },
    { name: 'Guia de Preparo', href: '/admin/guia', icon: BookOpen },
    { name: 'Assinatura', href: '/admin/assinatura', icon: ShoppingBag },
    { name: 'Perguntas Frequentes', href: '/admin/faq', icon: HelpCircle },
    { name: 'Páginas de Suporte', href: '/admin/paginas-legais', icon: FileText },
    { name: 'Personagens', href: '/admin/personagens', icon: Users },
    { name: 'Redes Sociais', href: '/admin/redes-sociais', icon: Mail },
    { name: 'Exportar Código', href: '/admin/exportar', icon: Download },
  ];

  // Se estiver na página de confirmação, não mostra o layout do admin nem a tela de login
  if (pathname === '/admin/confirmar') {
    return <>{children}</>;
  }

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">BunaShop Admin</h1>
            <p className="text-slate-500 text-sm mt-2">Área restrita para configuração do site</p>
          </div>

          {error && <p className="text-red-500 text-sm mt-1 bg-red-50 p-3 rounded-lg">{error}</p>}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-70 flex justify-center items-center"
          >
            {isLoading ? 'Aguarde...' : 'Entrar com o Google'}
          </button>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-primary">
              &larr; Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col

      `}>
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-tighter">Buna Admin</h2>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive ? 'bg-primary text-white font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between lg:justify-end">
          <button 
            className="lg:hidden text-slate-600 hover:text-slate-900"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm font-bold text-primary hover:underline">
              Ver Site Ao Vivo &nearr;
            </Link>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
