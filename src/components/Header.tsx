import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Menu, X, ChevronDown } from "lucide-react";
import logoAsset from "@/assets/nfctec-logo.png.asset.json";

const industryLinks = [
  { key: "ind.banking", slug: "banking" },
  { key: "ind.transit", slug: "transit" },
  { key: "ind.gov", slug: "gov" },
  { key: "ind.access", slug: "access" },
  { key: "ind.health", slug: "health" },
  { key: "ind.iot", slug: "iot" },
  { key: "ind.brand", slug: "brand" },
  { key: "ind.retail", slug: "retail" },
  { key: "ind.auto", slug: "auto" },
  { key: "ind.wallet", slug: "wallet" },
] as const;

export function Header() {
  const { tr, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const navItems: { to: string; label: string; key: "plain" | "products" | "solutions" }[] = [
    { to: "/", label: tr("nav.home"), key: "plain" },
    { to: "/products", label: tr("nav.products"), key: "products" },
    { to: "/solutions", label: tr("nav.solutions"), key: "solutions" },
    { to: "/platform", label: tr("nav.platform"), key: "plain" },
    { to: "/downloads", label: tr("nav.downloads"), key: "plain" },
    { to: "/blog", label: tr("nav.blog"), key: "plain" },
    { to: "/about", label: tr("nav.about"), key: "plain" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="NFCTEC home">
          <img src={logoAsset.url} alt="NFCTEC" className="h-9 w-auto" />
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
                        <Link to="/products"
                          className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-elevated hover:text-primary">
                          {tr("nav.products.sw")}
                        </Link>
                        <Link to="/products"
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
                        {industryLinks.map((item) => (
                          <Link
                            key={item.key}
                            to="/solutions/$slug"
                            params={{ slug: item.slug }}
                            onClick={() => setSolOpen(false)}
                            className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-elevated hover:text-primary"
                          >
                            {tr(`${item.key}.t` as never)}
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
          <a
            href="https://platform.nfctec.com"
            className="hidden md:inline-flex items-center rounded-full border border-border bg-surface/50 px-4 py-2 text-sm font-semibold hover:border-primary/50 transition-colors"
          >
            Sign In
          </a>
          <a
            href="https://platform.nfctec.com"
            className="hidden md:inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:shadow-glow transition-all"
          >
            Get Started
          </a>
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
