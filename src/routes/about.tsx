import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/about")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/about", params: { locale: DEFAULT_LOCALE } });
  },
});
