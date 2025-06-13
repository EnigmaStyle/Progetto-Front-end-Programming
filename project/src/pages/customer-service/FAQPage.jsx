import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const faqs = {
    ordini: [
      {
        question: "Come posso tracciare il mio ordine?",
        answer: "Una volta spedito l'ordine, riceverai un'email con il numero di tracciamento. Puoi utilizzare questo numero nella sezione 'I Miei Ordini' del tuo account per seguire la spedizione in tempo reale."
      },
      {
        question: "Quanto tempo ci vuole per ricevere il mio ordine?",
        answer: "La consegna standard richiede 2-4 giorni lavorativi. Per le isole e alcune zone remote potrebbero essere necessari 1-2 giorni aggiuntivi. Offriamo anche la consegna espressa in 1-2 giorni lavorativi a un costo aggiuntivo."
      },
      {
        question: "Posso modificare o cancellare il mio ordine?",
        answer: "Puoi modificare o cancellare il tuo ordine entro 1 ora dall'acquisto attraverso la sezione 'I Miei Ordini'. Dopo questo periodo, l'ordine entrerà in fase di elaborazione e non potrà essere modificato."
      }
    ],
    spedizioni: [
      {
        question: "Quali sono i costi di spedizione?",
        answer: "La spedizione standard è gratuita per ordini superiori a €50. Per ordini inferiori, il costo è di €4,99. La spedizione espressa ha un costo fisso di €9,99."
      },
      {
        question: "Spedite all'estero?",
        answer: "Sì, spediamo in tutta l'Unione Europea. I tempi di consegna variano da 3 a 7 giorni lavorativi, a seconda della destinazione. I costi di spedizione internazionale partono da €12,99."
      },
      {
        question: "Come vengono imballati i prodotti?",
        answer: "Utilizziamo imballaggi eco-sostenibili e protettivi per garantire che i tuoi acquisti arrivino in perfette condizioni. Ogni ordine viene accuratamente confezionato e sigillato."
      }
    ],
    resi: [
      {
        question: "Qual è la politica di reso?",
        answer: "Accettiamo resi entro 30 giorni dall'acquisto. I prodotti devono essere non utilizzati, con etichette originali e nella confezione originale. Il reso è gratuito per i clienti italiani."
      },
      {
        question: "Come posso effettuare un reso?",
        answer: "Per effettuare un reso, accedi al tuo account, vai alla sezione 'I Miei Ordini', seleziona l'ordine e clicca su 'Richiedi Reso'. Stampa l'etichetta di reso e applica alla confezione. Puoi consegnare il pacco in qualsiasi punto di ritiro convenzionato."
      },
      {
        question: "Quando riceverò il rimborso?",
        answer: "Una volta ricevuto e verificato il reso, elaboreremo il rimborso entro 3-5 giorni lavorativi. Il tempo di accredito dipende dal tuo metodo di pagamento (2-10 giorni lavorativi)."
      }
    ],
    pagamenti: [
      {
        question: "Quali metodi di pagamento accettate?",
        answer: "Accettiamo carte di credito (Visa, Mastercard, American Express), PayPal, bonifico bancario e pagamento alla consegna (solo in Italia con supplemento di €3,99)."
      },
      {
        question: "I pagamenti sono sicuri?",
        answer: "Sì, utilizziamo sistemi di crittografia avanzati e protocolli di sicurezza certificati per proteggere i tuoi dati di pagamento. Non memorizziamo mai i dettagli completi della carta di credito."
      },
      {
        question: "È possibile pagare in rate?",
        answer: "Sì, offriamo la possibilità di pagare in 3 rate senza interessi per ordini superiori a €100 attraverso il servizio Klarna o PayPal."
      }
    ]
  };

  const [activeCategory, setActiveCategory] = useState('ordini');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Domande Frequenti</h1>

        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {Object.entries(faqs).map(([category, items]) => (
                <button
                  key={category}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeCategory === category
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-3xl mx-auto">
              {faqs[activeCategory].map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-primary-50 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Non hai trovato la risposta che cercavi?</h2>
          <p className="text-gray-600 mb-4">
            Il nostro team di assistenza clienti è sempre disponibile per aiutarti.
          </p>
          <a href="/contatti" className="btn-primary inline-flex items-center">
            Contattaci
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;