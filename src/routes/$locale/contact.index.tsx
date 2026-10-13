import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n, t as dict, type Lang } from "@/lib/i18n";
import { SUPPORT_EMAIL } from "@/lib/contact";
import { Mail, MapPin, CheckCircle2 } from "lucide-react";
import { submitInquiry } from "@/lib/cms";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { FaqSection, faqJsonLd, type FaqItem } from "@/components/FaqSection";

const PRODUCTS = [
  { id: "ntag424", label: "NTAG 424 DNA" },
  { id: "desfire", label: "DESFire" },
  { id: "j3r180", label: "J3R180" },
  { id: "j3r452", label: "J3R452" },
  { id: "nfc-detector", label: "NFC signal detector card" },
  { id: "nfc-reader", label: "NFC reader" },
  { id: "cac-reader", label: "CAC reader" },
  { id: "other", label: "Other" },
] as const;

const SKU_ALIAS: Record<string, (typeof PRODUCTS)[number]["id"]> = {
  ntag424: "ntag424",
  "ntag424-dna": "ntag424",
  desfire: "desfire",
  "mifare-desfire": "desfire",
  j3r180: "j3r180",
  "j3r180-javacard": "j3r180",
  j3r452: "j3r452",
  "j3r452-javacard": "j3r452",
  "nfc-detector": "nfc-detector",
  "nfc-field-detector": "nfc-detector",
  detector: "nfc-detector",
  "nfc-reader": "nfc-reader",
  reader: "nfc-reader",
  cac: "cac-reader",
  "cac-reader": "cac-reader",
  other: "other",
};

function productFromSku(sku: string | undefined) {
  if (!sku) return "";
  const id = SKU_ALIAS[sku.toLowerCase()];
  return PRODUCTS.find((p) => p.id === id)?.label ?? "";
}

const CONTACT_FAQ_KEYS = ["c1", "c2", "c3", "c4"] as const;
function buildContactFaq(lang: Lang): FaqItem[] {
  return CONTACT_FAQ_KEYS.map((k) => ({
    q: dict[`faq.${k}.q`][lang],
    a: dict[`faq.${k}.a`][lang],
  }));
}

export const Route = createFileRoute("/$locale/contact/")({
  validateSearch: (search: Record<string, unknown>) => {
    const sku = typeof search.sku === "string" ? search.sku.slice(0, 40) : undefined;
    const rawSrc = typeof search.src === "string" ? search.src : "";
    const src = rawSrc.replace(/[^\w-]/g, "").slice(0, 24) || undefined;
    return { sku, src };
  },
  head: ({ params }) => {
    const locale = params.locale as Locale;
    const lang: Lang = locale === "zh" ? "zh" : "en";
    const title = lang === "zh" ? "SZLEJUN 产品支持 — NFCTEC" : "SZLEJUN Product Support — NFCTEC";
    const description =
      lang === "zh"
        ? "已经买到的 SZLEJUN 产品，在这里问怎么用。周一至周日、北京时间一个工作日内回复。退款、退货和物流留在亚马逊订单里。"
        : "Help for a SZLEJUN product you already bought. We reply within one business day, Monday to Sunday, China time. Refunds, returns, and delivery stay in your Amazon order.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: absLocaleUrl(locale, "/contact") },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: absLocaleUrl(locale, "/contact") },
        ...hreflangLinks("/contact"),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLd(buildContactFaq(lang))),
        },
      ],
    };
  },
  component: Contact,
});

