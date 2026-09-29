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
      "Issuing a BIN is mostly four jobs that have to stay in sync: AID table vs the brand letter, applet load over GlobalPlatform, PCI personalization, and the 8583 map (plus MDES or VTS if that BIN goes into wallets). When those files are missing, L3 usually burns on Combination Selection or on 6982 during load — not on the antenna.",
    capabilities: [
      { title: "AID / kernel table", description: "M/Chip → Kernel 2, VSDC → Kernel 3, QUICS → Kernel 6. Exact vs partial SELECT comes from the letter. Co-badge and 0.76 mm metal each get their own row." },
      { title: "Contact + contactless applet", description: "ISO 7816 and EMV Contactless on the same chip. CDA/DDA and IAC/TAC copied from this BIN’s letter, not last year’s profile." },
      { title: "GP load", description: "SCP02 or SCP03, whichever INITIALIZE UPDATE returns. P1 the silicon actually accepts. KCV in the script. The transport key in the JCOP PDF stays off the perso line." },
      { title: "PCI bureau", description: "HSM ceremony, encrypted PAN/track, STORE DATA as specified. Keep CDA and contactless timing (and SW1/SW2) from the sample pack." },
      { title: "MDES / VTS", description: "Token requestor, DAR, yellow path — booked with the BIN, not after the first truck of plastic leaves." },
      { title: "ISO 8583", description: "87/93 field list. PIN translate on the same HSM partition as the issuer keys. 3DS only if this BIN does e-commerce." },
    ],
    body: `<h2>Why the terminal picks the wrong kernel</h2>
<p>PPSE lists AIDs with a priority byte. The POS walks its own table and takes the first match it is allowed to use. Put Visa above Mastercard on a Mastercard BIN and you land in Kernel 3. A lot of “tap does nothing” tickets are that ordering mistake. Co-badge and metal (COM) need a separate table; copying the credit BIN’s PPSE onto them is how you spend a week in L3.</p>
<p>We do the card and the host map. Kernel 2/3/6 live in the terminal. If nobody changed the POS, we are not recertifying it.</p>
<h2>Load, then personalize</h2>
<p>On the bench: PC/SC, <code>80 50</code> INITIALIZE UPDATE, <code>84 82</code> EXTERNAL AUTHENTICATE, INSTALL for load, LOAD, INSTALL for install, SELECT the instance. If EXTERNAL AUTHENTICATE is 9000 and the next wrapped command is 6982, look at MAC input and ICV before you rename the CAP. Notes: <a href="/en/blog/scp02-vs-scp03-javacard-secure-channel">SCP02 vs SCP03</a>. Practice box: <a href="/en/tools/javacard-tool">JavaCard Tool</a>.</p>
<pre><code>80 50 00 00 08  [8-byte host challenge]
84 82 03 00 10  [host cryptogram][C-MAC]</code></pre>
<p>In the bureau the keys stay in the HSM. Each PAN drives STORE DATA / PUT DATA, then laser or print. Sample cards get CDA and a contactless timing log. Nobody uses the GlobalPlatform transport key printed in the silicon manual on a live perso line.</p>
<h2>Once cards are in the field</h2>
<p>L3 is Combination Selection plus cryptograms on the brand tool, against the letter you actually signed. Live traffic is an 8583 field map. Apple Pay, Google Pay and Samsung Pay are MDES or VTS — a second issuance, own test cards, scheduled with the BIN.</p>`,
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
      "Gates care about three things: how long a tap takes on the software they actually run, what happens when the station is offline, and whether last month’s cards still work after a flash. Unless you are building a new network from scratch, new media has to speak the SAM and firmware already in the depots.",
    capabilities: [
      { title: "CALYPSO Rev 3.1", description: "CD21/CD97, SAM keys, season pass vs stored rides. Key version tied to the validator image the depot will flash." },
      { title: "DESFire EV3", description: "AES apps when Classic or a private layout is coming out. You do not paste Classic sectors into DESFire files." },
      { title: "Validator timing", description: "RF, SELECT, authenticate, update, passenger UI — timed on the production image with a realistic hotlist, not a USB reader on a desk." },
      { title: "cEMV", description: "Bank cards and wallets need a transit kernel and delayed auth. Closed-loop tickets keep running while that is being introduced." },
      { title: "Account-based", description: "The tap is a token. Fares and caps live in the back office. Offline behaviour has to be written down." },
    ],
    body: `<h2>What the fleet already speaks</h2>
<p>If the depots already have CALYPSO SAMs, we stay on Rev 3.1 until someone signs a dual-stack decision. DESFire EV3 is the usual way out of Classic. Running both stacks on one validator costs flash and a second regression pack; if that line is not in the budget, it will not be in the fleet. Dumping Classic onto DESFire files is not a migration — the gate still thinks it saw a UID.</p>
<p>Encoding covers the file map, key version, and product (pass, stored value, staff). After a software cut, cards from last month still have to validate. The hotlist format belongs in that same spec, not as a note taped to the gate.</p>
<h2>Milliseconds at the paddle</h2>
<p>A 300 ms target includes SAM or AES authenticate, not just ISO 14443 poll. A 180 ms USB-lab trace does not count. We time the real validator, production keys, overnight hotlist size. Winter, full list, that is usually when the number moves.</p>
<p>When the station is offline the gate still decides against the last list it has. Failed taps need distinct reason codes so inspection and the control room are not arguing about one generic “error”.</p>
<h2>Bank cards and accounts</h2>
<p>cEMV and account-based ticketing are separate products. During cutover you often run all three. Give dual-media a start date and a stop date — “accept both for now” is how Classic never leaves.</p>
<p>Bank cards on day one only if that image already has a transit kernel and the host can delay-authorise. QR is fine for failed taps and inspectors. Peak hour is still NFC.</p>`,
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
      "If the reader only spits out a UID, it never authenticated DESFire and it never saw a Wallet pass. Leftover 125 kHz and Classic doors go on a list with real dates. “Phase 2” with no date is not a plan.",
    capabilities: [
      { title: "DESFire EV3", description: "AID, files, comms mode, key numbers. LRP only on heads that actually implement it." },
      { title: "HID Seos", description: "When the installed HID estate requires it. Do not mash Seos and DESFire into one file map." },
      { title: "OSDP readers", description: "v2.2 Secure Channel. Wiegand UID-out means the panel never saw AES. Exceptions get a date or they do not count." },
      { title: "Phone as a badge", description: "Optional. VAS / Smart Tap and Express Mode only on firmware that supports them. Pass issue and void are on the Wallet page." },
      { title: "Revoke at the lock", description: "The API can finish in seconds. The strike still opens until the panel has the deny list. We measure both." },
    ],
    body: `<h2>Classic does not become DESFire by encoding</h2>
<p>Sectors and Crypto-1 keys are not DESFire files. Write the application first — AID, file, key number, comms mode — then encode. A Classic dump on EV3 still looks like a UID to the panel. Contractors can keep Classic on named doors until a named date; new staff get the new card only.</p>
<p>If the site is HID Seos, we keep Seos. That is a second file map and a second encoding job, not a “universal” dump. Printing a logo on PVC does not make Apple VAS work. Apple Pay is a different contract; pass issue is on the <a href="/en/solutions/wallet">Wallet</a> page.</p>
<h2>What the panel actually sees</h2>
<p>New runs go OSDP v2.2. 125 kHz on a controller nobody will replace is an exception with a date, not an undated follow-on. Tests use production keys on the SKU you will buy, not a demo head from a suitcase.</p>
<p>Phone at the door: the head has to finish VAS or Smart Tap and return the payload. Cloud revoke can be fast; the lock still works until the panel polls the list. Same gap as voiding a Wallet pass while the barcode still scans.</p>`,
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
      "Anyone can photocopy a static NFC URL. SUN adds the UID, a read counter and a CMAC. If the converter only writes NDEF and never turns on SDM, you shipped a static URL with extra ceremony.",
    capabilities: [
      { title: "SDM / SUN template", description: "Mirrors, PICC data, CMAC offset. Check on iOS and Android system NFC, not only an ACR122." },
      { title: "One AES key per UID", description: "A single key for the SKU means one torn-open tag forges the rest." },
      { title: "Verify API", description: "Recompute CMAC, counter must go up, same URL replayed is a fail." },
      { title: "Label construction", description: "Wet inlay or break-on-open, agreed with the converter before volume. Catalogue stickers only if they get the same SDM config." },
    ],
    body: `<h2>What the phone actually opens</h2>
<p>QR has no counter and no CMAC. Putting a geo-fence on a static link does not prove the tag is real. The useful URL looks like this:</p>
<pre><code>https://verify.example.com/a/{picc_data}?c={cmac}</code></pre>
<p>The converter has to write NDEF <em>and</em> set SDM access rights. One AES key per UID. Wet inlay vs break-on-open is a packaging conversation before you order 200k, not after. We check mirrors and CMAC offset on phones sold in that market. Lab notes: <a href="/en/tools/ntag424-tool">NTAG424 DNA Tool</a>, <a href="/en/blog/ntag424-dna-sun-url-authentication-example">SUN authentication</a>.</p>
<h2>The server’s job</h2>
<p>Load the key for that UID, recompute CMAC, confirm the counter increased. Replay of the same query string has to fail. Encoder “OK” without a passing phone tap and a failing replay is not a sample. Sampling hits the live API, not a second key that only exists in the lab.</p>
<p>You do not need a consumer app — system NFC opens the browser. We still tap both major phone brands. Warranty or landing copy should follow that tap’s pass/fail, not a pretty 200 from the CDN.</p>`,
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
      "Making the book (PKI, applet, datapage) and inspecting it at the border are two systems. If the SOW never names who publishes the CSCA master list and CRL, valid books fail abroad and everyone blames the chip.",
    capabilities: [
      { title: "ePassport applet", description: "LDS1/LDS2: BAC, PACE-GM/IM, EACv2, Active Authentication / Chip Authentication — whatever the ICAO profile actually lists." },
      { title: "eID / residence", description: "Match-on-card. eIDAS signatures only if the national scheme wants them." },
      { title: "CSCA / Document Signer", description: "Master list and CRL with owners and a calendar. Miss a publish and foreign borders reject good books." },
      { title: "Inspection", description: "MRTD readers, face-to-chip. Not the perso stack. Overlap years: new books PACE, plenty of BAC still in pockets." },
      { title: "mDL", description: "Only if the RFP says ISO 18013-5 (and 18013-7 for remote). Not a PDF sitting in Apple Wallet." },
    ],
    body: `<h2>Books vs phones</h2>
<p>PassKit and Google Wallet are a <a href="/en/solutions/wallet">different page</a>. 18013-5 is ISO over NFC (or QR engagement) with selective disclosure. MLI/UV on the datapage is a printer contract; we meet them at the interface.</p>
<p>New books should be PACE. A lot of what is already issued is still BAC, so inspection has to speak both for years. If the profile lists EAC and Chip Authentication, the SAM and the reader licence change — that is not a nice-to-have after FAT.</p>
<p>CSCA signs the Document Signer; DS signs the SOD. Master list and CRL need names and times, not a slide titled “PKI ops”.</p>
<h2>Would this fail at a foreign border?</h2>
<p>Then it should fail first on the inspection readers named in the RFP. mDL verifiers still need a trust list and a revoke story. “Offline” just means the list on the device is fresh enough. That is the bit people skip.</p>`,
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
      "The hospital already has an EHR. The card is usually an identifier, a signing token, a door badge — or several of those on one DESFire with separate AIDs. Nobody should be stuffing clinical notes into EEPROM.",
    capabilities: [
      { title: "Patient card", description: "Encrypted pointer, emergency zone, match-on-card if the ministry insists. Notes stay in the EHR." },
      { title: "e-Prescription", description: "Qualified signature in the SE, audit to DSC. FHIR if the national switch already uses it." },
      { title: "Clinician tap-and-PIN", description: "Into Epic/Cerner-class SSO (Imprivata and friends). We do badge and reader; session timeouts stay EHR policy." },
      { title: "Unit-level cold chain", description: "Optional NTAG plus a logger for the vial. Does not replace pharmacy’s calibrated shipment logger." },
    ],
    body: `<h2>What goes on the chip</h2>
<p>Identifiers and keys. FHIR (and PIX/PDQ if the HIE already runs it) stays in the back office. HIPAA/GDPR paperwork is the hospital’s; we design so the DPO can actually sign.</p>
<p>e-Prescription keys and the qualified-signature profile live in the SE. We map files to the EHR identifier the site already uses.</p>
<h2>Wards, not demos</h2>
<p>Clinician login is tap-and-PIN plus whatever SSO they already bought. Lost card, PIN lockout, emergency-zone read — try that on a pilot ward before you print 4,000 badges. Doors, if they are in the same PO, follow the access work (OSDP, not UID-out).</p>
<p>NTAG DNA (or NTAG 22x with a sensor) is useful for checking a single pack. The truck still carries the pharmacy logger. Two systems, two specs, or you will argue about whose number was “the” temperature.</p>`,
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
      "A QR on the carton can be photographed in the warehouse. NFC on the device can carry something a photo does not copy. Matter still needs a DAC; the tag only carries the onboarding payload.",
    capabilities: [
      { title: "NDEF or SUN on the tag", description: "Wi-Fi or BLE handoff. Use NTAG 424 DNA when you care that the tap cannot be cloned." },
      { title: "Matter commissioning", description: "Payload over NFC. DAC/PAI stay on the device. SUN does not replace the DAC." },
      { title: "Factory certificate", description: "Per-serial X.509 from a line HSM, injected — not a PDF in a zip of “certs”." },
      { title: "Phone-home after CMAC", description: "Same idea as brand protection: the device only calls home if the tap checks out." },
    ],
    body: `<h2>Carton QR vs the chip on the product</h2>
<p>A cheap Type 2 static URL is QR with extra plastic. NFC also does not flash firmware; at best it starts the session that does.</p>
<p>Identity belongs on a line station: HSM, serial, inject, sample, reject bin. If you wait until the device hits the cloud, you have a pile of unclaimed boxes — that window belongs in the threat model, not in a footnote. File map: which radio’s secret sits on which file. When SUN is in play we use the <a href="/en/tools/ntag424-tool">NTAG424 Tool</a>.</p>
<h2>First tap in the real market</h2>
<p>Phones sold where you sell the SKU should read NDEF, write Wi-Fi or start Matter. If the tap is signed, the server checks CMAC before the device is allowed to phone home. Firmware signing, rollback, A/B slots — that is the MCU team, not the tag encode job.</p>`,
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
      "Points on the host and a purse on the card are different products. Offline gift needs a MAC on top-up. A barcode gun will not pull an Apple or Google loyalty pass — that takes VAS or Smart Tap on the head.",
    capabilities: [
      { title: "Membership on DESFire", description: "Tier/points files, or just an ID the POS looks up. Pick where the truth lives." },
      { title: "Gift / stored value", description: "Offline balance, MAC on load, what to do when the host is down." },
      { title: "Wallet pass", description: "Apple VAS, Google Smart Tap, updates over APNs / Google API. Separate from the plastic." },
      { title: "POS kernel", description: "Verifone, Ingenico or PAX — whatever that banner already certified. Payment-only firmware will not see a loyalty pass." },
    ],
    body: `<h2>Where the points actually live</h2>
<p>Host-held points: the card is an identifier. Card-held purse: you need keys and a load MAC. If nobody writes which one is authoritative, you get weekend double-spend tickets. We are not recertifying EMV L2 on terminals we did not touch. Payment tokens are MDES/VTS (banking), not this pass.</p>
<p>Wallet membership follows the <a href="/en/solutions/wallet">Wallet</a> page, then the exact POS head in the store — not a lab reader.</p>
<h2>At the till</h2>
<p>Talk to the kernel and merchant protocol already in production (NEXO and the like). A head licensed only for EMV payment will not pull loyalty until that licence and firmware are on. Gift replay and host-down decline are rules, not “ask the cashier”. Daily settlement vs purse logs should match or you will hate month-end.</p>`,
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
      "Walk-up is UWB. Empty phone at the handle is NFC. BLE wakes the stack. Those three radios have to share one key story, not three silos.",
    capabilities: [
      { title: "CCC R3.0 pairing", description: "Owner pair, friend share, revoke — against the CCC list you froze, not a marketing deck." },
      { title: "UWB ranging", description: "802.15.4z HRP. Distance bounding is the point. Uncalibrated antennas are a comfort feature." },
      { title: "NFC at the handle", description: "Type 4 when the battery is dead. Drop it and CCC still asks for it." },
      { title: "SE on the line", description: "AEC-Q100 grade, CCC applet, per-VIN inject next to an HSM. End of line is a tap plus a walk, not a checksum." },
    ],
    body: `<h2>Radios and who owns the listing</h2>
<p>We only mention Apple/Google key sharing if those programmes are actually contracted. Aftermarket kits that skip CCC items are a different job. A transit pass in Wallet is not a car key.</p>
<p>OEM cloud / TSM sits between the car and Apple or Google. Keys are written per VIN at a station — leaving a common test key in the vehicle is how you get a very expensive recall conversation.</p>
<h2>Bench, then the line</h2>
<p>First: handle NFC with the phone off. Then a UWB walk with antennas that were actually calibrated. End of line repeats both, plus share/revoke against the CCC items you signed. We implement against that list and the radios on the car. The OEM or Tier-1 owns the CCC name on the certificate.</p>`,
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
      "We put passes in Apple Wallet and Google Wallet, change fields, void them, and check them at a gate or counter — barcode or NFC. Apple and Google are two accounts, two certs, two reader setups. Copy-pasting one JSON does not get you both.",
    capabilities: [
      { title: "Apple — .pkpass", description: "Pass Type ID, signing cert, pass.json and images. After add, the phone registers with your web service; APNs tells it to pull. No register means the pass goes stale." },
      { title: "Google — class / object", description: "Issuer account, JWT save link, REST patches on the object. Smart Tap needs a collector ID on the pass and on the terminal." },
      { title: "Scan at the gate", description: "Camera or laser on the barcode. Lookup Apple serial or Google object ID, then void/expiry. How many times the same code works is a rule you write." },
      { title: "NFC (VAS / Smart Tap)", description: "Only if the head speaks it. UID-out Wiegand is not verifying a Wallet pass. Express Mode is firmware plus pass settings." },
      { title: "Void vs the gate list", description: "Pushing void can take a while to show on the phone. The gate should refuse that serial in your list immediately, or a screenshot still works." },
    ],
    body: `<h2>Passes, not Pay, not DESFire</h2>
<p>This is membership, event, boarding, coupon, generic, store card — whatever Apple or Google allow that issuer. Apple Pay / Google Pay is a different contract. A DESFire file on PVC is also a different job.</p>
<h2>Apple</h2>
<p>You need a Pass Type ID and a cert that can sign it. The package is a zip: pass.json, strip/icon/logo, manifest, signature. People add it from HTTPS, Mail, or in-app. After that the device talks to your web service. Field updates go through that service; Apple Push just pokes the phone to fetch. Skip register/unregister and the pass sits on old data until the user deletes it.</p>
<p>NFC is VAS: payload on the pass, merchant IDs on the reader that Apple issued for the programme. A pretty PDF is not VAS.</p>
<h2>Google</h2>
<p>Issuer account plus a service account that signs JWTs. Class is the template, object is the instance, save URL is the signed JWT. Updates are REST patches. Smart Tap is optional; without it the phone still shows a barcode, which is fine for a lot of counters.</p>
<h2>At the gate</h2>
<p>Visual: scan the code, look up serial or object ID, honour void and expiry. NFC: finish VAS or Smart Tap, compare the payload to the live record. Then you still need your own deny list — phones lag APNs / object fetch. We log serial, time, pass/fail, reason, and we only promise reader SKUs written in the appendix.</p>`,
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
      "FIDO and a coin wallet can share a secure element and still be two applets. The seed does not leave the chip. We will not add a CSV export because someone asked nicely.",
    capabilities: [
      { title: "FIDO2 / CTAP2.1", description: "USB-C, NFC, Lightning if you really need it. Resident keys, PIN. Different policies get different AAGUIDs." },
      { title: "Device-bound passkeys", description: "When the customer does not want iCloud or Google sync." },
      { title: "On-card signing", description: "Separate applet: secp256k1, ed25519, PSBT, EIP-712. No APDU that prints the seed." },
      { title: "RP and backup", description: "WebAuthn at the relying party. MDM revoke if it is an enterprise buy. SLIP-39 shards on extra NFC cards." },
    ],
    body: `<h2>Two products, maybe one piece of silicon</h2>
<p>FIDO L2, CC EAL, FIPS — only in the proposal if there is a real submission plan. Support cannot read the seed. CTAP over USB or NFC, PIN, a backup story. Coins: BIP-32/39/44 on card, shards on spare tags.</p>
<p>The website or IdP runs WebAuthn; we build the authenticator. Enterprise and consumer should not share an AAGUID. Samples come from the SE that is already in the cert plan, not whatever JCOP is in the drawer.</p>`,
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
      "One piece of plastic, several applications. Cafeteria purse keeps working when SIS is down. Dorm is its own app. Library is often just an ID. They should not share a file and a key — if a vending machine is compromised, labs should still stay shut.",
    capabilities: [
      { title: "Multi-AID DESFire", description: "Library, meal, door, print, separate keys." },
      { title: "Offline meal purse", description: "Subsidy rules, MAC on load. Till still deducts when SIS is unhappy." },
      { title: "Wallet student ID", description: "Useful at a desk. Dorm readers still need VAS/Smart Tap or they keep PVC." },
      { title: "SIS feed", description: "Ellucian, Workday, whatever is already live. Nightly file is the default. Live REST is a separate fight." },
    ],
    body: `<h2>Same card, different keys</h2>
<p>“One tap everywhere” only works if every door and till actually speaks that credential. A photo in Wallet at the registrar is not a dorm reader. Doors: <a href="/en/solutions/access">access</a>. Passes: <a href="/en/solutions/wallet">Wallet</a>.</p>
<p>Encoding is the AID/key split plus the lost-card flag from SIS. Cafeteria keeps the last subsidy/purse state when SIS is down. Doors use the panel deny list. Inspectors look at the photo, PVC or phone. Nightly SIS file is what most campuses actually run; real-time REST usually shows up late in the project.</p>`,
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
      "发卡无非几件事要对齐：品牌函上的 AID、GlobalPlatform 把应用装进去、PCI 制卡厂个人化、8583 字段（进钱包还要 MDES/VTS）。这几份东西不齐，L3 多半耗在 Combination Selection，或者加载时报 6982，很少是天线的事。",
    capabilities: [
      { title: "AID / 内核表", description: "M/Chip 对 Kernel 2，VSDC 对 Kernel 3，QUICS 对 Kernel 6。精确还是部分 SELECT 看品牌函。双标、0.76 mm 金属各自一行。" },
      { title: "接触 + 非接应用", description: "同一颗芯片上 ISO 7816 和 EMV Contactless。CDA/DDA、IAC/TAC 用这个 BIN 的函，别抄去年的档案。" },
      { title: "GP 加载", description: "SCP02 还是 SCP03 看 INITIALIZE UPDATE。P1 用硅片真正认的值。脚本记下 KCV。JCOP PDF 里的传输密钥别上个人化线。" },
      { title: "PCI 制卡", description: "HSM 仪式、加密 PAN/磁道、按规定 STORE DATA。样卡留 CDA 和非接时序、SW1/SW2。" },
      { title: "MDES / VTS", description: "Token requestor、DAR、yellow path 跟 BIN 一起排，别等第一车塑料出门再补。" },
      { title: "ISO 8583", description: "87/93 字段表。PIN 翻译和发行密钥同一分区。这个 BIN 做电商再上 3DS。" },
    ],
    body: `<h2>为什么终端会进错内核</h2>
<p>PPSE 里 AID 带优先级。POS 按自己的表取第一个允许的。Mastercard BIN 把 Visa 排前面，就会进 Kernel 3。现场很多“刷不上”其实是这个顺序，不是天线。双标和金属（COM）要另做一张表，把信用卡那套 PPSE 直接拷过去，L3 能耗掉一周。</p>
<p>我们做卡和主机字段。Kernel 2/3/6 在终端里。POS 没改过，我们不会帮它重认证。</p>
<h2>先加载，再个人化</h2>
<p>实验室：PC/SC，<code>80 50</code> INITIALIZE UPDATE，<code>84 82</code> EXTERNAL AUTHENTICATE，然后 INSTALL for load、LOAD、INSTALL for install、SELECT 实例。EXTERNAL AUTHENTICATE 已经 9000、下一条包装命令却 6982，先看 MAC 输入和 ICV，别急着改 CAP 文件名。说明：<a href="/zh/blog/scp02-vs-scp03-javacard-secure-channel">SCP02 vs SCP03</a>。练习：<a href="/zh/tools/javacard-tool">JavaCard 工具</a>。</p>
<pre><code>80 50 00 00 08  [8 字节主机挑战]
84 82 03 00 10  [host cryptogram][C-MAC]</code></pre>
<p>制卡厂里密钥留在 HSM。按 PAN 做 STORE DATA / PUT DATA，再激光或印刷。样卡查 CDA 和非接时序。硅片手册里印的 GlobalPlatform 传输密钥，生产线上不会用。</p>
<h2>卡到持卡人手里之后</h2>
<p>L3 是 Combination Selection 加品牌工具上的密文，对照你们真签过的函。现网是 8583 字段表。Apple Pay、Google Pay、Samsung Pay 是 MDES 或 VTS，等于再发一次卡，测试卡另备，跟 BIN 同期排。</p>`,
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
      "闸机真正在乎的是三件事：现网软件上一次轻触要多久、车站断网时怎么办、刷完程序后上个月发出的卡还能不能过。除非整网新建，新票都得迁就车队里已经在用的 SAM 和固件。",
    capabilities: [
      { title: "CALYPSO Rev 3.1", description: "CD21/CD97、SAM 密钥、定期票和次票。密钥版本跟车队要刷的验票镜像绑在一起。" },
      { title: "DESFire EV3", description: "Classic 或私有布局要退时用 AES。别把扇区图糊到 DESFire 文件里。" },
      { title: "验票时间", description: "射频、SELECT、认证、更新、乘客界面——在生产镜像、接近真实的热名单上测，别拿桌上 USB 读头充数。" },
      { title: "cEMV", description: "银行卡和钱包要交通内核加延迟授权。上这个的时候闭环票还得能用。" },
      { title: "账户票", description: "轻触只带令牌，票价和封顶在后台。离线怎么判，得写清楚。" },
    ],
    body: `<h2>车队现在会的协议</h2>
<p>库房里已经有 CALYPSO SAM，就先留在 Rev 3.1，双栈得有人签字。从 Classic 往外走，一般上 DESFire EV3。一台验票机跑两套栈，flash 和回归包都要加钱；预算没这行，车队就不会有。Classic 转储灌进 DESFire，闸机照样当 UID，那不叫迁移。</p>
<p>编码要把文件图、密钥版本、产品（定期票、储值、员工）写全。程序一刷，上个月的卡还得能过。热名单格式也写在这份规格里，别临时贴在闸机上。</p>
<h2>闸机上的毫秒</h2>
<p>300 ms 含 SAM 或 AES 认证，不只是 14443 轮询。实验室 USB 读头 180 ms 不算。我们在真机、生产密钥、夜间热名单体量上测。冬天名单堆满，这个数最容易飘。</p>
<p>车站离线时闸机按手头最后一份名单判。失败原因码要分开，免得稽查和调度室对着同一个“错误”吵。</p>
<h2>银行卡和账户</h2>
<p>cEMV 和账户票是另一路产品。割接期三条经常一起跑。双票种给起止日期——“先两种都收”等于 Classic 永远不退。</p>
<p>开通当天刷银行卡，前提是镜像里已经有交通内核、后台能延迟授权。二维码给失败轻触和稽查用。高峰还是 NFC。</p>`,
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
      "读头只吐 UID，等于没做 DESFire 认证，也没见过 Wallet 卡券。还在用的 125 kHz、Classic 门列清单，日期写死。“二期”不写日子，不算计划。",
    capabilities: [
      { title: "DESFire EV3", description: "AID、文件、通信模式、密钥号。LRP 只开在真支持的读头上。" },
      { title: "HID Seos", description: "现场是 HID 体系才做。别跟 DESFire 揉成一张文件图。" },
      { title: "OSDP 读头", description: "v2.2 安全通道。Wiegand 只出 UID，控制器根本没见过 AES。例外要写日期。" },
      { title: "手机当工牌", description: "可选。VAS / Smart Tap、快捷模式看固件。卡券怎么发、怎么作废，看 Wallet 那页。" },
      { title: "吊销到锁", description: "接口几秒能完。锁要等控制器拿到黑名单。两头都测。" },
    ],
    body: `<h2>Classic 编码进 EV3，控制器还当 UID</h2>
<p>扇区和 Crypto-1 变不成 DESFire 文件。先把应用写清楚——AID、文件、密钥号、通信模式——再编码。外包可以在指定门、指定日期前继续刷 Classic；新员工只发新卡。</p>
<p>现场是 Seos 就做 Seos，第二套文件图、第二套编码。PVC 上印个 logo 不会变成 Apple VAS。Apple Pay 是另一回事，卡券见 <a href="/zh/solutions/wallet">Wallet</a>。</p>
<h2>控制器到底看见什么</h2>
<p>新布线走 OSDP v2.2。不换控制器的 125 kHz 写成带日期的例外。测试用你们要买的型号和生产密钥，别拿箱子里演示头充数。</p>
<p>手机开门：读头得做完 VAS 或 Smart Tap，把载荷带回来。云端吊销可以很快，锁要等面板轮询名单。跟 Wallet 作废了条码还能扫，是同一类空档。</p>`,
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
      "静态 NFC 链接谁都能翻拍。SUN 带上 UID、读计数器和 CMAC。转换厂只写了 NDEF、没开 SDM，你交的还是静态链接，只是手续更隆重。",
    capabilities: [
      { title: "SDM / SUN 模板", description: "镜像、PICC 数据、CMAC 偏移。用市面上的 iPhone、安卓系统 NFC 测，别只拿 ACR122。" },
      { title: "一枚 UID 一把 AES", description: "整个 SKU 一把密钥，拆开一枚就能仿其余。" },
      { title: "验证接口", description: "重算 CMAC，计数器要往上走，同一串重放必须失败。" },
      { title: "标签结构", description: "湿法嵌体还是开瓶即毁，放量前跟转换厂谈。目录贴纸除非同一套 SDM，否则别混进这批。" },
    ],
    body: `<h2>手机到底打开什么</h2>
<p>二维码没有计数器，也没有 CMAC。在静态链接上加个地理围栏，证明不了标签是真的。有用的地址大概长这样：</p>
<pre><code>https://verify.example.com/a/{picc_data}?c={cmac}</code></pre>
<p>转换厂要写 NDEF，还要把 SDM 权限打开。密钥按 UID 分散。湿法还是开瓶即毁，下 20 万之前谈，别下完再改。镜像和 CMAC 偏移用当地能买到的手机测。<a href="/zh/tools/ntag424-tool">NTAG424 DNA 工具</a>，<a href="/zh/blog/ntag424-dna-sun-url-authentication-example">SUN 验证</a>。</p>
<h2>服务器做什么</h2>
<p>按 UID 取密钥，重算 CMAC，看计数器有没有加。同一查询串再来一次必须失败。编码机显示 OK，却没有一次真机通过、一次重放失败，那不叫抽检。抽检打线上接口，别用实验室里另一套密钥。</p>
<p>不必做消费者 App，系统 NFC 会开浏览器。两大品牌的手机还是要点。保修文案跟着这次轻触的过/不过走，别只看 CDN 返回了个漂亮的 200。</p>`,
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
      "证本（PKI、应用、证芯页）和边检查验是两套系统。SOW 里没写谁发 CSCA 主列表和 CRL，有效本会在境外被拒，最后都怪芯片。",
    capabilities: [
      { title: "电子护照应用", description: "LDS1/LDS2：BAC、PACE、EACv2、主动认证 / 芯片认证——剖面写了什么做什。" },
      { title: "eID / 居留", description: "卡上比对。国家方案要 eIDAS 签名再做。" },
      { title: "CSCA / DS", description: "主列表和 CRL 要有负责人和日子。漏发一次，境外就拒好本。" },
      { title: "查验", description: "MRTD 阅读机、人脸对芯片。不是个人化那套。新本 PACE，口袋里还有很多 BAC。" },
      { title: "mDL", description: "RFP 写了 ISO 18013-5 才做（远程再加 18013-7）。不是丢进 Apple Wallet 的 PDF。" },
    ],
    body: `<h2>证本和手机卡券</h2>
<p>PassKit、Google Wallet 是<a href="/zh/solutions/wallet">另一页</a>。18013-5 是 NFC（或 QR）上的选择性披露。证芯页 MLI/UV 是印刷合同，我们对接口。</p>
<p>新本该上 PACE。已经发出去的还有大量 BAC，查验得两头都会好几年。剖面列了 EAC 和芯片认证，SAM 和阅读机许可跟着变，FAT 之后再补会很难看。</p>
<p>CSCA 签 DS，DS 签 SOD。主列表和 CRL 要名字和时点，别只放一页叫“PKI 运维”的片子。</p>
<h2>境外边检会不会挂</h2>
<p>会挂的本，先在 RFP 点名的查验机上挂。mDL 验证方还是要信任列表和吊销。“离线”只表示设备上那份列表够新。这段最容易漏。</p>`,
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
      "医院已经有病历系统。卡多半是标识、签名、开门，或者一张 DESFire 上几个 AID 一起干。别把病程写进 EEPROM。",
    capabilities: [
      { title: "患者卡", description: "加密指针、急救区，部委要求再做卡上比对。正文留在 EHR。" },
      { title: "电子处方", description: "合格签名在 SE，审计到 DSC。国家交换已经用 FHIR 再对。" },
      { title: "医护轻触+PIN", description: "进 Epic/Cerner 一类 SSO（Imprivata 等）。我们做工牌和读头，超时策略还在 EHR。" },
      { title: "单件冷链", description: "可选。NTAG 加记录仪看这一支。整票还是药房那台校准过的。" },
    ],
    body: `<h2>芯片里放什么</h2>
<p>标识和密钥。FHIR（HIE 已经跑 PIX/PDQ 的话一并对照）留在后台。HIPAA/GDPR 文件医院出，我们按 DPO 能签字来设计。</p>
<p>电子处方的密钥和签名剖面在 SE。文件图对上医院现成的 EHR 标识。</p>
<h2>先跑通一个病区</h2>
<p>医护登录是轻触+PIN，加上他们已经买的 SSO。挂失、PIN 锁死、急救区——印 4000 张之前先在试点病区试。门禁若同一张 PO，走门禁那套（OSDP，不是只出 UID）。</p>
<p>NTAG DNA（或带传感器的 22x）适合核对单件。车上还是药房记录仪。两套数对不上就会吵谁才是“那个温度”。</p>`,
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
      "外箱二维码在仓库就能拍。设备上的 NFC 可以带一张照片带不走的东西。Matter 还是要 DAC，标签只传配网载荷。",
    capabilities: [
      { title: "标签上的 NDEF / SUN", description: "Wi-Fi 或 BLE 交接。怕被仿就用 NTAG 424 DNA。" },
      { title: "Matter 配网", description: "载荷走 NFC。DAC/PAI 在设备上。SUN 替不了 DAC。" },
      { title: "出厂证书", description: "线边 HSM 按序列号签 X.509，注入芯片，不是一包 PDF。" },
      { title: "验过再回家", description: "跟防伪同一思路：CMAC 过了，设备才许回连。" },
    ],
    body: `<h2>箱子上的码和产品上的芯</h2>
<p>便宜 Type 2 静态链接就是多了一层塑料的二维码。NFC 也不刷固件，最多把升级会话拉起来。</p>
<p>身份放在线边：HSM、序列号、注入、抽检、不良品箱。等到上了云再开通，仓库里会堆一堆没人认领的货——这段窗口写进威胁模型，别写在脚注。文件图：哪个射频的秘密放哪个文件。有 SUN 时用 <a href="/zh/tools/ntag424-tool">NTAG424 工具</a>。</p>
<h2>卖到哪，用哪的手机点</h2>
<p>目标市场能买到的手机，要能读 NDEF、写 Wi-Fi 或启动 Matter。带签名的轻触，服务器先查 CMAC 再让设备回家。固件签名、防回滚、A/B 分区是 MCU 的事，跟标签编码分开。</p>`,
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
      "积分在主机和余额在卡，是两种产品。离线礼品充值要 MAC。条码枪拉不下 Apple、Google 的会员卡，得读头会 VAS 或 Smart Tap。",
    capabilities: [
      { title: "DESFire 会员", description: "等级/积分文件，或只放 POS 去查的号。先说清楚以哪边为准。" },
      { title: "礼品 / 储值", description: "离线余额、充值 MAC、主机挂了怎么拒。" },
      { title: "Wallet 卡券", description: "Apple VAS、Google Smart Tap，APNs / Google 接口改字段。跟塑料卡分开。" },
      { title: "POS 内核", description: "Verifone、Ingenico、PAX，用连锁已经认证的那套。只开了支付的固件看不见会员卡。" },
    ],
    body: `<h2>积分到底在哪</h2>
<p>积分在主机，卡就是个号。余额在卡，就要密钥和充值 MAC。谁也不写以谁为准，周末一定双花。我们没改过的终端，不重做 EMV L2。支付令牌是银行页的 MDES/VTS，不是这张会员卡。</p>
<p>会员卡券按 <a href="/zh/solutions/wallet">Wallet</a> 那页做，再到门店里那台真实 POS 上试，别拿实验室读头交差。</p>
<h2>收银</h2>
<p>对接现网内核和商户协议（NEXO 这类）。只买了 EMV 支付许可的头，没加功能就拉不下会员。礼品能不能重放、主机挂了拒不拒，写成规则，别问收银员。日结要对上钱包日志，不然月底会很难过。</p>`,
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
      "走近靠 UWB。手机没电摸门把手靠 NFC。BLE 负责把栈叫醒。三个射频得是一套密钥故事，别做成三个孤岛。",
    capabilities: [
      { title: "CCC R3.0 配对", description: "车主配对、分享、吊销，对照你们冻结的 CCC 清单，不是宣传页。" },
      { title: "UWB 测距", description: "802.15.4z HRP。要的是距离限定。天线没校准只是好用一点。" },
      { title: "门把手 NFC", description: "没电时 Type 4。砍掉这项，CCC 还是会问。" },
      { title: "总装 SE", description: "AEC-Q100、CCC 应用、工位 HSM 按 VIN 注入。下线是轻触加走近，不是对一下校验和。" },
    ],
    body: `<h2>射频和证谁来挂名</h2>
<p>Apple/Google 钥匙分享，签约了才写。跳过 CCC 条目的后装套件是另一单。Wallet 里的交通卡不是车钥匙。</p>
<p>主机厂云 / TSM 夹在车和 Apple、Google 中间。密钥按 VIN 在工位写——测试密钥留在车上，后面会变成很贵的召回谈话。</p>
<h2>先台架，再上线</h2>
<p>先关机电量摸门把手 NFC，再校准天线后走 UWB。下线重复这两项，再对照签过字的 CCC 条目做分享/吊销。我们按清单和车上射频实现。CCC 证书上的名字归 OEM 或 Tier-1。</p>`,
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
      "卡券做成放进 Apple Wallet 或 Google Wallet，改字段、作废，闸机或柜台用条码或 NFC 验。Apple 和 Google 是两套账号、两套证、两套读头。一份 JSON 拷两遍过不了。",
    capabilities: [
      { title: "Apple .pkpass", description: "Pass Type ID、签名证书、pass.json 和图。加上去之后手机向你的 web 服务注册，APNs 通知它来拉。没注册，卡券就会停在旧数据。" },
      { title: "Google class / object", description: "Issuer 账号、JWT 保存链接、REST 改 object。Smart Tap 要卡券和终端都有 collector ID。" },
      { title: "闸机扫码", description: "摄像头或激光扫条码。查 Apple serial 或 Google object ID，看作废和过期。同一码能用几次，你们自己写规则。" },
      { title: "NFC（VAS / Smart Tap）", description: "读头会才算。只出 UID 的 Wiegand 不是在验 Wallet。快捷模式是固件加卡券设置。" },
      { title: "作废和闸机名单", description: "推送作废，手机可能过一会儿才变。闸机该立刻拒这个 serial，否则截图还能过。" },
    ],
    body: `<h2>卡券，不是 Pay，也不是 DESFire</h2>
<p>会员、活动、登机、优惠券、generic、store card——Apple 或 Google 允许这个发行方用的那些。Apple Pay / Google Pay 另算。PVC 上的 DESFire 也另算。</p>
<h2>Apple</h2>
<p>要 Pass Type ID 和能签它的证书。包是 zip：pass.json、条带/图标/logo、manifest、signature。人从 HTTPS、邮件或 App 里加。加上之后设备跟你的 web 服务说话。改字段走这个服务，Apple Push 只是捅一下让手机来拉。没有 register/unregister，卡券就停在旧数据，除非用户删了重加。</p>
<p>NFC 是 VAS：载荷在卡券上，读头上是 Apple 给这个项目的 merchant ID。PDF 上的图不是 VAS。</p>
<h2>Google</h2>
<p>Issuer 账号，加上签 JWT 的服务账号。class 是模板，object 是实例，保存链接是签过的 JWT。更新用 REST 补丁。Smart Tap 可选；没有的话手机照样出条码，很多柜台这样就够。</p>
<h2>闸机</h2>
<p>视觉：扫码，查 serial 或 object ID，认作废和过期。NFC：做完 VAS 或 Smart Tap，载荷跟现网记录对。另外还要你们自己的拒绝名单——手机赶不上 APNs / 拉 object。我们记 serial、时间、过/不过、原因。附录没写的读头，现场不承诺。</p>`,
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
      "FIDO 和币钱包可以共用一颗安全元件，应用还是两套。种子不离卡。不会因为有人客气就要 CSV 导出。",
    capabilities: [
      { title: "FIDO2 / CTAP2.1", description: "USB-C、NFC，真要 Lightning 再加。常驻凭证、PIN。不同策略用不同 AAGUID。" },
      { title: "设备绑定 Passkey", description: "客户不想跟 iCloud、Google 同步的时候。" },
      { title: "卡内签名", description: "另一个应用：secp256k1、ed25519、PSBT、EIP-712。没有把种子打出来的 APDU。" },
      { title: "依赖方和备份", description: "网站跑 WebAuthn。企业单再加 MDM 吊销。SLIP-39 分片放多余的 NFC 卡。" },
    ],
    body: `<h2>两个产品，硅片可以同一颗</h2>
<p>FIDO L2、CC EAL、FIPS，有送测计划才写进方案。客服读不到种子。CTAP 走 USB 或 NFC，加上 PIN 和备份办法。币：卡内 BIP-32/39/44，分片放备用标签。</p>
<p>网站或 IdP 跑 WebAuthn，我们做认证器。企业和个人别共用 AAGUID。样卡用认证计划里那颗 SE，别翻抽屉里随便一张 JCOP。</p>`,
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
      "一张塑料，好几个应用。食堂钱包 SIS 挂了还能扣。宿舍是自己的应用。图书馆经常只是个号。别共用一个文件一把密钥——售货机被攻破，实验室不该跟着开。",
    capabilities: [
      { title: "多 AID DESFire", description: "图书、餐、门、打印，密钥分开。" },
      { title: "离线餐钱包", description: "补贴规则、充值 MAC。SIS 不高兴食堂机还扣得动。" },
      { title: "Wallet 学生证", description: "前台好看照片。宿舍读头不会 VAS/Smart Tap 就继续刷 PVC。" },
      { title: "SIS 接口", description: "Ellucian、Workday，现网是什么用什么。默认夜间文件。实时 REST 另说。" },
    ],
    body: `<h2>同一张卡，不同密钥</h2>
<p>“处处一触”得每扇门、每个窗口的读头真会这种凭证。教务处 Wallet 里的照片，不是宿舍读头。门：<a href="/zh/solutions/access">门禁</a>。卡券：<a href="/zh/solutions/wallet">Wallet</a>。</p>
<p>编码就是 AID/密钥划分，加上 SIS 挂失标记。食堂在 SIS 挂了时用上次补贴/余额。门用控制器黑名单。前台看照片，PVC 或手机。多数学校实际跑的是夜间文件；实时 REST 往往排到项目后段。</p>`,
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
