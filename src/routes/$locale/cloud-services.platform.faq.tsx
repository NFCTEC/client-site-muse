import { createFileRoute } from "@tanstack/react-router";
import { PlatformFaq } from "@/components/platform/PlatformSubpages";
import { loadPlatformPage, platformHead } from "@/lib/platform-route";
import type { Locale } from "@/lib/locale";

export const Route = createFileRoute("/$locale/cloud-services/platform/faq")({
  loader: ({ params }) => loadPlatformPage(params.locale),
  head: ({ params }) => platformHead(params.locale as Locale, "faq"),
  component: PlatformFaq,
});
