import { MidtransClient } from 'midtrans-client';
import orderService from './orderService';

// Midtrans configuration
const midtransConfig = {
  isProduction: false, // Set to true for production
  serverKey: 'SB-Mid-server-YOUR_SERVER_KEY', // Replace with actual server key
  clientKey: 'SB-Mid-client-YOUR_CLIENT_KEY' // Replace with actual client key
};

export interface PaymentDetails {
  orderId: string;
  grossAmount: number;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  itemDetails: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

class PaymentService {
  private snap: any;

  constructor() {
    // Initialize Midtrans Snap
    this.snap = new MidtransClient.Snap({
      isProduction: midtransConfig.isProduction,
      serverKey: midtransConfig.serverKey,
      clientKey: midtransConfig.clientKey
    });
  }

  async createPaymentToken(paymentDetails: PaymentDetails) {
    try {
      const parameter = {
        transaction_details: {
          order_id: paymentDetails.orderId,
          gross_amount: paymentDetails.grossAmount
        },
        customer_details: paymentDetails.customerDetails,
        item_details: paymentDetails.itemDetails,
        callbacks: {
          finish: `${window.location.origin}/payment/finish`,
          error: `${window.location.origin}/payment/error`,
          pending: `${window.location.origin}/payment/pending`
        }
      };

      const transaction = await this.snap.createTransaction(parameter);
      return transaction.token;
    } catch (error: any) {
      throw new Error('Gagal membuat token pembayaran. Silakan coba lagi.');
    }
  }

  async processPayment(orderId: string, paymentDetails: PaymentDetails) {
    try {
      // Create payment token
      const token = await this.createPaymentToken(paymentDetails);

      // Update order status to pending
      await orderService.updateOrderStatus(orderId, 'Menunggu Pembayaran');

      // Open Midtrans Snap popup
      window.snap.pay(token, {
        onSuccess: async (result: any) => {
          await this.handlePaymentSuccess(orderId, result);
        },
        onPending: async (result: any) => {
          await this.handlePaymentPending(orderId, result);
        },
        onError: async (result: any) => {
          await this.handlePaymentError(orderId, result);
        },
        onClose: () => {
          console.log('Customer closed the payment popup');
        }
      });

      return token;
    } catch (error: any) {
      throw error;
    }
  }

  private async handlePaymentSuccess(orderId: string, _result: any) {
    try {
      await orderService.updateOrderStatus(orderId, 'Lunas');
      window.location.href = `/booking/success?order_id=${orderId}`;
    } catch (error) {
      console.error('Error handling payment success:', error);
    }
  }

  private async handlePaymentPending(orderId: string, _result: any) {
    try {
      await orderService.updateOrderStatus(orderId, 'Menunggu Pembayaran');
      window.location.href = `/booking/pending?order_id=${orderId}`;
    } catch (error) {
      console.error('Error handling payment pending:', error);
    }
  }

  private async handlePaymentError(orderId: string, _result: any) {
    try {
      await orderService.updateOrderStatus(orderId, 'Dibatalkan');
      window.location.href = `/booking/error?order_id=${orderId}`;
    } catch (error) {
      console.error('Error handling payment error:', error);
    }
  }

  // For bank transfer payments that don't need gateway
  async createBankTransferOrder(orderId: string) {
    try {
      await orderService.updateOrderStatus(orderId, 'Menunggu Pembayaran');
      return { success: true, message: 'Pesanan berhasil dibuat. Silakan transfer ke rekening yang tersedia.' };
    } catch (error: any) {
      throw new Error('Gagal membuat pesanan transfer bank.');
    }
  }

  // Check payment status
  async checkPaymentStatus(orderId: string) {
    try {
      // This would typically call Midtrans API to check status
      // For now, we'll just get the order from our database
      const orders = await orderService.getUserOrders('current_user'); // This would need actual user ID
      const order = orders.find(o => o.orderId === orderId);
      return order?.status || 'Unknown';
    } catch (error) {
      throw new Error('Gagal mengecek status pembayaran.');
    }
  }
}

export default new PaymentService();
