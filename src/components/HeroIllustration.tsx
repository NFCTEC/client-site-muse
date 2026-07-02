type HeroIllustrationProps = {
  className?: string;
};

/**
 * Hero mark — "Node Architecture".
 *
 * A quiet cloud-API hub at center (diamond core inside concentric rings +
 * a tilted orbital ellipse), connected by dashed lines to four floating
 * objects: smart card, mobile wallet, security key (FIDO2), reader/terminal.
 * Monochrome surfaces; brand cyan→violet reserved for connective lines,
 * NFC arcs, the core diamond, and two accent particles.
 */
export function HeroIllustration({ className = "w-full max-w-[560px]" }: HeroIllustrationProps) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      <style>{`
        @keyframes hi-float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes hi-float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes hi-breathe { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.85;transform:scale(1.03)} }
        @keyframes hi-dash    { to { stroke-dashoffset: -40; } }
        @keyframes hi-ping    { 0%{transform:scale(1);opacity:.9} 75%,100%{transform:scale(2.6);opacity:0} }
        @keyframes hi-spin    { to { transform: rotate(360deg); } }
        .hi-float-a { animation: hi-float-a 6.5s ease-in-out infinite; }
        .hi-float-b { animation: hi-float-b 7s ease-in-out infinite; }
        .hi-breathe { transform-origin:300px 300px; animation: hi-breathe 4.5s ease-in-out infinite; }
        .hi-link    { stroke-dasharray: 4 6; animation: hi-dash 7s linear infinite; }
        .hi-ping    { transform-origin: center; animation: hi-ping 3.6s cubic-bezier(0,0,.2,1) infinite; transform-box: fill-box; }
        .hi-orbit   { transform-origin: 300px 300px; animation: hi-spin 45s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hi-float-a,.hi-float-b,.hi-breathe,.hi-link,.hi-ping,.hi-orbit { animation: none; }
        }
      `}</style>

      {/* Ambient glow behind the mark */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[color-mix(in_oklab,var(--primary)_10%,transparent)] to-[color-mix(in_oklab,#7B2FFF_14%,transparent)] blur-3xl" />

      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="hi-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="var(--primary)" />
            <stop offset="1" stopColor="#7B2FFF" />
          </linearGradient>
          <linearGradient id="hi-surface" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="var(--foreground)" stopOpacity="0.05" />
            <stop offset="1" stopColor="var(--foreground)" stopOpacity="0.015" />
          </linearGradient>
          <filter id="hi-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="hi-shadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#040814" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* ── Connection lines from hub to each node ─────────────── */}
        <g fill="none" stroke="url(#hi-accent)" strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round">
          <path d="M300 300 L165 165" className="hi-link" />
          <path d="M300 300 L450 175" className="hi-link" style={{ animationDelay: "-1.5s" }} />
          <path d="M300 300 L470 435" className="hi-link" style={{ animationDelay: "-3s" }} />
          <path d="M300 300 L175 445" className="hi-link" style={{ animationDelay: "-4.5s" }} />
        </g>

        {/* ── Central hub: cloud API core ─────────────────────────── */}
        <g>
          {/* tilted orbit */}
          <g className="hi-orbit">
            <ellipse cx="300" cy="300" rx="88" ry="32" fill="none" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="1" transform="rotate(-30 300 300)" />
            <circle cx="388" cy="300" r="2" fill="url(#hi-accent)" transform="rotate(-30 300 300)" />
          </g>
          {/* rings */}
          <circle cx="300" cy="300" r="50" fill="none" stroke="url(#hi-accent)" strokeWidth="1.25" />
          <circle cx="300" cy="300" r="38" fill="none" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="1" />
          <circle cx="300" cy="300" r="60" fill="none" stroke="url(#hi-accent)" strokeWidth="1" className="hi-breathe" />
          {/* diamond core */}
          <path d="M285 300 L300 285 L315 300 L300 315 Z" fill="url(#hi-accent)" filter="url(#hi-glow)" />
        </g>

        {/* ── Node: Smart card (top-left) ─────────────────────────── */}
        <g className="hi-float-a">
          <g filter="url(#hi-shadow)" transform="translate(95 118) rotate(-8)">
            <rect x="0" y="0" width="110" height="70" rx="8" fill="url(#hi-surface)" stroke="var(--foreground)" strokeOpacity="0.22" strokeWidth="1" />
            {/* chip */}
            <rect x="14" y="20" width="20" height="15" rx="2.5" fill="none" stroke="var(--foreground)" strokeOpacity="0.35" strokeWidth="0.8" />
            <path d="M18 27 h12 M24 20 v15" stroke="var(--foreground)" strokeOpacity="0.25" strokeWidth="0.6" />
            {/* NFC arcs */}
            <g transform="translate(78 46)" fill="none" stroke="url(#hi-accent)" strokeLinecap="round" strokeWidth="1.6">
              <circle r="1.8" fill="url(#hi-accent)" stroke="none" />
              <path d="M 6 -7 A 9 9 0 0 1 6 7" />
              <path d="M 12 -13 A 16 16 0 0 1 12 13" opacity="0.55" />
            </g>
          </g>
        </g>

        {/* ── Node: Mobile wallet (top-right) ─────────────────────── */}
        <g className="hi-float-b">
          <g filter="url(#hi-shadow)" transform="translate(415 110) rotate(7)">
            <rect x="0" y="0" width="60" height="112" rx="12" fill="url(#hi-surface)" stroke="var(--foreground)" strokeOpacity="0.22" strokeWidth="1" />
            {/* speaker */}
            <rect x="22" y="8" width="16" height="2.5" rx="1.25" fill="var(--foreground)" fillOpacity="0.2" />
            {/* screen */}
            <rect x="8" y="16" width="44" height="72" rx="4" fill="none" stroke="var(--foreground)" strokeOpacity="0.14" strokeWidth="0.8" />
            {/* card on screen */}
            <rect x="14" y="26" width="32" height="20" rx="3" fill="none" stroke="url(#hi-accent)" strokeOpacity="0.65" strokeWidth="1" />
            {/* tap waves */}
            <g transform="translate(30 68)" fill="none" stroke="url(#hi-accent)" strokeLinecap="round" strokeWidth="1.3">
              <path d="M -7 0 Q 0 -8 7 0" />
              <path d="M -12 4 Q 0 -12 12 4" opacity="0.55" />
            </g>
            {/* home indicator */}
            <rect x="20" y="100" width="20" height="2" rx="1" fill="var(--foreground)" fillOpacity="0.25" />
          </g>
        </g>

        {/* ── Node: Reader / terminal (bottom-right) ──────────────── */}
        <g className="hi-float-a" style={{ animationDelay: "-2s" }}>
          <g filter="url(#hi-shadow)" transform="translate(410 400) rotate(-10)">
            {/* body */}
            <rect x="0" y="0" width="96" height="66" rx="10" fill="url(#hi-surface)" stroke="var(--foreground)" strokeOpacity="0.22" strokeWidth="1" />
            {/* screen */}
            <rect x="8" y="8" width="80" height="28" rx="3" fill="none" stroke="var(--foreground)" strokeOpacity="0.16" strokeWidth="0.8" />
            {/* nfc field on screen */}
            <g transform="translate(48 22)" fill="none" stroke="url(#hi-accent)" strokeLinecap="round" strokeWidth="1.2">
              <circle r="1.4" fill="url(#hi-accent)" stroke="none" />
              <path d="M -6 -4 A 8 8 0 0 1 -6 4" />
              <path d="M -11 -8 A 14 14 0 0 1 -11 8" opacity="0.5" />
            </g>
            {/* keypad dots */}
            <g fill="var(--foreground)" opacity="0.35">
              <circle cx="20" cy="50" r="1.6" /><circle cx="34" cy="50" r="1.6" /><circle cx="48" cy="50" r="1.6" />
              <circle cx="62" cy="50" r="1.6" /><circle cx="76" cy="50" r="1.6" />
            </g>
            {/* base */}
            <path d="M14 66 L82 66 L74 82 L22 82 Z" fill="url(#hi-surface)" stroke="var(--foreground)" strokeOpacity="0.22" strokeWidth="1" />
          </g>
        </g>

        {/* ── Node: FIDO2 security key (bottom-left) ──────────────── */}
        <g className="hi-float-b" style={{ animationDelay: "-3s" }}>
          <g filter="url(#hi-shadow)" transform="translate(115 400) rotate(12)">
            {/* body */}
            <rect x="0" y="12" width="90" height="30" rx="8" fill="url(#hi-surface)" stroke="var(--foreground)" strokeOpacity="0.22" strokeWidth="1" />
            {/* USB tongue */}
            <rect x="90" y="20" width="18" height="14" rx="2" fill="none" stroke="var(--foreground)" strokeOpacity="0.28" strokeWidth="1" />
            <rect x="94" y="24" width="10" height="6" fill="var(--foreground)" fillOpacity="0.15" />
            {/* touch ring */}
            <circle cx="24" cy="27" r="8" fill="none" stroke="url(#hi-accent)" strokeWidth="1.2" />
            <circle cx="24" cy="27" r="3" fill="url(#hi-accent)" />
            {/* keyring hole */}
            <circle cx="76" cy="27" r="2.5" fill="none" stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="0.8" />
          </g>
        </g>

        {/* ── Accent particles (two brand-tinted pings + neutrals) ─ */}
        <circle cx="240" cy="220" r="2" fill="var(--primary)" className="hi-ping" />
        <circle cx="380" cy="420" r="2" fill="#7B2FFF" className="hi-ping" style={{ animationDelay: "-1.8s" }} />
        <g fill="var(--foreground)" fillOpacity="0.28">
          <circle cx="200" cy="350" r="1.4" />
          <circle cx="405" cy="280" r="1.4" />
          <circle cx="90" cy="290" r="1.2" />
          <circle cx="515" cy="310" r="1.2" />
        </g>
      </svg>
    </div>
  );
}
