import { createFileRoute, notFound } from "@tanstack/react-router";
import { fetchDisplayConfig, fetchProduct } from "@/lib/cms";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  jsonLdScript,
  productFaqJsonLd,
  productJsonLd,
  resolveProductImage,
  socialMeta,
} from "@/lib/product-seo";
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
    const image = product ? resolveProductImage(product) : undefined;
    const offerUrl =
      product?.ctaUrl && /^https?:\/\//.test(product.ctaUrl)
        ? product.ctaUrl
        : absLocaleUrl(locale, "/contact");
    const faq = product ? productFaqJsonLd(product.slug, locale) : null;
    return {
      meta: socialMeta({
        title,
        description: desc,
        url,
        locale,
        type: "product",
        image,
      }),
      links: [{ rel: "canonical", href: url }, ...hreflangLinks(`/products/${params.slug}`)],
      scripts: product
        ? [
            jsonLdScript(productJsonLd(product, locale, url, image, offerUrl)),
            jsonLdScript(
              breadcrumbJsonLd(locale, [
                { name: locale === "zh" ? "产品" : "Products", path: "/products" },
                { name: product.name, path: `/products/${product.slug}` },
              ]),
            ),
            ...(faq ? [jsonLdScript(faq)] : []),
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
