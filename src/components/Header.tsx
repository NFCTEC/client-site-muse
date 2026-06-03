import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Menu, X } from "lucide-react";

export function Header() {
  const { tr, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/", label: tr("nav.home") },
    { to: "/products", label: tr("nav.products") },
    { to: "/about", label: tr("nav.about") },
    { to: "/contact", label: tr("nav.contact") },
  ] as const;

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-foreground text-background grid place-items-center font-display font-bold text-sm">
            N
          </div>
          <span className="font-display font-semibold tracking-tight text-[15px]">
            {tr("brand.name")}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors border border-border rounded-full px-3 py-1.5"
            aria-label="Switch language"
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/85 transition-colors"
          >
            {tr("nav.cta")}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 -mr-2"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-foreground text-background px-4 py-2.5 text-sm font-medium"
            >
              {tr("nav.cta")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
