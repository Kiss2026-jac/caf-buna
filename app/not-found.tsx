import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black text-slate-900">404</h1>
        <h2 className="text-2xl font-bold text-slate-700">Página não encontrada</h2>
        <p className="text-slate-500">A página que você está procurando não existe ou foi movida.</p>
        <Link href="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
