import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { ProviderType } from '../../types';

interface ProviderCardProps {
  provider: ProviderType;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <Link to={`/providers/${provider.id}`} className="card group hover:translate-y-[-5px] transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{provider.name}</h3>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm">{provider.rating} ({provider.reviewCount} ulasan)</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3 text-sm">
          <MapPin size={16} className="mr-1" />
          <span>{provider.location}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{provider.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {provider.specialties.map((specialty, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
            >
              {specialty === 'massage' ? 'Pijat' : specialty === 'spa' ? 'Spa' : 'Herbal'}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">{provider.experience} tahun pengalaman</span>
          <span className="text-primary-700 font-medium text-sm inline-flex items-center">
            Lihat Profil
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProviderCard;