import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useLocale } from "@/hooks/useLocale";
import { Youtube, ShoppingBag, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";

const AMAZON_STORE = "https://www.amazon.com/s?k=SZLEJUN&ref=bl_dp_s_web_0";
const YOUTUBE_URL = "https://youtube.com/@lejuntech";
const SALES_EMAIL = "sale@nfctec.com";

export function Footer() {
  const { tr } = useI18n();
  const locale = useLocale();

  type FooterLink =
    | { to: "/$locale/products"; label: string; search: { tab: "sw" | "hw" } }
    | { to: "/$locale/solutions/$slug"; label: string; slug: string }
    | { to: string; label: string };

  const cols: { title: string; links: FooterLink[] }[] = [
    {
      title: tr("foot.product"),
      links: [
        { to: "/$locale/products", label: tr("nav.products.sw"), search: { tab: "sw" } },
        { to: "/$locale/products", label: tr("nav.products.hw"), search: { tab: "hw" } },
        { to: "/$locale/platform", label: tr("nav.platform") },
      ],
    },
    {
      title: tr("foot.solution"),
      links: [
        { to: "/$locale/solutions/$slug", label: tr("ind.banking.t"), slug: "banking" },
        { to: "/$locale/solutions/$slug", label: tr("ind.transit.t"), slug: "transit" },
        { to: "/$locale/solutions/$slug", label: tr("ind.gov.t"), slug: "gov" },
        { to: "/$locale/solutions/$slug", label: tr("ind.access.t"), slug: "access" },
      ],
    },
    {
      title: tr("foot.resource"),
      links: [
        { to: "/$locale/downloads", label: tr("nav.downloads") },
        { to: "/$locale/blog", label: tr("nav.blog") },
        { to: "/$locale/platform", label: tr("tools.emv.t") },
        { to: "/$locale/platform", label: tr("tools.apdu.t") },
      ],
    },
    {
      title: tr("foot.company"),
      links: [
        { to: "/$locale/about", label: tr("nav.about") },
        { to: "/$locale/contact", label: tr("nav.contact") },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/$locale" params={{ locale }}>
              <Logo className="h-12 w-auto max-w-[260px]" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              {tr("brand.tagline")}
            </p>
            <p className="mt-6 text-xs font-mono text-muted-foreground">{tr("foot.addr")}</p>
            <div className="mt-5 flex items-center gap-2.5">
              <a href={`mailto:${SALES_EMAIL}`} aria-label="Email Sales" className="w-9 h-9 grid place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                <Mail size={15} />
              </a>
              <a href={AMAZON_STORE} target="_blank" rel="noreferrer" aria-label="Amazon Store" className="w-9 h-9 grid place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground hover:text-[#FF9900] hover:border-[#FF9900]/40 transition-colors">
                <ShoppingBag size={15} />
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" aria-label="YouTube" className="w-9 h-9 grid place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground hover:text-[#FF0000] hover:border-[#FF0000]/40 transition-colors">
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold mb-4 text-foreground">{c.title}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {"slug" in l ? (
                      <Link
                        to={l.to}
                        params={{ locale, slug: l.slug }}
                        className="hover:text-primary transition-colors"
                      >
                        {l.label}
                      </Link>
                    ) : "search" in l ? (
                      <Link
                        to={l.to}
                        params={{ locale }}
                        search={l.search}
                        className="hover:text-primary transition-colors"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <Link to={l.to} params={{ locale }} className="hover:text-primary transition-colors">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">{tr("foot.rights")}</p>
          <p className="text-xs text-muted-foreground font-mono">
            ISO 9001 · PCI-PTS · EMV L1/L2 · NXP Partner
          </p>
        </div>
      </div>
    </footer>
  );
}
