/**
 * Publish NTAG213/215/216 article (EN + ZH).
 * PowerShell:
 *   $env:CMS_ADMIN_TOKEN="..."
 *   node scripts/publish-ntag21x-post.mjs
 */

const API = (process.env.CMS_API_URL || "https://admin.nfctec.com/api").replace(/\/$/, "");
const TOKEN = process.env.CMS_ADMIN_TOKEN || process.env.ADMIN_TOKEN || "";

const enBody = `<p class="byline">By Alan, Senior NFC / JavaCard Engineer at NFCTEC. Figures below follow NXP NTAG213/215/216 product data sheet Rev. 3.2 (2 June 2015).</p>
<p><strong>NTAG213, NTAG215 and NTAG216</strong> are NFC Forum Type 2 Tag ICs (ISO/IEC 14443-3 Type A, 106 kbit/s). They share one command set and one 7-byte UID. The three SKUs differ in EEPROM size, lock-bit granularity above page 0Fh, and the page numbers of the configuration block. They are not NTAG 424 DNA: there is no AES, no SUN/SDM, and the 32-bit password is sent in the clear.</p>
<p>This note is the bring-up sheet we use when a converter asks “213 or 216?” and when a lab dump does not match the NDEF the phone shows.</p>
<h2>Memory sizes (user area, not total EEPROM)</h2>
<table>
<thead>
<tr>
<th>IC</th>
<th>Total EEPROM</th>
<th>Pages (4 bytes)</th>
<th>User R/W</th>
<th>User pages</th>
<th>CC at delivery (page 03h)</th>
</tr>
</thead>
<tbody>
<tr><td>NTAG213</td><td>180 bytes</td><td>45 (00h–2Ch)</td><td>144 bytes</td><td>04h–27h (36 pages)</td><td><code>E1 10 12 00</code></td></tr>
<tr><td>NTAG215</td><td>540 bytes</td><td>135 (00h–86h)</td><td>504 bytes</td><td>04h–81h (126 pages)</td><td><code>E1 10 3E 00</code></td></tr>
<tr><td>NTAG216</td><td>924 bytes</td><td>231 (00h–E6h)</td><td>888 bytes</td><td>04h–E1h (222 pages)</td><td><code>E1 10 6D 00</code></td></tr>
</tbody>
</table>
<p>CC byte 2 is the NFC Forum Type 2 size field (NDEF area in units of 8 bytes). Writes to the CC are OR-only: a bit that becomes 1 stays 1. Anti-tearing applies to the CC and to the lock bits. NXP states 10-year data retention and 100,000 write cycles.</p>
<p>NTAG213 at delivery also preloads a short NDEF (pages 04h–05h: <code>01 03 A0 0C / 34 03 00 FE</code>). NTAG215 and NTAG216 ship an empty NDEF terminator on page 04h (<code>03 00 FE 00</code>).</p>
<h2>Identify the silicon: GET_VERSION (60h)</h2>
<p>ATQA is <code>00 44h</code> (LSB first on the wire: 44h then 00h). SAK after CL2 SELECT is <code>00h</code>. Those two values do not tell 213 from 216. Issue <code>60h</code> GET_VERSION and read eight bytes:</p>
<pre><code>HOST  60
CARD  00 04 04 02 01 00  [size]  03

size = 0Fh  NTAG213   (144 bytes user, between 2^7 and 2^8)
     = 11h  NTAG215   (504 bytes user, between 2^8 and 2^9)
     = 13h  NTAG216   (888 bytes user, between 2^9 and 2^10)

Byte0 header 00h
Byte1 vendor  04h  (NXP)
Byte2 type    04h  (NTAG)
Byte3 subtype 02h  (50 pF)
Byte4/5       01h 00h  (v1.0)
Byte7 proto   03h  (ISO/IEC 14443-3)</code></pre>
<p>If GET_VERSION is NAK or missing, you are probably on NTAG203 / Ultralight, not 21x.</p>
<h2>Page map and lock bits</h2>
<ul>
<li>Pages 00h–01h: UID (cascade level 2). Manufacturer-programmed. Not writable.</li>
<li>Page 02h: static lock bytes (plus BCC1). First 16 pages lock per page. Block-locking bits in lock byte 0 also freeze the CC (page 03h) and page groups 04h–09h / 0Ah–0Fh.</li>
<li>Page 03h: Capability Container.</li>
<li>User NDEF: 04h through last user page (27h / 81h / E1h).</li>
<li>Dynamic lock page: 28h (213), 82h (215), E2h (216). Above page 0Fh, NTAG213 locks two pages per bit; 215/216 lock 16 pages per bit. Do not copy a 213 lock map onto 216.</li>
<li>Configuration: 29h–2Ch (213), 83h–86h (215), E3h–E6h (216).</li>
</ul>
<h2>Commands you actually send</h2>
<table>
<thead>
<tr>
<th>Code</th>
<th>Name</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr><td><code>30h</code></td><td>READ</td><td>One start page; returns 16 bytes (four pages). Wraps at the end of accessible memory.</td></tr>
<tr><td><code>3Ah</code></td><td>FAST_READ</td><td>Start and end page. One round-trip for the whole NDEF on a production encoder. Frame length must fit the reader.</td></tr>
<tr><td><code>A2h</code></td><td>WRITE</td><td>One page (4 bytes). ACK is 4-bit <code>Ah</code>.</td></tr>
<tr><td><code>A0h</code></td><td>COMPATIBILITY_WRITE</td><td>16-byte payload; only the first 4 bytes are stored (NTAG203-style hosts).</td></tr>
<tr><td><code>1Bh</code></td><td>PWD_AUTH</td><td>4-byte PWD; 2-byte PACK on success. Session lasts until the tag leaves the field.</td></tr>
<tr><td><code>39h</code></td><td>READ_CNT</td><td>24-bit NFC counter (address 02h). Increments on the first valid READ or FAST_READ after RF power-up if NFC_CNT_EN is set.</td></tr>
<tr><td><code>3Ch</code></td><td>READ_SIG</td><td>32-byte ECC originality signature programmed at NXP. Proves NXP silicon, not that your NDEF is genuine.</td></tr>
</tbody>
</table>
<p>4-bit NAK values: <code>0h</code> invalid page, <code>1h</code> parity/CRC, <code>4h</code> authentication-attempt limit, <code>5h</code> EEPROM write error.</p>
<h2>32-bit password: AUTH0, PROT, PWD, PACK</h2>
<p>Default PWD is <code>FF FF FF FF</code>, PACK <code>00 00</code>, AUTH0 <code>FFh</code> (protection off). PWD and PACK are write-only: a READ of those pages returns zeros.</p>
<p>AUTH0 is the first page that requires a successful PWD_AUTH. Any AUTH0 above the last configuration page disables protection. PROT in ACCESS (page 2Ah / 84h / E4h): 0 = write-protect only; 1 = read and write. AUTHLIM (3 bits) can cap failed PWD_AUTH attempts; overflow returns NAK <code>4h</code> and is not a recoverable “try again” on that tag.</p>
<p>PWD and PACK are written least-significant byte first, same order as PWD_AUTH. NXP’s recommended sequence:</p>
<pre><code># NTAG213 example — change PWD before you close AUTH0
A2  2B  11 22 33 44     WRITE PWD page 2Bh
A2  2C  55 66 00 00     WRITE PACK (2 bytes) + RFUI zeros
A2  2A  00 00 00 00     ACCESS as required (PROT / NFC_CNT_EN / AUTHLIM)
A2  29  .. .. ..  2B    AUTH0 = 2Bh  (protect from PWD page; last write)

# Later session
1B  11 22 33 44         PWD_AUTH
    -> 55 66            PACK must match what you stored</code></pre>
<p>On NTAG215 use pages 85h / 86h / 84h / 83h; on NTAG216 use E5h / E6h / E4h / E3h. If AUTH0 already covers the config pages, PWD_AUTH must succeed before you can change PWD.</p>
<p>Two limits that show up in RFQs:</p>
<ul>
<li>PWD_AUTH is not a cryptographic channel. A sniffer on the 13.56 MHz link sees the four password bytes. NXP’s own data sheet calls this an “easy and convenient” access restriction, not a substitute for AES.</li>
<li>One PWD per IC. There is no per-file key. For URL anti-clone with CMAC, use <a href="/en/blog/ntag424-dna-sun-url-authentication-example">NTAG 424 DNA SUN</a>, not 21x password plus a static NDEF.</li>
</ul>
<p>Diversify PWD from the 7-byte UID if you still use 21x password. A single SKU-wide PWD is one dump away from a line of writable tags.</p>
<h2>UID / NFC-counter ASCII mirror</h2>
<p>MIRROR_CONF on the first config page: 01b UID, 10b counter, 11b both. MIRROR_PAGE must be greater than 03h or the feature stays off. UID mirror occupies 14 ASCII hex bytes. UID+counter inserts separator <code>x</code> (78h) and six ASCII hex digits for the 24-bit counter (21 bytes total with the separator). If the reserved span runs past the last user page, nothing is mirrored.</p>
<p>The phone still reads a normal NDEF URL. Serialization happens on READ/FAST_READ of those pages. The NFC counter only steps on the first READ/FAST_READ after power-up, so a reader that READs twice in one field does not double-count.</p>
<h2>Which SKU to buy</h2>
<ul>
<li><strong>NTAG213</strong> — short HTTPS URL, Wi-Fi handover, business card. Lowest cost. 144 user bytes fills fast once you add UID mirror (14 bytes) plus a long path.</li>
<li><strong>NTAG215</strong> — 504 user bytes. Common for larger NDEF (vCard, longer query strings). Publicly used as the NFC IC in Nintendo Amiibo figures.</li>
<li><strong>NTAG216</strong> — 888 user bytes when the NDEF must hold extra records (locale URLs, extra MIME) without shrinking the URL.</li>
</ul>
<p>Antenna and 50 pF input capacitance are the same family. Do not treat 216 as “more secure”; it is more EEPROM.</p>
<h2>NTAG21x versus NTAG 424 DNA</h2>
<table>
<thead>
<tr>
<th></th>
<th>NTAG213/215/216</th>
<th>NTAG 424 DNA</th>
</tr>
</thead>
<tbody>
<tr><td>Forum type</td><td>Type 2</td><td>Type 4</td></tr>
<tr><td>User data</td><td>144 / 504 / 888 bytes</td><td>File system, 416 bytes typical user file</td></tr>
<tr><td>Auth</td><td>32-bit PWD over RF</td><td>AES, EV2, SDM/SUN CMAC</td></tr>
<tr><td>Clone of a static URL</td><td>Trivial (copy NDEF)</td><td>Server checks CMAC + counter</td></tr>
</tbody>
</table>
<p>Brand-protection programmes that started on 213 “password plus unique URL” usually move to 424 when the first cloned roll appears. Tooling for 424: <a href="/en/tools/ntag424-tool">NTAG424 DNA Tool</a>.</p>
<h2>Lab checklist</h2>
<ol>
<li>GET_VERSION. Confirm 0Fh / 11h / 13h before you apply a 213 encoder profile to a 216 inlay.</li>
<li>READ page 03h. CC must match the SKU. If byte 2 is already OR’d to a smaller size, NDEF capacity is permanently reduced.</li>
<li>WRITE a known page, READ it back, then FAST_READ the NDEF span on the production reader (not only ACR122).</li>
<li>If password is in the SOW: program PWD/PACK, set ACCESS, set AUTH0 last, power-cycle, confirm unauthenticated WRITE NAK, then PWD_AUTH and PACK.</li>
<li>If ASCII mirror is in the SOW: reserve 14 or 21 bytes inside user memory, set MIRROR_PAGE &gt; 03h, tap a phone and inspect the URL, not only a desktop dump of physical EEPROM (the mirror is virtual on READ).</li>
<li>READ_SIG if incoming inspection must reject non-NXP silicon. Still treat NDEF as unsigned.</li>
</ol>
<h2>FAQ</h2>
<h3>Can I lock an NTAG213 so the URL cannot be copied?</h3>
<p>You can lock pages so they cannot be rewritten, and you can password-protect writes. Anyone can still READ the NDEF and print another tag. Copy resistance needs a per-tap MAC, which this family does not compute.</p>
<h3>Is the NFC counter a one-time URL?</h3>
<p>No. The counter is 24-bit and only increases once per RF field if enabled. Without a MAC, an attacker copies the current URL including the mirrored counter and replays it until the next legitimate tap.</p>
<h3>Does CFGLCK freeze the password?</h3>
<p>CFGLCK permanently write-locks the first two configuration pages (mirror/AUTH0 and ACCESS) after a power cycle. PWD and PACK remain writable. NXP still recommends pointing AUTH0 at the PWD page so those writes require PWD_AUTH.</p>
<p>NXP document: NTAG213/215/216 product data sheet, Rev. 3.2. Encoder builds and readers: <a href="/en/downloads">download center</a>.</p>`;

