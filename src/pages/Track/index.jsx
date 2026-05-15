import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusTimeline from './StatusTimeline';
import RefundModal from './RefundModal';
import { RiderCard, ETACard, PODCard, OrderSummaryCard } from './TrackWidgets';
import { useOrder } from '@/contexts';
import { useOrderTracking } from '@/hooks';
import { ROUTES } from '@/constants/routes';

export default function Track() {
  const navigate            = useNavigate();
  const { activeOrder }     = useOrder();
  const [refundOpen, setRefundOpen] = useState(false);

  const { statusIndex, allStatuses } = useOrderTracking(!!activeOrder, 5500);

  if (!activeOrder) {
    return (
      <div className="page-enter" style={{ maxWidth: 540, margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 70, marginBottom: 14 }}>📦</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginBottom: 7 }}>
          No active order
        </h2>
        <p style={{ color: '#64748B', marginBottom: 22 }}>
          Place an order to track it in real-time
        </p>
        <Button onClick={() => navigate(ROUTES.BROWSE)}>Browse Restaurants</Button>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ maxWidth: 880, margin: '0 auto', padding: '22px 18px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', marginBottom: 3, letterSpacing: '-0.03em' }}>
            Live Order Tracking
          </h1>
          <p style={{ color: '#64748B', fontSize: 13 }}>
            {activeOrder.id} · {activeOrder.vendor}
          </p>
        </div>
        <Button variant="danger" size="sm" onClick={() => setRefundOpen(true)}>
          🚨 Report Issue
        </Button>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
        {/* Left: map + timeline */}
        <div>
          {/* Map placeholder */}
          <Card
            style={{
              height:         240,
              marginBottom:   18,
              background:     'linear-gradient(135deg,#0F172A,#1E3A5F)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexDirection:  'column',
              gap:            10,
            }}
          >
            <div style={{ fontSize: 44 }}>🗺️</div>
            <div style={{ color: '#64748B', fontSize: 13, textAlign: 'center' }}>
              Live Map Tracking
              <br />
              <span style={{ fontSize: 11, color: '#475569' }}>
                Google Maps · Updates every 15s
              </span>
            </div>
            <div
              className="anim-pulse"
              style={{ background: '#F97316', borderRadius: 20, padding: '6px 16px', color: '#fff', fontSize: 12, fontWeight: 700 }}
            >
              🛵 Rider is 1.2km away
            </div>
          </Card>

          <StatusTimeline statuses={allStatuses} currentIdx={statusIndex} />
        </div>

        {/* Right: rider + ETA + POD + summary */}
        <div>
          <RiderCard rider={activeOrder.rider} />
          <ETACard minutes={12} />
          <PODCard otp={activeOrder.otp} />
          <OrderSummaryCard order={activeOrder} />
        </div>
      </div>

      {/* Refund modal */}
      <RefundModal
        open={refundOpen}
        onClose={() => setRefundOpen(false)}
        order={activeOrder}
      />
    </div>
  );
}
