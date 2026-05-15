import { useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useCart } from '@/contexts';
import { formatCurrency } from '@/utils';
import { ROUTES } from '@/constants/routes';

/**
 * Sticky cart sidebar on the vendor menu page.
 * @param {Vendor} vendor
 */
export default function CartSidebar({ vendor }) {
  const navigate = useNavigate();
  const { vendorCart, adjustItem, cartSubtotal } = useCart();

  const items      = vendorCart(vendor.id);
  const subtotal   = items.reduce((s, i) => s + i.price * i.qty, 0);
  const hasItems   = items.length > 0;

  return (
    <Card style={{ padding: '1.2rem' }}>
      <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 14 }}>🛒 Your Order</h3>

      {!hasItems ? (
        <div style={{ textAlign: 'center', padding: '20px 0', color: '#64748B' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🍽️</div>
          <p style={{ fontSize: 13 }}>Add items to start your order</p>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{item.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{formatCurrency(item.price)} each</div>
              </div>
              {/* Quantity adjuster */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <button
                  onClick={() => adjustItem(item.id, -1)}
                  style={{ width: 22, height: 22, borderRadius: 5, border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: 12, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  −
                </button>
                <span style={{ fontWeight: 800, minWidth: 14, textAlign: 'center', fontSize: 13 }}>{item.qty}</span>
                <button
                  onClick={() => adjustItem(item.id, +1)}
                  style={{ width: 22, height: 22, borderRadius: 5, border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: 12, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* Totals */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 10, marginTop: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginBottom: 3 }}>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginBottom: 8 }}>
              <span>Delivery</span>
              <span>{formatCurrency(vendor.deliveryFee)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
              <span>Total</span>
              <span>{formatCurrency(subtotal + vendor.deliveryFee)}</span>
            </div>
          </div>

          <Button fullWidth style={{ marginTop: 12 }} onClick={() => navigate(ROUTES.CHECKOUT)}>
            Checkout →
          </Button>
        </>
      )}
    </Card>
  );
}
