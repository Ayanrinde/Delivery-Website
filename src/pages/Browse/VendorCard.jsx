import { useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';
import { Badge } from '@/components/ui';
import { buildRoute } from '@/constants/routes';
import { formatCurrency } from '@/utils';

/**
 * @param {Vendor}   vendor
 * @param {Function} onQuickAdd  (vendor, item) => void
 */
export default function VendorCard({ vendor, onQuickAdd }) {
  const navigate = useNavigate();

  return (
    <Card hoverable style={{ overflow: 'hidden', padding: 0 }}>
      {/* Banner */}
      <div
        onClick={() => navigate(buildRoute.vendor(vendor.id))}
        style={{
          height:     135,
          background: 'linear-gradient(135deg,#0F172A 0%,#1E3A5F 100%)',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize:   58,
          position:   'relative',
          cursor:     'pointer',
        }}
      >
        {vendor.emoji}

        {!vendor.isOpen && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '0.05em' }}>
            CLOSED
          </div>
        )}
        {vendor.promo && (
          <div style={{ position: 'absolute', top: 8, left: 8 }}>
            <Badge color="orange">{vendor.promo}</Badge>
          </div>
        )}
        {vendor.tag && (
          <div style={{ position: 'absolute', top: 8, right: 8 }}>
            <Badge color="navy">{vendor.tag}</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div
        onClick={() => navigate(buildRoute.vendor(vendor.id))}
        style={{ padding: '12px 14px 8px', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0 }}>{vendor.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 11, color: '#F59E0B' }}>★</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{vendor.rating}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#64748B', alignItems: 'center' }}>
          <span>🕐 {vendor.deliveryTime} min</span>
          <span>🛵 {formatCurrency(vendor.deliveryFee)}</span>
          <span style={{ color: vendor.isOpen ? '#22C55E' : '#EF4444' }}>
            ● {vendor.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Quick-add items */}
      <div style={{ padding: '0 14px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {vendor.items.slice(0, 2).map((item) => (
          <button
            key={item.id}
            disabled={!vendor.isOpen}
            onClick={() => onQuickAdd(vendor, item)}
            style={{
              background:   '#F1F5F9',
              border:       '1px solid #E2E8F0',
              borderRadius: 7,
              padding:      '4px 9px',
              fontSize:     11,
              cursor:       vendor.isOpen ? 'pointer' : 'not-allowed',
              fontFamily:   'inherit',
              color:        '#0F172A',
              fontWeight:   600,
              transition:   'all 0.15s',
              opacity:      vendor.isOpen ? 1 : 0.5,
            }}
            onMouseEnter={(e) => {
              if (vendor.isOpen) {
                e.currentTarget.style.background   = '#FFF7ED';
                e.currentTarget.style.borderColor  = '#F97316';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background  = '#F1F5F9';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
          >
            + {item.name}
          </button>
        ))}
      </div>
    </Card>
  );
}
