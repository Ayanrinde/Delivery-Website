import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/ui/Button';

const STATS = [
  { value: '98.7%', label: 'Delivery Rate' },
  { value: '<60s',  label: 'Avg Refund'    },
  { value: '4.9★',  label: 'App Rating'    },
  { value: '50k+',  label: 'Customers'     },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'linear-gradient(135deg,#0F172A 0%,#1E3A5F 55%,#0F172A 100%)',
        minHeight:  '84vh',
        display:    'flex',
        alignItems: 'center',
        position:   'relative',
        overflow:   'hidden',
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position:   'absolute',
              width:      280 + i * 60,
              height:     280 + i * 60,
              borderRadius: '50%',
              background: '#F97316',
              opacity:    0.03,
              left:       `${8 + i * 18}%`,
              top:        `${-15 + i * 22}%`,
              filter:     'blur(55px)',
            }}
          />
        ))}
      </div>

      <div
        style={{
          maxWidth: 1180,
          margin:   '0 auto',
          padding:  '60px 20px',
          display:  'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:      50,
          alignItems: 'center',
          width:    '100%',
          position: 'relative',
          zIndex:   1,
        }}
      >
        {/* Left */}
        <div className="anim-slide-up">
          <div
            style={{
              display:    'inline-flex',
              alignItems: 'center',
              gap:        7,
              background: 'rgba(249,115,22,.12)',
              border:     '1px solid rgba(249,115,22,.25)',
              borderRadius: 20,
              padding:    '5px 14px',
              marginBottom: 22,
            }}
          >
            <span style={{ fontSize: 11 }}>⚡</span>
            <span style={{ fontSize: 11, color: '#FDBA74', fontWeight: 700, letterSpacing: '0.05em' }}>
              AFRICA'S MOST TRUSTED DELIVERY
            </span>
          </div>

          <h1
            style={{
              fontSize:      50,
              fontWeight:    900,
              color:         '#fff',
              margin:        '0 0 18px',
              lineHeight:    1.08,
              letterSpacing: '-0.04em',
            }}
          >
            Delivery that<br />
            <span style={{ color: '#F97316' }}>never lets you</span>
            <br />down.
          </h1>

          <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.75, marginBottom: 30, maxWidth: 460 }}>
            Instant refunds. Proof of delivery. Real ETAs. SwiftDrop is the
            delivery app built around one thing — your complete peace of mind.
          </p>

          <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
            <Button size="lg" onClick={() => navigate(ROUTES.SIGNUP)}>
              Start Ordering Free →
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate(ROUTES.BROWSE)}
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,.25)' }}
            >
              Browse Restaurants
            </Button>
          </div>

          <div style={{ display: 'flex', gap: 28 }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#475569' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div className="anim-float" style={{ fontSize: 130, filter: 'drop-shadow(0 20px 40px rgba(249,115,22,.35))' }}>
            🛵
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', maxWidth: 320 }}>
            {[
              { emoji: '🍗', label: 'Fast Food' },
              { emoji: '🌶️', label: 'Nigerian'  },
              { emoji: '🍕', label: 'Pizza'     },
              { emoji: '🍦', label: 'Desserts'  },
            ].map((c) => (
              <div
                key={c.label}
                onClick={() => navigate(ROUTES.BROWSE)}
                style={{
                  background:   'rgba(255,255,255,.06)',
                  border:       '1px solid rgba(255,255,255,.10)',
                  borderRadius: 12,
                  padding:      '12px 14px',
                  display:      'flex',
                  alignItems:   'center',
                  gap:          8,
                  cursor:       'pointer',
                }}
              >
                <span style={{ fontSize: 20 }}>{c.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.75)' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
