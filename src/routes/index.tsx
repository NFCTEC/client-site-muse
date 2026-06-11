import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import {
  ArrowRight, Code2, Cpu, Layers, Wrench, Radio,
  Wallet, Train, Landmark, KeyRound, HeartPulse, Boxes,
  ShieldCheck, ShoppingBag, Car, Smartphone, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NFCTEC — Full-Stack NFC & Smart Card Solutions" },
      { name: "description", content: "NFC hardware, software SDKs and an issuance & verification API — one partner for every NFC project." },
      { property: "og:title", content: "NFCTEC — Full-Stack NFC & Smart Card Solutions" },
      { property: "og:description", content: "Hardware, software, API — everything NFC, from one partner." },
    ],
  }),
  component: Home,
});

const protocolMarquee = [
  "EMV Contactless", "ISO 14443 A/B", "ISO 15693", "ISO 7816", "FeliCa",
  "NTAG 424 DNA", "MIFARE DESFire EV3", "MIFARE Plus", "JavaCard 3.1", "GlobalPlatform 2.3",
  "ICAO 9303", "PACE / BAC / EAC", "HCE", "SUN Dynamic URL", "AES-128/256",
  "NDEF Type 2/4/5", "ISO 18092", "Apple Pay", "Google Pay", "PKCS#11",
];

function Home() {
  const { tr } = useI18n();

  const pillars = [
    { icon: Code2, t: tr("pillar.sw.title"), d: tr("pillar.sw.desc"), to: "/products" },
    { icon: Cpu, t: tr("pillar.hw.title"), d: tr("pillar.hw.desc"), to: "/products" },
    { icon: Layers, t: tr("pillar.sol.title"), d: tr("pillar.sol.desc"), to: "/solutions" },
    { icon: Wrench, t: tr("pillar.dev.title"), d: tr("pillar.dev.desc"), to: "/platform" },
  ];

  const industries = [
    { icon: Wallet, k: "ind.banking" },
    { icon: Train, k: "ind.transit" },
    { icon: Landmark, k: "ind.gov" },
    { icon: KeyRound, k: "ind.access" },
    { icon: HeartPulse, k: "ind.health" },
    { icon: Boxes, k: "ind.iot" },
    { icon: ShieldCheck, k: "ind.brand" },
    { icon: ShoppingBag, k: "ind.retail" },
    { icon: Car, k: "ind.auto" },
    { icon: Smartphone, k: "ind.wallet" },
  ] as const;

  const tools = [
    { k: "tools.emv" },
    { k: "tools.apdu" },
    { k: "tools.ndef" },
    { k: "tools.mifare" },
  ] as const;

  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-20 lg:pt-36 lg:pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 backdrop-blur px-3.5 py-1.5 text-xs font-mono text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {tr("hero.eyebrow")}
          </div>

          <h1 className="mt-8 font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-balance whitespace-pre-line">

            {tr("hero.title")}
          </h1>
          <p className="mt-7 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {tr("hero.sub")}
          </p>

          {/* Inline stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span><span className="font-display font-semibold text-foreground">15+</span> {tr("stat.years")}</span>
            <span className="w-px h-4 bg-border hidden sm:block" />
            <span><span className="font-display font-semibold text-foreground">50+</span> {tr("stat.protocols")}</span>
            <span className="w-px h-4 bg-border hidden sm:block" />
            <span><span className="font-display font-semibold text-foreground">500+</span> {tr("stat.projects")}</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all hover:-translate-y-0.5"
            >
              {tr("hero.cta1")} <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 backdrop-blur px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              {tr("hero.cta2")}
            </Link>
          </div>

          {/* Protocol marquee */}
          <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
            <div className="flex gap-3 animate-marquee w-max">
              {[...protocolMarquee, ...protocolMarquee].map((p, i) => (
                <span
                  key={i}
                  className="shrink-0 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs font-mono text-muted-foreground whitespace-nowrap"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance">
              {tr("pillar.title")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.t}
                  to={p.to}
                  className="card-glow group relative rounded-2xl border border-border bg-card-gradient p-7 overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{p.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                  <ArrowRight size={16} className="absolute bottom-6 right-6 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>

          {/* Industries → link only */}
          <div className="mt-10 flex justify-center">
            <Link to="/solutions" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all">
              {tr("ind.title").replace(/\n/g, " ")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>


      {/* 3. API SECTION */}
      <section className="py-24 lg:py-28 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight whitespace-pre-line text-balance">
              {tr("api.title")}
            </h2>
            <p className="mt-5 text-muted-foreground max-w-lg leading-relaxed">
              {tr("api.sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/platform" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all">
                {tr("plat.title")} <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                {tr("hero.cta2")}
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-border bg-card-gradient overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface/50">
                <span className="text-xs font-mono text-primary">POST /v1/tags/issue</span>
                <span className="text-[10px] font-mono text-muted-foreground">{tr("api.issue")}</span>
              </div>
              <pre className="p-5 text-xs font-mono leading-relaxed text-foreground/80 overflow-x-auto"><code>{`{
  "chip": "NTAG424_DNA",
  "uid":  "04A1B2C3D4E580",
  "url":  "https://brand.com/x"
}
→ 200 OK
{ "personalization": "...", "sun_url": "..." }`}</code></pre>
            </div>
            <div className="rounded-2xl border border-border bg-card-gradient overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface/50">
                <span className="text-xs font-mono text-primary">POST /v1/tags/verify</span>
                <span className="text-[10px] font-mono text-muted-foreground">{tr("api.verify")}</span>
              </div>
              <pre className="p-5 text-xs font-mono leading-relaxed text-foreground/80 overflow-x-auto"><code>{`{
  "scan_url": "https://brand.com/x?e=...&c=..."
}
→ 200 OK
{ "valid": true, "uid": "04A1B2...", "counter": 42 }`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREE TOOLS */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance">
              {tr("tools.title")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((t) => (
              <Link
                key={t.k}
                to="/platform"
                className="card-glow group rounded-2xl border border-border bg-card-gradient p-7"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-2.5 py-1 text-[10px] font-mono text-primary mb-5">
                  <Sparkles size={10} /> FREE
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{tr(`${t.k}.t` as never)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {tr(`${t.k}.d` as never)}
                </p>
                <span className="text-xs font-mono text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {tr("tools.open")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="relative rounded-3xl border border-primary/30 bg-card-gradient p-12 lg:p-16 text-center overflow-hidden shadow-glow">
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-3xl lg:text-5xl tracking-tight text-balance">
                {tr("cta.title")}
              </h2>
              <p className="mt-5 text-muted-foreground max-w-xl mx-auto">{tr("cta.sub")}</p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:shadow-glow-strong transition-all"
                >
                  {tr("cta.btn")} <ArrowRight size={16} />
                </Link>
                <Link
                  to="/downloads"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/60 backdrop-blur px-7 py-3.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {tr("cta.btn2")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
