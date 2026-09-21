import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { CmsSolution } from "@/lib/cms";
import { SolutionVisual } from "@/components/SolutionVisual";
import { PostBody } from "@/components/PostBody";

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
  const hero = solution.heroImage;
  const zh = lang === "zh";

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
            <ArrowLeft size={14} /> {zh ? "全部行业方案" : "All solutions"}
          </Link>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 flex items-start gap-6">
              <div className="hidden sm:grid w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 place-items-center shrink-0">
                <Icon size={26} className="text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="font-display text-4xl lg:text-5xl tracking-tight text-balance">{solution.headline || solution.name}</h1>
                <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">{solution.tagline}</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-border bg-card-gradient shadow-glow">
                <SolutionVisual src={hero} alt={`${solution.name} NFC solution`} icon={solution.icon} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="text-xs font-mono text-primary uppercase tracking-widest">{zh ? "概述" : "Overview"}</div>
          </div>
          <div className="lg:col-span-9">
            <p className="text-base lg:text-lg text-foreground/90 leading-relaxed max-w-3xl">{solution.intro}</p>
          </div>
        </div>
      </section>

      {solution.body ? (
        <section className="py-14 lg:py-16 border-b border-border">
          <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="text-xs font-mono text-primary uppercase tracking-widest">{zh ? "说明" : "Notes"}</div>
            </div>
            <div className="lg:col-span-9">
              <PostBody body={solution.body} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <h2 className="font-display text-2xl lg:text-3xl tracking-tight mb-10">
            {zh ? "工作范围" : "Work items"}
          </h2>
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

      {solution.workflow.length > 0 ? (
        <section className="py-16 lg:py-20 border-t border-border bg-surface/30">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="font-display text-2xl lg:text-3xl tracking-tight mb-10">
              {zh ? "实施顺序" : "Sequence"}
            </h2>
            <ol className="grid md:grid-cols-2 gap-4">
              {solution.workflow.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-border bg-card-gradient p-6">
                  <div className="text-xs font-mono text-primary mb-2">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {solution.deliverables.length > 0 ? (
        <section className="py-16 lg:py-20 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="font-display text-2xl lg:text-3xl tracking-tight mb-8">
              {zh ? "交付清单" : "Deliverables"}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {solution.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="py-16 lg:py-20 border-t border-border bg-surface/30">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">{zh ? "覆盖协议" : "Protocols"}</div>
            <div className="flex flex-wrap gap-2">
              {solution.protocols.map((p) => (
                <span key={p} className="rounded-full border border-border bg-background/40 px-3.5 py-1.5 text-xs font-mono text-foreground/80">{p}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">{zh ? "认证与合规" : "Certifications"}</div>
            <div className="flex flex-wrap gap-2">
              {solution.certifications.map((c) => (
                <span key={c} className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-mono text-primary">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {solution.faqs.length > 0 ? (
        <section className="py-16 lg:py-20 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="font-display text-2xl lg:text-3xl tracking-tight mb-8">FAQ</h2>
            <div className="space-y-4 max-w-4xl">
              {solution.faqs.map((item) => (
                <div key={item.q} className="rounded-2xl border border-border bg-card-gradient p-6">
                  <h3 className="font-display text-lg mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {solution.relatedLinks.length > 0 ? (
        <section className="py-12 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 className="font-display text-xl mb-5">{zh ? "相关资料" : "References"}</h2>
            <div className="flex flex-wrap gap-3">
              {solution.relatedLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-24 pt-8">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="relative rounded-3xl border border-primary/30 bg-card-gradient p-10 lg:p-12 text-center overflow-hidden shadow-glow">
            <h2 className="font-display text-2xl lg:text-3xl tracking-tight">{zh ? "技术对接" : "Technical enquiry"}</h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/$locale/contact" params={{ locale }} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all">
                {tr("cta.btn")} <ArrowRight size={16} />
              </Link>
              <Link to="/$locale/solutions" params={{ locale }} className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/60 backdrop-blur px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                {zh ? "其他方案" : "Other programmes"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
