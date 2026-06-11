import { useEffect, useState } from 'react'

export default function CariocaIntro({ onComplete }) {
  const [phase, setPhase] = useState('drawing') // drawing → filling → fading

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('filling'), 2200)
    const t2 = setTimeout(() => setPhase('fading'), 2900)
    const t3 = setTimeout(() => onComplete(), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#F5F0E8',
        opacity: phase === 'fading' ? 0 : 1,
        transition: phase === 'fading' ? 'opacity 0.6s ease-in-out' : 'none',
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
      aria-hidden="true"
    >
      {/* Grain texture */}
      <GrainOverlay />

      {/* Animated CARIOCA */}
      <div style={{ width: 'min(88vw, 520px)' }}>
        <svg
          viewBox="0 0 520 110"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: 'visible', width: '100%' }}
        >
          <defs>
            <style>{`
              .ci-stroke {
                font-family: 'Great Vibes', cursive;
                font-size: 92px;
                fill: transparent;
                stroke: #C9A84C;
                stroke-width: 1.6;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-dasharray: 4800;
                stroke-dashoffset: 4800;
                animation: drawCarioca 2s cubic-bezier(0.3, 0, 0.5, 1) 0.15s forwards;
              }
              .ci-fill {
                font-family: 'Great Vibes', cursive;
                font-size: 92px;
                fill: #C9A84C;
                stroke: none;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
              }
            `}</style>
          </defs>

          {/* Outline animates in */}
          <text x="260" y="88" textAnchor="middle" className="ci-stroke">
            CARIOCA
          </text>

          {/* Fill appears after stroke completes */}
          <text
            x="260" y="88"
            textAnchor="middle"
            className="ci-fill"
            style={{ opacity: phase === 'filling' || phase === 'fading' ? 1 : 0 }}
          >
            CARIOCA
          </text>
        </svg>
      </div>

      {/* Thin crimson line beneath */}
      <div
        style={{
          width: '80px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #7A0000, transparent)',
          marginTop: '4px',
          opacity: phase === 'filling' || phase === 'fading' ? 0.7 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
    </div>
  )
}

function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
        opacity: 0.04,
      }}
    />
  )
}
