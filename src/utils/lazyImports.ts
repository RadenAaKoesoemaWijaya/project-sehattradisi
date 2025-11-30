// Lazy loading untuk heavy components

// Lazy load PDF generator
export const lazyPDFGenerator = () => import('../utils/pdfInvoice').then(module => ({ default: module.PDFInvoiceGenerator }));

// Lazy load chatbot (heavy TensorFlow dependency)
export const lazyChatbot = () => import('../components/chatbot/ChatbotWidget').then(module => ({ default: module.default }));

// Lazy load payment service
export const lazyPaymentService = () => import('../services/paymentService').then(module => ({ default: module.default }));

// Dynamic import untuk PDF libraries
export const loadPDFLibraries = async () => {
  const [jsPDF, html2canvas] = await Promise.all([
    import('jspdf'),
    import('html2canvas')
  ]);
  return { jsPDF, html2canvas };
};
