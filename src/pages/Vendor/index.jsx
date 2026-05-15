import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VENDORS } from '@/data';
import { ROUTES } from '@/constants/routes';
import { useCart } from '@/contexts';
import { useToast } from '@/contexts';
import { formatCurrency } from '@/utils';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui';
import MenuItemCard from './MenuItemCard';
import CartSidebar from './CartSidebar';

export default function VendorPage() {
  const { id }          = useParams();
  const navigate        = useNavigate();
  const { addItem }     = useCart();
  const { showToast }   = useToast();

  const [itemModal, setItemModal] = useState(null);
  const [qty, setQty]             = useState(1);

  const vendor = VENDORS.find((v) => v.id === Number(id));

  if (!vendor) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>🤔</div>
        <h2 style={{ color: '#0F172A' }}>Restaurant not found</h2>
        <Button style={{ marginTop: 16 }} onClick={() => navigate(ROUTES.BROWSE)}>
          Back to Browse
        </Button>
      </div>
    );
  }

  const openModal = (item) => { setItemModal(item); setQty(1); };

  const confirmAdd = () => {
    addItem(itemModal, vendor, qty);
    showToast(`${itemModal.name} added to cart`, 'orange');
    setItemModal(null);
    setQty(1);
  };

  return (
    <div className="page-enter" style={{ maxWidth: 920, margin: '0 auto', padding: '22px 18px' }}>
      {/* Back */}
      <button
        onClick={() => navigate(ROUTES.BROWSE)}
        style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: 13, marginBottom: 18, padding: 0, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', fontWeight: 600 }}
      >
        ← Back to restaurants
      </button>

      {/* Vendor header */}
      <Card style={{ marginBottom: 22, overflow: 'hidden', padding: 0 }}>
        <div style={{ height: 180, background: 'linear-gradient(135deg,#0F172A,#1E3A5F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 70 }}>
          {vendor.emoji}
        </div>
        <div style={{ padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 6, letterSpacing: '-0.03em' }}>
              {vendor.name}
            </h1>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 8 }}>{vendor.description}</p>
            <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#64748B', flexWrap: 'wrap', alignItems: 'center' }}>
              <span>⭐ {vendor.rating}</span>
              <span>🕐 {vendor.deliveryTime} min</span>
              <span>🛵 {formatCurrency(vendor.deliveryFee)}</span>
              {vendor.isOpen
                ? <Badge color="green">Open Now</Badge>
                : <Badge color="red">Closed</Badge>}
              {vendor.promo && <Badge color="orange">{vendor.promo}</Badge>}
            </div>
          </div>
        </div>
      </Card>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 310px', gap: 22, alignItems: 'start' }}>
        {/* Menu */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 14 }}>Menu</h2>
          <div style={{ display: 'grid', gap: 11 }}>
            {vendor.items.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                disabled={!vendor.isOpen}
                onAdd={openModal}
              />
            ))}
          </div>
        </div>

        {/* Cart sidebar */}
        <div style={{ position: 'sticky', top: 70 }}>
          <CartSidebar vendor={vendor} />
        </div>
      </div>

      {/* Add item modal */}
      <Modal open={!!itemModal} onClose={() => setItemModal(null)} title="Add to Order" width={370}>
        {itemModal && (
          <>
            <div style={{ textAlign: 'center', fontSize: 60, marginBottom: 10 }}>{itemModal.emoji}</div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 3 }}>{itemModal.name}</h3>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>{itemModal.description}</p>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#F97316', marginBottom: 20 }}>
              {formatCurrency(itemModal.price)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Qty:</span>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: 15, background: '#F1F5F9' }}>−</button>
              <span style={{ fontWeight: 900, fontSize: 16, minWidth: 18, textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: 15, background: '#F1F5F9' }}>+</button>
              <span style={{ fontSize: 13, color: '#64748B', marginLeft: 4 }}>
                = {formatCurrency(itemModal.price * qty)}
              </span>
            </div>
            <Button fullWidth onClick={confirmAdd}>Add to Order →</Button>
          </>
        )}
      </Modal>
    </div>
  );
}
