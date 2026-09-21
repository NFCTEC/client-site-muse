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

  const cmsOwnsCopy = Boolean(solution.body && solution.body.length > 80);
  const faqs = pickFilled(solution.faqs ?? [], extra.faqs, (v) => !v?.length) ?? [];
  const deliverables = pickFilled(solution.deliverables, extra.deliverables, (v) => !v?.length) ?? [];
  const workflow = pickFilled(solution.workflow, extra.workflow, (v) => !v?.length) ?? [];
  const relatedFromCms = (solution.relatedLinks ?? []).filter((l) => l.href);
  const relatedLinks = relatedFromCms.length ? relatedFromCms : extra.relatedLinks ?? [];
  const capabilities =
    extra.capabilities && extra.capabilities.length && !cmsOwnsCopy
      ? extra.capabilities
      : solution.capabilities;

  return {
    ...solution,
    headline: cmsOwnsCopy ? solution.headline : extra.headline || solution.headline,
    tagline: cmsOwnsCopy ? solution.tagline : extra.tagline || solution.tagline,
    intro: cmsOwnsCopy ? solution.intro : extra.intro || solution.intro,
    body: cmsOwnsCopy ? solution.body : extra.body ?? solution.body ?? "",
    seoTitle: solution.seoTitle || extra.seoTitle || null,
    seoDescription: solution.seoDescription || extra.seoDescription || null,
    capabilities,
    deliverables,
    workflow,
    faqs,
    relatedLinks,
  };
}
