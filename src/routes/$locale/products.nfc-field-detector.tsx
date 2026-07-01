import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/products/nfc-field-detector")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$locale/products/$slug",
      params: { locale: params.locale, slug: "nfc-field-detector" },
    });
  },
});
