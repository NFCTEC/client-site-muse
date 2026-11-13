/**
 * Publish J3R180 vs J2A040 article (EN + ZH).
 * $env:CMS_ADMIN_TOKEN="..." ; node scripts/publish-j3r180-j2a040-post.mjs
 */

const API = (process.env.CMS_API_URL || "https://admin.nfctec.com/api").replace(/\/$/, "");
const TOKEN = process.env.CMS_ADMIN_TOKEN || process.env.ADMIN_TOKEN || "";

const AMZ =
  "https://www.amazon.com/J3R180-Magnetic-Stripe-Interface-EEPROM/dp/B0HD7Z44HJ";

const enBody = `<p class="byline">By Alan, Senior NFC / JavaCard Engineer at NFCTEC. J2A040 figures from NXP JCOP V2.4.1 short data sheet / Security Target (Java Card 2.2.2, GlobalPlatform 2.1.1, SmartMX P5CC040). J3R180 figures from NXP JCOP 4 P71 short data sheet Rev. 1.0 (2019-03-27) and the JCOP 4 SECID portfolio (SmartMX3 P71).</p>
<p><strong>J2A040</strong> and <strong>J3R180</strong> are both NXP JCOP Java Cards. They are not two sizes of the same OS. J2A040 is JCOP 2.4.1 on a contact-only SmartMX (P5CC040V0B): Java Card 2.2.2, GlobalPlatform 2.1.1, about 40 KB EEPROM, SCP01/SCP02. J3R180 is JCOP 4 P71 on SmartMX3 P71, SECID 180 kB class: Java Card 3.0.5 Classic, GlobalPlatform 2.3, dual-interface (ISO 7816 + ISO 14443 Type A), SCP01/SCP02/<strong>SCP03</strong>.</p>
<p>Blank J3R180 dual-interface cards (5-pack, no magstripe on the SKU we list) are on Amazon as ASIN B0HD7Z44HJ: <a href="${AMZ}">J3R180 JCOP4 dual-interface Java Card</a>. Listing copy often says “SCP02” and “180K EEPROM”. The OS still implements SCP03; 180 kB is the NXP memory class, not the free heap after Config Module / add-ons.</p>
<h2>Side-by-side</h2>
<table>
<thead>
<tr>
<th></th>
<th>J2A040</th>
<th>J3R180</th>
</tr>
</thead>
<tbody>
<tr><td>OS / silicon</td><td>JCOP 2.4.1 R3 on SmartMX P5CC040V0B</td><td>JCOP 4 P71 on SmartMX3 P71 (P71D321 family)</td></tr>
<tr><td>Java Card</td><td>2.2.2</td><td>3.0.5 Classic</td></tr>
<tr><td>GlobalPlatform</td><td>2.1.1</td><td>2.3 (Common Implementation v2.0)</td></tr>
<tr><td>NXP type letter</td><td>J<strong>2</strong> = contact CC hardware (no CL on this SKU)</td><td>J<strong>3</strong> = dual-interface CD hardware</td></tr>
<tr><td>Contact</td><td>ISO/IEC 7816 T=0 and T=1</td><td>T=1 default, T=0; up to 614 kbit/s</td></tr>
<tr><td>Contactless</td><td>Not on J2A040 (use J3A040 if you need CL on the 2.4.1 generation)</td><td>ISO/IEC 14443 Type A T=CL, up to 848 kbit/s (VHBR PICC→PCD up to 3.2 Mbit/s on P71)</td></tr>
<tr><td>User NVM class</td><td>40 KB EEPROM</td><td>180 kB NVM (SECID). Persistent heap is less after OS/config</td></tr>
<tr><td>Persistent heap (typical, empty of extra applets)</td><td>35 940 bytes (NXP JCOP 2.4.1 memory map, config “-”)</td><td>SECID basic example 175 280 bytes; SECID full 157 524 bytes; DESFire EV2 8k add-on example 128 844 bytes (JCOP 4 P71 SDS §2.7)</td></tr>
<tr><td>Transient / APDU buffer (2.4.1 SDS)</td><td>2 406 / 1 462 bytes</td><td>On the order of 3–4 KB transient in the same SDS table; drops if MIFARE add-ons are present</td></tr>
<tr><td>Secure channel</td><td>SCP01, SCP02 (default on most lab stock)</td><td>SCP01, SCP02 (i=05/15/35/45/55/75), SCP03 (i=00/10/20/60/70)</td></tr>
<tr><td>CC (platform)</td><td>EAL5+ (JCOP 2.4.1 / SmartMX P5 generation)</td><td>EAL6+ on P71; FIPS is an add-on on some order codes</td></tr>
<tr><td>RSA / ECC (certified API lengths)</td><td>RSA up to 2048; ECC commonly listed to 320-bit on this generation</td><td>RSA 512–2048 in 8-bit steps, optionally to 4096; ECC 224–521</td></tr>
<tr><td>AES / hashes</td><td>AES coprocessor on SmartMX; SHA-1 family on 2.4.1</td><td>AES-128/192/256; SHA-1 plus SHA-224/256/384/512</td></tr>
</tbody>
</table>
<p>NXP commercial names: the third group of digits is memory class (<code>040</code> = 40 KB, <code>180</code> = 180 kB). The first digit after J is the hardware family (<code>2</code> contact, <code>3</code> dual-interface). Do not treat J2R180 as the same SKU as J3R180 — J2R180 is the contact-only 180 kB SECID cousin.</p>
<h2>What INITIALIZE UPDATE actually tells you</h2>
<p>Do not trust the Amazon title for the channel. Blank JCOP cards often leave a default ISD keyset that still speaks SCP02 even when the OS also implements SCP03. Read the key-information field in INITIALIZE UPDATE:</p>
<pre><code>HOST  80 50 00 00 08  [8-byte host challenge]
CARD  [key info][KV][SCP][card challenge][card cryptogram]  90 00

SCP byte  02h  → open SCP02 (usual J2A040; also common on fresh J3R180 stock)
          03h  → open SCP03 (AES). Host must switch derivation, not only the UI label.</code></pre>
<p>If you force SCP03 on a J2A040, EXTERNAL AUTHENTICATE fails. If you stay on SCP02 on a J3R180 that advertised 03h, the first wrapped LOAD fails with 6982. Channel notes: <a href="/en/blog/scp02-vs-scp03-javacard-secure-channel">SCP02 vs SCP03</a>. Host: <a href="/en/tools/javacard-tool">JavaCard Tool</a>.</p>
<h2>CAP files are not interchangeable in both directions</h2>
<p>A CAP built for Java Card 2.2.2 (the J2A040 target) generally loads on JCOP 4 Classic if it stays within 2.2.2 APIs. A CAP that uses Java Card 3.0.5 Classic APIs will not install on J2A040. Convert and test on the silicon you ship. INSTALL/LOAD returning <code>6A84</code> on J2A040 after a few blocks is usually the 35 940-byte persistent heap, not a broken SCP.</p>
<p>Extended-length APDUs: JCOP 2.4.1 documents them for T=1 (not T=0). Keep LOAD block size inside the APDU buffer (1 462 bytes on the 2.4.1 map) plus MAC/ENC overhead.</p>
<h2>Contactless</h2>
<p>J2A040 has no T=CL. Phone tap and reader CL tests need J3A040 on the old generation, or J3R180 on JCOP 4. Magstripe on a PVC body is a card-factory option; it is not a JCOP feature. The B0HD7Z44HJ pack is dual-interface, no magstripe.</p>
<h2>How we tell them apart on the bench</h2>
<ol>
<li>Interface: if ISO 14443 SELECT works, it is not a J2A040.</li>
<li>INITIALIZE UPDATE SCP byte: 02 vs 03 as above.</li>
<li>GET DATA CPLC (<code>80 CA 9F 7F</code> / <code>00 CA 9F 7F</code>). IC type and OS release in CPLC differ between P5CC040 / JCOP 2.4.1 and P71 / JCOP 4. Compare against the CPLC of a known sample; ATR alone is not unique (issuers rewrite historical bytes).</li>
<li>Free EEPROM/NVM via GET DATA / JCSystem.getAvailableMemory after a failed large LOAD.</li>
</ol>
<h2>Which one to buy</h2>
<ul>
<li><strong>J2A040</strong> — contact GP scripts that already run SCP02, small applets, matching an installed JCOP 2.4.1 estate. Do not plan a 50 KB package or CL.</li>
<li><strong>J3R180</strong> — new applet work, SCP03, dual-interface, more persistent space, JC 3.0.5 Classic. Confirm the ISD keyset and whether MIFARE/DESFire add-ons are loaded (they eat the 180 kB class).</li>
</ul>
<p>Lab packs of the dual-interface J3R180: <a href="${AMZ}">Amazon B0HD7Z44HJ</a>. Change the transport/ISD keys before any production-like data goes on the card.</p>
<h2>FAQ</h2>
<h3>Does “180K EEPROM” mean 180 KB free for my CAP?</h3>
<p>No. NXP’s 180 kB is the SECID memory class. JCOP 4 P71 SDS §2.7 shows persistent space falling once Config Module, SECID options or DESFire/Plus emulations are present. Measure free NVM on the card you received.</p>
<h3>Can I load a J2A040 CAP onto J3R180?</h3>
<p>Usually yes if the CAP is Java Card 2.2.2 Classic and the AID/privileges fit GP 2.3. Test INSTALL [for install] and SELECT. Do not assume the reverse.</p>
<h3>Is the Amazon “SCP02” title wrong?</h3>
<p>It describes typical default ISD behaviour, not the OS capability. JCOP 4 P71 implements SCP03. Use INITIALIZE UPDATE.</p>
<p>Related: <a href="/en/blog/nfctec-javacard-tool">NFCTEC JavaCard Tool</a>, <a href="/en/downloads">downloads</a>.</p>`;

