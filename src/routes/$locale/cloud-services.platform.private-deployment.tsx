import { createFileRoute } from "@tanstack/react-router";
import { PlatformPrivate } from "@/components/platform/PlatformSubpages";
import { loadPlatformPage, platformHead } from "@/lib/platform-route";
import type { Locale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/cloud-services/platform/private-deployment")({
  loader: ({ params }) => loadPlatformPage(params.locale),
  head: ({ params }) => platformHead(params.locale as Locale, "private"),
  component: PlatformPrivate,
});