const zhBody = `<p class="byline">作者：Alan，NFCTEC NFC / JavaCard 工程师。参数对齐 NXP NTAG213/215/216 产品数据手册 Rev. 3.2（2015-06-02）。</p>
<p><strong>NTAG213、NTAG215、NTAG216</strong> 是 NFC Forum Type 2 标签芯片（ISO/IEC 14443-3 Type A，106 kbit/s）。命令集和 7 字节 UID 相同，差别在 EEPROM 容量、page 0Fh 以上的锁定位粒度，以及配置页页号。它们不是 NTAG 424 DNA：没有 AES，没有 SUN/SDM，32 位密码在射频上明文传输。</p>
<p>下面是产线问「213 还是 216」以及实验室 dump 和手机 NDEF 对不上时用的对照。</p>
<h2>容量（用户区，不是整片 EEPROM）</h2>
<table>
<thead>
<tr>
<th>型号</th>
<th>总 EEPROM</th>
<th>页（每页 4 字节）</th>
<th>用户读写</th>
<th>用户页</th>
<th>出厂 CC（page 03h）</th>
</tr>
</thead>
<tbody>
<tr><td>NTAG213</td><td>180 字节</td><td>45（00h–2Ch）</td><td>144 字节</td><td>04h–27h（36 页）</td><td><code>E1 10 12 00</code></td></tr>
<tr><td>NTAG215</td><td>540 字节</td><td>135（00h–86h）</td><td>504 字节</td><td>04h–81h（126 页）</td><td><code>E1 10 3E 00</code></td></tr>
<tr><td>NTAG216</td><td>924 字节</td><td>231（00h–E6h）</td><td>888 字节</td><td>04h–E1h（222 页）</td><td><code>E1 10 6D 00</code></td></tr>
</tbody>
</table>
<p>CC 第 2 字节是 Type 2 规格里的 NDEF 区大小（以 8 字节为单位）。对 CC 的写是按位或，置 1 不能清 0。CC 和锁定位有 anti-tearing。手册给出数据保持 10 年、擦写 100,000 次。</p>
<p>NTAG213 出厂在 04h–05h 预置短 NDEF（<code>01 03 A0 0C / 34 03 00 FE</code>）。NTAG215/216 出厂 page 04h 为 <code>03 00 FE 00</code>。</p>
<h2>识别芯片：GET_VERSION（60h）</h2>
<p>ATQA 为 <code>00 44h</code>（线上先发 44h）。CL2 SELECT 后 SAK 为 <code>00h</code>。这两个值区分不了 213 和 216。发 <code>60h</code>，读 8 字节：</p>
<pre><code>HOST  60
CARD  00 04 04 02 01 00  [size]  03

size = 0Fh  NTAG213
     = 11h  NTAG215
     = 13h  NTAG216</code></pre>
<p>字节含义：00h 头、04h NXP、04h NTAG、02h 50 pF、01h 00h 版本 1.0、03h ISO/IEC 14443-3。没有 GET_VERSION 时，更像 NTAG203 / Ultralight，不是 21x。</p>
<h2>页图与锁定位</h2>
<ul>
<li>00h–01h：UID。出厂写入，不可改。</li>
<li>02h：静态锁定位。前 16 页按页锁定。lock byte 0 的 block-locking 还可冻结 CC（03h）以及 04h–09h、0Ah–0Fh。</li>
<li>03h：Capability Container。</li>
<li>用户 NDEF：04h 到末用户页（27h / 81h / E1h）。</li>
<li>动态锁页：213 为 28h，215 为 82h，216 为 E2h。page 0Fh 以上，213 每位锁 2 页，215/216 每位锁 16 页。不要把 213 的锁图套到 216。</li>
<li>配置页：213 为 29h–2Ch，215 为 83h–86h，216 为 E3h–E6h。</li>
</ul>
<h2>命令</h2>
<table>
<thead>
<tr>
<th>码</th>
<th>名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr><td><code>30h</code></td><td>READ</td><td>起始页，返回 16 字节（4 页）。</td></tr>
<tr><td><code>3Ah</code></td><td>FAST_READ</td><td>起止页。产线一次读完 NDEF。帧长受读头限制。</td></tr>
<tr><td><code>A2h</code></td><td>WRITE</td><td>写 1 页 4 字节。ACK 为 4 bit <code>Ah</code>。</td></tr>
<tr><td><code>A0h</code></td><td>COMPATIBILITY_WRITE</td><td>载荷 16 字节，只存前 4 字节（兼容 NTAG203 主机）。</td></tr>
<tr><td><code>1Bh</code></td><td>PWD_AUTH</td><td>4 字节 PWD，成功返回 2 字节 PACK。离场会话结束。</td></tr>
<tr><td><code>39h</code></td><td>READ_CNT</td><td>24 bit NFC 计数器（地址 02h）。NFC_CNT_EN 置位后，每次上电后第一次有效 READ/FAST_READ 加一。</td></tr>
<tr><td><code>3Ch</code></td><td>READ_SIG</td><td>32 字节 ECC 原厂签名。证明是 NXP 硅片，不证明 NDEF 未被复制。</td></tr>
</tbody>
</table>
<p>4 bit NAK：<code>0h</code> 页地址非法，<code>1h</code> 校验错，<code>4h</code> 认证次数上限，<code>5h</code> EEPROM 写失败。</p>
<h2>32 位密码：AUTH0、PROT、PWD、PACK</h2>
<p>默认 PWD <code>FF FF FF FF</code>，PACK <code>00 00</code>，AUTH0 <code>FFh</code>（关闭）。PWD/PACK 只写：READ 这些页得到 0。</p>
<p>AUTH0 是需要先通过 PWD_AUTH 的起始页。AUTH0 大于最后配置页等于关闭保护。ACCESS 里 PROT：0 只保护写，1 读写都保护。AUTHLIM（3 bit）可限制失败次数，溢出 NAK <code>4h</code>，该标签不能再靠重试恢复。</p>
<p>PWD、PACK 低字节在前，与 PWD_AUTH 一致。建议顺序：先写 PWD、PACK、ACCESS，最后写 AUTH0。</p>
<pre><code># NTAG213
A2  2B  11 22 33 44
A2  2C  55 66 00 00
A2  2A  ...           ACCESS
A2  29  .. .. ..  2B  AUTH0 = 2Bh

1B  11 22 33 44
    -> 55 66          PACK</code></pre>
<p>NTAG215 用 85h/86h/84h/83h，NTAG216 用 E5h/E6h/E4h/E3h。AUTH0 已经盖住配置页时，改 PWD 必须先认证。</p>
<ul>
<li>PWD_AUTH 不是密码学通道。13.56 MHz 上可以听到 4 字节密码。手册写的是便于限制访问，不能替代 AES。</li>
<li>整片一把密码，没有按文件密钥。要做带 CMAC 的 URL 验真，用 <a href="/zh/blog/ntag424-dna-sun-url-authentication-example">NTAG 424 DNA SUN</a>，不要用 21x 密码加静态 NDEF。</li>
</ul>
<p>仍用 21x 密码时，按 7 字节 UID 分散 PWD。SKU 共用一把密码，拆一枚就能改整批。</p>
<h2>UID / 计数器 ASCII 镜像</h2>
<p>MIRROR_CONF：01b UID，10b 计数器，11b 二者。MIRROR_PAGE 必须大于 03h 才打开。UID 镜像占 14 个 ASCII 十六进制字符。UID+计数器中间插入 <code>x</code>（78h），计数器 6 个 ASCII 十六进制（含分隔共 21 字节）。超出用户区则不镜像。</p>
<p>手机读到的仍是普通 NDEF URL。序列化发生在 READ/FAST_READ。计数器每个射频场只加一次，同一场内读两次不会加两次。</p>
<h2>怎么选型</h2>
<ul>
<li><strong>NTAG213</strong>：短链接、Wi-Fi 交接、名片。成本最低。加上 14 字节 UID 镜像后，144 字节很快不够。</li>
<li><strong>NTAG215</strong>：504 字节。较长 NDEF（vCard、长 query）。任天堂 Amiibo 使用该型号，属公开信息。</li>
<li><strong>NTAG216</strong>：888 字节，多语言 URL 或多条 MIME 时用。不是“更安全”，只是 EEPROM 更大。</li>
</ul>
<p>天线与 50 pF 输入电容同属这一代。</p>
<h2>和 NTAG 424 DNA 的差别</h2>
<table>
<thead>
<tr>
<th></th>
<th>NTAG213/215/216</th>
<th>NTAG 424 DNA</th>
</tr>
</thead>
<tbody>
<tr><td>Forum 类型</td><td>Type 2</td><td>Type 4</td></tr>
<tr><td>用户数据</td><td>144 / 504 / 888 字节</td><td>文件系统，用户文件约 416 字节</td></tr>
<tr><td>认证</td><td>射频上的 32 位 PWD</td><td>AES、EV2、SDM/SUN CMAC</td></tr>
<tr><td>静态 URL 被复制</td><td>复制 NDEF 即可</td><td>服务器校验 CMAC 和计数器</td></tr>
</tbody>
</table>
<p>防伪若从 213「密码 + 唯一 URL」起步，第一批被克隆后通常改 424。424 工具：<a href="/zh/tools/ntag424-tool">NTAG424 DNA 工具</a>。</p>
<h2>实验室清单</h2>
<ol>
<li>GET_VERSION，确认 0Fh / 11h / 13h，避免 213 编码机配置打到 216 嵌体。</li>
<li>READ page 03h。CC 必须对型号。byte 2 已被或成更小值时，NDEF 容量永久变小。</li>
<li>WRITE 再 READ，然后在产线读头上 FAST_READ 整段 NDEF，不要只在 ACR122 上通过。</li>
<li>合同含密码：写 PWD/PACK，写 ACCESS，最后写 AUTH0；掉电后再测未认证 WRITE 为 NAK，再 PWD_AUTH 对 PACK。</li>
<li>合同含 ASCII 镜像：用户区内留 14 或 21 字节，MIRROR_PAGE &gt; 03h，用手机看 URL。镜像在 READ 时是虚拟内容，EEPROM 物理 dump 看不到。</li>
<li>来料要排除非 NXP 硅片时做 READ_SIG。NDEF 仍视为未签名。</li>
</ol>
<h2>FAQ</h2>
<h3>把 NTAG213 锁死，URL 就不会被复制吗？</h3>
<p>可以锁页禁止改写，也可以用密码保护写。任何人仍能 READ NDEF 再印另一枚。抗复制需要每次轻触的 MAC，这一代不算。</p>
<h3>NFC 计数器等于一次性链接吗？</h3>
<p>不是。计数器 24 bit，使能后每个射频场只加一次。没有 MAC 时，攻击者复制当前带镜像计数器的 URL，可以重放到下一次合法轻触之前。</p>
<h3>CFGLCK 会冻结密码吗？</h3>
<p>CFGLCK 在掉电后永久写保护前两页配置（镜像/AUTH0 与 ACCESS）。PWD 和 PACK 仍可写。手册仍建议把 AUTH0 指到 PWD 页，使改密必须先认证。</p>
<p>手册：NTAG213/215/216 Product data sheet Rev. 3.2。工具与读头见 <a href="/zh/downloads">下载中心</a>。</p>`;

