type HeroIllustrationProps = {
  className?: string;
};

/**
 * Hero mark — an "NFC ecosystem" constellation.
 *
 * A quiet central hub (the cloud API) connects to the objects our platform
 * actually serves: a smart card, a phone / wallet tap, a security key
 * (FIDO2), and a reader / terminal. Signal arcs and a soft orbit tie them
 * together. Palette stays monochrome; brand cyan→violet is reserved for
 * connective lines, arcs and the hub — never bulk fills.
 */
export function HeroIllustration({ className = "w-full max-w-[560px]" }: HeroIllustrationProps) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      <style>{`
        @keyframes hi-float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes hi-float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        @keyframes hi-breathe { 0%,100%{opacity:var(--o,.2);transform:scale(1)} 50%{opacity:calc(var(--o,.2)*1.7);transform:scale(1.02)} }
        @keyframes hi-pulse   { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes hi-dash    { to { stroke-dashoffset: -60; } }
        @keyframes hi-ripple  { 0%{transform:scale(.6);opacity:.55} 80%{opacity:0} 100%{transform:scale(1.35);opacity:0} }
        @keyframes hi-spin    { to { transform: rotate(360deg); } }

        .hi-float-a { animation: hi-float-a 6.5s ease-in-out infinite; }
        .hi-float-b { animation: hi-float-b 7s ease-in-out infinite; }
        .hi-breathe { transform-origin:300px 300px; animation: hi-breathe 5s ease-in-out infinite; }
        .hi-pulse   { animation: hi-pulse 2.6s ease-in-out infinite; }
        .hi-link    { stroke-dasharray: 4 6; animation: hi-dash 6s linear infinite; }
        .hi-ripple  { transform-origin:300px 300px; animation: hi-ripple 4s ease-out infinite; }
        .hi-orbit   { transform-origin:300px 300px; animation: hi-spin 40s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hi-float-a,.hi-float-b,.hi-breathe,.hi-pulse,.hi-link,.hi-ripple,.hi-orbit { animation: none; }
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
            <stop stopColor="var(--primary)" stopOpacity="0.18" />
            <stop offset="0.6" stopColor="var(--primary)" stopOpacity="0.04" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hi-surface" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="var(--foreground)" stopOpacity="0.05" />
            <stop offset="1" stopColor="var(--foreground)" stopOpacity="0.015" />
          </linearGradient>
          <linearGradient id="hi-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--foreground)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--foreground)" stopOpacity="0.1" />
          </linearGradient>
          <filter id="hi-shadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="18" stdDeviation="24" floodColor="#040814" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Ambient halo */}
        <circle cx="300" cy="300" r="290" fill="url(#hi-halo)" />

        {/* Breathing signal rings */}
        <g fill="none" stroke="url(#hi-accent)">
          <circle cx="300" cy="300" r="240" strokeWidth="1" className="hi-breathe" style={{ ["--o" as any]: 0.06 }} />
          <circle cx="300" cy="300" r="185" strokeWidth="1" strokeDasharray="2 10" className="hi-breathe" style={{ ["--o" as any]: 0.12, animationDelay: "-2s" }} />
        </g>

        {/* Slow orbit ring with tick */}
        <g className="hi-orbit">
          <circle cx="300" cy="300" r="130" fill="none" stroke="url(#hi-accent)" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="1 6" />
          <circle cx="430" cy="300" r="2.5" fill="url(#hi-accent)" />
        </g>

        {/* Outward ripple from hub */}
        <g fill="none" stroke="url(#hi-accent)" strokeWidth="1.25">
          <circle cx="300" cy="300" r="80" className="hi-ripple" />
          <circle cx="300" cy="300" r="80" className="hi-ripple" style={{ animationDelay: "-2s" }} />
        </g>

        {/* Connective links from hub to each node */}
        <g fill="none" stroke="url(#hi-accent)" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round">
          <path d="M300 300 L150 175" className="hi-link" />
          <path d="M300 300 L455 170" className="hi-link" style={{ animationDelay: "-1s" }} />
          <path d="M300 300 L470 445" className="hi-link" style={{ animationDelay: "-2s" }} />
          <path d="M300 300 L135 435" className="hi-link" style={{ animationDelay: "-3s" }} />
        </g>

        {/* ── Central hub: the cloud API ─────────────────────────────── */}
        <g>
          <circle cx="300" cy="300" r="46" fill="url(#hi-surface)" stroke="url(#hi-accent)" strokeWidth="1.25" />
          <circle cx="300" cy="300" r="46" fill="none" stroke="url(#hi-accent)" strokeOpacity="0.35" strokeWidth="1" className="hi-pulse" />
          {/* API glyph — two braces */}
          <g stroke="url(#hi-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M286 285 q-8 0 -8 8 v6 q0 8 -8 8 q8 0 8 8 v6 q0 8 8 8" />
            <path d="M314 285 q8 0 8 8 v6 q0 8 8 8 q-8 0 -8 8 v6 q0 8 -8 8" />
          </g>
        </g>

        {/* ── Node: smart card (top-left) ────────────────────────────── */}
        <g className="hi-float-a">
          <g filter="url(#hi-shadow)" transform="translate(80 120) rotate(-10)">
            <rect x="0" y="0" width="140" height="90" rx="12" fill="url(#hi-surface)" stroke="url(#hi-stroke)" strokeWidth="1" />
            {/* chip */}
            <rect x="14" y="24" width="22" height="18" rx="3" fill="none" stroke="url(#hi-stroke)" strokeWidth="1" />
            {/* NFC arcs */}
            <g transform="translate(96 45)" fill="none" stroke="url(#hi-accent)" strokeLinecap="round" strokeWidth="2">
              <circle r="2" fill="url(#hi-accent)" stroke="none" />
              <path d="M 6 -8 A 10 10 0 0 1 6 8" />
              <path d="M 12 -14 A 18 18 0 0 1 12 14" opacity="0.6" />
            </g>
          </g>
        </g>

        {/* ── Node: phone / mobile wallet (top-right) ────────────────── */}
        <g className="hi-float-b">
          <g filter="url(#hi-shadow)" transform="translate(410 105) rotate(8)">
            <rect x="0" y="0" width="70" height="120" rx="14" fill="url(#hi-surface)" stroke="url(#hi-stroke)" strokeWidth="1" />
            <rect x="8" y="10" width="54" height="86" rx="6" fill="none" stroke="url(#hi-stroke)" strokeOpacity="0.6" strokeWidth="1" />
            {/* wallet card on screen */}
            <rect x="14" y="22" width="42" height="26" rx="4" fill="none" stroke="url(#hi-accent)" strokeOpacity="0.75" strokeWidth="1" />
            {/* tap arcs */}
            <g transform="translate(35 78)" fill="none" stroke="url(#hi-accent)" strokeLinecap="round" strokeWidth="1.6">
              <circle r="1.6" fill="url(#hi-accent)" stroke="none" />
              <path d="M -5 -6 A 8 8 0 0 0 5 -6" />
              <path d="M -10 -10 A 14 14 0 0 0 10 -10" opacity="0.55" />
            </g>
          </g>
        </g>

        {/* ── Node: security key / FIDO2 (bottom-right) ──────────────── */}
        <g className="hi-float-a" style={{ animationDelay: "-2s" }}>
          <g filter="url(#hi-shadow)" transform="translate(430 410) rotate(-14)">
            {/* body */}
            <rect x="0" y="10" width="86" height="30" rx="8" fill="url(#hi-surface)" stroke="url(#hi-stroke)" strokeWidth="1" />
            {/* USB tongue */}
            <rect x="86" y="18" width="18" height="14" rx="2" fill="none" stroke="url(#hi-stroke)" strokeWidth="1" />
            {/* touch dot */}
            <circle cx="22" cy="25" r="6" fill="none" stroke="url(#hi-accent)" strokeWidth="1.4" className="hi-pulse" />
            <circle cx="22" cy="25" r="2" fill="url(#hi-accent)" />
          </g>
        </g>

        {/* ── Node: reader / terminal (bottom-left) ──────────────────── */}
        <g className="hi-float-b" style={{ animationDelay: "-3s" }}>
          <g filter="url(#hi-shadow)" transform="translate(90 400) rotate(6)">
            {/* screen */}
            <rect x="0" y="0" width="96" height="58" rx="10" fill="url(#hi-surface)" stroke="url(#hi-stroke)" strokeWidth="1" />
            <rect x="8" y="8" width="80" height="26" rx="3" fill="none" stroke="url(#hi-stroke)" strokeOpacity="0.6" strokeWidth="1" />
            {/* keypad hints */}
            <g fill="url(#hi-stroke)" opacity="0.6">
              <circle cx="24" cy="46" r="2" />
              <circle cx="48" cy="46" r="2" />
              <circle cx="72" cy="46" r="2" />
            </g>
            {/* stand */}
            <path d="M18 58 L78 58 L70 74 L26 74 Z" fill="url(#hi-surface)" stroke="url(#hi-stroke)" strokeWidth="1" />
          </g>
        </g>

        {/* Sparse particles */}
        <g fill="var(--foreground)" fillOpacity="0.22">
          <circle cx="70" cy="300" r="1.6" />
          <circle cx="530" cy="300" r="1.6" />
          <circle cx="300" cy="70" r="1.6" />
          <circle cx="300" cy="540" r="1.6" />
        </g>
      </svg>
    </div>
  );
}
