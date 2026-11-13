import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/lib/locale";

export const Route = createFileRoute("/cloud-services/platform")({
  beforeLoad: () => {
    throw redirect({
      to: "/$locale/cloud-services/platform",
      params: { locale: DEFAULT_LOCALE },
    });
  },
});
