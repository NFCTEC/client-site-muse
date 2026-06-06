import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import {
  Wallet, Train, Landmark, KeyRound, HeartPulse, Boxes,
  ShieldCheck, ShoppingBag, Car, GraduationCap, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Industry Solutions — NFCTEC" },
      { name: "description", content: "End-to-end NFC solutions for banking, transit, government, IoT, brand protection and more." },
      { property: "og:title", content: "Industry Solutions — NFCTEC" },
      { property: "og:description", content: "Proven NFC playbooks across 10 industries." },
    ],
  }),
  component: Solutions,
});

const industries = [
  { icon: Wallet, k: "ind.banking", features: ["EMV Contact + Contactless", "Tokenization & HCE", "PCI-PTS terminals", "HSM key management"] },
  { icon: Train, k: "ind.transit", features: ["CALYPSO ticketing", "MIFARE DESFire", "Gate reader integration", "Account-based ticketing"] },
  { icon: Landmark, k: "ind.gov", features: ["ePassport ICAO 9303", "Resident ID cards", "Driver license", "PKI / eID middleware"] },
  { icon: KeyRound, k: "ind.access", features: ["DESFire EV3 / SEOS", "Mobile credentials", "Multi-factor auth", "Visitor management"] },
  { icon: HeartPulse, k: "ind.health", features: ["Patient wristbands", "eHealth ID card", "Drug authentication", "Cold-chain NDEF logs"] },
  { icon: Boxes, k: "ind.iot", features: ["Device pairing", "Secure provisioning", "NTAG 22x sensors", "OTA key rotation"] },
  { icon: ShieldCheck, k: "ind.brand", features: ["SUN dynamic URL", "Tamper-evident tags", "Track & trace", "Consumer engagement"] },
  { icon: ShoppingBag, k: "ind.retail", features: ["Tap-to-engage packaging", "Loyalty cards", "Inventory & EAS", "Smart shelves"] },
  { icon: Car, k: "ind.auto", features: ["CCC Digital Key", "NFC unlock & start", "Driver profile sync", "Aftermarket retrofit"] },
  { icon: GraduationCap, k: "ind.edu", features: ["Student ID + library", "Cashless canteen", "Attendance & gate", "Dorm access"] },
] as const;

function Solutions() {
  const { tr } = useI18n();

  return (
    <>
      <section className="relative pt-24 lg:pt-32 pb-16">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
            / {tr("ind.eyebrow")}
          </div>
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight max-w-4xl whitespace-pre-line text-balance">
            {tr("ind.title")}
          </h1>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-5">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <article
                key={ind.k}
                id={ind.k}
                className="card-glow grid lg:grid-cols-12 gap-px rounded-3xl border border-border bg-border overflow-hidden scroll-mt-20"
              >
                <div className="lg:col-span-5 bg-card-gradient p-10 lg:p-12">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 grid place-items-center">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} / 10
                    </span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-4">
                    {tr(`${ind.k}.t` as never)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {tr(`${ind.k}.d` as never)}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                  >
                    {tr("hero.cta2")} <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="lg:col-span-7 bg-card-gradient p-10 lg:p-12">
                  <div className="text-xs font-mono text-primary uppercase tracking-widest mb-6">
                    Key capabilities
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {ind.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-lg border border-border bg-background/40 px-4 py-3 text-sm font-mono text-foreground/80"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
