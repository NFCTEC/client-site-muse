import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolKind } from "@prisma/client";
import { Breadcrumb, LinkGrid, PageHero, TermList } from "@/components/public/blocks";
import { Markdown } from "@/components/public/markdown";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizeHref } from "@/i18n/config";
import { getDownload, getTool } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { formatBytes } from "@/lib/utils";
import { canPreview } from "@/server/guard";

const kinds = {
  sdk: ToolKind.SDK,
  tools: ToolKind.TOOL,
  api: ToolKind.API,
  documentation: ToolKind.DOCUMENTATION,
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string; slug: string }> }) {
  const { locale, section, slug } = await params;
  if (!isLocale(locale)) return {};
  if (section === "downloads") {
    const item = await getDownload(locale, slug, await canPreview("downloads"));
    if (!item) return {};
    return pageMetadata({ title: item.name, description: item.releaseNotes, path: `/${locale}/developer/downloads/${item.slug}`, robots: item.status === "PUBLISHED" ? "index,follow" : "noindex,nofollow" });
  }
  if (!(section in kinds)) return {};
  const item = await getTool(locale, kinds[section as keyof typeof kinds], slug, await canPreview("developer"));
  if (!item) return {};
  return pageMetadata({
    title: item.seoTitle || item.name,
    description: item.seoDescription || item.description,
    path: item.canonicalUrl || `/${locale}/developer/${section}/${item.slug}`,
    image: item.ogImage,
    robots: item.status === "PUBLISHED" ? item.robots : "noindex,nofollow",
  });
}

export default async function DeveloperDetail({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { locale, section, slug } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  const query = await searchParams;
  if (section === "downloads") {
    const preview = query.preview === "1" && (await canPreview("downloads"));
    const item = await getDownload(locale, slug, preview);
    if (!item) notFound();
    return (
      <>
        <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.developer, href: "/developer" }, { label: labels.downloads, href: "/developer/downloads" }, { label: item.name }]} />
        <PageHero eyebrow={labels.downloads} title={item.name} description={item.version} />
        <article className="public-shell py-14 md:py-20">
          <Markdown source={item.releaseNotes || ""} />
          <dl className="panel mt-8 grid max-w-2xl gap-px overflow-hidden bg-line text-sm sm:grid-cols-3">
            <div className="bg-white p-4"><dt className="text-muted">{labels.category}</dt><dd className="mt-1 font-medium">{item.category}</dd></div>
            <div className="bg-white p-4"><dt className="text-muted">{labels.platform}</dt><dd className="mt-1 font-medium">{item.platform || "—"}</dd></div>
            <div className="bg-white p-4"><dt className="text-muted">{labels.fileSize}</dt><dd className="mt-1 font-medium">{formatBytes(item.fileSize)}</dd></div>
            {item.checksum ? <div className="bg-white p-4 sm:col-span-3"><dt className="text-muted">{labels.checksum}</dt><dd className="mt-1 break-all font-mono text-xs">{item.checksum}</dd></div> : null}
          </dl>
          {item.hasFile ? (
            <a className="btn btn-primary mt-6" href={`/api/downloads/${item.id}/file`}>{labels.downloads}</a>
          ) : null}
          {item.documentationUrl ? <a className="mt-4 block text-accent" href={item.documentationUrl}>{labels.documentation}</a> : null}
          {item.product ? <Link className="mt-4 block" href={localizeHref(item.product.href, locale)}>{item.product.title}</Link> : null}
        </article>
      </>
    );
  }
  if (!(section in kinds)) notFound();
  const preview = query.preview === "1" && (await canPreview("developer"));
  const item = await getTool(locale, kinds[section as keyof typeof kinds], slug, preview);
  if (!item) notFound();
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.developer, href: "/developer" }, { label: section.toUpperCase(), href: `/developer/${section}` }, { label: item.name }]} />
      <PageHero eyebrow={labels.developer} title={item.name} description={item.description} />
      <article className="public-shell py-14 md:py-20">
        <p className="text-sm text-muted">{[labels.version, item.version || "—"].join(": ")}</p>
        <TermList title={labels.platforms} items={item.platforms} />
        <TermList title={labels.features} items={item.features} />
        <div className="mt-8 flex flex-wrap gap-4">
          {item.downloadUrl ? <a className="btn btn-primary" href={item.downloadUrl}>{labels.downloads}</a> : null}
          {item.documentationUrl ? <a className="btn btn-line" href={item.documentationUrl}>{labels.documentation}</a> : null}
        </div>
        {section === "sdk" ? (
          <pre className="mt-8 overflow-auto rounded-xl bg-ink p-5 font-mono text-sm text-[#f4f2ec]">
            <code>{`00 A4 04 00 00\n; ${labels.illustrative}`}</code>
          </pre>
        ) : null}
        <LinkGrid locale={locale} title={labels.relatedProducts} items={item.products} />
        <LinkGrid locale={locale} title={labels.relatedTechnologies} items={item.technologies} />
      </article>
    </>
  );
}
