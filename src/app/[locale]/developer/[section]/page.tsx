import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolKind } from "@prisma/client";
import { Breadcrumb, PageHero } from "@/components/public/blocks";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizeHref } from "@/i18n/config";
import { listDownloads, listTools } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { formatBytes } from "@/lib/utils";

const kinds = {
  sdk: ToolKind.SDK,
  tools: ToolKind.TOOL,
  api: ToolKind.API,
  documentation: ToolKind.DOCUMENTATION,
} as const;

const titles = {
  en: { sdk: "SDK", tools: "Tools", api: "API", documentation: "Documentation", downloads: "Downloads" },
  zh: { sdk: "SDK", tools: "工具", api: "API", documentation: "文档", downloads: "下载" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string }> }) {
  const { locale, section } = await params;
  if (!isLocale(locale) || !(section in titles.en)) return {};
  const title = titles[locale][section as keyof typeof titles.en];
  return pageMetadata({ title, description: title, path: `/${locale}/developer/${section}`, languages: { en: `/en/developer/${section}`, zh: `/zh/developer/${section}` } });
}

export default async function DeveloperSection({ params }: { params: Promise<{ locale: string; section: string }> }) {
  const { locale, section } = await params;
  if (!isLocale(locale) || !(section in titles.en)) notFound();
  const labels = getDictionary(locale);
  const title = titles[locale][section as keyof typeof titles.en];
  if (section === "downloads") {
    const downloads = await listDownloads(locale);
    return (
      <>
        <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.developer, href: "/developer" }, { label: title }]} />
        <PageHero eyebrow={labels.developer} title={title} />
        <div className="public-shell py-14 md:py-20">
          {!downloads.length ? <p className="text-muted">{labels.emptyDownloads}</p> : null}
          <ul className="grid gap-x-10 md:grid-cols-2">
            {downloads.map((item) => (
              <li key={item.slug} className="list-card">
                <Link href={localizeHref(item.href, locale)} className="text-xl font-semibold">{item.title}</Link>
                <p className="mt-1 text-sm text-muted">{[item.version, item.platform, item.fileSize ? formatBytes(item.fileSize) : ""].filter(Boolean).join(" · ")}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
  const tools = await listTools(locale, kinds[section as keyof typeof kinds]);
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.developer, href: "/developer" }, { label: title }]} />
      <PageHero eyebrow={labels.developer} title={title} />
      <div className="public-shell grid gap-x-10 py-14 md:grid-cols-2 md:py-20">
        {tools.map((tool) => (
          <Link key={tool.href} href={localizeHref(tool.href, locale)} className="list-card min-h-44">
            <p className="font-mono text-[11px] text-accent">{tool.meta}</p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.025em]">{tool.title}</h2>
            <p className="mt-2 max-w-3xl text-muted">{tool.description}</p>
          </Link>
        ))}
        {!tools.length ? <p className="text-muted">{labels.noResults}</p> : null}
      </div>
    </>
  );
}
