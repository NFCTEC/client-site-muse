import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, PageHero } from "@/components/public/blocks";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizeHref } from "@/i18n/config";
import { listArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    title: getDictionary(locale).blog,
    description: locale === "zh" ? "NFC、智能卡、FIDO2、安全标签与硬件钱包的工程笔记。" : "Engineering notes on NFC, smart cards, FIDO2, secure tags and hardware wallets.",
    path: `/${locale}/blog`,
    languages: { en: "/en/blog", zh: "/zh/blog" },
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  const articles = await listArticles(locale);
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.blog }]} />
      <PageHero
        eyebrow={labels.blog}
        title={locale === "zh" ? "工程笔记" : "Engineering notes"}
        description={
          articles.length
            ? locale === "zh"
              ? "协议、读卡器、卡片、身份和钱包相关的已发布说明。"
              : "Published notes on protocols, readers, cards, identity and wallets."
            : labels.emptyBlog
        }
      />
      <div className="public-shell grid gap-x-10 py-14 md:grid-cols-2 md:py-20">
        {articles.map((article) => (
          <Link key={article.href} href={localizeHref(article.href, locale)} className="list-card min-h-52">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{article.category}</p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.025em]">{article.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{article.description}</p>
            <p className="mt-5 font-mono text-[11px] text-muted">{article.readingTime} {labels.minutes}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
