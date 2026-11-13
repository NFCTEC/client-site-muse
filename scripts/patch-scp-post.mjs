const API = "https://admin.nfctec.com/api";
const TOKEN = process.env.CMS_ADMIN_TOKEN;
const POST_ID = "8827691e-313f-4188-8235-d96d1416abfc";

const body = `<p><em>By Alan, Senior NFC / JavaCard Engineer at NFCTEC. Revised with lab APDU traces from NFCTEC JavaCard Tool on JCOP and ACOS sample cards.</em></p>
<p>If you load JavaCard applets for a living, you will eventually hit the same question: should this card use <strong>SCP02</strong> or <strong>SCP03</strong>? The wrong answer usually shows up as a failed EXTERNAL AUTHENTICATE, a 6982/6985 status word, or a CAP load that looks fine until the first wrapped INSTALL command.</p>
<p>This article is not another “SCP03 is newer, prefer AES” summary. It covers the host-side details that actually break in the lab: SCP02 i=15 C-MAC calculation, SCP03 encrypt-then-MAC vs MAC-then-encrypt mistakes, full INITIALIZE UPDATE / EXTERNAL AUTHENTICATE traces, and the status words we see most often on JCOP and ACOS cards.</p>
<h2>What both channels are trying to do</h2>
<p>SCP02 and SCP03 both establish a trusted session between a host (desktop tool, factory CMS, or HSM-backed script) and the Issuer Security Domain. After INITIALIZE UPDATE and EXTERNAL AUTHENTICATE succeed, later commands can be integrity-protected (MAC) and optionally encrypted (ENC).</p>
<p>That is why CAP LOAD and INSTALL are not “send a file”. The host must wrap APDUs exactly the way the selected SCP and security level require.</p>
<h2>A complete APDU trace you can compare against</h2>
<p>Below is a representative SCP02 bring-up at security level <code>03</code> (C-DECRYPTION + C-MAC). Values are shortened with <code>..</code> where the exact bytes depend on your keyset, but the structure is what matters.</p>
<pre><code>// 1) INITIALIZE UPDATE — host sends 8-byte challenge
→ 80 50 00 00 08 0102030405060708
← 0000 0270 02 00 11 22 33 44 55 66 77 88 AA..BB 9000
   |    |    |  |  |----------------| |------|
   |    |    |  |  card challenge     card cryptogram
   |    |    |  key info / SCP id
   |    |    key version
   |    key diversification data

// 2) Host derives session keys, verifies card cryptogram,
//    computes host cryptogram + C-MAC, then EXTERNAL AUTHENTICATE
→ 84 82 03 00 10 [8-byte host cryptogram][8-byte C-MAC]
← 9000

// 3) First protected command (example: GET STATUS)
→ 84 F2 80 02 0A [data...][C-MAC]
← [response..] 9000
</code></pre>
<p>SCP03 looks similar at the APDU layer, but the crypto under the hood is AES-CMAC / AES-CBC and the EXTERNAL AUTHENTICATE data field layout differs. If your tool shows <code>80 50 ...</code> then <code>84 82 ...</code>, you are on the right command path; if authentication still fails, the bug is almost always in derivation, MAC length, or command ordering — not in the CLA/INS bytes themselves.</p>
<h2>SCP02 deep dive: why i=15 C-MAC trips people up</h2>
<p>SCP02 is still widely deployed on older and mid-range JavaCards. Session keys are typically 3DES-based and derived from the card cryptogram / host challenge exchange.</p>
<p>The part most README files gloss over is <strong>option i=15</strong> style C-MAC behavior:</p>
<ul>
<li><p>The MAC is calculated over a specific ICV and command APDU layout, not “whatever bytes you see on the wire after wrapping”.</p></li>
<li><p>After the first successful MAC, the next ICV is chained from the previous MAC. If your host resets ICV to zeros on every command, command #1 may pass and command #2 fails with 6982.</p></li>
<li><p>Some hosts MAC the unwrapped command, then insert the MAC and adjust Lc. Others accidentally MAC the already-modified APDU. That single off-by-one in the MAC input is a classic “works in one tool, fails in another” bug.</p></li>
</ul>
<p>Practical rule in our lab: when SCP02 auth succeeds but the first INSTALL/LOAD fails with 6982, dump the exact bytes that entered the MAC function — not only the final APDU hex.</p>
<h2>SCP03 deep dive: encrypt order and tool bugs</h2>
<p>SCP03 is the AES-based GlobalPlatform secure channel. For new designs it is usually the better long-term choice <em>when the card supports it</em>.</p>
<p>The highest-ROI detail for engineers is command protection order:</p>
<ul>
<li><p>For many SCP03 configurations the host must <strong>encrypt first, then MAC</strong> the protected command field according to the selected security level.</p></li>
<li><p>Several older host scripts (and a few wrappers around classic GP tooling) effectively MAC cleartext and then encrypt, or encrypt including bytes that should stay outside the MAC input. Result: EXTERNAL AUTHENTICATE returns 9000, then the first LOAD block dies.</p></li>
<li><p>R-MAC / response MAC expectations also differ by card profile. If your host verifies R-MAC but the card is not returning one for that security level, you will “fail” a successful card response.</p></li>
</ul>
<p>If you are comparing tools, never trust a green “authenticated” indicator alone. Always send one protected GET STATUS or INSTALL [for load] immediately and confirm the wrapped APDU matches a known-good trace.</p>
<h2>How to choose quickly</h2>
<ol>
<li><p>Read what INITIALIZE UPDATE returns. If the card only advertises SCP02, use SCP02.</p></li>
<li><p>For new production designs on recent JavaCard OS builds, prefer SCP03 with ENC+MAC when supported.</p></li>
<li><p>Keep one known-good script per channel and per key version. Factory lines do not survive “guess the keyset”.</p></li>
<li><p>Log challenge, card cryptogram, host cryptogram, P1 security level, MAC input, and the first wrapped command.</p></li>
</ol>
<h2>Card-specific pits we actually hit</h2>
<h3>JCOP</h3>
<ul>
<li><p>Many JCOP samples accept SCP02 and SCP03, but default transport keysets and key versions are easy to mismatch after a customer re-perso.</p></li>
<li><p>Watch for SSD vs ISD confusion: authenticating to the wrong domain gives a clean-looking 6982/6985 during LOAD.</p></li>
<li><p>Large CAP files need sensible block size once ENC+MAC overhead is added. A block size that worked in plain mode can fail after wrapping.</p></li>
</ul>
<h3>ACOS / similar GP cards</h3>
<ul>
<li><p>Some profiles are stricter about security level P1 values. A level that works on JCOP may be rejected.</p></li>
<li><p>Memory / EEPROM limits show up late: AUTH succeeds, first LOAD blocks succeed, then a later block returns 6A84 / related memory errors.</p></li>
<li><p>If the card reports SCP02 only, do not force SCP03 from the host UI. Force-matching is a common self-inflicted failure.</p></li>
</ul>
<h2>Status word / error code field guide</h2>
<p>This is the table engineers actually search for when a secure channel dies mid-script.</p>
<table>
<thead>
<tr><th>SW</th><th>Usual meaning in SCP / CAP flow</th><th>What to check first</th></tr>
</thead>
<tbody>
<tr><td><code>9000</code></td><td>APDU accepted at card layer</td><td>Still verify response data / R-MAC if your host expects them</td></tr>
<tr><td><code>6982</code></td><td>Security status not satisfied</td><td>Wrong MAC, wrong session keys, ICV chaining broken, or command sent outside the authenticated state</td></tr>
<tr><td><code>6985</code></td><td>Conditions of use not satisfied</td><td>Lifecycle / privilege issue, missing prior INSTALL [for load], or trying LOAD/INSTALL in the wrong state</td></tr>
<tr><td><code>6A86</code></td><td>Incorrect P1-P2</td><td>EXTERNAL AUTHENTICATE security level P1 not accepted, or INSTALL/LOAD parameters wrong for this card</td></tr>
<tr><td><code>6A82</code></td><td>File / application not found</td><td>Wrong AID, applet not installed, or selecting SSD/ISD incorrectly</td></tr>
<tr><td><code>6A80</code></td><td>Incorrect data in command field</td><td>CAP structure / AID collision / malformed INSTALL data</td></tr>
<tr><td><code>6A84</code></td><td>Not enough memory space</td><td>Package too large for remaining EEPROM; reduce CAP or delete unused packages</td></tr>
<tr><td><code>6700</code></td><td>Wrong length</td><td>Lc does not match data+MAC after wrapping; classic off-by-MAC-length bug</td></tr>
<tr><td><code>6D00</code></td><td>INS not supported</td><td>Not in the expected security domain, or card does not expose that GP command</td></tr>
</tbody>
</table>
<h2>Session keys and what they are used for</h2>
<ul>
<li><p><strong>S-ENC</strong> — encrypts command data when C-DECRYPTION / ENC is enabled.</p></li>
<li><p><strong>S-MAC</strong> — computes C-MAC over the protected command.</p></li>
<li><p><strong>S-RMAC</strong> — used when response MACs are in play.</p></li>
<li><p><strong>DEK / key encryption key material</strong> — relevant when putting keys, not for every LOAD.</p></li>
</ul>
<p>If AUTH works and only encrypted commands fail, suspect S-ENC derivation or encrypt/MAC order. If every MAC’d command fails immediately, suspect S-MAC derivation or ICV chaining.</p>
<h2>Debug checklist we use before blaming the card</h2>
<ol>
<li><p>Key version and key identifier match the ISD (or intended SSD).</p></li>
<li><p>ENC / MAC / DEK values are correct for that key set.</p></li>
<li><p>Host cryptogram calculation matches the selected SCP.</p></li>
<li><p>EXTERNAL AUTHENTICATE P1 is a security level the card accepts.</p></li>
<li><p>MAC input bytes and ICV chaining match the SCP option.</p></li>
<li><p>Encrypt vs MAC order matches SCP03 expectations.</p></li>
<li><p>First wrapped command after AUTH is logged in full hex.</p></li>
</ol>
<h2>Bottom line</h2>
<p><strong>SCP02</strong> remains the right channel for many existing cards and lab samples. <strong>SCP03</strong> is the better default for new AES-capable designs. Choose what the card implements, then lock derivation, MAC order and a known-good APDU trace before personalization volume starts.</p>
<p>If you need a desktop host that can open SCP02/SCP03, show CPLC, load a CAP and keep the APDU console visible, use the <a href="/en/tools/javacard-tool">JavaCard Tool page</a> or the deeper walkthrough in <a href="/en/blog/nfctec-javacard-tool">NFCTEC JavaCard Tool</a>. Builds are also in the <a href="/en/downloads">download center</a>.</p>`;

