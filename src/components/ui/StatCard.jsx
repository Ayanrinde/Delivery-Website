import Card from './Card';

/**
 * @param {string} label
 * @param {string} value
 * @param {string} icon   Emoji
 * @param {string} sub    Small subtitle text
 * @param {string} subColor  CSS color for subtitle
 */
export default function StatCard({ label, value, icon, sub, subColor = '#F97316' }) {
  return (
    <Card style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 22 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: subColor, marginTop: 4, fontWeight: 600 }}>
          {sub}
        </div>
      )}
    </Card>
  );
}
