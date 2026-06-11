import { useEffect, useRef, useState } from 'react'
import { formatPrice } from '../data/products'

export default function ProductModal({ product, returnFocusRef, onClose }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const closeRef = useRef(null)
  const images = product.images
  const hasMany = images.length > 1

  const go = (dir) => {
    setImageLoaded(false)
    setActiveIdx((i) => (i + dir + images.length) % images.length)
  }

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

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      style={{
        backgroundColor: 'rgba(28, 28, 26, 0.78)',
        animation: 'overlayIn 0.3s ease-out',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
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
            top: '16px', right: '16px',
            zIndex: 10,
            width: '34px', height: '34px',
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

          {/* Image gallery */}
          <div className="flex-shrink-0 w-full md:w-[45%]">
            <div style={{ position: 'relative', aspectRatio: '3/4' }}>
              {!imageLoaded && (
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #EDE6D6, #E2D9C8)' }} />
              )}
              <img
                key={images[activeIdx]}
                src={images[activeIdx]}
                alt={`${product.name} — ${activeIdx + 1}`}
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />

              {/* Prev / Next arrows */}
              {hasMany && (
                <>
                  <GalleryArrow side="left" onClick={() => go(-1)} />
                  <GalleryArrow side="right" onClick={() => go(1)} />
                  {/* Counter */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px', right: '12px',
                      padding: '3px 9px',
                      borderRadius: '12px',
                      background: 'rgba(28,28,26,0.55)',
                      backdropFilter: 'blur(8px)',
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      color: '#F5F0E8',
                    }}
                  >
                    {activeIdx + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {hasMany && (
              <div style={{ display: 'flex', gap: '8px', padding: '10px 12px', overflowX: 'auto' }}>
                {images.map((src, idx) => (
                  <button
                    key={src}
                    onClick={() => { setImageLoaded(false); setActiveIdx(idx) }}
                    aria-label={`Foto ${idx + 1}`}
                    style={{
                      flexShrink: 0,
                      width: '46px', height: '60px',
                      padding: 0,
                      overflow: 'hidden',
                      border: `1.5px solid ${activeIdx === idx ? '#C9A84C' : 'transparent'}`,
                      cursor: 'pointer',
                      background: 'none',
                      opacity: activeIdx === idx ? 1 : 0.6,
                      transition: 'opacity 0.2s, border-color 0.2s',
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col flex-1 p-6 md:p-8" style={{ minHeight: '0' }}>

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

            <div
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 'clamp(20px, 5vw, 26px)',
                fontWeight: 400,
                color: '#7A0000',
                letterSpacing: '0.04em',
                marginBottom: '22px',
              }}
            >
              {formatPrice(product.basePrice)}
            </div>

            <div
              style={{
                width: '100%', height: '1px',
                background: 'linear-gradient(to right, #C9A84C, #E2D9C8)',
                opacity: 0.45,
              }}
            />

            <div style={{ flex: 1 }} />

            <div
              style={{
                marginTop: '28px',
                paddingTop: '16px',
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

function GalleryArrow({ side, onClick }) {
  const isLeft = side === 'left'
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Foto anterior' : 'Foto siguiente'}
      style={{
        position: 'absolute',
        top: '50%',
        [isLeft ? 'left' : 'right']: '10px',
        transform: 'translateY(-50%)',
        width: '34px', height: '34px',
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(245,240,232,0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#1C1C1A',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(28,28,26,0.18)',
        lineHeight: 1,
      }}
    >
      {isLeft ? '‹' : '›'}
    </button>
  )
}
