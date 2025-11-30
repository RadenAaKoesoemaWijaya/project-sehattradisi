// Sample data for development
export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
  providerId: string;
}

export interface ProviderType {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
  location: string;
  availableServices: string[];
  experience: string;
  specialties: string[];
}

export interface ReviewType {
  id: string;
  providerId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const services: ServiceType[] = [
  {
    id: 'service-1',
    name: 'Pijat Tradisional Bali',
    description: 'Pijat khas Bali dengan teknik aromaterapi untuk relaksasi total',
    price: 150000,
    duration: 60,
    category: 'Massage',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
    providerId: 'provider-1'
  },
  {
    id: 'service-2',
    name: 'Refleksi Kaki',
    description: 'Terapi refleksi pada titik-titik kaki untuk kesehatan tubuh',
    price: 120000,
    duration: 45,
    category: 'Reflexology',
    image: 'https://images.pexels.com/photos/6663467/pexels-photo-6663467.jpeg',
    providerId: 'provider-1'
  },
  {
    id: 'service-3',
    name: 'Jamu Herbal Therapy',
    description: 'Konsultasi dan terapi jamu tradisional untuk kesehatan',
    price: 100000,
    duration: 30,
    category: 'Herbal',
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg',
    providerId: 'provider-2'
  },
  {
    id: 'service-4',
    name: 'Lulur Scrub',
    description: 'Eksfoliasi dengan lulur tradisional untuk kulit halus',
    price: 180000,
    duration: 90,
    category: 'Spa',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
    providerId: 'provider-2'
  },
  {
    id: 'service-5',
    name: 'Bekam Therapy',
    description: 'Terapi bekam untuk mengeluarkan angin dan racun dari tubuh',
    price: 200000,
    duration: 60,
    category: 'Therapy',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
    providerId: 'provider-3'
  }
];

export const providers: ProviderType[] = [
  {
    id: 'provider-1',
    name: 'Dewi Spa Center',
    description: 'Spa tradisional dengan tenaga terapis berpengalaman lebih dari 10 tahun',
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
    location: 'Jakarta Selatan',
    availableServices: ['service-1', 'service-2'],
    experience: '10+ tahun',
    specialties: ['Pijat Bali', 'Refleksi', 'Aromaterapi']
  },
  {
    id: 'provider-2',
    name: 'Jamu Sehat Tradisional',
    description: 'Klinik jamu tradisional dengan resep turun temurun',
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.pexels.com/photos/6663467/pexels-photo-6663467.jpeg',
    location: 'Jakarta Pusat',
    availableServices: ['service-3', 'service-4'],
    experience: '15+ tahun',
    specialties: ['Jamu Herbal', 'Lulur Tradisional', 'Konsultasi Kesehatan']
  },
  {
    id: 'provider-3',
    name: 'Pak Haji Bekam Center',
    description: 'Pusat terapi bekam dengan metode steril dan aman',
    rating: 4.9,
    reviewCount: 234,
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg',
    location: 'Jakarta Barat',
    availableServices: ['service-5'],
    experience: '8+ tahun',
    specialties: ['Bekam Kering', 'Bekam Basah', 'Gurah']
  }
];

export const reviews: ReviewType[] = [
  {
    id: 'review-1',
    providerId: 'provider-1',
    userName: 'Andi Pratama',
    rating: 5,
    comment: 'Pijatnya sangat menyegarkan, terapisnya profesional dan ramah.',
    date: '2024-01-15'
  },
  {
    id: 'review-2',
    providerId: 'provider-1',
    userName: 'Siti Nurhaliza',
    rating: 4,
    comment: 'Saya suka aromaterapinya, tapi tempatnya agak kecil.',
    date: '2024-01-10'
  },
  {
    id: 'review-3',
    providerId: 'provider-2',
    userName: 'Budi Santoso',
    rating: 5,
    comment: 'Jamunya sangat manjur untuk stamina, pelayanan baik.',
    date: '2024-01-08'
  },
  {
    id: 'review-4',
    providerId: 'provider-3',
    userName: 'Rina Wulandari',
    rating: 5,
    comment: 'Bekamnya sangat membantu mengurangi pegal-pegal.',
    date: '2024-01-05'
  }
];
