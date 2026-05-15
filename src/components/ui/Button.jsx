import { useState } from 'react';

const VARIANTS = {
  primary:   { bg: '#F97316', color: '#fff',     border: 'none',                      hover: '#EA580C' },
  secondary: { bg: 'transparent', color: '#0F172A', border: '1.5px solid #0F172A',   hover: '#F1F5F9' },
  ghost:     { bg: 'transparent', color: '#64748B', border: 'none',                  hover: '#F1F5F9' },
  danger:    { bg: '#FEF2F2',  color: '#EF4444', border: '1px solid #FECACA',        hover: '#FEE2E2' },
  success:   { bg: '#F0FDF4',  color: '#15803D', border: '1px solid #BBF7D0',        hover: '#DCFCE7' },
  navy:      { bg: '#0F172A',  color: '#fff',    border: 'none',                      hover: '#1E293B' },
  white:     { bg: '#FFFFFF',  color: '#F97316', border: '1px solid #E2E8F0',        hover: '#F8FAFC' },
};

const SIZES = {
  sm: { padding: '5px 13px',  fontSize: 12, borderRadius: 8  },
  md: { padding: '10px 20px', fontSize: 14, borderRadius: 10 },
  lg: { padding: '13px 26px', fontSize: 15, borderRadius: 12 },
};

/**
 * @param {'primary'|'secondary'|'ghost'|'danger'|'success'|'navy'|'white'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} fullWidth
 * @param {boolean} disabled
 * @param {boolean} loading
 * @param {React.ReactNode} children
 * @param {Function} onClick
 * @param {React.CSSProperties} style
 */
export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  fullWidth = false,
  disabled  = false,
  loading   = false,
  onClick,
  style = {},
  type = 'button',
}) {
  const [hovered, setHovered] = useState(false);
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size]       ?? SIZES.md;

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            6,
        fontFamily:     'inherit',
        fontWeight:     700,
        cursor:         isDisabled ? 'not-allowed' : 'pointer',
        opacity:        isDisabled ? 0.55 : 1,
        width:          fullWidth ? '100%' : 'auto',
        transition:     'all 0.15s ease',
        border:         v.border,
        color:          v.color,
        background:     hovered && !isDisabled ? v.hover : v.bg,
        ...s,
        ...style,
      }}
    >
      {loading ? '⏳' : children}
    </button>
  );
}
