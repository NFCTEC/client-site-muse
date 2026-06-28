import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$locale/blog/$slug",
      params: { locale: DEFAULT_LOCALE, slug: params.slug },
    });
  },
});
