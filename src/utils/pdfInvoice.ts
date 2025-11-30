import { InvoiceData } from '../types';

// Lazy load PDF libraries with proper caching
let jsPDF: any = null;
let html2canvas: any = null;

type jsPDFType = any;

const loadPDFLibraries = async () => {
  if (!jsPDF || !html2canvas) {
    try {
      // Dynamic imports dengan proper error handling
      const [jsPDFModule, html2canvasModule] = await Promise.all([
        import('jspdf').catch(err => {
          console.error('Failed to load jsPDF:', err);
          throw new Error('jsPDF library failed to load');
        }),
        import('html2canvas').catch(err => {
          console.error('Failed to load html2canvas:', err);
          throw new Error('html2canvas library failed to load');
        })
      ]);
      
      jsPDF = jsPDFModule.default || jsPDFModule;
      html2canvas = html2canvasModule.default || html2canvasModule;
    } catch (error) {
      console.error('PDF Libraries loading failed:', error);
      throw error;
    }
  }
  return { jsPDF, html2canvas };
};

export class PDFInvoiceGenerator {
  private static addHeader(doc: jsPDFType, data: InvoiceData) {
    // Header
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // Primary blue color
    doc.text('INVOICE PEMBAYARAN', 105, 30, { align: 'center' });
    
    // Company info
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('PT Sehat Tradisi', 20, 50);
    doc.text('Jl. Kesehatan No. 123, Jakarta', 20, 57);
    doc.text('Email: info@sehat-tradisi.com', 20, 64);
    doc.text('Telepon: (021) 1234-5678', 20, 71);
    
    // Invoice info
    doc.text(`Invoice #: INV-${data.orderId}`, 140, 50);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 140, 57);
    doc.text(`Status: ${data.status}`, 140, 64);
  }

  private static addBillingInfo(doc: jsPDFType, data: InvoiceData) {
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text('Informasi Tagihan:', 20, 90);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    
    let yPosition = 100;
    const lineHeight = 7;
    
    doc.text(`ID Pesanan: #ORD${data.orderId}`, 20, yPosition);
    yPosition += lineHeight;
    
    doc.text(`Layanan: ${data.serviceName}`, 20, yPosition);
    yPosition += lineHeight;
    
    if (data.providerName) {
      doc.text(`Terapis: ${data.providerName}`, 20, yPosition);
      yPosition += lineHeight;
    }
    
    doc.text(`Tanggal: ${data.date}`, 20, yPosition);
    yPosition += lineHeight;
    
    doc.text(`Waktu: ${data.time}`, 20, yPosition);
    yPosition += lineHeight;
    
    doc.text(`Alamat: ${data.address}`, 20, yPosition);
    yPosition += lineHeight + 5;
    
    if (data.note) {
      doc.text(`Catatan: ${data.note}`, 20, yPosition);
      yPosition += lineHeight;
    }
    
    doc.text(`Metode Pembayaran: ${this.getPaymentMethodLabel(data.paymentMethod)}`, 20, yPosition);
  }

  private static addPaymentDetails(doc: jsPDFType, data: InvoiceData) {
    // Payment details box
    doc.setDrawColor(200);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 140, 170, 60, 3, 3, 'FD');
    
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text('Detail Pembayaran:', 30, 155);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    
    if (data.paymentMethod === 'bank_transfer') {
      doc.text('Silakan transfer ke rekening berikut:', 30, 170);
      doc.text('Bank: BCA', 30, 177);
      doc.text('No. Rekening: 1234567890', 30, 184);
      doc.text('Atas Nama: PT Sehat Tradisi', 30, 191);
    } else if (data.paymentMethod === 'e_wallet') {
      doc.text('Silakan transfer ke E-Wallet:', 30, 170);
      doc.text('GoPay/QRIS: 08123456789', 30, 177);
      doc.text('Atas Nama: PT Sehat Tradisi', 30, 184);
    } else {
      doc.text('Pembayaran tunai di lokasi', 30, 170);
      doc.text('Siapkan uang pas saat layanan selesai', 30, 177);
    }
  }

  private static addTotal(doc: jsPDFType, data: InvoiceData) {
    // Total amount box
    doc.setDrawColor(37, 99, 235);
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(120, 210, 70, 30, 3, 3, 'FD');
    
    doc.setFontSize(10);
    doc.setTextColor(255);
    doc.text('Total Pembayaran:', 130, 225);
    
    doc.setFontSize(14);
    doc.text(`Rp${data.total.toLocaleString('id-ID')}`, 130, 235);
  }

  private static addFooter(doc: jsPDFType) {
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('Terima kasih telah menggunakan layanan Sehat Tradisi', 105, 280, { align: 'center' });
    doc.text('Setelah pembayaran, silakan konfirmasi melalui aplikasi', 105, 287, { align: 'center' });
  }

  private static getPaymentMethodLabel(method: string): string {
    switch (method) {
      case 'bank_transfer':
        return 'Transfer Bank';
      case 'e_wallet':
        return 'E-Wallet';
      case 'cash':
        return 'Tunai di Tempat';
      default:
        return method;
    }
  }

  public static async generateInvoice(data: InvoiceData): Promise<void> {
    const { jsPDF } = await loadPDFLibraries();
    const doc = new jsPDF();
    
    // Add content
    this.addHeader(doc, data);
    this.addBillingInfo(doc, data);
    this.addPaymentDetails(doc, data);
    this.addTotal(doc, data);
    this.addFooter(doc);
    
    // Save the PDF
    doc.save(`invoice-${data.orderId}.pdf`);
  }

  public static async generateInvoiceAndOpen(data: InvoiceData): Promise<void> {
    const { jsPDF } = await loadPDFLibraries();
    const doc = new jsPDF();
    
    // Add content
    this.addHeader(doc, data);
    this.addBillingInfo(doc, data);
    this.addPaymentDetails(doc, data);
    this.addTotal(doc, data);
    this.addFooter(doc);
    
    // Open in new tab
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  }

  public static async generateInvoiceAsBlob(data: InvoiceData): Promise<Blob> {
    const { jsPDF } = await loadPDFLibraries();
    const doc = new jsPDF();
    
    // Add content
    this.addHeader(doc, data);
    this.addBillingInfo(doc, data);
    this.addPaymentDetails(doc, data);
    this.addTotal(doc, data);
    this.addFooter(doc);
    
    return doc.output('blob');
  }
}
