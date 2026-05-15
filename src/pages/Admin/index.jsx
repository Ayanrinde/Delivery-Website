import { useState } from 'react';
import { Badge } from '@/components/ui';
import {
  AdminOverviewTab,
  AdminRidersTab,
  AdminAnalyticsTab,
  AdminPlaceholderTab,
} from './AdminTabs';

const TABS = [
  { id: 'overview',   label: 'Overview'   },
  { id: 'riders',     label: 'Riders'     },
  { id: 'vendors',    label: 'Vendors'    },
  { id: 'disputes',   label: 'Disputes'   },
  { id: 'analytics',  label: 'Analytics'  },
  { id: 'settings',   label: 'Settings'   },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="page-enter" style={{ maxWidth: 1100, margin: '0 auto', padding: '22px 18px' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 22 }}>
        <Badge color="red">Admin</Badge>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.03em' }}>
          SwiftDrop Operations
        </h1>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 22, overflowX: 'auto', paddingBottom: 2 }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background:   activeTab === tab.id ? '#0F172A' : '#F1F5F9',
              color:        activeTab === tab.id ? '#fff'    : '#64748B',
              border:       'none',
              borderRadius: 8,
              padding:      '7px 13px',
              fontWeight:   700,
              fontSize:     12,
              cursor:       'pointer',
              fontFamily:   'inherit',
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
        {activeTab === 'overview'  && <AdminOverviewTab />}
        {activeTab === 'riders'    && <AdminRidersTab />}
        {activeTab === 'analytics' && <AdminAnalyticsTab />}
        {(activeTab === 'vendors' || activeTab === 'disputes' || activeTab === 'settings') && (
          <AdminPlaceholderTab name={activeTab} />
        )}
      </div>
    </div>
  );
}
