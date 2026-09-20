import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { getToolPage, getToolPages } from "@/lib/tools";
import { hreflangLinks } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { CtaBand } from "@/components/CtaBand";

export const Route = createFileRoute("/$locale/tools/$slug")({
  loader: ({ params }) => {
    const locale = params.locale as Locale;
    const tool = getToolPage(locale, params.slug);
    if (!tool) throw notFound();
    return { tool, related: getToolPages(locale).filter((item) => item.slug !== tool.slug) };
  },
  head: ({ loaderData, params }) => {
    const locale = params.locale as Locale;
    const tool = loaderData?.tool;
    const url = absLocaleUrl(locale, `/tools/${params.slug}`);
    const title = tool ? `${tool.name} — NFCTEC` : "NFCTEC Tool";
    const desc = tool?.description ?? "NFCTEC engineering tool for NFC and smart card projects.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        ...(tool?.keywords ? [{ name: "keywords", content: tool.keywords.join(", ") }] : []),
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: url },
        ...hreflangLinks(`/tools/${params.slug}`),
      ],
      scripts: tool
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: tool.name,
                description: tool.description,
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Windows",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                publisher: { "@type": "Organization", name: "NFCTEC", url: "https://www.nfctec.com" },
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: tool.faqs.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              }),
            },
          ]
        : [],
    };
  },
  component: ToolPage,
});

function ToolPage() {
  const { tool, related } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const isZh = locale === "zh";

  return (
    <>
      <section className="pt-6 pb-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link to="/$locale/platform" params={{ locale }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} /> {isZh ? "返回平台" : "Back to platform"}
          </Link>
        </div>
      </section>

      <PageHero
        eyebrow={tool.category}
        title={tool.title}
        subtitle={tool.description}
        actions={
          <>
            <Link to="/$locale/downloads" params={{ locale }} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity">
              {isZh ? "去下载中心" : "Open Download Center"} <ArrowRight size={16} />
            </Link>
            <Link to="/$locale/contact" params={{ locale }} className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
              {isZh ? "咨询集成" : "Ask for integration"}
            </Link>
          </>
        }
      />

      <PageSection spacing="main" className="!pt-0">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-10">
          <div className="space-y-10">
            {tool.sections.map((section) => (
              <section key={section.heading} className="rounded-2xl border border-border bg-card-gradient p-7">
                <h2 className="font-display text-2xl mb-3">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.text}</p>
              </section>
            ))}
          </div>
          <aside className="rounded-2xl border border-primary/30 bg-card-gradient p-7 h-fit">
            <h2 className="font-display text-xl mb-4">{isZh ? "核心能力" : "Key capabilities"}</h2>
            <ul className="space-y-3">
              {tool.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground leading-relaxed">{tool.downloadHint}</p>
          </aside>
        </div>
      </PageSection>

      <PageSection tone="muted" spacing="main">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl mb-8">FAQ</h2>
          <div className="space-y-4">
            {tool.faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-border bg-card-gradient p-6">
                <h3 className="font-display text-lg mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {related.length > 0 && (
        <PageSection spacing="main">
          <h2 className="font-display text-2xl mb-6">{isZh ? "其他工具" : "Other tools"}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {related.map((item) => (
              <Link key={item.slug} to="/$locale/tools/$slug" params={{ locale, slug: item.slug }} className="card-glow rounded-2xl border border-border bg-card-gradient p-6 group">
                <div className="text-xs font-mono text-primary mb-2">{item.category}</div>
                <h3 className="font-display text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </Link>
            ))}
          </div>
        </PageSection>
      )}

      <CtaBand />
    </>
  );
}
