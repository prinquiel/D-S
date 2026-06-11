import { useEffect, useRef, useState } from 'react'
import { formatPrice } from '../data/products'

export default function ProductModal({ product, returnFocusRef, onClose }) {
  const [selectedPrintIdx, setSelectedPrintIdx] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const closeRef = useRef(null)
  const currentPrint = product.prints[selectedPrintIdx]

  /* Lock body scroll */
  useEffect(() => {
    const scrollY = window.scrollY
    document.body.classList.add('modal-open')
    document.body.style.top = `-${scrollY}px`
    return () => {
      document.body.classList.remove('modal-open')
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [])

  /* ESC to close + focus trap */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  /* Reset image loaded when print changes */
  useEffect(() => setImageLoaded(false), [selectedPrintIdx])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      style={{
        backgroundColor: 'rgba(28, 28, 26, 0.78)',
        animation: 'overlayIn 0.3s ease-out',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle: ${product.name}`}
    >
      <div
        className="relative bg-[#F5F0E8] w-full max-w-3xl overflow-hidden"
        style={{
          maxHeight: '94dvh',
          borderRadius: '20px 20px 0 0',
          animation: 'slideUpModal 0.38s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: '1px solid #E2D9C8',
            background: 'rgba(245,240,232,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#1C1C1A',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row" style={{ overflowY: 'auto', maxHeight: '94dvh' }}>

          {/* ── Image panel ── */}
          <div
            className="flex-shrink-0 w-full md:w-[45%]"
            style={{ position: 'relative', aspectRatio: '3/4' }}
          >
            {/* Skeleton */}
            {!imageLoaded && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, #EDE6D6, #E2D9C8)',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            )}
            <img
              key={currentPrint.image}
              src={currentPrint.image}
              alt={`${product.name} — ${currentPrint.name}`}
              onLoad={() => setImageLoaded(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Print badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                left: '14px',
                padding: '4px 10px',
                background: 'rgba(28,28,26,0.55)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#F5F0E8',
                  fontWeight: 300,
                }}
              >
                {currentPrint.name}
              </span>
            </div>
          </div>

          {/* ── Details panel ── */}
          <div
            className="flex flex-col flex-1 p-6 md:p-8"
            style={{ minHeight: '0' }}
          >
            {/* Name */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(28px, 7vw, 38px)',
                fontWeight: 300,
                color: '#1C1C1A',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                marginBottom: '4px',
              }}
            >
              {product.name}
            </h2>

            {/* Price */}
            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 'clamp(20px, 5vw, 26px)',
                fontWeight: 400,
                color: '#7A0000',
                letterSpacing: '0.04em',
                marginBottom: '24px',
              }}
            >
              {formatPrice(product.basePrice)}
            </div>

            {/* Divider rule */}
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'linear-gradient(to right, #C9A84C, #E2D9C8)',
                opacity: 0.5,
                marginBottom: '20px',
              }}
            />

            {/* Print selector — only show if multiple prints */}
            {product.prints.length > 1 && (
              <div style={{ marginBottom: '20px' }}>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '9px',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: '#1C1C1A',
                    opacity: 0.45,
                    marginBottom: '10px',
                    fontWeight: 300,
                  }}
                >
                  Estampado
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.prints.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPrintIdx(idx)}
                      style={{
                        padding: '6px 14px',
                        fontFamily: "'Jost', sans-serif",
                        fontSize: '10px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontWeight: selectedPrintIdx === idx ? 500 : 300,
                        border: `1px solid ${selectedPrintIdx === idx ? '#C9A84C' : '#E2D9C8'}`,
                        color: selectedPrintIdx === idx ? '#C9A84C' : '#1C1C1A',
                        background: selectedPrintIdx === idx ? 'rgba(201,168,76,0.08)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(16px, 4vw, 18px)',
                fontWeight: 300,
                color: '#1C1C1A',
                opacity: 0.75,
                lineHeight: 1.65,
                marginTop: product.prints.length > 1 ? '0' : '0',
              }}
            >
              {product.description}
            </p>

            {/* Bottom gold rule */}
            <div style={{ flex: 1 }} />
            <div
              style={{
                marginTop: '28px',
                paddingTop: '18px',
                borderTop: '1px solid #E2D9C8',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M7 1 L8.5 5.5 L13 5.5 L9.5 8.5 L11 13 L7 10 L3 13 L4.5 8.5 L1 5.5 L5.5 5.5 Z"
                  fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.7" />
              </svg>
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '9.5px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  opacity: 0.8,
                  fontWeight: 300,
                }}
              >
                D &amp; S — Colección 2025
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
