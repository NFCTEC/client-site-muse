/**
 * Publish 2 SEO blog posts to NFCTEC CMS.
 *
 * Usage (PowerShell):
 *   $env:CMS_ADMIN_TOKEN="your-jwt-or-token"
 *   node scripts/publish-seo-posts.mjs
 *
 * Optional:
 *   $env:CMS_API_URL="https://web.nfctec.com/api"
 *   # or on the VPS:
 *   $env:CMS_API_URL="http://127.0.0.1:3000/api"
 */

const API = (process.env.CMS_API_URL || "https://web.nfctec.com/api").replace(/\/$/, "");
const TOKEN = process.env.CMS_ADMIN_TOKEN || process.env.ADMIN_TOKEN || "";

const posts = [
  {
    locale: "en",
    slug: "scp02-vs-scp03-javacard-secure-channel",
    title: "SCP02 vs SCP03: Which GlobalPlatform Secure Channel Should You Use?",
    excerpt:
      "A practical comparison of GlobalPlatform SCP02 and SCP03 for JavaCard developers: key derivation, MAC/ENC wrapping, common failures, and when to choose each.",
    category: "JavaCard",
    readMinutes: 9,
    status: "published",
    publishedAt: new Date().toISOString(),
    seoTitle: "SCP02 vs SCP03 Difference | GlobalPlatform Secure Channel for JavaCard",
    seoDescription:
      "Compare SCP02 and SCP03 for JavaCard: cryptograms, C-MAC/R-MAC, AES vs 3DES, EXTERNAL AUTHENTICATE P1 values, and how to debug secure-channel failures with NFCTEC JavaCard Tool.",
    body: `<p>If you load JavaCard applets for a living, you will eventually hit the same question: should this card use <strong>SCP02</strong> or <strong>SCP03</strong>? The wrong answer usually shows up as a failed EXTERNAL AUTHENTICATE, a 6982/6985 status word, or a CAP load that looks fine until the first wrapped INSTALL command.</p>
<p>This article compares the two GlobalPlatform secure channels from an engineering point of view — not as a standards dump, but as a decision guide for development, personalization and production scripting.</p>
<h2>What both channels are trying to do</h2>
<p>SCP02 and SCP03 both establish a trusted session between a host (your desktop tool, factory CMS, or HSM-backed script) and the Issuer Security Domain on the card. After INITIALIZE UPDATE and EXTERNAL AUTHENTICATE succeed, later commands can be integrity-protected (MAC) and optionally encrypted (ENC).</p>
<p>That secure channel is why CAP LOAD and INSTALL are not just “send a file”. The host must wrap APDUs the way the card expects.</p>
<h2>SCP02 in practice</h2>
<p>SCP02 is still widely deployed on older and mid-range JavaCards. It typically uses 3DES-based session keys derived from the card cryptogram and host challenge.</p>
<ul>
<li><p><strong>Strength:</strong> Broad card support, mature tooling, easy to find reference scripts.</p></li>
<li><p><strong>Weakness:</strong> 3DES is aging. Many security teams now prefer AES-based channels for new designs.</p></li>
<li><p><strong>Common pitfall:</strong> Mixing key versions or using the wrong security level (plain / MAC / ENC+MAC) for EXTERNAL AUTHENTICATE P1.</p></li>
</ul>
<p>If your sample card still ships with default GP keys and only advertises SCP02, stay on SCP02 for bring-up. Do not force SCP03 just because it sounds newer.</p>
<h2>SCP03 in practice</h2>
<p>SCP03 is the AES-based GlobalPlatform secure channel. For new applet projects, payment profiles and higher-assurance cards, SCP03 is usually the better long-term choice.</p>
<ul>
<li><p><strong>Strength:</strong> AES session keys, cleaner crypto story for auditors, better fit for modern JavaCard platforms.</p></li>
<li><p><strong>Weakness:</strong> Older cards and some lab samples simply do not support it.</p></li>
<li><p><strong>Common pitfall:</strong> Host and card disagree on MAC length, ICV handling, or whether R-MAC is required.</p></li>
</ul>
<h2>How to choose quickly</h2>
<ol>
<li><p>Read what the card offers during INITIALIZE UPDATE. If only SCP02 is available, use SCP02.</p></li>
<li><p>For new production designs on recent JavaCard OS builds, prefer SCP03 with ENC+MAC when the card supports it.</p></li>
<li><p>Keep one known-good script per channel. Never “guess and retry” key sets in a factory line.</p></li>
<li><p>Log the full APDU sequence: challenge, card cryptogram, host cryptogram, P1 security level, and the first wrapped command.</p></li>
</ol>
<h2>Debug checklist when authentication fails</h2>
<p>When EXTERNAL AUTHENTICATE fails, check these in order:</p>
<ol>
<li><p>Key version and key identifier match the ISD.</p></li>
<li><p>ENC / MAC / DEK values are correct for that key set.</p></li>
<li><p>Host cryptogram calculation matches the selected SCP.</p></li>
<li><p>P1 security level is accepted by the card.</p></li>
<li><p>Later LOAD/INSTALL wrapping uses the same session state.</p></li>
</ol>
<p>NFCTEC JavaCard Tool is built exactly for this workflow: open SCP02 or SCP03, inspect CPLC, load a CAP, and keep the APDU trace visible so status words are reproducible.</p>
<h2>Bottom line</h2>
<p><strong>SCP02</strong> is still the right channel for many existing cards and lab samples. <strong>SCP03</strong> is the better default for new secure designs that support AES. Choose what the card actually implements, then lock the script before personalization volume starts.</p>
<p>If you need a desktop host for CAP load and secure-channel debugging, see the <a href="/en/tools/javacard-tool">NFCTEC JavaCard Tool</a> page or the download center.</p>`,
  },
  {
    locale: "en",
    slug: "ntag424-dna-sun-url-authentication-example",
    title: "NTAG424 DNA SUN URL Authentication Example",
    excerpt:
      "A practical NTAG 424 DNA example: how SUN dynamic URLs, AES-CMAC, and read counters stop NFC label cloning.",
    category: "Security",
    readMinutes: 8,
    status: "published",
    publishedAt: new Date().toISOString(),
    seoTitle: "NTAG424 DNA Authentication Example | SUN Dynamic URL + CMAC",
    seoDescription:
      "Learn how NTAG 424 DNA SUN URLs work: UID, read counter, AES-CMAC verification, and a practical anti-counterfeit flow with NFCTEC NTAG424 Tool.",
    body: `<p>Static NFC tags are easy to clone: copy the URL, print another label, and the backend cannot tell the difference. <strong>NTAG 424 DNA</strong> fixes that with Secure Unique NFC (SUN) messaging — every tap can produce a signed, counter-based URL that a server can verify.</p>
<p>This article walks through a practical authentication example you can use for brand protection, warranty activation, consumables and smart packaging.</p>
<h2>What a SUN URL contains</h2>
<p>On each successful NFC tap, the tag can assemble a URL that includes dynamic parameters derived from:</p>
<ul>
<li><p>Tag UID</p></li>
<li><p>Read counter</p></li>
<li><p>AES-CMAC over selected fields</p></li>
</ul>
<p>A typical pattern looks like:</p>
<pre><code>https://verify.example.com/a/{picc_data}?c={cmac}</code></pre>
<p>Exact templates vary by project, but the idea is constant: the phone opens a normal HTTPS link, and the server decides whether the tap is authentic.</p>
<h2>Server-side verification flow</h2>
<ol>
<li><p>Receive the tap URL.</p></li>
<li><p>Recover UID / counter (or encrypted PICC data) from the dynamic part.</p></li>
<li><p>Load the tag’s diversified AES key from your HSM or key store.</p></li>
<li><p>Recompute the CMAC over the same fields the tag used.</p></li>
<li><p>Reject the tap if the CMAC does not match.</p></li>
<li><p>Reject the tap if the counter is not strictly increasing for that UID.</p></li>
<li><p>Return an authenticity / product status page to the user.</p></li>
</ol>
<p>The counter check is what defeats simple URL copying. A photographed QR-like NFC link can be reused forever. A SUN tap with a spent counter should fail on replay.</p>
<h2>Personalization checklist before production</h2>
<ul>
<li><p>Derive a unique AES key per tag from a master key. Do not reuse one key across a SKU.</p></li>
<li><p>Configure SDM / SUN mirrors and access rights carefully. Wrong file permissions are a common pilot failure.</p></li>
<li><p>Store only what the backend needs for verification (UID index, key derivation data, last counter).</p></li>
<li><p>Test with real phones. Browser NFC behavior differs across iOS and Android versions.</p></li>
<li><p>Validate failed cases too: wrong key, replayed counter, truncated URL, offline phone.</p></li>
</ul>
<h2>Example bring-up with NFCTEC NTAG424 Tool</h2>
<p>For engineering validation, use a desktop/mobile tag tool before you wire factory personalization:</p>
<ol>
<li><p>Connect a reader or tap the sample tag.</p></li>
<li><p>Authenticate with EV2 keys.</p></li>
<li><p>Configure NDEF / SDM URL templates.</p></li>
<li><p>Generate a SUN URL from a real tap.</p></li>
<li><p>Send the same parameters to your verification API.</p></li>
<li><p>Confirm CMAC success and counter advance.</p></li>
</ol>
<p>Only after that lab loop is stable should you move to batch personalization and cloud verification.</p>
<h2>Why this ranks as a real engineering page</h2>
<p>Buyers searching for “NTAG424 DNA authentication example” or “SUN dynamic URL verification” are not looking for a brochure. They want the counter + CMAC mental model, the failure modes, and a tool path they can try the same day.</p>
<p>If you need a practical tag manager for that bring-up, open the <a href="/en/tools/ntag424-tool">NTAG424 DNA Tool</a> page or grab the build from the download center.</p>`,
  },
];

