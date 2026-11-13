import { createFileRoute } from "@tanstack/react-router";
import { PlatformPricing } from "@/components/platform/PlatformPricing";
import { loadPlatformPage, platformHead } from "@/lib/platform-route";
import type { Locale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/cloud-services/platform/pricing")({
  loader: ({ params }) => loadPlatformPage(params.locale),
  head: ({ params }) => platformHead(params.locale as Locale, "pricing"),
  component: PlatformPricing,
});
