// Central SEO config. Update SITE_URL when you switch the production domain.
export const SITE_URL = "https://www.nfctec.com";
export const SITE_NAME = "NFCTEC";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export const absUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Login, dashboard, and other private paths — never sitemap, never index. */
export function isNoIndexPath(pathname: string) {
  const p = pathname.replace(/\/+$/, "") || "/";
  return p === "/auth" || p.endsWith("/auth") || p === "/dashboard" || p.endsWith("/dashboard");
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
    "NFC card factory: custom PVC, die-cut tags and wristbands. NTAG213/215/216, Ultralight EV1/C, DESFire EV2/EV3 (2K/4K/8K), NTAG 424 DNA, JCOP J3R180/J3R452/J2A040.",
  email: "sale@nfctec.com",
  sameAs: [
    "https://www.amazon.com/s?k=SZLEJUN&ref=bl_dp_s_web_0",
    "https://youtube.com/@lejuntech",
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
