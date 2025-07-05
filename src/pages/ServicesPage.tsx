import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ServiceCard from '../components/services/ServiceCard';

const ServicesPage: React.FC = () => {
  const { services } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    queryParams.get('category') || null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);

  useEffect(() => {
    if (queryParams.get('category')) {
      setSelectedCategory(queryParams.get('category'));
    }
  }, [location.search]);

  const filteredServices = services.filter((service) => {
    let matchesCategory = true;
    let matchesSearch = true;
    let matchesPrice = true;

    if (selectedCategory) {
      matchesCategory = service.category === selectedCategory;
    }

    if (searchTerm) {
      matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    }

    matchesPrice = service.price >= minPrice && service.price <= maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    
    const params = new URLSearchParams(location.search);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  return (
    <div className="py-10">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">Layanan Kesehatan Tradisional</h1>
        
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filter</h3>
                <button 
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal size={20} />
                </button>
              </div>
              
              <div className={`space-y-6 ${showFilters || window.innerWidth >= 1024 ? 'block' : 'hidden lg:block'}`}>
                <div>
                  <h4 className="font-medium mb-3">Kategori</h4>
                  <div className="space-y-2">
                    <button
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === null ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleCategoryChange(null)}
                    >
                      Semua Layanan
                    </button>
                    <button
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === 'massage' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleCategoryChange('massage')}
                    >
                      Pijat Tradisional
                    </button>
                    <button
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === 'spa' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleCategoryChange('spa')}
                    >
                      Spa & Lulur
                    </button>
                    <button
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === 'herbal' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleCategoryChange('herbal')}
                    >
                      Jamu & Herbal
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Harga</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Rp{minPrice.toLocaleString('id-ID')}</span>
                      <span>Rp{maxPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="50000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Urutkan</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="default">Paling Relevan</option>
                    <option value="price-low">Harga: Rendah ke Tinggi</option>
                    <option value="price-high">Harga: Tinggi ke Rendah</option>
                    <option value="rating">Rating Tertinggi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/4">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari layanan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {sortedServices.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">Tidak ada layanan yang ditemukan</h3>
                <p className="text-gray-600 mb-4">
                  Coba ubah filter atau kata kunci pencarian Anda
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchTerm('');
                    setMinPrice(0);
                    setMaxPrice(500000);
                    setSortBy('default');
                    navigate('/services');
                  }}
                  className="btn btn-primary"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-600">Menampilkan {sortedServices.length} layanan</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;