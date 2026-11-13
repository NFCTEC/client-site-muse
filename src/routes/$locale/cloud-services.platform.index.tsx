import { createFileRoute } from "@tanstack/react-router";
import { PlatformHome } from "@/components/platform/PlatformHome";
import { loadPlatformPage, platformHead } from "@/lib/platform-route";
import type { Locale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/cloud-services/platform/")({
  loader: ({ params }) => loadPlatformPage(params.locale),
  head: ({ params }) => platformHead(params.locale as Locale, "home"),
  component: PlatformHome,
});
