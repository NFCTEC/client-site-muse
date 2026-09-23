import { notFound } from "next/navigation";
import { TechnologyView } from "@/components/public/technology-view";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getChildTechnology } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { canPreview } from "@/server/guard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string; topic: string }> }) {
  const { locale, slug, topic } = await params;
  if (!isLocale(locale)) return {};
  const item = await getChildTechnology(locale, slug, topic, await canPreview("technologies"));
  if (!item) return {};
  const path = `/${locale}/technology/${slug}/${item.slug}`;
  const other = locale === "en" ? "zh" : "en";
  return pageMetadata({
    title: item.seoTitle || item.name,
    description: item.seoDescription || item.description,
    path: item.canonicalUrl || path,
    image: item.ogImage,
    robots: item.status === "PUBLISHED" ? item.robots : "noindex,nofollow",
    languages: item.altSlug && item.parentSlug ? { [locale]: path, [other]: `/${other}/technology/${slug}/${item.altSlug}` } : undefined,
  });
}

export default async function TechnologyTopic({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string; topic: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { locale, slug, topic } = await params;
  if (!isLocale(locale)) notFound();
  const preview = (await searchParams).preview === "1" && (await canPreview("technologies"));
  const item = await getChildTechnology(locale, slug, topic, preview);
  if (!item) notFound();
  return <TechnologyView locale={locale} item={item} labels={getDictionary(locale)} />;
}
