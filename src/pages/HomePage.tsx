import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ArrowRight, ChevronRight, Package, Users, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
// Remove unused import
import ServiceCard from '../components/services/ServiceCard';
import ProviderCard from '../components/providers/ProviderCard';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import PersonalizedServices from '../components/recommendations/PersonalizedServices';
import RecommendedPackages from '../components/recommendations/RecommendedPackages';

const HomePage: React.FC = () => {
  const { services, providers, isLoggedIn } = useApp();
  
  // Get featured services (first 3)
  const featuredServices = services.slice(0, 3);
  
  // Get featured providers (all)
  const featuredProviders = providers;

  // Featured packages for non-logged in users
  const featuredPackages = [
    {
      name: 'Paket Relaksasi Lengkap',
      services: ['service-2', 'service-5'],
      price: 400000,
      image: 'https://images.pexels.com/photos/8450172/pexels-photo-8450172.jpeg' // Gambar kombinasi pijat dan spa
    },
    {
      name: 'Paket Kesehatan Tradisional',
      services: ['service-3', 'service-9'],
      price: 500000,
      image: 'https://images.pexels.com/photos/6663467/pexels-photo-6663467.jpeg' // Gambar kombinasi jamu herbal dan pijat
    },
    {
      name: 'Paket Spa Premium',
      services: ['service-6', 'service-4', 'service-5'],
      price: 750000,
      image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg' // Gambar pengalaman spa mewah
    }
  ];
    
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-secondary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Kesehatan Tradisional untuk Tubuh dan Jiwa
            </h1>
            <p className="text-lg mb-8 opacity-90">
              Nikmati layanan pijat, spa, dan jamu herbal tradisional langsung ke rumah Anda. Dibuat oleh ahli, untuk kesehatan optimal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="btn bg-white text-primary-700 hover:bg-gray-100 focus:ring-white px-6 py-3"
              >
                Jelajahi Layanan
              </Link>
              <Link
                to="/services"
                className="btn bg-transparent border border-white text-white hover:bg-white/10 focus:ring-white px-6 py-3"
              >
                Temukan Terapis
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-center">
                <div className="font-bold text-2xl">50+</div>
                <p className="text-sm opacity-90">Terapis Ahli</p>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="font-bold text-2xl">100+</div>
                <p className="text-sm opacity-90">Layanan</p>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl">5000+</div>
                <p className="text-sm opacity-90">Pelanggan Puas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations Section */}
      <PersonalizedServices />

      {/* Recommended Packages */}
      {isLoggedIn ? (
        <RecommendedPackages />
      ) : (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">Paket Layanan Populer</h2>
            <p className="text-gray-600 mb-8">Login untuk mendapatkan rekomendasi paket yang disesuaikan dengan preferensi Anda.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Tambahkan gambar ilustrasi paket */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary-700" />
                      </div>
                      <h3 className="text-lg font-semibold">{pkg.name}</h3>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {pkg.services.map((serviceId) => {
                        const service = services.find(s => s.id === serviceId);
                        if (!service) return null;
                        
                        return (
                          <div key={service.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={service.image}
                                alt={service.name}
                                className="h-12 w-12 rounded-md object-cover"
                              />
                              <div>
                                <h4 className="font-medium">{service.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {service.duration} menit
                                </p>
                              </div>
                            </div>
                            <span className="text-gray-600">
                              Rp{service.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Total</span>
                        <span className="text-xl font-semibold text-primary-700">
                          Rp{pkg.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      
                      <Link
                        to="/login"
                        className="btn btn-primary w-full flex items-center justify-center gap-2"
                      >
                        Login untuk Memesan <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Layanan Kesehatan Tradisional</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan berbagai layanan kesehatan tradisional yang dapat membantu Anda mencapai kesehatan dan kesejahteraan optimal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/services?category=massage" className="group">
              <div className="card h-full overflow-hidden hover:scale-[1.02] duration-300">
                <div className="relative h-64">
                  <img
                    src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg"
                    alt="Pijat Tradisional"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Pijat Tradisional</h3>
                      <p className="text-white/80 mb-4 text-sm">
                        Rasakan manfaat pijat tradisional dari terapis berpengalaman.
                      </p>
                      <span className="inline-flex items-center text-white text-sm font-medium">
                        Jelajahi <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/services?category=spa" className="group">
              <div className="card h-full overflow-hidden hover:scale-[1.02] duration-300">
                <div className="relative h-64">
                  <img
                    src="https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg"
                    alt="Spa & Lulur"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Spa & Lulur</h3>
                      <p className="text-white/80 mb-4 text-sm">
                        Perawatan tubuh tradisional untuk kulit sehat dan bercahaya.
                      </p>
                      <span className="inline-flex items-center text-white text-sm font-medium">
                        Jelajahi <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/services?category=herbal" className="group">
              <div className="card h-full overflow-hidden hover:scale-[1.02] duration-300">
                <div className="relative h-64">
                  <img
                    src="https://images.pexels.com/photos/5501130/pexels-photo-5501130.jpeg"
                    alt="Jamu & Herbal"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Jamu & Herbal</h3>
                      <p className="text-white/80 mb-4 text-sm">
                        Minuman herbal tradisional untuk kesehatan dan vitalitas.
                      </p>
                      <span className="inline-flex items-center text-white text-sm font-medium">
                        Jelajahi <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Layanan Unggulan</h2>
            <Link to="/services" className="text-primary-700 hover:text-primary-800 inline-flex items-center font-medium">
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Bagaimana Cara Kerjanya</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Proses pemesanan layanan kesehatan tradisional yang mudah dan nyaman
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-32 w-32 mx-auto mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg" 
                  alt="Pilih Layanan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pilih Layanan</h3>
              <p className="text-gray-300">
                Pilih layanan pijat, spa, atau jamu herbal yang Anda inginkan dan sesuai kebutuhan Anda.
              </p>
            </div>

            <div className="text-center">
              <div className="h-32 w-32 mx-auto mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/6963831/pexels-photo-6963831.jpeg" 
                  alt="Jadwalkan Kunjungan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Jadwalkan Kunjungan</h3>
              <p className="text-gray-300">
                Tentukan waktu dan tanggal yang Anda inginkan. Terapis akan datang ke lokasi Anda.
              </p>
            </div>

            <div className="text-center">
              <div className="h-32 w-32 mx-auto mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3865557/pexels-photo-3865557.jpeg" 
                  alt="Nikmati Layanan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Nikmati Layanan</h3>
              <p className="text-gray-300">
                Nikmati layanan kesehatan tradisional profesional dari terapis yang berpengalaman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Terapis Terbaik Kami</h2>
            <Link to="/providers" className="text-primary-700 hover:text-primary-800 inline-flex items-center font-medium">
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Apa Kata Mereka</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengarkan pengalaman pelanggan kami yang telah merasakan manfaat layanan kesehatan tradisional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard
              name="Budi Santoso"
              image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              rating={5}
              review="Pijatan yang diberikan sangat membantu meredakan sakit punggung yang sudah saya alami selama berbulan-bulan. Terapis sangat profesional dan ramah."
            />
            <TestimonialCard
              name="Siti Rahma"
              image="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              rating={4}
              review="Perawatan lulur spa membuat kulit saya terasa lebih lembut dan cerah. Sangat menyenangkan dan rileks. Saya pasti akan menggunakan layanan ini lagi."
            />
            <TestimonialCard
              name="Agus Wijaya"
              image="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
              rating={5}
              review="Pak Dimas memiliki pengetahuan yang luar biasa tentang titik refleksi. Setelah sesi pijat, kaki saya terasa ringan dan tubuh lebih berenergi."
            />
            <TestimonialCard
              name="Dewi Anggraini"
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              rating={5}
              review="Jamu buatan Ibu Ningsih rasanya pas dan khasiatnya terasa. Sudah langganan hampir setahun dan selalu puas dengan layanannya."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white relative overflow-hidden">
        {/* Tambahkan gambar ilustrasi background */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg"
            alt="Pengalaman Kesehatan Tradisional"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Siap Untuk Pengalaman Kesehatan Tradisional?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl">
                Pesan layanan kesehatan tradisional kami sekarang dan rasakan manfaatnya
              </p>
              <Link
                to="/services"
                className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 text-lg inline-block"
              >
                Pesan Sekarang
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg"
                  alt="Pengalaman Kesehatan Tradisional"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;