// Utility functions untuk validasi input
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Validasi email
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { isValid: false, error: 'Email harus diisi' };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Format email tidak valid' };
  }
  return { isValid: true };
};

// Validasi nomor telepon (Indonesia)
export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^(?:\+62|62|08)[0-9]{8,13}$/;
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  if (!phone) {
    return { isValid: false, error: 'Nomor telepon harus diisi' };
  }
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'Format nomor telepon tidak valid (contoh: 08123456789)' };
  }
  return { isValid: true };
};

// Validasi password
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password harus diisi' };
  }
  if (password.length < 6) {
    return { isValid: false, error: 'Password minimal 6 karakter' };
  }
  return { isValid: true };
};

// Validasi nama
export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, error: 'Nama harus diisi' };
  }
  if (name.length < 3) {
    return { isValid: false, error: 'Nama minimal 3 karakter' };
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { isValid: false, error: 'Nama hanya boleh mengandung huruf dan spasi' };
  }
  return { isValid: true };
};

// Validasi alamat
export const validateAddress = (address: string): ValidationResult => {
  if (!address) {
    return { isValid: false, error: 'Alamat harus diisi' };
  }
  if (address.length < 10) {
    return { isValid: false, error: 'Alamat terlalu singkat, minimal 10 karakter' };
  }
  return { isValid: true };
};

// Validasi tanggal (tidak boleh di masa lalu)
export const validateDate = (date: string): ValidationResult => {
  if (!date) {
    return { isValid: false, error: 'Tanggal harus dipilih' };
  }
  
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return { isValid: false, error: 'Tanggal tidak boleh di masa lalu' };
  }
  
  // Maksimal 30 hari ke depan
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  if (selectedDate > maxDate) {
    return { isValid: false, error: 'Maksimal pemesanan 30 hari ke depan' };
  }
  
  return { isValid: true };
};

// Validasi waktu operational
export const validateTime = (time: string): ValidationResult => {
  if (!time) {
    return { isValid: false, error: 'Waktu harus dipilih' };
  }
  
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  
  // Operational hours: 09:00 - 18:00
  if (totalMinutes < 9 * 60 || totalMinutes > 18 * 60) {
    return { isValid: false, error: 'Jam operasional: 09:00 - 18:00' };
  }
  
  return { isValid: true };
};

// Validasi metode pembayaran
export const validatePaymentMethod = (method: string): ValidationResult => {
  const validMethods = ['bank_transfer', 'e_wallet', 'cash'];
  if (!method) {
    return { isValid: false, error: 'Metode pembayaran harus dipilih' };
  }
  if (!validMethods.includes(method)) {
    return { isValid: false, error: 'Metode pembayaran tidak valid' };
  }
  return { isValid: true };
};

// Validasi form registrasi
export const validateRegistration = (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): { isValid: boolean; errors: { [key: string]: string } } => {
  const errors: { [key: string]: string } = {};
  
  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) errors.name = nameValidation.error!;
  
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) errors.email = emailValidation.error!;
  
  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.isValid) errors.phone = phoneValidation.error!;
  
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) errors.password = passwordValidation.error!;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validasi form login
export const validateLogin = (data: {
  email: string;
  password: string;
}): { isValid: boolean; errors: { [key: string]: string } } => {
  const errors: { [key: string]: string } = {};
  
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) errors.email = emailValidation.error!;
  
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) errors.password = passwordValidation.error!;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validasi form checkout
export const validateCheckout = (data: {
  address: string;
  paymentMethod: string;
  date?: string;
  time?: string;
}): { isValid: boolean; errors: { [key: string]: string } } => {
  const errors: { [key: string]: string } = {};
  
  const addressValidation = validateAddress(data.address);
  if (!addressValidation.isValid) errors.address = addressValidation.error!;
  
  const paymentValidation = validatePaymentMethod(data.paymentMethod);
  if (!paymentValidation.isValid) errors.paymentMethod = paymentValidation.error!;
  
  if (data.date) {
    const dateValidation = validateDate(data.date);
    if (!dateValidation.isValid) errors.date = dateValidation.error!;
  }
  
  if (data.time) {
    const timeValidation = validateTime(data.time);
    if (!timeValidation.isValid) errors.time = timeValidation.error!;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
