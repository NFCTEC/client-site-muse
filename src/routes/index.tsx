import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import {
  ArrowRight, Code2, Cpu, Layers, Wrench, Radio,
  Wallet, Train, Landmark, KeyRound, HeartPulse, Boxes,
  ShieldCheck, ShoppingBag, Car, GraduationCap, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NFCTEC — Full-Stack NFC & Smart Card Solutions" },
      { name: "description", content: "Software SDKs, reader hardware, JavaCard applets and free developer tools — 15+ years, 50+ protocols, 500+ projects worldwide." },
      { property: "og:title", content: "NFCTEC — Full-Stack NFC & Smart Card Solutions" },
      { property: "og:description", content: "From silicon to cloud — NFC SDKs, readers, applets and dev tools." },
    ],
  }),
  component: Home,
});

const protocolGroups: Record<string, string[]> = {
  "proto.g1": ["EMV Contact", "EMV Contactless", "Visa payWave", "Mastercard PayPass", "UnionPay QuickPass", "JCB J/Speedy", "AmEx ExpressPay"],
  "proto.g2": ["ISO 14443 A/B", "ISO 15693", "ISO 18092", "FeliCa", "MIFARE Classic", "MIFARE DESFire", "MIFARE Plus"],
  "proto.g3": ["ISO 7816", "GlobalPlatform 2.3", "JavaCard 3.1", "JCOP", "MULTOS", "CALYPSO", "SEOS"],
  "proto.g4": ["NDEF", "NFC Forum Type 2", "Type 3", "Type 4", "Type 5", "SNEP", "LLCP"],
  "proto.g5": ["AES-128/256", "3DES", "RSA-2048", "ECC P-256", "SHA-256", "SUN Dynamic URL", "PKCS#11"],
};

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
    { icon: GraduationCap, k: "ind.edu" },
  ] as const;

  const tools = [
    { k: "tools.emv" },
    { k: "tools.apdu" },
    { k: "tools.ndef" },
    { k: "tools.mifare" },
  ] as const;

  const allProtocols = Object.values(protocolGroups).flat();

  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-20 lg:pt-32 lg:pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 backdrop-blur px-3.5 py-1.5 text-xs font-mono text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {tr("hero.eyebrow")}
          </div>

          {/* NFC ripple icon */}
          <div className="mt-10 mx-auto w-20 h-20 relative">
            <div className="absolute inset-0 nfc-ripple" />
            <div className="absolute inset-2 rounded-full bg-cyan-gradient grid place-items-center shadow-glow-strong">
              <Radio size={28} className="text-primary-foreground" />
            </div>
          </div>

          <h1 className="mt-10 font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-balance whitespace-pre-line">
            {tr("hero.title")}
          </h1>
          <p className="mt-7 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {tr("hero.sub")}
          </p>
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
              {[...allProtocols, ...allProtocols].map((p, i) => (
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

      {/* 2. FOUR PILLARS */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
              / {tr("pillar.eyebrow")}
            </div>
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
        </div>
      </section>

      {/* 3. PROTOCOL COVERAGE */}
      <section className="py-24 lg:py-28 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
              / {tr("proto.eyebrow")}
            </div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-balance">
              {tr("proto.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{tr("proto.sub")}</p>
          </div>
          <div className="space-y-6">
            {Object.entries(protocolGroups).map(([gk, items]) => (
              <div key={gk} className="rounded-2xl border border-border bg-card-gradient p-6 lg:p-8">
                <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
                  {tr(gk as never)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((it) => (
                    <span
                      key={it}
                      className="rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs font-mono text-foreground/80 hover:border-primary hover:text-primary transition-colors"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: "15+", u: tr("stat.years") },
              { n: "50+", u: tr("stat.protocols") },
              { n: "500+", u: tr("stat.projects") },
            ].map((s) => (
              <div
                key={s.u}
                className="card-glow rounded-2xl border border-border bg-card-gradient p-10 text-center"
              >
                <div className="font-display text-6xl lg:text-7xl font-bold text-cyan-gradient tracking-tight">
                  {s.n}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{s.u}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES (10 cards) */}
      <section className="py-24 lg:py-28 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
                / {tr("ind.eyebrow")}
              </div>
              <h2 className="font-display text-4xl lg:text-5xl tracking-tight whitespace-pre-line text-balance">
                {tr("ind.title")}
              </h2>
            </div>
            <Link to="/solutions" className="text-sm font-medium text-primary inline-flex items-center gap-1.5">
              All solutions <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={ind.k}
                  to="/solutions"
                  hash={ind.k}
                  className="card-glow group rounded-2xl border border-border bg-card-gradient p-6"
                >
                  <Icon size={22} className="text-primary mb-4" />
                  <h3 className="font-display text-sm font-semibold mb-1.5 group-hover:text-primary transition-colors">
                    {tr(`${ind.k}.t` as never)}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tr(`${ind.k}.d` as never)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FREE TOOLS */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
              / {tr("tools.eyebrow")}
            </div>
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

      {/* 7. CTA BANNER */}
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
