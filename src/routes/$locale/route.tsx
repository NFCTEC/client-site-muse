import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { fetchDisplayConfig, fetchProducts, fetchSolutions } from "@/lib/cms";
import { filterByDisplayConfig } from "@/lib/display-config";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/locale";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) {
      throw redirect({ to: "/$locale", params: { locale: DEFAULT_LOCALE } });
    }
    return { locale: params.locale as Locale };
  },
  loader: async ({ params }) => {
    const locale = params.locale as Locale;
    const [displayConfig, solutions, products] = await Promise.all([
      fetchDisplayConfig(locale),
      fetchSolutions(locale),
      fetchProducts(locale),
    ]);
    return {
      displayConfig,
      navSolutions: filterByDisplayConfig(solutions, displayConfig.modules.solutions),
      navProducts: filterByDisplayConfig(products, displayConfig.modules.products),
    };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  return <Outlet />;
}
