import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import { Badge } from '@/components/ui';
import { VENDORS, RIDERS } from '@/data';
import { formatCurrency } from '@/utils';

// ─── OVERVIEW TAB ─────────────────────────────────────────
export function AdminOverviewTab() {
  const disputes = [
    { id: 'DSP-041', type: 'Wrong Order',   vendor: 'KFC Nigeria',    amount: 3000, status: 'pending'  },
    { id: 'DSP-040', type: 'Not Delivered', vendor: "Domino's",       amount: 7200, status: 'resolved' },
    { id: 'DSP-039', type: 'Missing Item',  vendor: 'Yellow Chilli',  amount: 1500, status: 'pending'  },
    { id: 'DSP-038', type: 'Late Delivery', vendor: 'Sip & Bite',     amount: 500,  status: 'resolved' },
  ];

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(145px,1fr))', gap: 14, marginBottom: 22 }}>
        <StatCard label="Orders Today"       value="1,247" icon="📦" sub="↑ 12% vs yesterday" />
        <StatCard label="Active Deliveries"  value="84"    icon="🛵" sub="↑ 5 in last hour"   />
        <StatCard label="Revenue Today"      value="₦2.8M" icon="💰" sub="↑ 18% this week"    />
        <StatCard label="Active Vendors"     value="312"   icon="🏪"                            />
        <StatCard label="Refunds Today"      value="₦45k"  icon="🔄" sub="23 processed" subColor="#F59E0B" />
        <StatCard label="Avg Rider Rating"   value="4.7★"  icon="⭐"                            />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* Disputes */}
        <Card style={{ padding: '1.1rem' }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 13 }}>Recent Disputes</h3>
          {disputes.map((d) => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 9, marginBottom: 9, borderBottom: '1px solid #F8FAFC' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, color: '#0F172A' }}>{d.type}</div>
                <div style={{ fontSize: 10, color: '#64748B' }}>{d.vendor} · {d.id}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, fontSize: 12, marginBottom: 2 }}>{formatCurrency(d.amount)}</div>
                <Badge color={d.status === 'resolved' ? 'green' : 'amber'}>{d.status}</Badge>
              </div>
            </div>
          ))}
        </Card>

        {/* Top vendors */}
        <Card style={{ padding: '1.1rem' }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 13 }}>Top Vendors Today</h3>
          {VENDORS.slice(0, 5).map((v, i) => (
            <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: '#64748B', minWidth: 16 }}>#{i + 1}</span>
                <span style={{ fontSize: 18 }}>{v.emoji}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{v.name}</div>
                  <div style={{ fontSize: 10, color: '#64748B' }}>{v.category}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#22C55E' }}>
                {formatCurrency(Math.floor(Math.random() * 180000 + 60000))}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

// ─── RIDERS TAB ───────────────────────────────────────────
import Button from '@/components/ui/Button';
import { Avatar, Stars } from '@/components/ui';

export function AdminRidersTab() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontWeight: 800, color: '#0F172A', fontSize: 15 }}>
          Riders ({RIDERS.filter((r) => r.status === 'active').length} active)
        </h3>
        <Button size="sm">+ Onboard Rider</Button>
      </div>

      {RIDERS.map((r) => (
        <Card key={r.id} style={{ marginBottom: 12, padding: '1.1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
              <Avatar name={r.name} size={44} bg="#0F172A" />
              <div>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 13 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>
                  {r.zone} · {r.deliveriesToday} deliveries · {r.bike}
                </div>
                <Stars rating={r.rating} size={11} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 13 }}>{formatCurrency(r.earnings)}</div>
                <div style={{ fontSize: 10, color: '#64748B' }}>earned today</div>
              </div>
              <Badge color={r.status === 'active' ? 'green' : r.status === 'offline' ? 'gray' : 'red'}>
                {r.status}
              </Badge>
              <Button size="sm" variant="ghost">View</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── ANALYTICS TAB ────────────────────────────────────────
export function AdminAnalyticsTab() {
  const rows = [
    { cat: 'Fast Food', pct: 38, val: '₦18.3M' },
    { cat: 'Nigerian',  pct: 27, val: '₦13.0M' },
    { cat: 'Pizza',     pct: 18, val: '₦8.7M'  },
    { cat: 'Desserts',  pct: 10, val: '₦4.8M'  },
    { cat: 'Healthy',   pct:  7, val: '₦3.4M'  },
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(145px,1fr))', gap: 14, marginBottom: 22 }}>
        <StatCard label="Revenue (MTD)"     value="₦48.2M" icon="💰" sub="↑ 24% vs last month" />
        <StatCard label="Deliveries (MTD)"  value="18,441" icon="📦" sub="↑ 31% vs last month" />
        <StatCard label="Refund Rate"       value="1.2%"   icon="🔄" sub="↓ 0.3% improvement" subColor="#22C55E" />
        <StatCard label="Avg Order Value"   value="₦5,847" icon="🛒" sub="↑ 8% vs last month"  />
      </div>

      <Card style={{ padding: '1.2rem' }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
          Revenue by Category (This Month)
        </h3>
        {rows.map((r) => (
          <div key={r.cat} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
              <span style={{ fontWeight: 700, color: '#0F172A' }}>{r.cat}</span>
              <span style={{ color: '#64748B' }}>{r.val} ({r.pct}%)</span>
            </div>
            <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3 }}>
              <div style={{ height: 6, borderRadius: 3, width: `${r.pct}%`, background: '#F97316', transition: 'width .5s ease' }} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── PLACEHOLDER TAB ──────────────────────────────────────
export function AdminPlaceholderTab({ name }) {
  return (
    <div style={{ textAlign: 'center', padding: '56px 0' }}>
      <div style={{ fontSize: 56, marginBottom: 14 }}>🚧</div>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 7, textTransform: 'capitalize' }}>
        {name} Panel
      </h3>
      <p style={{ color: '#64748B', fontSize: 13 }}>
        Full {name} management — connect Firebase/MongoDB to activate.
        <br />Includes real-time data, filters, bulk actions, and export.
      </p>
    </div>
  );
}
