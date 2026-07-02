type HeroIllustrationProps = {
  className?: string;
};

/**
 * Editorial-grade hero mark.
 * A luminous NFC credential at the center, orbiting protocol chips, a soft
 * signal field, and a phone silhouette catching a tap — composed on a
 * generous canvas so it reads big and confident, not busy.
 * Uses only theme tokens so it works in both light and dark mode.
 */
export function HeroIllustration({ className = "w-full max-w-[560px]" }: HeroIllustrationProps) {
  return (
    <div className={`relative aspect-[5/6] ${className}`} aria-hidden>
      <svg
        viewBox="0 0 600 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
      >
        <defs>
          {/* Card face gradient — brand cyan → violet */}
          <linearGradient id="hi2-card" x1="120" y1="220" x2="500" y2="540" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" />
            <stop offset="0.55" stopColor="var(--primary-hover)" />
            <stop offset="1" stopColor="#7B2FFF" />
          </linearGradient>
          {/* Diagonal sheen across the card */}
          <linearGradient id="hi2-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          {/* EMV-style chip */}
          <linearGradient id="hi2-chip" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#F7DA96" />
            <stop offset="0.6" stopColor="#D6A24A" />
            <stop offset="1" stopColor="#8A5A1A" />
          </linearGradient>
          {/* Ambient halo */}
          <radialGradient id="hi2-halo" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="var(--primary)" stopOpacity="0.30" />
            <stop offset="0.55" stopColor="var(--primary)" stopOpacity="0.08" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          {/* Dot grid pattern */}
          <pattern id="hi2-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="1.2" fill="var(--primary)" fillOpacity="0.22" />
          </pattern>
          {/* Soft shadow for the card */}
          <filter id="hi2-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="34" stdDeviation="30" floodColor="#040814" floodOpacity="0.35" />
          </filter>
          {/* Chip inner shadow */}
          <filter id="hi2-chipShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#3A2200" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Ambient halo behind everything */}
        <circle cx="300" cy="360" r="300" fill="url(#hi2-halo)" />

        {/* Dot grid patch (upper-left), softly framing the composition */}
        <rect x="20" y="60" width="200" height="200" fill="url(#hi2-dots)" opacity="0.55" />

        {/* Concentric signal rings — the "field" */}
        <g fill="none" stroke="var(--primary)" strokeLinecap="round">
          <circle cx="300" cy="360" r="280" strokeOpacity="0.06" strokeWidth="1" />
          <circle cx="300" cy="360" r="230" strokeOpacity="0.10" strokeWidth="1" />
          <circle cx="300" cy="360" r="180" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="2 10" />
          <circle cx="300" cy="360" r="130" strokeOpacity="0.22" strokeWidth="1" />
        </g>

        {/* Orbiting protocol pills */}
        <g fontFamily="ui-sans-serif, system-ui, -apple-system, 'SF Pro Display', Inter, sans-serif" fontSize="12" fontWeight="600">
          {/* NFC */}
          <g transform="translate(78 300)">
            <rect x="0" y="0" width="72" height="28" rx="14" fill="var(--surface)" stroke="var(--border-strong)" />
            <text x="36" y="18" textAnchor="middle" fill="var(--primary)">NFC</text>
          </g>
          {/* EMV */}
          <g transform="translate(452 200)">
            <rect x="0" y="0" width="72" height="28" rx="14" fill="var(--surface)" stroke="var(--border-strong)" />
            <text x="36" y="18" textAnchor="middle" fill="var(--primary)">EMV</text>
          </g>
          {/* DESFire */}
          <g transform="translate(430 470)">
            <rect x="0" y="0" width="94" height="28" rx="14" fill="var(--surface)" stroke="var(--border-strong)" />
            <text x="47" y="18" textAnchor="middle" fill="var(--primary)">DESFire</text>
          </g>
          {/* NTAG 424 */}
          <g transform="translate(96 520)">
            <rect x="0" y="0" width="100" height="28" rx="14" fill="var(--surface)" stroke="var(--border-strong)" />
            <text x="50" y="18" textAnchor="middle" fill="var(--primary)">NTAG 424</text>
          </g>
        </g>

        {/* — The credential — */}
        <g filter="url(#hi2-shadow)" transform="rotate(-12 300 360)">
          {/* Card body */}
          <rect x="130" y="230" width="340" height="216" rx="26" fill="url(#hi2-card)" />
          {/* Sheen overlay */}
          <rect x="130" y="230" width="340" height="216" rx="26" fill="url(#hi2-sheen)" />
          {/* Hairline border */}
          <rect x="130.5" y="230.5" width="339" height="215" rx="25.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.22" />

          {/* Corner accents */}
          <path d="M148 250 L148 240 Q148 234 154 234 L164 234" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
          <path d="M452 426 L452 436 Q452 442 446 442 L436 442" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />

          {/* Chip */}
          <g filter="url(#hi2-chipShadow)">
            <rect x="164" y="284" width="66" height="52" rx="8" fill="url(#hi2-chip)" />
            <g stroke="#5C3A0F" strokeOpacity="0.55" strokeWidth="1.2" fill="none">
              <path d="M164 300 h66 M164 320 h66" />
              <path d="M197 284 v52" />
              <rect x="183" y="298" width="28" height="24" rx="2" />
            </g>
          </g>

          {/* NFC glyph on card, top-right */}
          <g transform="translate(410 300)" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="4.5">
            <path d="M0 -6 A 16 16 0 0 1 0 6" opacity="0.95" />
            <path d="M0 -18 A 28 28 0 0 1 0 18" opacity="0.72" />
            <path d="M0 -30 A 40 40 0 0 1 0 30" opacity="0.42" />
          </g>

          {/* Card typography stand-ins */}
          <g fill="#FFFFFF">
            <rect x="164" y="362" width="180" height="10" rx="5" opacity="0.92" />
            <rect x="164" y="382" width="120" height="6" rx="3" opacity="0.65" />
            <rect x="164" y="410" width="70" height="6" rx="3" opacity="0.5" />
          </g>
        </g>

        {/* Phone silhouette — receiving the tap, bottom-right */}
        <g transform="translate(388 470)">
          <rect x="0" y="0" width="120" height="200" rx="22" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1.5" />
          <rect x="10" y="10" width="100" height="180" rx="14" fill="var(--background)" />
          {/* Speaker notch */}
          <rect x="48" y="18" width="24" height="4" rx="2" fill="var(--border-strong)" />
          {/* Home indicator */}
          <rect x="40" y="180" width="40" height="3" rx="1.5" fill="var(--border-strong)" />
          {/* Tap ripple on phone */}
          <g transform="translate(60 100)" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round">
            <circle r="10" opacity="0.9" />
            <circle r="22" opacity="0.55" strokeDasharray="3 6" />
            <circle r="34" opacity="0.28" />
          </g>
        </g>

        {/* Little accent particles */}
        <g fill="var(--primary)">
          <circle cx="60" cy="440" r="3" opacity="0.6" />
          <circle cx="540" cy="120" r="3" opacity="0.6" />
          <circle cx="520" cy="620" r="2.5" opacity="0.45" />
          <circle cx="30" cy="180" r="2" opacity="0.45" />
        </g>
      </svg>
    </div>
  );
}
