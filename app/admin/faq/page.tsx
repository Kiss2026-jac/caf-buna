'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2, Plus, Trash2, HelpCircle } from 'lucide-react';
import { loadData, saveData } from '@/lib/data-client';

const DEFAULT_FAQ = {
  questions: [
    {
      id: '1',
      question: 'O que é um café especial?',
      answer: 'Cafés especiais são grãos que atingem pontuação acima de 80 pontos na escala da Specialty Coffee Association (SCA). Eles são livres de defeitos, possuem rastreabilidade (sabemos a fazenda e o produtor) e apresentam notas sensoriais complexas e doçura natural.'
    },
    {
      id: '2',
      question: 'Qual a diferença entre café Arábica e Robusta (Conilon)?',
      answer: 'O Arábica é cultivado em maiores altitudes, possui sabor mais doce, complexo e aromático (com notas frutadas, florais ou achocolatadas). O Robusta é mais resistente a pragas, cultivado em altitudes menores, tem o dobro de cafeína e um sabor mais amargo e intenso.'
    },
    {
      id: '3',
      question: 'Como devo armazenar meu café em casa?',
      answer: 'Guarde seu café em local fresco, escuro e seco. O ideal é mantê-lo na embalagem original bem fechada (se tiver aquele "araminho" ou zíper) ou em um pote hermético. Nunca guarde na geladeira, pois a umidade e os odores de outros alimentos podem estragar o grão.'
    },
    {
      id: '4',
      question: 'Qual a validade do café torrado?',
      answer: 'O café não "estraga" facilmente a ponto de fazer mal, mas ele perde rapidamente suas propriedades sensoriais (aroma e sabor). Para ter a melhor experiência, recomendamos consumir o café em até 30 a 45 dias após a data da torra.'
    },
    {
      id: '5',
      question: 'É melhor comprar café em grãos ou já moído?',
      answer: 'Sempre em grãos! O café começa a oxidar e perder seus aromas voláteis minutos após a moagem. Moer o café apenas na hora do preparo garante uma xícara muito mais fresca, aromática e saborosa.'
    },
    {
      id: '6',
      question: 'O que significa a "torra" do café?',
      answer: 'A torra é o processo de aquecimento do grão cru (verde), que desenvolve os aromas e sabores. Torras claras destacam a acidez e notas florais/frutadas; torras médias equilibram doçura, corpo e acidez; e torras escuras trazem mais amargor e notas de cacau intenso.'
    },
    {
      id: '7',
      question: 'Qual a melhor água para preparar café?',
      answer: 'Água filtrada ou mineral. A água compõe cerca de 98% da sua xícara de café. Se você usar água da torneira com muito cloro ou impurezas, isso vai mascarar e estragar o sabor do seu café especial.'
    },
    {
      id: '8',
      question: 'O que é o "bloom" ou pré-infusão?',
      answer: 'É aquele momento em que despejamos um pouco de água quente sobre o pó de café e esperamos uns 30 segundos. Isso serve para liberar os gases (principalmente CO2) retidos no grão durante a torra, permitindo que a água extraia o sabor de forma mais uniforme depois.'
    },
    {
      id: '9',
      question: 'Posso adoçar meu café especial?',
      answer: 'O café especial, por ser de alta qualidade e ter uma torra bem feita, já possui uma doçura natural. Nós sempre recomendamos provar o café puro primeiro para sentir as notas sensoriais. Mas, no final das contas, a melhor forma de tomar café é do jeito que você mais gosta!'
    },
    {
      id: '10',
      question: 'Como funciona a assinatura do Clube do Grão?',
      answer: 'Você escolhe o plano que melhor se adapta ao seu consumo diário. Todo mês, nossa equipe faz uma curadoria de cafés incríveis e enviamos pacotes fresquinhos (torrados há poucos dias) direto para a sua casa, com frete grátis.'
    }
  ]
};

export default function AdminFAQ() {
  const [faqData, setFaqData] = useState<any>(DEFAULT_FAQ);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    loadData('buna_faq', DEFAULT_FAQ).then(data => {
      if (!data.questions || data.questions.length === 0) {
        setFaqData(DEFAULT_FAQ);
      } else {
        setFaqData(data);
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    try {
      await saveData('buna_faq', faqData);
      setTimeout(() => {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }, 500);
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const addQuestion = () => {
    setFaqData((prev: any) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: Date.now().toString(),
          question: 'Nova Pergunta?',
          answer: 'Resposta para a nova pergunta.'
        }
      ]
    }));
  };

  const removeQuestion = (id: string) => {
    setFaqData((prev: any) => ({
      ...prev,
      questions: prev.questions.filter((q: any) => q.id !== id)
    }));
  };

  const updateQuestion = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqData((prev: any) => ({
      ...prev,
      questions: prev.questions.map((q: any) => 
        q.id === id ? { ...q, [field]: value } : q
      )
    }));
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Perguntas Frequentes (FAQ)</h1>
          <p className="text-slate-500 text-sm">Gerencie as perguntas e respostas que aparecem na página de FAQ.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-lg flex items-center gap-2 border border-emerald-100">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-medium">Perguntas salvas com sucesso!</p>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 border border-red-100">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">Erro ao salvar. Tente novamente.</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden p-6">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-slate-400" />
            <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">
              Lista de Perguntas
            </h2>
          </div>
          <button
            type="button"
            onClick={addQuestion}
            className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold hover:bg-primary/20 transition-colors flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Adicionar Pergunta
          </button>
        </div>

        <div className="space-y-6">
          {faqData.questions.map((item: any, index: number) => (
            <div key={item.id} className="p-6 border border-slate-100 rounded-xl bg-slate-50 relative">
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={() => removeQuestion(item.id)}
                  className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg transition-colors"
                  title="Remover Pergunta"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="font-bold text-slate-700 mb-4 uppercase text-sm tracking-widest">Pergunta {index + 1}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Pergunta</label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={e => updateQuestion(item.id, 'question', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Resposta</label>
                  <textarea
                    rows={4}
                    value={item.answer}
                    onChange={e => updateQuestion(item.id, 'answer', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                  />
                </div>
              </div>
            </div>
          ))}
          
          {faqData.questions.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              Nenhuma pergunta cadastrada. Clique em "Adicionar Pergunta" para começar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
