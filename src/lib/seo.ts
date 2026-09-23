import type { Metadata } from "next";
import { absoluteUrl } from "./utils";

export function pageMetadata(input: {
  title: string;
  description?: string | null;
  path: string;
  image?: string | null;
  robots?: string | null;
  languages?: Record<string, string>;
}): Metadata {
  const canonical = input.path.startsWith("http") ? input.path : absoluteUrl(input.path);
  const description = input.description || undefined;
  return {
    title: input.title,
    description,
    alternates: { canonical, languages: input.languages },
    robots: input.robots || "index,follow",
    openGraph: {
      title: input.title,
      description,
      url: canonical,
      images: input.image ? [{ url: input.image }] : undefined,
    },
  };
}
