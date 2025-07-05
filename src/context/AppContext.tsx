import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceType, ProviderType, CartItemType } from '../types';
import { services, providers } from '../data/sampleData';

type AppContextType = {
  services: ServiceType[];
  providers: ProviderType[];
  cart: CartItemType[];
  isLoggedIn: boolean;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  login: () => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = (item: CartItemType) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    clearCart();
  };

  const value = {
    services,
    providers,
    cart,
    isLoggedIn,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}