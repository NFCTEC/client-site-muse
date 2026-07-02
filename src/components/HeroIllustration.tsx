type HeroIllustrationProps = {
  className?: string;
};

/**
 * Minimalist hero mark — a quiet, monochrome smart card with the NFC wave
 * front and center. The card is muted (no bright fills), the accent is
 * reserved for the NFC arcs, and gentle motion (float + breathing rings +
 * outward ripples) keeps it alive without stealing attention.
 */
export function HeroIllustration({ className = "w-full max-w-[520px]" }: HeroIllustrationProps) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      <style>{`
        @keyframes hi-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes hi-breathe {
          0%, 100% { opacity: var(--o, 0.18); transform: scale(1); }
          50% { opacity: calc(var(--o, 0.18) * 1.7); transform: scale(1.015); }
        }
        @keyframes hi-ripple {
          0% { transform: scale(0.55); opacity: 0.55; }
          80% { opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        .hi-float { animation: hi-float 6s ease-in-out infinite; transform-origin: 300px 300px; }
        .hi-breathe { transform-origin: 300px 300px; animation: hi-breathe 4.5s ease-in-out infinite; }
        .hi-ripple  { transform-origin: 300px 300px; animation: hi-ripple 3.6s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hi-float, .hi-breathe, .hi-ripple { animation: none; }
        }
      `}</style>
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="hi-accent" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--primary)" />
            <stop offset="1" stopColor="#7B2FFF" />
          </linearGradient>
          <radialGradient id="hi-halo" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="var(--primary)" stopOpacity="0.16" />
            <stop offset="0.6" stopColor="var(--primary)" stopOpacity="0.04" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          {/* Muted card face — no colored fill, just a whisper of surface */}
          <linearGradient id="hi-card" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="var(--foreground)" stopOpacity="0.04" />
            <stop offset="1" stopColor="var(--foreground)" stopOpacity="0.015" />
          </linearGradient>
          <linearGradient id="hi-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--foreground)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--foreground)" stopOpacity="0.08" />
          </linearGradient>
          <filter id="hi-shadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="24" stdDeviation="30" floodColor="#040814" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Ambient halo */}
        <circle cx="300" cy="300" r="290" fill="url(#hi-halo)" />

        {/* Breathing signal rings */}
        <g fill="none" stroke="url(#hi-accent)" strokeLinecap="round">
          <circle cx="300" cy="300" r="260" strokeWidth="1" className="hi-breathe" style={{ ["--o" as any]: 0.06 }} />
          <circle cx="300" cy="300" r="210" strokeWidth="1" className="hi-breathe" style={{ ["--o" as any]: 0.1, animationDelay: "-1.5s" }} />
          <circle cx="300" cy="300" r="160" strokeWidth="1" strokeDasharray="2 10" className="hi-breathe" style={{ ["--o" as any]: 0.14, animationDelay: "-3s" }} />
        </g>

        {/* Outward ripples — very sparse */}
        <g fill="none" stroke="url(#hi-accent)" strokeWidth="1.25">
          <circle cx="300" cy="300" r="170" className="hi-ripple" />
          <circle cx="300" cy="300" r="170" className="hi-ripple" style={{ animationDelay: "-1.8s" }} />
        </g>

        {/* The card — floats gently */}
        <g className="hi-float">
          <g filter="url(#hi-shadow)" transform="rotate(-8 300 300)">
            <rect
              x="130"
              y="180"
              width="340"
              height="216"
              rx="22"
              fill="url(#hi-card)"
              stroke="url(#hi-stroke)"
              strokeWidth="1"
            />

            {/* NFC wave mark — the only place brand color lives */}
            <g transform="translate(260 288)" fill="none" stroke="url(#hi-accent)" strokeLinecap="round" strokeWidth="6">
              <circle r="5" fill="url(#hi-accent)" stroke="none" />
              <path d="M 14 -22 A 26 26 0 0 1 14 22" />
              <path d="M 30 -40 A 44 44 0 0 1 30 40" opacity="0.7" />
              <path d="M 46 -58 A 62 62 0 0 1 46 58" opacity="0.4" />
            </g>

            <text
              x="300"
              y="368"
              textAnchor="middle"
              fill="var(--muted-foreground)"
              fontFamily="ui-sans-serif, system-ui, -apple-system, 'SF Pro Display', Inter, sans-serif"
              fontSize="10"
              fontWeight="600"
              letterSpacing="5"
              opacity="0.7"
            >
              NFC · SECURE
            </text>
          </g>
        </g>

        {/* Sparse particles */}
        <g fill="var(--foreground)" fillOpacity="0.25">
          <circle cx="90" cy="120" r="2" />
          <circle cx="520" cy="500" r="2" />
          <circle cx="70" cy="440" r="1.5" />
          <circle cx="540" cy="160" r="1.5" />
        </g>
      </svg>
    </div>
  );
}
