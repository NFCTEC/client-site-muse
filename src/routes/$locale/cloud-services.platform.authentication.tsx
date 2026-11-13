import { createFileRoute } from "@tanstack/react-router";
import { PlatformAuthentication } from "@/components/platform/PlatformSubpages";
import { loadPlatformPage, platformHead } from "@/lib/platform-route";
import type { Locale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/cloud-services/platform/authentication")({
  loader: ({ params }) => loadPlatformPage(params.locale),
  head: ({ params }) => platformHead(params.locale as Locale, "authentication"),
  component: PlatformAuthentication,
});
