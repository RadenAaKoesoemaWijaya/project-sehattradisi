import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { recommendationService } from '../../services/recommendationService';

const RecommendedPackages: React.FC = () => {
  const { services } = useApp();
  const { user } = useAuth();
  
  const packages = user
    ? recommendationService.getPackageRecommendations(user.uid, services)
    : [];
  
  if (!user || packages.length === 0) return null;
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-8">Paket Layanan untuk Anda</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary-700" />
                  </div>
                  <h3 className="text-lg font-semibold">{pkg.name}</h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  {pkg.services.map((service) => (
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
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Total</span>
                    <span className="text-xl font-semibold text-primary-700">
                      Rp{pkg.totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                  
                  <Link
                    to={`/booking/package/${index}`}
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Pesan Paket <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedPackages;