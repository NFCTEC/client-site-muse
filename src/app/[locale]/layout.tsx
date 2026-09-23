import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Footer } from "@/components/public/footer";
import { Header } from "@/components/public/header";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { getNav } from "@/lib/content";
import { maybeRedirect } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: { default: "NFCTEC", template: "%s · NFCTEC" },
    description: locale === "zh" ? "NFC 与安全技术工程" : "NFC & Secure Technology Engineering",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pathname = (await headers()).get("x-pathname") || "";
  await maybeRedirect(pathname);
  if (!isLocale(locale)) notFound();
  const labels = getDictionary(locale);
  const [header, footer] = await Promise.all([getNav(locale, "HEADER"), getNav(locale, "FOOTER")]);
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header locale={locale as Locale} items={header} labels={labels} />
      <main id="main-content">{children}</main>
      <Footer locale={locale as Locale} items={footer} labels={labels} />
    </div>
  );
}
