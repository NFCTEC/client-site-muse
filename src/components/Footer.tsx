import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { tr } = useI18n();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-foreground text-background grid place-items-center font-display font-bold text-sm">
                N
              </div>
              <span className="font-display font-semibold tracking-tight">{tr("brand.name")}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              {tr("brand.tagline")}
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-medium mb-4">{tr("nav.products")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-foreground">{tr("prod.1.tag")}</Link></li>
              <li><Link to="/products" className="hover:text-foreground">{tr("prod.2.tag")}</Link></li>
              <li><Link to="/products" className="hover:text-foreground">{tr("prod.3.tag")}</Link></li>
              <li><Link to="/products" className="hover:text-foreground">{tr("prod.4.tag")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-medium mb-4">{tr("nav.contact")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>hello@nfctec.com</li>
              <li>+86 755 8888 1234</li>
              <li className="text-xs leading-relaxed">{tr("footer.addr")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">{tr("footer.rights")}</p>
          <p className="text-xs text-muted-foreground font-mono">ISO 9001 · ISO 14001 · NXP Authorized Partner</p>
        </div>
      </div>
    </footer>
  );
}
