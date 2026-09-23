import { NextRequest } from "next/server";
import { isLocale, type Locale } from "@/i18n/config";

export function readLocale(req: NextRequest): Locale | null {
  const locale = req.nextUrl.searchParams.get("locale") || "en";
  return isLocale(locale) ? locale : null;
}