const zhBody = `<p class="byline">作者：Alan，NFCTEC NFC / JavaCard 工程师。J2A040 对齐 NXP JCOP V2.4.1 短数据手册 / Security Target（Java Card 2.2.2、GlobalPlatform 2.1.1、SmartMX P5CC040）。J3R180 对齐 JCOP 4 P71 短数据手册 Rev. 1.0（2019-03-27）及 JCOP 4 SECID 产品线（SmartMX3 P71）。</p>
<p><strong>J2A040</strong> 与 <strong>J3R180</strong> 同属 NXP JCOP，但不是同一操作系统的两个容量档。J2A040 是接触式 SmartMX（P5CC040V0B）上的 JCOP 2.4.1：Java Card 2.2.2、GP 2.1.1、约 40 KB EEPROM、SCP01/SCP02。J3R180 是 SmartMX3 P71 上的 JCOP 4 P71，SECID 180 kB 档：Java Card 3.0.5 Classic、GP 2.3、双界面（ISO 7816 + ISO 14443 Type A）、SCP01/SCP02/<strong>SCP03</strong>。</p>
<p>双界面空白卡（5 张装、该 SKU 无磁条）Amazon ASIN B0HD7Z44HJ：<a href="${AMZ}">J3R180 JCOP4 双界面 Java Card</a>。商品标题常写 “SCP02” 和 “180K EEPROM”。操作系统仍实现 SCP03；180 kB 是 NXP 容量分档，不是扣掉 Config Module / 插件后的空闲堆。</p>
<h2>对照表</h2>
<table>
<thead>
<tr>
<th></th>
<th>J2A040</th>
<th>J3R180</th>
</tr>
</thead>
<tbody>
<tr><td>系统 / 硅片</td><td>JCOP 2.4.1 R3，SmartMX P5CC040V0B</td><td>JCOP 4 P71，SmartMX3 P71（P71D321 系列）</td></tr>
<tr><td>Java Card</td><td>2.2.2</td><td>3.0.5 Classic</td></tr>
<tr><td>GlobalPlatform</td><td>2.1.1</td><td>2.3（CI v2.0）</td></tr>
<tr><td>型号字母</td><td>J<strong>2</strong>：接触式 CC，本 SKU 无非接</td><td>J<strong>3</strong>：双界面 CD</td></tr>
<tr><td>接触</td><td>ISO/IEC 7816 T=0、T=1</td><td>默认 T=1，支持 T=0；接触侧最高约 614 kbit/s</td></tr>
<tr><td>非接</td><td>J2A040 无（2.4.1 代要非接请用 J3A040）</td><td>ISO/IEC 14443 Type A T=CL，最高 848 kbit/s（P71 上 PICC→PCD VHBR 可达 3.2 Mbit/s）</td></tr>
<tr><td>用户 NVM 分档</td><td>40 KB EEPROM</td><td>180 kB NVM（SECID）。扣 OS/配置后持久堆更小</td></tr>
<tr><td>持久堆（典型、无额外应用）</td><td>35 940 字节（JCOP 2.4.1 内存表，配置 “-”）</td><td>SDS §2.7：SECID basic 175 280；SECID full 157 524；DESFire EV2 8k 示例 128 844 字节</td></tr>
<tr><td>瞬态 / APDU 缓冲（2.4.1 SDS）</td><td>2 406 / 1 462 字节</td><td>同手册表约 3–4 KB 瞬态；有 MIFARE 插件会下降</td></tr>
<tr><td>安全通道</td><td>SCP01、SCP02（实验室默认多为 SCP02）</td><td>SCP01、SCP02（i=05/15/35/45/55/75）、SCP03（i=00/10/20/60/70）</td></tr>
<tr><td>CC（平台）</td><td>EAL5+（JCOP 2.4.1 / P5 代）</td><td>P71 为 EAL6+；部分订货号可选 FIPS 插件</td></tr>
<tr><td>RSA / ECC</td><td>RSA 至 2048；该代 ECC 常见至 320 bit</td><td>RSA 512–2048（8 bit 步进），可选至 4096；ECC 224–521</td></tr>
<tr><td>AES / 摘要</td><td>SmartMX AES 协处理器；2.4.1 含 SHA-1 族</td><td>AES-128/192/256；SHA-1 及 SHA-224/256/384/512</td></tr>
</tbody>
</table>
<p>NXP 订货名：第三段数字是容量分档（<code>040</code> = 40 KB，<code>180</code> = 180 kB）。J 后面第一位是硬件族（<code>2</code> 接触，<code>3</code> 双界面）。J2R180 不是 J3R180，前者是接触式 180 kB SECID。</p>
<h2>INITIALIZE UPDATE 读什么</h2>
<p>不要只看 Amazon 标题。空白 JCOP 的默认 ISD 密钥集经常仍走 SCP02，即使 OS 已实现 SCP03。看 INITIALIZE UPDATE 的密钥信息：</p>
<pre><code>HOST  80 50 00 00 08  [8 字节主机挑战]
CARD  [key info][KV][SCP][卡挑战][卡密文]  90 00

SCP 字节  02h  → SCP02（J2A040 常态；新到的 J3R180 也常见）
          03h  → SCP03（AES）。主机必须换派生，不能只改界面标签。</code></pre>
<p>在 J2A040 上强开 SCP03，EXTERNAL AUTHENTICATE 会失败。J3R180 已报 03h 却仍按 SCP02 包装，第一条 LOAD 常 6982。说明：<a href="/zh/blog/scp02-vs-scp03-javacard-secure-channel">SCP02 vs SCP03</a>。工具：<a href="/zh/tools/javacard-tool">JavaCard 工具</a>。</p>
<h2>CAP 不能双向互换</h2>
<p>按 Java Card 2.2.2 编译、且只用 2.2.2 API 的 CAP，一般能装上 JCOP 4 Classic。使用 3.0.5 Classic API 的 CAP 无法装上 J2A040。在实际硅片上做 INSTALL。J2A040 上 LOAD 若干块后 <code>6A84</code>，多半是 35 940 字节持久堆，不是通道坏了。</p>
<p>扩展长度 APDU：JCOP 2.4.1 写明 T=1 支持（T=0 不支持）。LOAD 分块须落在 2.4.1 的 1 462 字节 APDU 缓冲加 MAC/ENC 开销之内。</p>
<h2>非接</h2>
<p>J2A040 没有 T=CL。手机轻触或非接读头要用 2.4.1 代的 J3A040，或 JCOP 4 的 J3R180。PVC 上的磁条是卡厂选项，不是 JCOP 功能。B0HD7Z44HJ 这包是双界面、无磁条。</p>
<h2>台架上怎么区分</h2>
<ol>
<li>界面：ISO 14443 SELECT 能过，就不是 J2A040。</li>
<li>INITIALIZE UPDATE 的 SCP 字节：02 或 03。</li>
<li>GET DATA CPLC（<code>80 CA 9F 7F</code> / <code>00 CA 9F 7F</code>）。P5CC040 / JCOP 2.4.1 与 P71 / JCOP 4 的 IC 类型和 OS 版本不同。和已知样卡 CPLC 对照；ATR 可被改写，不能单独当型号。</li>
<li>大 CAP 失败后用 GET DATA / JCSystem.getAvailableMemory 看剩余 NVM。</li>
</ol>
<h2>怎么选</h2>
<ul>
<li><strong>J2A040</strong>：已有 SCP02 接触脚本、小应用、要对齐现场 JCOP 2.4.1。不要按 50 KB 包或非接来规划。</li>
<li><strong>J3R180</strong>：新应用、SCP03、双界面、更大持久空间、JC 3.0.5 Classic。到货后确认 ISD 密钥集，以及是否预装 MIFARE/DESFire（会吃掉 180 kB 分档）。</li>
</ul>
<p>双界面 J3R180 实验室用卡：<a href="${AMZ}">Amazon B0HD7Z44HJ</a>。任何接近生产的数据上卡前，先改传输/ISD 密钥。</p>
<h2>FAQ</h2>
<h3>“180K EEPROM” 等于给我 180 KB 装 CAP 吗？</h3>
<p>不是。180 kB 是 NXP 的 SECID 分档。JCOP 4 P71 SDS §2.7 写明 Config Module、SECID 选项或 DESFire/Plus 仿真会占持久空间。以你手里这张卡测空闲 NVM。</p>
<h3>J2A040 的 CAP 能上 J3R180 吗？</h3>
<p>若 CAP 是 Java Card 2.2.2 Classic 且权限符合 GP 2.3，通常可以。仍要测 INSTALL [for install] 和 SELECT。反向不行。</p>
<h3>Amazon 写 SCP02 算错吗？</h3>
<p>那是默认 ISD 行为，不是 OS 能力。JCOP 4 P71 实现 SCP03。以 INITIALIZE UPDATE 为准。</p>
<p>相关：<a href="/zh/blog/nfctec-javacard-tool">NFCTEC JavaCard 工具</a>，<a href="/zh/downloads">下载</a>。</p>`;

