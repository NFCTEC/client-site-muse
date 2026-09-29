import type { Locale } from "./locale";
import { EN, ZH, type SolutionEnrichment, type SolutionFaq, type SolutionLink } from "./solutions-pages";

export type { SolutionEnrichment, SolutionFaq, SolutionLink };

const BY_LOCALE: Record<Locale, Record<string, SolutionEnrichment>> = { en: EN, zh: ZH };

function pickFilled<T>(cms: T, extra: T | undefined, empty: (v: T) => boolean): T {
  if (!empty(cms)) return cms;
  return extra ?? cms;
}

type SolutionDoc = {
  locale: Locale;
  slug: string;
  name: string;
  headline?: string;
  tagline: string;
  intro: string;
  body?: string;
  capabilities: { title: string; description: string }[];
  deliverables: string[];
  workflow: { title: string; description: string }[];
  faqs?: SolutionFaq[];
  relatedLinks?: SolutionLink[];
  seoTitle: string | null;
  seoDescription: string | null;
};

const WALLET_NAME: Record<Locale, string> = {
  en: "Apple Wallet & Google Wallet",
  zh: "Apple Wallet 与 Google Wallet",
};

export function mergeSolutionContent<T extends SolutionDoc>(solution: T): T {
  const extra = BY_LOCALE[solution.locale]?.[solution.slug];
  if (!extra) {
    return {
      ...solution,
      body: solution.body ?? "",
      faqs: solution.faqs ?? [],
      relatedLinks: solution.relatedLinks ?? [],
    };
  }

  const useLocal = Boolean(extra.body && extra.body.length > 80);
  const faqs = useLocal && extra.faqs?.length
    ? extra.faqs
    : (pickFilled(solution.faqs ?? [], extra.faqs, (v) => !v?.length) ?? []);
  const deliverables = useLocal && extra.deliverables?.length
    ? extra.deliverables
    : (pickFilled(solution.deliverables, extra.deliverables, (v) => !v?.length) ?? []);
  const workflow = useLocal && extra.workflow?.length
    ? extra.workflow
    : (pickFilled(solution.workflow, extra.workflow, (v) => !v?.length) ?? []);
  const relatedFromCms = (solution.relatedLinks ?? []).filter((l) => l.href);
  const relatedLinks = useLocal && extra.relatedLinks?.length
    ? extra.relatedLinks
    : relatedFromCms.length
      ? relatedFromCms
      : extra.relatedLinks ?? [];
  const capabilities =
    extra.capabilities && extra.capabilities.length && useLocal
      ? extra.capabilities
      : solution.capabilities;

  return {
    ...solution,
    name: solution.slug === "wallet" ? WALLET_NAME[solution.locale] : solution.name,
    headline: useLocal ? extra.headline || solution.headline : solution.headline,
    tagline: useLocal ? extra.tagline || solution.tagline : solution.tagline,
    intro: useLocal ? extra.intro || solution.intro : solution.intro,
    body: useLocal ? extra.body ?? "" : solution.body ?? extra.body ?? "",
    seoTitle: useLocal
      ? extra.seoTitle || solution.seoTitle || null
      : solution.seoTitle || extra.seoTitle || null,
    seoDescription: useLocal
      ? extra.seoDescription || solution.seoDescription || null
      : solution.seoDescription || extra.seoDescription || null,
    capabilities,
    deliverables,
    workflow,
    faqs,
    relatedLinks,
  };
}
