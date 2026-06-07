import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import logoAsset from "@/assets/nfctec-logo.png.asset.json";

export function Footer() {
  const { tr } = useI18n();

  const cols: { title: string; links: { to: string; label: string }[] }[] = [
    {
      title: tr("foot.product"),
      links: [
        { to: "/products", label: tr("nav.products.sw") },
        { to: "/products", label: tr("nav.products.hw") },
        { to: "/platform", label: tr("nav.platform") },
      ],
    },
    {
      title: tr("foot.solution"),
      links: [
        { to: "/solutions", label: tr("ind.banking.t") },
        { to: "/solutions", label: tr("ind.transit.t") },
        { to: "/solutions", label: tr("ind.gov.t") },
        { to: "/solutions", label: tr("ind.access.t") },
      ],
    },
    {
      title: tr("foot.resource"),
      links: [
        { to: "/downloads", label: tr("nav.downloads") },
        { to: "/blog", label: tr("nav.blog") },
        { to: "/platform", label: tr("tools.emv.t") },
        { to: "/platform", label: tr("tools.apdu.t") },
      ],
    },
    {
      title: tr("foot.company"),
      links: [
        { to: "/about", label: tr("nav.about") },
        { to: "/contact", label: tr("nav.contact") },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <img src={logoAsset.url} alt="NFCTEC" className="h-9 w-auto" />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              {tr("brand.tagline")}
            </p>
            <p className="mt-6 text-xs font-mono text-muted-foreground">{tr("foot.addr")}</p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold mb-4 text-foreground">{c.title}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link>
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
