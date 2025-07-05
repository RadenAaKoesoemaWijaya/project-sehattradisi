import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Award, ThumbsUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ServiceCard from '../components/services/ServiceCard';
import { reviews } from '../data/sampleData';

const ProviderDetailPage: React.FC = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const { providers, services } = useApp();
  
  const provider = providers.find((p) => p.id === providerId);
  
  const providerReviews = reviews.filter((review) => review.providerId === providerId);
  
  const providerServices = services.filter((service) =>
    provider?.availableServices.includes(service.id)
  );
  
  if (!provider) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Terapis tidak ditemukan</h2>
        <p className="text-gray-600 mb-6">
          Maaf, terapis yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/services" className="btn btn-primary">
          Kembali ke Layanan
        </Link>
      </div>
    );
  }
  
  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-primary-700 to-secondary-700 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
                <div className="flex items-center justify-center md:justify-start mb-3">
                  <Star size={20} className="text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="mx-2">|</span>
                  <span>{provider.reviewCount} ulasan</span>
                </div>
                
                <div className="flex items-center justify-center md:justify-start">
                  <MapPin size={18} className="mr-1" />
                  <span>{provider.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">{provider.experience} Tahun</h3>
                  <p className="text-gray-600 text-sm">Pengalaman</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Tersertifikasi</h3>
                  <p className="text-gray-600 text-sm">Ahli Kesehatan Tradisional</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                  <ThumbsUp size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">98%</h3>
                  <p className="text-gray-600 text-sm">Tingkat Kepuasan</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Tentang {provider.name}</h2>
              <p className="text-gray-700">{provider.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Spesialisasi</h2>
              <div className="flex flex-wrap gap-2">
                {provider.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                  >
                    {specialty === 'massage' ? 'Pijat Tradisional' : 
                     specialty === 'spa' ? 'Spa & Lulur' : 'Jamu & Herbal'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Provider Services */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Layanan yang Ditawarkan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providerServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
        
        {/* Reviews */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Ulasan ({providerReviews.length})</h2>
          
          <div className="space-y-4">
            {providerReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{review.userName}</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailPage;