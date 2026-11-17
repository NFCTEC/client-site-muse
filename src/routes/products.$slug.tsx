import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/products/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$locale/products/$slug",
      params: { locale: DEFAULT_LOCALE, slug: params.slug },
      statusCode: 301,
    });
  },
});
