import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, PageHero } from "@/components/public/blocks";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizeHref } from "@/i18n/config";
import { listSolutions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    title: getDictionary(locale).solutions,
    description: locale === "zh" ? "支付、身份、门禁、品牌保护、交通与物联网。" : "Payment, identity, access control, brand protection, transit and IoT.",
    path: `/${locale}/solutions`,
    languages: { en: "/en/solutions", zh: "/zh/solutions" },
  });
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  const solutions = await listSolutions(locale);
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.solutions }]} />
      <PageHero
        eyebrow={labels.solutions}
        title={locale === "zh" ? "要解决的工程问题" : "Engineering problems NFCTEC takes on"}
        description={locale === "zh" ? "方案说明客户问题与交付方式。技术页面说明协议和实现。" : "Solution pages describe the customer problem. Technology pages describe protocols and implementation."}
      />
      <div className="public-shell grid gap-x-10 py-14 md:grid-cols-2 md:py-20">
        {solutions.map((item, index) => (
          <Link key={item.href} href={localizeHref(item.href, locale)} className="list-card min-h-48">
            <p className="mb-6 font-mono text-[11px] text-accent">0{index + 1} / SOLUTION</p>
            <h2 className="text-2xl font-semibold tracking-[-0.025em]">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
