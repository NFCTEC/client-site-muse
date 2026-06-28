import { SITE_URL } from "./seo";

export type Locale = "en" | "zh";
export const LOCALES: Locale[] = ["en", "zh"];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(v: string): v is Locale {
  return v === "en" || v === "zh";
}

/** Build a locale-prefixed site path, e.g. localePath('en', '/blog') → '/en/blog' */
export function localePath(locale: Locale, path = "/"): string {
  if (path === "/" || path === "") return `/${locale}`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function absLocaleUrl(locale: Locale, path = "/"): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

export function stripLocalePrefix(pathname: string): { locale: Locale | null; rest: string } {
  const m = pathname.match(/^\/(en|zh)(\/.*)?$/);
  if (!m) return { locale: null, rest: pathname };
  const locale = m[1] as Locale;
  const rest = m[2] ?? "/";
  return { locale, rest };
}

export function swapLocalePath(pathname: string, next: Locale): string {
  const { rest } = stripLocalePrefix(pathname);
  return localePath(next, rest);
}
