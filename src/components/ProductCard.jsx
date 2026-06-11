import { useState } from 'react'
import { formatPrice } from '../data/products'

export default function ProductCard({ product, onSelect }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className="carousel-item cursor-pointer"
      style={{ width: 'clamp(220px, 68vw, 290px)' }}
      onClick={() => onSelect(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(product)}
      aria-label={`Ver ${product.name}`}
    >
      {/* Image */}
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
          src={product.image}
          alt={product.name}
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

        {/* Gradient bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '38%',
            background: 'linear-gradient(to top, rgba(28,28,26,0.38), transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* Ver pieza CTA */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: 0, right: 0,
            textAlign: 'center',
            opacity: hovered ? 1 : 0.8,
            transition: 'opacity 0.25s ease',
          }}
        >
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9.5px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              fontWeight: 400,
            }}
          >
            Ver pieza →
          </span>
        </div>

        {/* Gold corner accents on hover */}
        {hovered && (
          <>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '1.5px', background: '#C9A84C' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '1.5px', height: '16px', background: '#C9A84C' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '1.5px', background: '#C9A84C' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '1.5px', height: '16px', background: '#C9A84C' }} />
          </>
        )}
      </div>

      {/* Card info — centered */}
      <div style={{ paddingTop: '12px', paddingBottom: '16px', textAlign: 'center' }}>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#1C1C1A',
            margin: 0,
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#7A0000',
            letterSpacing: '0.05em',
            marginTop: '4px',
          }}
        >
          {formatPrice(product.basePrice)}
        </p>
      </div>
    </article>
  )
}
