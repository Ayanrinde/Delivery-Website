import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import StatCard from '@/components/ui/StatCard';
import { Badge, Stars, Avatar } from '@/components/ui';
import { useAuth } from '@/contexts';
import { PAST_ORDERS, WALLET_TRANSACTIONS } from '@/data';
import { SAVED_ADDRESSES } from '@/data';
import { formatCurrency, sleep } from '@/utils';

// ─── OVERVIEW TAB ─────────────────────────────────────────
export function OverviewTab({ onTabChange }) {
  const { user } = useAuth();
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(155px,1fr))', gap: 14, marginBottom: 22 }}>
        <StatCard label="Wallet Balance" value={formatCurrency(user?.wallet ?? 0)} icon="💰" sub="↑ 8% this week" />
        <StatCard label="Total Orders"   value="23"   icon="📦" />
        <StatCard label="SwiftPoints"    value="1,240" icon="⭐" sub="= ₦1,240 credit" subColor="#F59E0B" />
        <StatCard label="You Saved"      value="₦4,500" icon="🎁" sub="via promos & cashback" subColor="#22C55E" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* Recent orders */}
        <Card style={{ padding: '1.1rem' }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 13 }}>Recent Orders</h3>
          {PAST_ORDERS.slice(0, 3).map((o) => (
            <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid #F8FAFC' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, color: '#0F172A' }}>{o.vendor}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{o.date} · {o.id}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, fontSize: 12, marginBottom: 3 }}>{formatCurrency(o.total)}</div>
                <Badge color={o.status === 'delivered' ? 'green' : o.status === 'refunded' ? 'amber' : 'blue'}>
                  {o.status}
                </Badge>
              </div>
            </div>
          ))}
          <Button variant="ghost" size="sm" onClick={() => onTabChange('orders')}>
            View all orders →
          </Button>
        </Card>

        {/* Rewards */}
        <Card style={{ padding: '1.1rem' }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 13 }}>🎁 SwiftRewards</h3>
          <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 12, padding: '14px 16px', marginBottom: 13 }}>
            <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 3 }}>Points Balance</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#fff' }}>1,240 pts</div>
            <div style={{ fontSize: 11, color: '#F97316', marginTop: 3 }}>= ₦1,240 wallet credit</div>
          </div>
          <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>
            Next reward at 2,000 pts (62% there)
          </div>
          <div style={{ height: 5, background: '#F1F5F9', borderRadius: 3, marginBottom: 13 }}>
            <div style={{ height: 5, background: '#F97316', borderRadius: 3, width: '62%' }} />
          </div>
          <Button variant="secondary" size="sm" fullWidth>Redeem Points</Button>
        </Card>
      </div>
    </>
  );
}

