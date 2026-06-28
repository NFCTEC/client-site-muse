import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  ArrowRight, Code2, Cpu, CreditCard, Smartphone, Server, Key,
  Usb, Boxes, Tablet, Terminal, Layers, Radio, Wallet,
} from "lucide-react";

export const Route = createFileRoute("/$locale/products/")({
  component: Products,
});

type Item = {
  icon: typeof Code2;
  k: string;
  to?: string;
};

function Products() {
  const { tr } = useI18n();
  const { locale } = Route.useParams();
  const [tab, setTab] = useState<"sw" | "hw">("sw");

  const software: Item[] = [
    { icon: Code2, k: "sw.1" },
    { icon: CreditCard, k: "sw.2" },
    { icon: Layers, k: "sw.3" },
    { icon: Smartphone, k: "sw.4" },
    { icon: Key, k: "sw.5" },
    { icon: Server, k: "sw.6" },
    { icon: Wallet, k: "sw.7" },
  ];

  const hardware: Item[] = [
    { icon: Usb, k: "hw.1" },
    { icon: Cpu, k: "hw.2" },
    { icon: Tablet, k: "hw.3" },
    { icon: Terminal, k: "hw.4", to: "/$locale/products/nfc-field-detector" },
    { icon: Boxes, k: "hw.5" },
    { icon: Radio, k: "hw.6" },
  ];

  const items = tab === "sw" ? software : hardware;

  return (
    <>
      <section className="relative pt-24 lg:pt-32 pb-16">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight max-w-4xl text-balance">
            {tr("ppage.title")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{tr("ppage.sub")}</p>

          <div className="mt-10 inline-flex rounded-full border border-border bg-surface/60 p-1">
            {(["sw", "hw"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                  tab === k
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tr(k === "sw" ? "ppage.sw" : "ppage.hw")}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((p, i) => {
              const Icon = p.icon;
              const ctaTo = p.to ?? "/$locale/contact";
              const ctaLabel = p.to ? tr("hero.cta1") : tr("hero.cta2");
              return (
                <div
                  key={p.k}
                  className="card-glow group relative rounded-2xl border border-border bg-card-gradient p-7 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {tr(`${p.k}.t` as never)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {tr(`${p.k}.d` as never)}
                  </p>
                  <Link
                    to={ctaTo}
                    params={{ locale }}
                    className="text-xs font-mono text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    {ctaLabel} <ArrowRight size={12} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
