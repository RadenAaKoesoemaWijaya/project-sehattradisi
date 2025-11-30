import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'firebase/auth', 'firebase/firestore'],
    force: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Firebase chunk
          'firebase': ['firebase/auth', 'firebase/firestore', 'firebase/app'],
          // PDF libraries chunk
          'pdf': ['jspdf', 'html2canvas'],
          // UI libraries chunk
          'ui': ['lucide-react'],
          // Payment chunk
          'payment': ['midtrans-client'],
          // Chatbot chunk (TensorFlow)
          'chatbot': ['@tensorflow/tfjs']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  define: {
    // Remove TensorFlow dari production build
    ...(process.env.NODE_ENV === 'production' && {
      'process.env.TENSORFLOW_ENABLED': 'false'
    })
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  }
});
