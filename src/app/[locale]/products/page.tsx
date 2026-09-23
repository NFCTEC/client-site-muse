import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, PageHero } from "@/components/public/blocks";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizeHref } from "@/i18n/config";
import { listProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const labels = getDictionary(locale);
  return pageMetadata({
    title: labels.products,
    description: locale === "zh" ? "软件、硬件与云，用于 NFC 和安全技术工程。" : "Software, hardware and cloud for NFC and secure technology engineering.",
    path: `/${locale}/products`,
    languages: { en: "/en/products", zh: "/zh/products" },
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  const products = await listProducts(locale);
  const groups = [
    { key: "software", title: labels.software },
    { key: "hardware", title: labels.hardware },
    { key: "cloud", title: labels.cloud },
  ];
  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.products }]} />
      <PageHero
        eyebrow={labels.products}
        title={locale === "zh" ? "为 NFC 与安全技术构建的产品" : "Products built for NFC and secure technology"}
        description={locale === "zh" ? "交付层分为软件、硬件和云。具体产品由后台发布。" : "Delivery is organized as software, hardware and cloud. Published products are managed in the CMS."}
      />
      <div className="public-shell py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {groups.map((group, index) => (
            <Link key={group.key} href={localizeHref(`/products/${group.key}`, locale)} className="panel group block p-6">
              <p className="font-mono text-[11px] text-accent">0{index + 1} / DELIVERY LAYER</p>
              <h2 className="mt-8 text-2xl font-semibold tracking-[-0.025em]">{group.title}<span className="float-right text-muted group-hover:text-accent">↗</span></h2>
            </Link>
          ))}
        </div>
        <div className="mt-16 grid gap-x-10 md:grid-cols-2">
          {products.map((product) => (
            <Link key={product.href} href={localizeHref(product.href, locale)} className="list-card min-h-48">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">{product.meta}</p>
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.025em]">{product.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{product.description}</p>
            </Link>
          ))}
          {!products.length ? <p className="text-muted">{labels.noResults}</p> : null}
        </div>
      </div>
    </>
  );
}
