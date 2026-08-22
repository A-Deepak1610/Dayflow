import React, { createContext, useContext, useState, useEffect } from 'react';
import { logoutApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('dayflow_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('dayflow_user', JSON.stringify(userData));
  };

  const logoutUser = async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setUser(null);
      localStorage.removeItem('dayflow_user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isHr: user?.role === 'ADMIN' || user?.role === 'HR', isEmployee: user?.role === 'EMPLOYEE' }}>
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

export default AuthContext;
