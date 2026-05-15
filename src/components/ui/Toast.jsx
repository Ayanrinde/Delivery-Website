import { useToast } from '@/contexts';

const TYPE_STYLES = {
  success: { bg: '#F0FDF4', border: '#BBF7D0', color: '#15803D', icon: '✅' },
  error:   { bg: '#FEF2F2', border: '#FECACA', color: '#B91C1C', icon: '❌' },
  info:    { bg: '#EFF6FF', border: '#BFDBFE', color: '#1D4ED8', icon: 'ℹ️' },
  orange:  { bg: '#FFF7ED', border: '#FED7AA', color: '#C2410C', icon: '🎉' },
};

/**
 * Global toast — reads from ToastContext.
 * Place once inside the app root.
 */
export default function Toast() {
  const { toast } = useToast();
  if (!toast.visible) return null;

  const s = TYPE_STYLES[toast.type] ?? TYPE_STYLES.success;

  return (
    <div
      className="anim-slide-up"
      style={{
        position:   'fixed',
        top:        14,
        right:      14,
        zIndex:     300,
        background: s.bg,
        border:     `1px solid ${s.border}`,
        color:      s.color,
        borderRadius: 12,
        padding:    '11px 16px',
        fontSize:   13,
        fontWeight: 700,
        display:    'flex',
        alignItems: 'center',
        gap:        8,
        boxShadow:  '0 6px 20px rgba(15,23,42,.14)',
        maxWidth:   320,
      }}
    >
      {s.icon} {toast.message}
    </div>
  );
}
