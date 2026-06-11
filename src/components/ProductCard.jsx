import { useState } from 'react'
import { formatPrice } from '../data/products'

export default function ProductCard({ product, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const print = product.prints[0]

  return (
    <article
      className="carousel-item cursor-pointer"
      style={{ width: 'clamp(240px, 72vw, 300px)' }}
      onClick={() => onSelect(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(product)}
      aria-label={`Ver ${product.name}`}
    >
      {/* Image container */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3 / 4',
          overflow: 'hidden',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          borderColor: hovered ? '#C9A84C' : 'transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        <img
          src={print.image}
          alt={`${product.name} — ${print.name}`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            display: 'block',
          }}
        />

        {/* Dark gradient bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(28,28,26,0.35), transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* "Ver pieza →" CTA — always visible on mobile, hover on desktop */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '14px',
            opacity: hovered ? 1 : 0.85,
            transition: 'opacity 0.25s ease',
          }}
        >
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              fontWeight: 400,
            }}
          >
            Ver pieza →
          </span>
        </div>

        {/* Gold corner accent on hover */}
        {hovered && (
          <>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '18px', height: '1.5px', background: '#C9A84C' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '1.5px', height: '18px', background: '#C9A84C' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '18px', height: '1.5px', background: '#C9A84C' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '1.5px', height: '18px', background: '#C9A84C' }} />
          </>
        )}
      </div>

      {/* Card info */}
      <div className="pt-3 pb-4">
        <div className="flex justify-between items-baseline">
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#1C1C1A',
            }}
          >
            {product.name}
          </h3>
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#7A0000',
              letterSpacing: '0.04em',
              flexShrink: 0,
              paddingLeft: '8px',
            }}
          >
            {formatPrice(product.basePrice)}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '9.5px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#1C1C1A',
            opacity: 0.45,
            marginTop: '5px',
            fontWeight: 300,
          }}
        >
          {print.name}
        </p>
      </div>
    </article>
  )
}
