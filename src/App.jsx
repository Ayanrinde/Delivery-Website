import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, CartProvider, OrderProvider, ToastProvider } from '@/contexts';
import { Navbar, AdminFAB } from '@/components/layout';
import Toast from '@/components/ui/Toast';
import AppRouter from '@/router/AppRouter';

/**
 * Provider order matters:
 *  ToastProvider   — no dependencies
 *  AuthProvider    — no dependencies
 *  CartProvider    — no dependencies
 *  OrderProvider   — no dependencies
 */
export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              {/* Global overlay components */}
              <Toast />

              {/* Shell */}
              <Navbar />
              <main>
                <AppRouter />
              </main>
              <AdminFAB />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
