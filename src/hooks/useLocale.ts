import { useRouterState } from "@tanstack/react-router";
import { DEFAULT_LOCALE, stripLocalePrefix, type Locale } from "@/lib/locale";

export function useLocale(): Locale {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return stripLocalePrefix(pathname).locale ?? DEFAULT_LOCALE;
}
