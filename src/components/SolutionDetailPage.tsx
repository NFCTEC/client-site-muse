import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { CmsSolution } from "@/lib/cms";

const SLUG_IMAGES: Record<string, string> = {
  banking: "/solutions/banking.webp",
  transit: "/solutions/transit.webp",
  gov: "/solutions/gov.webp",
  access: "/solutions/access.webp",
  health: "/solutions/health.webp",
  iot: "/solutions/iot.webp",
  brand: "/solutions/brand.webp",
  retail: "/solutions/retail.webp",
  auto: "/solutions/auto.webp",
  wallet: "/solutions/wallet.webp",
  security: "/solutions/security.webp",
};

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Boxes;
}

export function SolutionDetailPage({
  solution,
  locale,
}: {
  solution: CmsSolution;
  locale: string;
}) {
  const { lang, tr } = useI18n();
  const Icon = getIcon(solution.icon);
  const hero = solution.heroImage ?? SLUG_IMAGES[solution.slug];

  return (
    <>
      <section className="relative pt-24 lg:pt-32 pb-14 border-b border-border">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <Link
            to="/$locale/solutions"
            params={{ locale }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} /> {lang === "zh" ? "全部行业方案" : "All solutions"}
          </Link>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 flex items-start gap-6">
              <div className="hidden sm:grid w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 place-items-center shrink-0">
                <Icon size={26} className="text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="font-display text-4xl lg:text-5xl tracking-tight text-balance">{solution.name}</h1>
                <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">{solution.tagline}</p>
              </div>
            </div>
            {hero && (
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-border bg-card-gradient shadow-glow">
                  <img
                    src={hero}
                    alt={`${solution.name} NFC solution`}
                    width={1216}
                    height={640}
                    className="w-full h-auto block dark:[filter:none] [filter:brightness(1.08)_saturate(0.9)_contrast(0.95)]"
                  />
                  <div className="pointer-events-none absolute inset-0 dark:hidden bg-gradient-to-b from-white/25 via-transparent to-white/50" />
                  <div className="pointer-events-none absolute inset-0 dark:hidden bg-gradient-to-tr from-[color-mix(in_oklab,var(--primary)_12%,transparent)] via-transparent to-[color-mix(in_oklab,#7B2FFF_12%,transparent)]" />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/70 dark:ring-transparent" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="text-xs font-mono text-primary uppercase tracking-widest">{lang === "zh" ? "概述" : "Overview"}</div>
          </div>
          <div className="lg:col-span-9">
            <p className="text-base lg:text-lg text-foreground/90 leading-relaxed max-w-3xl">{solution.intro}</p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <h2 className="font-display text-2xl lg:text-3xl tracking-tight mb-10">{lang === "zh" ? "我们能做什么" : "What we build"}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solution.capabilities.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card-gradient p-6 hover:border-primary/40 transition-colors">
                <h3 className="font-display text-base font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 border-t border-border bg-surface/30">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">{lang === "zh" ? "覆盖协议" : "Protocols"}</div>
            <div className="flex flex-wrap gap-2">
              {solution.protocols.map((p) => (
                <span key={p} className="rounded-full border border-border bg-background/40 px-3.5 py-1.5 text-xs font-mono text-foreground/80">{p}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">{lang === "zh" ? "认证与合规" : "Certifications"}</div>
            <div className="flex flex-wrap gap-2">
              {solution.certifications.map((c) => (
                <span key={c} className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-mono text-primary">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="relative rounded-3xl border border-primary/30 bg-card-gradient p-10 lg:p-12 text-center overflow-hidden shadow-glow">
            <h2 className="font-display text-2xl lg:text-3xl tracking-tight">{lang === "zh" ? "需要这套方案？" : "Need this in production?"}</h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/$locale/contact" params={{ locale }} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all">
                {tr("cta.btn")} <ArrowRight size={16} />
              </Link>
              <Link to="/$locale/solutions" params={{ locale }} className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/60 backdrop-blur px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                {lang === "zh" ? "查看其他行业" : "Other industries"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
