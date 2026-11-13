import { createFileRoute } from "@tanstack/react-router";
import { PlatformEnterprise } from "@/components/platform/PlatformSubpages";
import { loadPlatformPage, platformHead } from "@/lib/platform-route";
import type { Locale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/cloud-services/platform/enterprise")({
  loader: ({ params }) => loadPlatformPage(params.locale),
  head: ({ params }) => platformHead(params.locale as Locale, "enterprise"),
  component: PlatformEnterprise,
});
