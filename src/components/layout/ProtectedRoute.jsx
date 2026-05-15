import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts';
import { ROUTES } from '@/constants/routes';

/**
 * Redirects unauthenticated users to /login,
 * preserving the intended destination in location state.
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}

/**
 * Floating Admin shortcut button — visible on every page.
 */
import { useNavigate } from 'react-router-dom';

export function AdminFAB() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(ROUTES.ADMIN)}
      style={{
        position:   'fixed',
        bottom:     18,
        right:      18,
        background: '#0F172A',
        color:      '#fff',
        borderRadius: 11,
        padding:    '8px 14px',
        fontSize:   12,
        fontWeight: 800,
        cursor:     'pointer',
        boxShadow:  '0 4px 14px rgba(15,23,42,.25)',
        zIndex:     400,
        display:    'flex',
        alignItems: 'center',
        gap:        6,
        border:     'none',
        fontFamily: 'inherit',
      }}
    >
      ⚙️ Admin
    </button>
  );
}
