import React from 'react';
import { RotateCcw, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';

const ReturnPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Politica di Reso</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center mb-4">
              <RotateCcw className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-lg font-semibold">Reso Facile</h2>
            </div>
            <p className="text-gray-600">
              Hai 30 giorni di tempo dalla data di consegna per restituire il tuo acquisto.
              Il reso è gratuito per tutti i clienti in Italia.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center mb-4">
              <ShieldCheck className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-lg font-semibold">Rimborso Garantito</h2>
            </div>
            <p className="text-gray-600">
              Rimborso completo garantito entro 14 giorni dalla ricezione del reso.
              Puoi scegliere tra rimborso sul metodo di pagamento originale o credito negozio.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-lg font-semibold">Qualità Assicurata</h2>
            </div>
            <p className="text-gray-600">
              Tutti i prodotti vengono accuratamente controllati prima della spedizione.
              Se ricevi un articolo difettoso, il reso è sempre gratuito.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Come Effettuare un Reso</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-600 font-semibold">1</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium mb-2">Richiedi il Reso</h3>
                  <p className="text-gray-600">
                    Accedi al tuo account, vai alla sezione "I Miei Ordini" e seleziona
                    l'ordine contenente l'articolo da restituire. Clicca su "Richiedi Reso"
                    e segui le istruzioni.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-600 font-semibold">2</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium mb-2">Prepara il Pacco</h3>
                  <p className="text-gray-600">
                    Imballa accuratamente l'articolo nella sua confezione originale o in una
                    scatola adeguata. Assicurati di includere tutte le etichette originali
                    e gli accessori.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-600 font-semibold">3</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium mb-2">Spedisci il Reso</h3>
                  <p className="text-gray-600">
                    Applica l'etichetta di reso che riceverai via email e consegna il pacco
                    al corriere o portalo in un punto di ritiro convenzionato.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-600 font-semibold">4</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium mb-2">Ricevi il Rimborso</h3>
                  <p className="text-gray-600">
                    Una volta ricevuto e verificato il reso, procederemo con il rimborso
                    entro 3-5 giorni lavorativi sul metodo di pagamento originale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
          <div className="flex items-center mb-6">
            <AlertCircle className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold">Condizioni del Reso</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Articoli Idonei al Reso</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Articoli non utilizzati</li>
                <li>Con etichette originali attaccate</li>
                <li>Nella confezione originale</li>
                <li>Entro 30 giorni dall'acquisto</li>
                <li>In perfette condizioni</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Articoli Non Idonei al Reso</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Articoli utilizzati o danneggiati</li>
                <li>Senza etichette originali</li>
                <li>Prodotti personalizzati</li>
                <li>Articoli intimi</li>
                <li>Oltre 30 giorni dall'acquisto</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-primary-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Hai bisogno di aiuto con un reso?</h2>
          <p className="text-gray-600 mb-4">
            Il nostro team di assistenza clienti è disponibile per aiutarti con qualsiasi domanda
            riguardante i resi o i rimborsi.
          </p>
          <div className="flex space-x-4">
            <a href="/contatti" className="btn-primary">
              Contattaci
            </a>
            <a href="/faq" className="btn-secondary">
              Consulta le FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;