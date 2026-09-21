import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchDisplayConfig, fetchSolution, fetchSolutions } from "@/lib/cms";
import { filterByDisplayConfig, isModuleEnabled } from "@/lib/display-config";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { useLocale } from "@/hooks/useLocale";
import { SolutionDetailPage } from "@/components/SolutionDetailPage";

export const Route = createFileRoute("/$locale/solutions/$slug")({
  loader: async ({ params }) => {
    const locale = params.locale as Locale;
    const config = await fetchDisplayConfig(locale);
    if (!isModuleEnabled(config, "solutions")) throw notFound();
    const solution = await fetchSolution(locale, params.slug);
    if (!solution) throw notFound();
    if (config.modules.solutions.mode === "selected") {
      const visible = filterByDisplayConfig(await fetchSolutions(locale), config.modules.solutions);
      if (!visible.some((s) => s.slug === params.slug)) throw notFound();
    }
    return { solution };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.solution;
    const locale = params.locale as Locale;
    const url = absLocaleUrl(locale, `/solutions/${params.slug}`);
    const title = s?.seoTitle || (s ? `${s.name} — NFCTEC Solutions` : "Solution — NFCTEC");
    const desc = s?.seoDescription || s?.tagline || "Industry NFC solution by NFCTEC.";
    const heroImg = s?.heroImage;
    const faqScript =
      s?.faqs && s.faqs.length > 0
        ? {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: s.faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }
        : null;
    const serviceScript = s
      ? {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.headline || s.name,
            description: desc,
            provider: { "@type": "Organization", name: "NFCTEC", url: "https://www.nfctec.com" },
            areaServed: "Worldwide",
            url,
          }),
        }
      : null;
    const crumbScript = s
      ? {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nfctec.com/${locale}` },
              { "@type": "ListItem", position: 2, name: "Solutions", item: `https://www.nfctec.com/${locale}/solutions` },
              { "@type": "ListItem", position: 3, name: s.headline || s.name, item: url },
            ],
          }),
        }
      : null;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(heroImg ? [{ property: "og:image", content: heroImg.startsWith("http") ? heroImg : `https://www.nfctec.com${heroImg}` }] : []),
      ],
      links: [
        { rel: "canonical", href: url },
        ...hreflangLinks(`/solutions/${params.slug}`),
      ],
      scripts: [faqScript, serviceScript, crumbScript].filter(
        (item): item is { type: string; children: string } => Boolean(item),
      ),
    };
  },
  notFoundComponent: function SolutionNotFound() {
    const locale = useLocale();
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Solution not found</h1>
        <Link to="/$locale/solutions" params={{ locale }} className="text-primary hover:underline">← Back to all solutions</Link>
      </div>
    );
  },
  component: () => {
    const { solution } = Route.useLoaderData();
    const { locale } = Route.useParams();
    return <SolutionDetailPage solution={solution} locale={locale} />;
  },
});
