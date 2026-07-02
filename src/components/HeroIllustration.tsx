type HeroIllustrationProps = {
  className?: string;
};

/**
 * Minimalist hero mark.
 * A single smart card, quiet and elegant, with the NFC "wave" mark front and
 * center. Concentric rings hint at the signal field. Palette borrows the
 * site's cyan → violet accent used sparingly on outlines only.
 */
export function HeroIllustration({ className = "w-full max-w-[520px]" }: HeroIllustrationProps) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
      >
        <defs>
          {/* Brand accent gradient — cyan → violet, used only on strokes */}
          <linearGradient id="hi-accent" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--primary)" />
            <stop offset="1" stopColor="#7B2FFF" />
          </linearGradient>
          {/* Ambient halo */}
          <radialGradient id="hi-halo" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="0.6" stopColor="var(--primary)" stopOpacity="0.05" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          {/* Very subtle card face tint */}
          <linearGradient id="hi-card" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="var(--surface)" />
            <stop offset="1" stopColor="var(--background)" />
          </linearGradient>
          {/* Soft shadow */}
          <filter id="hi-shadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="30" stdDeviation="28" floodColor="#040814" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* Ambient halo */}
        <circle cx="300" cy="300" r="290" fill="url(#hi-halo)" />

        {/* Concentric signal field */}
        <g fill="none" stroke="url(#hi-accent)" strokeLinecap="round">
          <circle cx="300" cy="300" r="260" strokeOpacity="0.08" strokeWidth="1" />
          <circle cx="300" cy="300" r="210" strokeOpacity="0.12" strokeWidth="1" />
          <circle cx="300" cy="300" r="160" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 10" />
        </g>

        {/* — The card — a quiet, outlined credential */}
        <g filter="url(#hi-shadow)" transform="rotate(-10 300 300)">
          {/* Card body */}
          <rect
            x="130"
            y="180"
            width="340"
            height="216"
            rx="24"
            fill="url(#hi-card)"
            stroke="url(#hi-accent)"
            strokeWidth="1.5"
          />

          {/* Corner brackets — brand accent */}
          <g fill="none" stroke="url(#hi-accent)" strokeWidth="2" strokeLinecap="round">
            <path d="M150 200 L150 194 Q150 190 154 190 L160 190" />
            <path d="M450 376 L450 382 Q450 386 446 386 L440 386" />
          </g>

          {/* NFC wave mark — the hero of the card */}
          <g transform="translate(260 288)" fill="none" stroke="url(#hi-accent)" strokeLinecap="round" strokeWidth="7">
            <circle r="6" fill="url(#hi-accent)" stroke="none" />
            <path d="M 14 -22 A 26 26 0 0 1 14 22" opacity="1" />
            <path d="M 30 -40 A 44 44 0 0 1 30 40" opacity="0.7" />
            <path d="M 46 -58 A 62 62 0 0 1 46 58" opacity="0.4" />
          </g>

          {/* Wordmark line under the wave */}
          <text
            x="300"
            y="368"
            textAnchor="middle"
            fill="var(--muted-foreground)"
            fontFamily="ui-sans-serif, system-ui, -apple-system, 'SF Pro Display', Inter, sans-serif"
            fontSize="11"
            fontWeight="600"
            letterSpacing="4"
          >
            NFC · SECURE
          </text>
        </g>

        {/* Small accent particles */}
        <g fill="var(--primary)" fillOpacity="0.55">
          <circle cx="90" cy="120" r="3" />
          <circle cx="520" cy="500" r="3" />
          <circle cx="70" cy="440" r="2" opacity="0.7" />
          <circle cx="540" cy="160" r="2" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
