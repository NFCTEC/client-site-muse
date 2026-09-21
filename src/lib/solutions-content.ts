import type { Locale } from "./locale";

export type SolutionFaq = { q: string; a: string };
export type SolutionLink = { title: string; href: string };

export type SolutionEnrichment = {
  seoTitle?: string;
  seoDescription?: string;
  intro?: string;
  body?: string;
  deliverables?: string[];
  workflow?: { title: string; description: string }[];
  faqs?: SolutionFaq[];
  relatedLinks?: SolutionLink[];
};

const EN: Record<string, SolutionEnrichment> = {
  banking: {
    seoTitle: "EMV Issuance Solution for Banks | JavaCard, Tokenization, PCI — NFCTEC",
    seoDescription:
      "EMV contact and contactless issuance: JavaCard applets, PCI personalization, MDES/VTS tokenization and ISO 8583 host integration for banks and payment processors.",
    intro:
      "NFCTEC builds issuer-side payment programs from the applet to the acquirer host. The usual failure is not “we need a bank card” — it is AID selection, kernel routing, key ceremony, personalization throughput and wallet tokenization all having to line up on the same product.",
    body: `<h2>Who this solution is for</h2>
<p>Issuers, processors, personalization bureaus and wallet programs that need a production EMV product, not a demo applet. Typical briefs are dual-interface debit/credit, metal cards, co-badge schemes, and Apple Pay / Google Pay / Samsung Pay provisioning.</p>
<p>If you are still debugging GlobalPlatform LOAD/INSTALL on the bench, start with the <a href="/en/tools/javacard-tool">JavaCard Tool</a> and the <a href="/en/blog/scp02-vs-scp03-javacard-secure-channel">SCP02 vs SCP03</a> guide, then come back here for the issuance architecture.</p>
<h2>What an EMV issuance stack actually contains</h2>
<p>A payment card is several products glued together: a JavaCard SE applet (contact + contactless), issuer keys in an HSM, a bureau script that personalizes each PAN, a host that can authorize ISO 8583, and a token requestor path into MDES or VTS.</p>
<ul>
<li>Contact interface follows ISO 7816; contactless follows EMV Contactless and ISO 14443.</li>
<li>Kernel choice is not cosmetic. Mastercard M/Chip rides Kernel 2; Visa VSDC rides Kernel 3; UnionPay QUICS rides Kernel 6. Mis-ordered AID lists silently pick the wrong application.</li>
<li>CDA/DDA, IAC/TAC and risk parameters have to match the brand letter, not a generic template.</li>
</ul>
<h2>Personalization and keys</h2>
<p>PCI CP bureaus fail on ceremony and script, not on printers. We treat HSM key ceremony, KCV checks, GP secure-channel scripts and sample-card verification as one workflow. If EXTERNAL AUTHENTICATE or wrapped INSTALL dies, the status-word path is the same one documented in the JavaCard tool articles: 6982, 6985, 6A86.</p>
<h2>Wallets and host</h2>
<p>Tokenization is a second issuance. MDES, VTS and push provisioning need device account numbers, yellow-path fallbacks and issuer app UX. On the host side we specify ISO 8583 (87/93), PIN translation under HSM, and 3-D Secure 2.x ACS integration when the product is e-commerce capable.</p>`,
    deliverables: [
      "EMV contact/contactless applet package and AID/kernel mapping",
      "Issuer key ceremony pack and GP personalization scripts",
      "Sample-card test matrix (CDA/DDA, contactless timing, wallet provisioning)",
      "ISO 8583 host field map and 3DS integration notes",
      "Production support for bureau bring-up and first live BIN",
    ],
    workflow: [
      { title: "Scheme and AID design", description: "Lock brand, kernel, AID priority and metal/dual-interface constraints before code freeze." },
      { title: "Applet and keys", description: "Build/load the applet over SCP02/SCP03, run HSM ceremony, prove sample cards on reference terminals." },
      { title: "Bureau personalization", description: "GP scripts, PAN/track data, SDA/DDA/CDA, and PCI CP process on the perso line." },
      { title: "Wallet and host", description: "MDES/VTS onboarding plus acquirer/issuer host messages, then limited live BIN." },
    ],
    faqs: [
      { q: "Do you ship a complete EMV kernel?", a: "We deliver issuer applets, personalization and host mapping. Terminal kernels stay with the acquirer/terminal vendor; we align AID lists and certification evidence with that stack." },
      { q: "Can we start from a development card?", a: "Yes. Bench work uses PC/SC + GlobalPlatform. Production keys never reuse default GP transport keys." },
      { q: "How do you handle Apple Pay / Google Pay?", a: "As a tokenization workstream: MDES or VTS, push provisioning, and yellow-path tests — not as a sticker on the plastic." },
      { q: "What usually breaks first in certification?", a: "Combination Selection Table order, CDA configuration, and contactless timing. We keep a command trace for every failing case." },
    ],
    relatedLinks: [
      { title: "JavaCard Tool", href: "/en/tools/javacard-tool" },
      { title: "SCP02 vs SCP03", href: "/en/blog/scp02-vs-scp03-javacard-secure-channel" },
      { title: "Download Center", href: "/en/downloads" },
    ],
  },
  transit: {
    seoTitle: "Transit Ticketing Solution | CALYPSO, DESFire EV3, ABT — NFCTEC",
    seoDescription:
      "Metro and bus fare collection with CALYPSO Rev 3.1, MIFARE DESFire EV3, cEMV open-loop acceptance and account-based ticketing (ABT).",
    intro:
      "Transit programs fail at the gate, not in the slide deck. The stack has to clear a tap in a few hundred milliseconds, survive offline stations, and migrate riders from legacy media without stopping the network.",
    body: `<h2>Who this solution is for</h2>
<p>Metro, bus, ferry and multimodal operators that need closed-loop media, open-loop bank cards, or account-based ticketing — often all three during a migration window.</p>
<h2>Media and readers</h2>
<p>We implement CALYPSO Rev 3.1 on CD21/CD97-class chips with SAM-based key management, and MIFARE DESFire EV3 as the AES closed-loop option. Validators and gates are specified for sub-300 ms transactions, offline risk rules and deny-list sync.</p>
<p>cEMV open-loop is a different product: any contactless bank card or wallet can tap, but you still need transit kernels, delayed authorization and fare capping in the back office.</p>
<h2>Account-based ticketing</h2>
<p>ABT moves the product off the card and onto an account. The tap becomes a token. The back office resolves the token, applies best fare / capping, and settles across operators. Dual-application media is normal during cutover so old cards keep working while new cards and wallets roll out.</p>
<h2>What we refuse to hand-wave</h2>
<ul>
<li>SAM and key versions at every validator image.</li>
<li>Nightly deny-list size vs reader flash.</li>
<li>Clock skew between stations and the ABT host.</li>
<li>A documented dual-media period, not “both cards should work”. See the 90-day rollout notes in our transit case writing for the operational shape.</li>
</ul>`,
    deliverables: [
      "Fare media specification (CALYPSO and/or DESFire EV3)",
      "SAM / key hierarchy and validator image notes",
      "Gate and validator transaction timing budget",
      "ABT token-to-account mapping and fare-capping rules sketch",
      "Migration plan for dual-media operation",
    ],
    workflow: [
      { title: "Network survey", description: "Existing media, gate models, offline windows and operator settlement rules." },
      { title: "Media + SAM design", description: "AID/file layout, key sets, and reader firmware constraints." },
      { title: "Pilot line", description: "One line or depot with dual-media, timing traces and deny-list sync." },
      { title: "City rollout", description: "Night windows for gates, back-office cutover, and rider communications." },
    ],
    faqs: [
      { q: "CALYPSO or DESFire?", a: "Use what the installed base and SAM inventory already understand, unless you are building a greenfield network. Mixed fleets are common; we design for that." },
      { q: "Can we accept bank cards at the gate?", a: "Yes, as cEMV open-loop. It does not replace closed-loop media overnight — ABT and open-loop need back-office fare logic." },
      { q: "What about mobile wallets?", a: "HCE and Apple/Google Wallet transit passes are in scope, with QR as a degraded fallback, not the primary path." },
    ],
    relatedLinks: [
      { title: "MIFARE Classic to DESFire checklist", href: "/en/blog/mifare-classic-to-desfire-ev3-migration-checklist" },
      { title: "Download Center", href: "/en/downloads" },
    ],
  },
  access: {
    seoTitle: "NFC Access Control Solution | DESFire EV3, Apple Wallet Keys — NFCTEC",
    seoDescription:
      "Modern access control beyond 125 kHz: MIFARE DESFire EV3, HID Seos, Apple Wallet / Google Wallet employee badges, OSDP readers and cloud revocation.",
    intro:
      "Legacy 125 kHz and MIFARE Classic sites are being forced to move. The replacement is not “a new card” — it is diversified AES keys, mobile credentials, and the ability to revoke a badge across buildings in minutes.",
    body: `<h2>Who this solution is for</h2>
<p>Campuses, offices, hospitals and industrial sites that need DESFire EV3 or Seos credentials, Apple/Google Wallet keys, and readers that speak OSDP instead of unencrypted Wiegand.</p>
<h2>Credential design</h2>
<p>We treat AID, file IDs, access rights and key versions as a product, not a dump of sectors. Classic sector maps do not translate 1:1 onto DESFire. If you are migrating from Classic, use the <a href="/en/blog/mifare-classic-to-desfire-ev3-migration-checklist">Classic to DESFire EV3 checklist</a> before personalizing the first employee badge.</p>
<h2>Mobile keys</h2>
<p>Apple Wallet employee badges use PassKit, VAS and often Express Mode / ECP 2.0. Google Wallet uses Smart Tap objects. Readers that only sniff UIDs will not magically accept either. Firmware, reader certificates and wallet provisioning are part of the same project.</p>
<h2>Revocation</h2>
<p>OSS-SO compatible cloud key management is how you kill a lost phone without recarding the whole floor. Dual-credential periods are planned explicitly: Classic or old DESFire still works while Wallet rollout catches up.</p>`,
    deliverables: [
      "DESFire EV3 / Seos application and key design",
      "Reader firmware / OSDP secure-channel notes",
      "Apple Wallet and Google Wallet badge profiles",
      "Cloud revocation and audit export",
      "Site migration plan for dual credentials",
    ],
    workflow: [
      { title: "Site inventory", description: "Readers, panels, existing media and which doors cannot go dark." },
      { title: "Application design", description: "AIDs, files, diversified keys, and mobile vs plastic split." },
      { title: "Pilot building", description: "One site with Wallet + plastic, OSDP, and revoke tests." },
      { title: "Fleet rollout", description: "Reader images, badge personalization, and cutover of remaining Classic doors." },
    ],
    faqs: [
      { q: "Can we keep MIFARE Classic during migration?", a: "For a defined dual-credential window, yes. New doors and new hires should already be DESFire or Wallet." },
      { q: "Do Wallet keys work if the phone is in a bag?", a: "Express Mode / equivalent reader settings are a reader and pass configuration job, not a sticker on the plastic badge." },
      { q: "How fast is revocation?", a: "Cloud-side revoke is immediate; reader deny-list sync depends on the panel network. We measure both." },
    ],
    relatedLinks: [
      { title: "DESFire EV3 migration checklist", href: "/en/blog/mifare-classic-to-desfire-ev3-migration-checklist" },
      { title: "NTAG424 DNA Tool", href: "/en/tools/ntag424-tool" },
    ],
  },
  brand: {
    seoTitle: "NFC Brand Protection | NTAG 424 DNA SUN URL Verification — NFCTEC",
    seoDescription:
      "Anti-counterfeit NFC labels with NTAG 424 DNA SUN dynamic URLs, AES-CMAC verification, tamper-evident constructions and a cloud verification API.",
    intro:
      "A static NFC URL is a cloneable sticker. Brand protection only works when every tap carries a UID, a counter and an AES-CMAC that your backend can reject on replay.",
    body: `<h2>Who this solution is for</h2>
<p>Luxury, spirits, cosmetics, pharma and spare-parts brands that need per-tap authenticity, grey-market signals and a consumer landing page — without shipping a custom app for every SKU.</p>
<h2>How SUN verification works</h2>
<p>NTAG 424 DNA Secure Unique NFC (SUN) messages let the tag assemble a URL from UID, read counter and CMAC. The phone opens HTTPS; the server recomputes the MAC and checks that the counter moved. Details and a lab loop are in <a href="/en/blog/ntag424-dna-sun-url-authentication-example">NTAG424 DNA SUN URL authentication</a>.</p>
<pre><code>https://verify.example.com/a/{picc_data}?c={cmac}</code></pre>
<p>Engineering bring-up uses the <a href="/en/tools/ntag424-tool">NTAG424 DNA Tool</a> to set SDM templates, EV2 keys and a real tap before factory personalization.</p>
<h2>Labels and API</h2>
<p>We specify tamper-evident constructions (wet-inlay necks, break-on-open) and a verification API with geo/velocity rules. First-scan fencing is how grey market shows up. Consumer flows (register, warranty, reorder) sit on the same verified tap.</p>
<h2>What clones still try</h2>
<ul>
<li>Photographing a URL and reprinting it — counter check should fail on replay.</li>
<li>Copying PICC data without the key — CMAC should fail.</li>
<li>Partial URL truncation on some phones — templates must be tested on iOS and Android.</li>
</ul>`,
    deliverables: [
      "NTAG 424 DNA SDM / SUN URL template and key diversification",
      "Verification API contract (CMAC + counter)",
      "Tamper-evident label construction notes",
      "Pilot pack: sample tags, tap traces, fail-case matrix",
      "Consumer landing-page hooks for pass/fail states",
    ],
    workflow: [
      { title: "Threat model", description: "Clone, refill, grey market, and whether the line can apply wet inlay." },
      { title: "Tag + API lab", description: "EV2 keys, SUN URL, backend verify, replay tests." },
      { title: "Pilot SKU", description: "One market, real phones, geo rules, support scripts." },
      { title: "Factory personalization", description: "Batch keys, SDM mirrors, and sampling against the same API." },
    ],
    faqs: [
      { q: "Why not a QR code?", a: "QR can be photographed forever. SUN adds a per-tap counter and CMAC so a copied URL is detectable." },
      { q: "Do customers need an app?", a: "No. The phone NFC handler opens the browser. The server returns authenticity." },
      { q: "Can this replace a full MES traceability system?", a: "It proves the tap. Batch/lot and EPCIS events are optional extra, not the same product." },
    ],
    relatedLinks: [
      { title: "NTAG424 DNA Tool", href: "/en/tools/ntag424-tool" },
      { title: "SUN URL authentication example", href: "/en/blog/ntag424-dna-sun-url-authentication-example" },
      { title: "Download Center", href: "/en/downloads" },
    ],
  },
};

