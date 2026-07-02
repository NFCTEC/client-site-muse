import { createFileRoute, notFound } from "@tanstack/react-router";
import { fetchDisplayConfig, fetchProduct } from "@/lib/cms";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { isModuleEnabled } from "@/lib/display-config";
import { ProductDetailPage } from "@/components/ProductDetailPage";

export const Route = createFileRoute("/$locale/products/$slug")({
  loader: async ({ params }) => {
    const locale = params.locale as Locale;
    const [config, product] = await Promise.all([
      fetchDisplayConfig(locale),
      fetchProduct(locale, params.slug),
    ]);
    if (!isModuleEnabled(config, "products")) throw notFound();
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    const product = loaderData?.product;
    const locale = params.locale as Locale;
    const url = absLocaleUrl(locale, `/products/${params.slug}`);
    const title = product?.seoTitle ?? (product ? `${product.name} — NFCTEC` : "Product — NFCTEC");
    const desc = product?.seoDescription ?? product?.description ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: product?.name ?? title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "product" },
        ...(product?.ogImage ? [{ property: "og:image", content: product.ogImage }] : []),
      ],
      links: [
        { rel: "canonical", href: url },
        ...hreflangLinks(`/products/${params.slug}`),
      ],
      scripts: product
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: product.name,
                description: desc,
                image: product.ogImage ?? product.images[0]?.src,
                brand: { "@type": "Brand", name: "NFCTEC" },
                manufacturer: { "@type": "Organization", name: "NFCTEC" },
              }),
            },
          ]
        : [],
    };
  },
  component: Page,
});

function Page() {
  const { product } = Route.useLoaderData();
  const { locale } = Route.useParams();
  return <ProductDetailPage product={product} locale={locale} />;
}
