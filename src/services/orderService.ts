import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  doc, 
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Order {
  id?: string;
  userId: string;
  orderId: string;
  serviceId: string;
  serviceName: string;
  providerId?: string;
  providerName?: string;
  date: string;
  time: string;
  address: string;
  note?: string;
  paymentMethod: string;
  total: number;
  status: 'Menunggu Pembayaran' | 'Lunas' | 'Diproses' | 'Selesai' | 'Dibatalkan';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

class OrderService {
  private readonly collectionName = 'orders';

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const orderWithTimestamp = {
        ...orderData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, this.collectionName), orderWithTimestamp);
      return docRef.id;
    } catch (error: any) {
      throw new Error('Gagal membuat pesanan. Silakan coba lagi.');
    }
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const orders: Order[] = [];

      querySnapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data()
        } as Order);
      });

      return orders;
    } catch (error: any) {
      throw new Error('Gagal memuat data pesanan.');
    }
  }

  async updateOrderStatus(orderId: string, status: Order['status']) {
    try {
      const orderRef = doc(db, this.collectionName, orderId);
      await updateDoc(orderRef, {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error: any) {
      throw new Error('Gagal memperbarui status pesanan.');
    }
  }

  async updateOrder(orderId: string, data: Partial<Order>) {
    try {
      const orderRef = doc(db, this.collectionName, orderId);
      await updateDoc(orderRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (error: any) {
      throw new Error('Gagal memperbarui pesanan.');
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const orders: Order[] = [];

      querySnapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data()
        } as Order);
      });

      return orders;
    } catch (error: any) {
      throw new Error('Gagal memuat semua pesanan.');
    }
  }

  generateOrderId(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp}-${random}`;
  }
}

export default new OrderService();
