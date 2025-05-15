import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  clearError: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const API_URL = 'http://localhost:5000/api';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configure axios
  axios.defaults.withCredentials = true;

  // Check if user is logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/me`);
        setUser({
          id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          profilePicture: res.data.profilePicture,
          bio: res.data.bio
        });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      
      setUser({
        id: res.data.user.id,
        username: res.data.user.username,
        email: res.data.user.email
      });
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      setUser({
        id: res.data.user.id,
        username: res.data.user.username,
        email: res.data.user.email
      });
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
      setUser(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Logout failed');
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      register,
      login,
      logout,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;