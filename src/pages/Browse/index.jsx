import { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui';
import Card from '@/components/ui/Card';
import VendorCard from './VendorCard';
import { useCart } from '@/contexts';
import { useToast } from '@/contexts';
import { useVendorFilter } from '@/hooks';
import { CATEGORIES } from '@/data';
import { formatCurrency } from '@/utils';

export default function Browse() {
  const [loading,    setLoading]    = useState(true);
  const [itemModal,  setItemModal]  = useState(null); // { vendor, item }
  const [qty,        setQty]        = useState(1);

  const { filtered, search, setSearch, category, setCategory } = useVendorFilter();
  const { addItem }    = useCart();
  const { showToast }  = useToast();

  // Simulate data fetch
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const handleQuickAdd = (vendor, item) => {
    setItemModal({ vendor, item });
    setQty(1);
  };

  const confirmAdd = () => {
    addItem(itemModal.item, itemModal.vendor, qty);
    showToast(`${itemModal.item.name} added to cart 🛒`, 'orange');
    setItemModal(null);
    setQty(1);
  };

  return (
    <div className="page-enter" style={{ maxWidth: 1180, margin: '0 auto', padding: '22px 18px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', marginBottom: 3, letterSpacing: '-0.03em' }}>
          Order Food
        </h1>
        <p style={{ color: '#64748B', fontSize: 13 }}>
          📍 Lekki Phase 1, Lagos · Fast delivery to your area
        </p>
      </div>

      {/* Search */}
      <Input
        placeholder="Search restaurants, cuisines..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        icon="🔍"
        style={{ marginBottom: 16 }}
      />

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 6, marginBottom: 24 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              background:   category === c ? '#0F172A' : '#FFFFFF',
              color:        category === c ? '#fff'    : '#64748B',
              border:       `1px solid ${category === c ? '#0F172A' : '#E2E8F0'}`,
              borderRadius: 20,
              padding:      '6px 15px',
              fontSize:     12,
              fontWeight:   700,
              cursor:       'pointer',
              whiteSpace:   'nowrap',
              fontFamily:   'inherit',
              transition:   'all 0.15s',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 18 }}>
          {[...Array(6)].map((_, i) => (
            <Card key={i} style={{ padding: 0, overflow: 'hidden' }}>
              <Skeleton height={135} radius={0} />
              <div style={{ padding: '12px 14px' }}>
                <Skeleton height={18} width="55%" style={{ marginBottom: 8 }} />
                <Skeleton height={13} width="75%" />
              </div>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>🍽️</div>
          <h3 style={{ color: '#0F172A', marginBottom: 6 }}>No restaurants found</h3>
          <p style={{ color: '#64748B', fontSize: 13 }}>Try a different search or category</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 18 }}>
          {filtered.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} onQuickAdd={handleQuickAdd} />
          ))}
        </div>
      )}

      {/* Quick-add modal */}
      <Modal open={!!itemModal} onClose={() => setItemModal(null)} title="Add to Cart" width={380}>
        {itemModal && (
          <>
            <div style={{ textAlign: 'center', fontSize: 64, marginBottom: 12 }}>{itemModal.item.emoji}</div>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
              {itemModal.item.name}
            </h3>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>{itemModal.item.description}</p>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#F97316', marginBottom: 22 }}>
              {formatCurrency(itemModal.item.price)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Quantity:</span>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: 16, background: '#F1F5F9' }}>−</button>
              <span style={{ fontWeight: 800, fontSize: 16, minWidth: 20, textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: 16, background: '#F1F5F9' }}>+</button>
              <span style={{ fontSize: 13, color: '#64748B', marginLeft: 4 }}>
                = {formatCurrency(itemModal.item.price * qty)}
              </span>
            </div>
            <Button fullWidth onClick={confirmAdd}>Add to Cart →</Button>
          </>
        )}
      </Modal>
    </div>
  );
}
