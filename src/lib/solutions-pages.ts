export type SolutionFaq = { q: string; a: string };
export type SolutionLink = { title: string; href: string };

export type SolutionEnrichment = {
  headline?: string;
  tagline?: string;
  seoTitle?: string;
  seoDescription?: string;
  intro?: string;
  body?: string;
  capabilities?: { title: string; description: string }[];
  deliverables?: string[];
  workflow?: { title: string; description: string }[];
  faqs?: SolutionFaq[];
  relatedLinks?: SolutionLink[];
};

/** Local copy until CMS `body` is filled (length > 80). */

export const EN: Record<string, SolutionEnrichment> = {
  banking: {
    headline: "EMV issuance — contact and contactless",
    tagline:
      "AID and kernel assignment, GlobalPlatform load (SCP02/SCP03), PCI CP personalization, MDES/VTS, ISO 8583 field mapping.",
    seoTitle: "EMV issuance: JavaCard, PCI personalization, MDES/VTS | NFCTEC",
    seoDescription:
      "Issuer EMV programmes: Combination Selection, SCP02/SCP03 load, PCI CP bureau scripts, MDES or VTS enrolment, ISO 8583 host fields.",
    intro:
      "An issuer programme has four workstreams: AID and kernel assignment against the brand letter, applet load over GlobalPlatform, PCI Card Production personalization, and host mapping (ISO 8583, plus MDES or VTS if the BIN is enrolled). Each workstream has its own artefacts. Until those artefacts exist, L3 time is usually spent on Combination Selection or on SW1/SW2 6982 during load.",
    capabilities: [
      { title: "AID / kernel table", description: "M/Chip to Kernel 2, VSDC to Kernel 3, QUICS to Kernel 6. Exact versus partial SELECT is written from the brand letter, including co-badge and metal (COM) SKUs." },
      { title: "Dual-interface applet", description: "ISO 7816 contact plus EMV Contactless. CDA/DDA and IAC/TAC taken from the letter rather than from a previous BIN profile." },
      { title: "GP INSTALL / LOAD", description: "SCP02 or SCP03 according to INITIALIZE UPDATE. P1 values the silicon accepts. KCV recorded in the script. Transport keys from the JCOP manual stay off the perso line." },
      { title: "PCI CP personalization", description: "HSM ceremony, encrypted PAN and track data, STORE DATA / PUT DATA as specified, sample CDA and contactless timing with SW1/SW2 retained." },
      { title: "MDES / VTS", description: "Token requestor, DAR and yellow-path cases scheduled with the BIN, not after first live plastic." },
      { title: "ISO 8583", description: "Field list for 87/93. PIN translate on the same HSM partition as the issuer keys. 3DS only where that BIN is in e-commerce." },
    ],
    body: `<h2>What this is not</h2>
<p>This is issuer work: applet, keys, bureau, host fields, tokenization. Acquirer POS kernels (Kernel 2/3/6) stay with the acquirer. We do not recertify a terminal we did not change.</p>
<h2>Issue</h2>
<p>PPSE lists application AIDs with a priority byte. The terminal walks its own table and takes the first allowed match. Placing Visa above Mastercard on a Mastercard BIN selects Kernel 3. A large share of “tap does not work” tickets are this ordering error, not an antenna defect. Co-badge products and 0.76 mm metal (COM) each have a separate table.</p>
<p>On the bench: PC/SC, <code>80 50</code> INITIALIZE UPDATE, <code>84 82</code> EXTERNAL AUTHENTICATE, INSTALL for load, LOAD, INSTALL for install, SELECT instance AID. If EXTERNAL AUTHENTICATE returns 9000 and the next wrapped command returns 6982, check MAC input and ICV first, not the CAP file name. Channel notes: <a href="/en/blog/scp02-vs-scp03-javacard-secure-channel">SCP02 vs SCP03</a>. Host-side exercise: <a href="/en/tools/javacard-tool">JavaCard Tool</a>.</p>
<pre><code>80 50 00 00 08  [8-byte host challenge]
84 82 03 00 10  [host cryptogram][C-MAC]</code></pre>
<p>Bureau: keys stay in the HSM. Per-PAN records drive STORE DATA / PUT DATA, then laser or print. Sample cards: CDA and contactless timing with SW1/SW2 kept. The GlobalPlatform transport key printed in the silicon manual does not go on the perso line.</p>
<h2>Verify (L3 and live)</h2>
<p>L3 is Combination Selection plus cryptogram checks on the brand’s tool, against the letter you actually signed. Live: ISO 8583 field map, PIN translate on the same HSM partition as issuer keys. Apple Pay / Google Pay / Samsung Pay are MDES or VTS — a second issuance, own test set, scheduled with the BIN, not after first plastic ships.</p>`
    deliverables: [
      "AID/kernel table referenced to the brand letter",
      "CAP, install parameters, SCP profile",
      "Ceremony checklist including KCV",
      "Bureau scripts and sample CDA/timing log",
      "8583 field map; MDES/VTS list when contracted",
    ],
    workflow: [
      { title: "Letter and AID table", description: "Kernels, co-badge, metal. Applet work starts after this file exists." },
      { title: "Reference-terminal samples", description: "GP load, CDA, contactless timing. Traces retained." },
      { title: "Ceremony and 50–200 card dry run", description: "Pass/fail log, then limited live BIN." },
    ],
    faqs: [
      { q: "Does the scope include Kernel 2 or Kernel 3?", a: "Those reside in the terminal. The card work is the AID list aligned to the kernels the acquirer has already certified." },
      { q: "SCP02 or SCP03?", a: "Whichever INITIALIZE UPDATE reports. Bureau sample stock is still frequently SCP02." },
      { q: "When does tokenization start?", a: "In parallel with perso design. Token keys are a separate set from the plastic keys." },
    ],
    relatedLinks: [
      { title: "JavaCard Tool", href: "/en/tools/javacard-tool" },
      { title: "SCP02 vs SCP03", href: "/en/blog/scp02-vs-scp03-javacard-secure-channel" },
      { title: "JCOP J3R452", href: "/en/products/j3r452-javacard" },
    ],
  },
  transit: {
    headline: "Fare media, SAM, validators, account-based ticketing",
    tagline: "CALYPSO Rev 3.1, DESFire EV3, validator transaction time, cEMV, dual-media cutover with dates.",
    seoTitle: "Transit AFC: CALYPSO, DESFire EV3, cEMV, ABT | NFCTEC",
    seoDescription:
      "CALYPSO SAM media, DESFire EV3 closed loop, validator timing, cEMV open loop, account-based ticketing and a dated dual-media window.",
    intro:
      "The governing constraints are at the gate: transaction time on the production validator image, behaviour while the station is offline, and whether media issued last month still validates after a software cut. New media follows the SAM and firmware already in the fleet unless the network is a greenfield.",
    capabilities: [
      { title: "Issue — CALYPSO", description: "CD21/CD97, SAM keys, pass vs stored-ride files. Key version bound to the validator software image that will run in the depot." },
      { title: "Issue — DESFire EV3", description: "AES applications where Classic or a private file system is being withdrawn. Sector maps are not copied onto DESFire files." },
      { title: "Verify — validator", description: "RF, SELECT, authenticate, update, passenger UI. Time measured on the production image with the live deny-list size, not on a USB lab reader." },
      { title: "cEMV", description: "Bank cards and wallets at the gate need a transit kernel and delayed authorisation. Closed-loop media stay in service while that is introduced." },
      { title: "Account-based", description: "The tap carries a token. Products and fare caps sit in the back office. Offline behaviour is written, not assumed." },
    ],
    body: `<h2>What this is not</h2>
<p>A new card design does not replace the SAM and firmware already in the fleet. Greenfield is the exception; most networks encode against what the gates already speak. Encoding Classic dumps onto DESFire files is not a migration.</p>
<h2>Issue</h2>
<p>Where depots already hold CALYPSO SAMs, Rev 3.1 stays the default until a dual-stack decision is signed. DESFire EV3 is used when Classic or a private layout is being pulled. Two stacks on one validator cost flash and a second regression pack — that line is in the budget or it is not in the fleet.</p>
<p>Encoding: AID or CALYPSO file map, key version, product (pass, stored value, staff). Cards issued last month must still validate after a software cut, or the cut is wrong. Hotlist / deny-list format is part of issue, not an afterthought at the gate.</p>
<h2>Verify</h2>
<p>A 300 ms target includes SAM or AES authenticate, not ISO 14443 poll. A 180 ms USB-lab log is not evidence. Timing is taken on the target validator, production keys, overnight deny-list volume. Winter gates with a full hotlist are the condition that usually moves the number.</p>
<p>Offline station: the gate still accepts or rejects against the last list it has. That window is written. Failed-tap reason codes stay distinct so inspection and the control room are not arguing about one “error”.</p>
<h2>cEMV and ABT</h2>
<p>Open loop and account-based are separate products from closed-loop media. During cutover the three paths often run together. Dual-media needs a start date and a stop date. An open-ended “both accepted” window is how Classic stays in circulation.</p>
<p>Bank cards on go-live only if that software image already has a transit kernel and the host can delay-authorise. QR is for failed taps and inspection. Peak throughput stays NFC.</p>`,
    deliverables: [
      "Media specification (CALYPSO and/or EV3) with AID/file map",
      "SAM/AES keys bound to validator software version",
      "Timing log on the production gate image",
      "Dual-media procedure with calendar dates",
    ],
    workflow: [
      { title: "Installed base", description: "Validators, SAMs, cards in circulation, offline hours." },
      { title: "One file layout per product", description: "Pass, stored value, staff. Pilot line at peak load." },
      { title: "Fleet flash and back-office cut", description: "Remaining validators, inspector briefing." },
    ],
    faqs: [
      { q: "Bank cards on every gate at go-live?", a: "Only if that software image already includes a transit kernel and the host can delay-authorise." },
      { q: "Can QR replace NFC?", a: "QR is used for failed taps and inspection. Peak throughput remains NFC." },
      { q: "Do we recertify every validator?", a: "We time and regression-test the image you will flash. Hardware recertification of a head we did not change is out of scope unless named." },
    ],
    relatedLinks: [
      { title: "DESFire EV3 cards", href: "/en/products/mifare-desfire-ev3" },
      { title: "Access (doors)", href: "/en/solutions/access" },
    ],
  },
  access: {
    headline: "DESFire EV3 / Seos credentials and Wallet keys",
    tagline: "AES applications, OSDP v2.2 readers, Apple VAS / Google Smart Tap, revoke latency measured at the door.",
    seoTitle: "Access control: DESFire EV3, HID Seos, Apple Wallet | NFCTEC",
    seoDescription:
      "DESFire EV3 or Seos credentials, OSDP v2.2 readers, Apple and Google employee passes, revoke time measured to the lock.",
    intro:
      "Readers that output UID only cannot authenticate DESFire and cannot present a Wallet pass. Remaining 125 kHz or MIFARE Classic doors are listed with a calendar date. An undated “phase 2” item does not count as a migration plan.",
    capabilities: [
      { title: "Issue — DESFire EV3", description: "AID, files, communication mode, key numbers. LRP only on reader SKUs that implement it." },
      { title: "Issue — HID Seos", description: "Where the installed HID base requires it. Seos and DESFire are not merged into one file map." },
      { title: "Verify — door", description: "OSDP v2.2 Secure Channel. Wiegand UID-out means the panel never saw AES authenticate. Dated exceptions only." },
      { title: "Wallet (optional)", description: "Second credential. Pass type, VAS / Smart Tap, Express Mode on heads that implement it. See the Wallet page for issue/void." },
      { title: "Revoke", description: "API can finish in seconds. The lock stays open until the panel has the deny list. Both intervals are recorded." },
    ],
    body: `<h2>What this is not</h2>
<p>A reader that outputs UID only cannot authenticate DESFire and cannot present a Wallet pass. Artwork on PVC is not VAS. Wallet payment (Apple Pay / Google Pay) is a different contract — see <a href="/en/solutions/wallet">Apple Wallet &amp; Google Wallet</a> for pass issue and gate verify.</p>
<h2>Issue</h2>
<p>Sectors and Crypto-1 keys do not become DESFire files. Applications are specified first: AID, file, key number, communication mode. Encoding from a Classic dump produces a card the panel still treats as UID. Contractors may keep Classic on named doors until a named date. New hires get the new credential only.</p>
<p>Seos stays Seos when the HID estate needs it. Two file maps, two encoding jobs, not one “universal” dump.</p>
<h2>Verify</h2>
<p>New cable runs: OSDP v2.2. Legacy 125 kHz on a controller that will not be replaced is a dated exception, not an undated phase 2. Tests use production keys on the SKU that will be purchased.</p>
<p>Wallet at the door: the head must complete VAS or Smart Tap and return the payload. Cloud revoke can complete in seconds; the door remains open until the panel has the deny list. Two clocks, same as Wallet void vs gate list.</p>`,
    deliverables: [
      "EV3 or Seos application specification",
      "Reader list: OSDP versus dated exceptions",
      "Wallet pass and reader certification notes",
      "Method for measuring revoke latency",
    ],
    workflow: [
      { title: "Survey", description: "Head models, wiring, doors that cannot go dark." },
      { title: "Pilot building", description: "Production keys, PVC and Wallet, revoke test." },
      { title: "HR cutover date", description: "New credentials only after that date." },
    ],
    faqs: [
      { q: "Express Mode on every reader?", a: "Only heads whose firmware implements VAS/ECP. Tests are per SKU." },
      { q: "How fast is revoke?", a: "API: seconds. Door: panel poll interval. Both figures are required." },
      { q: "One Wallet pass for door and payment?", a: "No. Door verify is VAS/Smart Tap. Payment is Apple Pay / Google Pay." },
    ],
    relatedLinks: [
      { title: "Apple Wallet & Google Wallet", href: "/en/solutions/wallet" },
      { title: "Campus one-card", href: "/en/solutions/edu" },
      { title: "DESFire EV3", href: "/en/products/mifare-desfire-ev3" },
    ],
  },
  brand: {
    headline: "NTAG 424 DNA SUN authentication",
    tagline: "Per-tap UID, counter and AES-CMAC. The OS browser opens; the server accepts or rejects.",
    seoTitle: "NTAG 424 DNA SUN URL verification | NFCTEC",
    seoDescription:
      "Brand protection with NTAG 424 DNA SDM/SUN, UID-diversified AES keys, counter and CMAC verify API. No consumer app.",
    intro:
      "A static NFC URL can be photocopied. SUN appends UID, a read counter and a CMAC. If the converter writes NDEF but never sets SDM access rights, the shipment is still a static URL.",
    capabilities: [
      { title: "SDM / SUN template", description: "Mirrors, PICC data, CMAC offset. Verified in iOS and Android system NFC, not only on ACR122." },
      { title: "Diversified AES", description: "One key per UID. A single key per SKU allows one extracted tag to forge the rest." },
      { title: "Verify API", description: "Recompute CMAC. Counter must increase. Replay of the same URL is rejected." },
      { title: "Construction", description: "Wet inlay or break-on-open, agreed with the converter. Catalogue stickers are out of scope unless they meet the same SDM configuration." },
    ],
    body: `<h2>What this is not</h2>
<p>A static NDEF URL is a photocopiable label. QR has no counter and no CMAC. Geo-fence on top of a static link does not prove the tag is genuine.</p>
<h2>Issue</h2>
<p>The converter writes NDEF <em>and</em> SDM access rights. If only NDEF is written, the shipment is still a static URL. Key: one AES key per UID, not one key per SKU. Construction (wet inlay, break-on-open) is agreed with the converter before volume.</p>
<pre><code>https://verify.example.com/a/{picc_data}?c={cmac}</code></pre>
<p>Mirrors, PICC data, CMAC offset: checked on iOS and Android system NFC, not only ACR122. Tool: <a href="/en/tools/ntag424-tool">NTAG424 DNA Tool</a>. Write-up: <a href="/en/blog/ntag424-dna-sun-url-authentication-example">SUN authentication</a>.</p>
<h2>Verify</h2>
<p>Server loads the key for that UID, recomputes CMAC, then checks the counter increased. Same URL replayed must fail. Encoder “OK” without a passing phone tap and a failing replay is not a sample. Sampling uses the live verify API, not a second lab key.</p>
<p>Warranty or landing copy is bound to that tap’s pass/fail. A consumer app is not required; system NFC opens the browser. Both major phone vendors in the target market are still tested.</p>`,
    deliverables: [
      "SUN template and key derivation",
      "Verify API field list",
      "iOS/Android fail-case list",
      "Sampling procedure against the live endpoint",
    ],
    workflow: [
      { title: "Pack format", description: "What the converter can run at the required volume." },
      { title: "Keys and API", description: "Tap, replay, truncated URL." },
      { title: "Pilot SKU, then AQL", description: "Same endpoint as production." },
    ],
    faqs: [
      { q: "QR instead of NFC?", a: "QR has no counter and no CMAC. It can be used as print backup." },
      { q: "Is a consumer app required?", a: "No. System NFC opens the browser. Both major phone vendors are still tested." },
      { q: "One key for the whole SKU?", a: "Then one extracted tag forges the rest. Diversify per UID." },
    ],
    relatedLinks: [
      { title: "NTAG424 DNA Tool", href: "/en/tools/ntag424-tool" },
      { title: "SUN authentication", href: "/en/blog/ntag424-dna-sun-url-authentication-example" },
      { title: "NTAG 424 DNA", href: "/en/products/ntag424-dna" },
    ],
  },
  gov: {
    headline: "ePassport, eID and mobile driving licence",
    tagline: "ICAO 9303 LDS, BAC/PACE/EAC, CSCA/DS, ISO 18013-5 device retrieval.",
    seoTitle: "ICAO 9303 ePassport, eID, ISO 18013-5 mDL | NFCTEC",
    seoDescription:
      "ICAO 9303 LDS1/LDS2 applets, BAC/PACE/EAC, CSCA and Document Signer, MRTD inspection, ISO 18013-5 mDL.",
    intro:
      "Issuance is PKI, applet and datapage. Inspection is a separate system. Combining both in one statement of work without a runbook for CSCA master-list and CRL distribution is a common cause of valid books failing at a foreign border.",
    capabilities: [
      { title: "Issue — booklet", description: "LDS1/LDS2 applet: BAC, PACE-GM/IM, EACv2, Active Authentication / Chip Authentication as the ICAO profile names." },
      { title: "Issue — eID", description: "Match-on-card; eIDAS signatures only where the national scheme requires them." },
      { title: "PKI", description: "CSCA, Document Signer, master list and CRL. A missed ML publish rejects valid books abroad." },
      { title: "Verify — inspection", description: "MRTD readers and face-to-chip. Not the perso stack. Overlap: PACE new books, BAC still in the field." },
      { title: "mDL (if in RFP)", description: "ISO 18013-5 device retrieval; 18013-7 if remote presentation is written. Not a PDF in Apple Wallet." },
    ],
    body: `<h2>What this is not</h2>
<p>PassKit / Google Wallet passes are a different page. ISO 18013-5 is ISO-over-NFC (or QR engagement) with selective disclosure. Datapage security printing (MLI, UV) is a printer contract; we interface to it.</p>
<h2>Issue</h2>
<p>New books should use PACE. A large volume of live stock is still BAC. Issue scripts, SOD, DS certificate, and the datapage job are one programme. EAC and Chip Authentication, if listed in the profile, change the SAM and the reader licence — they are not optional extras at that point.</p>
<p>CSCA signs the Document Signer. DS signs the SOD. Master-list and CRL distribution is an operations runbook with owners and times, not a slide.</p>
<h2>Verify</h2>
<p>Inspection systems speak BAC and PACE during overlap. A book that would fail at a foreign border must fail in the laboratory first, on the inspection readers named in the RFP.</p>
<p>mDL verifiers need a current trust list and a revoke process. “Offline” still means the list on the device is fresh enough. Omitting that is the usual gap.</p>`,
    deliverables: [
      "Applet profile against the ICAO/BSI letter",
      "CSCA/DS ceremony notes",
      "Issuance versus inspection interface list",
      "mDL engagement notes when in the RFP",
    ],
    workflow: [
      { title: "Profile freeze", description: "LDS version, PACE mapping, EAC yes/no." },
      { title: "Samples on inspection readers", description: "Books that would fail at the border fail in the laboratory first." },
    ],
    faqs: [
      { q: "Who operates the CSCA?", a: "Usually the state. Issuance and inspection are wired to that CA." },
      { q: "Can mDL work offline?", a: "18013-5 device retrieval is the offline path. The verifier still needs a current trust list." },
      { q: "Same as Apple Wallet ID?", a: "No. Wallet passes are PassKit/Google objects. mDL is ISO 18013." },
    ],
    relatedLinks: [
      { title: "Apple Wallet & Google Wallet", href: "/en/solutions/wallet" },
    ],
  },
  health: {
    headline: "Patient cards, e-prescription, clinician SSO",
    tagline: "ISO 7816 secure element, HL7 FHIR identifiers, tap-and-PIN into the EHR, optional cold-chain NTAG.",
    seoTitle: "Healthcare smart cards, e-prescription, EHR badge SSO | NFCTEC",
    seoDescription:
      "Patient ISO 7816 cards, SE-signed e-prescriptions, clinician tap-and-PIN EHR access, NTAG temperature labels for unit-level checks.",
    intro:
      "The hospital already has an EHR. The card is an identifier, a signature device, a door credential, or several of those on one DESFire with separate AIDs. Clinical notes are not stored in EEPROM.",
    capabilities: [
      { title: "Issue — patient card", description: "Encrypted pointer, emergency zone, match-on-card where the ministry requires it. Clinical notes stay in the EHR, not in EEPROM." },
      { title: "Issue — e-prescription", description: "Qualified signature in the SE, audit to DSC, FHIR where the national switch uses it." },
      { title: "Verify — clinician SSO", description: "Tap-and-PIN into Epic/Cerner-class SSO (Imprivata and equivalents). Badge + reader; session policy stays in the EHR." },
      { title: "Cold chain (optional)", description: "NTAG plus a temperature logger for unit-level checks. Does not replace the pharmacy’s calibrated shipment logger." },
    ],
    body: `<h2>What this is not</h2>
<p>The hospital already has an EHR. We do not store clinical notes on the chip. HIPAA/GDPR paperwork is the covered entity’s; we design so the DPO can sign off.</p>
<h2>Issue</h2>
<p>The card is an identifier, a signature device, a door credential, or several of those on one DESFire with separate AIDs. File map is written against the EHR identifier (and PIX/PDQ if the HIE already runs it).</p>
<p>e-Prescription: keys and the qualified-signature profile live in the SE. FHIR stays in the back office.</p>
<h2>Verify</h2>
<p>Clinician login is tap-and-PIN plus an SSO vendor. Lost-card, PIN lockout, emergency-zone read: tested on a pilot ward before roll-out. Door readers, if in scope, follow the access programme (OSDP, not UID-out).</p>
<p>Cold chain: NTAG DNA (or NTAG 22x with a sensor) for unit-level checks. The shipment still uses the pharmacy’s calibrated logger. Two systems, two specs.</p>`,
    deliverables: [
      "Card file map versus EHR identifier",
      "Signature profile if e-prescription is in scope",
      "Badge reader list for SSO",
    ],
    workflow: [
      { title: "EHR / HIE inventory", description: "Identifiers, FHIR or not, badge SSO vendor." },
      { title: "Pilot ward", description: "Lost-card, emergency zone, PIN lockout." },
    ],
    faqs: [
      { q: "Does this include HIPAA / GDPR certification?", a: "Design is done so the hospital DPO can sign. Covered-entity paperwork remains the hospital’s." },
      { q: "Can the chip hold the full record?", a: "No. Pointers and keys only. Notes stay in the EHR." },
    ],
    relatedLinks: [
      { title: "Access (badges)", href: "/en/solutions/access" },
      { title: "Brand / NTAG 424", href: "/en/solutions/brand" },
    ],
  },
  iot: {
    headline: "NFC onboarding and factory identity",
    tagline: "NDEF or SUN for Wi-Fi / Matter, X.509 injected on the line, optional SUN callback.",
    seoTitle: "NFC device onboarding: NTAG 424 DNA, Matter, factory X.509 | NFCTEC",
    seoDescription:
      "Tap-to-onboard with NTAG 424 DNA or Type 4, Matter commissioning payload, factory-injected X.509, SUN for genuine-only callback.",
    intro:
      "A QR code on the carton can be photographed in the warehouse. NFC on the device can carry a signed payload that a photograph does not reproduce. Matter still requires a DAC; NFC only carries the onboarding payload.",
    capabilities: [
      { title: "Issue — NDEF / SUN", description: "Wi-Fi or BLE handoff on the tag. Signed (NTAG 424 DNA) when clone resistance is required." },
      { title: "Matter payload", description: "Onboarding payload over NFC. DAC/PAI stay in the device identity chain; SUN does not replace the DAC." },
      { title: "Issue — factory cert", description: "Per-device X.509 from a line-side HSM. Injected, not printed in a PDF." },
      { title: "Verify — callback", description: "Device phones home only after CMAC verifies. Same mechanics as brand protection." },
    ],
    body: `<h2>What this is not</h2>
<p>A QR on the carton can be photographed in the warehouse. A cheap Type 2 static URL is the same as QR. NFC does not flash firmware; it may start the session that does.</p>
<h2>Issue</h2>
<p>Line station: HSM, serial, inject, sample, reject path. Deferring provision to the cloud creates a window of unclaimed devices — that window is in the threat model. Matter still needs a DAC; NFC only carries the onboarding payload.</p>
<p>Tag type and file map: which radio’s credential sits on which file. Tooling when SUN is in scope: <a href="/en/tools/ntag424-tool">NTAG424 Tool</a>.</p>
<h2>Verify</h2>
<p>Phone in the SKU’s markets reads NDEF, writes Wi-Fi or starts Matter commissioning. Signed taps: server checks CMAC before the device is allowed to phone home. Firmware: signed manifest, rollback lock, A/B if the MCU supports it — separate from the tag job.</p>`,
    deliverables: [
      "Tag type and NDEF/SUN map",
      "Line inject steps for the certificate",
      "Phone tests for the SKU’s markets",
    ],
    workflow: [
      { title: "Radio and tag", description: "Wi-Fi, BLE, Matter — which payload on which file." },
      { title: "Line station", description: "HSM, sample, reject path." },
    ],
    faqs: [
      { q: "Can SUN replace the Matter DAC?", a: "No. SUN authenticates the tap. The DAC authenticates the device in the Matter fabric." },
      { q: "Is a Type 2 URL enough?", a: "For clone resistance, no. Use NTAG 424 DNA SUN or an equivalent signed payload." },
    ],
    relatedLinks: [
      { title: "NTAG424 DNA Tool", href: "/en/tools/ntag424-tool" },
      { title: "Brand protection", href: "/en/solutions/brand" },
    ],
  },
  retail: {
    headline: "Loyalty, gift and closed-loop at POS",
    tagline: "DESFire membership and purse, Apple VAS / Google Smart Tap, Verifone / Ingenico / PAX.",
    seoTitle: "Retail loyalty and gift cards: DESFire, Wallet, POS | NFCTEC",
    seoDescription:
      "DESFire membership and stored value, Apple VAS and Google Smart Tap, offline purse, POS kernel integration.",
    intro:
      "Host-held points and a card-held purse are different products. Offline gift requires a MAC on top-up. Wallet passes require a reader that implements VAS or Smart Tap; a barcode imager is not sufficient.",
    capabilities: [
      { title: "Issue — membership", description: "DESFire: tier/points files, or an identifier the POS looks up. Host-held points vs card-held purse are different products." },
      { title: "Issue — gift / purse", description: "Offline value, MAC on top-up, decline rules when the host is down. Source of truth is written." },
      { title: "Issue — Wallet pass", description: "VAS (Apple), Smart Tap (Google), updates via APNs / Google API. Separate from the plastic." },
      { title: "Verify — POS", description: "Verifone, Ingenico or PAX — the kernel already certified in that banner. Payment-only firmware does not pull a loyalty pass." },
    ],
    body: `<h2>What this is not</h2>
<p>A barcode imager is not VAS or Smart Tap. Recertifying EMV L2 on terminals we did not change is out of scope. Wallet payment tokens are MDES/VTS (banking page), not this loyalty pass.</p>
<h2>Issue</h2>
<p>Host-held points: the card is an identifier. Card-held purse: keys and a load MAC. Without a stated source of truth, weekend double-spend tickets follow. Wallet: class/object or .pkpass as on the <a href="/en/solutions/wallet">Wallet</a> page, then the POS head that will actually be in the store.</p>
<h2>Verify</h2>
<p>POS talks to the kernel and merchant protocol already in production (NEXO and similar). A reader licensed only for EMV payment will not pull a loyalty pass until that feature is licensed and configured. Tests use that exact head.</p>
<p>Reconciliation: daily settlement versus purse logs. Gift replay and host-down decline are written as rules, not left to the cashier.</p>`
    deliverables: [
      "File map: identifier versus purse",
      "Load/MAC description for gift",
      "Reader feature list for Wallet",
    ],
    workflow: [
      { title: "POS and Wallet inventory", description: "Banner standard, then one store." },
      { title: "Reconciliation", description: "Daily settlement versus purse logs." },
    ],
    faqs: [
      { q: "Will this run on every PAX in the estate?", a: "Only on firmware images that include VAS/Smart Tap. Payment-only images do not." },
      { q: "Points on the card or on the host?", a: "Say which. Mixing both without a rule is how double-spend tickets appear." },
    ],
    relatedLinks: [
      { title: "Apple Wallet & Google Wallet", href: "/en/solutions/wallet" },
      { title: "DESFire EV3", href: "/en/products/mifare-desfire-ev3" },
    ],
  },
  auto: {
    headline: "CCC Digital Key — NFC, BLE, UWB",
    tagline: "R3.0 owner pairing, NFC for dead-battery unlock, per-VIN inject on the line.",
    seoTitle: "CCC Digital Key 3.0: NFC fallback, UWB, Wallet sharing | NFCTEC",
    seoDescription:
      "CCC Digital Key R3.0: UWB ranging, NFC dead-battery unlock, BLE wake, in-vehicle SE, Apple/Google key sharing, per-VIN line inject.",
    intro:
      "UWB covers walk-up. NFC covers the handle tap when the phone battery is empty. BLE wakes the stack. Three radios share one key hierarchy.",
    capabilities: [
      { title: "Issue — owner pair", description: "CCC R3.0 owner pair, friend share, revoke, against the CCC test plan you froze." },
      { title: "UWB", description: "802.15.4z HRP ranging. Distance bounding is the security property. Uncalibrated antennas are comfort, not that property." },
      { title: "Verify — NFC fallback", description: "Type 4 at the handle when the phone battery is empty. CCC still lists this item if you drop it." },
      { title: "SE and line", description: "AEC-Q100 grade SE, CCC applet, per-VIN inject at a station with an HSM. EOL is tap plus UWB walk, not checksum only." },
    ],
    body: `<h2>What this is not</h2>
<p>Apple/Google key sharing is only claimed if those programmes are contracted. Aftermarket “phone as key” kits that skip CCC items are a different job. Wallet transit/loyalty passes are not a car key.</p>
<h2>Issue</h2>
<p>Three radios, one key hierarchy: UWB walk-up, BLE wake, NFC handle. OEM cloud / TSM sits in the middle of Apple and Google provisioning. Keys are written per VIN at a line station — not a common test key left in the car.</p>
<h2>Verify</h2>
<p>Bench: handle NFC with a dead-phone case, then UWB walk with calibrated antennas. End-of-line: same two checks, plus share/revoke against the CCC list you signed. Firmware checksum alone is not the quality gate.</p>`
    deliverables: [
      "Radio and SE split against CCC items",
      "VIN inject steps",
      "Wallet programmes actually contracted",
    ],
    workflow: [
      { title: "CCC release freeze", description: "R3.0 items in and out of scope." },
      { title: "Bench, then line", description: "Handle NFC, then station inject." },
    ],
    faqs: [
      { q: "Phone-only, without NFC?", a: "Then the dead-battery case is missing. CCC still lists it." },
      { q: "Do you certify CCC for us?", a: "We implement against the frozen CCC items and the radios on the vehicle. The OEM/Tier-1 owns the CCC listing." },
    ],
    relatedLinks: [
      { title: "Apple Wallet & Google Wallet", href: "/en/solutions/wallet" },
    ],
  },
  wallet: {
    headline: "Apple Wallet and Google Wallet — issue and verify",
    tagline: "Pass Type ID / issuer account, .pkpass and Wallet objects, APNs / callback, VAS and Smart Tap at the gate.",
    seoTitle: "Apple Wallet PassKit and Google Wallet: issue and verify passes | NFCTEC",
    seoDescription:
      "Issue Apple Wallet and Google Wallet passes, update and void them, verify at a gate over barcode or NFC (VAS / Smart Tap). Reader firmware, serial lookup, revoke.",
    intro:
      "We run both sides. Issue: build the pass, put it in Apple Wallet or Google Wallet, update it, void it. Verify: a gate, a door, a counter, or a phone reader that decides accept or reject. Apple and Google are two programmes, two certificates, two reader setups. They are not one JSON file copied twice.",
    capabilities: [
      { title: "Apple issue", description: "Pass Type ID, signer cert, pass.json, images, .pkpass. Web service: device register, serial list, APNs push. NFC extras only if VAS is in the pass and on the reader." },
      { title: "Google issue", description: "Issuer account, class and object, JWT signed with the service account, save URL. Updates are object patches. Smart Tap needs a collector ID on the pass and on the head." },
      { title: "Apple verify", description: "Barcode/QR for visual gates. NFC: VAS merchant ID, reader firmware, Express Mode only on heads that implement it. Backend: serial, status, last update." },
      { title: "Google verify", description: "Barcode for visual. NFC: Smart Tap 2 collector, redemption value. Backend: object ID, state, redemption count if you use it." },
      { title: "Lifecycle", description: "Add, update fields, void, push. Lost phone is not the same as void. Both have a record." },
      { title: "Readers", description: "SKU list with firmware that actually speaks VAS or Smart Tap. A UID-out Wiegand head does not verify a Wallet pass." },
    ],
    body: `<h2>What this is not</h2>
<p>A Wallet pass is not a DESFire file and not an EMV token. Payment in Wallet (Apple Pay / Google Pay) is a different contract. This page is PassKit and Google Wallet passes: membership, event, boarding, coupon, generic, store card, and similar styles Apple or Google allow for that issuer.</p>
<h2>Issue — Apple</h2>
<p>Apple needs a Pass Type ID and a certificate that can sign that type. The package is zip: pass.json, strip/icon/logo, manifest, signature. The user adds it from a HTTPS URL, Mail, or an in-app add. After add, the device registers with your web service. Field changes go through that service; Apple Push notifies the phone to pull. If register/unregister is missing, the pass sits stale until the user deletes it.</p>
<p>NFC on Apple is VAS. The pass carries a VAS payload. The reader must be configured with the merchant identifiers Apple issued for that programme. Express Mode is reader firmware plus pass settings. Artwork on a PDF is not VAS.</p>
<h2>Issue — Google</h2>
<p>Google needs a Wallet issuer account and a service account that signs JWTs. You define a class (template) and objects (instances). The save link is a signed JWT. Updates are REST patches on the object. Smart Tap is optional: collector ID on the class/object and on the terminal. Without it, the phone still shows a barcode.</p>
<h2>Verify</h2>
<p>Visual path: camera or laser on the barcode/QR. Server looks up serial (Apple) or object ID (Google), checks void/expired, then opens the gate or stamps the ticket. Replay of the same barcode is a policy you write (once, N times, or ignore).</p>
<p>NFC path: the head completes VAS or Smart Tap, returns the payload your backend already put on the pass. You compare it to the live record. If the head only outputs UID, you are not verifying Wallet.</p>
<p>Revoke: set void on the object/pass and push. The phone may take seconds to minutes. The gate must also deny that serial immediately in your list, or a screenshot/barcode still works until the list updates. Two clocks: Wallet update, and your deny list.</p>
<h2>What we deliver</h2>
<p>Issuer onboarding (Apple developer + Pass Type ID, Google Wallet API). Pass templates per style. Issue API (create, update, void). Callbacks Apple requires. Google object REST. Gate or counter: barcode camera, or a named reader SKU with VAS/Smart Tap. Logs: serial, time, accept/reject, reason. We do not claim a reader we have not listed in the SKU appendix.</p>`,
    deliverables: [
      "Apple Pass Type ID / cert procedure and .pkpass template",
      "Google issuer, class/object, JWT issue URL",
      "Issue / update / void API",
      "Apple web service (register, serials, APNs)",
      "Verify: barcode rules and, if in scope, VAS or Smart Tap reader SKU + payload check",
      "Void vs deny-list timing",
    ],
    workflow: [
      { title: "Accounts", description: "Apple Pass Type ID and Google issuer. Sandbox first." },
      { title: "One pass style", description: "Issue, add to a real phone, update one field, void." },
      { title: "Verify path", description: "Barcode only, or NFC on the reader SKU that will be purchased." },
      { title: "Gate list", description: "Accept/reject log. Deny list independent of APNs delay." },
    ],
    faqs: [
      { q: "Can one pass open the door and pay?", a: "No. Wallet payment is Apple Pay / Google Pay. A pass is a separate credential. Doors need VAS/Smart Tap readers." },
      { q: "Does a screenshot of the barcode work?", a: "If you only scan the image and never void or rate-limit, yes. Say so in the spec or add NFC / rotating barcodes." },
      { q: "How fast after void?", a: "Backend deny list: immediate if the gate queries you. Phone Wallet: depends on APNs / Google object fetch. Record both." },
      { q: "iPhone only?", a: "Apple and Google are two issue pipelines. Android without a Google issuer account has no Google Wallet pass." },
    ],
    relatedLinks: [
      { title: "Access (doors + Wallet)", href: "/en/solutions/access" },
      { title: "Contact", href: "/en/contact" },
    ],
  },
  security: {
    headline: "FIDO2 authenticators and on-SE signing",
    tagline: "CTAP2.1 / WebAuthn, secp256k1 or ed25519 in the SE, seed material does not export.",
    seoTitle: "FIDO2 security keys and hardware wallets | NFCTEC",
    seoDescription:
      "FIDO2/WebAuthn authenticators, device-bound passkeys, on-card secp256k1/ed25519, BIP-32/39, SLIP-39 backup cards.",
    intro:
      "FIDO and a crypto wallet may share a secure element and use separate applets. Seed material does not leave the SE. CSV export of keys is out of scope.",
    capabilities: [
      { title: "Issue — FIDO2", description: "CTAP2.1 over USB-C, NFC, Lightning where required. Resident keys, PIN. Distinct policies use distinct AAGUIDs." },
      { title: "Issue — passkeys", description: "Device-bound when the customer does not accept iCloud/Google sync." },
      { title: "Issue — chain signing", description: "Separate applet: secp256k1, ed25519, PSBT, EIP-712. Seed material does not export. No seed-display APDU." },
      { title: "Verify — RP / MDM", description: "WebAuthn at the relying party. Enterprise: attestation and MDM revoke. Backup: SLIP-39 shards on separate NFC cards." },
    ],
    body: `<h2>What this is not</h2>
<p>FIDO and a coin wallet may share a secure element and still be two applets, two policies, two certifications. CSV export of keys is out of scope. Claiming FIDO L2, CC EAL, or FIPS without a submission plan is not in the proposal.</p>
<h2>Issue</h2>
<p>FIDO: CTAP over USB or NFC, PIN, backup story. Coin: HD derivation BIP-32/39/44, sign on-card. NFC backup cards hold shards. Support cannot read the seed.</p>
<h2>Verify</h2>
<p>The relying party runs WebAuthn. We supply the authenticator and, if contracted, MDM revoke. Enterprise and consumer profiles do not share an AAGUID. Samples are built on the SE already in the certification plan, not a random JCOP from the drawer.</p>`
    deliverables: [
      "AAGUID / applet split (FIDO versus coin)",
      "Backup card procedure",
      "MDM revoke when enterprise is in scope",
    ],
    workflow: [
      { title: "Chains and FIDO profile", description: "Samples on the SE already in the certification plan." },
      { title: "RP test", description: "Register, assert, revoke (if MDM is in scope). Seed never leaves the card." },
    ],
    faqs: [
      { q: "Can support export the seed?", a: "No. Seed material does not leave the SE." },
      { q: "One applet for FIDO and Bitcoin?", a: "Usually two. Shared silicon, separate keys and AAGUID / AID." },
    ],
    relatedLinks: [{ title: "JavaCard Tool", href: "/en/tools/javacard-tool" }],
  },
  edu: {
    headline: "Campus card — library, meal, door, print",
    tagline: "Multiple DESFire AIDs on one chip. Wallet student ID is a second credential.",
    seoTitle: "Campus one-card: DESFire EV3, Wallet student ID | NFCTEC",
    seoDescription:
      "DESFire EV3 campus card with separate AIDs for library, meal purse, dorm and print; optional Apple/Google student ID; SIS file feed.",
    intro:
      "One PVC body, several applications. The meal purse is offline. Dorm access is a separate application. Library is often an identifier only. They do not share one file and one key.",
    capabilities: [
      { title: "Issue — multi-AID EV3", description: "Library, meal, door, print — separate keys. Compromise of a vending terminal must not open laboratories." },
      { title: "Issue — meal purse", description: "Subsidy rules, MAC load. Cafeteria terminal continues when SIS is down." },
      { title: "Issue — Wallet ID", description: "Photo pass for inspectors. Dorm doors still need VAS/Smart Tap readers, otherwise PVC remains." },
      { title: "Verify — SIS", description: "Ellucian / Workday / the system already in production. Nightly file is the default; live REST is a separately scheduled item." },
    ],
    body: `<h2>What this is not</h2>
<p>One tap everywhere only if every door and till uses a reader that speaks that credential. A Wallet student ID at a desk is not a dorm reader. Access architecture is on the <a href="/en/solutions/access">access</a> page; Wallet issue/void on <a href="/en/solutions/wallet">Wallet</a>.</p>
<h2>Issue</h2>
<p>One PVC body, several applications. Meal purse is offline. Dorm is a separate application. Library is often an identifier only. They do not share one file and one key. Encoding job: AID/key split plus lost-card flag from SIS.</p>
<h2>Verify</h2>
<p>Cafeteria: terminal keeps working on the last subsidy/purse state when SIS is down. Doors: panel + deny list, same as access. Inspectors: photo on PVC or Wallet. Typical SIS feed is a nightly file plus lost-card flags; real-time REST is extra and usually late.</p>`
    deliverables: [
      "AID/key split",
      "Cafeteria terminal offline behaviour",
      "Doors on Wallet versus doors on PVC",
    ],
    workflow: [
      { title: "Card, Wallet, or both", description: "Then one dorm and one cafeteria." },
      { title: "SIS file specification", description: "Lost card, expiry, meal-plan code." },
    ],
    faqs: [
      { q: "One tap for door and lunch?", a: "One card, two applications, two keys. Same plastic." },
      { q: "Does Wallet replace PVC?", a: "At the desk, often. At the dorm, only if the reader does VAS or Smart Tap." },
    ],
    relatedLinks: [
      { title: "Access", href: "/en/solutions/access" },
      { title: "Apple Wallet & Google Wallet", href: "/en/solutions/wallet" },
      { title: "DESFire EV3", href: "/en/products/mifare-desfire-ev3" },
    ],
  },
};

