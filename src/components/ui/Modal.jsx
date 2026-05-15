/**
 * @param {boolean}          open
 * @param {Function}         onClose
 * @param {string}           title
 * @param {React.ReactNode}  children
 * @param {number}           width     max-width in px
 */
export default function Modal({ open, onClose, title, children, width = 460 }) {
  if (!open) return null;

  return (
    <div
      className="anim-fade-in"
      onClick={onClose}
      style={{
        position:       'fixed',
        inset:          0,
        background:     'rgba(15,23,42,.65)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        zIndex:         200,
        padding:        16,
        backdropFilter: 'blur(3px)',
      }}
    >
      <div
        className="anim-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:   '#FFFFFF',
          borderRadius: 20,
          width:        '100%',
          maxWidth:     width,
          maxHeight:    '88vh',
          overflowY:    'auto',
          boxShadow:    '0 28px 64px rgba(15,23,42,.22)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding:        '1.1rem 1.4rem',
            borderBottom:   '1px solid #F1F5F9',
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            position:       'sticky',
            top:            0,
            background:     '#FFFFFF',
            zIndex:         1,
            borderRadius:   '20px 20px 0 0',
          }}
        >
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#0F172A' }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background:   '#F1F5F9',
              border:       'none',
              borderRadius: 8,
              width:        30,
              height:       30,
              cursor:       'pointer',
              fontSize:     14,
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              color:        '#64748B',
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.25rem 1.4rem' }}>{children}</div>
      </div>
    </div>
  );
}
