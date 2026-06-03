import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, Code2, Radio, Server, Smartphone } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "产品 & 解决方案 — NFCTec" },
      { name: "description", content: "完整的 NFC/RFID 端到端方案：智能标签、UHF 标签、读写设备与云平台。" },
      { property: "og:title", content: "Products & Solutions — NFCTec" },
      { property: "og:description", content: "End-to-end NFC/RFID across silicon, devices and cloud." },
    ],
  }),
  component: Products,
});

function Products() {
  const { tr, lang } = useI18n();

  const items = [
    {
      key: "1", icon: Radio,
      tag: tr("prod.1.tag"), title: tr("prod.1.title"), desc: tr("prod.1.desc"),
      specs: lang === "zh"
        ? [["频段", "13.56 MHz"], ["芯片", "NTAG 213/215/216 · Mifare · DESFire"], ["读取距离", "0 – 10 cm"], ["温度", "-40 ~ 85°C"]]
        : [["Frequency", "13.56 MHz"], ["Chip", "NTAG 213/215/216 · Mifare · DESFire"], ["Read range", "0 – 10 cm"], ["Temp", "-40 ~ 85°C"]],
    },
    {
      key: "2", icon: Smartphone,
      tag: tr("prod.2.tag"), title: tr("prod.2.title"), desc: tr("prod.2.desc"),
      specs: lang === "zh"
        ? [["标准", "ISO 14443 A/B · ISO 15693"], ["形态", "桌面 / 嵌入式 / 手持"], ["接口", "USB · UART · BT · Ethernet"], ["模组", "PN532 / PN5180"]]
        : [["Standards", "ISO 14443 A/B · ISO 15693"], ["Form", "Desktop / Embedded / Handheld"], ["Interface", "USB · UART · BT · Ethernet"], ["Module", "PN532 / PN5180"]],
    },
    {
      key: "3", icon: Code2,
      tag: tr("prod.3.tag"), title: tr("prod.3.title"), desc: tr("prod.3.desc"),
      specs: lang === "zh"
        ? [["平台", "Android · iOS · Windows · Linux"], ["能力", "读写 · 加密认证 · HCE"], ["安全", "AES-128 · 3DES · SUN"], ["语言", "Java · Kotlin · Swift · C/C++"]]
        : [["Platform", "Android · iOS · Windows · Linux"], ["Features", "R/W · Mutual auth · HCE"], ["Security", "AES-128 · 3DES · SUN"], ["Lang", "Java · Kotlin · Swift · C/C++"]],
    },
    {
      key: "4", icon: Server,
      tag: tr("prod.4.tag"), title: tr("prod.4.title"), desc: tr("prod.4.desc"),
      specs: lang === "zh"
        ? [["架构", "Kubernetes 弹性集群"], ["标签管理", "千万级一物一码"], ["接口", "REST · Webhook · MQTT"], ["可用性", "99.99% SLA"]]
        : [["Architecture", "Kubernetes cluster"], ["Tag mgmt", "10M+ unique IDs"], ["APIs", "REST · Webhook · MQTT"], ["SLA", "99.99%"]],
    },
  ];

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
            / {tr("nav.products")}
          </div>
          <h1 className="font-display text-5xl lg:text-7xl tracking-tight max-w-4xl text-balance">
            {tr("ppage.title")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{tr("ppage.sub")}</p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-6">
          {items.map((p, i) => {
            const Icon = p.icon;
            const reverse = i % 2 === 1;
            return (
              <article
                key={p.key}
                className="grid lg:grid-cols-2 gap-px bg-border border border-border rounded-3xl overflow-hidden"
              >
                <div className={`bg-card p-10 lg:p-14 ${reverse ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-11 h-11 rounded-xl bg-foreground text-background grid place-items-center">
                      <Icon size={18} />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      0{p.key} · {p.tag}
                    </div>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl tracking-tight mb-4">{p.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">{p.desc}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary group"
                  >
                    {tr("hero.cta2")}
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="bg-surface p-10 lg:p-14">
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
                    {tr("ppage.spec")}
                  </div>
                  <dl className="divide-y divide-border">
                    {p.specs.map(([k, v]) => (
                      <div key={k} className="py-4 flex items-baseline justify-between gap-6">
                        <dt className="text-sm text-muted-foreground font-mono">{k}</dt>
                        <dd className="text-sm font-medium text-right">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
