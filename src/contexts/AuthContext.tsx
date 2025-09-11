import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Mock user type
interface User {
  id: string;
  email: string;
  user_metadata?: {
    username?: string;
    avatar_url?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateUser: (updates: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading] = useState(false);

  useEffect(() => {
    // 模拟检查本地存储的用户信息
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    // 模拟登录验证
    if (email && password) {
      const mockUser: User = {
        id: uuidv4(),
        email: email,
        user_metadata: {
          username: email.split('@')[0],
        }
      };
      setUser(mockUser);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, error: '邮箱或密码不能为空' };
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    // 模拟注册
    if (email && password) {
      const mockUser: User = {
        id: uuidv4(),
        email: email,
        user_metadata: {
          username: userData?.username || email.split('@')[0],
          avatar_url: userData?.avatar_url,
        }
      };
      setUser(mockUser);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, error: '邮箱或密码不能为空' };
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  const updateUser = async (updates: any) => {
    if (user) {
      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          ...updates
        }
      };
      setUser(updatedUser);
      localStorage.setItem('mockUser', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
