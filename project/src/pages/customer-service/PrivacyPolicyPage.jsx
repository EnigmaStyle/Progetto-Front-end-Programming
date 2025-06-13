import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Informativa sulla Privacy</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <Shield className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="font-semibold mb-2">Dati Protetti</h3>
            <p className="text-gray-600">
              I tuoi dati personali sono protetti con i più avanzati sistemi di sicurezza.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <Lock className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="font-semibold mb-2">Pagamenti Sicuri</h3>
            <p className="text-gray-600">
              Tutte le transazioni sono criptate e processate in modo sicuro.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <Eye className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="font-semibold mb-2">Trasparenza</h3>
            <p className="text-gray-600">
              Chiara informativa su come raccogliamo e utilizziamo i tuoi dati.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <UserCheck className="w-8 h-8 text-primary-600 mb-4" />
            <h3 className="font-semibold mb-2">I Tuoi Diritti</h3>
            <p className="text-gray-600">
              Hai il pieno controllo dei tuoi dati personali in ogni momento.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Informativa Completa sulla Privacy</h2>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">1. Raccolta dei Dati</h3>
                <p className="text-gray-600 mb-4">
                  BellaModa raccoglie i seguenti tipi di informazioni personali:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Nome e informazioni di contatto</li>
                  <li>Informazioni di fatturazione e spedizione</li>
                  <li>Cronologia degli acquisti</li>
                  <li>Preferenze di shopping</li>
                  <li>Dati di navigazione sul sito</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">2. Utilizzo dei Dati</h3>
                <p className="text-gray-600 mb-4">
                  Utilizziamo i tuoi dati personali per:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Processare i tuoi ordini e pagamenti</li>
                  <li>Fornire assistenza clienti</li>
                  <li>Personalizzare la tua esperienza di shopping</li>
                  <li>Inviare comunicazioni di marketing (con il tuo consenso)</li>
                  <li>Migliorare i nostri prodotti e servizi</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">3. Protezione dei Dati</h3>
                <p className="text-gray-600 mb-4">
                  Adottiamo rigorose misure di sicurezza per proteggere i tuoi dati:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Crittografia SSL per tutte le transazioni</li>
                  <li>Accesso limitato ai dati personali</li>
                  <li>Monitoraggio continuo della sicurezza</li>
                  <li>Backup regolari dei dati</li>
                  <li>Formazione del personale sulla privacy</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">4. I Tuoi Diritti</h3>
                <p className="text-gray-600 mb-4">
                  Hai il diritto di:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Accedere ai tuoi dati personali</li>
                  <li>Richiedere la correzione dei dati errati</li>
                  <li>Richiedere la cancellazione dei dati</li>
                  <li>Opporti al trattamento dei dati</li>
                  <li>Ricevere i tuoi dati in formato portabile</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">5. Cookie</h3>
                <p className="text-gray-600 mb-4">
                  Utilizziamo i cookie per:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Migliorare la funzionalità del sito</li>
                  <li>Analizzare il traffico del sito</li>
                  <li>Personalizzare i contenuti</li>
                  <li>Ricordare le tue preferenze</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">6. Condivisione dei Dati</h3>
                <p className="text-gray-600 mb-4">
                  Condividiamo i tuoi dati solo con:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Fornitori di servizi di spedizione</li>
                  <li>Processori di pagamento</li>
                  <li>Servizi di assistenza clienti</li>
                  <li>Autorità competenti (se richiesto dalla legge)</li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-primary-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Hai domande sulla privacy?</h2>
          <p className="text-gray-600 mb-4">
            Se hai domande sulla nostra politica sulla privacy o su come gestiamo i tuoi dati,
            non esitare a contattarci.
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

export default PrivacyPolicyPage;