function Contact() {
  const { tr, lang } = useI18n();
  const { sku, src } = Route.useSearch();
  const faqItems = buildContactFaq(lang);
  const presetProduct = productFromSku(sku);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const issue = get("issue");
    const product = get("product");
    const order = get("order");
    const lines = [
      product && `Product: ${product}`,
      get("asin") && `Package / ASIN: ${get("asin")}`,
      get("device") && `Device: ${get("device")}`,
      order && `Amazon order: ${order}`,
      src && `Source: ${src}`,
      "",
      get("desc"),
    ].filter((line) => line !== false && line !== "");
    try {
      await submitInquiry({
        name: get("name"),
        email: get("email"),
        subject: `[support] ${product || "product"}${issue ? ` — ${issue}` : ""}`,
        message: lines.join("\n"),
      });
      setDone(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero eyebrow={tr("contact.eyebrow")} title={tr("contact.title")} subtitle={tr("contact.sub")} />

      <PageSection spacing="main" className="!pt-0">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-border bg-card-gradient p-6 sm:p-8 lg:p-10"
          >
            {done ? (
              <div className="py-16 text-center">
                <CheckCircle2 size={48} className="mx-auto text-primary mb-5" />
                <p className="font-display text-2xl">{tr("contact.success")}</p>
              </div>
            ) : (
              <>
                {error && <p className="mb-4 text-sm text-destructive">{tr("form.error")}</p>}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      {tr("contact.issue")}
                      <span className="text-primary ml-1">*</span>
                    </label>
                    <select
                      name="issue"
                      required
                      className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    >
                      <option value="">{tr("contact.issue")}</option>
                      <option value={tr("contact.issue.read")}>{tr("contact.issue.read")}</option>
                      <option value={tr("contact.issue.use")}>{tr("contact.issue.use")}</option>
                      <option value={tr("contact.issue.damage")}>{tr("contact.issue.damage")}</option>
                      <option value={tr("contact.issue.other")}>{tr("contact.issue.other")}</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      {tr("contact.product")}
                      <span className="text-primary ml-1">*</span>
                    </label>
                    <select
                      name="product"
                      required
                      defaultValue={presetProduct}
                      className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    >
                      <option value="">{tr("contact.product")}</option>
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.label}>
                          {p.id === "nfc-detector"
                            ? tr("contact.product.detector")
                            : p.id === "nfc-reader"
                              ? tr("contact.product.reader")
                              : p.id === "cac-reader"
                                ? tr("contact.product.cac")
                                : p.id === "other"
                                  ? tr("contact.product.other")
                                  : p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Field label={tr("form.name")} name="name" required />
                  <Field label={tr("form.email")} name="email" type="email" required />
                  <Field
                    label={tr("contact.device")}
                    name="device"
                    required
                    placeholder={tr("contact.device.ph")}
                  />
                  <Field label={tr("contact.order")} name="order" placeholder="111-0000000-0000000" />
                  <div className="sm:col-span-2">
                    <Field label={tr("contact.asin")} name="asin" placeholder="B0XXXXXXXX" />
                  </div>
                </div>
                <div className="mt-5">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {tr("contact.desc")}
                    <span className="text-primary ml-1">*</span>
                  </label>
                  <textarea
                    name="desc"
                    rows={5}
                    required
                    maxLength={2000}
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  {tr("contact.photo")}{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">
                    {SUPPORT_EMAIL}
                  </a>{" "}
                  {tr("contact.photo.after")}
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 inline-flex items-center rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? tr("form.sending") : tr("contact.submit")}
                </button>
              </>
            )}
          </form>

          <aside className="lg:col-span-2 space-y-4">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="card-glow block rounded-2xl border border-border bg-card-gradient p-7 hover:border-primary/40 transition-colors"
            >
              <Mail size={18} className="text-primary mb-4" />
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                {tr("contact.support")}
              </div>
              <div className="font-medium break-all">{SUPPORT_EMAIL}</div>
            </a>
            <div className="rounded-2xl border border-border bg-card-gradient p-7">
              <MapPin size={18} className="text-primary mb-4" />
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                {tr("contact.addr")}
              </div>
              <div className="font-medium">{tr("foot.addr")}</div>
            </div>
          </aside>
        </div>
      </PageSection>

      <FaqSection eyebrow={tr("faq.eyebrow")} title={tr("faq.title")} items={faqItems} />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        maxLength={200}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