const posts = [
  {
    locale: "en",
    slug: "jcop-j3r180-vs-j2a040",
    title: "JCOP J3R180 vs J2A040: Java Card 3.0.5, GP 2.3, SCP03",
    excerpt:
      "NXP J3R180 (JCOP 4 P71, JC 3.0.5, GP 2.3, dual-interface, 180 kB class, SCP03) versus J2A040 (JCOP 2.4.1, JC 2.2.2, GP 2.1.1, contact, 40 KB). INITIALIZE UPDATE, CAP, heap.",
    category: "JavaCard",
    readMinutes: 11,
    status: "published",
    publishedAt: new Date().toISOString(),
    seoTitle: "J3R180 vs J2A040 | JCOP 4 P71, Java Card 3.0.5, SCP03",
    seoDescription:
      "Compare NXP J3R180 and J2A040: JCOP 4 vs 2.4.1, dual-interface vs contact, 180 kB vs 40 KB, SCP03 vs SCP02, persistent heap, CAP compatibility, CPLC.",
    body: enBody,
  },
  {
    locale: "zh",
    slug: "jcop-j3r180-vs-j2a040",
    title: "JCOP J3R180 与 J2A040：Java Card 3.0.5、GP 2.3、SCP03",
    excerpt:
      "对照 NXP J3R180（JCOP 4 P71、JC 3.0.5、GP 2.3、双界面、180 kB、SCP03）与 J2A040（JCOP 2.4.1、JC 2.2.2、接触、40 KB）。INITIALIZE UPDATE、CAP、持久堆。",
    category: "JavaCard",
    readMinutes: 11,
    status: "published",
    publishedAt: new Date().toISOString(),
    seoTitle: "J3R180 vs J2A040｜JCOP 4 P71、Java Card 3.0.5、SCP03",
    seoDescription:
      "对照 J3R180 与 J2A040：JCOP 4 与 2.4.1、双界面与接触、180 kB 与 40 KB、SCP03 与 SCP02、持久堆、CAP 兼容、CPLC。",
    body: zhBody,
  },
];

