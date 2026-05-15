import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/contexts';
import { ROUTES } from '@/constants/routes';

/**
 * Shared auth form — switches between login and signup modes.
 * @param {'login'|'signup'} mode
 */
export default function AuthForm({ mode }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login, signup, loginAsDemo, loading, error } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const from = location.state?.from?.pathname ?? ROUTES.BROWSE;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    let ok = false;
    if (mode === 'login') {
      ok = await login({ email: form.email, password: form.password });
    } else {
      ok = await signup({ name: form.name, email: form.email, password: form.password });
    }
    if (ok) navigate(from, { replace: true });
  };

  const handleDemo = () => {
    loginAsDemo();
    navigate(ROUTES.BROWSE, { replace: true });
  };

  const isLogin = mode === 'login';

  return (
    <div
      className="page-enter"
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo + heading */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⚡</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', marginBottom: 6, letterSpacing: '-0.03em' }}>
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p style={{ color: '#64748B', fontSize: 13 }}>
            {isLogin
              ? 'Sign in to your SwiftDrop account'
              : 'Start ordering stress-free today'}
          </p>
        </div>

        <Card style={{ padding: '1.5rem' }}>
          {!isLogin && (
            <Input
              label="Full Name"
              placeholder="Tunde Adeyemi"
              value={form.name}
              onChange={set('name')}
              icon="👤"
            />
          )}
          <Input
            label="Email Address"
            placeholder="you@example.com"
            type="email"
            value={form.email}
            onChange={set('email')}
            icon="📧"
          />
          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={set('password')}
            icon="🔒"
          />

          {error && (
            <p style={{ color: '#EF4444', fontSize: 12, marginBottom: 10 }}>{error}</p>
          )}

          <Button fullWidth loading={loading} onClick={handleSubmit} style={{ marginBottom: 12 }}>
            {loading ? '' : isLogin ? 'Sign In →' : 'Create Account →'}
          </Button>

          <div style={{ textAlign: 'center', fontSize: 13, color: '#64748B' }}>
            {isLogin ? (
              <>
                No account?{' '}
                <Link to={ROUTES.SIGNUP} style={{ color: '#F97316', fontWeight: 700, textDecoration: 'none' }}>
                  Sign up free
                </Link>
              </>
            ) : (
              <>
                Have an account?{' '}
                <Link to={ROUTES.LOGIN} style={{ color: '#F97316', fontWeight: 700, textDecoration: 'none' }}>
                  Sign in
                </Link>
              </>
            )}
          </div>
        </Card>

        {/* Demo shortcut */}
        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <button
            onClick={handleDemo}
            style={{
              background:   '#F1F5F9',
              border:       '1px solid #E2E8F0',
              borderRadius: 10,
              padding:      '8px 18px',
              cursor:       'pointer',
              fontSize:     12,
              color:        '#64748B',
              fontFamily:   'inherit',
              fontWeight:   600,
            }}
          >
            👻 Continue as Demo User
          </button>
        </div>
      </div>
    </div>
  );
}
