import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, CtaBand, LinkGrid, PageHero, TermList } from "@/components/public/blocks";
import { JsonLd } from "@/components/public/json-ld";
import { Markdown } from "@/components/public/markdown";
import { TrackView } from "@/components/public/track";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizeHref } from "@/i18n/config";
import { getProduct, listProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { canPreview } from "@/server/guard";

const categories = {
  software: "SOFTWARE",
  hardware: "HARDWARE",
  cloud: "CLOUD",
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const labels = getDictionary(locale);
  if (slug in categories) {
    const title = labels[slug as keyof typeof categories];
    return pageMetadata({ title, description: title, path: `/${locale}/products/${slug}`, languages: { en: `/en/products/${slug}`, zh: `/zh/products/${slug}` } });
  }
  const preview = await canPreview("products");
  const product = await getProduct(locale, slug, preview);
  if (!product) return {};
  const path = `/${locale}/products/${product.slug}`;
  const other = locale === "en" ? "zh" : "en";
  return pageMetadata({
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.shortDescription,
    path: product.canonicalUrl || path,
    image: product.ogImage || product.heroImage,
    robots: product.status === "PUBLISHED" ? product.robots : "noindex,nofollow",
    languages: product.altSlug ? { [locale]: path, [other]: `/${other}/products/${product.altSlug}` } : { [locale]: path },
  });
}

export default async function ProductSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  if (slug in categories) {
    const category = categories[slug as keyof typeof categories];
    const products = await listProducts(locale, category);
    return (
      <>
        <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.products, href: "/products" }, { label: labels[slug as "software"] }]} />
        <PageHero eyebrow={labels.products} title={labels[slug as "software"]} />
        <div className="public-shell grid gap-x-10 py-14 md:grid-cols-2 md:py-20">
          {products.map((product) => (
            <Link key={product.href} href={localizeHref(product.href, locale)} className="list-card min-h-40">
              <h2 className="text-2xl font-semibold tracking-[-0.025em]">{product.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{product.description}</p>
            </Link>
          ))}
          {!products.length ? <p className="text-muted">{labels.noResults}</p> : null}
        </div>
      </>
    );
  }

  const preview = (await searchParams).preview === "1" && (await canPreview("products"));
  const product = await getProduct(locale, slug, preview);
  if (!product) notFound();
  const path = `/${locale}/products/${product.slug}`;
  return (
    <>
      <TrackView name="product_view" />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbLd(locale, product.name, path) }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.shortDescription, brand: { "@type": "Brand", name: "NFCTEC" } }} />
      <Breadcrumb locale={locale} items={[{ label: labels.home, href: "/" }, { label: labels.products, href: "/products" }, { label: product.name }]} />
      <PageHero eyebrow={labels[product.category === "SOFTWARE" ? "software" : product.category === "HARDWARE" ? "hardware" : "cloud"]} title={product.name} description={product.shortDescription} />
      <article className="public-shell py-14 md:py-20">
        {product.heroImage ? <img src={product.heroImage} alt={product.name} className="mb-10 max-h-[32rem] w-full rounded-[16px] border border-line object-cover shadow-sm" /> : null}
        <div className="max-w-3xl"><Markdown source={product.description} /></div>
        {product.features.length ? (
          <section className="detail-section mt-14">
            <h2>{labels.features}</h2>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="border-t border-line py-3 text-sm before:mr-2 before:text-accent before:content-['+']">{feature}</li>
              ))}
            </ul>
          </section>
        ) : null}
        {product.specifications.length ? (
          <section className="detail-section mt-14">
            <h2>{labels.specifications}</h2>
            <table className="mt-5 w-full overflow-hidden rounded-xl border border-line bg-white text-sm">
              <tbody>
                {product.specifications.map((spec) => (
                  <tr key={spec.label} className="border-t border-line">
                    <th className="w-1/3 px-4 py-3 text-left font-medium">{spec.label}</th>
                    <td className="px-4 py-3 text-muted">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}
        <TermList title={labels.protocols} items={product.protocols} />
        <TermList title={labels.chips} items={product.chips} />
        <TermList title={labels.platforms} items={product.platforms} />
        <section className="detail-section mt-14">
          <h2>{labels.integration}</h2>
          {product.documentationUrl ? (
            <a className="mt-3 inline-block text-accent" href={product.documentationUrl} onClick={undefined}>
              {labels.documentation}
            </a>
          ) : (
            <p className="mt-3 text-sm text-muted">{labels.documentation}</p>
          )}
        </section>
        {product.downloads.length ? (
          <section className="detail-section mt-14">
            <h2>{labels.downloads}</h2>
            <ul className="mt-4 grid gap-2">
              {product.downloads.map((item) => (
                <li key={item.slug}>
                  <Link href={localizeHref(item.href, locale)} className="text-accent">{item.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {product.gallery.length ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {product.gallery.map((src, index) => (
              <img key={src} src={src} alt={`${product.name} ${index + 1}`} className="w-full rounded-xl border border-line" loading="lazy" />
            ))}
          </div>
        ) : null}
        <LinkGrid locale={locale} title={labels.relatedTechnologies} items={product.technologies} />
        <LinkGrid locale={locale} title={labels.relatedSolutions} items={product.solutions} />
        <LinkGrid locale={locale} title={labels.relatedArticles} items={product.articles} />
      </article>
      <CtaBand locale={locale} title={labels.ctaTitle} body={labels.ctaBody} label={labels.talk} />
    </>
  );
}

function breadcrumbLd(locale: string, name: string, path: string) {
  return [
    { "@type": "ListItem", position: 1, name: "NFCTEC", item: absoluteUrl(`/${locale}`) },
    { "@type": "ListItem", position: 2, name: "Products", item: absoluteUrl(`/${locale}/products`) },
    { "@type": "ListItem", position: 3, name, item: absoluteUrl(path) },
  ];
}
