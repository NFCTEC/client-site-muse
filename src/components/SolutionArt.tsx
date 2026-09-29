type SolutionArtProps = {
  slug?: string;
  className?: string;
};

function Card({
  id,
  x,
  y,
  w = 176,
  h = 110,
  r = -8,
  stripe = true,
}: {
  id: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  r?: number;
  stripe?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`} filter={`url(#${id}-sh)`}>
      <rect width={w} height={h} rx="13" fill={`url(#${id}-s)`} stroke="var(--foreground)" strokeOpacity="0.28" />
      <rect x="1.2" y="1.2" width={w - 2.4} height={h - 2.4} rx="12" fill="none" stroke={`url(#${id}-a)`} strokeOpacity="0.18" />
      <g transform="translate(18 30)">
        <rect width="30" height="23" rx="3.5" fill={`url(#${id}-a)`} fillOpacity="0.22" stroke={`url(#${id}-a)`} strokeWidth="1.15" />
        <path d="M7 0 v23 M15 0 v23 M23 0 v23 M0 8 h30 M0 15 h30" stroke={`url(#${id}-a)`} strokeOpacity="0.55" strokeWidth="0.55" />
      </g>
      <g transform={`translate(${w - 38} ${h / 2})`} fill="none" stroke={`url(#${id}-a)`} strokeLinecap="round" strokeWidth="1.55">
        <circle r="2.4" fill={`url(#${id}-a)`} stroke="none" />
        <path d="M8 -10 A12 12 0 0 1 8 10" />
        <path d="M15 -17 A20 20 0 0 1 15 17" opacity="0.45" />
      </g>
      {stripe && <rect x="0" y={h - 22} width={w} height="10" fill="var(--foreground)" fillOpacity="0.07" />}
      <rect x="18" y={h - 36} width={w * 0.38} height="5" rx="2" fill="var(--foreground)" fillOpacity="0.1" />
    </g>
  );
}

function Phone({ id, x, y, r = 6 }: { id: string; x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`} filter={`url(#${id}-sh)`}>
      <rect width="78" height="148" rx="18" fill={`url(#${id}-s)`} stroke="var(--foreground)" strokeOpacity="0.28" />
      <rect x="28" y="11" width="22" height="3.5" rx="1.75" fill="var(--foreground)" fillOpacity="0.2" />
      <rect x="10" y="22" width="58" height="100" rx="8" fill="var(--foreground)" fillOpacity="0.04" stroke="var(--foreground)" strokeOpacity="0.12" />
      <rect x="16" y="32" width="46" height="30" rx="5" fill="none" stroke={`url(#${id}-a)`} strokeOpacity="0.85" />
      <circle cx="39" cy="86" r="11" fill="none" stroke={`url(#${id}-a)`} strokeOpacity="0.5" />
      <circle cx="39" cy="86" r="4" fill={`url(#${id}-a)`} />
      <rect x="27" y="132" width="24" height="3.5" rx="1.75" fill="var(--foreground)" fillOpacity="0.22" />
    </g>
  );
}

function Reader({ id, x, y, r = -8 }: { id: string; x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`} filter={`url(#${id}-sh)`}>
      <rect width="118" height="78" rx="12" fill={`url(#${id}-s)`} stroke="var(--foreground)" strokeOpacity="0.26" />
      <rect x="10" y="10" width="98" height="34" rx="5" fill="var(--foreground)" fillOpacity="0.05" stroke="var(--foreground)" strokeOpacity="0.12" />
      <g transform="translate(59 27)" fill="none" stroke={`url(#${id}-a)`} strokeLinecap="round" strokeWidth="1.3">
        <circle r="2" fill={`url(#${id}-a)`} stroke="none" />
        <path d="M8 -10 A12 12 0 0 1 8 10" />
        <path d="M15 -16 A19 19 0 0 1 15 16" opacity="0.4" />
      </g>
      <g fill="var(--foreground)" fillOpacity="0.22">
        <circle cx="26" cy="60" r="2.2" />
        <circle cx="44" cy="60" r="2.2" />
        <circle cx="62" cy="60" r="2.2" />
        <circle cx="80" cy="60" r="2.2" />
        <circle cx="98" cy="60" r="2.2" />
      </g>
      <path d="M18 78 L100 78 L90 96 L28 96 Z" fill={`url(#${id}-s)`} stroke="var(--foreground)" strokeOpacity="0.22" />
    </g>
  );
}

function Disc({ id, x, y, r = 42 }: { id: string; x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} filter={`url(#${id}-sh)`}>
      <circle r={r} fill={`url(#${id}-s)`} stroke="var(--foreground)" strokeOpacity="0.26" />
      <circle r={r - 10} fill="none" stroke={`url(#${id}-a)`} strokeOpacity="0.35" />
      <circle r="7" fill="none" stroke="var(--foreground)" strokeOpacity="0.2" />
      <g fill="none" stroke={`url(#${id}-a)`} strokeLinecap="round" strokeWidth="1.4">
        <circle r="2.2" fill={`url(#${id}-a)`} stroke="none" />
        <path d="M10 -12 A15 15 0 0 1 10 12" />
      </g>
    </g>
  );
}

function Waves({ id, x, y }: { id: string; x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={`url(#${id}-a)`} strokeLinecap="round">
      <circle r="3" fill={`url(#${id}-a)`} stroke="none" />
      <path d="M12 -16 A20 20 0 0 1 12 16" strokeWidth="1.5" opacity="0.85" />
      <path d="M22 -28 A34 34 0 0 1 22 28" strokeWidth="1.25" opacity="0.4" />
      <path d="M32 -40 A48 48 0 0 1 32 40" strokeWidth="1" opacity="0.18" />
    </g>
  );
}

function scene(id: string, slug: string) {
  const a = `url(#${id}-a)`;
  switch (slug) {
    case "banking":
      return (
        <>
          <Card id={id} x={168} y={96} r={-14} />
          <Card id={id} x={236} y={132} r={4} />
          <Reader id={id} x={430} y={88} r={8} />
          <Waves id={id} x={412} y={210} />
        </>
      );
    case "transit":
      return (
        <>
          <g fill="none" stroke="var(--foreground)" strokeOpacity="0.16" strokeWidth="1.4">
            <rect x="72" y="48" width="56" height="264" rx="8" />
            <rect x="512" y="48" width="56" height="264" rx="8" />
            <path d="M128 92 H512" stroke={a} strokeOpacity="0.35" strokeDasharray="7 9" />
            <path d="M128 268 H512" stroke="var(--foreground)" strokeOpacity="0.1" strokeDasharray="5 10" />
          </g>
          <g fill={a} fillOpacity="0.45">
            <circle cx="168" cy="92" r="3.5" />
            <circle cx="472" cy="92" r="3.5" />
          </g>
          <Card id={id} x={236} y={118} r={-5} w={158} h={98} />
          <Disc id={id} x={430} y={248} r={28} />
        </>
      );
    case "access":
      return (
        <>
          <g transform="translate(78 42)" fill="none" stroke="var(--foreground)" strokeOpacity="0.2">
            <rect width="168" height="276" rx="10" />
            <rect x="18" y="22" width="132" height="88" rx="6" fill="var(--foreground)" fillOpacity="0.04" />
            <circle cx="128" cy="168" r="9" stroke={a} />
            <rect x="176" y="140" width="28" height="56" rx="6" stroke={a} />
          </g>
          <Card id={id} x={318} y={108} r={10} w={148} h={92} />
          <Waves id={id} x={292} y={196} />
        </>
      );
    case "brand":
      return (
        <>
          <g transform="translate(96 64)" fill="none" stroke="var(--foreground)" strokeOpacity="0.2">
            <rect width="96" height="228" rx="16" fill={`url(#${id}-s)`} />
            <rect x="18" y="22" width="60" height="88" rx="8" stroke={a} />
            <rect x="26" y="34" width="44" height="28" rx="4" />
            <circle cx="48" cy="148" r="16" stroke={a} />
          </g>
          <Phone id={id} x={368} y={78} r={-7} />
          <Disc id={id} x={268} y={248} r={26} />
        </>
      );
    case "gov":
      return (
        <>
          <g transform="translate(148 62) rotate(-11)" filter={`url(#${id}-sh)`}>
            <rect width="142" height="196" rx="8" fill={`url(#${id}-s)`} stroke="var(--foreground)" strokeOpacity="0.24" />
            <rect x="16" y="20" width="78" height="96" rx="4" fill="none" stroke="var(--foreground)" strokeOpacity="0.14" />
            <circle cx="108" cy="48" r="16" fill="none" stroke={a} />
            <rect x="16" y="132" width="110" height="8" rx="2" fill="var(--foreground)" fillOpacity="0.1" />
            <rect x="16" y="150" width="86" height="6" rx="2" fill="var(--foreground)" fillOpacity="0.07" />
          </g>
          <g transform="translate(302 86) rotate(9)" filter={`url(#${id}-sh)`}>
            <rect width="142" height="196" rx="8" fill={`url(#${id}-s)`} stroke={a} strokeOpacity="0.55" />
            <circle cx="44" cy="56" r="24" fill="none" stroke={a} />
            <rect x="82" y="38" width="40" height="32" rx="4" fill="none" stroke="var(--foreground)" strokeOpacity="0.16" />
            <rect x="16" y="148" width="110" height="8" rx="2" fill="var(--foreground)" fillOpacity="0.1" />
          </g>
        </>
      );
    case "health":
      return (
        <>
          <Card id={id} x={132} y={108} r={-9} />
          <g transform="translate(392 86)" filter={`url(#${id}-sh)`}>
            <rect width="112" height="112" rx="24" fill={`url(#${id}-s)`} stroke="var(--foreground)" strokeOpacity="0.2" />
            <path d="M56 28 v56 M28 56 h56" stroke={a} strokeWidth="8" strokeLinecap="round" />
          </g>
          <Disc id={id} x={368} y={248} r={24} />
        </>
      );
    case "iot":
      return (
        <>
          <g transform="translate(86 72)" fill="none" stroke="var(--foreground)" strokeOpacity="0.16">
            <rect width="228" height="196" rx="12" />
            <circle cx="40" cy="40" r="10" stroke={a} />
            <circle cx="188" cy="40" r="10" />
            <circle cx="40" cy="156" r="10" />
            <circle cx="188" cy="156" r="10" stroke={a} />
            <path d="M40 40 H188 M40 156 H188 M40 40 V156 M188 40 V156" strokeDasharray="5 7" opacity="0.55" />
            <circle cx="114" cy="98" r="16" stroke={a} />
          </g>
          <Card id={id} x={372} y={112} r={8} w={138} h={86} />
        </>
      );
    case "retail":
      return (
        <>
          <g transform="translate(78 58)" fill="none" stroke="var(--foreground)" strokeOpacity="0.2">
            <rect width="168" height="228" rx="14" fill={`url(#${id}-s)`} />
            <rect x="16" y="16" width="136" height="78" rx="8" stroke={a} strokeOpacity="0.7" />
            <g fill="var(--foreground)" fillOpacity="0.22">
              <circle cx="40" cy="128" r="5" />
              <circle cx="68" cy="128" r="5" />
              <circle cx="96" cy="128" r="5" />
              <circle cx="124" cy="128" r="5" />
            </g>
            <rect x="28" y="168" width="112" height="10" rx="5" fill="var(--foreground)" fillOpacity="0.08" />
            <rect x="44" y="188" width="80" height="8" rx="4" fill="var(--foreground)" fillOpacity="0.06" />
          </g>
          <Card id={id} x={312} y={124} r={7} />
          <Waves id={id} x={508} y={92} />
        </>
      );
    case "auto":
      return (
        <>
          <g transform="translate(64 118)" fill="none" stroke="var(--foreground)" strokeOpacity="0.24" strokeWidth="1.5">
            <path d="M18 96 L52 46 H228 L286 96 H328 V138 H18 Z" fill={`url(#${id}-s)`} />
            <circle cx="86" cy="138" r="24" stroke={a} />
            <circle cx="248" cy="138" r="24" stroke={a} />
            <rect x="78" y="58" width="78" height="30" rx="5" />
            <path d="M198 58 h52 v30 h-32" />
          </g>
          <Phone id={id} x={438} y={72} r={9} />
          <Waves id={id} x={402} y={196} />
        </>
      );
    case "wallet":
      return (
        <>
          <Phone id={id} x={282} y={58} r={0} />
          <g transform="translate(148 138) rotate(-18)" filter={`url(#${id}-sh)`}>
            <rect width="122" height="76" rx="12" fill={`url(#${id}-s)`} stroke={a} />
            <rect x="14" y="18" width="28" height="20" rx="3" fill="none" stroke={a} />
          </g>
          <g transform="translate(388 158) rotate(14)" filter={`url(#${id}-sh)`}>
            <rect width="122" height="76" rx="12" fill={`url(#${id}-s)`} stroke="var(--foreground)" strokeOpacity="0.22" />
            <rect x="14" y="18" width="28" height="20" rx="3" fill="none" stroke="var(--foreground)" strokeOpacity="0.25" />
          </g>
        </>
      );
    case "security":
      return (
        <>
          <g transform="translate(108 142) rotate(-10)" filter={`url(#${id}-sh)`}>
            <rect width="168" height="52" rx="14" fill={`url(#${id}-s)`} stroke="var(--foreground)" strokeOpacity="0.24" />
            <rect x="168" y="16" width="30" height="20" rx="3" fill="none" stroke="var(--foreground)" strokeOpacity="0.3" />
            <circle cx="38" cy="26" r="13" fill="none" stroke={a} strokeWidth="1.5" />
            <circle cx="38" cy="26" r="4.5" fill={a} />
          </g>
          <g transform="translate(392 72)" fill="none">
            <path d="M36 78 V52 a28 28 0 0 1 56 0 V78" stroke={a} strokeWidth="2" />
            <rect x="22" y="78" width="84" height="96" rx="12" fill={`url(#${id}-s)`} stroke="var(--foreground)" strokeOpacity="0.2" filter={`url(#${id}-sh)`} />
            <circle cx="64" cy="122" r="12" stroke={a} />
            <path d="M64 128 v10" stroke={a} strokeLinecap="round" />
          </g>
        </>
      );
    case "edu":
      return (
        <>
          <g transform="translate(72 96)" fill="none" stroke="var(--foreground)" strokeOpacity="0.2">
            <path d="M80 36 L220 4 L360 36 V178 H80 Z" fill={`url(#${id}-s)`} />
            <rect x="148" y="92" width="44" height="86" />
            <rect x="214" y="74" width="40" height="40" stroke={a} />
            <path d="M80 36 L220 62 L360 36" stroke={a} strokeOpacity="0.45" />
          </g>
          <Card id={id} x={368} y={132} r={8} w={148} h={92} />
        </>
      );
    default:
      return (
        <>
          <Card id={id} x={176} y={108} r={-8} />
          <Phone id={id} x={392} y={86} r={8} />
          <Waves id={id} x={356} y={196} />
        </>
      );
  }
}

export function SolutionArt({ slug = "", className = "h-full w-full" }: SolutionArtProps) {
  const id = `sa-${slug || "x"}`;
  return (
    <svg viewBox="0 0 640 360" className={className} aria-hidden fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-a`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="var(--primary)" />
          <stop offset="1" stopColor="#7B2FFF" />
        </linearGradient>
        <linearGradient id={`${id}-s`} x1="18%" y1="0%" x2="82%" y2="100%">
          <stop stopColor="var(--foreground)" stopOpacity="0.11" />
          <stop offset="1" stopColor="var(--foreground)" stopOpacity="0.03" />
        </linearGradient>
        <radialGradient id={`${id}-g1`} cx="22%" cy="18%" r="58%">
          <stop stopColor="var(--primary)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-g2`} cx="82%" cy="78%" r="55%">
          <stop stopColor="#7B2FFF" stopOpacity="0.2" />
          <stop offset="1" stopColor="#7B2FFF" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-d`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="var(--foreground)" fillOpacity="0.09" />
        </pattern>
        <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#040814" floodOpacity="0.28" />
        </filter>
      </defs>
      <rect width="640" height="360" fill={`url(#${id}-g1)`} />
      <rect width="640" height="360" fill={`url(#${id}-g2)`} />
      <rect width="640" height="360" fill={`url(#${id}-d)`} />
      <ellipse cx="320" cy="318" rx="210" ry="22" fill="var(--foreground)" fillOpacity="0.04" />
      {scene(id, slug)}
    </svg>
  );
}
