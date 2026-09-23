"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, locales, type Locale } from "@/i18n/config";
import type { NavNode } from "@/lib/content";
import { Logo } from "./logo";

export function Header({ locale, items, labels }: { locale: Locale; items: NavNode[]; labels: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const emphasis = items.find((item) => item.emphasis);
  const links = items.filter((item) => !item.emphasis);

  useEffect(() => {
    setOpen(false);
    headerRef.current?.querySelectorAll("details[open]").forEach((details) => details.removeAttribute("open"));
  }, [pathname]);

  useEffect(() => {
    const closeMenus = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      headerRef.current?.querySelectorAll("details[open]").forEach((details) => details.removeAttribute("open"));
      setOpen(false);
    };
    document.addEventListener("pointerdown", closeMenus);
    return () => document.removeEventListener("pointerdown", closeMenus);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-line bg-white shadow-[0_1px_0_rgba(18,21,45,0.02)]">
      <a href="#main-content" className="fixed left-3 top-3 z-50 -translate-y-20 rounded-md bg-ink px-4 py-2 text-sm text-white focus:translate-y-0">
        {labels.skip}
      </a>
      <div className="public-shell flex h-[76px] items-center gap-3">
        <Link href={`/${locale}`} className="shrink-0" aria-label="NFCTEC">
          <Logo className="h-[42px] w-auto" priority />
        </Link>
        <nav className="ml-5 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {links.map((item) => (
            <NavBranch key={item.id} item={item} locale={locale} pathname={pathname} />
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LocaleMark locale={locale} pathname={pathname} />
          <Link href={localizeHref("/search", locale)} className="hidden px-2 py-2 text-[13px] text-muted hover:text-ink md:inline">
            {labels.search}
          </Link>
          {emphasis ? (
            <Link
              href={localizeHref(emphasis.href, locale)}
              className="btn btn-primary hidden lg:inline-flex"
            >
              {emphasis.label}
            </Link>
          ) : null}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? labels.close : labels.menu}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6px] h-px w-5 bg-current ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-3 h-px w-5 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-line bg-white px-4 py-4 shadow-xl lg:hidden"
          aria-label="Mobile"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          <div className="mx-auto max-w-xl">
            {links.map((item) => (
              <MobileBranch key={item.id} item={item} locale={locale} onNavigate={() => setOpen(false)} />
            ))}
            <div className="mt-4 flex items-center justify-between gap-3">
              <LocaleMark locale={locale} pathname={pathname} />
              {emphasis ? <Link href={localizeHref(emphasis.href, locale)} className="btn btn-primary" onClick={() => setOpen(false)}>{emphasis.label}</Link> : null}
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

const localeMarks: Record<Locale, string> = { en: "EN", zh: "中" };

function LocaleMark({ locale, pathname }: { locale: Locale; pathname: string }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[12px] tracking-[0.08em]" aria-label="Language">
      {locales.map((code, index) => {
        const href = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${code}`) || `/${code}`;
        const active = code === locale;
        return (
          <span key={code} className="flex items-center gap-1.5">
            {index > 0 ? <span className="text-[#c8cad6]" aria-hidden>/</span> : null}
            {active ? (
              <span className="text-ink" aria-current="true">{localeMarks[code]}</span>
            ) : (
              <Link href={href} hrefLang={code} className="text-muted hover:text-ink">{localeMarks[code]}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
}

function NavBranch({ item, locale, pathname }: { item: NavNode; locale: Locale; pathname: string }) {
  const href = localizeHref(item.href, locale);
  const closeBranch = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };
  if (!item.children.length) {
    return (
      <Link href={href} className="rounded-md px-3 py-2 text-[13px] font-medium text-[#34384e] hover:bg-paper hover:text-accent" aria-current={pathname === href ? "page" : undefined}>
        {item.label}
      </Link>
    );
  }
  return (
    <details
      className="relative"
      onToggle={(event) => {
        const current = event.currentTarget;
        if (!current.open) return;
        current.closest("nav")?.querySelectorAll("details[open]").forEach((details) => {
          if (details !== current) details.removeAttribute("open");
        });
      }}
    >
      <summary className="cursor-pointer rounded-md px-3 py-2 text-[13px] font-medium text-[#34384e] hover:bg-paper hover:text-accent">
        {item.label} <span className="ml-1 text-[10px] text-muted">⌄</span>
      </summary>
      <div className="absolute left-0 top-[calc(100%+10px)] z-20 w-72 rounded-xl border border-line bg-white p-2 shadow-[0_22px_55px_rgba(18,21,45,0.14)]">
        <Link href={href} className="block px-3 py-2 text-sm font-medium" onClick={closeBranch}>
          {item.label}
        </Link>
        {item.children.map((child) => (
          <div key={child.id} className="border-t border-line/70">
            <Link href={localizeHref(child.href, locale)} className="block px-3 py-2 text-sm" onClick={closeBranch}>
              {child.label}
            </Link>
            {child.children.map((grand) => (
              <Link key={grand.id} href={localizeHref(grand.href, locale)} className="block px-6 py-1.5 text-sm text-muted" onClick={closeBranch}>
                {grand.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </details>
  );
}

function MobileBranch({ item, locale, onNavigate }: { item: NavNode; locale: Locale; onNavigate: () => void }) {
  return (
    <div className="border-b border-line py-2.5">
      <Link href={localizeHref(item.href, locale)} className="block py-2 text-lg font-semibold" onClick={onNavigate}>
        {item.label}
      </Link>
      {item.children.map((child) => (
        <div key={child.id} className="pl-3">
          <Link href={localizeHref(child.href, locale)} className="block py-1.5 text-sm" onClick={onNavigate}>
            {child.label}
          </Link>
          {child.children.map((grand) => (
            <Link key={grand.id} href={localizeHref(grand.href, locale)} className="block py-1 pl-3 text-sm text-muted" onClick={onNavigate}>
              {grand.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
