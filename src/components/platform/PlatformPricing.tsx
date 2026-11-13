import { useState } from "react";
import { PageSection } from "@/components/PageSection";
import { PlatformFrame, PlatformLink } from "@/components/platform/PlatformChrome";
import { useLocale } from "@/hooks/useLocale";
import {
  API_PLANS,
  API_PREPAY_MONTHS,
  CONFIRMED_ISSUANCE,
  ENTERPRISE_PLANS,
  ISSUANCE_TIERS,
} from "@/lib/platform-site";

export function PlatformPricing() {
  const locale = useLocale();
  const zh = locale === "zh";
  const [quantity, setQuantity] = useState<number>(CONFIRMED_ISSUANCE.quantity);
  const [months, setMonths] = useState<number>(1);
  const confirmed = quantity === CONFIRMED_ISSUANCE.quantity;

  return (
    <PlatformFrame
      locale={locale}
      page="pricing"
      eyebrow={zh ? "价格" : "Pricing"}
      title={zh ? "一次买发行额度。验真按月订阅。" : "Pay Once. Provision When You Need."}
      subtitle={
        zh
          ? "发行额度和 API 订阅分开计价。本页只展示已经确认的公开标价，其余数量以平台收银台为准。"
          : "Issuance quotas are purchased separately from API subscriptions. This page shows confirmed public prices only. Other quantities are quoted in the platform checkout."
      }
      actions={<PlatformLink locale={locale} intent="start">{zh ? "打开平台" : "Open the platform"}</PlatformLink>}
    >
      <PageSection spacing="tight" className="!pt-0">
        <h2 className="font-display text-2xl tracking-tight">{zh ? "发行额度" : "Issuance quota"}</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          {zh
            ? `只统计写卡成功张数，一次买断，不是月度订阅。已确认：${CONFIRMED_ISSUANCE.quantity.toLocaleString()} 张 $${CONFIRMED_ISSUANCE.priceUsd}。其他档位不在本页标价。`
            : `Counted on successful writes. A one-time purchase, not a monthly subscription. Confirmed: ${CONFIRMED_ISSUANCE.quantity.toLocaleString()} for $${CONFIRMED_ISSUANCE.priceUsd}. Other quantities are not priced on this page.`}
        </p>
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={zh ? "发行张数" : "Issuance quantity"}>
          {ISSUANCE_TIERS.map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setQuantity(tier)}
              className={`rounded-full px-4 py-2 text-sm border ${
                quantity === tier ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground"
              }`}
            >
              {tier.toLocaleString()}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card-gradient p-7 max-w-xl">
          <p className="text-sm text-muted-foreground">{quantity.toLocaleString()} {zh ? "张成功发行" : "successful issuances"}</p>
          {confirmed ? (
            <p className="mt-2 font-display text-4xl">${CONFIRMED_ISSUANCE.priceUsd}</p>
          ) : (
            <p className="mt-3 text-sm leading-relaxed">
              {zh
                ? "这个数量的价格在平台收银台确认。本页不编造未公布的单价。"
                : "This quantity is priced in the platform checkout. This page does not invent an unpublished unit price."}
            </p>
          )}
          <div className="mt-6">
            <PlatformLink locale={locale} intent="start">{zh ? "到平台查看购买" : "Buy in the platform"}</PlatformLink>
          </div>
        </div>
      </PageSection>

      <PageSection tone="muted">
        <h2 className="font-display text-2xl tracking-tight">{zh ? "验真 API" : "Authentication API Plans"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {zh
            ? "预付月数用来估算总价。实际可选档位以平台收银台为准。"
            : "Prepaid months are a preview of the published monthly rate. The terms you can actually buy are confirmed at checkout."}
        </p>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={zh ? "预付月数" : "Prepaid months"}>
          {API_PREPAY_MONTHS.map((month) => (
            <button
              key={month}
              type="button"
              onClick={() => setMonths(month)}
              className={`rounded-full px-4 py-2 text-sm border ${
                months === month ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground"
              }`}
            >
              {month} {zh ? "个月" : month === 1 ? "month" : "months"}
            </button>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {API_PLANS.map((plan) => (
            <article key={plan.id} className="rounded-2xl border border-border bg-card-gradient p-7">
              <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
              <p className="mt-3 font-display text-3xl">${plan.monthlyUsd}<span className="text-base text-muted-foreground">{zh ? "/月" : "/mo"}</span></p>
              <p className="mt-2 text-sm text-muted-foreground">{plan.checks.toLocaleString()} {zh ? "次 / 月" : "checks / month"}</p>
              {months > 0 && (
                <p className="mt-4 text-sm">
                  {zh ? `${months} 个月估算 ` : `${months}-month preview: `}
                  <span className="font-semibold">${(plan.monthlyUsd * months).toLocaleString()}</span>
                </p>
              )}
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <h2 className="font-display text-2xl tracking-tight">{zh ? "企业套餐（拟定）" : "Enterprise plans"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {zh ? "Indicative pricing — 以销售确认为准。这里不能直接在线购买。" : "Indicative pricing — subject to confirmation. There is no self-serve checkout for these plans."}
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-3 pr-4 font-medium">{zh ? "套餐" : "Plan"}</th>
                <th className="py-3 pr-4 font-medium">{zh ? "月费" : "Monthly"}</th>
                <th className="py-3 pr-4 font-medium">{zh ? "发行 / 月" : "Issuance / month"}</th>
                <th className="py-3 font-medium">{zh ? "验真 / 月" : "Verification / month"}</th>
              </tr>
            </thead>
            <tbody>
              {ENTERPRISE_PLANS.map((plan) => (
                <tr key={plan.id} className="border-t border-border">
                  <td className="py-3 pr-4 font-medium border-t border-border">{plan.name}</td>
                  <td className="py-3 pr-4 border-t border-border">${plan.monthlyUsd.toLocaleString()}{"plus" in plan && plan.plus ? "+" : ""}</td>
                  <td className="py-3 pr-4 border-t border-border">{plan.issuance.toLocaleString()}</td>
                  <td className="py-3 border-t border-border">{plan.checks.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <PlatformLink locale={locale} intent="sales">{zh ? "联系销售" : "Contact Sales"}</PlatformLink>
        </div>
      </PageSection>
    </PlatformFrame>
  );
}
