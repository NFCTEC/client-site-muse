import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/auth", params: { locale: DEFAULT_LOCALE } });
  },
});
