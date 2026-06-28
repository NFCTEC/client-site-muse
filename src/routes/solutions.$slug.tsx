import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/solutions/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$locale/solutions/$slug",
      params: { locale: DEFAULT_LOCALE, slug: params.slug },
    });
  },
});
