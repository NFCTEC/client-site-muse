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
    const title = s ? `${s.name} — NFCTEC Solutions` : "Solution — NFCTEC";
    const desc = s?.tagline ?? "Industry NFC solution by NFCTEC.";
    const heroImg = s?.heroImage ?? `/solutions/${params.slug}.jpg`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: `https://www.nfctec.com${heroImg}` },
      ],
      links: [{ rel: "canonical", href: url }],
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
