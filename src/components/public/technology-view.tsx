import { Breadcrumb, CtaBand, LinkGrid, PageHero, TermList } from "@/components/public/blocks";
import { ArchitectureDiagram } from "@/components/public/architecture-diagram";
import { JsonLd } from "@/components/public/json-ld";
import { TrackView } from "@/components/public/track";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import type { getTechnology } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

type Technology = NonNullable<Awaited<ReturnType<typeof getTechnology>>>;

export function TechnologyView({ locale, item, labels }: { locale: Locale; item: Technology; labels: Dictionary }) {
  const crumbs = [
    { label: labels.home, href: "/" },
    { label: labels.technology, href: "/technology" },
    ...(item.parentSlug && item.parentName ? [{ label: item.parentName, href: `/technology/${item.parentSlug}` }] : []),
    { label: item.name },
  ];
  const path = item.parentSlug ? `/${locale}/technology/${item.parentSlug}/${item.slug}` : `/${locale}/technology/${item.slug}`;
  return (
    <>
      <TrackView name="technology_view" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: absoluteUrl(crumb.href ? `/${locale}${crumb.href === "/" ? "" : crumb.href}` : path),
          })),
        }}
      />
      <Breadcrumb locale={locale} items={crumbs} />
      <PageHero eyebrow={labels.technology} title={item.name} description={item.description} />
      <article className="public-shell py-14 md:py-20">
        <ArchitectureDiagram
          title={locale === "zh" ? "技术层与集成关系" : "Technology layers and integration"}
          nodes={[
            { label: item.name, detail: item.capabilities.slice(0, 3).join(" · ") },
            { label: labels.protocols, detail: item.protocols.slice(0, 3).join(" · ") },
            { label: labels.chips, detail: item.chips.slice(0, 3).join(" · ") },
            { label: labels.integration, detail: item.products.slice(0, 2).map((product) => product.title).join(" · ") },
          ]}
        />
        <TermList title={labels.features} items={item.capabilities} />
        <TermList title={labels.protocols} items={item.protocols} />
        <TermList title={labels.chips} items={item.chips} />
        {item.documentationUrl ? (
          <p className="mt-8">
            <a className="text-accent" href={item.documentationUrl}>{labels.documentation}</a>
          </p>
        ) : null}
        <LinkGrid locale={locale} title={labels.technology} items={item.children} />
        <LinkGrid locale={locale} title={labels.relatedProducts} items={item.products} />
        <LinkGrid locale={locale} title={labels.relatedSolutions} items={item.solutions} />
        <LinkGrid locale={locale} title={labels.relatedTools} items={item.tools} />
        <LinkGrid locale={locale} title={labels.relatedArticles} items={item.articles} />
      </article>
      <CtaBand locale={locale} title={labels.ctaTitle} body={labels.ctaBody} label={labels.talk} />
    </>
  );
}
