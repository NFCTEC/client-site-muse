import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, type Locale } from "@/i18n/config";
import type { NavNode } from "@/lib/content";
import { Logo } from "./logo";

export function Footer({ locale, items, labels }: { locale: Locale; items: NavNode[]; labels: Dictionary }) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="public-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6 lg:gap-7 lg:py-16">
        <div className="lg:col-span-1 lg:pr-6">
          <Link href={`/${locale}`} aria-label="NFCTEC">
            <Logo className="h-10 w-auto" />
          </Link>
          <p className="mt-4 text-sm leading-6 text-muted">{labels.rights}</p>
          <div className="mt-6 h-px w-16 bg-accent" />
          <Link href={localizeHref("/contact", locale)} className="mt-6 inline-flex items-center text-sm font-semibold text-accent hover:text-accent-dark">
            {labels.talk} <span className="ml-2" aria-hidden>→</span>
          </Link>
        </div>
        {items.map((column) => (
          <div key={column.id}>
            <Link href={localizeHref(column.href, locale)} className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink">
              {column.label}
            </Link>
            <ul className="mt-4 grid gap-2.5">
              {column.children.map((child) => (
                <li key={child.id}>
                  {child.external ? (
                    <a href={child.href} target="_blank" rel="noreferrer" className="text-sm text-muted hover:text-ink">
                      {child.label} <span className="text-[10px]" aria-hidden>↗</span>
                    </a>
                  ) : (
                    <Link href={localizeHref(child.href, locale)} className="text-sm text-muted hover:text-ink">
                      {child.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="public-shell flex flex-col gap-2 py-5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NFCTEC</p>
          <p>Software · Hardware · Cloud</p>
        </div>
      </div>
    </footer>
  );
}
