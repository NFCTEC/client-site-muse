import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/platform")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/platform", params: { locale: DEFAULT_LOCALE } });
  },
});
