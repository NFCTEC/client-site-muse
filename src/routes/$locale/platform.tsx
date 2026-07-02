import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Plug, Code2, Sparkles, ShieldCheck, KeyRound, Lock, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { fetchDisplayConfig } from "@/lib/cms";
import { isModuleEnabled } from "@/lib/display-config";
import type { Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";

export const Route = createFileRoute("/$locale/platform")({
  loader: async ({ params }) => {
    const config = await fetchDisplayConfig(params.locale as Locale);
    if (!isModuleEnabled(config, "platform")) throw notFound();
    return { showDownloads: config.modules.downloads.enabled };
  },
  head: () => ({
    meta: [
      { title: "Cloud Services — NFCTEC" },
      { name: "description", content: "Cloud personalization & verification for NTAG424 DNA and MIFARE DESFire. Simple REST API, HSM-backed keys." },
      { property: "og:title", content: "NFCTEC Cloud Services" },
      { property: "og:description", content: "Issue and verify NFC credentials via REST API." },
      { property: "og:url", content: "https://www.nfctec.com/platform" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://www.nfctec.com/platform" },
      ...hreflangLinks("/platform"),
    ],
  }),
  component: Platform,
});

const steps = [
  { icon: Plug, n: "01", title: "cloud.s1.title", desc: "cloud.s1.desc" },
  { icon: Code2, n: "02", title: "cloud.s2.title", desc: "cloud.s2.desc" },
  { icon: Sparkles, n: "03", title: "cloud.s3.title", desc: "cloud.s3.desc" },
] as const;

const trust = [
  { icon: Lock, title: "cloud.t1.title", desc: "cloud.t1.desc" },
  { icon: ShieldCheck, title: "cloud.t2.title", desc: "cloud.t2.desc" },
  { icon: KeyRound, title: "cloud.t3.title", desc: "cloud.t3.desc" },
] as const;

const devTools = [
  { k: "tools.emv.t", d: "tools.emv.d" },
  { k: "tools.apdu.t", d: "tools.apdu.d" },
  { k: "tools.ndef.t", d: "tools.ndef.d" },
  { k: "tools.mifare.t", d: "tools.mifare.d" },
] as const;

function Platform() {
  const { tr } = useI18n();
  const { locale } = Route.useParams();
  const { showDownloads } = Route.useLoaderData();

  const primaryActions = (
    <>
      <Link
        to="/$locale/auth"
        params={{ locale }}
        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        {tr("cloud.getStarted")} <ArrowRight size={16} />
      </Link>
      <Link
        to="/$locale/contact"
        params={{ locale }}
        className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
      >
        {tr("hero.cta2")}
      </Link>
    </>
  );

  return (
    <>
      <PageHero
        eyebrow={tr("cloud.eyebrow")}
        title={tr("cloud.title")}
        subtitle={tr("cloud.sub")}
        actions={primaryActions}
      />

      <PageSection tone="muted" spacing="main">
        <SectionHeader eyebrow={tr("cloud.eyebrow")} title={tr("cloud.steps.title")} />
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="card-glow rounded-2xl border border-border bg-card-gradient p-7 min-h-[11rem]">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{s.n}</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{tr(s.title)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tr(s.desc)}</p>
              </div>
            );
          })}
        </div>
      </PageSection>

      <PageSection spacing="main">
        <SectionHeader eyebrow={tr("cloud.eyebrow")} title={tr("cloud.security.title")} />
        <div className="grid md:grid-cols-3 gap-5">
          {trust.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.title} className="rounded-2xl border border-border bg-card-gradient p-7 min-h-[11rem]">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-5">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{tr(it.title)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tr(it.desc)}</p>
              </div>
            );
          })}
        </div>
      </PageSection>

      {showDownloads && (
        <PageSection tone="muted" spacing="main">
          <SectionHeader eyebrow={tr("tools.eyebrow")} title={tr("plat.title")} sub={tr("plat.sub")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {devTools.map((tool) => (
              <Link
                key={tool.k}
                to="/$locale/downloads"
                params={{ locale }}
                className="card-glow rounded-xl border border-border bg-card-gradient p-5 min-h-[8.5rem] group"
              >
                <h3 className="font-display text-sm font-semibold group-hover:text-primary transition-colors">
                  {tr(tool.k)}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{tr(tool.d)}</p>
              </Link>
            ))}
          </div>
        </PageSection>
      )}

      <section className="section-tight">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-balance">{tr("cloud.cta.title")}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{tr("cloud.cta.sub")}</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">{primaryActions}</div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
