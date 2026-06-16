import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, BatteryCharging, CreditCard, Wrench, Radio } from "lucide-react";

export const Route = createFileRoute("/products/nfc-field-detector")({
  head: () => ({
    meta: [
      { title: "NFC Signal Detection Card — 15 LED Field Tester | NFCTEC" },
      { name: "description", content: "Pocket-size NFC field status card with 15 LED indicators. Visually verify reader RF field strength on-site — no battery, no data storage, ISO card form factor." },
      { property: "og:title", content: "NFC Signal Detection Card — NFCTEC" },
      { property: "og:description", content: "15-LED field tester for 13.56 MHz NFC / RFID readers." },
      { property: "og:image", content: "https://m.media-amazon.com/images/I/61ekYw88WyL._AC_SX679_.jpg" },
    ],
  }),
  component: ProductPage,
});

const productImages = [
  { src: "https://m.media-amazon.com/images/I/61ekYw88WyL._AC_SX679_.jpg", label: { en: "Front", zh: "正面" } },
  { src: "https://m.media-amazon.com/images/I/418FHh99LQL._AC_SX679_.jpg", label: { en: "Back", zh: "背面" } },
];

function ProductPage() {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const features = [
    {
      icon: Zap,
      title: t("15 LED Indicator Array", "15 颗 LED 指示阵列"),
      desc: t(
        "Bright red LEDs light up the moment the card enters an active 13.56 MHz field — the more LEDs lit, the stronger the field.",
        "进入 13.56 MHz 有效射频场即点亮,亮起的 LED 越多,说明场强越强,直观可视。",
      ),
    },
    {
      icon: BatteryCharging,
      title: t("No Battery Required", "无需电池"),
      desc: t(
        "Fully powered by the reader's RF field — no charging, no battery replacement, no maintenance.",
        "完全由读卡器射频场供电,无需充电、无需更换电池、免维护。",
      ),
    },
    {
      icon: CreditCard,
      title: t("ISO Card Form Factor", "标准 ISO 卡片尺寸"),
      desc: t(
        "Standard 85.6 × 54 mm PVC card (3.35 × 2.13 × 0.03 in) — fits any wallet, badge holder or toolkit.",
        "标准 85.6 × 54 mm PVC 卡片(3.35 × 2.13 × 0.03 英寸),钱包、工牌套、工具包都能放。",
      ),
    },
    {
      icon: Radio,
      title: t("Non-Data, Pure RF Test", "纯射频检测,无数据存储"),
      desc: t(
        "No chip memory, no UID, no protocol exchange — only field detection. Perfect for testing readers without polluting logs.",
        "不存数据、无 UID、不参与协议交互,仅用于场检测。测试读卡器时不会污染日志。",
      ),
    },
    {
      icon: Wrench,
      title: t("Built for Field Engineers", "为现场工程师而生"),
      desc: t(
        "Diagnose dead readers, locate antenna sweet spots, validate kiosk and POS installs, compare field uniformity across gates.",
        "排查故障读卡器、寻找天线最佳位置、验证自助机与 POS 安装、对比闸机之间的场均匀性。",
      ),
    },
    {
      icon: CheckCircle2,
      title: t("Quality-Assured", "出厂品质保证"),
      desc: t(
        "100% functional test per card before shipment. Repeatable, consistent readings across the production batch.",
        "每张卡片出厂前 100% 功能测试,批次间读数稳定一致。",
      ),
    },
  ];

  const specs: [string, string][] = [
    [t("Operating Frequency", "工作频率"), "13.56 MHz (HF / NFC)"],
    [t("Compatible Protocols", "兼容协议"), "ISO 14443 A/B, ISO 15693, NFC Forum"],
    [t("Indicator", "指示方式"), t("15 × red LED array", "15 颗红色 LED 阵列")],
    [t("Power", "供电方式"), t("RF field harvested — no battery", "射频场取电 —— 无需电池")],
    [t("Dimensions", "外形尺寸"), "85.6 × 54 × 0.76 mm (3.35 × 2.13 × 0.03 in)"],
    [t("Material", "材质"), t("PVC, matte black", "PVC,哑光黑色")],
    [t("Weight", "重量"), "~5 g"],
    [t("Data Storage", "数据存储"), t("None — pure field detector", "无 —— 纯场检测器")],
    [t("Operating Temperature", "工作温度"), "-20 °C ~ +60 °C"],
    [t("MOQ", "起订量"), t("1 piece (sample) / 100 pcs bulk", "1 张(样品)/ 100 张起批")],
  ];

  const useCases = [
    t("Verify a reader is powered and radiating before further debug.", "在深入排查前,快速确认读卡器是否上电并正常辐射。"),
    t("Map the antenna sweet spot on POS terminals, kiosks and access readers.", "标定 POS、自助机、门禁读卡器的天线最佳读取位置。"),
    t("Compare RF field strength across gate lanes in transit stations.", "对比地铁/公交闸机各通道之间的射频场强。"),
    t("On-site installation acceptance for hotel, office and parking access systems.", "酒店、办公、停车场门禁系统的现场安装验收。"),
    t("Quickly distinguish reader faults from card / tag faults in the field.", "现场快速区分读卡器故障与卡片/标签故障。"),
    t("Production line QA for reader assembly and RF tuning.", "读卡器产线装配与射频调试的品质检验。"),
  ];

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-24 lg:pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link to="/products" className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={12} /> {t("Back to Products", "返回产品列表")}
          </Link>
        </div>
      </section>

      {/* Hero — gallery + summary */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Gallery */}
          <div>
            <div className="relative rounded-2xl border border-border bg-surface/40 overflow-hidden aspect-square grid place-items-center p-8">
              <img
                src={gallery[active]}
                alt={t("NFC Signal Detection Card", "NFC 信号检测卡")}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="mt-4 grid grid-cols-6 gap-2">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  className={`aspect-square rounded-lg border overflow-hidden bg-surface/40 grid place-items-center p-1 transition-all ${
                    active === i ? "border-primary shadow-glow" : "border-border hover:border-primary/40"
                  }`}
                >
                  <img src={src} alt="" className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-primary border border-primary/30 rounded-full px-3 py-1 mb-5">
              <Radio size={12} /> {t("HARDWARE / FIELD TESTER", "硬件 / 现场检测工具")}
            </div>
            <h1 className="font-display text-4xl lg:text-5xl tracking-tight text-balance">
              {t("NFC Signal Detection Card", "NFC 信号检测卡")}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              {t(
                "15-LED RF field tester · 13.56 MHz · ISO card · battery-free",
                "15 颗 LED 射频场检测卡 · 13.56 MHz · ISO 标准卡片 · 无需电池",
              )}
            </p>

            <p className="mt-6 text-lg leading-relaxed">
              {t(
                "A pocket-size diagnostic card that lights up its 15 LEDs whenever it enters an active 13.56 MHz NFC field. Slip it across a reader, gate, kiosk or POS terminal and instantly see whether RF is present — and how strong it is — without any host, app, battery or chip.",
                "口袋大小的诊断工具卡,只要进入 13.56 MHz 有效 NFC 射频场,15 颗 LED 就会亮起。在读卡器、闸机、自助机或 POS 终端上一刷,无需电脑、无需 App、无需电池、无需芯片,就能直观看到是否有射频以及场强大小。",
              )}
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              {[
                t("15 bright LEDs — visualize field presence and strength", "15 颗高亮 LED —— 直观显示场存在与强度"),
                t("No battery, no charging, no maintenance", "无电池、无需充电、免维护"),
                t("ISO 7810 ID-1 card size — fits any wallet or toolkit", "ISO 7810 ID-1 卡片尺寸 —— 任意钱包或工具包均可携带"),
                t("Non-data card — won't interfere with reader logs", "无数据卡 —— 不会污染读卡器日志"),
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-glow hover:opacity-90 transition-opacity"
              >
                {t("Request a Quote", "获取报价")} <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary/40 transition-colors"
              >
                {t("Order a Sample", "申请样品")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-mono text-primary mb-3">{t("KEY FEATURES", "核心特性")}</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-tight">
              {t("Made for the engineers who chase RF problems.", "为追查射频问题的工程师而打造。")}
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card-glow rounded-2xl border border-border bg-card-gradient p-7">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center mb-5">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specs + Use cases */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-xs font-mono text-primary mb-3">{t("SPECIFICATIONS", "规格参数")}</p>
            <h2 className="font-display text-3xl tracking-tight mb-8">
              {t("Technical specs", "技术规格")}
            </h2>
            <dl className="divide-y divide-border border border-border rounded-2xl overflow-hidden bg-surface/40">
              {specs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-5 gap-4 px-5 py-3 text-sm">
                  <dt className="col-span-2 text-muted-foreground">{k}</dt>
                  <dd className="col-span-3 font-mono">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="text-xs font-mono text-primary mb-3">{t("WHERE IT'S USED", "适用场景")}</p>
            <h2 className="font-display text-3xl tracking-tight mb-8">
              {t("Use cases", "典型用途")}
            </h2>
            <ul className="space-y-4">
              {useCases.map((u, i) => (
                <li key={u} className="flex gap-4 rounded-xl border border-border bg-surface/40 p-5">
                  <span className="font-mono text-xs text-primary shrink-0 mt-0.5">0{i + 1}</span>
                  <span className="text-sm leading-relaxed">{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 border-t border-border">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-balance">
            {t(
              "Stock up your field kit — and ship readers with confidence.",
              "为现场工具包补货 —— 让您的读卡器交付更有底气。",
            )}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t(
              "Bulk pricing, custom branding and private-label options available.",
              "提供批量价格、定制品牌与贴牌方案。",
            )}
          </p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-glow hover:opacity-90 transition-opacity"
            >
              {t("Talk to Sales", "联系销售")} <ArrowRight size={14} />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium hover:border-primary/40 transition-colors"
            >
              {t("Browse all hardware", "查看全部硬件")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
