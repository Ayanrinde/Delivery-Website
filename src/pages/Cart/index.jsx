import { useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useCart } from '@/contexts';
import { formatCurrency } from '@/utils';
import { ROUTES } from '@/constants/routes';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, adjustItem, clearCart } = useCart();

  const DELIVERY_FEE = cart.length ? 400 : 0;
  const total = cartSubtotal + DELIVERY_FEE;

  if (cart.length === 0) {
    return (
      <div className="page-enter" style={{ maxWidth: 500, margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 70, marginBottom: 14 }}>🛒</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginBottom: 7 }}>Your cart is empty</h2>
        <p style={{ color: '#64748B', marginBottom: 22 }}>Add some food to get started</p>
        <Button onClick={() => navigate(ROUTES.BROWSE)}>Browse Restaurants</Button>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ maxWidth: 820, margin: '0 auto', padding: '22px 18px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 24, letterSpacing: '-0.03em' }}>
        Your Cart
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 290px', gap: 20, alignItems: 'start' }}>
        {/* Item list */}
        <div>
          {cart.map((item) => (
            <Card key={item.id} style={{ marginBottom: 11, display: 'flex', alignItems: 'center', gap: 13, padding: '12px 14px' }}>
              <span style={{ fontSize: 32 }}>{item.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{item.vendorName}</div>
              </div>
              {/* Adjuster */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <button
                  onClick={() => adjustItem(item.id, -1)}
                  style={{ width: 24, height: 24, borderRadius: 5, border: '1px solid #E2E8F0', cursor: 'pointer', background: '#F1F5F9' }}
                >
                  −
                </button>
                <span style={{ fontWeight: 800, minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                <button
                  onClick={() => adjustItem(item.id, +1)}
                  style={{ width: 24, height: 24, borderRadius: 5, border: '1px solid #E2E8F0', cursor: 'pointer', background: '#F1F5F9' }}
                >
                  +
                </button>
              </div>
              <div style={{ fontWeight: 800, color: '#F97316', minWidth: 72, textAlign: 'right', fontSize: 13 }}>
                {formatCurrency(item.price * item.qty)}
              </div>
            </Card>
          ))}

          <button
            onClick={clearCart}
            style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, padding: 0, marginTop: 4 }}
          >
            🗑️ Clear cart
          </button>
        </div>

        {/* Summary */}
        <Card style={{ padding: '1.2rem', alignSelf: 'start' }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>Order Summary</h3>
          <div style={{ fontSize: 12, color: '#64748B', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span>Subtotal</span>
              <span style={{ color: '#0F172A', fontWeight: 600 }}>{formatCurrency(cartSubtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Delivery fee</span>
              <span style={{ color: '#0F172A', fontWeight: 600 }}>{formatCurrency(DELIVERY_FEE)}</span>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 9, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 14, color: '#0F172A', marginBottom: 12 }}>
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          {/* No-Stress Guarantee banner */}
          <Card style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '10px 13px', marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: '#15803D', fontWeight: 600 }}>
              🛡️ No-Stress Guarantee: Wrong order or non-delivery? Instant refund to your wallet.
            </div>
          </Card>

          <Button fullWidth onClick={() => navigate(ROUTES.CHECKOUT)}>
            Proceed to Checkout →
          </Button>
          <Button fullWidth variant="ghost" size="sm" style={{ marginTop: 8 }} onClick={() => navigate(ROUTES.BROWSE)}>
            + Add more items
          </Button>
        </Card>
      </div>
    </div>
  );
}
