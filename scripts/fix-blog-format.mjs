const API = "https://admin.nfctec.com/api";
const TOKEN = process.env.CMS_ADMIN_TOKEN;

async function patch(id, payload) {
  const res = await fetch(`${API}/admin/posts/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  console.log(payload.slug, res.status, text.slice(0, 120).replace(/\s+/g, " "));
}

const scpBody = `<p class="byline">By Alan, Senior NFC / JavaCard Engineer at NFCTEC. Lab traces taken with NFCTEC JavaCard Tool on JCOP and ACOS sample cards.</p>
<p>If you load JavaCard applets for a living, you will eventually hit the same question: should this card use <strong>SCP02</strong> or <strong>SCP03</strong>? The wrong answer usually shows up as a failed EXTERNAL AUTHENTICATE, a 6982/6985 status word, or a CAP load that looks fine until the first wrapped INSTALL command.</p>
<p>This article is not another “SCP03 is newer, prefer AES” summary. It covers the host-side details that actually break in the lab: SCP02 i=15 C-MAC calculation, SCP03 encrypt-then-MAC vs MAC-then-encrypt mistakes, full INITIALIZE UPDATE / EXTERNAL AUTHENTICATE traces, and the status words we see most often on JCOP and ACOS cards.</p>
<h2>What both channels are trying to do</h2>
<p>SCP02 and SCP03 both establish a trusted session between a host and the Issuer Security Domain. After INITIALIZE UPDATE and EXTERNAL AUTHENTICATE succeed, later commands can be integrity-protected (MAC) and optionally encrypted (ENC).</p>
<p>That is why CAP LOAD and INSTALL are not “send a file”. The host must wrap APDUs exactly the way the selected SCP and security level require.</p>
<h2>A complete APDU trace you can compare against</h2>
<p>Below is a representative SCP02 bring-up at security level <code>03</code> (C-DECRYPTION + C-MAC). Exact key bytes depend on your keyset; the command structure is what matters.</p>
<pre><code>HOST  80 50 00 00 08  01 02 03 04 05 06 07 08
CARD  00 00 02 70 02 00  11 22 33 44 55 66 77 88  AA .. BB  90 00
      |key data| KV SCP  |   card challenge    | cryptogram | SW

HOST  84 82 03 00 10  [host cryptogram 8B] [C-MAC 8B]
CARD  90 00

HOST  84 F2 80 02 0A  [GET STATUS data] [C-MAC]
CARD  [response] 90 00</code></pre>
<p>SCP03 looks similar at the APDU layer (<code>80 50</code> then <code>84 82</code>), but the crypto is AES-CMAC / AES-CBC and the EXTERNAL AUTHENTICATE data field layout differs. If authentication still fails, the bug is almost always in derivation, MAC length, or command ordering — not in the CLA/INS bytes themselves.</p>
<h2>SCP02: why i=15 C-MAC trips people up</h2>
<p>SCP02 is still widely deployed on older and mid-range JavaCards. Session keys are typically 3DES-based. The part most README files gloss over is option <strong>i=15</strong> C-MAC behavior:</p>
<ul>
<li>The MAC is calculated over a specific ICV and command APDU layout, not whatever bytes you see on the wire after wrapping.</li>
<li>After the first successful MAC, the next ICV is chained from the previous MAC. If the host resets ICV to zeros on every command, command 1 may pass and command 2 fails with 6982.</li>
<li>Some hosts MAC the unwrapped command, then insert the MAC and adjust Lc. Others accidentally MAC the already-modified APDU. That off-by-one is a classic “works in one tool, fails in another” bug.</li>
</ul>
<p>When SCP02 auth succeeds but the first INSTALL/LOAD fails with 6982, dump the exact bytes that entered the MAC function — not only the final APDU hex.</p>
<h2>SCP03: encrypt order and tool bugs</h2>
<p>SCP03 is the AES-based GlobalPlatform secure channel. For new designs it is usually the better long-term choice when the card supports it. The highest-ROI detail is command protection order:</p>
<ul>
<li>For many SCP03 configurations the host must encrypt first, then MAC the protected command field according to the selected security level.</li>
<li>Several older host scripts MAC cleartext and then encrypt, or encrypt bytes that should stay outside the MAC input. Result: EXTERNAL AUTHENTICATE returns 9000, then the first LOAD block dies.</li>
<li>R-MAC expectations differ by card profile. If the host verifies R-MAC but the card is not returning one for that security level, you will fail a successful card response.</li>
</ul>
<p>Never trust a green “authenticated” indicator alone. Always send one protected GET STATUS or INSTALL [for load] immediately and confirm the wrapped APDU matches a known-good trace.</p>
<h2>How to choose quickly</h2>
<ol>
<li>Read what INITIALIZE UPDATE returns. If the card only advertises SCP02, use SCP02.</li>
<li>For new production designs on recent JavaCard OS builds, prefer SCP03 with ENC+MAC when supported.</li>
<li>Keep one known-good script per channel and per key version. Factory lines do not survive “guess the keyset”.</li>
<li>Log challenge, card cryptogram, host cryptogram, P1 security level, MAC input, and the first wrapped command.</li>
</ol>
<h2>Card-specific pits we actually hit</h2>
<h3>JCOP</h3>
<ul>
<li>Many JCOP samples accept SCP02 and SCP03, but default transport keysets and key versions are easy to mismatch after a customer re-perso.</li>
<li>Watch for SSD vs ISD confusion: authenticating to the wrong domain gives a clean-looking 6982/6985 during LOAD.</li>
<li>Large CAP files need a sensible block size once ENC+MAC overhead is added. A size that worked in plain mode can fail after wrapping.</li>
</ul>
<h3>ACOS / similar GP cards</h3>
<ul>
<li>Some profiles are stricter about security level P1 values. A level that works on JCOP may be rejected.</li>
<li>Memory limits show up late: AUTH succeeds, first LOAD blocks succeed, then a later block returns 6A84.</li>
<li>If the card reports SCP02 only, do not force SCP03 from the host UI.</li>
</ul>
<h2>Status word field guide</h2>
<p>This is the table engineers actually search for when a secure channel dies mid-script.</p>
<table>
<thead>
<tr>
<th>SW</th>
<th>Usual meaning in SCP / CAP flow</th>
<th>What to check first</th>
</tr>
</thead>
<tbody>
<tr><td><code>9000</code></td><td>APDU accepted at card layer</td><td>Still verify response data / R-MAC if the host expects them</td></tr>
<tr><td><code>6982</code></td><td>Security status not satisfied</td><td>Wrong MAC, wrong session keys, ICV chaining broken, or command sent outside the authenticated state</td></tr>
<tr><td><code>6985</code></td><td>Conditions of use not satisfied</td><td>Lifecycle / privilege issue, missing INSTALL [for load], or LOAD/INSTALL in the wrong state</td></tr>
<tr><td><code>6A86</code></td><td>Incorrect P1-P2</td><td>EXTERNAL AUTHENTICATE security level P1 not accepted, or INSTALL/LOAD parameters wrong</td></tr>
<tr><td><code>6A82</code></td><td>File / application not found</td><td>Wrong AID, applet not installed, or selecting SSD/ISD incorrectly</td></tr>
<tr><td><code>6A80</code></td><td>Incorrect data in command field</td><td>CAP structure, AID collision, or malformed INSTALL data</td></tr>
<tr><td><code>6A84</code></td><td>Not enough memory space</td><td>Package too large for remaining EEPROM</td></tr>
<tr><td><code>6700</code></td><td>Wrong length</td><td>Lc does not match data + MAC after wrapping</td></tr>
<tr><td><code>6D00</code></td><td>INS not supported</td><td>Not in the expected security domain, or the card does not expose that GP command</td></tr>
</tbody>
</table>
<h2>Session keys and what they are used for</h2>
<ul>
<li><strong>S-ENC</strong> — encrypts command data when C-DECRYPTION / ENC is enabled.</li>
<li><strong>S-MAC</strong> — computes C-MAC over the protected command.</li>
<li><strong>S-RMAC</strong> — used when response MACs are in play.</li>
<li><strong>DEK</strong> — relevant when putting keys, not for every LOAD.</li>
</ul>
<p>If AUTH works and only encrypted commands fail, suspect S-ENC derivation or encrypt/MAC order. If every MAC’d command fails immediately, suspect S-MAC derivation or ICV chaining.</p>
<h2>Debug checklist we use before blaming the card</h2>
<ol>
<li>Key version and key identifier match the ISD (or intended SSD).</li>
<li>ENC / MAC / DEK values are correct for that key set.</li>
<li>Host cryptogram calculation matches the selected SCP.</li>
<li>EXTERNAL AUTHENTICATE P1 is a security level the card accepts.</li>
<li>MAC input bytes and ICV chaining match the SCP option.</li>
<li>Encrypt vs MAC order matches SCP03 expectations.</li>
<li>First wrapped command after AUTH is logged in full hex.</li>
</ol>
<h2>Bottom line</h2>
<p><strong>SCP02</strong> remains the right channel for many existing cards and lab samples. <strong>SCP03</strong> is the better default for new AES-capable designs. Choose what the card implements, then lock derivation, MAC order and a known-good APDU trace before personalization volume starts.</p>
<p>If you need a desktop host that can open SCP02/SCP03, show CPLC, load a CAP and keep the APDU console visible, use the <a href="/en/tools/javacard-tool">JavaCard Tool page</a> or the walkthrough in <a href="/en/blog/nfctec-javacard-tool">NFCTEC JavaCard Tool</a>. Builds are also in the <a href="/en/downloads">download center</a>.</p>`;

const ntagBody = `<p class="byline">By Alan, Senior NFC / JavaCard Engineer at NFCTEC.</p>
<p>Static NFC tags are easy to clone: copy the URL, print another label, and the backend cannot tell the difference. <strong>NTAG 424 DNA</strong> fixes that with Secure Unique NFC (SUN) messaging. Every tap can produce a signed, counter-based URL that a server can verify.</p>
<p>This article walks through a practical authentication example you can use for brand protection, warranty activation, consumables and smart packaging.</p>
<h2>What a SUN URL contains</h2>
<p>On each successful NFC tap, the tag can assemble a URL that includes dynamic parameters derived from:</p>
<ul>
<li>Tag UID</li>
<li>Read counter</li>
<li>AES-CMAC over selected fields</li>
</ul>
<p>A typical pattern looks like:</p>
<pre><code>https://verify.example.com/a/{picc_data}?c={cmac}</code></pre>
<p>Exact templates vary by project, but the idea is constant: the phone opens a normal HTTPS link, and the server decides whether the tap is authentic.</p>
<h2>Server-side verification flow</h2>
<ol>
<li>Receive the tap URL.</li>
<li>Recover UID / counter (or encrypted PICC data) from the dynamic part.</li>
<li>Load the tag’s diversified AES key from your HSM or key store.</li>
<li>Recompute the CMAC over the same fields the tag used.</li>
<li>Reject the tap if the CMAC does not match.</li>
<li>Reject the tap if the counter is not strictly increasing for that UID.</li>
<li>Return an authenticity / product status page to the user.</li>
</ol>
<p>The counter check is what defeats simple URL copying. A photographed NFC link can be reused forever. A SUN tap with a spent counter should fail on replay.</p>
<h2>Personalization checklist before production</h2>
<ul>
<li>Derive a unique AES key per tag from a master key. Do not reuse one key across a SKU.</li>
<li>Configure SDM / SUN mirrors and access rights carefully. Wrong file permissions are a common pilot failure.</li>
<li>Store only what the backend needs for verification: UID index, key derivation data, last counter.</li>
<li>Test with real phones. Browser NFC behavior differs across iOS and Android versions.</li>
<li>Validate failed cases too: wrong key, replayed counter, truncated URL, offline phone.</li>
</ul>
<h2>Example bring-up with NFCTEC NTAG424 Tool</h2>
<p>For engineering validation, use a desktop or mobile tag tool before you wire factory personalization:</p>
<ol>
<li>Connect a reader or tap the sample tag.</li>
<li>Authenticate with EV2 keys.</li>
<li>Configure NDEF / SDM URL templates.</li>
<li>Generate a SUN URL from a real tap.</li>
<li>Send the same parameters to your verification API.</li>
<li>Confirm CMAC success and counter advance.</li>
</ol>
<p>Only after that lab loop is stable should you move to batch personalization and cloud verification.</p>
<h2>Bottom line</h2>
<p>Buyers searching for “NTAG424 DNA authentication example” or “SUN dynamic URL verification” want the counter + CMAC mental model, the failure modes, and a tool path they can try the same day.</p>
<p>If you need a practical tag manager for that bring-up, open the <a href="/en/tools/ntag424-tool">NTAG424 DNA Tool</a> page or grab the build from the <a href="/en/downloads">download center</a>.</p>`;

await patch("8827691e-313f-4188-8235-d96d1416abfc", {
  locale: "en",
  slug: "scp02-vs-scp03-javacard-secure-channel",
  title: "SCP02 vs SCP03: Which GlobalPlatform Secure Channel Should You Use?",
  excerpt:
    "Lab-level SCP02 vs SCP03 guide for JavaCard: APDU traces, i=15 C-MAC pitfalls, SCP03 encrypt/MAC order bugs, JCOP/ACOS notes, and a 6982/6985/6A86 field guide.",
  category: "JavaCard",
  readMinutes: 14,
  status: "published",
  seoTitle: "SCP02 vs SCP03 Difference with APDU Trace | JavaCard Secure Channel",
  seoDescription:
    "Compare SCP02 and SCP03 with INITIALIZE UPDATE / EXTERNAL AUTHENTICATE traces, C-MAC pitfalls, encrypt-then-MAC mistakes, JCOP/ACOS issues, and status words 6982, 6985, 6A86.",
  body: scpBody,
});

await patch("65992979-053c-46f4-bb0d-dc943c6bab95", {
  locale: "en",
  slug: "ntag424-dna-sun-url-authentication-example",
  title: "NTAG424 DNA SUN URL Authentication Example",
  excerpt:
    "A practical NTAG 424 DNA example: how SUN dynamic URLs, AES-CMAC, and read counters stop NFC label cloning.",
  category: "Security",
  readMinutes: 8,
  status: "published",
  seoTitle: "NTAG424 DNA Authentication Example | SUN Dynamic URL + CMAC",
  seoDescription:
    "Learn how NTAG 424 DNA SUN URLs work: UID, read counter, AES-CMAC verification, and a practical anti-counterfeit flow with NFCTEC NTAG424 Tool.",
  body: ntagBody,
});
