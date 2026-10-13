import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/inquiry")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale/inquiry", params: { locale: DEFAULT_LOCALE } });
  },
});
