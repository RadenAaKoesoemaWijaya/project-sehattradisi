export type ServiceType = {
  id: string;
  name: string;
  category: 'massage' | 'spa' | 'herbal';
  description: string;
  shortDescription: string;
  price: number;
  duration: number;
  image: string;
  rating: number;
  reviewCount: number;
  benefits: string[];
};

export type PackageType = {
  id: string;
  name: string;
  description: string;
  services: string[];
  price: number;
  duration: number;
  image: string;
  benefits: string[];
};

export type ProviderType = {
  id: string;
  name: string;
  specialties: ('massage' | 'spa' | 'herbal')[];
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  experience: number;
  availableServices: string[];
  location: string;
};

export type ReviewType = {
  id: string;
  providerId: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
};

export type ChatMessageType = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
};

export type CartItemType = {
  id: string;
  serviceId: string;
  providerId?: string;
  date?: string;
  time?: string;
  price: number;
  quantity: number;
};

export type PaymentMethod = 'bank_transfer' | 'e_wallet' | 'cash' | 'qris';

export type OrderType = {
  orderId: string;
  serviceId: string;
  serviceName: string;
  providerId?: string;
  providerName?: string;
  date: string;
  time: string;
  address: string;
  note?: string;
  paymentMethod: PaymentMethod;
  total: number;
  status: 'Menunggu Pembayaran' | 'Lunas' | 'Diproses' | 'Selesai' | 'Dibatalkan';
  createdAt: string;
};

export type InvoiceData = {
  orderId: string;
  serviceName: string;
  providerName?: string;
  date: string;
  time: string;
  address: string;
  note?: string;
  paymentMethod: string;
  total: number;
  status: string;
  createdAt: string;
};