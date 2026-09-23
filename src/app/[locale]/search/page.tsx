import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, PageHero } from "@/components/public/blocks";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizeHref } from "@/i18n/config";
import { searchPublic } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const typeLabel = {
  product: "typeProduct",
  solution: "typeSolution",
  technology: "typeTechnology",
  tool: "typeTool",
  article: "typeArticle",
  download: "typeDownload",
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ title: getDictionary(locale).search, path: `/${locale}/search`, robots: "noindex,follow" });
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  const q = (await searchParams).q || "";
  const results = q ? await searchPublic(locale, q) : [];
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.search }]} />
      <PageHero eyebrow={labels.search} title={labels.searchLabel} />
      <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <form className="flex gap-2">
          <label className="sr-only" htmlFor="q">{labels.search}</label>
          <input id="q" name="q" defaultValue={q} placeholder={labels.searchPlaceholder} className="field h-12 flex-1" />
          <button className="btn btn-primary" type="submit">{labels.search}</button>
        </form>
        <ul className="mt-10 grid">
          {results.map((item) => (
            <li key={`${item.type}-${item.href}`} className="list-card">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{labels[typeLabel[item.type]]}</p>
              <Link href={localizeHref(item.href, locale)} className="mt-2 block text-xl font-semibold">{item.title}</Link>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
        {q && !results.length ? <p className="mt-6 text-muted">{labels.noResults}</p> : null}
      </div>
    </>
  );
}
