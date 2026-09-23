import { notFound } from "next/navigation";
import { Breadcrumb, PageHero } from "@/components/public/blocks";
import { Markdown } from "@/components/public/markdown";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { canPreview } from "@/server/guard";

export async function cmsMetadata(locale: string, key: string, path: string) {
  if (!isLocale(locale)) return {};
  const page = await getPage(locale, key, await canPreview("pages"));
  const labels = getDictionary(locale);
  const fallback = key === "about" ? labels.about : key === "privacy" ? labels.privacy : labels.terms;
  if (!page) return pageMetadata({ title: fallback, path: `/${locale}${path}` });
  return pageMetadata({
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.description,
    path: page.canonicalUrl || `/${locale}${path}`,
    image: page.ogImage,
    robots: page.status === "PUBLISHED" ? page.robots : "noindex,nofollow",
    languages: { en: `/en${path}`, zh: `/zh${path}` },
  });
}

export async function StaticPage({ locale, pageKey }: { locale: Locale; pageKey: string }) {
  const labels = getDictionary(locale);
  const page = await getPage(locale, pageKey, await canPreview("pages"));
  if (!page) notFound();
  const crumb = pageKey === "about" ? labels.about : pageKey === "privacy" ? labels.privacy : labels.terms;
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: crumb }]} />
      <PageHero eyebrow={labels.company} title={page.title} description={page.description} />
      <div className="public-shell py-14 md:py-20">
        <Markdown source={page.body} />
      </div>
    </>
  );
}
