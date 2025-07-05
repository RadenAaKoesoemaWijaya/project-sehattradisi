import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProviderDetailPage from './pages/ProviderDetailPage';
import BookingPage from './pages/BookingPage';
import AccountPage from './pages/AccountPage';
import TherapistsPage from './pages/TherapistsPage';
import AboutPage from './pages/AboutPage';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/utils/ScrollToTop';
import ChatbotWidget from './components/chatbot/ChatbotWidget';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
                <Route path="/providers/:providerId" element={<ProviderDetailPage />} />
                <Route path="/booking/:serviceId" element={<BookingPage />} />
                <Route path="/account/*" element={<AccountPage />} />
                <Route path="/therapists" element={<TherapistsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <ChatbotWidget />
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;