export default function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center px-6 ${className}`}>
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(to right, transparent, #C9A84C)',
          opacity: 0.35,
        }}
      />
      <svg
        width="52"
        height="22"
        viewBox="0 0 52 22"
        className="mx-4 flex-shrink-0"
        aria-hidden="true"
      >
        <line x1="0" y1="11" x2="18" y2="11" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
        <line x1="34" y1="11" x2="52" y2="11" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
        <path
          d="M26 3 L22 11 L26 19 L30 11 Z"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1"
          opacity="0.7"
        />
        <circle cx="26" cy="11" r="1.5" fill="#C9A84C" opacity="0.8" />
        <circle cx="18" cy="11" r="1" fill="#C9A84C" opacity="0.5" />
        <circle cx="34" cy="11" r="1" fill="#C9A84C" opacity="0.5" />
      </svg>
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(to left, transparent, #C9A84C)',
          opacity: 0.35,
        }}
      />
    </div>
  )
}
