import { useState, useRef, useCallback } from 'react'
import CariocaIntro from './components/CariocaIntro'
import Hero from './components/Hero'
import Collection from './components/Collection'
import ProductModal from './components/ProductModal'
import { products } from './data/products'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const lastFocusRef = useRef(null)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  const handleOpenModal = useCallback((product) => {
    setSelectedProduct(product)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null)
    lastFocusRef.current?.focus()
  }, [])

  return (
    <div style={{ backgroundColor: '#F5F0E8', minHeight: '100dvh' }}>
      {/* Intro animation — unmounts after complete */}
      {!introComplete && (
        <CariocaIntro onComplete={handleIntroComplete} />
      )}

      {/* Main page — fades in as intro fades out */}
      <main
        style={{
          opacity: introComplete ? 1 : 0,
          transform: introComplete ? 'none' : 'translateY(6px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          transitionDelay: introComplete ? '0.1s' : '0s',
        }}
        aria-hidden={!introComplete}
      >
        <Hero />
        <Collection
          products={products}
          onSelectProduct={handleOpenModal}
        />

        {/* Footer */}
        <footer
          className="text-center pb-10 px-6"
          style={{ borderTop: '1px solid #E2D9C8', paddingTop: '28px' }}
        >
          <p
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '28px',
              color: '#1C1C1A',
              opacity: 0.35,
              marginBottom: '8px',
            }}
          >
            CARIOCA
          </p>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#1C1C1A',
              opacity: 0.25,
              fontWeight: 300,
            }}
          >
            D &amp; S · 2025 · Solo visualización
          </p>
        </footer>
      </main>

      {/* Product modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          returnFocusRef={lastFocusRef}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
