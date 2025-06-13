import React from 'react';
import { Truck, Clock, Globe, Package } from 'lucide-react';

const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Informazioni sulla Spedizione</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center mb-4">
              <Truck className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold">Metodi di Spedizione</h2>
            </div>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-medium mb-2">Spedizione Standard</h3>
                <p className="text-gray-600 mb-2">
                  Consegna in 2-4 giorni lavorativi
                </p>
                <ul className="text-sm text-gray-600">
                  <li>• Gratuita per ordini superiori a €50</li>
                  <li>• €4,99 per ordini inferiori a €50</li>
                  <li>• Tracciamento completo dell'ordine</li>
                </ul>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-medium mb-2">Spedizione Espressa</h3>
                <p className="text-gray-600 mb-2">
                  Consegna garantita in 1-2 giorni lavorativi
                </p>
                <ul className="text-sm text-gray-600">
                  <li>• €9,99 tariffa fissa</li>
                  <li>• Disponibile in tutta Italia</li>
                  <li>• Tracciamento in tempo reale</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Spedizione Internazionale</h3>
                <p className="text-gray-600 mb-2">
                  Consegna in 3-7 giorni lavorativi
                </p>
                <ul className="text-sm text-gray-600">
                  <li>• A partire da €12,99</li>
                  <li>• Disponibile in tutta l'UE</li>
                  <li>• Tracciamento internazionale</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold">Tempi di Consegna</h2>
            </div>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-medium mb-2">Italia Continentale</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Nord Italia: 1-2 giorni lavorativi</li>
                  <li>• Centro Italia: 2-3 giorni lavorativi</li>
                  <li>• Sud Italia: 2-4 giorni lavorativi</li>
                </ul>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-medium mb-2">Isole</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Sicilia: 3-4 giorni lavorativi</li>
                  <li>• Sardegna: 3-4 giorni lavorativi</li>
                  <li>• Isole minori: 4-5 giorni lavorativi</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Unione Europea</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Paesi confinanti: 3-5 giorni lavorativi</li>
                  <li>• Altri paesi UE: 5-7 giorni lavorativi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
          <div className="flex items-center mb-6">
            <Package className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold">Tracciamento dell'Ordine</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Tutti i nostri ordini sono tracciabili. Una volta spedito l'ordine, riceverai un'email 
              con il numero di tracciamento e le istruzioni per seguire la tua spedizione.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-3">Come tracciare il tuo ordine:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Accedi al tuo account su BellaModa</li>
                <li>Vai alla sezione "I Miei Ordini"</li>
                <li>Seleziona l'ordine che desideri tracciare</li>
                <li>Clicca sul pulsante "Traccia Spedizione"</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold">Informazioni Importanti</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Cosa succede dopo l'ordine?</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Ricevi una conferma d'ordine via email</li>
                <li>L'ordine viene elaborato entro 24 ore</li>
                <li>Ricevi una notifica quando l'ordine viene spedito</li>
                <li>Traccia la spedizione in tempo reale</li>
                <li>Ricevi una notifica il giorno della consegna</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Note Importanti</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>I tempi di consegna non includono i giorni festivi</li>
                <li>Le consegne vengono effettuate dal lunedì al venerdì</li>
                <li>È richiesta la firma alla consegna per ordini superiori a €100</li>
                <li>In caso di assenza, verrà lasciato un avviso di tentata consegna</li>
                <li>Secondo tentativo di consegna gratuito</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;