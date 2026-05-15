import Card from '@/components/ui/Card';

/**
 * Animated vertical status timeline.
 * @param {object[]} statuses   All ORDER_STATUSES
 * @param {number}   currentIdx Index of the active status
 */
export default function StatusTimeline({ statuses, currentIdx }) {
  return (
    <Card style={{ padding: '1.2rem' }}>
      <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
        Order Status
      </h3>

      {statuses.map((status, i) => {
        const done    = i < currentIdx;
        const active  = i === currentIdx;
        const pending = i > currentIdx;
        const isLast  = i === statuses.length - 1;

        return (
          <div key={status.key} style={{ display: 'flex', gap: 12, marginBottom: isLast ? 0 : 14 }}>
            {/* Icon + line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width:          34,
                  height:         34,
                  borderRadius:   '50%',
                  background:     pending ? '#F1F5F9' : '#F97316',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontSize:       pending ? 10 : 14,
                  border:         `2px solid ${pending ? '#E2E8F0' : '#F97316'}`,
                  transition:     'all 0.5s ease',
                  flexShrink:     0,
                  color:          pending ? '#CBD5E1' : '#fff',
                }}
              >
                {pending ? '○' : status.icon}
              </div>

              {!isLast && (
                <div
                  style={{
                    width:      2,
                    height:     18,
                    background: done ? '#F97316' : '#E2E8F0',
                    marginTop:  4,
                    transition: 'background 0.5s',
                  }}
                />
              )}
            </div>

            {/* Text */}
            <div style={{ paddingTop: 6 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: pending ? '#94A3B8' : '#0F172A' }}>
                {status.label}
              </div>
              <div
                style={{
                  fontSize:   11,
                  color:      active ? '#F97316' : '#64748B',
                  fontWeight: active ? 700 : 400,
                }}
                className={active ? 'anim-pulse' : ''}
              >
                {active ? 'In progress...' : done ? status.detail : ''}
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}
