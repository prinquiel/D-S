export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6"
      style={{
        minHeight: '65vh',
        background: 'linear-gradient(160deg, #F5F0E8 0%, #EDE6D6 60%, #E8DDD0 100%)',
      }}
    >
      <GrainOverlay />

      {/* Diagonal accent line top-left */}
      <DiagonalAccent />

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Brand label above */}
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.48em',
            textTransform: 'uppercase',
            color: '#1C1C1A',
            opacity: 0.32,
            fontWeight: 300,
            marginBottom: '10px',
          }}
        >
          CARIOCA
        </p>

        {/* Main title — D&S fits the screen */}
        <h1
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(96px, 28vw, 160px)',
            lineHeight: 1,
            color: '#1C1C1A',
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          D&amp;S
        </h1>

        {/* Gold wavy underline */}
        <svg width="110" height="10" viewBox="0 0 110 10" className="mt-1 mb-3">
          <path
            d="M5 5 Q27 1 55 5 Q83 9 105 5"
            stroke="#C9A84C"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>

        {/* Crimson vertical rule */}
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'linear-gradient(to bottom, transparent, #7A0000, transparent)',
            margin: '0 auto 12px',
            opacity: 0.55,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 'clamp(9px, 2.4vw, 12px)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: '#1C1C1A',
            opacity: 0.38,
            fontWeight: 300,
          }}
        >
          Colección 2025
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <ScrollCue />
      </div>
    </section>
  )
}

function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
        opacity: 0.04,
      }}
    />
  )
}

function DiagonalAccent() {
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ opacity: 0.06 }}
      aria-hidden="true"
    >
      <line x1="0" y1="30%" x2="100%" y2="70%" stroke="#C9A84C" strokeWidth="1" />
      <line x1="0" y1="70%" x2="100%" y2="30%" stroke="#C9A84C" strokeWidth="0.5" />
    </svg>
  )
}

function ScrollCue() {
  return (
    <svg width="24" height="36" viewBox="0 0 24 36" style={{ opacity: 0.3 }} aria-hidden="true">
      <rect x="1" y="1" width="22" height="34" rx="11" stroke="#1C1C1A" strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="10" r="3" fill="#C9A84C">
        <animate attributeName="cy" values="10;22;10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
