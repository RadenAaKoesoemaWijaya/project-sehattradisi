import React from 'react';
import { useApp } from '../context/AppContext';
import ProviderCard from '../components/providers/ProviderCard';

const TherapistsPage: React.FC = () => {
  const { providers } = useApp();
  
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Terapis Profesional Kami</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Semua terapis kami telah melalui proses seleksi ketat dan memiliki sertifikasi resmi di bidangnya masing-masing. 
            Dengan pengalaman bertahun-tahun, mereka siap memberikan layanan terbaik untuk kesehatan dan kesejahteraan Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
        
        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Standar Kualitas Terapis Kami</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <span>Bersertifikasi dan terlatih secara profesional</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <span>Pengalaman minimal 3 tahun di bidangnya</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <span>Menguasai berbagai teknik pijat tradisional Indonesia</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <span>Mengutamakan kenyamanan dan keamanan klien</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <span>Mengikuti pelatihan berkelanjutan untuk meningkatkan keterampilan</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TherapistsPage;