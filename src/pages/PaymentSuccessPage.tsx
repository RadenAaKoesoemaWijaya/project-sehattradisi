import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PDFInvoiceGenerator, InvoiceData } from '../utils/pdfInvoice';
import orderService from '../services/orderService';
import Button from '../components/common/Button';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useApp();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('order_id');

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId || !user) {
        navigate('/account');
        return;
      }

      try {
        const userOrders = await orderService.getUserOrders(user.uid);
        const foundOrder = userOrders.find(o => o.orderId === orderId);
        setOrder(foundOrder);
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, user, navigate]);

  const handleDownloadInvoice = () => {
    if (!order) return;

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
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data pesanan...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-semibold mb-4">Pesanan tidak ditemukan</h2>
          <Button onClick={() => navigate('/account')}>
            Kembali ke Akun
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h1>
            <p className="text-gray-600 mb-6">
              Terima kasih telah melakukan pemesanan. Pesanan Anda telah dikonfirmasi.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <strong>ID Pesanan:</strong> {order.orderId}
              </p>
              <p className="text-sm text-green-800">
                <strong>Status:</strong> {order.status}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Detail Pesanan</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Layanan:</span>
                <span className="font-medium">{order.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium">{order.providerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal:</span>
                <span className="font-medium">{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Waktu:</span>
                <span className="font-medium">{order.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Metode Pembayaran:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-primary-600">
                    Rp{order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleDownloadInvoice}
              variant="outline"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
            <Button 
              onClick={() => navigate('/account')}
              className="flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Akun
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