async function upsert(post) {
  const headers = {
    "content-type": "application/json",
    accept: "application/json",
  };
  if (TOKEN) {
    headers.authorization = TOKEN.startsWith("Bearer ") ? TOKEN : `Bearer ${TOKEN}`;
  }

  // Try create first
  let res = await fetch(`${API}/admin/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify(post),
  });
  let text = await res.text();

  // If slug already exists, try update by returned conflict message only
  if (res.status === 409) {
    const listed = await fetch(`${API}/admin/posts?locale=${post.locale}`, { headers });
    const rows = await listed.json().catch(() => []);
    const found = Array.isArray(rows) ? rows.find((p) => p.slug === post.slug) : null;
    if (found?.id) {
      res = await fetch(`${API}/admin/posts/${encodeURIComponent(found.id)}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(post),
      });
      text = await res.text();
    }
  }

  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { status: res.status, json };
}

async function main() {
  if (!TOKEN) {
    console.error("Missing CMS_ADMIN_TOKEN. Set it first, then re-run.");
    console.error('PowerShell: $env:CMS_ADMIN_TOKEN="..." ; node scripts/publish-seo-posts.mjs');
    process.exit(2);
  }

  for (const post of posts) {
    const result = await upsert(post);
    console.log(post.slug, result.status, typeof result.json === "string" ? result.json.slice(0, 200) : JSON.stringify(result.json).slice(0, 300));
    if (result.status >= 400) process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
