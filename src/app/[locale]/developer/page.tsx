import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, PageHero } from "@/components/public/blocks";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizeHref } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

const sections = [
  { key: "sdk", label: "sdk" },
  { key: "tools", label: "tools" },
  { key: "api", label: "api" },
  { key: "documentation", label: "documentation" },
  { key: "downloads", label: "downloads" },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    title: getDictionary(locale).developer,
    description: locale === "zh" ? "SDK、工具、API、文档与下载。" : "SDKs, tools, APIs, documentation and downloads.",
    path: `/${locale}/developer`,
    languages: { en: "/en/developer", zh: "/zh/developer" },
  });
}

export default async function DeveloperPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.developer }]} />
      <PageHero
        eyebrow={labels.developer}
        title={locale === "zh" ? "工程师可以直接使用的资料" : "Resources an engineer can use directly"}
        description={locale === "zh" ? "这里集中 SDK、工具、API、文档和下载。示例代码和协议说明以已发布内容为准。" : "SDKs, tools, APIs, documentation and downloads live here. Code samples and protocol notes come from published records."}
      />
      <div className="public-shell grid gap-5 py-14 md:grid-cols-2 md:py-20">
        {sections.map((section, index) => (
          <Link key={section.key} href={localizeHref(`/developer/${section.key}`, locale)} className={`panel group p-7 ${index === 0 ? "md:col-span-2" : ""}`}>
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] text-accent">DEV / 0{index + 1}</p>
              <span className="text-muted group-hover:text-accent">↗</span>
            </div>
            <h2 className="mt-10 text-2xl font-semibold tracking-[-0.025em]">{labels[section.label]}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}
