import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await sitemapEntries();
  return entries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: entry.updatedAt || new Date(),
  }));
}
