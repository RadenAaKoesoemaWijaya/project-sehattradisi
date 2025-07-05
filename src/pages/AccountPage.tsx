import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Heart, LogOut, CreditCard, Settings, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AccountPage: React.FC = () => {
  const { isLoggedIn, login, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/account/profile');
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/account/profile');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/account');
  };
  
  if (!isLoggedIn) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
              {showRegister ? 'Daftar Akun' : 'Masuk ke Akun Anda'}
            </h1>
            
            {showRegister ? (
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="register-email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="register-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="register-password" className="block text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="register-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3"
                >
                  Daftar
                </button>
                
                <p className="text-center mt-4 text-gray-600">
                  Sudah punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setShowRegister(false)}
                    className="text-primary-700 hover:text-primary-800 font-medium"
                  >
                    Masuk
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="login-email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="login-password" className="block text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <div className="mt-1 text-right">
                    <a href="#" className="text-sm text-primary-700 hover:text-primary-800">
                      Lupa password?
                    </a>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3"
                >
                  Masuk
                </button>
                
                <p className="text-center mt-4 text-gray-600">
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setShowRegister(true)}
                    className="text-primary-700 hover:text-primary-800 font-medium"
                  >
                    Daftar
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={32} className="text-gray-500" />
                </div>
                <div>
                  <h2 className="font-semibold">Pengguna SehatTradisi</h2>
                  <p className="text-gray-600">user@example.com</p>
                </div>
              </div>
              
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/account/profile"
                      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                        location.pathname === '/account/profile'
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <User size={20} />
                      <span>Profil Saya</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/orders"
                      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                        location.pathname === '/account/orders'
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <ShoppingBag size={20} />
                      <span>Pesanan Saya</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/favorites"
                      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                        location.pathname === '/account/favorites'
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Heart size={20} />
                      <span>Favorit</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/payments"
                      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                        location.pathname === '/account/payments'
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <CreditCard size={20} />
                      <span>Metode Pembayaran</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/settings"
                      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                        location.pathname === '/account/settings'
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Settings size={20} />
                      <span>Pengaturan</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut size={20} />
                      <span>Keluar</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <Routes>
              <Route path="/" element={<Navigate to="/account/profile" />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/settings" element={<AccountSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navigate: React.FC<{ to: string }> = ({ to }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(to);
  }, [navigate, to]);
  return null;
};

const Profile: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Profil Saya</h2>
      
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="fullname" className="block text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="fullname"
              defaultValue="Pengguna SehatTradisi"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue="user@example.com"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="phone"
              defaultValue="+62 812-3456-7890"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="birthdate" className="block text-gray-700 mb-2">
              Tanggal Lahir
            </label>
            <input
              type="date"
              id="birthdate"
              defaultValue="1990-01-01"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="address" className="block text-gray-700 mb-2">
            Alamat
          </label>
          <textarea
            id="address"
            defaultValue="Jl. Contoh No. 123, Kota Jakarta"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={3}
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary px-6"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

const Orders: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Pesanan Saya</h2>
      
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-sm text-gray-500">ID Pesanan: #ORD123456</span>
              <h3 className="font-semibold">Pijat Tradisional</h3>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Selesai</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">20 Juni 2023 - 15:00</span>
            <span className="font-medium">Rp150.000</span>
          </div>
          <div className="mt-3 pt-3 border-t flex justify-between items-center">
            <button className="text-primary-700 hover:text-primary-800 text-sm font-medium">
              Lihat Detail
            </button>
            <button className="btn btn-primary py-1 px-4 text-sm">
              Pesan Lagi
            </button>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-sm text-gray-500">ID Pesanan: #ORD123457</span>
              <h3 className="font-semibold">Jamu Kunyit Asam</h3>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Dikirim</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">15 Juni 2023</span>
            <span className="font-medium">Rp25.000</span>
          </div>
          <div className="mt-3 pt-3 border-t flex justify-between items-center">
            <button className="text-primary-700 hover:text-primary-800 text-sm font-medium">
              Lihat Detail
            </button>
            <button className="btn btn-primary py-1 px-4 text-sm">
              Lacak Pengiriman
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Favorites: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Favorit Saya</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="h-40 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg"
              alt="Pijat Tradisional"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-1">Pijat Tradisional</h3>
            <div className="flex justify-between">
              <span className="text-gray-600">60 menit</span>
              <span className="font-medium">Rp150.000</span>
            </div>
            <div className="mt-3 pt-3 border-t flex justify-between items-center">
              <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                Hapus Favorit
              </button>
              <Link to="/services/service-1" className="text-primary-700 hover:text-primary-800 text-sm font-medium inline-flex items-center">
                Lihat Detail <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="h-40 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3212164/pexels-photo-3212164.jpeg"
              alt="Boreh Bali"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-1">Boreh Bali</h3>
            <div className="flex justify-between">
              <span className="text-gray-600">75 menit</span>
              <span className="font-medium">Rp200.000</span>
            </div>
            <div className="mt-3 pt-3 border-t flex justify-between items-center">
              <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                Hapus Favorit
              </button>
              <Link to="/services/service-6" className="text-primary-700 hover:text-primary-800 text-sm font-medium inline-flex items-center">
                Lihat Detail <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Payments: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Metode Pembayaran</h2>
      
      <div className="space-y-4">
        <div className="border rounded-lg p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
              <CreditCard size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Bank Transfer</h3>
              <p className="text-sm text-gray-600">Bank Mandiri - ****6789</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm text-gray-600 hover:text-gray-800">Edit</button>
            <button className="text-sm text-red-500 hover:text-red-600">Hapus</button>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-green-100 rounded-md flex items-center justify-center mr-3">
              <CreditCard size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">E-Wallet</h3>
              <p className="text-sm text-gray-600">GoPay - 081234567890</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm text-gray-600 hover:text-gray-800">Edit</button>
            <button className="text-sm text-red-500 hover:text-red-600">Hapus</button>
          </div>
        </div>
        
        <button className="btn btn-primary flex items-center gap-2">
          <CreditCard size={18} />
          <span>Tambah Metode Pembayaran</span>
        </button>
      </div>
    </div>
  );
};

const AccountSettings: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Pengaturan</h2>
      
      <div className="space-y-4">
        <div className="p-4 border-b">
          <h3 className="font-medium mb-2">Notifikasi</h3>
          <div className="flex items-center justify-between mb-2">
            <span>Email</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>SMS</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>Promosi dan Penawaran</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
        
        <div className="p-4 border-b">
          <h3 className="font-medium mb-4">Keamanan</h3>
          <button className="btn bg-gray-200 text-gray-800 hover:bg-gray-300">
            Ubah Password
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium mb-4">Bahasa</h3>
          <select className="w-full md:w-1/2 p-2 border rounded-md">
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;