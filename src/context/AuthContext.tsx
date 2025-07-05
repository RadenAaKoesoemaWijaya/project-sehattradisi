import React, { createContext, useContext, ReactNode } from 'react';
import { useApp } from './AppContext';

interface User {
  uid: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useApp();
  
  // Mock user data based on isLoggedIn state
  const user: User | null = isLoggedIn ? {
    uid: 'mock-user-id',
    email: 'user@example.com'
  } : null;

  const value = {
    user,
    isAuthenticated: isLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}