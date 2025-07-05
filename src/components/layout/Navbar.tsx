import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import CartDrawer from '../cart/CartDrawer';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isLoggedIn, cart } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 8.25C16.5 10.32 14.82 12 12.75 12H11.25C9.18 12 7.5 10.32 7.5 8.25C7.5 6.18 9.18 4.5 11.25 4.5H12.75C14.82 4.5 16.5 6.18 16.5 8.25Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M7.5 15.75C7.5 13.68 9.18 12 11.25 12H12.75C14.82 12 16.5 13.68 16.5 15.75C16.5 17.82 14.82 19.5 12.75 19.5H11.25C9.18 19.5 7.5 17.82 7.5 15.75Z" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="text-xl font-semibold text-primary-700">SehatTradisi</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-neutral-800 hover:text-primary-700 transition-colors">Beranda</Link>
              <Link to="/services" className="text-neutral-800 hover:text-primary-700 transition-colors">Layanan</Link>
              <div className="relative group">
                <span className="text-neutral-800 hover:text-primary-700 transition-colors cursor-pointer">Kategori</span>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 hidden group-hover:block">
                  <Link to="/services?category=massage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Pijat Tradisional</Link>
                  <Link to="/services?category=spa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Spa & Lulur</Link>
                  <Link to="/services?category=herbal" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Jamu & Herbal</Link>
                </div>
              </div>
              <Link to="/therapists" className="text-neutral-800 hover:text-primary-700 transition-colors">Terapis</Link>
              <Link to="/about" className="text-neutral-800 hover:text-primary-700 transition-colors">Tentang Kami</Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari layanan..."
                  className="pl-9 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm w-44 lg:w-64"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {isLoggedIn ? (
                <>
                  <Link to="/account" className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <User size={20} />
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ShoppingBag size={20} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent-500 text-white text-xs flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </button>
                </>
              ) : (
                <Link to="/account" className="btn btn-primary">Masuk / Daftar</Link>
              )}
            </div>

            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;