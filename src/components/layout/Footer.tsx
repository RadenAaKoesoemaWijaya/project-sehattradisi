import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 8.25C16.5 10.32 14.82 12 12.75 12H11.25C9.18 12 7.5 10.32 7.5 8.25C7.5 6.18 9.18 4.5 11.25 4.5H12.75C14.82 4.5 16.5 6.18 16.5 8.25Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M7.5 15.75C7.5 13.68 9.18 12 11.25 12H12.75C14.82 12 16.5 13.68 16.5 15.75C16.5 17.82 14.82 19.5 12.75 19.5H11.25C9.18 19.5 7.5 17.82 7.5 15.75Z" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="text-xl font-semibold">SehatTradisi</span>
            </div>
            <p className="text-gray-300 mb-4">Platform pemesanan layanan kesehatan tradisional Indonesia yang menghubungkan Anda dengan ahli pijat, terapis spa, dan produsen jamu berkualitas.</p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan Kami</h3>
            <ul className="space-y-2">
              <li><Link to="/services?category=massage" className="text-gray-300 hover:text-white transition-colors">Pijat Tradisional</Link></li>
              <li><Link to="/services?category=spa" className="text-gray-300 hover:text-white transition-colors">Spa & Lulur</Link></li>
              <li><Link to="/services?category=herbal" className="text-gray-300 hover:text-white transition-colors">Jamu & Herbal</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Semua Layanan</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/join" className="text-gray-300 hover:text-white transition-colors">Bergabung Sebagai Mitra</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-500 mt-1" size={18} />
                <span className="text-gray-300">Jl. Kesehatan No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary-500" size={18} />
                <span className="text-gray-300">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary-500" size={18} />
                <span className="text-gray-300">info@sehattradisi.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} SehatTradisi. Hak Cipta Dilindungi.</p>
          <div className="mt-2 md:mt-0">
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors mr-4">Syarat & Ketentuan</a>
            <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;