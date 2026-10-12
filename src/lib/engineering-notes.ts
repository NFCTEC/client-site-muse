import type { BlogPost } from "./blog-posts";

export const engineeringNotes: BlogPost[] = [
  {
    slug: "emv-card-application-and-personalization",
    cat: "EMV",
    date: "2026-10-12",
    title: "EMV issuance: data preparation, KMS and personalization",
    excerpt:
      "An issuer line is four systems agreeing on one PAN: the brand profile, data preparation, the KMS around the HSM, and the GlobalPlatform personalization session.",
    readMinutes: 9,
    body: [
      {
        paragraphs: [
          "Issuing an EMV card is not a single write command. Four systems have to agree on the same PAN: the brand profile, data preparation, the key-management system that sits on the HSM, and the personalization host that opens a GlobalPlatform secure channel. The applet is loaded before cardholder data is written, or it is loaded on the same line immediately before that write.",
          "A Reader SDK can prove the result on a bench reader. It is not the issuance system, and a 9000 from GENERATE AC is not an approval letter.",
        ],
      },
      {
        figure: {
          title: "EMV issuance line",
          lanes: [
            { name: "Profile", nodes: ["AID and kernel table", "AIP, AFL, CVM, IAC/TAC", "Certificate template"] },
            { name: "KMS / HSM", nodes: ["IMK stays in the HSM", "Diversify by PAN + PSN", "Return KCV, not key bytes"] },
            { name: "Data preparation", nodes: ["Cardholder file in", "One record per PAN", "STORE DATA blocks out"] },
            { name: "Card line", nodes: ["SCP02 or SCP03", "STORE DATA", "SELECT, GPO, GENERATE AC"] },
          ],
        },
      },
      {
        heading: "Two key sets that must stay apart",
        paragraphs: [
          "The personalization machine and the payment application do not share a key. GlobalPlatform ENC, MAC and DEK open the secure channel. INITIALIZE UPDATE and EXTERNAL AUTHENTICATE prove that channel. Those keys are how the host is allowed to write the card. They are not the keys that later produce an application cryptogram.",
          "EMV issuer master keys stay in the HSM. Data preparation asks the KMS to diversify them with the PAN and the PAN sequence number. The unique derived keys are wrapped into the personalization record, or they are produced so that only the HSM and the card handle them. A file that contains a raw IMK is a failed design. It is not a backup.",
        ],
      },
      {
        heading: "Data preparation",
        paragraphs: [
          "Data preparation does not speak ISO 7816. It builds the file the personalization host will send. The brand profile is an input, not something the operator retypes from the previous BIN.",
        ],
        items: [
          "Cardholder data: PAN, PAN sequence number, expiry, effective date, cardholder name.",
          "Application data from the profile: AID, label, priority, and the contactless kernel id when that profile has one.",
          "Risk and card data copied from the signed profile: AIP, AFL, CVM list, issuer action codes.",
          "The certificate path the profile uses for DDA or CDA: CA public key index, issuer public key certificate, ICC public key certificate.",
        ],
      },
      {
        paragraphs: [
          "The output is one record per card. Each record is a list of data grouping identifiers, or the equivalent STORE DATA script. Track data and the PAN are in that record because the card has to hold them. The IMK is not.",
        ],
      },
      {
        heading: "What the KMS actually does",
        paragraphs: [
          "The KMS is the inventory and the access policy around the HSM. It is not a folder of key files on the personalization PC.",
        ],
        items: [
          "Generate IMK-AC and the secure-messaging and MAC master keys named by the profile, under dual control.",
          "Store key version, algorithm and key check value. Operators compare the KCV on the screen with the KCV from the ceremony note.",
          "Allow a named personalization host to request diversification for a named BIN. Refuse every other caller.",
          "Write an audit row for each request: operator, PAN range or a tokenized id, key version, KCV, time.",
          "Keep separate partitions for GlobalPlatform personalization keys, EMV issuer master keys, and any later MDES or VTS token keys.",
        ],
      },
      {
        paragraphs: [
          "The host sends the PAN. The HSM returns diversified material inside the script. Nobody on the line compares key bytes. They compare the KCV, then they start the batch.",
        ],
      },
      {
        heading: "Personalization session",
        paragraphs: [
          "On the machine the order is fixed. Log the ATR first. If the profile says so, select the card manager. Open the secure channel. Only then send the prepared records. SCP02 or SCP03 is whichever INITIALIZE UPDATE negotiates, and the KMS must hold the key version that card reports.",
        ],
        code: `80 50 <key version> <key id> 08 <8-byte host challenge>
84 82 <security level> 00 <host cryptogram and C-MAC>
STORE DATA  <DGI blocks from data preparation>`,
      },
      {
        paragraphs: [
          "If EXTERNAL AUTHENTICATE returns 9000 and the next wrapped STORE DATA returns 6982, check the MAC input, the ICV, and that the session keys belong to this card. Do not start by regenerating the EMV IMK. That key was not used to open the channel.",
        ],
      },
      {
        heading: "What a lab reader can prove",
        paragraphs: [
          "After personalization, run the sample on a PC/SC reader that is not the personalization head. The point is to show that the AID, the records and the AC key belong to the same profile.",
        ],
        code: `00 A4 04 00 0E 325041592E5359532E4444463031 00
00 A4 04 00 <Lc> <AID from the profile>
80 A8 00 00 <Lc> <PDOL data> 00
00 B2 <record> <SFI> 00
80 AE <type> 00 <Lc> <CDOL data> 00`,
      },
      {
        items: [
          "SELECT PPSE (2PAY.SYS.DDF01), then SELECT the AID from the profile.",
          "GET PROCESSING OPTIONS, READ RECORD for the AFL, then GENERATE AC.",
          "9000 and a cryptogram means the sample is coherent enough to keep. It is not an EMV approval, an L3 letter, or a PCI assessment of the bureau.",
          "6A82 on SELECT means the installed AID is not the AID in the profile. 6985 on GENERATE AC usually means the risk data or the key version does not match the applet state.",
        ],
      },
      {
        heading: "What this line does not include",
        paragraphs: [
          "Kernel 2, Kernel 3 and Kernel 6 live in the terminal. This line produces the card those kernels select. Putting the card into Apple Pay or Google Pay is a second issuance, with its own token keys, and it is booked with the BIN rather than appended after the plastic has shipped.",
        ],
      },
    ],
    zh: {
      title: "EMV 发行：数据准备、KMS 与个人化",
      excerpt: "发行线是四套系统对同一个 PAN 达成一致：品牌参数、数据准备、HSM 上的 KMS，以及 GlobalPlatform 个人化会话。",
      body: [
        {
          paragraphs: [
            "发行一张 EMV 卡不是一条写卡指令。四套系统必须对同一个 PAN 达成一致：品牌参数、数据准备、包在 HSM 外面的密钥管理系统，以及打开 GlobalPlatform 安全通道的个人化主机。持卡人数据写入之前，卡应用要已经装好，或者在同一条产线上紧挨着写入之前装好。",
            "读卡器 SDK 可以在实验台读头上核对结果。它不是发行系统。GENERATE AC 返回 9000，也不是批准文件。",
          ],
        },
        {
          figure: {
            title: "EMV 发行线",
            lanes: [
              { name: "Profile", nodes: ["AID 与内核表", "AIP、AFL、CVM、IAC/TAC", "证书模板"] },
              { name: "KMS / HSM", nodes: ["IMK 留在 HSM", "按 PAN + PSN 分散", "只给出 KCV"] },
              { name: "数据准备", nodes: ["持卡人文件进入", "每个 PAN 一条记录", "输出 STORE DATA 块"] },
              { name: "产线", nodes: ["SCP02 或 SCP03", "STORE DATA", "SELECT、GPO、GENERATE AC"] },
            ],
          },
        },
        {
          heading: "两套密钥不能混",
          paragraphs: [
            "个人化设备和支付应用不共用一把密钥。GlobalPlatform 的 ENC、MAC、DEK 用来打开安全通道。INITIALIZE UPDATE 和 EXTERNAL AUTHENTICATE 证明的是这条通道。这套密钥决定主机能不能写卡，不负责后来生成应用密文。",
            "EMV 的发卡行主密钥留在 HSM 里。数据准备请 KMS 用 PAN 和 PAN 序列号做分散。分散后的密钥被包进个人化记录，或者只在 HSM 和卡片之间出现。文件里出现明文 IMK，是设计失败，不是备份。",
          ],
        },
        {
          heading: "数据准备",
          paragraphs: ["数据准备不发 ISO 7816。它生成个人化主机要发送的文件。品牌参数是输入，不是操作员照着上一套 BIN 手敲进去的。"],
          items: [
            "持卡人数据：PAN、PAN 序列号、有效期、生效日期、持卡人姓名。",
            "来自 profile 的应用数据：AID、应用标签、优先级，以及该 profile 写了接触式内核编号时的 kernel id。",
            "从已签字的 profile 抄来的风险和卡片数据：AIP、AFL、CVM list、issuer action codes。",
            "DDA 或 CDA 要用的证书路径：CA 公钥索引、发卡行公钥证书、ICC 公钥证书。",
          ],
        },
        {
          paragraphs: [
            "输出是每个卡片一条记录。记录是一组 data grouping identifier，或等价的 STORE DATA 脚本。磁道数据和 PAN 在记录里，因为卡上要保存它们。IMK 不在里面。",
          ],
        },
        {
          heading: "KMS 实际管什么",
          paragraphs: ["KMS 是 HSM 外面的库存和访问策略。它不是个人化电脑上的一个密钥文件夹。"],
          items: [
            "在双人控制下生成 IMK-AC，以及 profile 点名的安全报文和 MAC 主密钥。",
            "保存密钥版本、算法和 KCV。操作员拿屏幕上的 KCV 和密钥仪式记录里的 KCV 对照。",
            "只允许指定的个人化主机为指定 BIN 申请分散。其他调用直接拒绝。",
            "每次申请写审计：操作员、PAN 区间或脱敏标识、密钥版本、KCV、时间。",
            "分区隔开 GlobalPlatform 个人化密钥、EMV 发卡行主密钥，以及以后的 MDES 或 VTS 令牌密钥。",
          ],
        },
        {
          paragraphs: ["主机送出 PAN。HSM 把分散结果放进脚本里返回。产线上没有人核对密钥字节。他们核对 KCV，然后开批。"],
        },
        {
          heading: "个人化会话",
          paragraphs: [
            "设备上的顺序是固定的。先记下 ATR。profile 要求时先 SELECT 卡管理器。打开安全通道之后，才发送准备好的记录。用 SCP02 还是 SCP03，看 INITIALIZE UPDATE 协商出哪一种。KMS 里必须有这张卡回报的那个密钥版本。",
          ],
          code: `80 50 <key version> <key id> 08 <8-byte host challenge>
84 82 <security level> 00 <host cryptogram and C-MAC>
STORE DATA  <数据准备给出的 DGI>`,
        },
        {
          paragraphs: [
            "如果 EXTERNAL AUTHENTICATE 是 9000，下一条包过 MAC 的 STORE DATA 却是 6982，先查 MAC 输入、ICV，以及会话密钥是不是这张卡的。不要先去重新生成 EMV IMK。打开通道时用的不是那把密钥。",
          ],
        },
        {
          heading: "实验台读头能证明什么",
          paragraphs: [
            "个人化之后，用另一只 PC/SC 读头跑样品，不要用个人化头本身。目的是确认 AID、记录和 AC 密钥属于同一份 profile。",
          ],
          code: `00 A4 04 00 0E 325041592E5359532E4444463031 00
00 A4 04 00 <Lc> <profile 中的 AID>
80 A8 00 00 <Lc> <PDOL data> 00
00 B2 <record> <SFI> 00
80 AE <type> 00 <Lc> <CDOL data> 00`,
        },
        {
          items: [
            "先 SELECT PPSE（2PAY.SYS.DDF01），再 SELECT profile 里的 AID。",
            "然后 GET PROCESSING OPTIONS，按 AFL 做 READ RECORD，再 GENERATE AC。",
            "9000 加上一条应用密文，表示这张样品足够一致，可以留下。这不是 EMV 批准，不是 L3 函，也不是制卡厂的 PCI 评估。",
            "SELECT 返回 6A82，表示装进去的 AID 不是 profile 里的 AID。GENERATE AC 返回 6985，通常是风险数据或密钥版本和卡上状态对不上。",
          ],
        },
        {
          heading: "这条线不包括什么",
          paragraphs: [
            "Kernel 2、Kernel 3、Kernel 6 在终端里。这条线做出的是那些内核去 SELECT 的卡。把卡放进 Apple Pay 或 Google Pay 是第二次发行，用另一套令牌密钥，要和 BIN 一起安排，而不是塑料卡已经发出去再补。",
          ],
        },
      ],
    },
  },
  {
    slug: "hardware-wallets-cold-storage-cards",
    cat: "Crypto",
    date: "2026-10-12",
    title: "Hardware wallet cards: on-card keys, signing, and the KMS boundary",
    excerpt:
      "Loading the applet and signing a transaction are different sessions. The BIP-39 seed is created in the secure element. The KMS holds the GlobalPlatform keys, not the seed.",
    readMinutes: 7,
    body: [
      {
        paragraphs: [
          "A hardware-wallet card has two sessions that people keep mixing up. Issuance loads the applet and creates the key. Later, a host asks the card to sign. If the same machine can also read the seed back, it is not cold storage.",
          "secp256k1 covers Bitcoin and EVM-style accounts. ed25519 is used where the applet implements it. BIP-39 is the mnemonic. BIP-32 is how child keys are derived from that seed. The seed and the private key stay in the card or secure element.",
        ],
      },
      {
        figure: {
          title: "Wallet card: issue once, sign later",
          lanes: [
            { name: "Issuance", nodes: ["KMS holds GP keys", "Load the applet", "Keygen inside the SE"] },
            { name: "Signing", nodes: ["Host builds the sighash", "NFC or PC/SC", "Card returns a signature"] },
            { name: "Stays on the card", nodes: ["BIP-39 seed", "Private key", "No export command"] },
            { name: "May leave", nodes: ["Public key", "Signature", "Derivation path in the request"] },
          ],
        },
      },
      {
        heading: "Issuance",
        paragraphs: [
          "The blank card still needs a GlobalPlatform channel before the wallet applet exists. ENC, MAC and DEK for that channel come from the KMS. They prove the personalization host is allowed to load this batch. They are not the user's account key.",
          "After INSTALL and LOAD, key generation happens inside the secure element. A production cold card should use the card's own RNG. Entering a BIP-39 mnemonic from the host is a migration path: the buffer on the host is wiped in the same session, and the applet must not expose a command that returns it. A GET DATA that prints the seed is a defect, not a recovery feature.",
        ],
      },
      {
        heading: "Where the KMS stops",
        paragraphs: [
          "On this product the KMS inventories the GlobalPlatform key set and any attestation key used to show which batch the card came from. It does not inventory the BIP-39 seed. If the HSM has a copy of the seed, the card is no longer the custody boundary.",
          "FIDO credentials on the same silicon are a different applet and a different key. They are created per relying party. They are not derived from the wallet seed.",
        ],
      },
      {
        heading: "Signing",
        paragraphs: [
          "The host builds the sighash. For Bitcoin that is usually a PSBT hashed on the host. For an EVM transaction the host does the EIP-712 or transaction hash unless the applet parses the fields itself. The APDU carries the hash and the BIP-32 path. The card checks the path against its own rules, signs with the key that stays inside, and returns the signature plus a status word.",
          "The host verifies that signature with the public key it already read. Public keys can be exported. Private keys cannot. NFC and PC/SC are only the transport.",
        ],
      },
      {
        heading: "Backup",
        paragraphs: [
          "If the product needs recovery, write a SLIP-39 or similar split onto additional cards once, at issuance. A CSV of the seed on the operator's laptop is not a backup procedure. Support staff do not get a command that reconstructs the seed.",
        ],
      },
    ],
    zh: {
      title: "硬件钱包卡：卡内密钥、签名，以及 KMS 的边界",
      excerpt: "装载应用和后来的签名是两次会话。BIP-39 种子在安全元件里生成。KMS 保管的是 GlobalPlatform 密钥，不是种子。",
      body: [
        {
          paragraphs: [
            "硬件钱包卡有两次经常被混在一起的会话。发行时装载应用并生成密钥。之后主机请求卡片签名。如果同一台机器还能把种子读回来，那就不是冷存储。",
            "secp256k1 用于比特币和 EVM 账户。applet 实现了 ed25519 时用 ed25519。BIP-39 是助记词。BIP-32 从种子派生子密钥。种子和私钥留在卡片或安全元件里。",
          ],
        },
        {
          figure: {
            title: "钱包卡：发行一次，之后只签名",
            lanes: [
              { name: "发行", nodes: ["KMS 保管 GP 密钥", "装载 applet", "在 SE 内生成密钥"] },
              { name: "签名", nodes: ["主机计算 sighash", "NFC 或 PC/SC", "卡片返回签名"] },
              { name: "留在卡上", nodes: ["BIP-39 种子", "私钥", "没有导出指令"] },
              { name: "可以离开", nodes: ["公钥", "签名", "请求里的派生路径"] },
            ],
          },
        },
        {
          heading: "发行",
          paragraphs: [
            "空白卡在钱包应用存在之前，仍然要先有一条 GlobalPlatform 通道。这条通道的 ENC、MAC、DEK 来自 KMS。它们证明这台个人化主机可以装这一批卡。它们不是用户的账户密钥。",
            "INSTALL 和 LOAD 之后，密钥在安全元件内部生成。量产冷存储卡应该用卡片自己的随机数。从主机录入 BIP-39 只适合迁移：主机上的缓冲区在同一次会话里清掉，而且 applet 不能提供把种子读回来的指令。能用 GET DATA 打出种子，是缺陷，不是恢复功能。",
          ],
        },
        {
          heading: "KMS 停在哪里",
          paragraphs: [
            "在这个产品里，KMS 管理的是 GlobalPlatform 密钥，以及用来证明卡片属于哪一批的认证密钥。它不管理用户的 BIP-39 种子。如果 HSM 里有一份种子副本，卡片就不再是保管边界。",
            "同一颗安全元件上的 FIDO 凭证是另一个 applet、另一把密钥。它按 relying party 单独生成，不从钱包种子派生。",
          ],
        },
        {
          heading: "签名",
          paragraphs: [
            "主机负责算出 sighash。比特币通常是主机上对 PSBT 做哈希。EVM 交易由主机做 EIP-712 或交易哈希，除非 applet 自己解析字段。APDU 带上哈希和 BIP-32 路径。卡片按自己的规则检查路径，用留在内部的密钥签名，返回签名和状态字。",
            "主机用已经读到的公钥核验签名。公钥可以导出。私钥不能。NFC 和 PC/SC 只是传输。",
          ],
        },
        {
          heading: "备份",
          paragraphs: [
            "产品如果需要恢复，在发行时把 SLIP-39 或同类分片写到额外的卡上，只写一次。操作员笔记本上的种子 CSV 不是备份流程。客服没有可以重组种子的指令。",
          ],
        },
      ],
    },
  },
  {
    slug: "reader-sdk-apdu-exchange",
    cat: "SDK",
    date: "2026-10-12",
    title: "Reader SDK: discovery, card detection, and a status word you can replay",
    excerpt:
      "The SDK enumerates a reader, waits for a card, and returns the APDU plus SW1 SW2. The ATR only means the card answered the poll.",
    readMinutes: 7,
    body: [
      {
        paragraphs: [
          "A reader integration fails in the log, or it does not fail in a way you can fix. The SDK's job is small: find the reader, wait until a card is in the field, transmit an APDU, and return the data together with SW1 SW2. Personalization, KMS and OSDP sit on either side of that exchange. They do not replace it.",
        ],
      },
      {
        figure: {
          title: "One sequence, three host links",
          lanes: [
            { name: "Application", nodes: ["Open a session", "Build the APDU", "Branch on the status word"] },
            { name: "SDK", nodes: ["List readers", "Wait for a card", "Transmit and log"] },
            { name: "Link", nodes: ["USB CCID", "Serial framing", "PC/SC"] },
            { name: "Reader and card", nodes: ["RF poll", "ATR", "Response plus SW"] },
          ],
        },
      },
      {
        heading: "The same sequence on Windows, Linux and Android",
        items: [
          "Enumerate. On PC/SC that is establish a context, then list readers. On a serial module it is the port and baud the board was built with. A USB CCID reader usually shows up through PC/SC already.",
          "Connect, then wait for card present. A timeout here is a field or antenna problem, not an application error.",
          "Read the ATR. Keep it in the log. It proves the card answered the reader's poll. It does not prove which applet is installed, and it does not prove personalization succeeded.",
          "Transmit the APDU. Log the command, the response data and the two status bytes. A UI that only says \"failed\" cannot be replayed.",
        ],
      },
      {
        heading: "Status words worth branching on",
        paragraphs: [
          "The first application command is almost always SELECT. What you do next depends on the status word, not on the ATR.",
        ],
        items: [
          "9000: the command was accepted. For SELECT, the FCI is the evidence that this AID exists.",
          "6A82: file or application not found. The AID in the request is not the AID on the card.",
          "6985: conditions of use not satisfied. The command is known, but the security state or the lifecycle does not allow it.",
          "6700: wrong length. 6D00: the instruction is not supported. Both are defects in the command you just sent.",
        ],
      },
      {
        heading: "What not to start with",
        paragraphs: [
          "NDEF is available when the card is a Type 2 or Type 4 that the stack supports. An EMV, DESFire or Java Card job does not start by writing a URL record. The SELECT that returns 6A82 has to be understood before any higher-level API hides it.",
          "After the reader has a credential result, a door project may pass that result to a controller with OSDP. OSDP is the reader-to-controller path. It is not a trace of the card command. Keep both logs when a door rejects a card that the bench reader accepts.",
        ],
      },
    ],
    zh: {
      title: "读卡器 SDK：发现设备、检测到卡，并留下可以重放的状态字",
      excerpt: "SDK 枚举读卡器、等待进场，并返回 APDU 和 SW1 SW2。ATR 只说明卡片应答了轮询。",
      body: [
        {
          paragraphs: [
            "读卡器集成要么失败在日志里，要么失败得让人无法修。SDK 的工作很小：找到读卡器，等到卡片进入射频场，发送 APDU，把数据和 SW1 SW2 一起返回。个人化、KMS 和 OSDP 在这次交换的两侧。它们不能代替这次交换。",
          ],
        },
        {
          figure: {
            title: "同一条顺序，三种主机连接",
            lanes: [
              { name: "应用", nodes: ["打开会话", "组 APDU", "按状态字分支"] },
              { name: "SDK", nodes: ["列出读卡器", "等待卡片", "发送并写日志"] },
              { name: "连接", nodes: ["USB CCID", "串口成帧", "PC/SC"] },
              { name: "读头与卡", nodes: ["射频轮询", "ATR", "响应加上 SW"] },
            ],
          },
        },
        {
          heading: "Windows、Linux、Android 上是同一条顺序",
          items: [
            "枚举。PC/SC 是建立 context，再列出读卡器。串口模组则是这块板子规定的端口和波特率。USB CCID 读头通常已经从 PC/SC 露出来。",
            "连接，然后等待卡片进入。这里超时是场强或天线问题，不是应用错误。",
            "读 ATR，写进日志。它证明卡片应答了读头轮询。它不能证明装了哪个 applet，也不能证明个人化成功。",
            "发送 APDU。日志里留下命令、响应数据和两个状态字节。界面上只写“失败”，这段过程无法重放。",
          ],
        },
        {
          heading: "值得分支处理的状态字",
          paragraphs: ["第一条应用命令几乎总是 SELECT。下一步看状态字，不看 ATR。"],
          items: [
            "9000：命令被接受。对 SELECT 来说，FCI 才是这个 AID 存在的证据。",
            "6A82：找不到文件或应用。请求里的 AID 不是卡上的 AID。",
            "6985：使用条件不满足。命令认识，但当前安全状态或生命周期不允许。",
            "6700：长度错误。6D00：指令不支持。这两条都是刚发出去的命令本身有问题。",
          ],
        },
        {
          heading: "不要从哪里开始",
          paragraphs: [
            "卡片是协议栈支持的 Type 2 或 Type 4 时，才谈 NDEF。EMV、DESFire 或 Java Card 的工作不要从写一条 URL 记录开始。SELECT 返回 6A82 时，要先看懂它，再让更上层的 API 把它藏起来。",
            "读头已经得到凭证结果之后，门禁项目可以用 OSDP 把结果交给控制器。OSDP 是读头到控制器的路径，不是卡命令的 trace。实验台能读、门上被拒绝时，两份日志都要留。",
          ],
        },
      ],
    },
  },
  {
    slug: "fido2-nfc-and-secure-elements",
    cat: "Security",
    date: "2026-10-12",
    title: "FIDO2 over NFC: where the credential key is created",
    excerpt:
      "WebAuthn create and get never put the private key in the browser. On NFC, the card is the authenticator. Enterprise inventory tracks AAGUIDs, not EMV master keys.",
    readMinutes: 7,
    body: [
      {
        paragraphs: [
          "A FIDO2 registration and a later login are two CTAP operations. navigator.credentials.create() asks the authenticator to generate a credential and return the public key. navigator.credentials.get() asks it to sign a challenge. The relying party stores the public key and the credential id. It never receives the private key, and the browser is not a store for that key either.",
        ],
      },
      {
        figure: {
          title: "FIDO2 over NFC",
          lanes: [
            { name: "Relying party", nodes: ["Send a challenge", "Store the public key", "Revoke the credential id"] },
            { name: "Browser", nodes: ["WebAuthn create", "WebAuthn get", "No private key"] },
            { name: "CTAP client", nodes: ["USB or NFC", "PIN or UV if requested", "Forward the assertion"] },
            { name: "Authenticator", nodes: ["Generate the key in the SE", "Sign the challenge", "AAGUID identifies the model"] },
          ],
        },
      },
      {
        heading: "Who is the authenticator",
        paragraphs: [
          "On NFC, the phone or the desktop reader is the CTAP client. The card or the secure element is the authenticator. authenticatorMakeCredential generates the key pair inside the SE. A resident key stays on the authenticator and is selected by the RP id. The AAGUID tells the relying party which model produced the assertion.",
          "PIN or user verification is a CTAP option the relying party requests. It is not a password saved on the website.",
        ],
      },
      {
        heading: "Enterprise inventory is not an EMV KMS",
        paragraphs: [
          "An enterprise rollout still has an inventory: the authenticator attestation certificate, the list of allowed AAGUIDs, and a revoke action at the relying party. That inventory must not share a partition with EMV issuer master keys or with a wallet seed.",
          "Revoke means the relying party stops accepting that credential id. Deleting a synced passkey from a phone is a different product from a device-bound key on a card. Write down which of the two you are building before the sample is ordered.",
        ],
      },
      {
        heading: "Same secure element, different applet",
        paragraphs: [
          "A FIDO applet and a coin-signing applet can share a secure element. They do not share key material. The FIDO credential is created per relying party. The wallet seed is created once and then derived with BIP-32. An APDU that exports either one is a defect in that applet, not an integration feature.",
        ],
      },
      {
        heading: "A lab check that fits on one page",
        items: [
          "Register against a test relying party and record the AAGUID and the credential id.",
          "Assert once and check that the RP accepts the signature.",
          "Remove the credential at the RP, assert again, and expect rejection.",
          "Confirm the log contains no private key and no seed.",
        ],
      },
    ],
    zh: {
      title: "NFC 上的 FIDO2：凭证密钥在哪里生成",
      excerpt: "WebAuthn 的 create 和 get 不会把私钥放进浏览器。走 NFC 时，卡片是 authenticator。企业库存记录的是 AAGUID，不是 EMV 主密钥。",
      body: [
        {
          paragraphs: [
            "FIDO2 的注册和后来的登录是两次 CTAP 操作。navigator.credentials.create() 让 authenticator 生成凭证并返回公钥。navigator.credentials.get() 让它对挑战签名。relying party 保存公钥和 credential id。它拿不到私钥，浏览器也不是这把私钥的存储位置。",
          ],
        },
        {
          figure: {
            title: "NFC 上的 FIDO2",
            lanes: [
              { name: "Relying party", nodes: ["发出挑战", "保存公钥", "吊销 credential id"] },
              { name: "浏览器", nodes: ["WebAuthn create", "WebAuthn get", "不保存私钥"] },
              { name: "CTAP client", nodes: ["USB 或 NFC", "按要求做 PIN 或 UV", "转发 assertion"] },
              { name: "Authenticator", nodes: ["在 SE 内生成密钥", "对挑战签名", "AAGUID 标识型号"] },
            ],
          },
        },
        {
          heading: "谁是 authenticator",
          paragraphs: [
            "走 NFC 时，手机或桌面读头是 CTAP client。卡片或安全元件是 authenticator。authenticatorMakeCredential 在 SE 内部生成密钥对。resident key 留在 authenticator 上，按 RP id 选用。AAGUID 告诉 relying party 这条 assertion 来自哪种型号。",
            "PIN 或用户核验是 relying party 请求的 CTAP 选项。它不是存在网站上的密码。",
          ],
        },
        {
          heading: "企业库存不是 EMV KMS",
          paragraphs: [
            "企业部署仍然有一份库存：authenticator 的证明证书、允许的 AAGUID 列表，以及在 relying party 上的吊销动作。这份库存不能和 EMV 发卡行主密钥或钱包种子放在同一个分区。",
            "吊销是指 relying party 不再接受这个 credential id。从手机里删掉一把可同步的 passkey，和卡上的 device-bound 密钥不是同一个产品。样品下单之前，先写明做的是哪一种。",
          ],
        },
        {
          heading: "同一颗安全元件，不同的 applet",
          paragraphs: [
            "FIDO applet 和币签名 applet 可以共用一颗安全元件。它们不共用密钥材料。FIDO 凭证按 relying party 生成。钱包种子只生成一次，再用 BIP-32 派生。任何一条能把二者导出的 APDU，都是该 applet 的缺陷，不是集成功能。",
          ],
        },
        {
          heading: "一页纸能做完的实验",
          items: [
            "对一个测试 relying party 注册，记下 AAGUID 和 credential id。",
            "做一次 assertion，确认 RP 接受签名。",
            "在 RP 上删除该凭证，再 assertion 一次，应当被拒绝。",
            "确认日志里没有私钥，也没有种子。",
          ],
        },
      ],
    },
  },
];
