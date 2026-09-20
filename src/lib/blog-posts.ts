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
  {
    slug: "javacard-cap-load-globalplatform-guide",
    cat: "JavaCard",
    date: "2026-09-20",
    title: "JavaCard CAP Load with GlobalPlatform: INSTALL, LOAD and SELECT Explained",
    excerpt: "A practical guide to loading a JavaCard applet with GlobalPlatform, from secure channel setup to final SELECT verification.",
    readMinutes: 10,
    body: [
      { text: "Loading a JavaCard applet is not just sending a CAP file to a card. A production flow must open a GlobalPlatform secure channel, load package blocks, install the applet instance and verify that the new AID can be selected reliably." },
      { heading: "Secure channel first", text: "The usual command sequence starts with INITIALIZE UPDATE and EXTERNAL AUTHENTICATE. These commands create the SCP02 or SCP03 secure channel used to wrap later INSTALL and LOAD commands. If this step fails, check key version, security level and host cryptogram calculation first." },
      { heading: "INSTALL for load and LOAD", text: "INSTALL [for load] tells the card that a package is about to be loaded. LOAD then sends the CAP file in blocks. Large CAP files can fail because of block size, secure messaging overhead or EEPROM limits, so logs should include block index, response status and wrapped APDU length." },
      { heading: "Install and verify", text: "INSTALL [for install] creates the applet instance using package AID, applet AID, instance AID and privileges. After installation, always SELECT the instance AID and run a minimal command to prove the lifecycle is complete." },
    ],
  },
  {
    slug: "apdu-status-words-9000-6a82-6985",
    cat: "APDU",
    date: "2026-09-20",
    title: "APDU Status Words Explained: 9000, 6A82, 6985, 6700 and 6D00",
    excerpt: "Common ISO 7816 status words engineers see when debugging smart cards and JavaCard applets.",
    readMinutes: 7,
    body: [
      { text: "APDU status words are the fastest way to understand why a smart card command failed. The response data may be empty, but SW1/SW2 still tells you whether the command was accepted, malformed, unauthorized or unsupported." },
      { heading: "9000, 6A82 and 6985", text: "9000 means success at the APDU layer. 6A82 usually means file or application not found, often because a SELECT AID is wrong or the applet instance was not installed. 6985 means conditions of use not satisfied, commonly caused by missing security state, wrong lifecycle or insufficient privileges." },
      { heading: "Length and instruction errors", text: "6700 indicates wrong length, while 6D00 indicates an unsupported instruction code. Good APDU tooling should keep the complete command history so engineers can reproduce status-word failures instead of relying on screenshots." },
    ],
  },
  {
    slug: "mifare-classic-to-desfire-ev3-migration-checklist",
    cat: "MIFARE",
    date: "2026-09-20",
    title: "MIFARE Classic to DESFire EV3 Migration Checklist",
    excerpt: "What to check when replacing legacy MIFARE Classic access cards with DESFire EV3 credentials.",
    readMinutes: 9,
    body: [
      { text: "Many access-control systems still rely on MIFARE Classic because it was cheap and widely supported. For new deployments, DESFire EV3 is usually the safer credential because it supports AES authentication, multiple applications and stronger transaction features." },
      { heading: "Data mapping", text: "Classic sector and block layouts do not translate directly into DESFire applications and files. Define application IDs, file IDs, access rights, key versions and whether value files or standard data files are needed before personalization starts." },
      { heading: "Reader firmware", text: "A reader that only reads UID or Classic sectors will not magically support DESFire authentication. Firmware must handle ISO 14443-4 communication, AES authentication and the chosen file operations." },
      { heading: "Dual-credential period", text: "Many sites need readers and backend systems to accept both legacy Classic cards and new DESFire EV3 cards while users are migrated in batches. Plan this period explicitly." },
    ],
  },
  {
    slug: "ndef-uri-record-byte-example",
    cat: "NDEF",
    date: "2026-09-20",
    title: "NDEF URI Record Byte Example for NFC Tags",
    excerpt: "A byte-level example of how an NFC URI record is encoded and why prefix codes matter.",
    readMinutes: 6,
    body: [
      { text: "NDEF URI records are one of the most common payloads written to NFC tags. They are used for product links, support pages, pairing flows, business cards and marketing campaigns." },
      { heading: "Prefix code", text: "A URI record does not always store the full string. The first payload byte is a prefix code. For example, 0x04 means https://. The rest of the payload stores the remaining characters, saving tag memory." },
      { heading: "Byte-level example", text: "For a URL such as https://www.nfctec.com/contact, the payload can use prefix code 0x04 followed by www.nfctec.com/contact in ASCII. The NDEF record header then describes TNF, type length, payload length and record type U." },
    ],
  },
];

export const postsBySlug = new Map(posts.map((p) => [p.slug, p]));