// ─── ORDERS TAB ───────────────────────────────────────────
export function OrdersTab() {
  return (
    <div>
      {PAST_ORDERS.map((o) => (
        <Card key={o.id} style={{ marginBottom: 12, padding: '1.1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 18 }}>{o.vendorEmoji}</span>
                <span style={{ fontWeight: 800, fontSize: 14, color: '#0F172A' }}>{o.vendor}</span>
                <Badge color={o.status === 'delivered' ? 'green' : o.status === 'refunded' ? 'amber' : 'blue'}>
                  {o.status}
                </Badge>
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{o.items.join(', ')}</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>{o.date} · {o.id}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 900, fontSize: 15, color: '#0F172A', marginBottom: 4 }}>
                {formatCurrency(o.total)}
              </div>
              {o.rating && <Stars rating={o.rating} size={12} />}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 11 }}>
            <Button size="sm" variant="secondary">Reorder</Button>
            {o.status === 'delivered' && !o.rating && (
              <Button size="sm" variant="ghost">⭐ Rate</Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── WALLET TAB ───────────────────────────────────────────
export function WalletTab() {
  const { user, fundWallet } = useAuth();
  const [walletModal, setWalletModal] = useState(false);
  const [fundAmt,     setFundAmt]     = useState('');
  const [funding,     setFunding]     = useState(false);
  const [funded,      setFunded]      = useState(false);

  const doFund = async () => {
    const amt = parseInt(fundAmt || '0');
    if (!amt) return;
    setFunding(true);
    await sleep(1000);
    fundWallet(amt);
    setFunding(false);
    setFunded(true);
    setTimeout(() => {
      setWalletModal(false);
      setFunded(false);
      setFundAmt('');
    }, 2000);
  };

  return (
    <div style={{ maxWidth: 520 }}>
      {/* Balance card */}
      <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 18, padding: '24px', marginBottom: 22 }}>
        <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 5 }}>Available Balance</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 16, letterSpacing: '-0.03em' }}>
          {formatCurrency(user?.wallet ?? 0)}
        </div>
        <Button onClick={() => setWalletModal(true)} style={{ background: '#F97316' }}>
          + Fund Wallet
        </Button>
      </div>

      <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 13 }}>
        Recent Transactions
      </h3>

      {WALLET_TRANSACTIONS.map((txn, i) => (
        <Card key={i} style={{ marginBottom: 9, padding: '11px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: txn.type === 'credit' ? '#F0FDF4' : '#FEF2F2',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}>
                {txn.icon}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{txn.description}</div>
                <div style={{ fontSize: 10, color: '#64748B' }}>{txn.date}</div>
              </div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 13, color: txn.type === 'credit' ? '#22C55E' : '#EF4444' }}>
              {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
            </div>
          </div>
        </Card>
      ))}

      {/* Fund wallet modal */}
      <Modal open={walletModal} onClose={() => setWalletModal(false)} title="💰 Fund Wallet" width={400}>
        {funded ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
            <h3 style={{ fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Wallet Funded!</h3>
            <p style={{ color: '#64748B', fontSize: 13 }}>Your balance has been updated.</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
              Choose a quick amount or enter a custom value
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
              {[1000, 2000, 5000, 10000, 20000, 50000].map((a) => (
                <button
                  key={a}
                  onClick={() => setFundAmt(a.toString())}
                  style={{
                    padding:    '9px 6px',
                    background: fundAmt === a.toString() ? '#F97316' : '#F1F5F9',
                    color:      fundAmt === a.toString() ? '#fff'    : '#0F172A',
                    border:     '1px solid #E2E8F0',
                    borderRadius: 8,
                    cursor:     'pointer',
                    fontWeight: 700,
                    fontSize:   12,
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}
                >
                  {formatCurrency(a)}
                </button>
              ))}
            </div>
            <Input
              label="Custom amount"
              placeholder="e.g. 5000"
              value={fundAmt}
              onChange={(e) => setFundAmt(e.target.value)}
              icon="₦"
              type="number"
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Button variant="secondary" fullWidth>💳 Card</Button>
              <Button fullWidth loading={funding} onClick={doFund} disabled={!fundAmt || !parseInt(fundAmt)}>
                {funding ? '' : '🏦 Transfer'}
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

// ─── ADDRESSES TAB ────────────────────────────────────────
export function AddressesTab() {
  return (
    <div style={{ maxWidth: 500 }}>
      {SAVED_ADDRESSES.map((addr) => (
        <Card key={addr.id} style={{ marginBottom: 13, display: 'flex', gap: 13, alignItems: 'flex-start', padding: '13px 15px' }}>
          <span style={{ fontSize: 26 }}>{addr.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 13, marginBottom: 2 }}>{addr.label}</div>
            <div style={{ fontSize: 12, color: '#64748B' }}>{addr.address}</div>
            {addr.landmark && (
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>📌 {addr.landmark}</div>
            )}
          </div>
          <Button size="sm" variant="ghost">Edit</Button>
        </Card>
      ))}
      <Button variant="secondary" fullWidth>+ Add New Address</Button>
    </div>
  );
}

// ─── PROFILE TAB ──────────────────────────────────────────
export function ProfileTab() {
  const { user, updateUser, logout } = useAuth();
  const [name,  setName]  = useState(user?.name  ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await sleep(600);
    updateUser({ name, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: 460 }}>
      <Card style={{ padding: '1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <Avatar name={user?.name ?? 'User'} size={68} />
          <h2 style={{ fontSize: 17, fontWeight: 900, color: '#0F172A', marginTop: 11, marginBottom: 3 }}>
            {user?.name}
          </h2>
          <p style={{ color: '#64748B', fontSize: 12, margin: 0 }}>
            Member since {user?.joined ?? '2026'}
          </p>
        </div>

        <Input label="Full Name"    value={name}  onChange={(e) => setName(e.target.value)}  icon="👤" />
        <Input label="Email"        value={email} onChange={(e) => setEmail(e.target.value)} icon="📧" type="email" />
        <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} icon="📱" type="tel" />

        <Button fullWidth onClick={handleSave} style={{ marginBottom: 10 }}>
          {saved ? '✅ Saved!' : 'Save Changes'}
        </Button>

        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 14 }}>
          <Button variant="danger" fullWidth onClick={logout}>Sign Out</Button>
        </div>
      </Card>
    </div>
  );
}
