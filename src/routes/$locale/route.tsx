import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/locale";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) {
      throw redirect({ to: "/$locale", params: { locale: DEFAULT_LOCALE } });
    }
    return { locale: params.locale as Locale };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  return <Outlet />;
}
