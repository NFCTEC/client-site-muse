import { notFound } from "next/navigation";
import { StaticPage, cmsMetadata } from "@/components/public/static-page";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return cmsMetadata(locale, "privacy", "/privacy");
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <StaticPage locale={locale} pageKey="privacy" />;
}
