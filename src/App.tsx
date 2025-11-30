import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const ProviderDetailPage = lazy(() => import('./pages/ProviderDetailPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const TherapistsPage = lazy(() => import('./pages/TherapistsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/utils/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import { FullPageLoader } from './components/common/LoadingStates';

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-4">Aplikasi mengalami error. Silakan refresh halaman.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Refresh Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load heavy components
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'));
const PaymentPendingPage = lazy(() => import('./pages/PaymentPendingPage'));
const ChatbotWidget = lazy(() => import('./components/chatbot/ChatbotWidget'));

// App content component with toast container
function AppContent() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<FullPageLoader text="Memuat Beranda..." />}>
                <HomePage />
              </Suspense>
            } />
            <Route path="/services" element={
              <Suspense fallback={<FullPageLoader text="Memuat Layanan..." />}>
                <ServicesPage />
              </Suspense>
            } />
            <Route path="/services/:serviceId" element={
              <Suspense fallback={<FullPageLoader text="Memuat Detail..." />}>
                <ServiceDetailPage />
              </Suspense>
            } />
            <Route path="/providers/:providerId" element={
              <Suspense fallback={<FullPageLoader text="Memuat Terapis..." />}>
                <ProviderDetailPage />
              </Suspense>
            } />
            <Route path="/booking/:serviceId" element={
              <Suspense fallback={<FullPageLoader text="Memuat Booking..." />}>
                <BookingPage />
              </Suspense>
            } />
            <Route path="/booking/success" element={
              <Suspense fallback={<FullPageLoader text="Memuat halaman..." />}>
                <PaymentSuccessPage />
              </Suspense>
            } />
            <Route path="/booking/pending" element={
              <Suspense fallback={<FullPageLoader text="Memuat halaman..." />}>
                <PaymentPendingPage />
              </Suspense>
            } />
            <Route path="/account/*" element={
              <Suspense fallback={<FullPageLoader text="Memuat Akun..." />}>
                <AccountPage />
              </Suspense>
            } />
            <Route path="/therapists" element={
              <Suspense fallback={<FullPageLoader text="Memuat Terapis..." />}>
                <TherapistsPage />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<FullPageLoader text="Memuat Tentang Kami..." />}>
                <AboutPage />
              </Suspense>
            } />
          </Routes>
        </main>
        <Suspense fallback={<div className="fixed bottom-4 right-4 w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>}>
          <ChatbotWidget />
        </Suspense>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;