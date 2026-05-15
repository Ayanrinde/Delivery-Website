import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/utils';

/**
 * Single menu item row displayed on the vendor page.
 * @param {MenuItem} item
 * @param {boolean}  disabled  When vendor is closed
 * @param {Function} onAdd
 */
export default function MenuItemCard({ item, disabled, onAdd }) {
  return (
    <Card hoverable style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 15px' }}>
      <div style={{ fontSize: 42, flexShrink: 0 }}>{item.emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 3 }}>{item.name}</h3>
        <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 5px', lineHeight: 1.5 }}>{item.description}</p>
        <div style={{ fontWeight: 800, color: '#F97316', fontSize: 14 }}>{formatCurrency(item.price)}</div>
      </div>
      <Button size="sm" disabled={disabled} onClick={() => onAdd(item)}>
        Add
      </Button>
    </Card>
  );
}
