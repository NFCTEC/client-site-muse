import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/tools/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$locale/tools/$slug",
      params: { locale: DEFAULT_LOCALE, slug: params.slug },
      statusCode: 301,
    });
  },
});
