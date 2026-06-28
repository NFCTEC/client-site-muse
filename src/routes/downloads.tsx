import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/downloads")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/downloads", params: { locale: DEFAULT_LOCALE } });
  },
});
