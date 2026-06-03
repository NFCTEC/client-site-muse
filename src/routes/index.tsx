import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, Code2, Cpu, Radio, Server, Shield, Smartphone, Zap, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NFCTec — 下一代 NFC / RFID 智能连接" },
      { name: "description", content: "端到端的 NFC/RFID 智能连接方案：标签、读写设备、云平台一体化交付。" },
    ],
  }),
  component: Home,
});

function Home() {
  const { tr } = useI18n();

  const products = [
    { tag: tr("prod.1.tag"), title: tr("prod.1.title"), desc: tr("prod.1.desc"), icon: Radio },
    { tag: tr("prod.2.tag"), title: tr("prod.2.title"), desc: tr("prod.2.desc"), icon: Wifi },
    { tag: tr("prod.3.tag"), title: tr("prod.3.title"), desc: tr("prod.3.desc"), icon: Cpu },
    { tag: tr("prod.4.tag"), title: tr("prod.4.title"), desc: tr("prod.4.desc"), icon: Server },
  ];

  const techs = [
    { title: tr("tech.1.title"), desc: tr("tech.1.desc"), icon: Cpu },
    { title: tr("tech.2.title"), desc: tr("tech.2.desc"), icon: Radio },
    { title: tr("tech.3.title"), desc: tr("tech.3.desc"), icon: Shield },
    { title: tr("tech.4.title"), desc: tr("tech.4.desc"), icon: Server },
  ];

  const industries = [
    tr("ind.1"), tr("ind.2"), tr("ind.3"),
    tr("ind.4"), tr("ind.5"), tr("ind.6"),
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-28 lg:pt-32 lg:pb-40 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3.5 py-1.5 text-xs font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {tr("hero.eyebrow")}
          </div>
          <h1 className="mt-7 font-display font-semibold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-balance whitespace-pre-line">
            {tr("hero.title")}
          </h1>
          <p className="mt-7 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {tr("hero.sub")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/85 transition-all hover:-translate-y-0.5"
            >
              {tr("hero.cta1")}
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:border-foreground transition-colors"
            >
              {tr("hero.cta2")}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden max-w-4xl mx-auto">
            {[
              { n: "3.2", u: tr("hero.stat1") },
              { n: "800+", u: tr("hero.stat2") },
              { n: "42", u: tr("hero.stat3") },
              { n: "120+", u: tr("hero.stat4") },
            ].map((s) => (
              <div key={s.u} className="bg-background py-7 px-4">
                <div className="font-display text-3xl lg:text-4xl font-semibold tracking-tight">{s.n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.u}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
                / {tr("prod.eyebrow")}
              </div>
              <h2 className="font-display text-4xl lg:text-5xl tracking-tight whitespace-pre-line text-balance">
                {tr("prod.title")}
              </h2>
            </div>
            <Link to="/products" className="text-sm font-medium hover:text-primary inline-flex items-center gap-1.5 group">
              {tr("prod.viewAll")}
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {products.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.title}
                  to="/products"
                  className="group relative rounded-3xl border border-border bg-card p-8 lg:p-10 transition-all hover:border-foreground/30 hover:shadow-soft overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-10">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {p.tag}
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-foreground text-background grid place-items-center group-hover:bg-primary transition-colors">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl tracking-tight mb-3">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{p.desc}</p>
                  <ArrowRight
                    className="absolute bottom-8 right-8 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all"
                    size={18}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
              / {tr("tech.eyebrow")}
            </div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-tight whitespace-pre-line text-balance">
              {tr("tech.title")}
            </h2>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {techs.map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="relative">
                  <div className="text-xs font-mono text-muted-foreground mb-6">
                    0{i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-surface border border-border grid place-items-center mb-5">
                    <Icon size={20} className="text-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{t.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24 lg:py-32 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-3">
            / {tr("ind.eyebrow")}
          </div>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight mb-14 text-balance">
            {tr("ind.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {industries.map((ind, i) => (
              <div
                key={ind}
                className="bg-background p-8 lg:p-10 hover:bg-surface-elevated transition-colors group"
              >
                <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-6">
                  <span>0{i + 1}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="font-display text-xl lg:text-2xl font-medium group-hover:text-primary transition-colors">
                  {ind}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="relative rounded-3xl bg-foreground text-background p-12 lg:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_30%_20%,oklch(0.7_0.2_256/0.6),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.7_0.2_256/0.4),transparent_50%)]" />
            <div className="relative">
              <Zap size={32} className="mx-auto mb-6 text-primary" />
              <h2 className="font-display text-3xl lg:text-5xl tracking-tight text-balance">
                {tr("cta.title")}
              </h2>
              <p className="mt-5 text-background/70 max-w-xl mx-auto">{tr("cta.sub")}</p>
              <Link
                to="/contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-3.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tr("cta.btn")}
                <ArrowRight size={16} />
              </Link>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-background/50">
                {["NXP Authorized", "ISO 9001", "ISO 14001", "RoHS"].map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={12} />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