export const ZH: Record<string, SolutionEnrichment> = {
  banking: {
    headline: "EMV 发卡（接触 / 非接）",
    tagline: "AID 与内核对照、GlobalPlatform 加载（SCP02/SCP03）、PCI CP 个人化、MDES/VTS、ISO 8583 字段映射。",
    seoTitle: "EMV 发卡：JavaCard、PCI 个人化、MDES/VTS | NFCTEC",
    seoDescription: "发行方 EMV：Combination Selection、SCP02/SCP03 加载、PCI CP 制卡脚本、MDES 或 VTS、ISO 8583 字段表。",
    intro:
      "发卡项目拆成四条工作流：对照品牌函的 AID/内核、GlobalPlatform 加载、PCI Card Production 个人化、主机侧 ISO 8583（BIN 入网则另含 MDES 或 VTS）。每条工作流有独立交付件。交付件未齐时，L3 周期通常耗在 Combination Selection，或加载过程中的 6982。",
    capabilities: [
      { title: "AID / 内核表", description: "M/Chip 对应 Kernel 2，VSDC 对应 Kernel 3，QUICS 对应 Kernel 6。精确匹配或部分 SELECT 按品牌函写明，含双标与金属（COM）SKU。" },
      { title: "双界面应用", description: "ISO 7816 接触 + EMV Contactless。CDA/DDA、IAC/TAC 取自品牌函，不沿用上一 BIN 的档案。" },
      { title: "GP INSTALL / LOAD", description: "SCP02 或 SCP03 以 INITIALIZE UPDATE 为准。P1 使用硅片实际允许的值。脚本记录 KCV。JCOP 手册中的传输密钥不上个人化产线。" },
      { title: "PCI CP 个人化", description: "HSM 仪式、加密 PAN 与磁道、按规格 STORE DATA / PUT DATA，样卡保留 CDA 与非接时序及 SW1/SW2。" },
      { title: "MDES / VTS", description: "Token requestor、DAR、yellow path 与 BIN 同期安排，不在首批塑料上线之后补做。" },
      { title: "ISO 8583", description: "87/93 字段表。PIN 翻译与发行密钥同一 HSM 分区。该 BIN 开展电商时再上 3DS。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>这是发行方工作：应用、密钥、制卡、主机字段、令牌化。收单 POS 内核（Kernel 2/3/6）在收单侧。未改动的终端不做重认证。</p>
<h2>发行</h2>
<p>PPSE 列出应用 AID 及优先级。终端按自身表取第一个允许的匹配。Mastercard BIN 将 Visa 排在前面会进入 Kernel 3。现场大量“刷不上”工单属于该顺序问题，并非天线故障。双标产品与 0.76 mm 金属（COM）各自独立成表。</p>
<p>实验室顺序为 PC/SC，<code>80 50</code> INITIALIZE UPDATE，<code>84 82</code> EXTERNAL AUTHENTICATE，INSTALL for load，LOAD，INSTALL for install，SELECT 实例 AID。EXTERNAL AUTHENTICATE 返回 9000、下一条包装命令返回 6982 时，优先核对 MAC 输入与 ICV，而不是 CAP 文件名。通道说明：<a href="/zh/blog/scp02-vs-scp03-javacard-secure-channel">SCP02 vs SCP03</a>。主机侧练习：<a href="/zh/tools/javacard-tool">JavaCard 工具</a>。</p>
<pre><code>80 50 00 00 08  [8 字节主机挑战]
84 82 03 00 10  [host cryptogram][C-MAC]</code></pre>
<p>制卡：密钥留在 HSM。按 PAN 记录执行 STORE DATA / PUT DATA，再激光或印刷。样卡检查 CDA 与非接时序及 SW1/SW2。硅片手册里的 GlobalPlatform 传输密钥不上个人化产线。</p>
<h2>验证（L3 与现网）</h2>
<p>L3 是 Combination Selection 加品牌工具上的密文检查，对照你们签过的品牌函。现网：ISO 8583 字段表，PIN 翻译与发行密钥同一 HSM 分区。Apple Pay / Google Pay / Samsung Pay 是 MDES 或 VTS——第二次发卡，独立测试集，与 BIN 同期安排，不在首批塑料发出之后再补。</p>`,
    deliverables: [
      "对照品牌函的 AID/内核表",
      "CAP、安装参数、SCP 剖面",
      "含 KCV 的仪式清单",
      "制卡脚本及样卡 CDA/时序记录",
      "8583 字段表；合同含钱包时附 MDES/VTS 清单",
    ],
    workflow: [
      { title: "品牌函与 AID 表", description: "内核、双标、金属。该文件齐备后再进行应用开发。" },
      { title: "参考终端样卡", description: "GP 加载、CDA、非接时序，保留 trace。" },
      { title: "仪式与 50–200 张试跑", description: "成败日志，随后小流量正式 BIN。" },
    ],
    faqs: [
      { q: "是否包含 Kernel 2 / Kernel 3？", a: "内核在终端侧。卡片工作是 AID 表对齐收单已认证的内核。" },
      { q: "SCP02 还是 SCP03？", a: "以 INITIALIZE UPDATE 返回为准。制卡样卡仍常见 SCP02。" },
      { q: "令牌化何时开始？", a: "与个人化设计并行。令牌密钥与塑料卡密钥不是同一套。" },
    ],
    relatedLinks: [
      { title: "JavaCard 工具", href: "/zh/tools/javacard-tool" },
      { title: "SCP02 vs SCP03", href: "/zh/blog/scp02-vs-scp03-javacard-secure-channel" },
      { title: "JCOP J3R452", href: "/zh/products/j3r452-javacard" },
    ],
  },
  transit: {
    headline: "票卡、SAM、验票机、账户票",
    tagline: "CALYPSO Rev 3.1、DESFire EV3、验票交易时间、cEMV、带起止日期的双票种割接。",
    seoTitle: "公交收费：CALYPSO、DESFire EV3、cEMV、ABT | NFCTEC",
    seoDescription: "CALYPSO SAM 票卡、DESFire EV3 闭环、验票时序、cEMV 开放支付、账户票及写明日期的双票种窗口。",
    intro:
      "约束条件在闸机侧：生产验票镜像上的交易时间、车站离线时的行为、以及割接后上月发出的票卡是否仍可过闸。新票种服从车队已有的 SAM 与固件，除非线网为新建。",
    capabilities: [
      { title: "发行 — CALYPSO", description: "CD21/CD97、SAM 密钥、定期票与次票文件。密钥版本绑定车队将刷写的验票机软件镜像。" },
      { title: "发行 — DESFire EV3", description: "淘汰 Classic 或私有文件时用 AES 应用。扇区图不复制为 DESFire 文件。" },
      { title: "验证 — 验票机", description: "射频、SELECT、认证、更新、乘客界面。在生产镜像与实际黑名单体量下测时，不用 USB 实验室读头。" },
      { title: "cEMV", description: "闸机受理银行卡与钱包需要交通内核与延迟授权。引入期间闭环票种继续服务。" },
      { title: "账户票", description: "轻触携带令牌。产品与封顶在后台。离线行为写明，不默认。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>新卡设计不能替代车队已有的 SAM 与固件。除新建线网外，编码都按闸机已经会的协议来。用 Classic 转储编码 DESFire 不是迁移。</p>
<h2>发行</h2>
<p>车队已持有 CALYPSO SAM 时，默认继续 Rev 3.1，直至双栈决策签字。DESFire EV3 用于淘汰 Classic 或私有布局。一台验票机两套栈占 flash，还要第二套回归包——预算里有这一行，车队才上。</p>
<p>编码：AID 或 CALYPSO 文件图、密钥版本、产品（定期票、储值、员工）。割接后上月发出的卡仍须过闸，否则割接写错了。热名单/拒绝名单格式属于发行，不是闸机临时补。</p>
<h2>验证</h2>
<p>300 ms 含 SAM 或 AES 认证，不只是 ISO 14443 轮询。USB 实验室 180 ms 不能当证据。在目标验票机、生产密钥、夜间黑名单体量上测。冬季热名单堆满时，这个数通常会变。</p>
<p>车站离线：闸机按手头最后一份名单过/不过。这段窗口写进规格。失败原因码分开，避免稽查和调度室争同一个“错误”。</p>
<h2>cEMV 与账户票</h2>
<p>开放支付和账户票相对闭环是独立产品。割接期三条路径常并行。双票种要有起止日期。无限期“两种都收”等于 Classic 一直不退。</p>
<p>开通当日刷银行卡：仅当该镜像已有交通内核、且后台可延迟授权。二维码用于失败轻触与稽查。高峰过闸仍是 NFC。</p>`,
    deliverables: [
      "票卡规格（CALYPSO 和/或 EV3）及 AID/文件图",
      "与验票机软件版本绑定的 SAM/AES 密钥",
      "生产闸机镜像上的时序记录",
      "写明日历日期的双票种办法",
    ],
    workflow: [
      { title: "存量盘点", description: "验票机、SAM、在用票卡、离线时段。" },
      { title: "按产品划分文件布局", description: "次票、储值、员工。高峰线路试点。" },
      { title: "车队刷写与后台切换", description: "其余验票机、稽查说明。" },
    ],
    faqs: [
      { q: "开通当日所有闸机能否刷银行卡？", a: "仅当该软件镜像已含交通内核、且后台可延迟授权。" },
      { q: "能否用二维码替代 NFC？", a: "二维码用于失败轻触与稽查。高峰过闸仍为 NFC。" },
      { q: "每台验票机都要重认证吗？", a: "对将刷写的镜像做时序和回归。未改动的读头硬件重认证不在范围内，除非点名。" },
    ],
    relatedLinks: [
      { title: "DESFire EV3", href: "/zh/products/mifare-desfire-ev3" },
      { title: "门禁", href: "/zh/solutions/access" },
    ],
  },
  access: {
    headline: "DESFire EV3 / Seos 凭证与 Wallet 钥匙",
    tagline: "AES 应用、OSDP v2.2 读头、Apple VAS / Google Smart Tap、测量到门锁的吊销时延。",
    seoTitle: "门禁：DESFire EV3、HID Seos、Apple Wallet | NFCTEC",
    seoDescription: "DESFire EV3 或 Seos 凭证、OSDP v2.2、Apple/Google 工牌，吊销时间测至门锁。",
    intro:
      "仅输出 UID 的读头无法完成 DESFire 认证，也无法出示 Wallet 卡券。仍在使用的 125 kHz 或 MIFARE Classic 门列入清单并标注日期。未标注日期的“二期”不构成迁移计划。",
    capabilities: [
      { title: "发行 — DESFire EV3", description: "AID、文件、通信模式、密钥号。仅在读头型号支持时启用 LRP。" },
      { title: "发行 — HID Seos", description: "HID 存量要求时采用。Seos 与 DESFire 不合并为同一张文件图。" },
      { title: "验证 — 门", description: "OSDP v2.2 安全通道。Wiegand 只出 UID 等于控制器从未看到 AES 认证。例外必须写日期。" },
      { title: "Wallet（可选）", description: "第二种凭证。卡券类型、VAS / Smart Tap、快捷模式只在实现了的读头上。发行与作废见 Wallet 页。" },
      { title: "吊销", description: "接口可在数秒完成。门锁在控制器拿到黑名单前仍可开。两段时间都记。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>只出 UID 的读头做不了 DESFire 认证，也出示不了 Wallet 卡券。PVC 上的图不是 VAS。钱包支付（Apple Pay / Google Pay）是另一份合同——发行与闸机验证见 <a href="/zh/solutions/wallet">Apple Wallet 与 Google Wallet</a>。</p>
<h2>发行</h2>
<p>扇区与 Crypto-1 不会变成 DESFire 文件。先写应用：AID、文件、密钥号、通信模式。用 Classic 转储编码出来的卡，控制器仍当 UID。外包可在指定门、指定日期前继续 Classic。新员工只发新凭证。</p>
<p>HID 存量要 Seos 就做 Seos。两套文件图、两套编码，不是一份“万能”转储。</p>
<h2>验证</h2>
<p>新布线用 OSDP v2.2。不换控制器的 125 kHz 记入带日期的例外，不是未定期的二期。测试用拟采购型号、生产密钥。</p>
<p>门上的 Wallet：读头必须做完 VAS 或 Smart Tap 并带回载荷。云端吊销可数秒完成；门锁在控制器取得黑名单前仍可开。两本账，与 Wallet 作废对闸机名单相同。</p>`,
    deliverables: [
      "EV3 或 Seos 应用规格",
      "读头清单：OSDP 与带日期例外",
      "Wallet 卡券与读头认证说明",
      "吊销时延测量方法",
    ],
    workflow: [
      { title: "现场普查", description: "读头型号、布线、不能停电的门。" },
      { title: "试点楼宇", description: "生产密钥、PVC 与 Wallet、吊销测试。" },
      { title: "人事切换日期", description: "该日之后只发新凭证。" },
    ],
    faqs: [
      { q: "快捷模式是否覆盖全部读头？", a: "仅固件实现 VAS/ECP 的型号。按 SKU 测试。" },
      { q: "吊销时延如何计算？", a: "接口侧为秒级。到门取决于控制器轮询周期。两个数字都需要。" },
      { q: "一张 Wallet 卡券开门又能支付？", a: "不能。开门是 VAS/Smart Tap。支付是 Apple Pay / Google Pay。" },
    ],
    relatedLinks: [
      { title: "Apple Wallet 与 Google Wallet", href: "/zh/solutions/wallet" },
      { title: "校园一卡通", href: "/zh/solutions/edu" },
      { title: "DESFire EV3", href: "/zh/products/mifare-desfire-ev3" },
    ],
  },
  brand: {
    headline: "NTAG 424 DNA SUN 验真",
    tagline: "每次轻触含 UID、计数器与 AES-CMAC。系统浏览器打开，服务器判定通过或拒绝。",
    seoTitle: "NTAG 424 DNA SUN URL 验证 | NFCTEC",
    seoDescription: "NTAG 424 DNA SDM/SUN、按 UID 分散的 AES、计数器与 CMAC 验证 API。不需要消费者 App。",
    intro:
      "静态 NFC 链接可以被翻拍。SUN 附加 UID、读计数器与 CMAC。转换厂若只写入 NDEF、未配置 SDM 访问权限，出货仍是静态链接。",
    capabilities: [
      { title: "SDM / SUN 模板", description: "镜像、PICC 数据、CMAC 偏移。在 iOS 与 Android 系统 NFC 上验证，不只在 ACR122。" },
      { title: "分散 AES", description: "一枚 UID 一把密钥。一个 SKU 共用一把密钥时，拆出一枚即可伪造其余。" },
      { title: "验证 API", description: "重算 CMAC。计数器必须递增。同一 URL 重放被拒绝。" },
      { title: "结构件", description: "湿法嵌体或开瓶即毁，与转换厂确认。目录贴纸除非满足同一 SDM 配置，否则不在范围内。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>静态 NDEF 链接可以翻拍。二维码没有计数器和 CMAC。在静态链接上叠加地理围栏，不能证明标签是真的。</p>
<h2>发行</h2>
<p>转换厂写入 NDEF <em>并且</em> 配置 SDM 访问权限。只写 NDEF，出货仍是静态链接。密钥：一枚 UID 一把 AES，不是一个 SKU 一把。结构（湿法嵌体、开瓶即毁）在放量前与转换厂谈定。</p>
<pre><code>https://verify.example.com/a/{picc_data}?c={cmac}</code></pre>
<p>镜像、PICC 数据、CMAC 偏移：在 iOS 与 Android 系统 NFC 上查，不只 ACR122。工具：<a href="/zh/tools/ntag424-tool">NTAG424 DNA 工具</a>。说明：<a href="/zh/blog/ntag424-dna-sun-url-authentication-example">SUN 验证</a>。</p>
<h2>验证</h2>
<p>服务器按 UID 加载密钥，重算 CMAC，再确认计数器递增。同一 URL 重放必须失败。编码机显示 OK，但没有一次真机通过和一次重放失败，不算抽检。抽检走线上验证 API，不用第二套实验室密钥。</p>
<p>保修或落地文案绑定该次轻触的通过/拒绝。不需要消费者 App；系统 NFC 打开浏览器。目标市场两大手机品牌仍要实测。</p>`,
    deliverables: [
      "SUN 模板与密钥派生",
      "验证 API 字段表",
      "iOS/Android 失败用例",
      "对线上接口的抽检办法",
    ],
    workflow: [
      { title: "包装形式", description: "转换厂在目标产量下可实现的结构。" },
      { title: "密钥与 API", description: "轻触、重放、截断 URL。" },
      { title: "试点 SKU，再 AQL", description: "与生产使用同一接口。" },
    ],
    faqs: [
      { q: "能否只用二维码？", a: "二维码没有计数器与 CMAC，可用作印刷备份。" },
      { q: "是否需要消费者 App？", a: "不需要。系统 NFC 打开浏览器。两大手机品牌仍需实测。" },
      { q: "整个 SKU 一把密钥？", a: "拆出一枚就能伪造其余。按 UID 分散。" },
    ],
    relatedLinks: [
      { title: "NTAG424 DNA 工具", href: "/zh/tools/ntag424-tool" },
      { title: "SUN 验证", href: "/zh/blog/ntag424-dna-sun-url-authentication-example" },
      { title: "NTAG 424 DNA", href: "/zh/products/ntag424-dna" },
    ],
  },
  gov: {
    headline: "电子护照、eID 与移动驾驶证",
    tagline: "ICAO 9303 LDS、BAC/PACE/EAC、CSCA/DS、ISO 18013-5 设备端呈现。",
    seoTitle: "ICAO 9303 电子护照、eID、ISO 18013-5 mDL | NFCTEC",
    seoDescription: "ICAO 9303 LDS1/LDS2 应用、BAC/PACE/EAC、CSCA 与文件签发者、MRTD 查验、ISO 18013-5 mDL。",
    intro:
      "发行侧是 PKI、应用与证芯页。查验是另一套系统。若同一份工作说明未包含 CSCA 主列表与 CRL 分发的运行手册，有效证件在境外边检失败是常见结果。",
    capabilities: [
      { title: "发行 — 证本", description: "LDS1/LDS2：BAC、PACE-GM/IM、EACv2、主动认证 / 芯片认证，按 ICAO 剖面点名的做。" },
      { title: "发行 — eID", description: "卡上比对；国家方案要求时才做 eIDAS 签名。" },
      { title: "PKI", description: "CSCA、Document Signer、主列表与 CRL。主列表漏发，境外会拒有效本。" },
      { title: "验证 — 查验", description: "MRTD 阅读机、人脸对芯片。不是个人化那套栈。重叠期：新本 PACE，存量仍有 BAC。" },
      { title: "mDL（RFP 含才做）", description: "ISO 18013-5 设备端呈现；写了远程呈现再用 18013-7。不是 Apple Wallet 里的 PDF。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>PassKit / Google Wallet 卡券是另一页。ISO 18013-5 是 NFC（或 QR 交互）上的选择性披露。证芯页防伪（MLI、UV）属于印刷合同，本工作与之对接。</p>
<h2>发行</h2>
<p>新本用 PACE。在用库存大量仍是 BAC。发行脚本、SOD、DS 证书、证芯页是同一项目。剖面已列 EAC 与芯片认证时，SAM 与阅读机许可跟着变，那一栏不再是可选项。</p>
<p>CSCA 签发 Document Signer，DS 签发 SOD。主列表与 CRL 分发是带负责人和时点的运行手册，不是一张幻灯片。</p>
<h2>验证</h2>
<p>重叠期查验系统同时讲 BAC 和 PACE。会在境外边检失败的本，必须先在 RFP 点名的查验机上失败。</p>
<p>mDL 验证方需要可用的信任列表和吊销流程。“离线”仍然要求设备上的列表足够新。漏这一段是常见缺口。</p>`,
    deliverables: [
      "对照 ICAO/BSI 函的应用剖面",
      "CSCA/DS 仪式说明",
      "发行与查验接口清单",
      "RFP 含 mDL 时的交互说明",
    ],
    workflow: [
      { title: "剖面冻结", description: "LDS 版本、PACE 映射、是否 EAC。" },
      { title: "查验机上的样证", description: "会在边境失败的本，先在实验室失败。" },
    ],
    faqs: [
      { q: "CSCA 由谁运营？", a: "通常由国家运营。发行与查验接到该 CA。" },
      { q: "mDL 能否离线？", a: "18013-5 设备端呈现是离线路径。验证器仍需可用的信任列表。" },
      { q: "和 Apple Wallet 证件一样吗？", a: "不一样。Wallet 卡券是 PassKit/Google 对象。mDL 是 ISO 18013。" },
    ],
    relatedLinks: [
      { title: "Apple Wallet 与 Google Wallet", href: "/zh/solutions/wallet" },
    ],
  },
  health: {
    headline: "患者卡、电子处方、医护 SSO",
    tagline: "ISO 7816 安全元件、HL7 FHIR 标识、轻触+PIN 进入 EHR、可选冷链 NTAG。",
    seoTitle: "医疗智能卡、电子处方、EHR 工牌登录 | NFCTEC",
    seoDescription: "患者 ISO 7816 卡、SE 内签名的电子处方、医护轻触+PIN 进入 EHR、单件核对用温度 NTAG。",
    intro:
      "医院已有病历系统。卡用作标识、签名设备或门禁，或在一张 DESFire 上以不同 AID 同时承担上述角色。临床记录不写入 EEPROM。",
    capabilities: [
      { title: "发行 — 患者卡", description: "加密指针、急救区；部委要求时做卡上比对。病历正文留在 EHR，不进 EEPROM。" },
      { title: "发行 — 电子处方", description: "SE 内合格签名、DSC 审计；国家交换用 FHIR 时再对接 FHIR。" },
      { title: "验证 — 医护 SSO", description: "轻触+PIN 进入 Epic/Cerner 一类 SSO（Imprivata 等）。工牌加读头；会话策略仍在 EHR。" },
      { title: "冷链（可选）", description: "NTAG 加温度记录做单件核对。不能替代药房已校准的整票记录仪。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>医院已有病历系统。芯片不存临床记录。HIPAA/GDPR 文件由覆盖实体出；我们按 DPO 能签字的方式设计。</p>
<h2>发行</h2>
<p>卡用作标识、签名设备或门禁，或在一张 DESFire 上用不同 AID 同时承担。文件图对照 EHR 标识（HIE 已跑 PIX/PDQ 则一并对照）。</p>
<p>电子处方：密钥和合格签名剖面在 SE。FHIR 留在后台。</p>
<h2>验证</h2>
<p>医护登录是轻触+PIN 加 SSO 厂商。挂失、PIN 锁死、急救区读取：上线前在试点病区测。门禁若在范围内，走门禁方案（OSDP，不是只出 UID）。</p>
<p>冷链：NTAG DNA（或带传感器的 NTAG 22x）做单件核对。整票仍用药房校准记录仪。两套系统、两份规格。</p>`,
    deliverables: [
      "卡文件与 EHR 标识对照",
      "范围内含电子处方时的签名剖面",
      "SSO 用读头清单",
    ],
    workflow: [
      { title: "EHR / HIE 盘点", description: "标识、是否 FHIR、工牌 SSO 厂商。" },
      { title: "试点病区", description: "挂失、急救区、PIN 锁死。" },
    ],
    faqs: [
      { q: "是否包含 HIPAA / GDPR 认证？", a: "按医院 DPO 可签字的方式设计。覆盖实体文件仍由医院出具。" },
      { q: "芯片能存完整病历吗？", a: "不能。只有指针和密钥。正文在 EHR。" },
    ],
    relatedLinks: [
      { title: "门禁（工牌）", href: "/zh/solutions/access" },
      { title: "品牌 / NTAG 424", href: "/zh/solutions/brand" },
    ],
  },
  iot: {
    headline: "NFC 配网与出厂身份",
    tagline: "NDEF 或 SUN 下发 Wi-Fi / Matter，产线注入 X.509，可选 SUN 回连。",
    seoTitle: "NFC 设备上线：NTAG 424 DNA、Matter、出厂 X.509 | NFCTEC",
    seoDescription: "NTAG 424 DNA 或 Type 4 一触配网、Matter 配网载荷、产线注入 X.509、SUN 正品回连。",
    intro:
      "外箱二维码可在仓库被拍摄。设备上的 NFC 可携带签名载荷，照片无法复现。Matter 仍需要 DAC；NFC 只携带配网载荷。",
    capabilities: [
      { title: "发行 — NDEF / SUN", description: "标签上放 Wi-Fi 或 BLE 交接。要抗克隆时用签名（NTAG 424 DNA）。" },
      { title: "Matter 载荷", description: "经 NFC 传配网载荷。DAC/PAI 仍在设备身份链上；SUN 不能代替 DAC。" },
      { title: "发行 — 出厂证书", description: "线边 HSM 按台签发 X.509。注入芯片，不印在 PDF。" },
      { title: "验证 — 回连", description: "CMAC 通过后设备才允许回家。机制与品牌防伪相同。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>外箱二维码可以在仓库被拍下来。廉价 Type 2 静态链接等于二维码。NFC 不刷固件，最多打开发起升级的会话。</p>
<h2>发行</h2>
<p>线边工位：HSM、序列号、注入、抽检、不良品路径。推迟到云端开通会形成无人认领窗口——写进威胁模型。Matter 仍要 DAC；NFC 只带配网载荷。</p>
<p>标签类型与文件图：哪个射频的凭证放在哪个文件。范围内有 SUN 时用 <a href="/zh/tools/ntag424-tool">NTAG424 工具</a>。</p>
<h2>验证</h2>
<p>目标市场手机读 NDEF，写 Wi-Fi 或启动 Matter 配网。带签名的轻触：服务器先查 CMAC 再允许设备回家。固件：签名清单、禁止回滚，MCU 支持则 A/B——与标签工位分开。</p>`,
    deliverables: [
      "标签类型与 NDEF/SUN 图",
      "证书注入工步",
      "目标市场手机实测",
    ],
    workflow: [
      { title: "无线与标签", description: "Wi-Fi、BLE、Matter，哪个文件放置哪段载荷。" },
      { title: "线边工位", description: "HSM、抽检、不良品路径。" },
    ],
    faqs: [
      { q: "能否用 SUN 代替 Matter DAC？", a: "不能。SUN 认证本次轻触。DAC 认证设备在 Matter 织物中的身份。" },
      { q: "Type 2 静态链接够不够？", a: "要抗克隆就不够。用 NTAG 424 DNA SUN 或同等签名载荷。" },
    ],
    relatedLinks: [
      { title: "NTAG424 DNA 工具", href: "/zh/tools/ntag424-tool" },
      { title: "品牌防伪", href: "/zh/solutions/brand" },
    ],
  },
  retail: {
    headline: "会员、礼品卡与闭环 POS",
    tagline: "DESFire 会员与钱包、Apple VAS / Google Smart Tap、Verifone / Ingenico / PAX。",
    seoTitle: "零售会员与礼品卡：DESFire、钱包、POS | NFCTEC",
    seoDescription: "DESFire 会员与储值、Apple VAS 与 Google Smart Tap、离线钱包、POS 内核对接。",
    intro:
      "主机侧积分与卡上钱包是不同产品。离线礼品卡充值需要 MAC。钱包卡券要求读头实现 VAS 或 Smart Tap，条码枪不足。",
    capabilities: [
      { title: "发行 — 会员", description: "DESFire：等级/积分文件，或只放 POS 查询用的标识。主机积分与卡上钱包是不同产品。" },
      { title: "发行 — 礼品 / 钱包", description: "离线余额、充值 MAC、主机不可用时的拒绝规则。以哪一侧为准写明。" },
      { title: "发行 — Wallet 卡券", description: "Apple VAS、Google Smart Tap，经 APNs / Google API 更新。与塑料卡分开。" },
      { title: "验证 — POS", description: "Verifone、Ingenico 或 PAX——该连锁已认证的内核。仅支付固件拉不下会员卡券。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>条码枪不是 VAS 或 Smart Tap。未改动的终端不在本范围内重做 EMV L2。钱包支付令牌是 MDES/VTS（银行页），不是这张会员卡券。</p>
<h2>发行</h2>
<p>积分在主机：卡只是标识。余额在卡：需要密钥和充值 MAC。没写清以哪一侧为准，周末就会双花工单。<a href="/zh/solutions/wallet">Wallet</a> 页的 class/object 或 .pkpass，再加上门店里真实那台 POS 读头。</p>
<h2>验证</h2>
<p>POS 对接现网内核与商户协议（NEXO 等）。仅授权 EMV 支付的读头，没开通对应功能就拉不下会员卡。测试用那台实际型号。</p>
<p>对账：日结对卡上钱包日志。礼品重放、主机宕机拒绝写成规则，不交给收银员临场发挥。</p>`,
    deliverables: [
      "文件图：标识或钱包",
      "礼品卡充值 MAC 说明",
      "钱包功能对应的读头清单",
    ],
    workflow: [
      { title: "POS 与钱包盘点", description: "按连锁标准，再选一家门店。" },
      { title: "对账", description: "日结与卡上钱包日志。" },
    ],
    faqs: [
      { q: "门店全部 PAX 是否可用？", a: "仅固件含 VAS/Smart Tap 的镜像。仅支付镜像不可用。" },
      { q: "积分在卡上还是主机？", a: "写明一边。两边混用不写规则，就会双花工单。" },
    ],
    relatedLinks: [
      { title: "Apple Wallet 与 Google Wallet", href: "/zh/solutions/wallet" },
      { title: "DESFire EV3", href: "/zh/products/mifare-desfire-ev3" },
    ],
  },
  auto: {
    headline: "CCC 数字钥匙 — NFC、BLE、UWB",
    tagline: "R3.0 车主配对，手机没电时 NFC 开锁，总装按 VIN 注入。",
    seoTitle: "CCC Digital Key 3.0：NFC 兜底、UWB、钱包分享 | NFCTEC",
    seoDescription: "CCC Digital Key R3.0：UWB 测距、没电 NFC 开锁、BLE 唤醒、车载 SE、Apple/Google 分享、按 VIN 注入。",
    intro:
      "走近使用 UWB。手机没电时在门把手使用 NFC。BLE 负责唤醒。三个射频共用一套密钥层次。",
    capabilities: [
      { title: "发行 — 车主配对", description: "CCC R3.0 车主配对、分享、吊销，对照你们冻结的 CCC 测试项。" },
      { title: "UWB", description: "802.15.4z HRP 测距。安全属性是距离限定。天线未校准只是舒适功能。" },
      { title: "验证 — NFC 兜底", description: "手机没电时在门把手 Type 4。砍掉这一项，CCC 仍会列。" },
      { title: "SE 与总装", description: "AEC-Q100 级 SE、CCC 应用、工位 HSM 按 VIN 注入。下线是轻触加 UWB 走近，不只校验和。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>Apple/Google 钥匙分享只在签约了对应项目时才写。跳过 CCC 条目的后装“手机当钥匙”是另一份工作。交通/会员 Wallet 卡券不是车钥匙。</p>
<h2>发行</h2>
<p>三个射频、一套密钥层次：UWB 走近、BLE 唤醒、NFC 门把手。主机厂云 / TSM 夹在 Apple 与 Google 下发中间。密钥按 VIN 在工位写入——不是把测试密钥留在车上。</p>
<h2>验证</h2>
<p>台架：没电场景的门把手 NFC，再校准天线后的 UWB 走近。下线：同样两项，再加对照已签字 CCC 清单的分享/吊销。固件校验和单独不够当质量门。</p>`,
    deliverables: [
      "射频与 SE 对照 CCC 条目",
      "VIN 注入工步",
      "实际签约的 Wallet 项目",
    ],
    workflow: [
      { title: "CCC 版本冻结", description: "R3.0 范围内外条目。" },
      { title: "台架再上线", description: "门把手 NFC，再工位注入。" },
    ],
    faqs: [
      { q: "只用手机、不要 NFC？", a: "则缺少没电场景。CCC 仍列出该项。" },
      { q: "你们代做 CCC 认证吗？", a: "按冻结的 CCC 条目和车上射频实现。CCC 列名归 OEM/Tier-1。" },
    ],
    relatedLinks: [
      { title: "Apple Wallet 与 Google Wallet", href: "/zh/solutions/wallet" },
    ],
  },
  wallet: {
    headline: "Apple Wallet 与 Google Wallet — 发行和验证",
    tagline: "Pass Type ID / 发行方账号、.pkpass 与 Wallet 对象、APNs / 回调、闸机 VAS 与 Smart Tap。",
    seoTitle: "Apple Wallet PassKit 与 Google Wallet：发行与验证卡券 | NFCTEC",
    seoDescription:
      "发行 Apple Wallet、Google Wallet 卡券，更新与作废，闸机条码或 NFC（VAS / Smart Tap）验证。读头固件、流水号查询、吊销。",
    intro:
      "两边都做。发行：做成卡券，放进 Apple Wallet 或 Google Wallet，改字段，作废。验证：闸机、门、柜台或手机读头给出过/不过。Apple 和 Google 是两套账号、两套证书、两套读头配置，不是一份 JSON 复制两遍。",
    capabilities: [
      { title: "Apple 发行", description: "Pass Type ID、签名证书、pass.json、图、.pkpass。Web 服务：设备注册、serial 列表、APNs。NFC 只有卡券和读头都配了 VAS 才有。" },
      { title: "Google 发行", description: "Issuer 账号、class/object、服务账号签 JWT、保存链接。更新是改 object。Smart Tap 要卡券和读头都有 collector ID。" },
      { title: "Apple 验证", description: "视觉闸机扫条码/QR。NFC：VAS merchant ID、读头固件，快捷模式只在实现了的型号上。后台：serial、状态、最后更新。" },
      { title: "Google 验证", description: "视觉扫条码。NFC：Smart Tap 2 collector、核销值。后台：object ID、状态、如使用则核销次数。" },
      { title: "生命周期", description: "添加、改字段、作废、推送。手机丢失和作废不是同一件事，都要有记录。" },
      { title: "读头", description: "列出真正会 VAS 或 Smart Tap 的型号和固件。只出 UID 的 Wiegand 头验证不了 Wallet 卡券。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>Wallet 卡券不是 DESFire 文件，也不是 EMV 令牌。钱包里的支付（Apple Pay / Google Pay）是另一份合同。本页是 PassKit 和 Google Wallet 卡券：会员、活动、登机、优惠券、generic、store card，以及 Apple/Google 允许该发行方使用的样式。</p>
<h2>发行 — Apple</h2>
<p>需要 Pass Type ID 和能签该类型的证书。包是 zip：pass.json、条带/图标/logo、manifest、signature。用户从 HTTPS、邮件或 App 内添加。添加后设备向你的 web 服务注册。改字段走该服务；Apple Push 通知手机来拉。没有 register/unregister，卡券会一直停在旧数据，除非用户删掉重加。</p>
<p>Apple 的 NFC 是 VAS。卡券带 VAS 载荷。读头要配 Apple 给该项目的 merchant identifier。快捷模式是读头固件加卡券设置。PDF 上的图不是 VAS。</p>
<h2>发行 — Google</h2>
<p>需要 Wallet issuer 账号和签 JWT 的服务账号。先 class（模板）再 object（实例）。保存链接是签过名的 JWT。更新用 REST 改 object。Smart Tap 可选：class/object 和终端都要有 collector ID。没有 Smart Tap 时手机仍可出示条码。</p>
<h2>验证</h2>
<p>视觉：摄像头或激光扫条码/QR。服务器用 Apple 的 serial 或 Google 的 object ID 查是否作废、过期，再开门或盖票。同一条码能否再用，由你们写规则（一次、N 次、或不限）。</p>
<p>NFC：读头做完 VAS 或 Smart Tap，带回你事先写在卡券里的载荷，和后台记录比对。读头只出 UID，就不是在验 Wallet。</p>
<p>吊销：object/pass 作废并推送。手机可能数秒到数分钟才变。闸机还要在你们的名单里立刻拒绝该 serial，否则截图/条码在名单更新前仍可用。两本账：Wallet 更新，和你们的拒绝名单。</p>
<h2>交付</h2>
<p>发行方开通（Apple 开发者 + Pass Type ID，Google Wallet API）。按样式的卡券模板。发行 API（创建、更新、作废）。Apple 要求的回调。Google object REST。闸机或柜台：条码摄像头，或点名 VAS/Smart Tap 的读头型号。日志：serial、时间、过/不过、原因。附录没写的读头，现场不承诺。</p>`,
    deliverables: [
      "Apple Pass Type ID / 证书流程与 .pkpass 模板",
      "Google issuer、class/object、JWT 发行链接",
      "创建 / 更新 / 作废 API",
      "Apple web 服务（注册、serial、APNs）",
      "验证：条码规则；范围内则 VAS 或 Smart Tap 读头型号 + 载荷校验",
      "作废与拒绝名单的时差",
    ],
    workflow: [
      { title: "账号", description: "Apple Pass Type ID 与 Google issuer。先沙盒。" },
      { title: "一种样式", description: "真机添加、改一个字段、作废。" },
      { title: "验证路径", description: "只条码，或按将采购的读头做 NFC。" },
      { title: "闸机名单", description: "过/不过日志。拒绝名单不依赖 APNs 延迟。" },
    ],
    faqs: [
      { q: "一张卡券能开门又能支付吗？", a: "不能。支付是 Apple Pay / Google Pay。卡券是另一凭证。门禁要 VAS/Smart Tap 读头。" },
      { q: "截图条码能过吗？", a: "如果只扫图、不作废、不限次，能过。规格里写明，或改 NFC / 会变的条码。" },
      { q: "作废后多久生效？", a: "后台拒绝名单：闸机查你就可以立刻拒绝。手机 Wallet：看 APNs / Google 拉 object。两个时间都要记。" },
      { q: "只做 iPhone？", a: "Apple 和 Google 是两条发行线。没有 Google issuer 就发不了 Google Wallet 卡券。" },
    ],
    relatedLinks: [
      { title: "门禁（门 + Wallet）", href: "/zh/solutions/access" },
      { title: "联系", href: "/zh/contact" },
    ],
  },
  security: {
    headline: "FIDO2 认证器与卡内签名",
    tagline: "CTAP2.1 / WebAuthn，SE 内 secp256k1 或 ed25519，种子材料不导出。",
    seoTitle: "FIDO2 安全密钥与硬件钱包 | NFCTEC",
    seoDescription: "FIDO2/WebAuthn 认证器、设备绑定 Passkey、卡内 secp256k1/ed25519、BIP-32/39、SLIP-39 备份卡。",
    intro:
      "FIDO 与加密货币钱包可共用安全元件，应用分开。种子材料不离开 SE。密钥 CSV 导出不在范围内。",
    capabilities: [
      { title: "发行 — FIDO2", description: "CTAP2.1，USB-C、NFC，需要时 Lightning。常驻凭证、PIN。不同策略用不同 AAGUID。" },
      { title: "发行 — Passkey", description: "客户不接受 iCloud/Google 同步时，做成设备绑定。" },
      { title: "发行 — 链上签名", description: "独立应用：secp256k1、ed25519、PSBT、EIP-712。种子不导出。不做显示种子的 APDU。" },
      { title: "验证 — RP / MDM", description: "依赖方跑 WebAuthn。企业：证明与 MDM 吊销。备份：SLIP-39 分片放在独立 NFC 卡。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>FIDO 和币钱包可以共用安全元件，仍是两套应用、两套策略、两套送测。密钥 CSV 导出不在范围内。没有送测计划就不写 FIDO L2、CC EAL、FIPS。</p>
<h2>发行</h2>
<p>FIDO：USB 或 NFC 上的 CTAP、PIN、备份办法。币：BIP-32/39/44 派生，卡内签名。NFC 备份卡放分片。客服读不到种子。</p>
<h2>验证</h2>
<p>依赖方跑 WebAuthn。我们交认证器，合同含 MDM 则做吊销。企业和个人剖面不共用 AAGUID。样卡做在认证计划已含的 SE 上，不是抽屉里随便一张 JCOP。</p>`,
    deliverables: [
      "AAGUID / 应用切分（FIDO 与币）",
      "备份卡流程",
      "企业范围内的 MDM 吊销",
    ],
    workflow: [
      { title: "链与 FIDO 剖面", description: "在认证计划已含的 SE 上出样。" },
      { title: "RP 测试", description: "注册、断言、吊销（范围内含 MDM）。种子不离卡。" },
    ],
    faqs: [
      { q: "客服能否导出种子？", a: "不能。种子材料不离开 SE。" },
      { q: "FIDO 和比特币一个应用？", a: "通常两个。硅片可以共用，密钥和 AAGUID / AID 分开。" },
    ],
    relatedLinks: [{ title: "JavaCard 工具", href: "/zh/tools/javacard-tool" }],
  },
  edu: {
    headline: "校园卡：图书馆、食堂、门禁、打印",
    tagline: "一颗芯片多个 DESFire AID。钱包学生证为第二种凭证。",
    seoTitle: "校园一卡通：DESFire EV3、钱包学生证 | NFCTEC",
    seoDescription: "DESFire EV3 分 AID 用于图书、餐钱包、宿舍、打印；可选 Apple/Google 学生证；SIS 文件接口。",
    intro:
      "一张 PVC，多个应用。食堂钱包离线运行。宿舍门禁为独立应用。图书馆常常只是标识。它们不共用一个文件和一把密钥。",
    capabilities: [
      { title: "发行 — 多 AID EV3", description: "图书、餐、门、打印，密钥分开。售货机被攻破不得打开实验室。" },
      { title: "发行 — 餐钱包", description: "补贴规则、MAC 充值。SIS 不可用时食堂终端仍可扣款。" },
      { title: "发行 — Wallet 学生证", description: "供前台看照片。宿舍门仍要 VAS/Smart Tap 读头，否则继续 PVC。" },
      { title: "验证 — SIS", description: "Ellucian / Workday / 现网系统。默认为夜间文件；实时 REST 单独排期。" },
    ],
    body: `<h2>这页不包含什么</h2>
<p>处处一触，前提是每扇门和每个窗口的读头都会这种凭证。前台 Wallet 学生证不等于宿舍读头。门禁架构见 <a href="/zh/solutions/access">门禁</a>；卡券发行与作废见 <a href="/zh/solutions/wallet">Wallet</a>。</p>
<h2>发行</h2>
<p>一张 PVC，多个应用。食堂钱包离线。宿舍是独立应用。图书馆常常只是标识。不共用一个文件和一把密钥。编码：AID/密钥划分，加上 SIS 挂失标记。</p>
<h2>验证</h2>
<p>食堂：SIS 宕机时终端按上次补贴/余额继续。门：控制器加拒绝名单，与门禁方案相同。前台：PVC 或 Wallet 上的照片。SIS 典型是夜间文件加挂失；实时 REST 是加项，通常排期靠后。</p>`,
    deliverables: [
      "AID/密钥划分",
      "食堂终端离线行为",
      "Wallet 门与 PVC 门清单",
    ],
    workflow: [
      { title: "卡、钱包或两者", description: "随后一栋宿舍与一个食堂。" },
      { title: "SIS 文件规格", description: "挂失、有效期、餐计划代码。" },
    ],
    faqs: [
      { q: "开门与就餐能否一次轻触？", a: "一张卡、两个应用、两把密钥，同一张塑料。" },
      { q: "Wallet 能替代 PVC 吗？", a: "前台常常可以。宿舍只有读头会 VAS 或 Smart Tap 才行。" },
    ],
    relatedLinks: [
      { title: "门禁", href: "/zh/solutions/access" },
      { title: "Apple Wallet 与 Google Wallet", href: "/zh/solutions/wallet" },
      { title: "DESFire EV3", href: "/zh/products/mifare-desfire-ev3" },
    ],
  },
};
