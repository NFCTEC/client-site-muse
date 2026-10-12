import { notFound } from "next/navigation";
import { Breadcrumb, LinkGrid, PageHero } from "@/components/public/blocks";
import { JsonLd } from "@/components/public/json-ld";
import { Markdown } from "@/components/public/markdown";
import { TrackView } from "@/components/public/track";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getArticle } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { canPreview } from "@/server/guard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const article = await getArticle(locale, slug, await canPreview("blog"));
  if (!article) return {};
  const path = `/${locale}/blog/${article.slug}`;
  const other = locale === "en" ? "zh" : "en";
  return pageMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path: article.canonicalUrl || path,
    image: article.ogImage || article.coverImage,
    robots: article.status === "PUBLISHED" ? article.robots : "noindex,nofollow",
    languages: { [locale]: path, [other]: `/${other}/blog/${article.altSlug || article.slug}` },
  });
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  const preview = (await searchParams).preview === "1" && (await canPreview("blog"));
  const article = await getArticle(locale, slug, preview);
  if (!article) notFound();
  return (
    <>
      <TrackView name="article_view" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishDate?.toISOString(),
          dateModified: article.updatedAt.toISOString(),
          author: { "@type": "Person", name: article.author },
          image: article.coverImage || undefined,
        }}
      />
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.blog, href: "/blog" }, { label: article.title }]} />
      <PageHero eyebrow={article.category || labels.blog} title={article.title} description={article.excerpt} />
      <article className="public-shell py-14 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {labels.by} {article.author}
          {article.publishDate ? ` · ${article.publishDate.toISOString().slice(0, 10)}` : ""} · {article.readingTime} {labels.minutes}
        </p>
        {article.coverImage ? <img src={article.coverImage} alt={article.title} className="mt-8 max-h-[32rem] w-full rounded-[16px] border border-line object-cover shadow-sm" /> : null}
        <div className="mt-10">
          <Markdown source={article.content} />
        </div>
        <LinkGrid locale={locale} title={labels.relatedProducts} items={article.products} />
        <LinkGrid locale={locale} title={labels.relatedTechnologies} items={article.technologies} />
        <LinkGrid locale={locale} title={labels.relatedSolutions} items={article.solutions} />
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "NFCTEC", item: absoluteUrl(`/${locale}`) },
            { "@type": "ListItem", position: 2, name: labels.blog, item: absoluteUrl(`/${locale}/blog`) },
            { "@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(`/${locale}/blog/${article.slug}`) },
          ],
        }}
      />
    </>
  );
}