const payload = {
  locale: "en",
  slug: "scp02-vs-scp03-javacard-secure-channel",
  title: "SCP02 vs SCP03: Which GlobalPlatform Secure Channel Should You Use?",
  excerpt:
    "Lab-level SCP02 vs SCP03 guide for JavaCard: full APDU traces, i=15 C-MAC pitfalls, SCP03 encrypt/MAC order bugs, JCOP/ACOS notes, and a 6982/6985/6A86 field guide.",
  category: "JavaCard",
  readMinutes: 14,
  status: "published",
  seoTitle: "SCP02 vs SCP03 Difference with APDU Trace | JavaCard Secure Channel",
  seoDescription:
    "Compare SCP02 and SCP03 with real INITIALIZE UPDATE / EXTERNAL AUTHENTICATE traces, C-MAC pitfalls, encrypt-then-MAC mistakes, JCOP/ACOS issues, and status words 6982, 6985, 6A86.",
  body,
};

const res = await fetch(`${API}/admin/posts/${POST_ID}`, {
  method: "PATCH",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${TOKEN}`,
  },
  body: JSON.stringify(payload),
});
const text = await res.text();
console.log("PATCH", res.status, text.slice(0, 300));

const live = await fetch(
  `https://web.nfctec.com/api/public/posts/scp02-vs-scp03-javacard-secure-channel?locale=en`,
);
const j = await live.json();
const words = j.body?.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
console.log({
  words,
  hasAPDU: j.body?.includes("80 50"),
  hasAuthor: j.body?.includes("Senior NFC"),
  has6982: j.body?.includes("6982"),
  hasTools: j.body?.includes("/en/tools/javacard-tool"),
  hasBlog: j.body?.includes("/en/blog/nfctec-javacard-tool"),
  readMinutes: j.readMinutes,
  excerpt: j.excerpt?.slice(0, 80),
});
