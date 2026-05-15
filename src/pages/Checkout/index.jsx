import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Badge } from '@/components/ui';
import { AddressStep, PaymentStep, ReviewStep } from './CheckoutSteps';
import { useCart } from '@/contexts';
import { useAuth } from '@/contexts';
import { useOrder } from '@/contexts';
import { useToast } from '@/contexts';
import { useCheckout } from '@/hooks';
import { ROUTES } from '@/constants/routes';
import { formatCurrency, sleep } from '@/utils';

const STEP_LABELS = ['Cart', 'Address', 'Payment', 'Review'];

export default function Checkout() {
  const navigate        = useNavigate();
  const { cart, cartSubtotal, clearCart } = useCart();
  const { user }        = useAuth();
  const { placeOrder }  = useOrder();
  const { showToast }   = useToast();
  const [placing, setPlacing] = useState(false);

  const checkout = useCheckout(cartSubtotal, 400);
  const {
    stepIndex, steps, goNext, goBack,
    addressIdx, setAddressIdx,
    selectedAddress, notes, setNotes,
    payMethod, setPayMethod,
    couponCode, setCouponCode,
    appliedCoupon, discountAmount, couponError, applyCode,
    deliveryFee, orderTotal,
  } = checkout;

  // Redirect if cart is empty
  if (!cart.length) {
    return (
      <div className="page-enter" style={{ maxWidth: 500, margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 70, marginBottom: 14 }}>🛒</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginBottom: 7 }}>Your cart is empty</h2>
        <p style={{ color: '#64748B', marginBottom: 22 }}>Add some food before checking out</p>
        <Button onClick={() => navigate(ROUTES.BROWSE)}>Browse Restaurants</Button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setPlacing(true);
    await sleep(1800);
    placeOrder({
      cart,
      total:      orderTotal,
      vendorName: cart[0]?.vendorName ?? 'Restaurant',
      address:    selectedAddress?.address ?? '',
    });
    clearCart();
    showToast('Order placed! Track it live 🛵', 'success');
    navigate(ROUTES.TRACK);
    setPlacing(false);
  };

  return (
    <div className="page-enter" style={{ maxWidth: 820, margin: '0 auto', padding: '22px 18px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 24, letterSpacing: '-0.03em' }}>
        {STEP_LABELS[stepIndex]}
      </h1>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
        {STEP_LABELS.map((_, i) => (
          <div
            key={i}
            style={{
              flex:         1,
              height:       4,
              borderRadius: 4,
              background:   i <= stepIndex ? '#F97316' : '#E2E8F0',
              transition:   'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* ── STEP 0: CART REVIEW ── */}
      {stepIndex === 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 290px', gap: 20, alignItems: 'start' }}>
          {/* Items */}
          <div>
            {cart.map((item) => (
              <Card key={item.id} style={{ marginBottom: 11, display: 'flex', alignItems: 'center', gap: 13, padding: '12px 14px' }}>
                <span style={{ fontSize: 32 }}>{item.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{item.vendorName}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <button
                    onClick={() => {}}
                    style={{ width: 24, height: 24, borderRadius: 5, border: '1px solid #E2E8F0', cursor: 'pointer', background: '#F1F5F9', fontSize: 13 }}
                  >
                    −
                  </button>
                  <span style={{ fontWeight: 800, minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                  <button
                    onClick={() => {}}
                    style={{ width: 24, height: 24, borderRadius: 5, border: '1px solid #E2E8F0', cursor: 'pointer', background: '#F1F5F9', fontSize: 13 }}
                  >
                    +
                  </button>
                </div>
                <div style={{ fontWeight: 800, color: '#F97316', minWidth: 72, textAlign: 'right', fontSize: 13 }}>
                  {formatCurrency(item.price * item.qty)}
                </div>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card style={{ padding: '1.2rem', alignSelf: 'start' }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>Summary</h3>
            <div style={{ fontSize: 12, color: '#64748B', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>Subtotal</span>
                <span style={{ color: '#0F172A', fontWeight: 600 }}>{formatCurrency(cartSubtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery</span>
                <span style={{ color: '#0F172A', fontWeight: 600 }}>{formatCurrency(deliveryFee)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span>Discount</span>
                  <span style={{ color: '#22C55E', fontWeight: 700 }}>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
            </div>

            {/* Coupon */}
            <div style={{ display: 'flex', gap: 7, marginBottom: 8 }}>
              <input
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{ flex: 1, padding: '7px 9px', border: '1px solid #E2E8F0', borderRadius: 7, fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
              />
              <Button size="sm" variant="secondary" onClick={applyCode}>Apply</Button>
            </div>
            {appliedCoupon && (
              <div style={{ marginBottom: 8 }}>
                <Badge color="green">✅ {appliedCoupon.label}</Badge>
              </div>
            )}
            {couponError && (
              <p style={{ fontSize: 11, color: '#EF4444', marginBottom: 8 }}>{couponError}</p>
            )}

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 9, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 14, color: '#0F172A', marginBottom: 12 }}>
              <span>Total</span>
              <span>{formatCurrency(orderTotal)}</span>
            </div>
            <Button fullWidth onClick={goNext}>Continue →</Button>
          </Card>
        </div>
      )}

      {/* ── STEP 1: ADDRESS ── */}
      {stepIndex === 1 && (
        <AddressStep
          addressIdx={addressIdx}
          setAddressIdx={setAddressIdx}
          notes={notes}
          setNotes={setNotes}
          onBack={goBack}
          onNext={goNext}
        />
      )}

      {/* ── STEP 2: PAYMENT ── */}
      {stepIndex === 2 && (
        <PaymentStep
          payMethod={payMethod}
          setPayMethod={setPayMethod}
          walletBalance={user?.wallet}
          onBack={goBack}
          onNext={goNext}
        />
      )}

      {/* ── STEP 3: REVIEW ── */}
      {stepIndex === 3 && (
        <ReviewStep
          cart={cart}
          address={selectedAddress}
          notes={notes}
          payMethod={payMethod}
          deliveryFee={deliveryFee}
          discountAmount={discountAmount}
          orderTotal={orderTotal}
          onBack={goBack}
          onPlace={handlePlaceOrder}
          placing={placing}
        />
      )}
    </div>
  );
}
