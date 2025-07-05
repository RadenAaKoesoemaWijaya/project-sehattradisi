import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { ServiceType } from '../../types';

interface ServiceCardProps {
  service: ServiceType;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link to={`/services/${service.id}`} className="card group hover:translate-y-[-5px] transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 right-0 bg-accent-500 text-white py-1 px-3 text-xs font-medium rounded-bl-lg">
          {service.category === 'massage' ? 'Pijat' : 
           service.category === 'spa' ? 'Spa' : 'Herbal'}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm">{service.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">{service.shortDescription}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-1" />
            <span>{service.duration > 0 ? `${service.duration} menit` : 'Pengiriman'}</span>
          </div>
          <div className="text-primary-700 font-semibold">
            Rp{service.price.toLocaleString('id-ID')}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;