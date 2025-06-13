import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 animate-slideUp">
      <div className="container-custom py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-grow pr-8">
            <p className="text-gray-600">
              THRIFT SHOP utilizza i cookie per migliorare la tua esperienza sul nostro sito. 
              Leggi la nostra{' '}
              <Link to="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                politica sulla privacy
              </Link>{' '}
              per saperne di più.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecline}
              className="btn-secondary text-sm px-4"
            >
              Rifiuta
            </button>
            <button
              onClick={handleAccept}
              className="btn-primary text-sm px-4"
            >
              Accetta
            </button>
          </div>
          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 sm:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;