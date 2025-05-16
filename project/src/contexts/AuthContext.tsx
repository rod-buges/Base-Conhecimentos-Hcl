import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '../types';
import { getUser, isAuthenticated, setAuthenticated } from '../utils/localStorage';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);
  }, []);
  
  const login = (username: string, password: string): boolean => {
    const user: User | null = getUser();
    
    if (user && user.username === username && user.password === password) {
      setAuthenticated(true);
      setIsLoggedIn(true);
      return true;
    }
    
    return false;
  };
  
  const logout = () => {
    setAuthenticated(false);
    setIsLoggedIn(false);
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};