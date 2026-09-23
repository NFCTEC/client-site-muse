import { notFound } from "next/navigation";
import { Breadcrumb, CtaBand, LinkGrid, PageHero } from "@/components/public/blocks";
import { ArchitectureDiagram } from "@/components/public/architecture-diagram";
import { JsonLd } from "@/components/public/json-ld";
import { TrackView } from "@/components/public/track";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getSolution } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { canPreview } from "@/server/guard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const preview = await canPreview("solutions");
  const item = await getSolution(locale, slug, preview);
  if (!item) return {};
  const path = `/${locale}/solutions/${item.slug}`;
  const other = locale === "en" ? "zh" : "en";
  return pageMetadata({
    title: item.seoTitle || item.heroTitle,
    description: item.seoDescription || item.heroDescription,
    path: item.canonicalUrl || path,
    image: item.ogImage || item.heroImage,
    robots: item.status === "PUBLISHED" ? item.robots : "noindex,nofollow",
    languages: item.altSlug ? { [locale]: path, [other]: `/${other}/solutions/${item.altSlug}` } : undefined,
  });
}

export default async function SolutionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  const preview = (await searchParams).preview === "1" && (await canPreview("solutions"));
  const item = await getSolution(locale, slug, preview);
  if (!item) notFound();
  const blocks = [
    [labels.problem, item.problem],
    [labels.solution, item.solutionText],
    [labels.architecture, item.architecture],
    [labels.security, item.security],
    [labels.deployment, item.deployment],
  ];
  return (
    <>
      <TrackView name="solution_view" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "NFCTEC", item: absoluteUrl(`/${locale}`) },
            { "@type": "ListItem", position: 2, name: labels.solutions, item: absoluteUrl(`/${locale}/solutions`) },
            { "@type": "ListItem", position: 3, name: item.name, item: absoluteUrl(`/${locale}/solutions/${item.slug}`) },
          ],
        }}
      />
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.solutions, href: "/solutions" }, { label: item.name }]} />
      <PageHero eyebrow={labels.solutions} title={item.heroTitle} description={item.heroDescription} />
      <article className="public-shell py-14 md:py-20">
        <ArchitectureDiagram
          title={locale === "zh" ? "方案工程流程" : "Solution engineering flow"}
          nodes={[
            { label: labels.problem, detail: item.problem },
            { label: labels.architecture, detail: item.architecture },
            { label: labels.security, detail: item.security },
            { label: labels.deployment, detail: item.deployment },
          ]}
        />
        <div className="grid gap-x-12 md:grid-cols-[180px_1fr]">
        {blocks.map(([title, body], index) =>
          body ? (
            <section key={title} className="col-span-full grid border-t border-line py-8 md:grid-cols-subgrid">
              <div>
                <p className="font-mono text-[11px] text-accent">0{index + 1}</p>
                <h2 className="mt-2 text-lg font-semibold">{title}</h2>
              </div>
              <p className="mt-4 max-w-3xl leading-8 text-[#34384e] md:mt-0">{body}</p>
            </section>
          ) : null,
        )}
        </div>
        {item.useCases.length ? (
          <section className="detail-section mt-10">
            <h2>{labels.useCases}</h2>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {item.useCases.map((useCase) => (
                <li key={useCase} className="border-t border-line py-3 text-sm leading-6 before:mr-2 before:text-accent before:content-['+']">{useCase}</li>
              ))}
            </ul>
          </section>
        ) : null}
        <LinkGrid locale={locale} title={labels.relatedTechnologies} items={item.technologies} />
        <LinkGrid locale={locale} title={labels.relatedProducts} items={item.products} />
        <LinkGrid locale={locale} title={labels.relatedArticles} items={item.articles} />
      </article>
      <CtaBand locale={locale} title={labels.ctaTitle} body={labels.ctaBody} label={labels.talk} />
    </>
  );
}
