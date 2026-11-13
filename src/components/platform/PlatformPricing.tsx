import { useMemo, useState } from "react";
import { PageSection } from "@/components/PageSection";
import { PlatformFrame, PlatformLink } from "@/components/platform/PlatformChrome";
import { Slider } from "@/components/ui/slider";
import { useLocale } from "@/hooks/useLocale";
import {
  API_MONTHS_MAX,
  API_PLANS,
  type ApiPlanId,
  formatUsdFromCents,
  formatUsdPerCardFromCents,
  isValidCheckoutSelection,
  issuanceCents,
  issuanceQuantityFromSliderIndex,
  ISSUANCE_SLIDER_MAX_INDEX,
  ISSUANCE_SNAP_QUANTITIES,
  orderTotalCents,
  perCardCents,
  PRICING_COMBO_EXAMPLES,
  supportTierFromApiMonths,
  verifyApiCents,
} from "@/lib/platform-pricing";

function supportTierLabel(locale: "en" | "zh", months: number): string {
  const tier = supportTierFromApiMonths(months);
  const zh = locale === "zh";
  if (tier === "none") {
    return zh
      ? "本单未购买验真 API：技术支持仍按账号现有 API 授权。"
      : "No API on this order: support follows your existing API authorization.";
  }
  if (tier === "standard") return zh ? "技术支持档位：标准（预付 1–11 个月）" : "Support tier: Standard (1–11 prepaid months)";
  if (tier === "annual") {
    return zh ? "技术支持档位：年付（预付 12–23 个月，推荐）" : "Support tier: Annual prepay (12–23 months, recommended)";
  }
  return zh ? "技术支持档位：长期（预付 24–60 个月）" : "Support tier: Long-term (24–60 prepaid months)";
}

