import { notFound } from "next/navigation";
import { HomePage } from "@/components/public/home-page";
import { JsonLd } from "@/components/public/json-ld";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { getHome } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "zh" ? "NFC 与安全技术工程" : "NFC & Secure Technology Engineering";
  const description =
    locale === "zh"
      ? "面向安全互联产品的硬件、智能卡、FIDO、数字身份、SDK、安全与云。"
      : "Hardware, smart cards, FIDO, digital identity, SDKs, security and cloud for secure connected products.";
  return pageMetadata({
    title,
    description,
    path: `/${locale}`,
    languages: { en: "/en", zh: "/zh" },
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [data, labels] = await Promise.all([getHome(locale), Promise.resolve(getDictionary(locale))]);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NFCTEC",
          url: siteUrl(),
          description: "NFC & Secure Technology Engineering",
        }}
      />
      <HomePage locale={locale} data={data} labels={labels} />
    </>
  );
}
