import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, isAdmin: boolean) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const login = (username: string, isAdmin: boolean) => {
    const newUser: User = { username, isAdmin };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeColors(newTheme);
  };

  const updateThemeColors = (selectedTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    const lightTheme = selectedTheme === 'light';
  
    root.style.setProperty('--primary-background', lightTheme ? '#ffffff' : '#191624');
    root.style.setProperty('--text-color', lightTheme ? '#333333' : '#ffffff');
    root.style.setProperty('--accent-color', '#3498db');
  };

  useEffect(() => {
    updateThemeColors(theme);
  }, [theme]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