const ZH: Record<string, SolutionEnrichment> = {
  banking: {
    seoTitle: "银行 EMV 发卡方案 | JavaCard、令牌化、PCI — NFCTEC",
    seoDescription:
      "面向银行与发卡机构的 EMV 接触/非接发卡：JavaCard 应用、PCI 个人化、MDES/VTS 令牌化与 ISO 8583 主机对接。",
    intro:
      "NFCTEC 做的是发行方侧的支付卡工程：从应用到收单主机。真正容易失败的不是“做一张银行卡”，而是 AID 选择、内核路由、密钥仪式、个人化产能和钱包令牌化必须落在同一个产品上。",
    body: `<h2>谁适合这套方案</h2>
<p>银行、发卡处理方、个人化制卡厂和钱包项目。常见需求包括双界面借记/贷记、金属卡、双标卡，以及 Apple Pay / Google Pay / Samsung Pay 下发。</p>
<p>如果还在调试 GlobalPlatform 的 LOAD/INSTALL，先用 <a href="/zh/tools/javacard-tool">JavaCard 工具</a> 和 <a href="/zh/blog/scp02-vs-scp03-javacard-secure-channel">SCP02 vs SCP03</a> 文章把安全通道跑通，再进入发卡架构。</p>
<h2>EMV 发卡栈里到底有什么</h2>
<p>一张支付卡是多件产品粘在一起：JavaCard SE 应用（接触+非接）、HSM 里的发行方密钥、按 PAN 个人化的制卡脚本、能授权 ISO 8583 的主机，以及进入 MDES 或 VTS 的令牌路径。</p>
<ul>
<li>接触走 ISO 7816，非接走 EMV Contactless 与 ISO 14443。</li>
<li>Kernel 不能随便套。Mastercard M/Chip 是 Kernel 2，Visa VSDC 是 Kernel 3，银联 QUICS 是 Kernel 6。AID 表顺序错了会静默选错应用。</li>
<li>CDA/DDA、IAC/TAC 必须对品牌函，而不是一份通用模板。</li>
</ul>
<h2>个人化与密钥</h2>
<p>PCI CP 制卡厂死在仪式和脚本，不是死在打印机。HSM 密钥仪式、KCV、GP 安全通道脚本和样卡验证是同一条工作流。EXTERNAL AUTHENTICATE 或包装后的 INSTALL 失败时，状态字路径与 JavaCard 工具文章一致：6982、6985、6A86。</p>`,
    deliverables: [
      "EMV 接触/非接应用包与 AID/内核对照",
      "发行方密钥仪式包与 GP 个人化脚本",
      "样卡测试矩阵（CDA/DDA、非接时序、钱包下发）",
      "ISO 8583 主机字段映射与 3DS 说明",
      "制卡厂导入与首个正式 BIN 的生产支持",
    ],
    workflow: [
      { title: "品牌与 AID 设计", description: "冻结品牌、内核、AID 优先级和金属/双界面约束。" },
      { title: "应用与密钥", description: "经 SCP02/SCP03 加载应用，完成 HSM 仪式，在参考终端上验证样卡。" },
      { title: "制卡个人化", description: "GP 脚本、PAN/磁道、SDA/DDA/CDA，以及 PCI CP 产线流程。" },
      { title: "钱包与主机", description: "MDES/VTS 接入与收单/发卡主机报文，然后小流量正式 BIN。" },
    ],
    faqs: [
      { q: "你们提供完整 EMV 内核吗？", a: "我们交付发行方应用、个人化和主机映射。终端内核仍在收单/终端厂商侧；我们把 AID 表和认证证据与那套栈对齐。" },
      { q: "可以从开发卡开始吗？", a: "可以。实验室用 PC/SC + GlobalPlatform。生产密钥绝不复用默认 GP 传输密钥。" },
      { q: "Apple Pay / Google Pay 怎么做？", a: "作为令牌化工序：MDES 或 VTS、Push Provisioning 和 yellow-path 测试，而不是卡面上贴一个标志。" },
    ],
    relatedLinks: [
      { title: "JavaCard 工具", href: "/zh/tools/javacard-tool" },
      { title: "SCP02 vs SCP03", href: "/zh/blog/scp02-vs-scp03-javacard-secure-channel" },
      { title: "下载中心", href: "/zh/downloads" },
    ],
  },
  transit: {
    seoTitle: "公共交通票务方案 | CALYPSO、DESFire EV3、ABT — NFCTEC",
    seoDescription:
      "地铁与公交收费：CALYPSO Rev 3.1、MIFARE DESFire EV3、cEMV 开放支付与账户制票务（ABT）。",
    intro:
      "公交项目死在闸机，不是死在 PPT。一次轻触要在几百毫秒内完成，车站还得能离线，还要把乘客从旧票卡迁走而不停网。",
    body: `<h2>谁适合这套方案</h2>
<p>地铁、公交、轮渡与多式联运运营商。通常要同时覆盖闭环票卡、开放式银行卡，以及账户制票务——迁移窗口里三者并存很常见。</p>
<h2>票卡与读卡</h2>
<p>我们在 CD21/CD97 类芯片上做 CALYPSO Rev 3.1（含 SAM 密钥），并用 MIFARE DESFire EV3 作为 AES 闭环选项。验票机与闸机按 300ms 内交易、离线风控和黑名单同步来定义。</p>
<p>cEMV 开放支付是另一套产品：任意非接银行卡或钱包都能过闸，但后台仍需要交通内核、延迟授权和封顶计费。</p>
<h2>账户制票务</h2>
<p>ABT 把产品从卡上搬到账户。轻触变成令牌，后台解析账户、计算最优票价/封顶，并在运营商之间清分。切换期通常要双应用票卡，旧卡继续可用。</p>`,
    deliverables: [
      "票卡规格（CALYPSO 和/或 DESFire EV3）",
      "SAM / 密钥层级与验票机镜像说明",
      "闸机交易时序预算",
      "ABT 令牌到账户映射与封顶规则草案",
      "双票种并行的迁移计划",
    ],
    workflow: [
      { title: "线网调研", description: "现有票种、闸机型号、离线窗口与清分规则。" },
      { title: "票卡 + SAM 设计", description: "AID/文件布局、密钥集、读卡器固件约束。" },
      { title: "试点线路", description: "一条线或一个车队双票种运行，打时序与黑名单同步。" },
      { title: "全网切换", description: "夜间窗口刷闸机、后台切流、乘客告知。" },
    ],
    faqs: [
      { q: "选 CALYPSO 还是 DESFire？", a: "优先服从现网票卡和 SAM 库存。绿地项目可以重选。混合车队很常见，方案按混合来设计。" },
      { q: "闸机能否直接刷银行卡？", a: "可以，作为 cEMV 开放支付。它不会一夜替代闭环票卡，ABT 和开放支付都需要后台票价逻辑。" },
    ],
    relatedLinks: [
      { title: "MIFARE Classic 迁 DESFire 清单", href: "/zh/blog/mifare-classic-to-desfire-ev3-migration-checklist" },
      { title: "下载中心", href: "/zh/downloads" },
    ],
  },
  access: {
    seoTitle: "NFC 门禁方案 | DESFire EV3、Apple Wallet 钥匙 — NFCTEC",
    seoDescription:
      "替代 125 kHz 的现代门禁：MIFARE DESFire EV3、HID Seos、Apple/Google Wallet 工牌、OSDP 读卡器与云端吊销。",
    intro:
      "125 kHz 和 MIFARE Classic 站点正在被逼着迁移。替换物不是“换一张卡”，而是分散 AES 密钥、手机凭证，以及几分钟内在多栋楼吊销工牌。",
    body: `<h2>谁适合这套方案</h2>
<p>园区、写字楼、医院和工厂：需要 DESFire EV3 或 Seos、Apple/Google Wallet 钥匙，以及说 OSDP 而不是明文 Wiegand 的读卡器。</p>
<h2>凭证设计</h2>
<p>AID、文件 ID、访问权限和密钥版本是产品，不是扇区转储。Classic 的扇区布局不能 1:1 搬到 DESFire。从 Classic 迁移时，先看 <a href="/zh/blog/mifare-classic-to-desfire-ev3-migration-checklist">Classic 到 DESFire EV3 清单</a>，再个人化第一张员工卡。</p>
<h2>手机钥匙与吊销</h2>
<p>Apple Wallet 工牌涉及 PassKit、VAS，以及快捷模式 / ECP 2.0。Google Wallet 走 Smart Tap。只会读 UID 的读头不会自动兼容。OSS-SO 云端密钥管理用来吊销丢失的手机，而不必整层重新发卡。</p>`,
    deliverables: [
      "DESFire EV3 / Seos 应用与密钥设计",
      "读卡器固件 / OSDP 安全通道说明",
      "Apple Wallet 与 Google Wallet 工牌配置",
      "云端吊销与审计导出",
      "双凭证并行的场地迁移计划",
    ],
    workflow: [
      { title: "现场盘点", description: "读头、控制器、现有票卡，以及哪些门不能停电。" },
      { title: "应用设计", description: "AID、文件、分散密钥，以及手机凭证与实体卡的切分。" },
      { title: "试点楼宇", description: "一栋楼同时跑 Wallet + 实体卡、OSDP 和吊销测试。" },
      { title: "批量切换", description: "读头镜像、工牌个人化，以及剩余 Classic 门的割接。" },
    ],
    faqs: [
      { q: "迁移期能否保留 Classic？", a: "可以，但必须是明确的双凭证窗口。新门和新员工应直接上 DESFire 或 Wallet。" },
      { q: "手机放包里能不能开？", a: "快捷模式取决于读头和卡券配置，不是在实体卡上贴个标。" },
    ],
    relatedLinks: [
      { title: "DESFire EV3 迁移清单", href: "/zh/blog/mifare-classic-to-desfire-ev3-migration-checklist" },
      { title: "NTAG424 DNA 工具", href: "/zh/tools/ntag424-tool" },
    ],
  },
  brand: {
    seoTitle: "NFC 品牌防伪 | NTAG 424 DNA SUN 动态 URL 验证 — NFCTEC",
    seoDescription:
      "NTAG 424 DNA SUN 动态 URL、AES-CMAC 验证、防撕标签结构与云端验证 API，用于奢侈品、酒类、化妆品与药品防伪。",
    intro:
      "静态 NFC 链接等于可复制的贴纸。品牌防伪要成立，每一次轻触都必须带上 UID、计数器和后端能拒绝重放的 AES-CMAC。",
    body: `<h2>谁适合这套方案</h2>
<p>奢侈品、烈酒、化妆品、药品和配件品牌：需要每次点击验真、串货信号和消费者落地页，又不想为每个 SKU 做独立 App。</p>
<h2>SUN 验证怎么做</h2>
<p>NTAG 424 DNA 的 SUN 报文用 UID、读计数器和 CMAC 拼出 URL。手机打开 HTTPS，服务器重算 MAC 并检查计数器是否前进。实验室流程见 <a href="/zh/blog/ntag424-dna-sun-url-authentication-example">NTAG424 DNA SUN URL 验证</a>。</p>
<pre><code>https://verify.example.com/a/{picc_data}?c={cmac}</code></pre>
<p>工程验证用 <a href="/zh/tools/ntag424-tool">NTAG424 DNA 工具</a> 配 SDM 模板、EV2 密钥和一次真实 tap，再进入工厂个人化。</p>
<h2>标签与 API</h2>
<p>我们定义防撕结构（湿法瓶颈、开瓶即毁）以及带地理/频次规则的验证 API。首次扫描围栏用来发现串货。注册、保修、复购都挂在同一次已验证的轻触上。</p>`,
    deliverables: [
      "NTAG 424 DNA SDM / SUN URL 模板与密钥分散",
      "验证 API 约定（CMAC + 计数器）",
      "防撕标签结构说明",
      "试点包：样标、tap 记录、失败用例矩阵",
      "消费者落地页通过/失败状态对接",
    ],
    workflow: [
      { title: "威胁模型", description: "克隆、灌装、串货，以及产线能否上湿法 inlay。" },
      { title: "标签 + API 实验室", description: "EV2 密钥、SUN URL、后端验证、重放测试。" },
      { title: "试点 SKU", description: "一个市场、真机、地理规则、客服话术。" },
      { title: "工厂个人化", description: "批量密钥、SDM 镜像，并用同一套 API 抽检。" },
    ],
    faqs: [
      { q: "为什么不用二维码？", a: "二维码可以无限翻拍。SUN 带每次点击的计数器和 CMAC，复制链接能被识别。" },
      { q: "用户要装 App 吗？", a: "不用。系统 NFC 会打开浏览器，由服务器返回真伪。" },
    ],
    relatedLinks: [
      { title: "NTAG424 DNA 工具", href: "/zh/tools/ntag424-tool" },
      { title: "SUN URL 验证示例", href: "/zh/blog/ntag424-dna-sun-url-authentication-example" },
      { title: "下载中心", href: "/zh/downloads" },
    ],
  },
};

