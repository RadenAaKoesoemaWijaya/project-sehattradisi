import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, MapPin, CreditCard, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const BookingPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { services, providers, cart, clearCart, isLoggedIn } = useApp();
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const service = services.find((s) => s.id === serviceId);
  
  const provider = providers.find((p) => p.id === cart?.providerId);
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/account');
    }
  }, [isLoggedIn, navigate]);
  
  // Redirect if no item in cart
  React.useEffect(() => {
    if (!cart && !isSuccess) {
      navigate('/services');
    }
  }, [cart, navigate, isSuccess]);
  
  if (!service || (!cart && !isSuccess)) {
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod || !address) {
      alert('Silakan lengkapi semua data yang diperlukan');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };
  
  if (isSuccess) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Pemesanan Berhasil!</h1>
            <p className="text-gray-600 mb-6">
              Terima kasih atas pesanan Anda. Kami telah mengirimkan detail pesanan ke email Anda.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Detail Pesanan:</h3>
              <p className="text-gray-600">ID Pesanan: #ORD{Math.floor(100000 + Math.random() * 900000)}</p>
              <p className="text-gray-600">Layanan: {service.name}</p>
              {service.category !== 'herbal' && (
                <>
                  <p className="text-gray-600">Terapis: {provider?.name}</p>
                  <p className="text-gray-600">Tanggal: {new Date(cart?.date || '').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p className="text-gray-600">Waktu: {cart?.time}</p>
                </>
              )}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/')}
                className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 flex-1"
              >
                Kembali ke Beranda
              </button>
              <button
                onClick={() => navigate('/account')}
                className="btn btn-primary flex-1"
              >
                Lihat Pesanan Saya
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Detail Pemesanan</h2>
              
              {service.category !== 'herbal' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4">
                    <Calendar size={20} className="text-primary-700 mt-1" />
                    <div>
                      <h3 className="font-medium">Tanggal</h3>
                      <p>{new Date(cart?.date || '').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock size={20} className="text-primary-700 mt-1" />
                    <div>
                      <h3 className="font-medium">Waktu</h3>
                      <p>{cart?.time} WIB</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <User size={20} className="text-primary-700 mt-1" />
                    <div>
                      <h3 className="font-medium">Terapis</h3>
                      <p>{provider?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock size={20} className="text-primary-700 mt-1" />
                    <div>
                      <h3 className="font-medium">Durasi</h3>
                      <p>{service.duration} menit</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-gray-600">Produk akan dikirim ke alamat Anda</p>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Alamat</h2>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 mb-2">
                    Alamat Lengkap
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    placeholder="Masukkan alamat lengkap Anda"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="note" className="block text-gray-700 mb-2">
                    Catatan (opsional)
                  </label>
                  <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={2}
                    placeholder="Tambahkan catatan khusus jika diperlukan"
                  ></textarea>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="mr-3"
                      required
                    />
                    <span>Transfer Bank</span>
                  </label>
                  
                  <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="e_wallet"
                      checked={paymentMethod === 'e_wallet'}
                      onChange={() => setPaymentMethod('e_wallet')}
                      className="mr-3"
                    />
                    <span>E-Wallet</span>
                  </label>
                  
                  <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="mr-3"
                    />
                    <span>Tunai di Tempat</span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full py-3 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    <span>Selesaikan Pembayaran</span>
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
              
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Layanan</span>
                  <span>{service.name}</span>
                </div>
                
                {service.category !== 'herbal' && (
                  <div className="flex justify-between mb-2">
                    <span>Terapis</span>
                    <span>{provider?.name}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Harga</span>
                  <span>Rp{service.price.toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Biaya Admin</span>
                  <span>Rp5.000</span>
                </div>
              </div>
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rp{(service.price + 5000).toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;