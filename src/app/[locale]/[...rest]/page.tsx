import { notFound } from "next/navigation";
import { maybeRedirect } from "@/lib/utils";

export default async function LegacyPath({ params }: { params: Promise<{ locale: string; rest: string[] }> }) {
  const { locale, rest } = await params;
  await maybeRedirect(`/${locale}/${rest.join("/")}`);
  notFound();
}
