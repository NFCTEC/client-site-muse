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
    body: `<h2>Combination Selection</h2>
<p>PPSE lists application AIDs with a priority byte. The terminal walks its own table and takes the first allowed match. Placing Visa above Mastercard on a Mastercard BIN selects Kernel 3. A large share of “tap does not work” tickets are this ordering error, not an antenna defect. Co-badge products and 0.76 mm metal (COM) each have a separate table.</p>
<h2>Load before personalization</h2>
<p>On the bench the sequence is PC/SC, <code>80 50</code> INITIALIZE UPDATE, <code>84 82</code> EXTERNAL AUTHENTICATE, INSTALL for load, LOAD, INSTALL for install, SELECT instance AID. If EXTERNAL AUTHENTICATE returns 9000 and the next wrapped command returns 6982, the first check is MAC input and ICV, not the CAP file name. Channel notes: <a href="/en/blog/scp02-vs-scp03-javacard-secure-channel">SCP02 vs SCP03</a>. Host-side exercise: <a href="/en/tools/javacard-tool">JavaCard Tool</a>.</p>
<pre><code>80 50 00 00 08  [8-byte host challenge]
84 82 03 00 10  [host cryptogram][C-MAC]</code></pre>
<h2>Bureau</h2>
<p>Keys remain under HSM. Per-PAN records drive STORE DATA / PUT DATA, then laser or print. Sample cards are checked for CDA and contactless timing. Production does not use the GlobalPlatform transport key printed in the silicon manual.</p>
<h2>Host and wallets</h2>
<p>ISO 8583 is a field map. PIN blocks belong on the same HSM partition as the issuer keys. Apple Pay, Google Pay and Samsung Pay are MDES or VTS: a second issuance with its own test set. Terminal kernels remain with the acquirer. Card certification does not substitute for the acquirer’s EMVCo L1/L2 work on the POS.</p>`,
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
      { title: "CALYPSO Rev 3.1", description: "CD21/CD97, SAM keys, pass versus stored-ride files. Key version bound to the validator software image." },
      { title: "DESFire EV3", description: "AES applications where the existing card is MIFARE Classic or a private file system. Sector maps are not copied onto DESFire files." },
      { title: "Validator time", description: "RF, SELECT, authenticate, update, passenger UI. Measured on the production image with the live deny-list size." },
      { title: "cEMV", description: "Bank cards and wallets at the gate require a transit kernel and delayed authorisation. Closed-loop products remain in service during that introduction." },
      { title: "Account-based (ABT)", description: "The tap carries a token; products and fare caps sit in the back office." },
    ],
    body: `<h2>Media family</h2>
<p>Where depots already hold CALYPSO SAMs, Rev 3.1 remains the default until a dual-stack decision is signed. DESFire EV3 is used when Classic or a private layout is being withdrawn. Two stacks on one validator consume flash and a second regression pack; that cost belongs in the budget. Encoding passenger cards from a Classic dump onto DESFire files is not a valid migration.</p>
<h2>Transaction time</h2>
<p>A 300 ms target includes SAM or AES authentication, not ISO 14443 alone. A 180 ms log from a USB laboratory reader is not evidence. Timing is taken on the target validator, production keys, and overnight deny-list volume. Winter gates with a full hotlist are the condition that usually moves the number.</p>
<h2>Open loop and accounts</h2>
<p>cEMV and ABT are separate products from closed-loop media. During cutover the three paths often run together; declined-tap reason codes are kept distinct. Dual-media operation needs a start date and a stop date. An open-ended “both accepted” window is how Classic remains in circulation.</p>`,
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
    ],
    relatedLinks: [],
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
      { title: "DESFire EV3", description: "AID, files, communication mode, key numbers. LRP only on reader SKUs that implement it." },
      { title: "HID Seos", description: "Used where the installed HID base requires it. Seos and DESFire are not merged into one file map." },
      { title: "OSDP v2.2", description: "Secure Channel and tamper. Wiegand retained only on doors that cannot be rewired in this programme." },
      { title: "Apple Wallet", description: "Pass type, VAS, Express Mode / ECP 2.0. Reader firmware and Apple configuration; artwork on PVC is not sufficient." },
      { title: "Google Smart Tap", description: "Class/object and JWT. HCE only if the head cannot Smart Tap." },
    ],
    body: `<h2>MIFARE Classic</h2>
<p>Sectors and Crypto-1 keys do not become DESFire files. Applications are specified first. Encoding from a Classic dump produces a card that panels will still treat as UID. Contractors may keep Classic on named doors until a named date. New hires are issued the new credential only.</p>
<h2>Readers</h2>
<p>Wiegand UID-out means the panel never observed an AES authenticate. New cable runs use OSDP v2.2. Legacy 125 kHz on a controller that will not be replaced is recorded as a dated exception, not as an undated follow-on.</p>
<h2>Wallet</h2>
<p>Express Mode is a combination of reader firmware and pass configuration. Tests use the SKU that will be purchased. Cloud revoke can complete in seconds; the door remains open until the panel has the deny list. Both intervals are recorded.</p>`,
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
      { q: "Express Mode on every reader?", a: "Only heads whose firmware implements the VAS/ECP behaviour. Tests are per SKU." },
      { q: "How fast is revoke?", a: "API: seconds. Door: panel poll interval. Both figures are required." },
    ],
    relatedLinks: [],
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
    body: `<h2>URL format</h2>
<pre><code>https://verify.example.com/a/{picc_data}?c={cmac}</code></pre>
<p>The server loads the key for that UID, checks the CMAC, then checks the counter. That is the clone test. Write-up: <a href="/en/blog/ntag424-dna-sun-url-authentication-example">SUN authentication</a>.</p>
<h2>Laboratory</h2>
<p>EV2 authenticate, set SDM, tap a phone sold in that market, POST the query string, replay it (must fail). Tool: <a href="/en/tools/ntag424-tool">NTAG424 DNA Tool</a>. Incorrect file permissions can look configured in the encoder UI and still emit a static URL.</p>
<h2>Line</h2>
<p>The factory injects keys and mirrors. Sampling uses the same verify API as production. Encoder “OK” without a passing tap and a failing replay is not a sample. Geo-fence and velocity checks sit on top of CMAC; they do not replace it. Warranty content is bound to the pass state of that tap.</p>`,
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
    ],
    relatedLinks: [
      { title: "NTAG424 DNA Tool", href: "/en/tools/ntag424-tool" },
      { title: "SUN authentication", href: "/en/blog/ntag424-dna-sun-url-authentication-example" },
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
      { title: "LDS1 / LDS2 applet", description: "BAC, PACE-GM/IM, EACv2, Active Authentication / Chip Authentication as required by the ICAO profile." },
      { title: "eID / residence", description: "Match-on-card; eIDAS signatures where the national scheme requires them." },
      { title: "CSCA / DS", description: "Country Signing CA, Document Signer, master list and CRL distribution." },
      { title: "Inspection", description: "MRTD readers and face-to-chip. Not the same stack as personalization." },
      { title: "mDL", description: "ISO 18013-5 device retrieval; 18013-7 where remote presentation is in the RFP." },
    ],
    body: `<h2>PACE and BAC</h2>
<p>New books should use PACE. A large volume of live stock is still BAC. Inspection systems therefore speak both during overlap. EAC and Chip Authentication, if listed in the profile, change the SAM and the reader licence; they are not optional extras at that point.</p>
<h2>PKI</h2>
<p>CSCA signs the Document Signer. DS signs the SOD. A missed master-list publish causes foreign borders to reject valid books. ML and CRL distribution is written as an operations runbook.</p>
<h2>mDL</h2>
<p>ISO 18013-5 is ISO-over-NFC (or QR engagement) with selective disclosure. It is not a PDF placed in Wallet. Verifier trust lists and revocation are the parts most often omitted. Datapage security printing (MLI, UV) is a printer contract; this work interfaces to it.</p>`,
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
    ],
    relatedLinks: [],
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
      { title: "Patient card", description: "Encrypted pointer, emergency zone, match-on-card where the ministry requires it." },
      { title: "e-Prescription", description: "Qualified signature in the SE, audit to DSC, FHIR where the national switch uses it." },
      { title: "Clinician badge", description: "Tap-and-PIN into Epic/Cerner-class SSO (Imprivata and equivalents)." },
      { title: "Cold chain", description: "NTAG plus temperature logger for unit-level checks. This does not replace the calibrated shipment logger already certified by pharmacy." },
    ],
    body: `<h2>Card contents</h2>
<p>Typical contents are identifiers and keys. FHIR (and PIX/PDQ where the HIE already runs it) stays in the back office. Putting clinical notes in EEPROM fails privacy review.</p>
<h2>Clinician login</h2>
<p>Tap-and-PIN is a credential plus an SSO vendor. This work covers the badge and the reader. Session timeout and dual control remain EHR policy.</p>
<h2>Cold chain</h2>
<p>NTAG DNA (or NTAG 22x with a sensor) supports unit-level checks. The shipment still uses the pharmacy’s calibrated logger. The two systems are specified separately.</p>`,
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
    ],
    relatedLinks: [],
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
      { title: "NDEF credential", description: "Wi-Fi or BLE handoff. Signed when clone resistance is required." },
      { title: "Matter", description: "Onboarding payload over NFC. DAC/PAI remain in the device identity chain." },
      { title: "Birth certificate", description: "Per-device X.509 from a line-side HSM. Injected, not printed in a PDF." },
      { title: "SUN callback", description: "Device phones home only after CMAC verifies. Same mechanics as brand protection." },
    ],
    body: `<h2>Tap-to-onboard</h2>
<p>The phone reads NDEF, writes Wi-Fi or starts Matter commissioning. A cheap Type 2 tag with a static URL is equivalent to QR. NTAG 424 DNA is used when SUN or SDM is required. Tooling: <a href="/en/tools/ntag424-tool">NTAG424 Tool</a>.</p>
<h2>Factory</h2>
<p>Identity is a line station: HSM, serial, inject, sample. Deferring provision to the cloud creates a window of unclaimed devices; that window is written into the threat model.</p>
<h2>Firmware</h2>
<p>Signed manifest, rollback lock, A/B if the MCU supports it. NFC does not update firmware; it may start the session that does.</p>`,
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
    ],
    relatedLinks: [{ title: "NTAG424 DNA Tool", href: "/en/tools/ntag424-tool" }],
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
      { title: "DESFire membership", description: "Tier/points files, or an identifier the POS looks up." },
      { title: "Purse / gift", description: "Offline value, MAC top-up, decline rules when the host is down." },
      { title: "Wallet", description: "VAS (Apple), Smart Tap (Google), pass updates via APNs / Google API." },
      { title: "POS", description: "Verifone, Ingenico or PAX — the kernel already certified in that banner." },
    ],
    body: `<h2>Where the balance lives</h2>
<p>Host-held points: the card is an identifier. Card-held purse: keys and a load MAC are required. Without a stated source of truth, weekend double-spend tickets follow.</p>
<h2>Wallet</h2>
<p>Apple loyalty is VAS plus pass updates. Google is Smart Tap 2. A reader licensed only for EMV payment will not pull a loyalty pass until that feature is licensed and configured. Tests use the exact head.</p>
<h2>POS</h2>
<p>Integration is to the kernel and merchant protocol already in production (NEXO and similar). EMV L2 recertification is not in scope for terminals that were not modified.</p>`,
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
    ],
    relatedLinks: [],
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
      { title: "CCC R3.0", description: "Owner pair, friend share, revoke, against the CCC test plan." },
      { title: "UWB", description: "802.15.4z HRP ranging. Distance bounding is the security property." },
      { title: "NFC", description: "Type 4 at the handle. Listed in the profile for the dead-phone case." },
      { title: "SE in the vehicle", description: "AEC-Q100 grade, CCC applet and OEM secrets." },
      { title: "Line", description: "Per-VIN inject, HSM at the station, quality gate." },
    ],
    body: `<h2>Radios</h2>
<p>Deferring NFC leaves the dead-phone case uncovered; CCC still lists that item. UWB without calibrated antennas is a comfort feature, not secure ranging.</p>
<h2>Wallet sharing</h2>
<p>Apple and Google each have their own provisioning. OEM cloud / TSM sits in the middle. Wallet entitlements that are not contracted are not claimed.</p>
<h2>Plant</h2>
<p>Keys are written per VIN at a line station. End-of-line test is a tap plus a UWB walk, not a firmware checksum alone.</p>`,
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
    ],
    relatedLinks: [],
  },
  wallet: {
    headline: "PassKit, Google Wallet, mDoc",
    tagline: "Pass types, VAS / Smart Tap, ISO 18013-5 verifiers.",
    seoTitle: "Apple Wallet PassKit, Google Wallet, ISO 18013-5 mDoc | NFCTEC",
    seoDescription:
      "PassKit issuance and VAS, Google Wallet Smart Tap 2, ISO 18013-5/7 mDL, verifier SDKs.",
    intro:
      "A pass in Wallet is not a card applet. Apple uses pass styles plus VAS on the reader. Google uses class/object plus Smart Tap. mDL is ISO 18013 plus a trust list. The contract names which of those are in scope.",
    capabilities: [
      { title: "PassKit", description: "Boarding, event, coupon, generic, ID. APNs for updates." },
      { title: "VAS / ECP 2.0", description: "Reader merchant IDs. Express Mode is a configuration on a capable head." },
      { title: "Google Wallet", description: "JWT-signed objects, Smart Tap 2 payload." },
      { title: "mDoc", description: "18013-5 local presentation; 18013-7 if the RFP includes remote." },
    ],
    body: `<h2>Payment, loyalty and identity</h2>
<p>ECP payment, VAS loyalty and mDL identity can share a phone and still require different readers and licences. Loading all three onto one head without those licences fails in the field.</p>
<h2>Verifiers</h2>
<p>Offline mDL needs a trust list and a revocation process. “Check online” fails in locations without coverage. The verifier SDK is a separate deliverable from issuance.</p>`,
    deliverables: [
      "Pass type list and update channel",
      "Reader IDs for VAS/Smart Tap",
      "Verifier trust-list process if mDL is in scope",
    ],
    workflow: [
      { title: "Wallet programme entitlements", description: "Then one pass type in sandbox." },
      { title: "Reader SKU", description: "Confirm VAS/Smart Tap on that firmware." },
    ],
    faqs: [
      { q: "One pass for door, payment and ID?", a: "Usually three credentials. Readers and licences differ." },
    ],
    relatedLinks: [],
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
      { title: "FIDO2 / CTAP2.1", description: "USB-C, NFC, Lightning where required. Resident keys, PIN." },
      { title: "Passkeys", description: "Device-bound when the customer does not accept iCloud/Google sync." },
      { title: "Chain signing", description: "secp256k1, ed25519, PSBT, EIP-712. Policy in the applet." },
      { title: "Backup", description: "SLIP-39 / Shamir on separate NFC cards." },
    ],
    body: `<h2>FIDO</h2>
<p>CTAP over USB or NFC. Enterprise profiles need attestation and MDM revoke. Consumer profiles need PIN and backup. Distinct policies use distinct AAGUIDs.</p>
<h2>Wallet</h2>
<p>HD derivation BIP-32/39/44. Sign on-card. NFC backup cards hold shards. An APDU that displays the seed is not implemented.</p>
<h2>Certifications</h2>
<p>FIDO L2, CC EAL on the SE, FIPS where the RFP names it. These are separate submissions.</p>`,
    deliverables: [
      "AAGUID / applet split (FIDO versus coin)",
      "Backup card procedure",
      "MDM revoke when enterprise is in scope",
    ],
    workflow: [
      { title: "Chains and FIDO profile", description: "Samples on the SE already in the certification plan." },
    ],
    faqs: [
      { q: "Can support export the seed?", a: "No. Seed material does not leave the SE." },
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
      { title: "Multi-AID EV3", description: "Library, meal, door, print — separate keys." },
      { title: "Meal offline", description: "Subsidy rules, MAC load, cafeteria terminal that continues when SIS is down." },
      { title: "Wallet ID", description: "Photo pass for inspectors. Dorm doors still need a Wallet-capable reader, otherwise PVC remains." },
      { title: "SIS", description: "Ellucian / Workday / the system already in production. Nightly file is the default; live REST is a separately scheduled item." },
    ],
    body: `<h2>Application split</h2>
<p>Access keys are not meal keys. Compromise of a vending terminal must not open laboratories. That is the reason for multiple applications.</p>
<h2>Wallet</h2>
<p>Student ID in Apple or Google is useful at a desk. Doors require VAS/Smart Tap readers, otherwise dorms stay on PVC. The RFP response states that split so procurement does not assume one tap everywhere.</p>
<h2>SIS</h2>
<p>Typical integration is a nightly file plus lost-card flags. A real-time REST feed is extra and is usually the late item.</p>`,
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
    ],
    relatedLinks: [],
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
    body: `<h2>Combination Selection</h2>
<p>PPSE 列出应用 AID 及优先级。终端按自身表取第一个允许的匹配。Mastercard BIN 将 Visa 排在前面会进入 Kernel 3。现场大量“刷不上”工单属于该顺序问题，并非天线故障。双标产品与 0.76 mm 金属（COM）各自独立成表。</p>
<h2>先加载，再个人化</h2>
<p>实验室顺序为 PC/SC，<code>80 50</code> INITIALIZE UPDATE，<code>84 82</code> EXTERNAL AUTHENTICATE，INSTALL for load，LOAD，INSTALL for install，SELECT 实例 AID。EXTERNAL AUTHENTICATE 返回 9000、下一条包装命令返回 6982 时，优先核对 MAC 输入与 ICV，而不是 CAP 文件名。通道说明：<a href="/zh/blog/scp02-vs-scp03-javacard-secure-channel">SCP02 vs SCP03</a>。主机侧练习：<a href="/zh/tools/javacard-tool">JavaCard 工具</a>。</p>
<pre><code>80 50 00 00 08  [8 字节主机挑战]
84 82 03 00 10  [host cryptogram][C-MAC]</code></pre>
<h2>制卡</h2>
<p>密钥保留在 HSM。按 PAN 记录执行 STORE DATA / PUT DATA，再激光或印刷。样卡检查 CDA 与非接时序。生产不使用硅片手册中印刷的 GlobalPlatform 传输密钥。</p>
<h2>主机与钱包</h2>
<p>ISO 8583 是字段映射。PIN block 与发行密钥同一分区。Apple Pay、Google Pay、Samsung Pay 属于 MDES 或 VTS，相当于第二次发卡，有独立测试卡。终端内核在收单侧。卡片认证不能替代收单对 POS 的 EMVCo L1/L2 工作。</p>`,
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
      { title: "CALYPSO Rev 3.1", description: "CD21/CD97、SAM 密钥、定期票与次票文件。密钥版本绑定验票机软件镜像。" },
      { title: "DESFire EV3", description: "存量卡为 MIFARE Classic 或私有文件时采用 AES 应用。扇区图不复制为 DESFire 文件。" },
      { title: "验票时间", description: "射频、SELECT、认证、更新、乘客界面。在生产镜像与实际黑名单体量下测量。" },
      { title: "cEMV", description: "闸机受理银行卡与钱包需要交通内核与延迟授权。引入期间闭环票种继续服务。" },
      { title: "账户票（ABT）", description: "轻触携带令牌；产品与封顶在后台。" },
    ],
    body: `<h2>票种体系</h2>
<p>车队已持有 CALYPSO SAM 时，默认继续 Rev 3.1，直至双栈决策签字。DESFire EV3 用于淘汰 Classic 或私有布局。一台验票机两套栈占用 flash，并需要第二套回归包，该项列入预算。用 Classic 转储编码 DESFire 乘客卡不是有效迁移。</p>
<h2>交易时间</h2>
<p>300 ms 指标包含 SAM 或 AES 认证，不只是 ISO 14443。实验室 USB 读卡器 180 ms 记录不能作为证据。测量在目标验票机、生产密钥、夜间黑名单体量上进行。冬季热名单堆满时，该数值通常会变化。</p>
<h2>开放支付与账户</h2>
<p>cEMV 与 ABT 相对闭环票种是独立产品。割接期三条路径常并行，失败原因码分开记录。双票种运行需要起止日期。无限期“两种都收”会使 Classic 长期留存。</p>`,
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
    ],
    relatedLinks: [],
  },
  access: {
    headline: "DESFire EV3 / Seos 凭证与 Wallet 钥匙",
    tagline: "AES 应用、OSDP v2.2 读头、Apple VAS / Google Smart Tap、测量到门锁的吊销时延。",
    seoTitle: "门禁：DESFire EV3、HID Seos、Apple Wallet | NFCTEC",
    seoDescription: "DESFire EV3 或 Seos 凭证、OSDP v2.2、Apple/Google 工牌，吊销时间测至门锁。",
    intro:
      "仅输出 UID 的读头无法完成 DESFire 认证，也无法出示 Wallet 卡券。仍在使用的 125 kHz 或 MIFARE Classic 门列入清单并标注日期。未标注日期的“二期”不构成迁移计划。",
    capabilities: [
      { title: "DESFire EV3", description: "AID、文件、通信模式、密钥号。仅在读头型号支持时启用 LRP。" },
      { title: "HID Seos", description: "HID 存量要求时采用。Seos 与 DESFire 不合并为同一张文件图。" },
      { title: "OSDP v2.2", description: "安全通道与防拆。本期无法改线的门保留 Wiegand。" },
      { title: "Apple Wallet", description: "卡券类型、VAS、快捷模式 / ECP 2.0。读头固件与 Apple 配置；PVC 图案不足以为证。" },
      { title: "Google Smart Tap", description: "Class/object 与 JWT。读头无法 Smart Tap 时才使用 HCE。" },
    ],
    body: `<h2>MIFARE Classic</h2>
<p>扇区与 Crypto-1 密钥不会变成 DESFire 文件。先编写应用规格。用 Classic 转储编码得到的卡，控制器仍按 UID 处理。外包可在指定门、指定日期前继续使用 Classic。新员工只发放新凭证。</p>
<h2>读头</h2>
<p>Wiegand 仅输出 UID 时，控制器未观察到 AES 认证。新布线采用 OSDP v2.2。不更换控制器的 125 kHz 记入带日期的例外表，而不是未定期的后续项。</p>
<h2>Wallet</h2>
<p>快捷模式由读头固件与卡券配置共同决定。测试使用拟采购型号。云端吊销可在数秒完成；门锁在控制器取得黑名单前仍可开启。两段时延均记录。</p>`,
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
    ],
    relatedLinks: [],
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
    body: `<h2>URL 格式</h2>
<pre><code>https://verify.example.com/a/{picc_data}?c={cmac}</code></pre>
<p>服务器按 UID 加载密钥，校验 CMAC，再校验计数器。这是克隆判定。说明：<a href="/zh/blog/ntag424-dna-sun-url-authentication-example">SUN 验证</a>。</p>
<h2>实验室</h2>
<p>EV2 认证、配置 SDM、使用该市场在售手机轻触、POST 查询串、再重放（必须失败）。工具：<a href="/zh/tools/ntag424-tool">NTAG424 DNA 工具</a>。文件权限错误时，编码机界面仍可能显示已配置，发出的却是静态链接。</p>
<h2>产线</h2>
<p>工厂注入密钥与镜像。抽检使用与生产相同的验证 API。编码机显示 OK，但缺少一次通过轻触与一次失败重放，不构成抽检。地理围栏与频次检查叠加在 CMAC 之上，不能替代 CMAC。保修内容绑定该次轻触的通过状态。</p>`,
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
    ],
    relatedLinks: [
      { title: "NTAG424 DNA 工具", href: "/zh/tools/ntag424-tool" },
      { title: "SUN 验证", href: "/zh/blog/ntag424-dna-sun-url-authentication-example" },
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
      { title: "LDS1 / LDS2 应用", description: "BAC、PACE-GM/IM、EACv2、主动认证 / 芯片认证，按 ICAO 剖面执行。" },
      { title: "eID / 居留", description: "卡上比对；国家方案要求时做 eIDAS 签名。" },
      { title: "CSCA / DS", description: "国家签名 CA、文件签发者、主列表与 CRL 分发。" },
      { title: "查验", description: "MRTD 阅读机、人脸对芯片。与个人化不是同一技术栈。" },
      { title: "mDL", description: "ISO 18013-5 设备端呈现；RFP 含远程呈现时采用 18013-7。" },
    ],
    body: `<h2>PACE 与 BAC</h2>
<p>新本应采用 PACE。在用库存大量仍为 BAC。重叠期查验系统需同时支持。剖面已列 EAC 与芯片认证时，SAM 与阅读机许可随之变化，该项不再是可选项。</p>
<h2>PKI</h2>
<p>CSCA 签发 Document Signer，DS 签发 SOD。主列表未发布会导致境外边检拒绝有效本。ML 与 CRL 分发按运行手册编写。</p>
<h2>mDL</h2>
<p>ISO 18013-5 是 NFC（或 QR 交互）上的选择性披露，不是将 PDF 放入钱包。验证方信任列表与吊销最常被遗漏。证芯页防伪（MLI、UV）属于印刷合同，本工作与之对接。</p>`,
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
    ],
    relatedLinks: [],
  },
  health: {
    headline: "患者卡、电子处方、医护 SSO",
    tagline: "ISO 7816 安全元件、HL7 FHIR 标识、轻触+PIN 进入 EHR、可选冷链 NTAG。",
    seoTitle: "医疗智能卡、电子处方、EHR 工牌登录 | NFCTEC",
    seoDescription: "患者 ISO 7816 卡、SE 内签名的电子处方、医护轻触+PIN 进入 EHR、单件核对用温度 NTAG。",
    intro:
      "医院已有病历系统。卡用作标识、签名设备或门禁，或在一张 DESFire 上以不同 AID 同时承担上述角色。临床记录不写入 EEPROM。",
    capabilities: [
      { title: "患者卡", description: "加密指针、急救区；部委要求时做卡上比对。" },
      { title: "电子处方", description: "SE 内合格签名、DSC 审计；国家交换使用 FHIR 时对接 FHIR。" },
      { title: "医护工牌", description: "轻触+PIN 进入 Epic/Cerner 一类 SSO（Imprivata 等）。" },
      { title: "冷链", description: "NTAG 与温度记录，用于单件核对。不能替代药学已认证的整票校准记录仪。" },
    ],
    body: `<h2>卡内数据</h2>
<p>通常为标识与密钥。FHIR（以及 HIE 已运行的 PIX/PDQ）留在后台。临床记录写入 EEPROM 无法通过隐私审查。</p>
<h2>医护登录</h2>
<p>轻触+PIN 是凭证加 SSO 厂商。本工作覆盖工牌与读头。会话超时与双人复核仍为 EHR 策略。</p>
<h2>冷链</h2>
<p>NTAG DNA（或带传感器的 NTAG 22x）用于单件核对。整票运输仍使用药房校准记录仪。两套系统分开编写规格。</p>`,
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
    ],
    relatedLinks: [],
  },
  iot: {
    headline: "NFC 配网与出厂身份",
    tagline: "NDEF 或 SUN 下发 Wi-Fi / Matter，产线注入 X.509，可选 SUN 回连。",
    seoTitle: "NFC 设备上线：NTAG 424 DNA、Matter、出厂 X.509 | NFCTEC",
    seoDescription: "NTAG 424 DNA 或 Type 4 一触配网、Matter 配网载荷、产线注入 X.509、SUN 正品回连。",
    intro:
      "外箱二维码可在仓库被拍摄。设备上的 NFC 可携带签名载荷，照片无法复现。Matter 仍需要 DAC；NFC 只携带配网载荷。",
    capabilities: [
      { title: "NDEF 凭证", description: "Wi-Fi 或 BLE 交接。需要抗克隆时签名。" },
      { title: "Matter", description: "经 NFC 传递配网载荷。DAC/PAI 仍在设备身份链上。" },
      { title: "出厂证书", description: "线边 HSM 按台签发 X.509。注入芯片，不印在 PDF。" },
      { title: "SUN 回连", description: "CMAC 通过后设备才允许回家。机制与品牌防伪相同。" },
    ],
    body: `<h2>一触配网</h2>
<p>手机读取 NDEF，写入 Wi-Fi 或启动 Matter 配网。廉价 Type 2 静态链接等价于二维码。需要 SUN 或 SDM 时使用 NTAG 424 DNA。工具：<a href="/zh/tools/ntag424-tool">NTAG424 工具</a>。</p>
<h2>工厂</h2>
<p>身份是线边工位：HSM、序列号、注入、抽检。推迟到云端开通会形成无人认领设备窗口，该窗口写入威胁模型。</p>
<h2>固件</h2>
<p>签名清单、禁止回滚；MCU 支持时采用 A/B。NFC 不升级固件，可打开发起升级的会话。</p>`,
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
    ],
    relatedLinks: [{ title: "NTAG424 DNA 工具", href: "/zh/tools/ntag424-tool" }],
  },
  retail: {
    headline: "会员、礼品卡与闭环 POS",
    tagline: "DESFire 会员与钱包、Apple VAS / Google Smart Tap、Verifone / Ingenico / PAX。",
    seoTitle: "零售会员与礼品卡：DESFire、钱包、POS | NFCTEC",
    seoDescription: "DESFire 会员与储值、Apple VAS 与 Google Smart Tap、离线钱包、POS 内核对接。",
    intro:
      "主机侧积分与卡上钱包是不同产品。离线礼品卡充值需要 MAC。钱包卡券要求读头实现 VAS 或 Smart Tap，条码枪不足。",
    capabilities: [
      { title: "DESFire 会员", description: "等级/积分文件，或仅存放 POS 查询用的标识。" },
      { title: "钱包 / 礼品", description: "离线余额、MAC 充值、主机不可用时的拒绝规则。" },
      { title: "手机钱包", description: "Apple VAS、Google Smart Tap，经 APNs / Google API 更新。" },
      { title: "POS", description: "Verifone、Ingenico 或 PAX——该连锁已认证的内核。" },
    ],
    body: `<h2>余额位置</h2>
<p>积分在主机：卡只是标识。余额在卡：需要密钥与充值 MAC。未声明以哪一侧为准时，周末容易出现双花工单。</p>
<h2>钱包</h2>
<p>Apple 会员为 VAS 加卡券更新。Google 为 Smart Tap 2。仅授权 EMV 支付的读头，在未开通对应功能前拉不下会员卡。测试使用实际读头型号。</p>
<h2>POS</h2>
<p>对接现网内核与商户协议（NEXO 等）。未改动的终端不在本范围内重做 EMV L2 认证。</p>`,
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
    ],
    relatedLinks: [],
  },
  auto: {
    headline: "CCC 数字钥匙 — NFC、BLE、UWB",
    tagline: "R3.0 车主配对，手机没电时 NFC 开锁，总装按 VIN 注入。",
    seoTitle: "CCC Digital Key 3.0：NFC 兜底、UWB、钱包分享 | NFCTEC",
    seoDescription: "CCC Digital Key R3.0：UWB 测距、没电 NFC 开锁、BLE 唤醒、车载 SE、Apple/Google 分享、按 VIN 注入。",
    intro:
      "走近使用 UWB。手机没电时在门把手使用 NFC。BLE 负责唤醒。三个射频共用一套密钥层次。",
    capabilities: [
      { title: "CCC R3.0", description: "车主配对、分享、吊销，对照 CCC 测试项。" },
      { title: "UWB", description: "802.15.4z HRP 测距。安全属性是距离限定。" },
      { title: "NFC", description: "门把手 Type 4。剖面中用于没电场景。" },
      { title: "车载 SE", description: "AEC-Q100 等级，CCC 应用与主机厂密钥。" },
      { title: "总装", description: "按 VIN 注入、工位 HSM、质量门。" },
    ],
    body: `<h2>射频</h2>
<p>推迟 NFC 会使没电场景缺项，CCC 仍列出该条目。UWB 天线未经校准只是舒适功能，不是安全测距。</p>
<h2>钱包分享</h2>
<p>Apple 与 Google 各有下发流程。主机厂云 / TSM 位于中间。未签约的 Wallet 资质不予声称。</p>
<h2>工厂</h2>
<p>密钥按 VIN 在工位写入。下线测试为一次轻触加一次 UWB 走近，不只核对固件校验和。</p>`,
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
    ],
    relatedLinks: [],
  },
  wallet: {
    headline: "PassKit、Google Wallet、mDoc",
    tagline: "卡券类型、VAS / Smart Tap、ISO 18013-5 验证端。",
    seoTitle: "Apple Wallet PassKit、Google Wallet、ISO 18013-5 mDoc | NFCTEC",
    seoDescription: "PassKit 发行与 VAS、Google Wallet Smart Tap 2、ISO 18013-5/7 mDL、验证端 SDK。",
    intro:
      "钱包中的卡券不是卡上 applet。Apple 使用卡券样式加读头 VAS。Google 使用 class/object 加 Smart Tap。mDL 是 ISO 18013 加信任列表。合同写明范围内的项目。",
    capabilities: [
      { title: "PassKit", description: "登机、活动、优惠券、通用、证件。APNs 更新。" },
      { title: "VAS / ECP 2.0", description: "读头 merchant ID。快捷模式是具备能力的读头上的配置。" },
      { title: "Google Wallet", description: "JWT 签名对象，Smart Tap 2 载荷。" },
      { title: "mDoc", description: "本地呈现用 18013-5；RFP 含远程时用 18013-7。" },
    ],
    body: `<h2>支付、会员与身份</h2>
<p>ECP 支付、VAS 会员、mDL 身份可以出现在同一部手机上，读头与许可证仍可能不同。在缺少许可证的情况下将三者堆到同一读头，现场会失败。</p>
<h2>验证端</h2>
<p>离线 mDL 需要信任列表与吊销流程。无覆盖地点无法依赖“联网再查”。验证 SDK 与发行是两份交付。</p>`,
    deliverables: [
      "卡券类型与更新通道",
      "VAS/Smart Tap 的读头 ID",
      "范围内含 mDL 时的验证端信任列表流程",
    ],
    workflow: [
      { title: "Wallet 项目资质", description: "随后在沙盒完成一种卡券。" },
      { title: "读头型号", description: "确认该固件具备 VAS/Smart Tap。" },
    ],
    faqs: [
      { q: "一张卡券能否同时开门、支付、作身份？", a: "通常是三种凭证。读头与许可证均不同。" },
    ],
    relatedLinks: [],
  },
  security: {
    headline: "FIDO2 认证器与卡内签名",
    tagline: "CTAP2.1 / WebAuthn，SE 内 secp256k1 或 ed25519，种子材料不导出。",
    seoTitle: "FIDO2 安全密钥与硬件钱包 | NFCTEC",
    seoDescription: "FIDO2/WebAuthn 认证器、设备绑定 Passkey、卡内 secp256k1/ed25519、BIP-32/39、SLIP-39 备份卡。",
    intro:
      "FIDO 与加密货币钱包可共用安全元件，应用分开。种子材料不离开 SE。密钥 CSV 导出不在范围内。",
    capabilities: [
      { title: "FIDO2 / CTAP2.1", description: "USB-C、NFC，需要时 Lightning。常驻凭证、PIN。" },
      { title: "Passkey", description: "客户不接受 iCloud/Google 同步时，采用设备绑定。" },
      { title: "链上签名", description: "secp256k1、ed25519、PSBT、EIP-712。策略写在应用内。" },
      { title: "备份", description: "SLIP-39 / Shamir，存放于独立 NFC 卡。" },
    ],
    body: `<h2>FIDO</h2>
<p>CTAP 经 USB 或 NFC。企业剖面需要证明与 MDM 吊销。个人剖面需要 PIN 与备份。不同策略使用不同 AAGUID。</p>
<h2>钱包</h2>
<p>HD 派生 BIP-32/39/44。卡内签名。NFC 备份卡存放分片。不实现显示种子的 APDU。</p>
<h2>认证</h2>
<p>FIDO L2、SE 的 CC EAL、RFP 点名时的 FIPS。上述为独立送测。</p>`,
    deliverables: [
      "AAGUID / 应用切分（FIDO 与币）",
      "备份卡流程",
      "企业范围内的 MDM 吊销",
    ],
    workflow: [
      { title: "链与 FIDO 剖面", description: "在认证计划已含的 SE 上出样。" },
    ],
    faqs: [
      { q: "客服能否导出种子？", a: "不能。种子材料不离开 SE。" },
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
      { title: "多 AID EV3", description: "图书、餐、门、打印，密钥分开。" },
      { title: "食堂离线", description: "补贴规则、MAC 充值，SIS 不可用时食堂终端仍可扣款。" },
      { title: "钱包证件", description: "供查验证件查看照片。宿舍门需要支持 Wallet 的读头，否则继续使用 PVC。" },
      { title: "SIS", description: "Ellucian / Workday / 现网系统。默认为夜间文件；实时 REST 单独排期。" },
    ],
    body: `<h2>应用划分</h2>
<p>门禁密钥不是餐密钥。售货机被攻破不得打开实验室。这是多应用的原因。</p>
<h2>钱包</h2>
<p>Apple 或 Google 中的学生证便于前台核验。门禁需要 VAS/Smart Tap 读头，否则宿舍仍刷 PVC。标书回复写明该划分，避免采购按处处一触假设。</p>
<h2>SIS</h2>
<p>典型对接为夜间文件加挂失标记。实时 REST 为加项，且通常排期靠后。</p>`,
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
    ],
    relatedLinks: [],
  },
};
