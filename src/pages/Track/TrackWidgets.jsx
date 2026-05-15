import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Avatar, Stars } from '@/components/ui';

// ─── RIDER CARD ───────────────────────────────────────────
/**
 * @param {{ name, rating, bike, plate }} rider
 */
export function RiderCard({ rider }) {
  return (
    <Card style={{ marginBottom: 14, padding: '1.1rem' }}>
      <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>
        Your Rider
      </h3>
      <div style={{ display: 'flex', gap: 11, alignItems: 'center', marginBottom: 12 }}>
        <Avatar name={rider.name} size={46} bg="#0F172A" />
        <div>
          <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 13 }}>{rider.name}</div>
          <div style={{ fontSize: 11, color: '#64748B' }}>{rider.bike} · {rider.plate}</div>
          <Stars rating={rider.rating} size={11} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 7 }}>
        <Button variant="secondary" size="sm" fullWidth>📞 Call</Button>
        <Button variant="ghost"     size="sm" fullWidth>💬 Chat</Button>
      </div>
    </Card>
  );
}

// ─── ETA CARD ─────────────────────────────────────────────
export function ETACard({ minutes = 12 }) {
  return (
    <Card style={{ marginBottom: 14, padding: '1.1rem', background: '#FFF7ED', border: '1px solid #FED7AA' }}>
      <div style={{ fontSize: 11, color: '#92400E', fontWeight: 700, marginBottom: 4 }}>
        ⏱️ Estimated Arrival
      </div>
      <div style={{ fontSize: 28, fontWeight: 900, color: '#F97316' }}>~{minutes} min</div>
      <div style={{ fontSize: 11, color: '#B45309', marginTop: 2 }}>On time · No delays</div>
    </Card>
  );
}

// ─── PROOF OF DELIVERY CARD ───────────────────────────────
/**
 * @param {string} otp  4-digit delivery OTP
 */
export function PODCard({ otp }) {
  return (
    <Card style={{ marginBottom: 14, border: '1px solid #BBF7D0', background: '#F0FDF4', padding: '1.1rem' }}>
      <h3 style={{ fontSize: 13, fontWeight: 800, color: '#15803D', marginBottom: 7 }}>
        📸 Proof of Delivery
      </h3>
      <p style={{ fontSize: 11, color: '#166534', marginBottom: 10, lineHeight: 1.5 }}>
        Your rider must confirm delivery with a photo or your OTP before this order is marked complete.
      </p>
      <div
        style={{
          background:   '#FFFFFF',
          borderRadius: 10,
          padding:      '10px',
          textAlign:    'center',
          border:       '1px solid #BBF7D0',
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '0.25em', color: '#0F172A' }}>
          {otp}
        </div>
        <div style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>Your delivery OTP</div>
      </div>
    </Card>
  );
}

// ─── ORDER SUMMARY CARD ───────────────────────────────────
import { formatCurrency } from '@/utils';

export function OrderSummaryCard({ order }) {
  return (
    <Card style={{ padding: '1.1rem' }}>
      <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>
        Order Items
      </h3>
      {order.items?.map((item) => (
        <div
          key={item.id}
          style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}
        >
          <span style={{ color: '#64748B' }}>{item.name} ×{item.qty}</span>
          <span style={{ fontWeight: 700 }}>{formatCurrency(item.price * item.qty)}</span>
        </div>
      ))}
      <div
        style={{
          borderTop:  '1px solid #F1F5F9',
          paddingTop: 7,
          marginTop:  6,
          display:    'flex',
          justifyContent: 'space-between',
          fontWeight: 800,
          fontSize:   13,
        }}
      >
        <span>Total</span>
        <span style={{ color: '#F97316' }}>{formatCurrency(order.total)}</span>
      </div>
    </Card>
  );
}
