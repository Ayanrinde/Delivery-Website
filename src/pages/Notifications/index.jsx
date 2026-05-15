import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { NOTIFICATIONS } from '@/data';

export default function Notifications() {
  const [read, setRead] = useState(new Set());

  const markAll = () => setRead(new Set(NOTIFICATIONS.map((n) => n.id)));
  const markOne = (id) => setRead((prev) => new Set([...prev, id]));

  return (
    <div className="page-enter" style={{ maxWidth: 580, margin: '0 auto', padding: '22px 18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>
          Notifications
        </h1>
        <Button size="sm" variant="ghost" onClick={markAll}>
          Mark all read
        </Button>
      </div>

      {NOTIFICATIONS.map((n) => {
        const isUnread = n.unread && !read.has(n.id);
        return (
          <Card
            key={n.id}
            onClick={() => markOne(n.id)}
            style={{
              marginBottom: 10,
              borderLeft:   isUnread ? `3px solid #F97316` : '1px solid #E2E8F0',
              background:   isUnread ? '#FFFBF5' : '#FFFFFF',
              cursor:       'pointer',
            }}
          >
            <div style={{ display: 'flex', gap: 13 }}>
              <div style={{ fontSize: 26, flexShrink: 0 }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: '#0F172A' }}>{n.title}</div>
                  <div style={{ fontSize: 10, color: '#64748B', whiteSpace: 'nowrap' }}>{n.time}</div>
                </div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 3, lineHeight: 1.55 }}>{n.body}</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
