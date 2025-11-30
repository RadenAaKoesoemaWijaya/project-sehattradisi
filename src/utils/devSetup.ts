// Development setup utilities
export const checkEnvironment = () => {
  const isDev = import.meta.env.DEV;
  const hasFirebaseConfig = !!import.meta.env.VITE_FIREBASE_API_KEY;
  const hasMidtransConfig = !!import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
  
  console.log('🔍 Environment Check:', {
    isDev,
    hasFirebaseConfig,
    hasMidtransConfig
  });
  
  if (isDev && !hasFirebaseConfig) {
    console.warn('⚠️ Using demo Firebase config. Set up real config in .env file');
  }
  
  if (isDev && !hasMidtransConfig) {
    console.warn('⚠️ Using demo Midtrans config. Set up real config in .env file');
  }
  
  return { isDev, hasFirebaseConfig, hasMidtransConfig };
};

export const initializeApp = () => {
  checkEnvironment();
  
  // Initialize any required services
  if (typeof window !== 'undefined') {
    // Add any browser-specific initialization
    console.log('🚀 Application initialized');
  }
};
