import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — NFCTEC" },
      { name: "description", content: "Talk to our NFC solution engineers — quotes, samples and SDK access within 24 hours." },
      { property: "og:title", content: "Contact Us — NFCTEC" },
      { property: "og:description", content: "Get in touch with NFCTEC." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { tr } = useI18n();
  const [done, setDone] = useState(false);

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
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="lg:col-span-3 rounded-3xl border border-border bg-card-gradient p-8 lg:p-12"
          >
            {done ? (
              <div className="py-16 text-center">
                <CheckCircle2 size={48} className="mx-auto text-primary mb-5" />
                <p className="font-display text-2xl">{tr("form.success")}</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={tr("form.name")} name="name" required />
                  <Field label={tr("form.company")} name="company" required />
                  <Field label={tr("form.email")} name="email" type="email" required />
                  <Field label={tr("form.phone")} name="phone" />
                  <Field label={tr("form.country")} name="country" />
                  <Field label={tr("form.budget")} name="budget" placeholder="$5k – $50k" />
                </div>
                <div className="mt-5">
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
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:shadow-glow-strong transition-all"
                >
                  {tr("form.submit")} <ArrowRight size={16} />
                </button>
              </>
            )}
          </form>

          <aside className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: tr("contact.email"), value: "hello@nfctec.com" },
              { icon: Phone, label: tr("contact.phone"), value: "+86 755 8888 1234" },
              { icon: MapPin, label: tr("contact.addr"), value: tr("foot.addr") },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="card-glow rounded-2xl border border-border bg-card-gradient p-7">
                  <Icon size={18} className="text-primary mb-4" />
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
                    {c.label}
                  </div>
                  <div className="font-medium">{c.value}</div>
                </div>
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
