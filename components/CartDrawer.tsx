'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { loadData } from '@/lib/data-client';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [whatsappNumber, setWhatsappNumber] = useState('5511999999999');

  useEffect(() => {
    if (isCartOpen) {
      loadData('buna_layout', {}).then(data => {
        if (data && data.whatsappNumber) {
          setWhatsappNumber(data.whatsappNumber);
        }
      });
    }
  }, [isCartOpen]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    let message = "Olá! Gostaria de finalizar minha compra:\n\n";
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (R$ ${item.price})\n`;
    });
    message += `\n*Total: R$ ${cartTotal.toFixed(2).replace('.', ',')}*`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Seu Carrinho</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-500">
                  <ShoppingBag className="w-16 h-16 text-slate-200" />
                  <p>Seu carrinho está vazio.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence initial={false}>
                    {items.map(item => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="flex gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0">
                          <Image 
                            src={item.imageUrl} 
                            alt={item.name} 
                            fill 
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-slate-900 leading-tight">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-black text-primary">R$ {typeof item.price === 'number' ? item.price.toFixed(2).replace('.', ',') : item.price}</span>
                            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-2 py-1">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-slate-500 hover:text-primary transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-slate-500 hover:text-primary transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-black text-slate-900">
                    R$ {cartTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Finalizar Compra
                </button>
                <p className="text-center text-xs text-slate-500 mt-3">
                  Você será redirecionado para o WhatsApp para concluir o pedido.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
