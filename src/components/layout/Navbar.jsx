import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import { useCart } from '@/contexts';
import { Avatar } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

const NAV_LINKS = [
  { to: ROUTES.HOME,   label: 'Home'       },
  { to: ROUTES.BROWSE, label: 'Order Food' },
  { to: ROUTES.TRACK,  label: 'Track'      },
  { to: ROUTES.ADMIN,  label: 'Admin'      },
];

export default function Navbar() {
  const { pathname }          = useLocation();
  const navigate              = useNavigate();
  const { user, logout }      = useAuth();
  const { cartCount }         = useCart();

  const handleProtected = (to) => {
    if (!user && (to === ROUTES.DASHBOARD || to === ROUTES.NOTIFICATIONS)) {
      navigate(ROUTES.LOGIN);
    } else {
      navigate(to);
    }
  };

  return (
    <nav
      style={{
        background:   '#FFFFFF',
        borderBottom: '1px solid #F1F5F9',
        position:     'sticky',
        top:          0,
        zIndex:       100,
        boxShadow:    '0 1px 4px rgba(15,23,42,.07)',
      }}
    >
      <div
        style={{
          maxWidth:       1200,
          margin:         '0 auto',
          padding:        '0 18px',
          height:         58,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div
              style={{
                background:     '#F97316',
                borderRadius:   9,
                width:          30,
                height:         30,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       15,
              }}
            >
              ⚡
            </div>
            <span style={{ fontSize: 17, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.04em' }}>
              SwiftDrop
            </span>
          </Link>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: 2 }}>
            {NAV_LINKS.map(({ to, label }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  style={{
                    background:   active ? '#FFF7ED' : 'transparent',
                    color:        active ? '#F97316' : '#64748B',
                    borderRadius: 8,
                    padding:      '5px 12px',
                    fontWeight:   700,
                    fontSize:     13,
                    textDecoration: 'none',
                    transition:   'all 0.15s',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user ? (
            <>
              {/* Cart */}
              <button
                onClick={() => navigate(ROUTES.CART)}
                style={{
                  position:       'relative',
                  background:     '#F1F5F9',
                  border:         'none',
                  borderRadius:   9,
                  width:          38,
                  height:         38,
                  cursor:         'pointer',
                  fontSize:       16,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                }}
              >
                🛒
                {cartCount > 0 && (
                  <span
                    style={{
                      position:       'absolute',
                      top:            -3,
                      right:          -3,
                      background:     '#F97316',
                      color:          '#fff',
                      borderRadius:   10,
                      width:          17,
                      height:         17,
                      fontSize:       9,
                      fontWeight:     900,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <button
                onClick={() => navigate(ROUTES.NOTIFICATIONS)}
                style={{
                  position:       'relative',
                  background:     '#F1F5F9',
                  border:         'none',
                  borderRadius:   9,
                  width:          38,
                  height:         38,
                  cursor:         'pointer',
                  fontSize:       16,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                }}
              >
                🔔
                <span
                  style={{
                    position:   'absolute',
                    top:        -3,
                    right:      -3,
                    background: '#EF4444',
                    borderRadius: 10,
                    width:      10,
                    height:     10,
                    border:     '2px solid #fff',
                  }}
                />
              </button>

              {/* User avatar */}
              <div
                onClick={() => navigate(ROUTES.DASHBOARD)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}
              >
                <Avatar name={user.name} size={34} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                  {user.name.split(' ')[0]}
                </span>
              </div>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                style={{
                  background: 'transparent',
                  color:      '#64748B',
                  border:     'none',
                  padding:    '5px 13px',
                  fontWeight: 700,
                  fontSize:   13,
                  cursor:     'pointer',
                  textDecoration: 'none',
                }}
              >
                Sign In
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                style={{
                  background:   '#F97316',
                  color:        '#fff',
                  borderRadius: 10,
                  padding:      '7px 16px',
                  fontWeight:   700,
                  fontSize:     13,
                  textDecoration: 'none',
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
