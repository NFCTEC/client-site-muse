import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/terms")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/terms", params: { locale: DEFAULT_LOCALE } });
  },
});
