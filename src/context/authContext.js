import React, { createContext, useState, useContext, useEffect } from 'react';
import { attachTokenToRequest, removeTokenFromRequest } from '../api/AxiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = await new Promise((resolve) => {
          setTimeout(() => resolve(localStorage.getItem('user')), 500); 
        });
        const storedToken = await new Promise((resolve) => {
          setTimeout(() => resolve(localStorage.getItem('token')), 500); 
        });

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          attachTokenToRequest(storedToken);
        }
      } catch (error) {
        console.error('Error initializing authentication:', error);
      } finally {
        setLoading(false); // Done loading
      }
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData?.token);
    attachTokenToRequest(userData?.token);
  };

  const logout = () => {
    removeTokenFromRequest();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
