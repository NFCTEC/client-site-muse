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

const CONTACT_FAQ_KEYS = ["c1", "c2", "c3", "c4"] as const;
function buildContactFaq(lang: Lang): FaqItem[] {
  return CONTACT_FAQ_KEYS.map((k) => ({
    q: dict[`faq.${k}.q`][lang],
    a: dict[`faq.${k}.a`][lang],
  }));
}

export const Route = createFileRoute("/$locale/contact/")({
  head: ({ params }) => {
    const locale = params.locale as Locale;
    const lang: Lang = locale === "zh" ? "zh" : "en";
    const title = lang === "zh" ? "产品支持 — NFCTEC" : "Product support — NFCTEC";
    const description =
      lang === "zh"
        ? "已经买到的产品，在这里问怎么用。一个工作日内邮件回复。订单退款和物流仍在亚马逊处理。"
        : "Help for a product you already bought. We reply by email within one business day. Refunds and delivery stay in your Amazon order.";
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
  const faqItems = buildContactFaq(lang);
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
    const order = get("order");
    const detail = get("desc");
    const message = order ? `Amazon order: ${order}\n\n${detail}` : detail;
    try {
      await submitInquiry({
        name: get("name"),
        email: get("email"),
        whatsapp: get("phone") || undefined,
        subject: issue ? `[support] ${issue}` : "[support]",
        message,
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
                  <Field label={tr("form.name")} name="name" required />
                  <Field label={tr("form.email")} name="email" type="email" required />
                  <Field label={tr("form.phone")} name="phone" />
                  <Field label={tr("contact.order")} name="order" placeholder="111-0000000-0000000" />
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
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 inline-flex items-center rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? tr("form.sending") : tr("contact.submit")}
                </button>
              </>
            )}
          </form>

          <aside className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-border bg-card-gradient p-7">
              <h2 className="font-display text-lg font-semibold mb-4">{tr("contact.help.title")}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{tr("contact.help.read")}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{tr("contact.help.peel")}</p>
            </div>
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
