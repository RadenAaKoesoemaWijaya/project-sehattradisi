import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, CheckCircle, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import ServiceCard from '../components/services/ServiceCard';
import { recommendationService } from '../services/recommendationService';

const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { services, providers, addToCart, isLoggedIn } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const service = services.find((s) => s.id === serviceId);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  
  useEffect(() => {
    if (user && service) {
      recommendationService.trackServiceView(user.uid, service.id);
    }
  }, [user, service]);
  
  const availableProviders = providers.filter((provider) =>
    provider.availableServices.includes(serviceId || '')
  );
  
  const relatedServices = services
    .filter((s) => s.category === service?.category && s.id !== service?.id)
    .slice(0, 3);
  
  const handleBookNow = () => {
    if (!isLoggedIn) {
      navigate('/account');
      return;
    }
    
    if (!selectedProvider || !selectedDate || !selectedTime) {
      alert('Silakan pilih terapis, tanggal, dan waktu terlebih dahulu');
      return;
    }
    
    addToCart(serviceId || '', selectedProvider, selectedDate, selectedTime);
    navigate(`/booking/${serviceId}`);
  };
  
  if (!service) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Layanan tidak ditemukan</h2>
        <p className="text-gray-600 mb-6">
          Maaf, layanan yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link to="/services" className="btn btn-primary">
          Kembali ke Layanan
        </Link>
      </div>
    );
  }
  
  // Generate dates for the next 7 days
  const getNextDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: new Intl.DateTimeFormat('id-ID', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }).format(date),
      });
    }
    
    return dates;
  };
  
  // Time slots
  const timeSlots = [
    { value: '09:00', label: '09:00' },
    { value: '11:00', label: '11:00' },
    { value: '13:00', label: '13:00' },
    { value: '15:00', label: '15:00' },
    { value: '17:00', label: '17:00' },
  ];
  
  return (
    <div>
      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded-lg overflow-hidden shadow-md bg-white">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-80 object-cover"
              />
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <span className="bg-accent-500 text-white py-1 px-3 text-xs font-medium rounded-full">
                  {service.category === 'massage' ? 'Pijat' : 
                   service.category === 'spa' ? 'Spa' : 'Herbal'}
                </span>
                <div className="flex items-center ml-4">
                  <Star size={18} className="text-yellow-500 fill-yellow-500" />
                  <span className="ml-1">{service.rating}</span>
                  <span className="text-gray-500 ml-1">({service.reviewCount} ulasan)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
              
              <div className="flex items-center mb-6">
                <Clock size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-600">
                  {service.duration > 0 ? `Durasi: ${service.duration} menit` : 'Produk dikirim ke alamat Anda'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6">{service.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Manfaat:</h3>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={18} className="text-primary-700 mt-0.5 mr-2" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-2xl font-bold text-primary-700 mb-6">
                Rp{service.price.toLocaleString('id-ID')}
              </div>
              
              {service.category !== 'herbal' && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Pilih Terapis:</h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {availableProviders.map((provider) => (
                      <button
                        key={provider.id}
                        className={`p-3 rounded-md border text-left transition-colors ${
                          selectedProvider === provider.id
                            ? 'border-primary-700 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                        onClick={() => setSelectedProvider(provider.id)}
                      >
                        <div className="flex items-center">
                          <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <div className="font-medium">{provider.name}</div>
                            <div className="text-xs flex items-center">
                              <Star size={12} className="text-yellow-500 fill-yellow-500 mr-1" />
                              {provider.rating}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <h3 className="font-semibold mb-3">Pilih Tanggal:</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mb-4">
                    {getNextDates().map((date) => (
                      <button
                        key={date.value}
                        className={`p-2 rounded-md border text-center text-sm transition-colors ${
                          selectedDate === date.value
                            ? 'border-primary-700 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                        onClick={() => setSelectedDate(date.value)}
                      >
                        {date.label}
                      </button>
                    ))}
                  </div>
                  
                  <h3 className="font-semibold mb-3">Pilih Waktu:</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time.value}
                        className={`p-2 rounded-md border text-center text-sm transition-colors ${
                          selectedTime === time.value
                            ? 'border-primary-700 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                        onClick={() => setSelectedTime(time.value)}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <button
                onClick={handleBookNow}
                className="btn btn-primary py-3 px-6 w-full flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                {service.category === 'herbal' ? 'Beli Sekarang' : 'Pesan Sekarang'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Services */}
      <div className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8">Layanan Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;