export function PlatformPricing() {
  const locale = useLocale();
  const zh = locale === "zh";
  const [issuanceIndex, setIssuanceIndex] = useState(2);
  const [apiMonths, setApiMonths] = useState(1);
  const [planId, setPlanId] = useState<ApiPlanId>("standard");

  const issuanceQty = useMemo(() => issuanceQuantityFromSliderIndex(issuanceIndex), [issuanceIndex]);
  const issuanceTotal = useMemo(
    () => (issuanceQty > 0 ? issuanceCents(issuanceQty) : 0),
    [issuanceQty],
  );
  const perCard = useMemo(
    () => (issuanceQty > 0 ? perCardCents(issuanceTotal, issuanceQty) : 0),
    [issuanceTotal, issuanceQty],
  );
  const apiTotal = useMemo(() => verifyApiCents(planId, apiMonths), [planId, apiMonths]);
  const orderTotal = useMemo(
    () => orderTotalCents(issuanceQty, planId, apiMonths),
    [issuanceQty, planId, apiMonths],
  );
  const valid = isValidCheckoutSelection(issuanceQty, apiMonths);
  const selectedPlan = API_PLANS.find((p) => p.id === planId)!;

  return (
    <PlatformFrame
      locale={locale}
      page="pricing"
      eyebrow={zh ? "价格" : "Pricing"}
      title={zh ? "一笔订单，按系统算法计价" : "Buy and enable — one order, one payment"}
      subtitle={
        zh
          ? "拖动发行张数与验真 API 预付月数。可只买其一或一起买。标价不含税，税金在收银台按买家所在地处理。"
          : "Drag issuance quantity and prepaid API months. Buy either or both in one checkout. Prices are ex-tax; tax is handled at checkout by location."
      }
      actions={<PlatformLink locale={locale} intent="start">{zh ? "在平台购买" : "Buy in the platform"}</PlatformLink>}
    >
      <PageSection spacing="tight" className="!pt-0">
        <div className="rounded-2xl border border-border bg-card-gradient p-7 lg:p-9 max-w-3xl">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            {zh ? "配置本单" : "Configure this order"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {zh
              ? "发行额度一次买断，不过期，只计写卡成功；失败不扣。验真 API 月费 × 预付月数（1–60，无年付折扣）。"
              : "Issuance is one-time quota for successful writes only. Verify API is monthly fee × prepaid months (1–60, no annual discount)."}
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <label className="text-sm font-medium">
                {zh ? "成功发行张数（一次性）" : "Successful issuances (one-time)"}
              </label>
              <span className="font-display text-2xl tabular-nums">
                {issuanceQty > 0 ? issuanceQty.toLocaleString() : zh ? "不买" : "Skip"}
              </span>
            </div>
            <Slider
              min={0}
              max={ISSUANCE_SLIDER_MAX_INDEX}
              step={1}
              value={[issuanceIndex]}
              onValueChange={([v]) => setIssuanceIndex(v)}
              aria-label={zh ? "发行张数" : "Issuance quantity"}
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIssuanceIndex(0)}
                className={`rounded-full px-3 py-1.5 text-xs border ${
                  issuanceIndex === 0 ? "border-primary bg-primary/10" : "border-border text-muted-foreground"
                }`}
              >
                {zh ? "跳过" : "Skip"}
              </button>
              {ISSUANCE_SNAP_QUANTITIES.map((q) => {
                const idx = q === 0 ? 0 : (q - 500) / 500 + 1;
                return (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setIssuanceIndex(idx)}
                    className={`rounded-full px-3 py-1.5 text-xs border ${
                      issuanceQty === q ? "border-primary bg-primary/10" : "border-border text-muted-foreground"
                    }`}
                  >
                    {q.toLocaleString()}
                  </button>
                );
              })}
            </div>
            {issuanceQty > 0 && (
              <p className="text-sm text-muted-foreground">
                {formatUsdFromCents(issuanceTotal)}
                {zh ? " · 约 " : " · ≈ "}
                {formatUsdPerCardFromCents(perCard)}
                {zh ? "/张" : "/card"}
                <span className="text-xs"> {zh ? "（展示用单价，以订单总额为准）" : "(display rate; charged total applies)"}</span>
              </p>
            )}
            {issuanceQty > ISSUANCE_SNAP_QUANTITIES[ISSUANCE_SNAP_QUANTITIES.length - 1] && (
              <p className="text-xs text-muted-foreground">
                {zh ? "超过 50,000 张请联系销售。" : "Above 50,000 cards, contact sales."}
              </p>
            )}
          </div>

          <div className="mt-10 space-y-4">
            <p className="text-sm font-medium">
              {zh ? "开放 API：bind / activate / verify" : "Open API: bind / activate / verify"}
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {API_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setPlanId(plan.id)}
                  className={`rounded-xl border p-4 text-left text-sm transition-colors ${
                    planId === plan.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <p className="font-semibold">{zh ? plan.nameZh : plan.name}</p>
                  <p className="mt-1 font-display text-lg">
                    {formatUsdFromCents(plan.monthlyCents)}
                    <span className="text-xs text-muted-foreground">{zh ? "/月" : "/mo"}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {plan.checks.toLocaleString()} {zh ? "次/月" : "checks/mo"}
                  </p>
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <label className="text-sm font-medium">{zh ? "预付 API 月数" : "Prepaid API months"}</label>
                <span className="font-display text-2xl tabular-nums">
                  {apiMonths === 0 ? (zh ? "不买" : "Skip") : apiMonths}
                </span>
              </div>
              <Slider
                min={0}
                max={API_MONTHS_MAX}
                step={1}
                value={[apiMonths]}
                onValueChange={([v]) => setApiMonths(v)}
                aria-label={zh ? "API 月数" : "API months"}
              />
              <p className="text-xs text-muted-foreground">
                {zh
                  ? "月数为 0 时本单不买 API。三档能力相同，仅月费与每月次数不同。"
                  : "Set months to 0 to skip API on this order. Tiers differ only by monthly fee and call quota."}
              </p>
              {apiMonths > 0 && (
                <p className="text-sm text-muted-foreground">
                  {formatUsdFromCents(selectedPlan.monthlyCents)} × {apiMonths} ={" "}
                  <span className="font-semibold text-foreground">{formatUsdFromCents(apiTotal)}</span>
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-border space-y-3">
            <div className="flex flex-wrap justify-between gap-3 text-sm">
              <span className="text-muted-foreground">{zh ? "发行" : "Issuance"}</span>
              <span className="font-medium tabular-nums">{formatUsdFromCents(issuanceTotal)}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3 text-sm">
              <span className="text-muted-foreground">{zh ? "验真 API" : "Verify API"}</span>
              <span className="font-medium tabular-nums">{formatUsdFromCents(apiTotal)}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3 items-baseline">
              <span className="font-medium">{zh ? "订单金额（美元）" : "Order total (USD)"}</span>
              <span className="font-display text-3xl tabular-nums">
                {valid ? formatUsdFromCents(orderTotal) : "—"}
              </span>
            </div>
            {!valid && (
              <p className="text-sm text-destructive">
                {zh ? "至少购买发行额度或验真 API 其中一项。" : "Include issuance quota or prepaid API on this order."}
              </p>
            )}
            <p className="text-xs text-muted-foreground leading-relaxed">{supportTierLabel(zh ? "zh" : "en", apiMonths)}</p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm text-muted-foreground leading-relaxed">
          {zh
            ? "注册即送 10 张发行额度与 2,000 次验真（体验额度），不计入本单。实体 NFC 标签与读卡器不含在平台价格内。"
            : "Sign-up includes 10 issuances and 2,000 verifications (trial), not part of this order. Physical tags and readers are not included."}
        </p>
      </PageSection>

      <PageSection tone="muted">
        <h2 className="font-display text-2xl tracking-tight">{zh ? "组合示例" : "Bundle examples"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {zh ? "与平台收银台同一算法（分四舍五入后显示美元）。" : "Same formula as the platform checkout (cents rounded, shown in USD)."}
        </p>
        <ul className="mt-6 space-y-3 max-w-2xl">
          {PRICING_COMBO_EXAMPLES.map((ex) => {
            const i = issuanceCents(ex.issuanceQty);
            const a = verifyApiCents(ex.planId, ex.months);
            const plan = API_PLANS.find((p) => p.id === ex.planId)!;
            return (
              <li key={`${ex.issuanceQty}-${ex.planId}-${ex.months}`} className="rounded-xl border border-border px-4 py-3 text-sm">
                <span className="font-medium">
                  {ex.issuanceQty.toLocaleString()} {zh ? "张" : "cards"} + {zh ? plan.nameZh : plan.name}{" "}
                  {ex.months} {zh ? "个月" : ex.months === 1 ? "month" : "months"}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  = {formatUsdFromCents(i)} + {formatUsdFromCents(a)} ={" "}
                </span>
                <span className="font-semibold">{formatUsdFromCents(i + a)}</span>
              </li>
            );
          })}
        </ul>
      </PageSection>
    </PlatformFrame>
  );
}
