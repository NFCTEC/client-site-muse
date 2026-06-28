import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/solutions/")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/solutions", params: { locale: DEFAULT_LOCALE } });
  },
});
