'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function ConfirmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(token ? 'loading' : 'error');
  const [message, setMessage] = useState(token ? 'Confirmando seu e-mail...' : 'Nenhum token de confirmação fornecido.');

  useEffect(() => {
    if (!token) {
      return;
    }

    const confirmEmail = async () => {
      try {
        const res = await fetch(`/api/auth/confirm?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          setMessage(data.message || 'E-mail confirmado com sucesso!');
        } else {
          setStatus('error');
          setMessage(data.error || 'Erro ao confirmar e-mail.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Ocorreu um erro de conexão.');
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 w-full max-w-md text-center">
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">
          Confirmação de Cadastro
        </h1>
        
        <div className={`p-4 rounded-lg mb-6 ${
          status === 'loading' ? 'bg-blue-50 text-blue-700' :
          status === 'success' ? 'bg-green-50 text-green-700' :
          'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>

        {status !== 'loading' && (
          <Link 
            href="/admin" 
            className="inline-block bg-slate-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Ir para o Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
