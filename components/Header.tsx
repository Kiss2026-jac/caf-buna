'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Coffee, Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/shop', label: 'SHOP' },
    { href: '/assinatura', label: 'ASSINATURA' },
    { href: '/nossa-historia', label: 'NOSSA HISTÓRIA' },
    { href: '/historia-do-cafe', label: 'HISTÓRIA DO CAFÉ' },
    { href: '/guia-de-preparo', label: 'GUIA DE PREPARO' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Coffee className="text-primary w-8 h-8" />
              <h1 className="text-xl font-black tracking-tighter uppercase text-slate-900">bunashop.com.br</h1>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} className="text-sm font-semibold hover:text-primary transition-colors" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center bg-primary/5 rounded px-3 py-1 border border-primary/10">
              <Search className="text-primary w-4 h-4" />
              <input className="bg-transparent border-none focus:ring-0 outline-none text-sm placeholder:text-slate-400 w-32 ml-2" placeholder="Buscar grãos..." type="text" />
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-primary/10 rounded-full transition-colors relative"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <Link href="/admin" className="p-2 hover:bg-primary/10 rounded-full transition-colors hidden sm:block" aria-label="Admin">
              <User className="w-6 h-6" />
            </Link>
            
            <button 
              className="p-2 hover:bg-primary/10 rounded-full transition-colors lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-primary/10 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  className="text-base font-semibold text-slate-900 hover:text-primary transition-colors" 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                <Link 
                  href="/admin" 
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  Área do Lojista
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
