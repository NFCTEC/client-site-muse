import Link from "next/link";
import type { Card } from "@/lib/content";
import { localizeHref, type Locale } from "@/i18n/config";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] opacity-70 md:block" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(90,54,242,.035)),linear-gradient(rgba(40,43,75,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(40,43,75,.06)_1px,transparent_1px)] bg-[size:auto,28px_28px,28px_28px]" />
        <div className="absolute right-[18%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-accent/15" />
        <div className="absolute right-[calc(18%+32px)] top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-accent/25" />
      </div>
      <div className="public-shell relative py-14 md:py-20">
        {eyebrow ? <p className="kicker">{eyebrow}</p> : null}
        <h1 className="display mt-4 max-w-4xl text-ink">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{description}</p> : null}
      </div>
    </section>
  );
}

export function Breadcrumb({ locale, items }: { locale: Locale; items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="public-shell py-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span className="text-[#b5b8c7]" aria-hidden>/</span> : null}
            {item.href ? <Link className="hover:text-accent" href={localizeHref(item.href, locale)}>{item.label}</Link> : <span className="text-ink" aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LinkGrid({ locale, title, items }: { locale: Locale; title: string; items: Card[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-12">
      <h2 className="section-title">{title}</h2>
      <div className="mt-6 grid gap-x-8 md:grid-cols-2">
        {items.map((item) => (
          <Link key={item.href} href={localizeHref(item.href, locale)} className="list-card">
            <span className="block text-lg font-semibold">{item.title}</span>
            {item.description ? <span className="mt-1 block text-sm leading-6 text-muted">{item.description}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function TermList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-[-0.02em]">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="tech-label">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CtaBand({ locale, title, body, label }: { locale: Locale; title: string; body: string; label: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-[#f4f2ec]">
      <div className="absolute -right-16 -top-36 h-96 w-96 rounded-full border border-white/10" aria-hidden />
      <div className="absolute -right-2 -top-20 h-64 w-64 rounded-full border border-accent/70" aria-hidden />
      <div className="public-shell relative flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div>
          <p className="kicker !text-[#7fa8ff]">{locale === "zh" ? "工程师直接沟通" : "Engineer to engineer"}</p>
          <h2 className="section-title max-w-xl text-[#f4f2ec]">{title}</h2>
          <p className="mt-3 max-w-xl text-[#d5ddd8]">{body}</p>
        </div>
        <Link href={localizeHref("/contact", locale)} className="btn bg-white text-ink">
          {label}
        </Link>
      </div>
    </section>
  );
}
