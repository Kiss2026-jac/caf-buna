'use client';

import { useState, useEffect } from 'react';
import { loadData } from '@/lib/data-client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export default function FAQPage() {
  const [faqData, setFaqData] = useState<any>(DEFAULT_FAQ);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    loadData('buna_faq', DEFAULT_FAQ).then(data => {
      if (data && data.questions && data.questions.length > 0) {
        setFaqData(data);
      }
    });
  }, []);

  const toggleQuestion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-primary/20">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-6">
              Perguntas Frequentes
            </h1>
            <p className="text-lg text-slate-600">
              Tudo o que você precisa saber sobre nossos cafés, preparo e assinaturas.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.questions.map((item: any) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-200 hover:border-primary/30"
              >
                <button
                  onClick={() => toggleQuestion(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-900 pr-8">{item.question}</span>
                  {openId === item.id ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === item.id ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-2">Ainda tem dúvidas?</h3>
            <p className="text-slate-600 mb-6">Nossa equipe de especialistas está pronta para ajudar você.</p>
            <a href="/contato" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
              Fale Conosco
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
