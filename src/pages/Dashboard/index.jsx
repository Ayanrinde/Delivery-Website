import { useState } from 'react';
import { Avatar } from '@/components/ui';
import { useAuth } from '@/contexts';
import { OverviewTab, OrdersTab, WalletTab, AddressesTab, ProfileTab } from './DashboardTabs';

const TABS = [
  { id: 'overview',   label: 'Overview'  },
  { id: 'orders',     label: 'Orders'    },
  { id: 'wallet',     label: 'Wallet'    },
  { id: 'addresses',  label: 'Addresses' },
  { id: 'profile',    label: 'Profile'   },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto', padding: '22px 18px' }}>
      {/* User greeting */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
        <Avatar name={user?.name ?? 'User'} size={52} />
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', margin: '0 0 3px', letterSpacing: '-0.03em' }}>
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ color: '#64748B', fontSize: 12, margin: 0 }}>{user?.email}</p>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 24, borderBottom: '2px solid #F1F5F9', overflowX: 'auto' }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background:   'none',
              border:       'none',
              padding:      '9px 14px',
              fontWeight:   700,
              fontSize:     12,
              cursor:       'pointer',
              fontFamily:   'inherit',
              color:        activeTab === tab.id ? '#F97316' : '#64748B',
              borderBottom: `2px solid ${activeTab === tab.id ? '#F97316' : 'transparent'}`,
              marginBottom: -2,
              whiteSpace:   'nowrap',
              transition:   'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="anim-fade-in" key={activeTab}>
        {activeTab === 'overview'  && <OverviewTab   onTabChange={setActiveTab} />}
        {activeTab === 'orders'    && <OrdersTab />}
        {activeTab === 'wallet'    && <WalletTab />}
        {activeTab === 'addresses' && <AddressesTab />}
        {activeTab === 'profile'   && <ProfileTab />}
      </div>
    </div>
  );
}
