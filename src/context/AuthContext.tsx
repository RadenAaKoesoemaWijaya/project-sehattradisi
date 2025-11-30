import { createContext, useContext, ReactNode } from 'react';
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
  const { isLoggedIn, isLoading } = useApp();

  // Mock user data based on isLoggedIn state
  const user: User | null = isLoggedIn ? {
    uid: 'mock-user-id',
    email: 'user@example.com'
  } : null;

  // Non-blocking auth check
  // The app will render immediately, and components can check isLoading or isAuthenticated
  // to show appropriate UI states (e.g., skeletons or redirect)

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