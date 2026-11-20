import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n, t as dict, type Lang } from "@/lib/i18n";
import { SALES_EMAIL } from "@/lib/contact";
import { ArrowRight, CheckCircle2, Mail, MapPin } from "lucide-react";
import { fetchDisplayConfig, submitInquiry } from "@/lib/cms";
import { isModuleEnabled } from "@/lib/display-config";
import { absLocaleUrl, type Locale } from "@/lib/locale";
import { hreflangLinks } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { FaqSection, faqJsonLd, type FaqItem } from "@/components/FaqSection";

const INQUIRY_FAQ_KEYS = ["in1", "in2", "in3", "in4"] as const;

function buildInquiryFaq(lang: Lang): FaqItem[] {
  return INQUIRY_FAQ_KEYS.map((k) => ({
    q: dict[`faq.${k}.q`][lang],
    a: dict[`faq.${k}.a`][lang],
  }));
}

export const Route = createFileRoute("/$locale/inquiry")({
  loader: async ({ params }) => {
    const config = await fetchDisplayConfig(params.locale as Locale);
    if (!isModuleEnabled(config, "contact")) throw notFound();
    return {};
  },
  head: ({ params }) => {
    const locale = params.locale as Locale;
    const lang: Lang = locale === "zh" ? "zh" : "en";
    const title = lang === "zh" ? "NFC 定制产品询价 | NFCTEC" : "Custom NFC Tags & Smart Cards Quote | NFCTEC";
    const description =
      lang === "zh"
        ? "提交 NFC 标签、智能卡和安全个人化项目需求，获取定制制造、印刷及编码方案建议。"
        : "Request a quote for custom NFC tags, smart cards and secure personalization. Share your application, quantity and specifications with NFCTEC.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: absLocaleUrl(locale, "/inquiry") },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: absLocaleUrl(locale, "/inquiry") },
        ...hreflangLinks("/inquiry"),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLd(buildInquiryFaq(lang))),
        },
      ],
    };
  },
  component: Inquiry,
});

function Inquiry() {
  const { tr, lang } = useI18n();
  const faqItems = buildInquiryFaq(lang);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const projectType = get("projectType");
    const subject = get("subject") || tr("form.subject.default");
    try {
      await submitInquiry({
        name: get("name"),
        company: get("company") || undefined,
        email: get("email"),
        whatsapp: get("phone") || undefined,
        country: get("country") || undefined,
        subject: projectType ? `${projectType}: ${subject}` : subject,
        message: get("desc"),
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
      <PageHero eyebrow={tr("project.eyebrow")} title={tr("project.title")} subtitle={tr("project.sub")} />
      <PageSection spacing="main" className="!pt-0">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-xl border border-border bg-card p-6 sm:p-8 lg:p-10"
          >
            {done ? (
              <div className="py-16 text-center">
                <CheckCircle2 size={48} className="mx-auto text-primary mb-5" />
                <p className="font-display text-2xl">{tr("form.success")}</p>
              </div>
            ) : (
              <>
                {error && <p className="mb-4 text-sm text-destructive">{tr("form.error")}</p>}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={tr("form.name")} name="name" required />
                  <Field label={tr("form.company")} name="company" required />
                  <Field label={tr("form.email")} name="email" type="email" required />
                  <Field label={tr("form.phone")} name="phone" />
                  <Field label={tr("form.country")} name="country" />
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      {tr("form.projectType")}
                      <span className="text-primary ml-1">*</span>
                    </label>
                    <select
                      name="projectType"
                      required
                      className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                    >
                      <option value="">{tr("form.projectType")}</option>
                      <option value={tr("form.type.sw")}>{tr("form.type.sw")}</option>
                      <option value={tr("form.type.hw")}>{tr("form.type.hw")}</option>
                      <option value={tr("form.type.cloud")}>{tr("form.type.cloud")}</option>
                      <option value={tr("form.type.full")}>{tr("form.type.full")}</option>
                    </select>
                  </div>
                  <Field label={tr("form.subject")} name="subject" required />
                </div>
                <div className="mt-5">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {tr("form.desc")}
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
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? tr("form.sending") : tr("form.submit")} <ArrowRight size={16} />
                </button>
              </>
            )}
          </form>

          <aside className="lg:col-span-2 space-y-4">
            <a
              href={`mailto:${SALES_EMAIL}`}
              className="card-glow block rounded-2xl border border-border bg-card-gradient p-7 hover:border-primary/40 transition-colors"
            >
              <Mail size={18} className="text-primary mb-4" />
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                {tr("contact.sales")}
              </div>
              <div className="font-medium break-all">{SALES_EMAIL}</div>
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        maxLength={200}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
