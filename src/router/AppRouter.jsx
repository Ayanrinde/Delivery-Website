import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ProtectedRoute } from '@/components/layout';

// Pages
import Home          from '@/pages/Home';
import Browse        from '@/pages/Browse';
import VendorPage    from '@/pages/Vendor';
import Cart          from '@/pages/Cart';
import Checkout      from '@/pages/Checkout';
import Track         from '@/pages/Track';
import Dashboard     from '@/pages/Dashboard';
import Admin         from '@/pages/Admin';
import Notifications from '@/pages/Notifications';
import Login         from '@/pages/Auth/Login';
import Signup        from '@/pages/Auth/Signup';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path={ROUTES.HOME}   element={<Home />} />
      <Route path={ROUTES.BROWSE} element={<Browse />} />
      <Route path={ROUTES.VENDOR} element={<VendorPage />} />
      <Route path={ROUTES.CART}   element={<Cart />} />
      <Route path={ROUTES.LOGIN}  element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />

      {/* Requires auth */}
      <Route path={ROUTES.CHECKOUT} element={
        <ProtectedRoute><Checkout /></ProtectedRoute>
      } />
      <Route path={ROUTES.TRACK} element={
        <ProtectedRoute><Track /></ProtectedRoute>
      } />
      <Route path={ROUTES.DASHBOARD} element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path={ROUTES.NOTIFICATIONS} element={
        <ProtectedRoute><Notifications /></ProtectedRoute>
      } />

      {/* Admin */}
      <Route path={ROUTES.ADMIN} element={<Admin />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
