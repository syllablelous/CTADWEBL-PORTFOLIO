import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../services/UserService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    const firstName = localStorage.getItem('firstName');

    if (token && type && firstName) {
      setUser({ token, type, firstName });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await loginUser({ email, password });
      console.log('Login response:', data);

      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('type', data.type);
      localStorage.setItem('firstName', data.firstName);

      setUser({
        token: data.token,
        type: data.type,
        firstName: data.firstName,
      });

      // Redirect based on user type
      switch (data.type) {
        case 'admin':
          return '/dashboard';
        case 'editor':
          return '/dashboard/articles';
        case 'viewer':
          return '/dashboard';
        default:
          return '/home';
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('firstName');
    setUser(null);
    return '/login';
  };

  const isAuthenticated = () => {
    return !!user?.token;
  };

  const hasRole = (roles) => {
    if (!user?.type) return false;
    return roles.includes(user.type);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 