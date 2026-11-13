/** Matches platform checkout: USD display, integer cents internally. */

export const ISSUANCE_MIN = 500;
export const ISSUANCE_MAX = 50_000;
export const ISSUANCE_STEP = 500;

export const API_MONTHS_MIN = 0;
export const API_MONTHS_MAX = 60;

/** Reference points on the issuance curve (not separate SKUs). */
export const ISSUANCE_SNAP_QUANTITIES = [500, 1_000, 5_000, 10_000, 25_000, 50_000] as const;

export const API_PLAN_IDS = ["standard", "growth", "scale"] as const;
export type ApiPlanId = (typeof API_PLAN_IDS)[number];

export const API_PLANS = [
  { id: "standard" as const, name: "Standard", nameZh: "标准", monthlyCents: 3_900, checks: 50_000 },
  { id: "growth" as const, name: "Growth", nameZh: "成长", monthlyCents: 9_900, checks: 500_000 },
  { id: "scale" as const, name: "Scale", nameZh: "规模", monthlyCents: 29_900, checks: 5_000_000 },
] as const;

export type SupportTierId = "none" | "standard" | "annual" | "longterm";

const ANCHOR_1K_CENTS = 6_900;
const ANCHOR_5K_CENTS = 24_900;
const ANCHOR_10K_CENTS = 39_900;
const OVER_10K_PER_1K_CENTS = 3_990;

/** One-time issuance total in cents for q successful writes (q must be > 0). */
export function issuanceCents(q: number): number {
  if (q <= 0) return 0;
  let dollars: number;
  if (q <= 1_000) {
    dollars = (q / 1_000) * (ANCHOR_1K_CENTS / 100);
  } else if (q <= 5_000) {
    dollars =
      ANCHOR_1K_CENTS / 100 + ((q - 1_000) / (5_000 - 1_000)) * ((ANCHOR_5K_CENTS - ANCHOR_1K_CENTS) / 100);
  } else if (q <= 10_000) {
    dollars =
      ANCHOR_5K_CENTS / 100 + ((q - 5_000) / (10_000 - 5_000)) * ((ANCHOR_10K_CENTS - ANCHOR_5K_CENTS) / 100);
  } else {
    dollars = ANCHOR_10K_CENTS / 100 + ((q - 10_000) / 1_000) * (OVER_10K_PER_1K_CENTS / 100);
  }
  return Math.round(dollars * 100);
}

export function perCardCents(issuanceTotalCents: number, q: number): number {
  if (q <= 0) return 0;
  return Math.round(issuanceTotalCents / q);
}

export function verifyApiCents(planId: ApiPlanId, months: number): number {
  if (months <= 0) return 0;
  const plan = API_PLANS.find((p) => p.id === planId);
  if (!plan) return 0;
  return plan.monthlyCents * months;
}

export function orderTotalCents(issuanceQty: number, planId: ApiPlanId, apiMonths: number): number {
  const issuance = issuanceQty > 0 ? issuanceCents(issuanceQty) : 0;
  const api = verifyApiCents(planId, apiMonths);
  return issuance + api;
}

/** At least issuance qty ≥ 500 or prepaid API months ≥ 1. */
export function isValidCheckoutSelection(issuanceQty: number, apiMonths: number): boolean {
  return issuanceQty >= ISSUANCE_MIN || apiMonths >= 1;
}

export function supportTierFromApiMonths(months: number): SupportTierId {
  if (months <= 0) return "none";
  if (months <= 11) return "standard";
  if (months <= 23) return "annual";
  return "longterm";
}

export function formatUsdFromCents(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function formatUsdPerCardFromCents(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

/** Slider index 0 = skip issuance; 1…100 = 500…50,000 step 500. */
export const ISSUANCE_SLIDER_MAX_INDEX = (ISSUANCE_MAX - ISSUANCE_MIN) / ISSUANCE_STEP + 1;

export function issuanceQuantityFromSliderIndex(index: number): number {
  if (index <= 0) return 0;
  const q = ISSUANCE_MIN + (index - 1) * ISSUANCE_STEP;
  return Math.min(q, ISSUANCE_MAX);
}

export function issuanceSliderIndexFromQuantity(q: number): number {
  if (q <= 0) return 0;
  return Math.round((q - ISSUANCE_MIN) / ISSUANCE_STEP) + 1;
}

/** Worked examples for the pricing page. */
export const PRICING_COMBO_EXAMPLES = [
  { issuanceQty: 1_000, planId: "standard" as const, months: 1 },
  { issuanceQty: 5_000, planId: "growth" as const, months: 3 },
  { issuanceQty: 10_000, planId: "scale" as const, months: 12 },
] as const;
