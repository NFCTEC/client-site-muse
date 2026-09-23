const layers = [
  { label: "NFC / RF", note: "Field · antenna · reader" },
  { label: "Smart Cards", note: "Java Card · APDU" },
  { label: "Security", note: "Keys · SE · identity" },
  { label: "SDK / Firmware", note: "Integration" },
  { label: "Cloud", note: "Issuance · verification" },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] overflow-hidden rounded-[20px] border border-[#e2e3ee] bg-white p-3 shadow-[0_18px_50px_rgba(33,27,89,0.07)] md:p-5">
      <div className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">System architecture / 01</div>
      <svg viewBox="0 0 640 560" className="relative h-auto w-full" role="img" aria-label="NFC to smart cards, security, SDK and cloud">
      <path d="M28 36 H150 M28 58 H96 M500 500 H612 M560 470 V530" fill="none" stroke="#dfe1eb" strokeWidth="1" />
      <g transform="translate(132,270)">
        <circle r="126" fill="none" stroke="#6633ff" strokeOpacity="0.12" strokeWidth="1.2" />
        <circle r="92" fill="none" stroke="#6633ff" strokeOpacity="0.28" strokeWidth="1.2" />
        <circle r="58" fill="none" stroke="#5a36f2" strokeOpacity="0.9" strokeWidth="1.6" />
        <rect x="-50" y="-34" width="100" height="68" rx="7" fill="#ffffff" stroke="#171a35" strokeWidth="1.4" />
        <rect x="-32" y="-16" width="24" height="20" rx="2" fill="none" stroke="#6633ff" strokeWidth="1.2" />
        <path d="M-28 -6 h16 M-20 -12 v12" stroke="#6633ff" strokeWidth="1.2" />
        <path d="M8 -8 H34 M8 0 H28 M8 8 H22" stroke="#5a36f2" strokeWidth="1.2" />
      </g>
      <path d="M250 78 V482" stroke="#dfe1eb" strokeWidth="1.2" />
      {layers.map((layer, index) => {
        const y = 48 + index * 96;
        return (
          <g key={layer.label}>
            <circle cx="250" cy={y + 28} r="4" fill="#6633ff" />
            <rect x="278" y={y} width="300" height="56" rx="12" fill="#ffffff" stroke="#dfe1eb" />
            <path d={`M278 ${y + 28} H250`} stroke="#dfe1eb" />
            <text x="298" y={y + 24} fill="#12152d" fontSize="16" fontWeight="500" fontFamily="IBM Plex Sans, Segoe UI, sans-serif">
              {layer.label}
            </text>
            <text x="298" y={y + 42} fill="#6a6e82" fontSize="12" fontFamily="IBM Plex Mono, ui-monospace, monospace">
              {layer.note}
            </text>
          </g>
        );
      })}
      </svg>
    </div>
  );
}