async function upsert(post, token) {
  const headers = {
    "content-type": "application/json",
    accept: "application/json",
    authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
  };

  let res = await fetch(`${API}/admin/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify(post),
  });
  let text = await res.text();

  if (res.status === 409) {
    const listed = await fetch(`${API}/admin/posts?locale=${post.locale}`, { headers });
    const rows = await listed.json().catch(() => []);
    const found = Array.isArray(rows) ? rows.find((p) => p.slug === post.slug) : null;
    if (found?.id) {
      res = await fetch(`${API}/admin/posts/${encodeURIComponent(found.id)}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(post),
      });
      text = await res.text();
    }
  }

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { status: res.status, json };
}

async function getToken() {
  if (TOKEN) return TOKEN;
  const refresh = process.env.CMS_REFRESH_TOKEN;
  if (!refresh) return "";
  const r = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ refreshToken: refresh }),
  });
  const j = await r.json().catch(() => ({}));
  return j.accessToken || "";
}

async function main() {
  const token = await getToken();
  if (!token) {
    console.error("Missing CMS_ADMIN_TOKEN / CMS_REFRESH_TOKEN");
    process.exit(2);
  }
  for (const post of posts) {
    const result = await upsert(post, token);
    const preview =
      typeof result.json === "string"
        ? result.json.slice(0, 240)
        : JSON.stringify(result.json).slice(0, 300);
    console.log(post.locale, post.slug, result.status, preview);
    if (result.status >= 400) process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
