import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, CreditCard, Truck, ShieldCheck, Clock } from 'lucide-react';

const ScrollToTopLink = ({ to, children, className }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simulate newsletter subscription
    setSubscribeStatus('success');
    setEmail('');
    setTimeout(() => setSubscribeStatus(''), 3000);
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">THRIFT SHOP</h3>
            <p className="text-gray-300 mb-4">
              Il tuo negozio di abbigliamento second hand di fiducia. Stile sostenibile, qualità garantita.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Link Utili</h3>
            <ul className="space-y-2">
              <li>
                <ScrollToTopLink to="/products" className="text-gray-300 hover:text-white transition">
                  Prodotti
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/contatti" className="text-gray-300 hover:text-white transition">
                  Contatti
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/faq" className="text-gray-300 hover:text-white transition">
                  FAQ
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/spedizioni" className="text-gray-300 hover:text-white transition">
                  Spedizioni
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/resi" className="text-gray-300 hover:text-white transition">
                  Politica di Reso
                </ScrollToTopLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contatti</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-500 mt-1 mr-3" />
                <span className="text-gray-300">
                  Via dello Shopping 123<br />
                  Roma, Italia 00100
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary-500 mr-3" />
                <span className="text-gray-300">+39 06 1234567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary-500 mr-3" />
                <span className="text-gray-300">info@thriftshop.it</span>
              </li>
              <li className="text-gray-300">
                <p className="font-semibold mb-1">Orari di Apertura:</p>
                <p>Lun-Ven: 9:00-18:00</p>
                <p>Sab: 10:00-16:00</p>
                <p>Dom: Chiuso</p>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Iscriviti per ricevere offerte esclusive e novità sui nostri prodotti.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Il tuo indirizzo email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full btn bg-primary-600 hover:bg-primary-700 text-white"
              >
                Iscriviti
              </button>
              {subscribeStatus === 'success' && (
                <p className="text-sm text-primary-400">
                  Grazie per l'iscrizione!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} THRIFT SHOP. Tutti i diritti riservati.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <ScrollToTopLink to="/privacy" className="text-gray-400 hover:text-white text-sm transition">
                Privacy Policy
              </ScrollToTopLink>
              <ScrollToTopLink to="/privacy" className="text-gray-400 hover:text-white text-sm transition">
                Termini di Servizio
              </ScrollToTopLink>
              <ScrollToTopLink to="/privacy" className="text-gray-400 hover:text-white text-sm transition">
                Cookie Policy
              </ScrollToTopLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;