const posts = [
  {
    locale: "en",
    slug: "ntag213-vs-ntag215-vs-ntag216",
    title: "NTAG213 vs NTAG215 vs NTAG216: Memory Map, GET_VERSION, Password",
    excerpt:
      "NXP Type 2 tags compared: 144/504/888-byte user memory, GET_VERSION 0F/11/13h, CC, PWD_AUTH 1Bh, AUTH0/PROT, and why 32-bit password is not NTAG 424 DNA.",
    category: "NFC",
    readMinutes: 12,
    status: "published",
    publishedAt: new Date().toISOString(),
    seoTitle: "NTAG213 vs NTAG215 vs NTAG216 | Memory, GET_VERSION, PWD_AUTH",
    seoDescription:
      "Compare NTAG213, NTAG215 and NTAG216: user pages, CC E1 10 12/3E/6D 00, GET_VERSION size byte, FAST_READ, 32-bit PWD_AUTH, ASCII mirror, vs NTAG 424 DNA.",
    body: enBody,
  },
  {
    locale: "zh",
    slug: "ntag213-vs-ntag215-vs-ntag216",
    title: "NTAG213 / 215 / 216 对照：容量、GET_VERSION、32 位密码",
    excerpt:
      "NXP Type 2 标签对照：用户区 144/504/888 字节、GET_VERSION 0F/11/13h、CC、PWD_AUTH 1Bh、AUTH0/PROT，以及为何 32 位密码不是 NTAG 424 DNA。",
    category: "NFC",
    readMinutes: 12,
    status: "published",
    publishedAt: new Date().toISOString(),
    seoTitle: "NTAG213 vs NTAG215 vs NTAG216｜容量、GET_VERSION、PWD_AUTH",
    seoDescription:
      "对照 NTAG213、215、216：用户页、CC E1 10 12/3E/6D 00、GET_VERSION、FAST_READ、32 位 PWD_AUTH、ASCII 镜像，以及与 NTAG 424 DNA 的差别。",
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

async function main() {
  if (!TOKEN) {
    console.error("Missing CMS_ADMIN_TOKEN");
    process.exit(2);
  }
  for (const post of posts) {
    const result = await upsert(post, TOKEN);
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
