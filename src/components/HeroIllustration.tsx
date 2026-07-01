type HeroIllustrationProps = {
  className?: string;
};

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
          <linearGradient id="heroBlueA" x1="150" x2="370" y1="132" y2="376" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" stopOpacity="0.95" />
            <stop offset="1" stopColor="var(--primary-hover)" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="heroBlueB" x1="106" x2="424" y1="98" y2="420" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0.02" />
          </linearGradient>
          <radialGradient id="heroSoftGlow" cx="0" cy="0" r="1" gradientTransform="matrix(0 190 -190 0 260 260)" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <filter id="heroSoftShadow" x="40" y="40" width="440" height="440" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="28" stdDeviation="28" floodColor="#0F172A" floodOpacity="0.14" />
          </filter>
        </defs>

        <circle cx="260" cy="260" r="205" fill="url(#heroSoftGlow)" />
        <circle cx="260" cy="260" r="166" stroke="url(#heroBlueB)" strokeWidth="34" />
        <circle cx="260" cy="260" r="134" className="stroke-primary/18" strokeWidth="1.5" />
        <circle cx="260" cy="260" r="102" className="stroke-primary/25" strokeWidth="1.25" strokeDasharray="8 10" />
        <circle cx="260" cy="260" r="70" className="stroke-primary/20" strokeWidth="1" />

        <g className="stroke-primary/25" strokeWidth="1.2">
          <path d="M122 178C160 136 206 115 260 115C314 115 360 136 398 178" />
          <path d="M122 342C160 384 206 405 260 405C314 405 360 384 398 342" />
          <path d="M146 260H84" />
          <path d="M436 260H374" />
        </g>

        <g filter="url(#heroSoftShadow)" transform="rotate(-8 260 260)">
          <rect x="196" y="196" width="128" height="128" rx="30" fill="url(#heroBlueA)" />
          <rect x="217" y="217" width="86" height="86" rx="22" className="fill-background/15 stroke-white/40" />
          <rect x="239" y="239" width="42" height="42" rx="11" className="fill-background/25 stroke-white/50" />
          {[-36, -18, 0, 18, 36].map((offset) => (
            <g key={`v-${offset}`}>
              <rect x={257 + offset} y="178" width="7" height="18" rx="3.5" className="fill-primary/50" />
              <rect x={257 + offset} y="324" width="7" height="18" rx="3.5" className="fill-primary/50" />
            </g>
          ))}
          {[-36, -18, 0, 18, 36].map((offset) => (
            <g key={`h-${offset}`}>
              <rect x="178" y={257 + offset} width="18" height="7" rx="3.5" className="fill-primary/50" />
              <rect x="324" y={257 + offset} width="18" height="7" rx="3.5" className="fill-primary/50" />
            </g>
          ))}
          <path d="M250 248C263 248 272 257 272 270" className="stroke-white" strokeWidth="4" strokeLinecap="round" />
          <path d="M238 236C268 236 287 256 287 286" className="stroke-white/65" strokeWidth="3" strokeLinecap="round" />
          <path d="M226 224C276 224 302 252 302 302" className="stroke-white/42" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g className="fill-card stroke-border" filter="url(#heroSoftShadow)">
          <rect x="80" y="165" width="86" height="112" rx="22" />
          <rect x="354" y="150" width="88" height="120" rx="24" />
          <rect x="110" y="342" width="116" height="70" rx="24" />
          <rect x="316" y="342" width="110" height="70" rx="24" />
        </g>

        <g className="stroke-primary" strokeLinecap="round" strokeLinejoin="round">
          <path d="M113 198H135M113 216H145M113 234H130" strokeWidth="4" opacity="0.65" />
          <path d="M386 188C398 188 407 197 407 209" strokeWidth="4" opacity="0.75" />
          <path d="M374 176C407 176 421 194 421 226" strokeWidth="3" opacity="0.45" />
          <path d="M147 377L166 363L185 377L185 395L166 407L147 395Z" strokeWidth="3" opacity="0.7" />
          <path d="M353 381C353 370 363 362 374 362C382 362 389 366 393 372C404 373 412 381 412 391C412 402 403 411 391 411H363C351 411 342 402 342 391C342 386 346 381 353 381Z" strokeWidth="3" opacity="0.7" />
        </g>

        <g className="fill-primary/45">
          <circle cx="84" cy="260" r="5" />
          <circle cx="436" cy="260" r="5" />
          <circle cx="260" cy="115" r="4" />
          <circle cx="260" cy="405" r="4" />
          <circle cx="398" cy="178" r="3.5" />
          <circle cx="122" cy="342" r="3.5" />
        </g>
      </svg>
    </div>
  );
}
