import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, PageHero } from "@/components/public/blocks";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizeHref } from "@/i18n/config";
import { listRootTechnologies } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    title: getDictionary(locale).technology,
    description: locale === "zh" ? "NFC 与射频、智能卡、安全与身份。" : "NFC & RF, smart cards, and security & identity.",
    path: `/${locale}/technology`,
    languages: { en: "/en/technology", zh: "/zh/technology" },
  });
}

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  const items = await listRootTechnologies(locale);
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.technology }]} />
      <PageHero
        eyebrow={labels.technology}
        title={locale === "zh" ? "三项核心技术" : "Three core technologies"}
        description={locale === "zh" ? "NFCTEC 的工程基础是 NFC 与射频、智能卡，以及安全与身份。密码学属于安全与身份，不是独立的顶级栏目。" : "NFCTEC is built on NFC & RF, smart cards, and security & identity. Cryptography sits inside security & identity."}
      />
      <div className="public-shell grid gap-px py-14 md:py-20">
        {items.map((item, index) => (
          <section key={item.href} className="group grid gap-6 border-t border-line py-8 md:grid-cols-[100px_1fr] md:py-12">
            <p className="font-mono text-xs text-accent">0{index + 1}<span className="ml-2 text-muted">/ CORE</span></p>
            <div>
            <Link href={localizeHref(item.href, locale)} className="text-3xl font-semibold tracking-[-0.035em] hover:text-accent md:text-4xl">{item.title} <span className="text-muted group-hover:text-accent">↗</span></Link>
            <p className="mt-3 max-w-3xl leading-7 text-muted">{item.description}</p>
            {item.children.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={localizeHref(child.href, locale)} className="tech-label hover:border-accent hover:text-accent">{child.title}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
