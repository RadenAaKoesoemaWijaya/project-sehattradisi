import { Loader2, Download, CreditCard, MessageCircle } from 'lucide-react';

// Skeleton loader untuk cards
export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
  </div>
);

// Loading spinner dengan teks
export const LoadingSpinner = ({ text = "Memuat..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <Loader2 className="w-8 h-8 animate-spin text-primary-600 mb-2" />
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);

// Full page loader
export const FullPageLoader = ({ text = "Memuat aplikasi..." }: { text?: string }) => (
  <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">{text}</p>
    </div>
  </div>
);

// Contextual loading states
export const PaymentLoader = () => (
  <div className="flex items-center justify-center py-4">
    <CreditCard className="w-5 h-5 animate-pulse text-primary-600 mr-2" />
    <span className="text-sm text-gray-600">Memproses pembayaran...</span>
  </div>
);

export const PDFLoader = () => (
  <div className="flex items-center justify-center py-4">
    <Download className="w-5 h-5 animate-pulse text-primary-600 mr-2" />
    <span className="text-sm text-gray-600">Membuat invoice...</span>
  </div>
);

export const ChatbotLoader = () => (
  <div className="flex items-center justify-center py-4">
    <MessageCircle className="w-5 h-5 animate-pulse text-primary-600 mr-2" />
    <span className="text-sm text-gray-600">Memuat chatbot...</span>
  </div>
);

// Progress bar untuk async operations
export const ProgressBar = ({ progress = 0 }: { progress?: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);
