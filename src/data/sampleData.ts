import { ServiceType, ProviderType, ReviewType } from '../types';

export const services: ServiceType[] = [
  // Pijat Tradisional
  {
    id: 'service-1',
    name: 'Pijat Tradisional Express',
    category: 'massage',
    description: 'Pijat tradisional singkat yang berfokus pada area-area utama untuk meredakan ketegangan otot. Cocok untuk yang memiliki waktu terbatas.',
    shortDescription: 'Pijat singkat untuk area utama',
    price: 100000,
    duration: 30,
    image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg',
    rating: 4.7,
    reviewCount: 89,
    benefits: [
      'Meredakan ketegangan otot',
      'Meningkatkan sirkulasi darah',
      'Mengurangi stres',
      'Cocok untuk jadwal padat'
    ]
  },
  {
    id: 'service-2',
    name: 'Pijat Tradisional Reguler',
    category: 'massage',
    description: 'Pijat tradisional dengan durasi standar yang mencakup seluruh tubuh. Menggunakan teknik turun-temurun untuk meredakan ketegangan dan meningkatkan kesehatan.',
    shortDescription: 'Pijat menyeluruh dengan teknik tradisional',
    price: 150000,
    duration: 60,
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
    rating: 4.8,
    reviewCount: 156,
    benefits: [
      'Pijat seluruh tubuh',
      'Meredakan nyeri otot',
      'Meningkatkan sirkulasi',
      'Relaksasi menyeluruh'
    ]
  },
  {
    id: 'service-3',
    name: 'Pijat Tradisional Premium',
    category: 'massage',
    description: 'Pengalaman pijat tradisional lengkap dengan durasi lebih lama, termasuk perawatan tambahan seperti kompres hangat dan aromaterapi.',
    shortDescription: 'Pijat premium dengan perawatan tambahan',
    price: 250000,
    duration: 90,
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg',
    rating: 4.9,
    reviewCount: 92,
    benefits: [
      'Pijat intensif menyeluruh',
      'Kompres hangat',
      'Aromaterapi',
      'Relaksasi mendalam'
    ]
  },

  // Spa & Lulur
  {
    id: 'service-4',
    name: 'Lulur Spa Express',
    category: 'spa',
    description: 'Perawatan lulur singkat untuk membersihkan dan mengangkat sel kulit mati. Cocok untuk perawatan kilat di sela kesibukan.',
    shortDescription: 'Lulur singkat untuk kulit cerah',
    price: 150000,
    duration: 45,
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg',
    rating: 4.6,
    reviewCount: 67,
    benefits: [
      'Mengangkat sel kulit mati',
      'Mencerahkan kulit',
      'Membersihkan kulit',
      'Perawatan cepat'
    ]
  },
  {
    id: 'service-5',
    name: 'Lulur Spa Tradisional',
    category: 'spa',
    description: 'Perawatan lulur tradisional lengkap dengan bahan-bahan alami pilihan. Termasuk pijatan ringan untuk relaksasi.',
    shortDescription: 'Lulur tradisional dengan bahan alami',
    price: 250000,
    duration: 90,
    image: 'https://images.pexels.com/photos/3212164/pexels-photo-3212164.jpeg',
    rating: 4.8,
    reviewCount: 124,
    benefits: [
      'Lulur tradisional',
      'Pijatan ringan',
      'Mencerahkan kulit',
      'Relaksasi menyeluruh'
    ]
  },
  {
    id: 'service-6',
    name: 'Lulur Spa Premium',
    category: 'spa',
    description: 'Pengalaman spa mewah dengan lulur premium, masker tubuh, dan ritual mandi bunga. Termasuk pijatan relaksasi dan perawatan wajah.',
    shortDescription: 'Perawatan spa mewah lengkap',
    price: 400000,
    duration: 120,
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg',
    rating: 4.9,
    reviewCount: 83,
    benefits: [
      'Lulur premium',
      'Masker tubuh',
      'Mandi bunga',
      'Pijatan relaksasi',
      'Perawatan wajah'
    ]
  },

  // Jamu & Herbal
  {
    id: 'service-7',
    name: 'Paket Jamu Harian',
    category: 'herbal',
    description: 'Paket jamu segar untuk konsumsi harian, terdiri dari kunyit asam, beras kencur, dan temulawak. Dikirim fresh setiap hari.',
    shortDescription: 'Jamu segar untuk konsumsi harian',
    price: 25000,
    duration: 0,
    image: 'https://images.pexels.com/photos/5501130/pexels-photo-5501130.jpeg',
    rating: 4.7,
    reviewCount: 178,
    benefits: [
      'Jamu segar setiap hari',
      'Meningkatkan imunitas',
      'Menjaga kesehatan',
      'Pengiriman pagi hari'
    ]
  },
  {
    id: 'service-8',
    name: 'Paket Jamu Mingguan',
    category: 'herbal',
    description: 'Paket jamu lengkap untuk persediaan satu minggu. Termasuk berbagai varian jamu dan panduan konsumsi.',
    shortDescription: 'Paket jamu untuk satu minggu',
    price: 150000,
    duration: 0,
    image: 'https://images.pexels.com/photos/5501131/pexels-photo-5501131.jpeg',
    rating: 4.8,
    reviewCount: 92,
    benefits: [
      'Persediaan 1 minggu',
      'Variasi jamu lengkap',
      'Panduan konsumsi',
      'Hemat biaya'
    ]
  },
  {
    id: 'service-9',
    name: 'Paket Jamu Bulanan',
    category: 'herbal',
    description: 'Paket jamu premium untuk persediaan satu bulan. Termasuk jamu spesial, suplemen herbal, dan konsultasi dengan ahli herbal.',
    shortDescription: 'Paket jamu premium bulanan',
    price: 500000,
    duration: 0,
    image: 'https://images.pexels.com/photos/5501132/pexels-photo-5501132.jpeg',
    rating: 4.9,
    reviewCount: 45,
    benefits: [
      'Persediaan 1 bulan',
      'Jamu premium',
      'Suplemen herbal',
      'Konsultasi ahli',
      'Pengiriman terjadwal'
    ]
  }
];

