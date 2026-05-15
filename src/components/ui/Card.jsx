import { useState } from 'react';

/**
 * @param {React.CSSProperties} style
 * @param {Function}  onClick
 * @param {boolean}   hoverable  Adds lift shadow on hover
 * @param {string}    className
 */
export default function Card({ children, style = {}, onClick, hoverable = false, className = '' }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   '#FFFFFF',
        borderRadius: 16,
        border:       '1px solid #E2E8F0',
        boxShadow:    hoverable && hovered
          ? '0 6px 20px rgba(15,23,42,.10)'
          : '0 1px 3px rgba(15,23,42,.06)',
        transition:   'all 0.2s ease',
        cursor:       onClick ? 'pointer' : 'default',
        padding:      '1.25rem',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
