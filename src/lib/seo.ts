// Central SEO config. Update SITE_URL when you switch the production domain.
export const SITE_URL = "https://www.nfctec.com";
export const SITE_NAME = "NFCTEC";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export const absUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Paths that must never be indexed or listed in the sitemap. */
export function isNoIndexPath(pathname: string) {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/auth" || p.endsWith("/auth")) return true;
  if (p === "/dashboard" || p.endsWith("/dashboard")) return true;
  // SZLEJUN Amazon support — not the B2B contact page.
  if (p === "/contact" || p === "/en/contact" || p === "/zh/contact") return true;
  if (p === "/privacy" || p.endsWith("/privacy") || p === "/terms" || p.endsWith("/terms")) return true;
  // PDF source HTML, not a public landing page.
  if (p === "/nfctec-company-profile.html") return true;
  return false;
}

/**
 * Build hreflang alternate <link> entries for a locale-agnostic path.
 * `path` should be the sub-path AFTER the locale segment, e.g. "/blog" or "/products/x".
 * Returns entries suitable for TanStack `head().links`.
 */
export function hreflangLinks(path: string) {
  const norm = path === "" || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return [
    { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en${norm}` },
    { rel: "alternate", hrefLang: "zh", href: `${SITE_URL}/zh${norm}` },
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/en${norm}` },
  ];
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-default.jpg`,
  description:
    "Custom NFC tag and smart card manufacturer providing OEM/ODM production, NTAG424 DNA secure personalization, tamper-evident labels, JavaCard solutions, and server-side NFC authentication integration.",
  email: "sale@nfctec.com",
  sameAs: [
    "https://www.amazon.com/s?k=SZLEJUN&ref=bl_dp_s_web_0",
    "https://www.youtube.com/@NFCTEC",
    "https://github.com/NFCTEC",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sale@nfctec.com",
      availableLanguage: ["en", "zh"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@nfctec.com",
      availableLanguage: ["en", "zh"],
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};
