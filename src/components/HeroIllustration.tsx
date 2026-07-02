type HeroIllustrationProps = {
  className?: string;
};

/**
 * Minimal, professional hero mark: an NFC card emitting a clean, concentric
 * signal field. Uses only theme tokens so it adapts to light and dark mode.
 */
export function HeroIllustration({ className = "w-full max-w-[440px]" }: HeroIllustrationProps) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      <svg
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="hi-card" x1="150" y1="170" x2="380" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--primary-hover)" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="hi-chip" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#F5D68A" />
            <stop offset="1" stopColor="#B8873A" />
          </linearGradient>
          <radialGradient id="hi-glow" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <filter id="hi-shadow" x="0" y="0" width="520" height="520" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="24" stdDeviation="24" floodColor="#0B1220" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Ambient glow */}
        <circle cx="260" cy="260" r="230" fill="url(#hi-glow)" />

        {/* Concentric signal rings */}
        <g fill="none" stroke="var(--primary)" strokeLinecap="round">
          <circle cx="260" cy="260" r="210" strokeOpacity="0.08" strokeWidth="1" />
          <circle cx="260" cy="260" r="170" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx="260" cy="260" r="130" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 8" />
        </g>

        {/* NFC signal arcs, top-right */}
        <g fill="none" stroke="var(--primary)" strokeLinecap="round" strokeWidth="6" transform="translate(340 150) rotate(45)">
          <path d="M0 -6 A 22 22 0 0 1 0 6" opacity="0.95" />
          <path d="M0 -22 A 38 38 0 0 1 0 22" opacity="0.6" />
          <path d="M0 -38 A 54 54 0 0 1 0 38" opacity="0.3" />
        </g>

        {/* Card */}
        <g filter="url(#hi-shadow)" transform="rotate(-10 260 280)">
          <rect x="130" y="180" width="260" height="170" rx="22" fill="url(#hi-card)" />
          {/* Subtle inner highlight */}
          <rect x="130" y="180" width="260" height="170" rx="22" fill="none" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="1" />

          {/* Chip */}
          <rect x="160" y="228" width="52" height="42" rx="7" fill="url(#hi-chip)" />
          <g stroke="#8A5A1A" strokeOpacity="0.55" strokeWidth="1.2">
            <path d="M160 240 h52 M160 258 h52 M186 228 v42" />
            <rect x="176" y="240" width="20" height="18" fill="none" />
          </g>

          {/* Card lines */}
          <g fill="#FFFFFF" fillOpacity="0.85">
            <rect x="160" y="292" width="120" height="8" rx="4" />
            <rect x="160" y="308" width="86" height="6" rx="3" opacity="0.7" />
          </g>

          {/* NFC glyph on card */}
          <g transform="translate(322 236)" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="4" strokeOpacity="0.9">
            <path d="M0 -4 A 14 14 0 0 1 0 4" />
            <path d="M0 -14 A 24 24 0 0 1 0 14" opacity="0.75" />
            <path d="M0 -24 A 34 34 0 0 1 0 24" opacity="0.5" />
          </g>
        </g>

        {/* Corner accent dots */}
        <g fill="var(--primary)" fillOpacity="0.55">
          <circle cx="80" cy="140" r="3" />
          <circle cx="440" cy="400" r="3" />
          <circle cx="90" cy="400" r="2.5" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