const BY_LOCALE: Record<Locale, Record<string, SolutionEnrichment>> = { en: EN, zh: ZH };

function pickFilled<T>(cms: T, extra: T | undefined, empty: (v: T) => boolean): T {
  if (!empty(cms)) return cms;
  return extra ?? cms;
}

type SolutionDoc = {
  locale: Locale;
  slug: string;
  intro: string;
  body?: string;
  deliverables: string[];
  workflow: { title: string; description: string }[];
  faqs?: SolutionFaq[];
  relatedLinks?: SolutionLink[];
  seoTitle: string | null;
  seoDescription: string | null;
};

export function mergeSolutionContent<T extends SolutionDoc>(solution: T): T {
  const extra = BY_LOCALE[solution.locale]?.[solution.slug];
  if (!extra) {
    return {
      ...solution,
      body: solution.body ?? "",
      faqs: solution.faqs ?? [],
      relatedLinks: solution.relatedLinks ?? [],
    };
  }

  const cmsOwnsCopy = Boolean(solution.body && solution.body.length > 80);
  const faqs = pickFilled(solution.faqs ?? [], extra.faqs, (v) => !v?.length) ?? [];
  const deliverables = pickFilled(solution.deliverables, extra.deliverables, (v) => !v?.length) ?? [];
  const workflow = pickFilled(solution.workflow, extra.workflow, (v) => !v?.length) ?? [];
  const relatedFromCms = (solution.relatedLinks ?? []).filter((l) => l.href);
  const relatedLinks = relatedFromCms.length ? relatedFromCms : extra.relatedLinks ?? [];

  return {
    ...solution,
    intro: cmsOwnsCopy ? solution.intro : extra.intro || solution.intro,
    body: cmsOwnsCopy ? solution.body : extra.body ?? solution.body ?? "",
    seoTitle: solution.seoTitle || extra.seoTitle || null,
    seoDescription: solution.seoDescription || extra.seoDescription || null,
    deliverables,
    workflow,
    faqs,
    relatedLinks,
  };
}
