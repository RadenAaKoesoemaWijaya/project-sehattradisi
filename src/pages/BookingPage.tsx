import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Check, Printer, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../hooks/useToast';
import { validateCheckout } from '../utils/validation';
import { PDFInvoiceGenerator, InvoiceData } from '../utils/pdfInvoice';
import Button from '../components/common/Button';
import orderService from '../services/orderService';
import paymentService from '../services/paymentService';

// Helper untuk generate invoice (legacy - keep for compatibility)
const generateInvoice = (order: any) => {
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

const BookingPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  // Hapus setCart jika tidak ada di context
  const { services, providers, cart, clearCart, isLoggedIn, user } = useApp();
  const { showSuccess, showError, showInfo } = useToast();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Ambil data cart dari localStorage jika ada
  React.useEffect(() => {
    // Jika context tidak punya setCart, cukup biarkan cart dari context
    // atau tambahkan logika pengambilan cart di context
  }, []);

  // Ambil data pesanan yang sudah dibayar dari localStorage
  const getPaidOrders = () => {
    try {
      return JSON.parse(localStorage.getItem('user_orders') || '[]');
    } catch {
      return [];
    }
  };

  const service = services.find((s) => s.id === serviceId);
  const cartItems = Array.isArray(cart) ? cart : cart ? [cart] : [];
  const cartItem = cartItems[0];
  const provider = providers.find((p) => p.id === cartItem?.providerId);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/account');
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    if ((!cartItems.length) && !isSuccess) {
      navigate('/services');
    }
  }, [cartItems, navigate, isSuccess]);

  if (!service || (!cartItems.length && !isSuccess)) {
    return null;
  }

  // Handler submit pembayaran
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateCheckout({
      address,
      paymentMethod,
      date: cartItem?.date,
      time: cartItem?.time
    });
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (!user) {
      showError('Silakan login terlebih dahulu');
      navigate('/account');
      return;
    }

    setIsSubmitting(true);

    try {
      // Loop semua item di cartItems dan simpan ke Firebase
      for (const item of cartItems) {
        const newOrderId = orderService.generateOrderId();
        const orderData = {
          userId: user.uid,
          orderId: newOrderId,
          serviceId: item.serviceId,
          serviceName: services.find(s => s.id === item.serviceId)?.name || '',
          providerId: item.providerId,
          providerName: providers.find(p => p.id === item.providerId)?.name || '',
          date: item.date
            ? new Date(item.date).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : '-',
          time: item.time || '-',
          address,
          note,
          paymentMethod,
          total: item.price + 5000,
          status: (paymentMethod === 'bank_transfer' ? 'Menunggu Pembayaran' : 'Lunas') as 'Menunggu Pembayaran' | 'Lunas' | 'Diproses' | 'Selesai' | 'Dibatalkan'
        };

        await orderService.createOrder(orderData);

        // Simpan orderId terakhir untuk tampilan sukses
        setOrderId(newOrderId);
      }

      setIsSuccess(true);
      clearCart();
      localStorage.removeItem('cart');
      
      showSuccess('Pemesanan berhasil!');

      // Handle payment based on method
      if (paymentMethod === 'bank_transfer' && cartItems.length) {
        // Process bank transfer
        await paymentService.createBankTransferOrder(orderId!);
        setTimeout(() => {
          showInfo('Invoice pembayaran akan segera muncul');
          // Cetak invoice untuk pesanan terakhir
          const lastOrder = {
            orderId,
            serviceId: cartItem?.serviceId,
            serviceName: service.name,
            providerId: cartItem?.providerId,
            providerName: provider?.name,
            date: cartItem?.date
              ? new Date(cartItem.date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : '-',
            time: cartItem?.time || '-',
            address,
            note,
            paymentMethod,
            total: cartItem?.price + 5000,
            status: 'Menunggu Pembayaran',
            createdAt: new Date().toISOString(),
          };
          generateInvoice(lastOrder);
        }, 500);
      } else if (paymentMethod === 'credit_card' && cartItems.length) {
        // Process credit card payment with Midtrans
        const paymentDetails = {
          orderId: orderId!,
          grossAmount: cartItem!.price + 5000,
          customerDetails: {
            firstName: user?.displayName?.split(' ')[0] || 'User',
            lastName: user?.displayName?.split(' ')[1] || '',
            email: user?.email || '',
            phone: '' // Would need to get from user profile
          },
          itemDetails: [{
            id: cartItem!.serviceId,
            name: service.name,
            price: cartItem!.price + 5000,
            quantity: 1
          }]
        };

        await paymentService.processPayment(orderId!, paymentDetails);
      }
    } catch (err) {
      showError('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render halaman sukses setelah pembayaran
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
              <p className="text-gray-600">ID Pesanan: #ORD{orderId}</p>
              <p className="text-gray-600">Layanan: {service.name}</p>
              {service.category !== 'herbal' && (
                <>
                  <p className="text-gray-600">Terapis: {provider?.name}</p>
                  <p className="text-gray-600">Tanggal: {cartItem?.date ? new Date(cartItem.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</p>
                  <p className="text-gray-600">Waktu: {cartItem?.time}</p>
                </>
              )}
              <p className="text-gray-600">Metode Pembayaran: {paymentMethod === 'bank_transfer' ? 'Transfer Bank' : paymentMethod === 'e_wallet' ? 'E-Wallet' : 'Tunai di Tempat'}</p>
              <p className="text-gray-600 font-semibold">Total: Rp{(service.price + 5000).toLocaleString('id-ID')}</p>
            </div>

            {paymentMethod === 'bank_transfer' && (
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    const userOrders = getPaidOrders();
                    const orderData = userOrders.find((o: any) => o.orderId === orderId);
                    if (orderData) generateInvoice(orderData);
                  }}
                  className="w-full"
                  variant="outline"
                >
                  <Printer size={18} /> Cetak Invoice
                </Button>
                <Button
                  onClick={() => {
                    const userOrders = getPaidOrders();
                    const orderData = userOrders.find((o: any) => o.orderId === orderId);
                    if (orderData) {
                      const invoiceData: InvoiceData = {
                        orderId: orderData.orderId,
                        serviceName: orderData.serviceName,
                        providerName: orderData.providerName,
                        date: orderData.date,
                        time: orderData.time,
                        address: orderData.address,
                        note: orderData.note,
                        paymentMethod: orderData.paymentMethod,
                        total: orderData.total,
                        status: orderData.status,
                        createdAt: orderData.createdAt,
                      };
                      PDFInvoiceGenerator.generateInvoice(invoiceData);
                    }
                  }}
                  className="w-full"
                  variant="primary"
                >
                  <Download size={18} /> Download PDF
                </Button>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/')}
                variant="secondary"
                className="flex-1"
              >
                Kembali ke Beranda
              </Button>
              <Button
                onClick={() => navigate('/account')}
                className="flex-1"
              >
                Lihat Pesanan Saya
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render halaman checkout (dari cart)
  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Detail Pemesanan</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Daftar Layanan di Keranjang</h2>
                {cartItems.map((item) => {
                  const service = services.find(s => s.id === item.serviceId);
                  const provider = providers.find(p => p.id === item.providerId);
                  return (
                    <div key={item.id} className="mb-4 p-4 border rounded">
                      <div><b>Layanan:</b> {service?.name}</div>
                      <div><b>Terapis:</b> {provider?.name}</div>
                      <div><b>Tanggal:</b> {item.date} <b>Waktu:</b> {item.time}</div>
                      <div><b>Harga:</b> Rp{item.price.toLocaleString('id-ID')}</div>
                    </div>
                  );
                })}
              </div>
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
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                    }}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows={3}
                    placeholder="Masukkan alamat lengkap Anda"
                  ></textarea>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
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
                  <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50 ${
                    errors.paymentMethod ? 'border-red-300' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => {
                        setPaymentMethod('bank_transfer');
                        if (errors.paymentMethod) setErrors(prev => ({ ...prev, paymentMethod: '' }));
                      }}
                      className="mr-3"
                    />
                    <span>Transfer Bank</span>
                  </label>
                  <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50 ${
                    errors.paymentMethod ? 'border-red-300' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="e_wallet"
                      checked={paymentMethod === 'e_wallet'}
                      onChange={() => {
                        setPaymentMethod('e_wallet');
                        if (errors.paymentMethod) setErrors(prev => ({ ...prev, paymentMethod: '' }));
                      }}
                      className="mr-3"
                    />
                    <span>E-Wallet</span>
                  </label>
                  <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50 ${
                    errors.paymentMethod ? 'border-red-300' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => {
                        setPaymentMethod('cash');
                        if (errors.paymentMethod) setErrors(prev => ({ ...prev, paymentMethod: '' }));
                      }}
                      className="mr-3"
                    />
                    <span>Tunai di Tempat</span>
                  </label>
                  {errors.paymentMethod && (
                    <p className="mt-2 text-sm text-red-600">{errors.paymentMethod}</p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                loading={isSubmitting}
                loadingText="Memproses Pembayaran..."
                className="w-full py-3"
              >
                <CreditCard size={20} />
                Selesaikan Pembayaran
              </Button>
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