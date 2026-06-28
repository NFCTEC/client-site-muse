import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/contact")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/contact", params: { locale: DEFAULT_LOCALE } });
  },
});
