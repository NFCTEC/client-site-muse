import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/blog")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/blog", params: { locale: DEFAULT_LOCALE } });
  },
});
