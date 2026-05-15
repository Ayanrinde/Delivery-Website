import { createContext, useContext, useState, useCallback } from 'react';
import { DEMO_USER } from '@/data';
import { sleep } from '@/utils';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = useCallback(async ({ email, password }) => {
    if (!email || !password) {
      setError('Please fill all required fields.');
      return false;
    }
    setLoading(true);
    setError('');
    await sleep(1100);
    // In production: call Firebase Auth / JWT endpoint here
    setUser({ ...DEMO_USER, email });
    setLoading(false);
    return true;
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    if (!name || !email || !password) {
      setError('Please fill all required fields.');
      return false;
    }
    setLoading(true);
    setError('');
    await sleep(1200);
    setUser({ ...DEMO_USER, name, email });
    setLoading(false);
    return true;
  }, []);

  const loginAsDemo = useCallback(() => {
    setUser({ ...DEMO_USER });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  }, []);

  const fundWallet = useCallback((amount) => {
    setUser((prev) =>
      prev ? { ...prev, wallet: (prev.wallet ?? 0) + Number(amount) } : prev
    );
  }, []);

  const clearError = useCallback(() => setError(''), []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    loginAsDemo,
    logout,
    updateUser,
    fundWallet,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
