import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/products/")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/products", params: { locale: DEFAULT_LOCALE } });
  },
});
