import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Badge, Stars, Avatar } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

// ─── TRUST STRIP ─────────────────────────────────────────
export function TrustStrip() {
  const items = [
    ['⚡', 'Instant Refunds'],
    ['📸', 'Proof of Delivery'],
    ['🎯', 'Real ETAs'],
    ['🔒', 'Secure Payments'],
    ['🏆', 'Verified Riders'],
  ];
  return (
    <div style={{ background: '#F97316', padding: '11px 20px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
        {items.map(([icon, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#fff', fontWeight: 700, fontSize: 13 }}>
            <span>{icon}</span>{label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FEATURES SECTION ────────────────────────────────────
const FEATURES = [
  {
    icon:  '⚡',
    title: 'Instant Refund System',
    desc:  'Report wrong or missing items and get your money back in your wallet within 60 seconds. No calls, no wait.',
    color: '#F97316',
    bg:    '#FFF7ED',
  },
  {
    icon:  '📸',
    title: 'Proof of Delivery',
    desc:  'Riders must submit a photo or your unique OTP before marking delivered. Fake deliveries are impossible.',
    color: '#8B5CF6',
    bg:    '#F5F3FF',
  },
  {
    icon:  '🗺️',
    title: 'Smart Address System',
    desc:  'Pin your exact door on a map. Add landmarks. Save multiple locations. Your rider always finds you.',
    color: '#22C55E',
    bg:    '#F0FDF4',
  },
  {
    icon:  '⏱️',
    title: 'Honest ETA System',
    desc:  'AI-powered estimates using real traffic + kitchen prep time. Late by 15+ mins? Automatic cashback.',
    color: '#0EA5E9',
    bg:    '#F0F9FF',
  },
];

export function FeaturesSection() {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <Badge color="orange" size="md">Why SwiftDrop</Badge>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: '#0F172A', margin: '14px 0 10px', letterSpacing: '-0.03em' }}>
          Built to eliminate your stress
        </h2>
        <p style={{ fontSize: 15, color: '#64748B', maxWidth: 500, margin: '0 auto' }}>
          Every feature exists because customers complained about something on another app. We listened and built better.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
        {FEATURES.map((f) => (
          <Card key={f.title} hoverable style={{ borderTop: `3px solid ${f.color}` }}>
            <div style={{ width: 50, height: 50, borderRadius: 13, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 14 }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 7 }}>{f.title}</h3>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────
const STEPS = [
  { step: '01', icon: '🔍', title: 'Browse & Choose',       desc: 'Find your favourite restaurant, explore menus with honest reviews and real delivery times.' },
  { step: '02', icon: '🛒', title: 'Order & Pay Securely',  desc: 'Add items, pin your exact door on the map, and pay with card, transfer, USSD, or wallet.' },
  { step: '03', icon: '📍', title: 'Track & Receive',       desc: 'Watch your rider live on the map. Proof of delivery required at your door. Guaranteed.' },
];

export function HowItWorksSection() {
  return (
    <div style={{ background: '#0F172A', padding: '72px 20px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>How it works</h2>
          <p style={{ color: '#475569', fontSize: 15 }}>Order delicious food in 3 steps</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
          {STEPS.map((s) => (
            <div
              key={s.step}
              style={{ textAlign: 'center', padding: '28px 20px', background: 'rgba(255,255,255,.04)', borderRadius: 18, border: '1px solid rgba(255,255,255,.07)' }}
            >
              <div style={{ fontSize: 11, fontWeight: 900, color: '#F97316', marginBottom: 14, letterSpacing: '0.12em' }}>{s.step}</div>
              <div style={{ fontSize: 46, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 7 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Adaeze Okonkwo', role: 'Business Owner, Lagos',       text: 'Had one wrong order — refund hit my wallet in under 30 seconds. That kind of trust is everything.', rating: 5, bg: '#F97316' },
  { name: 'Tunde Fashola',  role: 'Software Engineer, Abuja',    text: 'The proof-of-delivery feature is genius. No more fake "delivered" claims. Photo + OTP = total accountability.', rating: 5, bg: '#0F172A' },
  { name: 'Ngozi Eze',      role: 'Doctor, Port Harcourt',       text: 'Real ETAs, real updates, real accountability. Finally an app that doesn\'t lie about delivery times.', rating: 5, bg: '#8B5CF6' },
];

export function TestimonialsSection() {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 20px' }}>
      <h2 style={{ fontSize: 38, fontWeight: 900, color: '#0F172A', textAlign: 'center', marginBottom: 40, letterSpacing: '-0.03em' }}>
        Loved by customers
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
        {TESTIMONIALS.map((t, i) => (
          <Card key={i} style={{ padding: '1.4rem' }}>
            <div style={{ marginBottom: 12 }}><Stars rating={t.rating} size={15} /></div>
            <p style={{ fontSize: 14, color: '#0F172A', lineHeight: 1.75, marginBottom: 18, fontStyle: 'italic' }}>
              "{t.text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <Avatar name={t.name} size={40} bg={t.bg} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: '#0F172A' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{t.role}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ SECTION ──────────────────────────────────────────
const FAQS = [
  { q: 'How does the 60-second refund work?', a: 'When you report an issue, our system cross-references the proof-of-delivery record. If delivery wasn\'t confirmed, the refund is automatic — straight to your wallet.' },
  { q: 'What if my rider claims delivery but I never received it?', a: 'Riders must submit a photo at your door or input your OTP. Without proof, the delivery is flagged and you\'re refunded instantly.' },
  { q: 'Which payment methods are supported?', a: 'Cards (Visa, Mastercard, Verve), bank transfer, USSD, and our SwiftDrop Wallet — powered by Flutterwave and Paystack.' },
  { q: 'How accurate are delivery times?', a: 'Our ETA uses real-time traffic, kitchen status, and rider GPS. If we exceed your window by 15+ minutes, automatic cashback is applied.' },
  { q: 'Can I become a vendor or rider?', a: 'Yes — use our dedicated onboarding flows. Vendors get a full analytics dashboard; riders go through ID and vehicle verification.' },
];

export function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ background: '#F1F5F9', padding: '72px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, color: '#0F172A', textAlign: 'center', marginBottom: 40, letterSpacing: '-0.03em' }}>
          Frequently asked questions
        </h2>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', textAlign: 'left', padding: '16px 0', background: 'none', border: 'none', fontWeight: 700, fontSize: 14, color: '#0F172A', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}
            >
              {f.q}
              <span style={{ color: '#F97316', fontSize: 18, flexShrink: 0, transition: 'transform .2s', transform: open === i ? 'rotate(45deg)' : 'none' }}>
                +
              </span>
            </button>
            {open === i && (
              <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CTA SECTION ──────────────────────────────────────────
export function CTASection() {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'linear-gradient(135deg,#F97316,#EA580C)', padding: '72px 20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 10, letterSpacing: '-0.03em' }}>
        Ready to order stress-free?
      </h2>
      <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 15, marginBottom: 28 }}>
        Join 50,000+ customers who've switched to SwiftDrop
      </p>
      <Button size="lg" variant="white" onClick={() => navigate(ROUTES.SIGNUP)}>
        Create Free Account →
      </Button>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
const FOOTER_COLS = [
  { title: 'Product',  links: ['Order Food', 'Track Order', 'Wallet', 'SwiftRewards'] },
  { title: 'Business', links: ['Become a Vendor', 'Rider Signup', 'Enterprise', 'API Docs'] },
  { title: 'Support',  links: ['Help Center', 'Report Issue', 'Contact Us', 'Trust & Safety'] },
];

export function Footer() {
  return (
    <div style={{ background: '#0F172A', padding: '44px 20px', color: '#475569' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
            <div style={{ background: '#F97316', borderRadius: 7, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>⚡</div>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#fff' }}>SwiftDrop</span>
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.7, maxWidth: 220 }}>
            Africa's most trusted delivery platform. Built with love in Lagos, Nigeria.
          </p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <div style={{ fontWeight: 800, color: '#fff', marginBottom: 10, fontSize: 11, letterSpacing: '0.06em' }}>
              {col.title.toUpperCase()}
            </div>
            {col.links.map((l) => (
              <div key={l} style={{ fontSize: 12, marginBottom: 7, cursor: 'pointer' }}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1180, margin: '28px auto 0', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.06)', fontSize: 11, textAlign: 'center' }}>
        © 2026 SwiftDrop Technologies Ltd · Privacy Policy · Terms of Service
      </div>
    </div>
  );
}
