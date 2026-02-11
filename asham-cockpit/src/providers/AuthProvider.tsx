import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { tokenStorage } from '../utils/storage';

interface AuthContextValue {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const savedToken = await tokenStorage.getToken();
      setToken(savedToken);
      apiClient.setToken(savedToken);
      setIsLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiClient.login(email, password);
    await tokenStorage.setToken(response.token);
    apiClient.setToken(response.token);
    setToken(response.token);
  };

  const logout = async () => {
    await apiClient.logout();
    await tokenStorage.clearToken();
    apiClient.setToken(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      token,
      isLoading,
      isAuthenticated: Boolean(token),
      login,
      logout
    }),
    [isLoading, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth muss innerhalb von AuthProvider verwendet werden');
  }
  return context;
};
