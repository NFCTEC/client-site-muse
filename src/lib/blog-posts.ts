// Blog posts data. Swap this for a CMS/API fetch later — keep the BlogPost shape stable.
export type BlogPost = {
  slug: string;
  cat: string;
  date: string; // ISO yyyy-mm-dd
  title: string;
  excerpt: string;
  // Body rendered as ordered paragraphs / H2 sections. Keep it simple so a CMS can fill it later.
  body: { heading?: string; text: string }[];
  readMinutes: number;
};

export const posts: BlogPost[] = [
  {
    slug: "emv-contactless-aid-selection",
    cat: "EMV",
    date: "2026-05-12",
    title: "How EMV Contactless Selects an AID in 6 ms",
    excerpt: "A byte-level walk-through of PPSE, AID lists and kernel selection across Visa, Mastercard and UPI.",
    readMinutes: 8,
    body: [
      { text: "EMV contactless transactions have a hard timing budget. From the moment a card enters the field to the moment the terminal sends the first GENERATE AC command, everything must be done in under 500 ms — and most of that budget is reserved for cryptographic processing. Application selection itself routinely runs in under 6 ms on modern kernels." },
      { heading: "Step 1 — PPSE (Proximity Payment System Environment)", text: "The terminal issues SELECT '2PAY.SYS.DDF01'. The card responds with an FCI template listing every supported application AID, each tagged with a priority indicator and an optional kernel ID." },
      { heading: "Step 2 — AID matching", text: "The terminal walks its configured AID list (Combination Selection Table) in priority order and looks for an intersection with the card's FCI. The first match wins — exact match takes precedence over partial." },
      { heading: "Step 3 — Kernel routing", text: "Once an AID is chosen, the terminal hands off to the right kernel: Kernel 2 for Mastercard M/Chip, Kernel 3 for Visa VSDC, Kernel 6 for UnionPay QUICS, and so on. Each kernel has its own data-object list and risk parameters." },
      { heading: "Common pitfalls", text: "Misordered Combination Selection Tables can downgrade a Mastercard-preferred terminal to Visa silently. Always validate the table during L3 brand certification." },
    ],
  },
  {
    slug: "sun-dynamic-url-anti-counterfeit",
    cat: "Security",
    date: "2026-04-28",
    title: "SUN Dynamic URL: Anti-Counterfeit Done Right",
    excerpt: "How NTAG 424 DNA's signed URL protocol stops cloning while staying cloud-friendly.",
    readMinutes: 7,
    body: [
      { text: "NTAG 424 DNA's Secure Unique NFC (SUN) message turns every tap into a verifiable, single-use URL. No app required — the phone's default NFC handler opens a browser, the server validates the message, and the user sees an authenticity result in under a second." },
      { heading: "How SUN works", text: "On each tap the tag increments a read counter and emits AES-128-CMAC over the UID and counter. The result is base32-encoded into the URL query string. The server holds the AES key, recomputes the MAC, and checks that the counter is strictly increasing." },
      { heading: "Why it beats QR", text: "QR codes can be photographed and reprinted indefinitely. SUN's per-tap counter + signature means a copy is detectable on the second scan, even when the attacker has the URL." },
      { heading: "Issuance flow", text: "Personalize each tag with a unique AES key derived from a master key. Store only the derivation index server-side. Never transmit per-tag keys after personalization." },
    ],
  },
  {
    slug: "2m-transit-cards-90-days",
    cat: "Case Study",
    date: "2026-04-10",
    title: "Rolling Out 2M Transit Cards in 90 Days",
    excerpt: "Inside a CALYPSO + DESFire migration for a tier-1 metro operator.",
    readMinutes: 6,
    body: [
      { text: "A tier-1 metro operator needed to migrate 2 million riders from a legacy proprietary scheme to a CALYPSO + MIFARE DESFire EV3 platform in 90 days, with zero service interruption." },
      { heading: "Personalization throughput", text: "Three perso lines running in parallel hit a sustained 28,000 cards/hour with HSM-backed CALYPSO key derivation. The bottleneck turned out to be card flip-orient mechanics, not crypto." },
      { heading: "Gate reader rollout", text: "1,200 gates were re-flashed in 14 nightly maintenance windows. A dual-application fallback let old and new cards coexist during the transition." },
      { heading: "Lessons learned", text: "Pre-stage every key set in the HSM ceremony at least a week ahead. The schedule survives hardware delays — it never survives a key ceremony slip." },
    ],
  },
  {
    slug: "pn5180-vs-pn532",
    cat: "Hardware",
    date: "2026-03-22",
    title: "PN5180 vs PN532: Choosing the Right Frontend",
    excerpt: "RF performance, current draw, BOM cost and protocol coverage — head to head.",
    readMinutes: 9,
    body: [
      { text: "PN5180 and PN532 dominate the NFC frontend market for new designs, but they serve very different sweet spots." },
      { heading: "RF performance", text: "PN5180's adaptive matching network delivers ~2× the read range of a stock PN532 at the same antenna size — typically 9 cm vs 4–5 cm for a 50×50 mm coil." },
      { heading: "Protocol coverage", text: "PN5180 supports the full NFC Forum T1–T5 set, ISO 15693, and EMV L1 certification out of the box. PN532 covers T1–T4 and is cheaper but skips ISO 15693." },
      { heading: "Cost & complexity", text: "PN5180 needs an SPI host and a more complex RF front-end. PN532 talks I2C, UART, or SPI and works on a 2-layer board. For hobby / low-volume, PN532 wins. For production access control or transit, PN5180." },
    ],
  },
  {
    slug: "first-javacard-3-1-applet",
    cat: "JavaCard",
    date: "2026-03-05",
    title: "Shipping Your First JavaCard 3.1 Applet",
    excerpt: "From keystore to GP-Pro install — a complete onboarding for new applet developers.",
    readMinutes: 10,
    body: [
      { text: "JavaCard 3.1 brings BigInteger, Elliptic Curve key agreement, and modern crypto primitives to the platform. Your first applet doesn't need any of that — but the toolchain still has a learning curve." },
      { heading: "Toolchain setup", text: "Install the Oracle JavaCard SDK 3.1, GPShell or GlobalPlatformPro, and a card reader with PC/SC drivers. A development card with default GP keys is essential." },
      { heading: "Applet skeleton", text: "Extend javacard.framework.Applet, override install() and process(). The CLA/INS dispatch in process() is your contract with the host — design it before writing logic." },
      { heading: "Load and install", text: "Use gp.exe --install yourapplet.cap to push the CAP file. If install fails with 6A80, your AID collides with an existing package — pick a new one." },
    ],
  },
  {
    slug: "hce-android-15",
    cat: "Mobile",
    date: "2026-02-18",
    title: "HCE on Android 15: What Changed",
    excerpt: "New TEE binding requirements, foreground service rules and tokenization tips.",
    readMinutes: 6,
    body: [
      { text: "Android 15 tightens Host Card Emulation rules in three places that matter for payment and access-control developers." },
      { heading: "TEE-bound credentials", text: "Sensitive credentials must now be stored in the StrongBox keystore on supported devices. Apps targeting SDK 35 get a one-time migration path." },
      { heading: "Foreground service rules", text: "HCE services running long-lived emulation sessions now require a typed foreground-service declaration in the manifest, or the OS will kill the service mid-tap." },
      { heading: "Tokenization", text: "Token requestors should regenerate device tokens after the OS upgrade — the attestation chain changes when StrongBox migration happens." },
    ],
  },
];

export const postsBySlug = new Map(posts.map((p) => [p.slug, p]));
