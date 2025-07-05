import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { recommendationService } from '../../services/recommendationService';
import ServiceCard from '../services/ServiceCard';

const PersonalizedServices: React.FC = () => {
  const { services } = useApp();
  const { user } = useAuth();
  
  const recommendations = user
    ? recommendationService.getPersonalizedRecommendations(user.uid, services)
    : [];
  
  if (!user || recommendations.length === 0) return null;
  
  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-8">Rekomendasi untuk Anda</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalizedServices;