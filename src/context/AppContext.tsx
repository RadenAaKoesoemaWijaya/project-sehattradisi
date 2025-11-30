import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceType, ProviderType, CartItemType } from '../types';
import { services, providers } from '../data/sampleData';
import authService from '../services/authService';
import { User as FirebaseUser } from 'firebase/auth';

type AppContextType = {
  services: ServiceType[];
  providers: ProviderType[];
  cart: CartItemType[];
  isLoggedIn: boolean;
  user: FirebaseUser | null;
  isLoading: boolean;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCartState] = useState<CartItemType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart dari localStorage
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartState(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      localStorage.removeItem('cart');
    }

    // Check auth state
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoggedIn(!!firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (item: CartItemType) => {
    const updated = [...cart, item];
    localStorage.setItem('cart', JSON.stringify(updated));
    setCartState(updated);
  };

  const setCart = (items: CartItemType[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartState(items);
  };

  const removeFromCart = (itemId: string) => {
    const updated = cart.filter((item: CartItemType) => item.id !== itemId);
    setCart(updated);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const login = async (email: string, password: string) => {
    try {
      await authService.login(email, password);
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, phone?: string) => {
    try {
      await authService.register(email, password, name, phone);
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      clearCart();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error: any) {
      throw error;
    }
  };

  const value = {
    services,
    providers,
    cart,
    isLoggedIn,
    user,
    isLoading,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    login,
    register,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}