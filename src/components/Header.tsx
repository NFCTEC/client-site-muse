import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Menu, X, ChevronDown } from "lucide-react";

const industryKeys = [
  "ind.banking", "ind.transit", "ind.gov", "ind.access", "ind.health",
  "ind.iot", "ind.brand", "ind.retail", "ind.auto", "ind.edu",
] as const;

export function Header() {
  const { tr, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const navItems: { to: string; label: string; key: "plain" | "products" | "solutions" }[] = [
    { to: "/products", label: tr("nav.products"), key: "products" },
    { to: "/solutions", label: tr("nav.solutions"), key: "solutions" },
    { to: "/platform", label: tr("nav.platform"), key: "plain" },
    { to: "/downloads", label: tr("nav.downloads"), key: "plain" },
    { to: "/blog", label: tr("nav.blog"), key: "plain" },
    { to: "/about", label: tr("nav.about"), key: "plain" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display font-bold text-xl tracking-tight">
            <span className="text-foreground">nfc</span>
            <span className="text-cyan-gradient">tec</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((l) => {
            const active = path === l.to || (l.to !== "/" && path.startsWith(l.to));
            if (l.key === "products") {
              return (
                <div
                  key={l.to}
                  className="relative"
                  onMouseEnter={() => setProdOpen(true)}
                  onMouseLeave={() => setProdOpen(false)}
                >
                  <Link
                    to={l.to}
                    className={`inline-flex items-center gap-1 text-sm transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label} <ChevronDown size={14} />
                  </Link>
                  {prodOpen && (
                    <div className="absolute top-full left-0 pt-3">
                      <div className="rounded-xl border border-border bg-popover shadow-float p-2 min-w-[180px]">
                        <Link to="/products" search={{ tab: "sw" } as never}
                          className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-elevated hover:text-primary">
                          {tr("nav.products.sw")}
                        </Link>
                        <Link to="/products" search={{ tab: "hw" } as never}
                          className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-elevated hover:text-primary">
                          {tr("nav.products.hw")}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            if (l.key === "solutions") {
              return (
                <div
                  key={l.to}
                  className="relative"
                  onMouseEnter={() => setSolOpen(true)}
                  onMouseLeave={() => setSolOpen(false)}
                >
                  <Link
                    to={l.to}
                    className={`inline-flex items-center gap-1 text-sm transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label} <ChevronDown size={14} />
                  </Link>
                  {solOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                      <div className="rounded-xl border border-border bg-popover shadow-float p-3 grid grid-cols-2 gap-1 min-w-[420px]">
                        {industryKeys.map((k) => (
                          <Link
                            key={k}
                            to="/solutions"
                            hash={k}
                            className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-elevated hover:text-primary"
                          >
                            {tr(`${k}.t` as never)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
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
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors border border-border rounded-full px-3 py-1.5"
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:shadow-glow transition-all"
          >
            {tr("nav.contact")}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 -mr-2 text-foreground"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navItems.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground py-1"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold"
            >
              {tr("nav.contact")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
