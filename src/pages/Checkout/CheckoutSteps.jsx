import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui';
import { SAVED_ADDRESSES, PAYMENT_METHODS } from '@/data';
import { formatCurrency } from '@/utils';

// ─── STEP 1: ADDRESS ─────────────────────────────────────
export function AddressStep({ addressIdx, setAddressIdx, notes, setNotes, onBack, onNext }) {
  return (
    <div style={{ maxWidth: 520 }}>
      <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>
        Delivery Address
      </h3>

      {SAVED_ADDRESSES.map((addr, i) => (
        <Card
          key={addr.id}
          onClick={() => setAddressIdx(i)}
          style={{
            marginBottom: 11,
            cursor:       'pointer',
            border:       `2px solid ${addressIdx === i ? '#F97316' : '#E2E8F0'}`,
            padding:      '13px 15px',
            background:   addressIdx === i ? '#FFF7ED' : '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22 }}>{addr.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', marginBottom: 2 }}>{addr.label}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{addr.address}</div>
                {addr.landmark && (
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>📌 {addr.landmark}</div>
                )}
              </div>
            </div>
            {addressIdx === i && <span style={{ color: '#F97316', fontSize: 17 }}>✓</span>}
          </div>
        </Card>
      ))}

      <Input
        label="Delivery Notes (optional)"
        placeholder="E.g. Call when you arrive, apartment 4B, leave at gate..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
      />

      <Card style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', marginBottom: 14, padding: '10px 13px' }}>
        <div style={{ fontSize: 12, color: '#15803D', fontWeight: 600 }}>
          🛡️ No-Stress Guarantee: Wrong order or non-delivery? Instant refund to your wallet.
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="secondary" onClick={onBack}>← Back</Button>
        <Button onClick={onNext}>Continue to Payment →</Button>
      </div>
    </div>
  );
}

// ─── STEP 2: PAYMENT ─────────────────────────────────────
export function PaymentStep({ payMethod, setPayMethod, walletBalance, onBack, onNext }) {
  return (
    <div style={{ maxWidth: 520 }}>
      <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>
        Payment Method
      </h3>

      {PAYMENT_METHODS.map((p) => {
        const desc = p.id === 'wallet'
          ? `Balance: ${formatCurrency(walletBalance ?? 0)}`
          : p.description;
        return (
          <Card
            key={p.id}
            onClick={() => setPayMethod(p.id)}
            style={{
              marginBottom: 10,
              cursor:       'pointer',
              border:       `2px solid ${payMethod === p.id ? '#F97316' : '#E2E8F0'}`,
              padding:      '12px 14px',
              background:   payMethod === p.id ? '#FFF7ED' : '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
              <span style={{ fontSize: 22 }}>{p.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>{p.label}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{desc}</div>
              </div>
              {payMethod === p.id && <span style={{ color: '#F97316', fontSize: 17 }}>✓</span>}
            </div>
          </Card>
        );
      })}

      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <Button variant="secondary" onClick={onBack}>← Back</Button>
        <Button onClick={onNext}>Review Order →</Button>
      </div>
    </div>
  );
}

// ─── STEP 3: REVIEW ──────────────────────────────────────
const PAY_LABELS = { wallet: 'SwiftDrop Wallet', card: 'Debit Card', transfer: 'Bank Transfer', ussd: 'USSD' };

export function ReviewStep({ cart, address, notes, payMethod, deliveryFee, discountAmount, orderTotal, onBack, onPlace, placing }) {
  return (
    <div style={{ maxWidth: 520 }}>
      {/* Items */}
      <Card style={{ marginBottom: 14, padding: '1.1rem' }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>Order Items</h3>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
            <span style={{ color: '#64748B' }}>{item.name} × {item.qty}</span>
            <span style={{ fontWeight: 700 }}>{formatCurrency(item.price * item.qty)}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 8, marginTop: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748B', marginBottom: 3 }}>
            <span>Delivery</span><span>{formatCurrency(deliveryFee)}</span>
          </div>
          {discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#22C55E', marginBottom: 3 }}>
              <span>Discount</span><span>-{formatCurrency(discountAmount)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 14, color: '#0F172A' }}>
            <span>Total</span>
            <span style={{ color: '#F97316' }}>{formatCurrency(orderTotal)}</span>
          </div>
        </div>
      </Card>

      {/* Address */}
      <Card style={{ marginBottom: 12, padding: '1.1rem' }}>
        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 3 }}>📍 Delivering to</div>
        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>{address?.address}</div>
        {notes && <div style={{ fontSize: 11, color: '#64748B', marginTop: 3 }}>Note: {notes}</div>}
      </Card>

      {/* Payment */}
      <Card style={{ marginBottom: 12, padding: '1.1rem' }}>
        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 3 }}>💳 Paying with</div>
        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>{PAY_LABELS[payMethod]}</div>
      </Card>

      {/* ETA */}
      <Card style={{ background: '#FFF7ED', border: '1px solid #FED7AA', marginBottom: 16, padding: '10px 13px' }}>
        <div style={{ fontSize: 12 }}>⏱️ Estimated delivery: <strong>28-35 minutes</strong></div>
      </Card>

      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="secondary" onClick={onBack}>← Back</Button>
        <Button fullWidth loading={placing} onClick={onPlace} style={{ flex: 1 }}>
          {placing ? '' : `🎉 Place Order — ${formatCurrency(orderTotal)}`}
        </Button>
      </div>
    </div>
  );
}
