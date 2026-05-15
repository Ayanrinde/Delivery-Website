import { BADGE_COLORS } from '@/constants/theme';
import { getInitials }  from '@/utils';

// ─── BADGE ────────────────────────────────────────────────
export function Badge({ children, color = 'orange', size = 'sm' }) {
  const c = BADGE_COLORS[color] ?? BADGE_COLORS.orange;
  return (
    <span
      style={{
        background:  c.bg,
        color:       c.text,
        border:      `1px solid ${c.border}`,
        borderRadius: 20,
        padding:     size === 'sm' ? '2px 8px' : '4px 12px',
        fontSize:    size === 'sm' ? 11 : 12,
        fontWeight:  700,
        display:     'inline-block',
        whiteSpace:  'nowrap',
        lineHeight:  1.4,
      }}
    >
      {children}
    </span>
  );
}

// ─── AVATAR ───────────────────────────────────────────────
export function Avatar({ name, size = 38, bg = '#F97316', style = {} }) {
  return (
    <div
      style={{
        width:          size,
        height:         size,
        borderRadius:   '50%',
        background:     bg,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        color:          '#fff',
        fontWeight:     800,
        fontSize:       Math.floor(size * 0.35),
        flexShrink:     0,
        userSelect:     'none',
        ...style,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

// ─── STARS ────────────────────────────────────────────────
export function Stars({ rating, size = 13 }) {
  return (
    <span style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#F59E0B' : '#E2E8F0' }}>
          ★
        </span>
      ))}
    </span>
  );
}

// ─── SKELETON ─────────────────────────────────────────────
export function Skeleton({ height = 18, width = '100%', radius = 8, style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ height, width, borderRadius: radius, ...style }}
    />
  );
}

// ─── SPINNER ──────────────────────────────────────────────
export function Spinner({ size = 20, color = '#F97316' }) {
  return (
    <div
      className="anim-spin"
      style={{
        width:        size,
        height:       size,
        borderRadius: '50%',
        border:       `2.5px solid #E2E8F0`,
        borderTopColor: color,
        flexShrink:   0,
      }}
    />
  );
}
