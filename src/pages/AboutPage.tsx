import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Tentang SehatTradisi</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Platform yang menghubungkan Anda dengan layanan kesehatan tradisional Indonesia berkualitas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <img 
              src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg" 
              alt="Tentang Kami" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Siapa Kami</h2>
            <p className="text-gray-600 mb-4">
              SehatTradisi adalah platform yang menghubungkan Anda dengan layanan kesehatan tradisional Indonesia berkualitas. 
              Kami berkomitmen untuk melestarikan warisan kesehatan tradisional Indonesia sambil memberikan akses mudah melalui teknologi modern.
            </p>
            <p className="text-gray-600 mb-6">
              Didirikan pada tahun 2023, SehatTradisi hadir untuk menjembatani kesenjangan antara praktisi kesehatan tradisional 
              dengan masyarakat modern yang menginginkan pendekatan holistik terhadap kesehatan dan kesejahteraan.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Misi Kami</h3>
            <p className="text-gray-600 mb-4">
              Misi kami adalah melestarikan dan mempromosikan kearifan lokal dalam bidang kesehatan tradisional Indonesia, 
              sekaligus meningkatkan kesejahteraan para praktisi tradisional melalui platform digital yang mudah diakses.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Visi Kami</h3>
            <p className="text-gray-600">
              Menjadi platform terdepan yang menghubungkan masyarakat dengan layanan kesehatan tradisional berkualitas, 
              serta menjadi bagian dari pelestarian warisan budaya kesehatan Indonesia.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-lg font-semibold mb-2">Pelestarian Budaya</h3>
              <p className="text-gray-600">Kami berkomitmen untuk melestarikan dan mempromosikan kearifan lokal Indonesia dalam bidang kesehatan tradisional.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-lg font-semibold mb-2">Kualitas Layanan</h3>
              <p className="text-gray-600">Kami memastikan semua praktisi di platform kami memenuhi standar kualitas dan keamanan yang tinggi.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-lg font-semibold mb-2">Kesejahteraan Bersama</h3>
              <p className="text-gray-600">Kami berusaha meningkatkan kesejahteraan baik untuk pelanggan maupun para praktisi tradisional.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4 text-xl font-bold">4</div>
              <h3 className="text-lg font-semibold mb-2">Inovasi Berkelanjutan</h3>
              <p className="text-gray-600">Kami terus berinovasi untuk menggabungkan kearifan tradisional dengan teknologi modern.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4 text-xl font-bold">5</div>
              <h3 className="text-lg font-semibold mb-2">Kepercayaan & Transparansi</h3>
              <p className="text-gray-600">Kami menjunjung tinggi kepercayaan dan transparansi dalam setiap aspek layanan kami.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Bergabunglah dengan Kami</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            Apakah Anda seorang praktisi kesehatan tradisional yang ingin memperluas jangkauan? 
            Atau Anda ingin menjadi bagian dari tim kami? Kami selalu terbuka untuk kolaborasi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join" className="btn btn-primary">Bergabung Sebagai Mitra</Link>
            <Link to="/contact" className="btn btn-outline">Hubungi Kami</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;