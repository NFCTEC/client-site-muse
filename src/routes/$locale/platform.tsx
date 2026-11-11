import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Plug, Code2, Sparkles, ShieldCheck, KeyRound, Lock, ArrowRight } from "lucide-react";
import { useI18n, t as dict, type Lang } from "@/lib/i18n";
import { fetchDisplayConfig } from "@/lib/cms";
import { isModuleEnabled } from "@/lib/display-config";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { PageSection } from "@/components/PageSection";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { FaqSection, faqJsonLd, type FaqItem } from "@/components/FaqSection";

const PLATFORM_FAQ_KEYS = ["p1", "p2", "p3", "p4", "p5"] as const;
function buildFaq(lang: Lang): FaqItem[] {
  return PLATFORM_FAQ_KEYS.map((k) => ({
    q: dict[`faq.${k}.q`][lang],
    a: dict[`faq.${k}.a`][lang],
  }));
}

export const Route = createFileRoute("/$locale/platform")({
  loader: async ({ params }) => {
    const config = await fetchDisplayConfig(params.locale as Locale);
    if (!isModuleEnabled(config, "platform")) throw notFound();
    return { showDownloads: config.modules.downloads.enabled };
  },
  head: ({ params }) => {
    const locale = params.locale as Locale;
    const url = absLocaleUrl(locale, "/platform");
    const lang: Lang = locale === "zh" ? "zh" : "en";
    return {
      meta: [
        { title: lang === "zh" ? "NTAG424 DNA 发行与校验 — NFCTEC" : "NTAG424 DNA Issuance & Verification — NFCTEC" },
        { name: "description", content: lang === "zh"
          ? "真标签，轻触即可验证。酒类、医药、奢侈品、电子。工厂发行，轻触校验，密钥留在服务器。"
          : "Authentic tags, verified with a tap. Spirits, pharma, luxury, electronics. Issue in the factory, verify with a tap. Keys stay on the server." },
        { property: "og:title", content: lang === "zh" ? "NTAG424 DNA 发行与校验" : "NTAG424 DNA Issuance & Verification" },
        { property: "og:description", content: lang === "zh"
          ? "工厂发行，轻触校验。密钥留在服务器。"
          : "Issue in the factory, verify with a tap. Keys stay on the server." },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: url },
        ...hreflangLinks("/platform"),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLd(buildFaq(lang))),
        },
      ],
    };
  },
  component: Platform,
});

const steps = [
  { icon: Plug, n: "01", title: "cloud.s1.title", desc: "cloud.s1.desc" },
  { icon: Code2, n: "02", title: "cloud.s2.title", desc: "cloud.s2.desc" },
  { icon: Sparkles, n: "03", title: "cloud.s3.title", desc: "cloud.s3.desc" },
] as const;

const issuance = [
  { n: "01", title: "ntag.issue.s1.title", desc: "ntag.issue.s1.desc" },
  { n: "02", title: "ntag.issue.s2.title", desc: "ntag.issue.s2.desc" },
  { n: "03", title: "ntag.issue.s3.title", desc: "ntag.issue.s3.desc" },
] as const;

const PLATFORM_URL = "https://platform.nfctec.com/";

const trust = [
  { icon: Lock, title: "cloud.t1.title", desc: "cloud.t1.desc" },
  { icon: ShieldCheck, title: "cloud.t2.title", desc: "cloud.t2.desc" },
  { icon: KeyRound, title: "cloud.t3.title", desc: "cloud.t3.desc" },
] as const;

const devTools = [
  { k: "tools.ntag.t", d: "tools.ntag.d", slug: "ntag424-tool" },
  { k: "tools.javacard.t", d: "tools.javacard.d", slug: "javacard-tool" },
] as const;

function Platform() {
  const { tr, lang } = useI18n();
  const { locale } = Route.useParams();
  const { showDownloads } = Route.useLoaderData();
  const faqItems = buildFaq(lang);

  const platformLink = (
    <a
      href={PLATFORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
    >
      {tr("ntag.issue.cta")} <ArrowRight size={16} />
    </a>
  );

  const engineerLink = (
    <Link
      to="/$locale/inquiry"
      params={{ locale }}
      className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
    >
      {tr("hero.cta2")}
    </Link>
  );

  return (
    <>
      <section className="relative page-hero overflow-hidden" id="ntag424-issuance">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="section-label">{tr("ntag.issue.eyebrow")}</p>
          <h1 className="section-hero-title font-display font-semibold whitespace-pre-line text-balance max-w-4xl mt-3">
            {tr("ntag.issue.title")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {tr("ntag.issue.sub")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {platformLink}
            {engineerLink}
          </div>
          <p className="mt-3 text-xs font-mono tracking-wide text-muted-foreground">{tr("ntag.issue.tagline")}</p>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {issuance.map((s) => (
              <div key={s.n} className="card-glow rounded-2xl border border-border bg-card-gradient p-7 min-h-[11rem]">
                <span className="text-xs font-mono text-muted-foreground">{s.n}</span>
                <h2 className="font-display text-lg font-semibold mt-4 mb-2">{tr(s.title)}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{tr(s.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageSection tone="muted" spacing="main">
        <div className="mb-10 max-w-3xl">
          <p className="section-label mb-3">{tr("cloud.eyebrow")}</p>
          <h2 className="font-display text-2xl lg:text-3xl tracking-tight whitespace-pre-line">{tr("cloud.title")}</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">{tr("cloud.sub")}</p>
        </div>
        <h2 className="font-display text-2xl tracking-tight mb-8">{tr("cloud.steps.title")}</h2>
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
          <div className="grid sm:grid-cols-2 gap-4">
            {devTools.map((tool) => (
              <Link
                key={tool.k}
                to="/$locale/tools/$slug"
                params={{ locale, slug: tool.slug }}
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

      <FaqSection eyebrow={tr("faq.eyebrow")} title={tr("faq.title")} items={faqItems} />

      <section className="section-tight">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-balance">{tr("cloud.cta.title")}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{tr("cloud.cta.sub")}</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {platformLink}
            {engineerLink}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
