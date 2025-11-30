import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Heart, LogOut, CreditCard, Settings, ChevronRight, Download, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../hooks/useToast';
import { validateLogin, validateRegistration } from '../utils/validation';
import Button from '../components/common/Button';
import { PDFInvoiceGenerator, InvoiceData } from '../utils/pdfInvoice';
import orderService from '../services/orderService';

const AccountPage: React.FC = () => {
  const { isLoggedIn, login, logout, register } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { showSuccess, showError } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const validation = validateLogin({ email, password });
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }
    
    try {
      await login(email, password);
      showSuccess('Login berhasil!');
      navigate('/account/profile');
    } catch (error: any) {
      showError(error.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const validation = validateRegistration({ name, email, phone, password });
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }
    
    try {
      await register(email, password, name, phone);
      showSuccess('Registrasi berhasil!');
      navigate('/account/profile');
    } catch (error: any) {
      showError(error.message || 'Registrasi gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/account');
    } catch (error: any) {
      showError(error.message || 'Logout gagal. Silakan coba lagi.');
    }
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
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    placeholder="08123456789"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="register-email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="register-email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="email@example.com"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="register-password" className="block text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="register-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                    }}
                    placeholder="Minimal 6 karakter"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  loading={isLoading}
                  loadingText="Mendaftar..."
                  className="w-full"
                >
                  Daftar
                </Button>
                
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="email@example.com"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="login-password" className="block text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                    }}
                    placeholder="Minimal 6 karakter"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                  <div className="mt-1 text-right">
                    <a href="#" className="text-sm text-primary-700 hover:text-primary-800">
                      Lupa password?
                    </a>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  loading={isLoading}
                  loadingText="Masuk..."
                  className="w-full"
                >
                  Masuk
                </Button>
                
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
  // State untuk data profil
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);

  // Load data dari localStorage saat komponen mount
  useEffect(() => {
    const data = localStorage.getItem('profile');
    if (data) {
      const profile = JSON.parse(data);
      setFullname(profile.fullname || '');
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
      setBirthdate(profile.birthdate || '');
      setAddress(profile.address || '');
    } else {
      // Default value jika belum ada di localStorage
      setFullname('Pengguna SehatTradisi');
      setEmail('user@example.com');
      setPhone('+62 812-3456-7890');
      setBirthdate('1990-01-01');
      setAddress('Jl. Contoh No. 123, Kota Jakarta');
    }
  }, []);

  // Handler untuk submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile = { fullname, email, phone, birthdate, address };
    localStorage.setItem('profile', JSON.stringify(profile));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Profil Saya</h2>
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Perubahan profil berhasil disimpan!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="fullname" className="block text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
          <Button variant="outline">
            Ubah Password
          </Button>
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

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const { showSuccess, showError } = useToast();
  const { user } = useApp();

  useEffect(() => {
    // Load orders dari Firebase
    const loadOrders = async () => {
      if (!user) return;
      
      try {
        const userOrders = await orderService.getUserOrders(user.uid);
        setOrders(userOrders);
      } catch (error: any) {
        showError('Gagal memuat data pesanan');
      }
    };

    loadOrders();
  }, [user]);

  const handleDownloadInvoice = (order: any) => {
    const invoiceData: InvoiceData = {
      orderId: order.orderId,
      serviceName: order.serviceName,
      providerName: order.providerName,
      date: order.date,
      time: order.time,
      address: order.address,
      note: order.note,
      paymentMethod: order.paymentMethod,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    };
    
    PDFInvoiceGenerator.generateInvoice(invoiceData);
    showSuccess('Invoice berhasil diunduh');
  };

  const handleViewInvoice = (order: any) => {
    const invoiceData: InvoiceData = {
      orderId: order.orderId,
      serviceName: order.serviceName,
      providerName: order.providerName,
      date: order.date,
      time: order.time,
      address: order.address,
      note: order.note,
      paymentMethod: order.paymentMethod,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    };
    
    PDFInvoiceGenerator.generateInvoiceAndOpen(invoiceData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Lunas':
        return 'bg-green-100 text-green-800';
      case 'Menunggu Pembayaran':
        return 'bg-yellow-100 text-yellow-800';
      case 'Diproses':
        return 'bg-blue-100 text-blue-800';
      case 'Selesai':
        return 'bg-gray-100 text-gray-800';
      case 'Dibatalkan':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Pesanan Saya</h2>
        <div className="text-center py-12">
          <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Belum ada pesanan</h3>
          <p className="text-gray-500 mb-6">Anda belum memiliki pesanan apapun. Mulai pesan layanan kesehatan tradisional sekarang!</p>
          <Link to="/services" className="btn btn-primary">
            Lihat Layanan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Pesanan Saya</h2>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">#{order.orderId}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900">{order.serviceName}</h3>
                <p className="text-gray-600 text-sm">
                  {order.providerName && `${order.providerName} • `}
                  {order.date} {order.time && `• ${order.time}`}
                </p>
              </div>
              
              <div className="text-lg font-semibold text-primary-700">
                Rp{order.total.toLocaleString('id-ID')}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleViewInvoice(order)}
              >
                <Eye size={16} />
                Lihat Invoice
              </Button>
              
              <Button
                size="sm"
                onClick={() => handleDownloadInvoice(order)}
              >
                <Download size={16} />
                Download PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountPage;