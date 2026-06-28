import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/products/nfc-field-detector")({
  beforeLoad: () => {
    throw redirect({
      to: "/$locale/products/nfc-field-detector",
      params: { locale: DEFAULT_LOCALE },
    });
  },
});
