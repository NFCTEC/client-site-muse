import { notFound } from "@tanstack/react-router";
import { fetchDisplayConfig } from "@/lib/cms";
import { isModuleEnabled } from "@/lib/display-config";
import type { Locale } from "@/lib/locale";

export async function loadPlatformPage(locale: string) {
  const config = await fetchDisplayConfig(locale as Locale);
  if (!isModuleEnabled(config, "platform")) throw notFound();
  return {};
}

export { platformHead } from "@/lib/platform-site";
