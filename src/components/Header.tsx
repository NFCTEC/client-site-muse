import { Link, useMatches, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useLocale } from "@/hooks/useLocale";
import { localePath } from "@/lib/locale";
import { getLocaleLoaderData, isModuleInNav, type ModuleKey } from "@/lib/display-config";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { Logo } from "@/components/Logo";

const PATH_MODULE: Record<string, ModuleKey | undefined> = {
  "/products": "products",
  "/solutions": "solutions",
  "/platform": "platform",
  "/downloads": "downloads",
  "/blog": "blog",
  "/contact": "contact",
};

export function Header() {
  const { tr, lang, setLang } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();
  const locale = useLocale();
  const matches = useMatches();
  const localeData = getLocaleLoaderData(matches);
  const displayConfig = localeData?.displayConfig;
  const navSolutions = localeData?.navSolutions ?? [];
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  type NavItem = { path: string; label: string; key: "plain" | "products" | "solutions" };

  const navItems = ([
    { path: "/", label: tr("nav.home"), key: "plain" },
    { path: "/products", label: tr("nav.products"), key: "products" },
    { path: "/solutions", label: tr("nav.solutions"), key: "solutions" },
    { path: "/platform", label: tr("nav.platform"), key: "plain" },
    { path: "/downloads", label: tr("nav.downloads"), key: "plain" },
    { path: "/blog", label: tr("nav.blog"), key: "plain" },
    { path: "/about", label: tr("nav.about"), key: "plain" },
    { path: "/contact", label: tr("nav.contact"), key: "plain" },
  ] as NavItem[]).filter((item) => {
    if (item.path === "/") return true;
    const mod = PATH_MODULE[item.path];
    if (!mod || !displayConfig) return true;
    return isModuleInNav(displayConfig, mod);
  });

  const isActive = (p: string) => {
    const full = localePath(locale, p);
    return path === full || (p !== "/" && path.startsWith(full));
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
        <Link to="/$locale" params={{ locale }} className="flex items-center shrink-0" aria-label="NFCTEC home">
          <Logo className="h-11 sm:h-12 w-auto max-w-[min(100vw-8rem,280px)]" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((l) => {
            const active = isActive(l.path);
            if (l.key === "products") {
              return (
                <div
                  key={l.path}
                  className="relative"
                  onMouseEnter={() => setProdOpen(true)}
                  onMouseLeave={() => setProdOpen(false)}
                >
                  <Link
                    to="/$locale/products"
                    params={{ locale }}
                    className={`inline-flex items-center gap-1 text-sm transition-colors ${
                      active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label} <ChevronDown size={14} />
                  </Link>
                  {prodOpen && (
                    <div className="absolute top-full left-0 pt-3">
                      <div className="rounded-xl border border-border bg-popover shadow-float p-2 min-w-[180px]">
                        <Link
                          to="/$locale/products"
                          params={{ locale }}
                          search={{ tab: "sw" }}
                          className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-elevated hover:text-primary"
                        >
                          {tr("nav.products.sw")}
                        </Link>
                        <Link
                          to="/$locale/products"
                          params={{ locale }}
                          search={{ tab: "hw" }}
                          className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-elevated hover:text-primary"
                        >
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
                  key={l.path}
                  className="relative"
                  onMouseEnter={() => setSolOpen(true)}
                  onMouseLeave={() => setSolOpen(false)}
                >
                  <Link
                    to="/$locale/solutions"
                    params={{ locale }}
                    className={`inline-flex items-center gap-1 text-sm transition-colors ${
                      active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label} <ChevronDown size={14} />
                  </Link>
                  {solOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                      <div className="rounded-xl border border-border bg-popover shadow-float p-3 grid grid-cols-2 gap-1 min-w-[420px]">
                        {navSolutions.map((item) => (
                          <Link
                            key={item.slug}
                            to="/$locale/solutions/$slug"
                            params={{ locale, slug: item.slug }}
                            onClick={() => setSolOpen(false)}
                            className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-elevated hover:text-primary"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            const routeTo =
              l.path === "/"
                ? { to: "/$locale" as const, params: { locale } }
                : {
                    to: `/$locale${l.path}` as "/$locale/platform",
                    params: { locale },
                  };
            return (
              <Link
                key={l.path}
                {...routeTo}
                className={`text-sm transition-colors ${
                  active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-muted-foreground hover:text-primary transition-colors border border-border rounded-full p-1.5"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors border border-border rounded-full px-3 py-1.5"
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <Link
            to="/$locale/contact"
            params={{ locale }}
            className="hidden md:inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {tr("nav.getQuote")}
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
            {navItems.map((l) => {
              const mobileTo =
                l.path === "/"
                  ? { to: "/$locale" as const, params: { locale } }
                  : l.key === "solutions"
                    ? { to: "/$locale/solutions" as const, params: { locale } }
                    : l.key === "products"
                      ? { to: "/$locale/products" as const, params: { locale } }
                      : { to: `/$locale${l.path}` as "/$locale/blog", params: { locale } };
              return (
                <Link
                  key={l.path}
                  {...mobileTo}
                  onClick={() => setOpen(false)}
                  className="text-sm text-foreground py-1"
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              to="/$locale/contact"
              params={{ locale }}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold"
            >
              {tr("nav.getQuote")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
