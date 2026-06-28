import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { submitInquiry } from "@/lib/api/inquiry.functions";
import { absLocaleUrl, type Locale } from "@/lib/locale";

const INQUIRY_TO = "support@nfctec.com";
const SALES_EMAIL = "sale@nfctec.com";

export const Route = createFileRoute("/$locale/contact")({
  head: ({ params }) => ({
    meta: [
      { title: "Contact Us — NFCTEC" },
      { name: "description", content: "Talk to our NFC solution engineers — quotes, samples and SDK access within 24 hours." },
      { property: "og:title", content: "Contact Us — NFCTEC" },
      { property: "og:description", content: "Get in touch with NFCTEC." },
      { property: "og:url", content: absLocaleUrl(params.locale as Locale, "/contact") },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: absLocaleUrl(params.locale as Locale, "/contact") }],
  }),
  component: Contact,
});

function Contact() {
  const { tr } = useI18n();
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    try {
      await submitInquiry({
        data: {
          name: get("name"),
          company: get("company") || undefined,
          email: get("email"),
          whatsapp: get("whatsapp") || undefined,
          country: get("country") || undefined,
          subject: get("subject") || "Website inquiry",
          message: get("desc"),
        },
      });
      setDone(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <h1 className="font-display text-5xl lg:text-7xl tracking-tight whitespace-pre-line text-balance max-w-4xl">
          {tr("contact.title")}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{tr("contact.sub")}</p>

        <div className="mt-16 grid lg:grid-cols-5 gap-8 lg:gap-12">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-3xl border border-border bg-card-gradient p-8 lg:p-12"
          >
            {done ? (
              <div className="py-16 text-center">
                <CheckCircle2 size={48} className="mx-auto text-primary mb-5" />
                <p className="font-display text-2xl">{tr("form.success")}</p>
              </div>
            ) : (
              <>
                {error && (
                  <p className="mb-4 text-sm text-red-400">Failed to send. Please email us directly.</p>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={tr("form.name")} name="name" required />
                  <Field label={tr("form.company")} name="company" required />
                  <Field label={tr("form.email")} name="email" type="email" required />
                  <Field label={tr("form.whatsapp")} name="whatsapp" placeholder="+1 555 …" />
                  <Field label={tr("form.country")} name="country" />
                  <Field label={tr("form.subject")} name="subject" required />
                </div>
                <div className="mt-5">
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    {tr("form.desc")}<span className="text-primary ml-1">*</span>
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
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:shadow-glow-strong transition-all disabled:opacity-60"
                >
                  {loading ? "Sending…" : tr("form.submit")} <ArrowRight size={16} />
                </button>
              </>
            )}
          </form>

          <aside className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: tr("contact.support"), value: INQUIRY_TO, href: `mailto:${INQUIRY_TO}` },
              { icon: Mail, label: tr("contact.sales"), value: SALES_EMAIL, href: `mailto:${SALES_EMAIL}` },
              { icon: MapPin, label: tr("contact.addr"), value: tr("foot.addr") },
            ].map((c) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <Icon size={18} className="text-primary mb-4" />
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
                    {c.label}
                  </div>
                  <div className="font-medium break-all">{c.value}</div>
                </>
              );
              return c.href ? (
                <a key={c.label} href={c.href} className="card-glow block rounded-2xl border border-border bg-card-gradient p-7 hover:border-primary/40 transition-colors">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="card-glow rounded-2xl border border-border bg-card-gradient p-7">{inner}</div>
              );
            })}
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
        {label}{required && <span className="text-primary ml-1">*</span>}
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
