import { useRef } from 'react'
import ProductCard from './ProductCard'
import Divider from './Divider'

export default function Collection({ products, onSelectProduct }) {
  const carouselRef = useRef(null)

  const scroll = (dir) => {
    const el = carouselRef.current
    if (!el) return
    const cardWidth = el.firstChild?.offsetWidth + 20 || 300
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' })
  }

  return (
    <section className="pb-20" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 40px)' }}>
      {/* Brand label */}
      <p
        className="text-center"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: '#1C1C1A',
          opacity: 0.4,
          fontWeight: 300,
          marginBottom: '4px',
        }}
      >
        CARIOCA
      </p>

      <Divider className="py-8" />

      {/* Section heading */}
      <div className="text-center px-6 mb-8">
        <div
          className="flex items-center justify-center"
          style={{ gap: '20px', marginBottom: '6px' }}
        >
          <OrnamentRule flip={false} />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(52px, 15vw, 80px)',
              fontWeight: 900,
              lineHeight: 1,
              color: '#7A0000',
              letterSpacing: '-0.01em',
            }}
          >
            D&amp;S
          </h2>
          <OrnamentRule flip={true} />
        </div>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: '#1C1C1A',
            opacity: 0.38,
            fontWeight: 300,
          }}
        >
          La Colección
        </p>
      </div>

      {/* Carousel */}
      <div style={{ position: 'relative' }}>
        <div ref={carouselRef} className="carousel">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
          {/* trailing spacer */}
          <div style={{ width: '8px', flexShrink: 0 }} aria-hidden="true" />
        </div>

        {/* Arrow buttons — hidden on mobile, shown on md+ */}
        <ArrowButton direction="left"  onClick={() => scroll(-1)} />
        <ArrowButton direction="right" onClick={() => scroll(1)}  />
      </div>

      {/* Scroll hint dots */}
      <div
        className="flex justify-center gap-2 mt-5"
        style={{ opacity: 0.3 }}
        aria-hidden="true"
      >
        {products.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === 0 ? '16px' : '6px',
              height: '4px',
              borderRadius: '2px',
              background: '#C9A84C',
              transition: 'width 0.3s',
            }}
          />
        ))}
      </div>
    </section>
  )
}

function OrnamentRule({ flip }) {
  return (
    <svg
      width="80"
      height="12"
      viewBox="0 0 80 12"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      aria-hidden="true"
    >
      <line x1="0" y1="6" x2="56" y2="6" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" />
      <path
        d="M56 6 Q65 1 74 6 Q65 11 56 6"
        fill="#C9A84C"
        opacity="0.45"
      />
      <circle cx="78" cy="6" r="1.5" fill="#C9A84C" opacity="0.5" />
    </svg>
  )
}

function ArrowButton({ direction, onClick }) {
  const isLeft = direction === 'left'
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Anterior' : 'Siguiente'}
      className="hidden md:flex"
      style={{
        position: 'absolute',
        top: '35%',
        [isLeft ? 'left' : 'right']: '8px',
        transform: 'translateY(-50%)',
        zIndex: 5,
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        border: '1px solid #E2D9C8',
        background: 'rgba(245,240,232,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#1C1C1A',
        fontSize: '16px',
        boxShadow: '0 2px 12px rgba(28,28,26,0.1)',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      {isLeft ? '‹' : '›'}
    </button>
  )
}
