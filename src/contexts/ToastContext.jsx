import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const timerRef = useRef(null);

  const showToast = useCallback((message, type = 'success', duration = 2500) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ visible: true, message, type });
    timerRef.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      duration
    );
  }, []);

  const hideToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
