import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { REFUND_REASONS } from '@/data';
import { formatCurrency, sleep } from '@/utils';

/**
 * Refund / Report Issue modal with instant-refund UX.
 * @param {boolean}  open
 * @param {Function} onClose
 * @param {object}   order   Active order
 */
export default function RefundModal({ open, onClose, order }) {
  const [reason,   setReason]   = useState('');
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  const handleSubmit = async () => {
    if (!reason) return;
    setLoading(true);
    await sleep(900);
    setLoading(false);
    setSuccess(true);
  };

  const handleClose = () => {
    onClose();
    // Reset after closing animation
    setTimeout(() => { setReason(''); setSuccess(false); }, 300);
  };

  return (
    <Modal open={open} onClose={handleClose} title="🚨 Report an Issue">
      {!success ? (
        <>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 18 }}>
            Tell us what went wrong. Our No-Stress Guarantee means your refund
            hits your wallet in <strong>under 60 seconds</strong>.
          </p>

          {REFUND_REASONS.map((r) => (
            <div
              key={r.id}
              onClick={() => setReason(r.id)}
              style={{
                display:    'flex',
                gap:        11,
                alignItems: 'center',
                padding:    '11px 13px',
                borderRadius: 10,
                border:     `2px solid ${reason === r.id ? '#F97316' : '#E2E8F0'}`,
                marginBottom: 7,
                cursor:     'pointer',
                background: reason === r.id ? '#FFF7ED' : '#FFFFFF',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 18 }}>{r.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{r.label}</span>
              {reason === r.id && (
                <span style={{ marginLeft: 'auto', color: '#F97316' }}>✓</span>
              )}
            </div>
          ))}

          <Card style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', margin: '14px 0', padding: '10px 13px' }}>
            <div style={{ fontSize: 12, color: '#15803D' }}>
              ⚡ <strong>Instant Refund Guarantee</strong>: Verified refunds
              arrive in your wallet within 60 seconds.
            </div>
          </Card>

          <Button
            fullWidth
            loading={loading}
            disabled={!reason}
            onClick={handleSubmit}
            style={{ background: '#EF4444' }}
          >
            {loading ? '' : 'Submit & Request Refund'}
          </Button>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: 60, marginBottom: 14 }}>✅</div>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 7 }}>
            Refund Initiated!
          </h3>
          <p style={{ color: '#64748B', fontSize: 13, marginBottom: 16 }}>
            <strong style={{ color: '#22C55E' }}>
              {formatCurrency(order?.total ?? 0)}
            </strong>{' '}
            is being credited to your wallet.
          </p>
          <Card style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', marginBottom: 18, padding: '14px' }}>
            <div style={{ fontSize: 11, color: '#166534', fontWeight: 700, marginBottom: 3 }}>
              Estimated credit time
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#22C55E' }}>
              Under 60 seconds
            </div>
          </Card>
          <Button fullWidth onClick={handleClose}>Close</Button>
        </div>
      )}
    </Modal>
  );
}
