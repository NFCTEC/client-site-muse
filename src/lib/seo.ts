// Central SEO config. Update SITE_URL when you switch the production domain.
export const SITE_URL = "https://www.nfctec.com";
export const SITE_NAME = "NFCTEC";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export const absUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-default.jpg`,
  description:
    "Full-stack NFC and smart card solutions: SDKs, JavaCard applets, EMV-certified readers, issuance & verification platform.",
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