// Paket Hemat
export const packages = [
  {
    id: 'package-1',
    name: 'Paket Relaksasi Dasar',
    description: 'Kombinasi pijat tradisional express dan jamu harian untuk relaksasi dan kesehatan optimal.',
    services: ['service-1', 'service-7'],
    price: 115000, // Diskon 10000
    duration: 30,
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
    benefits: [
      'Pijat express 30 menit',
      'Jamu segar harian',
      'Hemat Rp10.000'
    ]
  },
  {
    id: 'package-2',
    name: 'Paket Sehat Menyeluruh',
    description: 'Paket lengkap dengan pijat tradisional reguler, lulur spa express, dan paket jamu mingguan.',
    services: ['service-2', 'service-4', 'service-8'],
    price: 500000, // Diskon 50000
    duration: 105,
    image: 'https://images.pexels.com/photos/3212164/pexels-photo-3212164.jpeg',
    benefits: [
      'Pijat tradisional 60 menit',
      'Lulur spa 45 menit',
      'Paket jamu 1 minggu',
      'Hemat Rp50.000'
    ]
  },
  {
    id: 'package-3',
    name: 'Paket Premium Spa & Kesehatan',
    description: 'Pengalaman spa premium lengkap dengan pijat tradisional premium, lulur spa premium, dan paket jamu bulanan.',
    services: ['service-3', 'service-6', 'service-9'],
    price: 1000000, // Diskon 150000
    duration: 210,
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg',
    benefits: [
      'Pijat premium 90 menit',
      'Lulur spa premium 120 menit',
      'Paket jamu premium 1 bulan',
      'Hemat Rp150.000',
      'Konsultasi ahli gratis'
    ]
  }
];

export const providers: ProviderType[] = [
  {
    id: 'provider-1',
    name: 'Ibu Wati',
    specialties: ['massage', 'spa'],
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg',
    description: 'Ibu Wati adalah terapis dengan pengalaman lebih dari 15 tahun dalam bidang pijat tradisional dan perawatan spa. Beliau mempelajari teknik pijat langsung dari ahli pijat terkenal di Jawa dan telah melayani ribuan klien dengan hasil yang memuaskan.',
    rating: 4.9,
    reviewCount: 142,
    experience: 15,
    availableServices: ['service-1', 'service-2', 'service-3', 'service-4', 'service-5', 'service-6'],
    location: 'Jakarta Selatan'
  },
  {
    id: 'provider-2',
    name: 'Pak Dimas',
    specialties: ['massage', 'herbal'],
    image: 'https://images.pexels.com/photos/5792986/pexels-photo-5792986.jpeg',
    description: 'Pak Dimas adalah ahli pijat refleksi dan juga memiliki pengetahuan mendalam tentang ramuan herbal tradisional. Dengan pengalaman 10 tahun, Pak Dimas menggabungkan teknik pijat dengan pengetahuan herbal untuk memberikan perawatan yang holistik.',
    rating: 4.8,
    reviewCount: 98,
    experience: 10,
    availableServices: ['service-1', 'service-2', 'service-7', 'service-8', 'service-9'],
    location: 'Bandung'
  },
  {
    id: 'provider-3',
    name: 'Ibu Ningsih',
    specialties: ['spa', 'herbal'],
    image: 'https://images.pexels.com/photos/5324930/pexels-photo-5324930.jpeg',
    description: 'Ibu Ningsih adalah pakar perawatan spa tradisional dan jamu herbal dengan pengalaman 12 tahun. Beliau memiliki sertifikasi dalam pengolahan jamu tradisional dan menerapkan pengetahuan turun-temurun dalam setiap perawatannya.',
    rating: 4.7,
    reviewCount: 112,
    experience: 12,
    availableServices: ['service-4', 'service-5', 'service-6', 'service-7', 'service-8', 'service-9'],
    location: 'Yogyakarta'
  }
];

export const reviews: ReviewType[] = [
  {
    id: 'review-1',
    providerId: 'provider-1',
    userId: 'user-1',
    userName: 'Budi Santoso',
    userImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 5,
    comment: 'Pijatan Ibu Wati sangat membantu meredakan sakit punggung saya yang sudah kronis. Tekniknya tepat dan profesional.',
    date: '2023-09-15'
  },
  {
    id: 'review-2',
    providerId: 'provider-1',
    userId: 'user-2',
    userName: 'Siti Rahma',
    userImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    rating: 4,
    comment: 'Perawatan lulur spa dari Ibu Wati membuat kulit saya terasa lebih lembut dan cerah. Sangat menyenangkan dan rileks.',
    date: '2023-10-02'
  },
  {
    id: 'review-3',
    providerId: 'provider-2',
    userId: 'user-3',
    userName: 'Agus Wijaya',
    userImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    rating: 5,
    comment: 'Pak Dimas memiliki pengetahuan yang luar biasa tentang titik refleksi. Setelah sesi pijat, kaki saya terasa ringan dan tubuh lebih berenergi.',
    date: '2023-09-25'
  },
  {
    id: 'review-4',
    providerId: 'provider-3',
    userId: 'user-4',
    userName: 'Dewi Anggraini',
    userImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 5,
    comment: 'Jamu buatan Ibu Ningsih rasanya pas dan khasiatnya terasa. Sudah langganan hampir setahun dan selalu puas dengan layanannya.',
    date: '2023-10-10'
  }
];