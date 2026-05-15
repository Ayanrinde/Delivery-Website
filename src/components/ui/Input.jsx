import { useState } from 'react';

/**
 * @param {string}  label
 * @param {string}  placeholder
 * @param {string}  value
 * @param {Function} onChange
 * @param {'text'|'email'|'password'|'number'|'tel'} type
 * @param {string}  icon   Emoji or character shown on the left
 * @param {number}  rows   If provided, renders a <textarea>
 * @param {React.CSSProperties} style
 */
export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type  = 'text',
  icon,
  rows,
  style = {},
  inputStyle = {},
}) {
  const [focused, setFocused] = useState(false);
  const Tag = rows ? 'textarea' : 'input';

  return (
    <div style={{ marginBottom: 14, ...style }}>
      {label && (
        <label
          style={{
            display:    'block',
            fontSize:   12,
            fontWeight: 700,
            color:      '#0F172A',
            marginBottom: 5,
            letterSpacing: '0.01em',
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span
            style={{
              position:        'absolute',
              left:            11,
              top:             rows ? 12 : '50%',
              transform:       rows ? 'none' : 'translateY(-50%)',
              fontSize:        15,
              pointerEvents:   'none',
              userSelect:      'none',
            }}
          >
            {icon}
          </span>
        )}
        <Tag
          type={rows ? undefined : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width:       '100%',
            padding:     icon ? '10px 12px 10px 36px' : '10px 13px',
            border:      `1.5px solid ${focused ? '#F97316' : '#E2E8F0'}`,
            borderRadius: 10,
            fontSize:    14,
            background:  '#FFFFFF',
            color:       '#0F172A',
            outline:     'none',
            fontFamily:  'inherit',
            boxSizing:   'border-box',
            transition:  'border-color 0.15s',
            resize:      rows ? 'vertical' : 'none',
            ...inputStyle,
          }}
        />
      </div>
    </div>
  );
}
