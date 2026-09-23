# NFCTEC Website & Admin Platform Refactoring Specification — FINAL V4

## 0. Purpose

This document is the **final implementation specification** for rebuilding the NFCTEC public website and its Admin/CMS platform.

The goal is not to simply redesign the current pages.

The goal is to rebuild NFCTEC into a focused, technically credible international NFC and secure-technology engineering company website while preserving existing technical content and SEO value.

**Cursor must treat this document as the source of truth for implementation.**

Do not invent business claims, certifications, partnerships, customers, security guarantees, product specifications, reviews, or market statistics.

---

# 1. Final Brand Positioning

## 1.1 Primary positioning

# NFCTEC — NFC & Secure Technology Engineering

Primary supporting statement:

> Hardware, smart cards, FIDO, digital identity, SDKs, security and cloud for secure connected products.

Secondary brand concept:

> The NFC Engineering Stack

Optional supporting phrase:

> Everything NFC, from one engineering partner.

The website must communicate within approximately 10 seconds:

- NFCTEC is an NFC and secure-technology engineering company.
- NFCTEC works across NFC/RF, smart cards, security, identity, software, hardware and cloud.
- NFCTEC can support projects from engineering/prototyping through production.
- NFCTEC provides products, tools, technical expertise and implementation services.

NFCTEC must NOT look like:

- a generic software outsourcing company
- a generic cybersecurity company
- a random electronics reseller
- a generic SaaS company
- a cryptocurrency company
- a collection of unrelated NFC products
- a generic agency website

---

# 2. Final Public Information Architecture

The public website must be organized around **3 Core Technologies + 3 Delivery Layers + 6 Solutions + Developer**.

This is the most important IA decision in this specification.

## 2.1 Three Core Technologies

### 1. NFC & RF

Covers:

- NFC
- RFID
- ISO/IEC 14443
- ISO/IEC 15693
- NFC Forum
- NDEF
- RF design
- NFC antennas
- NFC readers
- RF interfaces
- NFC controllers
- PN5180
- PN7150
- ST25R3916
- embedded NFC
- reader firmware
- RF testing and diagnostics

### 2. Smart Cards

Covers:

- JavaCard
- GlobalPlatform
- SCP02
- SCP03
- EMV
- DESFire
- MIFARE
- FeliCa
- APDU
- PC/SC
- PIV
- secure smart cards
- card personalization
- card issuance
- smart-card readers
- embedded card interfaces
- card lifecycle management

### 3. Security & Identity

This is a first-class core technology category.

It must explicitly include **Cryptography**, but NOT cryptocurrency unless NFCTEC actually develops and sells cryptocurrency-related products.

Security & Identity includes:

#### Cryptography

- AES
- 3DES
- RSA
- ECC
- CMAC
- hashing
- secure messaging
- encryption/decryption
- digital signatures
- key derivation
- cryptographic protocols

#### Security Infrastructure

- HSM
- Secure Element
- SE050 / SE051
- PKI
- key management
- key provisioning
- key rotation
- credential management
- secure storage
- hardware-backed security

#### Authentication

- FIDO2
- WebAuthn
- PIV
- device authentication
- credential authentication
- phishing-resistant authentication

#### Digital Identity

- ePassport
- ICAO 9303
- BAC
- PACE
- EAC
- digital credentials
- identity verification
- credential issuance
- credential verification

#### NFC Security

- NTAG 424 DNA
- SUN
- secure NFC tags
- authentication tags
- anti-counterfeit mechanisms
- secure NFC verification

### Important distinction

**Cryptography = Core Technology**

**Cryptocurrency = NOT a core technology**

Do not add Bitcoin, stablecoins, blockchain assets, Web3, cryptocurrency wallets, or similar topics merely to make the company appear broader.

If NFCTEC develops real products in Digital Assets / Web3 in the future, they may become a separate Solution category. Until then, do not expose them as a major website theme.

---

# 3. Three Delivery Layers

The three core technologies describe **what NFCTEC knows and builds**.

The delivery layers describe **how NFCTEC delivers that technology**.

## 3.1 Hardware

Examples:

- NFC readers
- USB readers
- Serial readers
- USB CCID readers
- embedded NFC modules
- antennas
- NFC signal detection cards
- smart-card readers
- blank cards
- personalization equipment
- embedded controllers
- ESP32-based systems
- STM32-based systems

## 3.2 Software

Examples:

- reader SDK
- NFC SDK
- smart-card SDK
- JavaCard tools
- EMV tools
- APDU tools
- card personalization software
- FIDO integration
- PIV tools
- desktop applications
- mobile SDK
- developer tools
- diagnostic software

## 3.3 Cloud

Examples:

- REST APIs
- issuance APIs
- verification APIs
- credential management
- NFC verification
- secure provisioning
- cloud integration
- device management
- key-management integration
- HSM-backed services

---

# 4. Six Solutions

Solutions describe customer-facing applications.

## 4.1 Payment

Examples:

- EMV
- smart-card payment
- NFC payment
- card personalization
- secure transaction infrastructure
- payment readers

## 4.2 Identity

Examples:

- ePassport
- PIV
- digital identity
- credentials
- identity verification
- FIDO2
- WebAuthn
- secure identity readers

## 4.3 Access Control

Examples:

- NFC access cards
- DESFire
- MIFARE
- FeliCa
- OSDP
- access readers
- access controllers
- credential management

## 4.4 Brand Protection

Examples:

- NTAG 424 DNA
- SUN
- secure NFC tags
- product authentication
- anti-counterfeit
- cloud verification
- NFC-based product identity

## 4.5 Transit

Examples:

- NFC ticketing
- smart-card transit
- fare media
- reader hardware
- ticket validation
- credential/token verification

## 4.6 IoT

Examples:

- NFC device commissioning
- NFC configuration
- secure device identity
- Secure Element
- NFC sensors
- embedded NFC
- device authentication

---

# 5. Developer Ecosystem

Developer must be a first-class navigation item.

## Developer contains:

- SDK
- Tools
- API
- Documentation
- Downloads
- Examples
- Integration guides

Developer content should feel like a technical developer portal, not a marketing page.

It must support:

- copyable code
- APDU examples
- API examples
- protocol references
- SDK versions
- platform compatibility
- downloads
- documentation links
- firmware/software versions
- hardware compatibility

---

# 6. Final Navigation

Recommended primary navigation:

```text
NFCTEC

Products
Solutions
Technology
Developer
Blog
Company

[ Talk to an Engineer ]
```

## Products

```text
Products
├── Software
├── Hardware
└── Cloud
```

## Solutions

```text
Solutions
├── Payment
├── Identity
├── Access Control
├── Brand Protection
├── Transit
└── IoT
```

## Technology

```text
Technology
├── NFC & RF
├── Smart Cards
└── Security & Identity
```

Security & Identity contains:

```text
Security & Identity
├── Cryptography
├── HSM
├── Secure Element
├── PKI & Key Management
├── FIDO2 / WebAuthn
├── ePassport / PIV
├── Digital Identity
└── NFC Security
```

## Developer

```text
Developer
├── SDK
├── Tools
├── API
├── Documentation
└── Downloads
```

## Blog

Existing technical articles must be preserved.

## Company

```text
Company
├── About
├── Contact
└── Talk to an Engineer
```

---

# 7. URL Structure

Preferred structure:

```text
/en
/en/products
/en/products/software
/en/products/hardware
/en/products/cloud

/en/solutions
/en/solutions/payment
/en/solutions/identity
/en/solutions/access-control
/en/solutions/brand-protection
/en/solutions/transit
/en/solutions/iot

/en/technology
/en/technology/nfc-rf
/en/technology/smart-cards
/en/technology/security-identity
/en/technology/security-identity/cryptography
/en/technology/security-identity/hsm
/en/technology/security-identity/secure-element
/en/technology/security-identity/fido2
/en/technology/security-identity/digital-identity

/en/developer
/en/developer/sdk
/en/developer/tools
/en/developer/api
/en/developer/documentation
/en/developer/downloads

/en/blog
/en/about
/en/contact
```

Chinese:

```text
/zh
/zh/products
/zh/solutions
/zh/technology
/zh/developer
/zh/blog
/zh/about
/zh/contact
```

## SEO migration rule

Before changing URLs:

1. Crawl the current website.
2. Build a complete route inventory.
3. Identify existing indexed/high-value URLs.
4. Map old URLs to new URLs.
5. Preserve URLs when practical.
6. Use 301 redirects when URLs must change.
7. Never silently delete valuable existing pages.

Create a migration table:

| Old URL | New URL | Action | Redirect | SEO Priority |
|---|---|---|---|---|

---

# 8. Homepage Final Structure

The homepage must not attempt to display every technical topic.

The homepage should communicate the business clearly and then guide visitors deeper.

Final order:

```text
1. Header

2. Hero
   NFC & Secure Technology Engineering

3. Core Technology Stack
   NFC & RF
   Smart Cards
   Security & Identity

4. Products
   Software
   Hardware
   Cloud

5. Solutions
   Payment
   Identity
   Access Control
   Brand Protection
   Transit
   IoT

6. Security & Identity
   Deeper technical explanation

7. Featured Products

8. Technology Coverage

9. Why NFCTEC

10. Prototype → Production

11. Developer Ecosystem

12. Engineering Insights

13. Final CTA

14. Footer
```

---

# 9. Hero Section

Headline:

> NFC & Secure Technology Engineering

Supporting text:

> Hardware, smart cards, FIDO, digital identity, SDKs, security and cloud for secure connected products.

Primary CTA:

> Talk to an Engineer

Secondary CTA:

> Explore Technology

Optional third CTA:

> View Products

## Hero visual

Do NOT use generic stock photography.

Use a technical architecture illustration:

```text
NFC / RF
    ↓
Smart Cards
    ↓
Security
    ↓
SDK / Firmware
    ↓
Cloud
```

Visual language may include:

- NFC field rings
- chip geometry
- smart-card outlines
- reader devices
- APDU/data streams
- cryptographic/key abstractions
- secure element
- cloud/API architecture
- PCB traces

The visual must communicate engineering capability rather than generic cybersecurity.

---

# 10. Core Technology Stack Section

Headline:

> One Engineering Stack. Multiple Security Technologies.

Three major blocks:

## NFC & RF

NFC readers, RF interfaces, antennas, NFC protocols, embedded NFC and RF engineering.

## Smart Cards

JavaCard, GlobalPlatform, EMV, DESFire, MIFARE, FeliCa, APDU, PC/SC and card lifecycle technologies.

## Security & Identity

Cryptography, HSM, Secure Element, PKI, FIDO2, ePassport, PIV, digital identity and secure NFC.

Each block links to a dedicated technology landing page.

Do not create excessive visual cards for every individual technology on the homepage.

---

# 11. Products Section

Headline:

> Products Built for NFC and Secure Technology

Three main categories:

### Software

- SDK
- developer tools
- personalization tools
- NFC utilities
- smart-card tools
- diagnostic tools

### Hardware

- NFC readers
- USB/Serial/CCID readers
- embedded modules
- antennas
- cards
- personalization hardware

### Cloud

- issuance
- verification
- APIs
- credential management
- secure provisioning

Show only a small number of featured products on the homepage.

Full product catalog belongs on `/products`.

---

# 12. Solutions Section

Show six solution categories:

```text
Payment
Identity
Access Control
Brand Protection
Transit
IoT
```

Each solution page should explain:

1. Customer problem
2. NFCTEC solution
3. Architecture
4. Technologies
5. Products
6. Security
7. Deployment
8. Use cases
9. Related technical content
10. CTA

Do not make Solutions simply duplicate Technology pages.

Technology explains **how**.

Solutions explain **what problem is solved**.

---

# 13. Security & Identity Homepage Section

This section should provide technical depth without creating a second competing information architecture.

Headline:

> Security Built Into the NFC Stack

Four areas:

### Smart Card Security

- JavaCard
- GlobalPlatform
- SCP02
- SCP03
- EMV
- DESFire
- APDU security

### Cryptography & Key Infrastructure

- AES
- 3DES
- RSA
- ECC
- CMAC
- HSM
- Secure Element
- PKI
- key management
- secure messaging

### Authentication

- FIDO2
- WebAuthn
- PIV
- credential authentication
- device authentication

### Digital Identity

- ePassport
- ICAO 9303
- BAC
- PACE
- EAC
- digital credentials
- verification APIs

This section should link to the full Security & Identity technology area.

---

# 14. Technology Coverage

Detailed technology coverage should include:

## NFC & RF

- NFC
- RFID
- ISO/IEC 14443
- ISO/IEC 15693
- NFC Forum
- NDEF
- RF design
- NFC antennas
- NFC controllers
- PN5180
- PN7150
- ST25R3916

## Smart Cards

- JavaCard
- GlobalPlatform
- SCP02
- SCP03
- EMV
- APDU
- PC/SC
- DESFire EV2/EV3
- MIFARE
- FeliCa
- PIV

## Security & Identity

- Cryptography
- AES
- 3DES
- RSA
- ECC
- CMAC
- HSM
- Secure Element
- SE050 / SE051
- PKI
- Key Management
- FIDO2
- WebAuthn
- ePassport
- ICAO 9303
- BAC
- PACE
- EAC
- Digital Identity
- NTAG 424 DNA
- SUN

Do not make every technology a top-level navigation item.

---

# 15. Product CMS

Products must be database-driven.

## Product fields

```text
id
name
slug
category
status
shortDescription
description
heroImage
gallery
features
specifications
supportedProtocols
supportedChips
platforms
downloads
documentationUrl
relatedTechnologies
relatedSolutions
relatedArticles
featured
sortOrder
seoTitle
seoDescription
canonicalUrl
ogImage
createdAt
updatedAt
```

## Categories

```text
Software
Hardware
Cloud
```

## Status

```text
Draft
Published
Archived
```

Product pages:

```text
Breadcrumb
Hero
Summary
Features
Specifications
Supported Chips / Protocols
Integration
Downloads
Documentation
Related Technologies
Related Solutions
Related Articles
CTA
```

---

# 16. Solutions CMS

Fields:

```text
id
name
slug
category
heroTitle
heroDescription
heroImage
problem
solution
architecture
useCases
technologies
products
security
deployment
relatedArticles
seoTitle
seoDescription
canonicalUrl
ogImage
status
sortOrder
```

---

# 17. Technology CMS

Fields:

```text
id
name
slug
category
description
icon
capabilities
protocols
chips
products
solutions
articles
documentationUrl
seoTitle
seoDescription
canonicalUrl
ogImage
featured
sortOrder
status
```

Technology relationships are important.

Example:

```text
NTAG 424 DNA
    ↓
NTAG424 Tool
    ↓
Brand Protection
    ↓
SUN
    ↓
Verification API
    ↓
Technical Article
```

---

# 18. Developer CMS

Developer content must be managed separately from normal marketing content.

## Developer Tool fields

```text
id
name
slug
description
version
platforms
screenshots
features
download
documentationUrl
relatedProducts
relatedTechnologies
status
featured
sortOrder
```

Developer pages should support:

- code blocks
- APDU examples
- API examples
- SDK installation
- compatibility
- supported operating systems
- hardware requirements
- software versions
- downloads
- documentation

---

# 19. Blog CMS

Existing articles must be migrated.

Fields:

```text
id
title
slug
excerpt
content
coverImage
author
category
tags
relatedProducts
relatedTechnologies
relatedSolutions
status
featured
publishDate
updatedDate
readingTime
seoTitle
seoDescription
canonicalUrl
ogImage
```

Statuses:

```text
Draft
Review
Published
Archived
```

Editor should support:

- headings
- paragraphs
- images
- links
- code blocks
- tables
- quotes
- lists
- internal links
- preview
- draft
- publish
- scheduling if practical

Do not rewrite technical articles merely to make the website simpler.

---

# 20. Downloads CMS

Fields:

```text
id
name
version
category
platform
file
fileSize
checksum
releaseNotes
product
documentationUrl
publishedAt
status
```

Categories:

```text
Software
SDK
Drivers
Firmware
Datasheets
Manuals
Developer Tools
```

Preserve checksums for downloadable software/firmware where available.

---

# 21. Media Library

Admin must include a Media Library.

Functions:

- upload
- search
- filter
- preview
- replace
- delete
- copy URL
- edit alt text
- edit title
- inspect file type
- inspect file size
- inspect dimensions

Categories:

```text
Product Images
Blog Images
Technology Images
Logos
Documents
Datasheets
Screenshots
Videos
```

Images should be optimized for:

- WebP
- AVIF where practical
- responsive image sizes
- lazy loading

---

# 22. Homepage CMS

Homepage must be editable through the Admin.

Editable areas:

- Hero title
- Hero description
- Hero image/visual
- CTA labels
- Core Technology blocks
- Featured products
- Solutions
- Security section
- Technology section
- Why NFCTEC
- Prototype → Production
- Developer tools
- Articles
- Final CTA

Admin must support:

- enable/disable sections
- reorder sections
- select featured entities
- edit section copy
- preview
- publish

Do NOT build a complicated generic drag-and-drop page builder.

Use structured homepage sections.

---

# 23. Navigation CMS

Admin must manage:

- main navigation
- dropdown menus
- footer navigation
- external links
- visibility
- sort order

Do not hard-code all navigation labels into frontend components.

---

# 24. SEO CMS

Each indexable page should support:

```text
SEO Title
Meta Description
Canonical URL
OG Title
OG Description
OG Image
Robots
Structured Data settings
```

Use valid structured data only.

Possible schemas:

- Organization
- Product
- SoftwareApplication
- Article
- BreadcrumbList
- FAQPage only when the page genuinely contains FAQ content

Never invent:

- ratings
- reviews
- certifications
- customer counts
- partnerships
- security guarantees
- performance claims

---

# 25. Leads / Contact Management

Primary CTA:

> Talk to an Engineer

Form:

```text
Name
Company
Email
Country
Project Type
Interested Product
Message
Attachment
```

Admin statuses:

```text
New
Contacted
Qualified
Converted
Closed
```

Lead record:

```text
id
name
company
email
country
projectType
interestedProduct
message
attachment
status
notes
assignedTo
createdAt
updatedAt
```

Requirements:

- validation
- spam protection
- rate limiting
- secure storage
- notification/email integration
- no public exposure of lead records

Reuse existing email integration where available.

Do not hard-code recipient addresses in frontend code.

---

# 26. Admin Dashboard

Dashboard should show:

- products count
- solutions count
- technologies count
- articles count
- downloads count
- leads count

Optional:

- recent leads
- recent content changes
- recent downloads
- basic traffic/content metrics

Do not overbuild analytics before the CMS is stable.

---

# 27. Admin Roles

Recommended roles:

## Super Admin

Full access.

## Content Admin

Content management and publishing.

## Product Manager

Products, technology and downloads.

## Editor

Blog and content editing.

## Sales

Leads and contact management.

Use role-based access control.

---

# 28. Admin UI

Admin should be:

- light
- practical
- dense but readable
- professional
- fast
- easy to operate

Recommended layout:

```text
Sidebar
├── Dashboard
├── Products
├── Solutions
├── Technology
├── Developer
├── Blog
├── Downloads
├── Media
├── Pages
├── Leads
├── SEO
├── Navigation
└── Settings
```

Top bar:

- search
- current user
- notifications if needed
- language
- logout

Use:

- tables
- filters
- pagination
- status badges
- forms
- tabs
- confirmation dialogs

The Admin must NOT look like the public marketing website.

---

# 29. Content Relationship Model

NFCTEC should operate as a connected technical knowledge graph.

Core relationship:

```text
Product
   ↕
Technology
   ↕
Solution
   ↕
Developer Tool
   ↕
Article
```

Examples:

```text
NTAG 424 DNA
    ↕
NTAG424 Tool
    ↕
Brand Protection
    ↕
SUN
    ↕
Verification API
    ↕
Technical Article
```

Another example:

```text
JavaCard
    ↕
GlobalPlatform
    ↕
SCP03
    ↕
Personalization Tool
    ↕
Smart Card Product
    ↕
Payment / Identity Solution
```

This relationship model should automatically generate:

- related products
- related technologies
- related solutions
- related articles
- internal links

---

# 30. Visual Design System

The public website must look like a premium international B2B engineering company.

## Theme

Use a **light-first visual system**.

Preferred:

- white / very light neutral backgrounds
- dark text
- NFCTEC brand accent
- one primary accent color
- optional secondary accent used sparingly

Avoid:

- cyberpunk
- excessive neon
- dark-heavy design
- excessive gradients
- rainbow colors
- generic startup illustrations
- generic office stock photography
- excessive glassmorphism
- excessive animation

## Typography

Desktop:

```text
H1: 52–64px
H2: 36–44px
H3: 22–28px
Body: 16–18px
Small: 13–14px
```

Mobile:

```text
H1: 36–42px
H2: 28–34px
H3: 20–24px
Body: 16px
```

## Cards

Recommended:

```text
border-radius: 12–16px
subtle border
subtle shadow
clear hierarchy
```

Do not turn every paragraph into a card.

---

# 31. Technical Visual Language

Use visual concepts such as:

- NFC wave patterns
- RF field rings
- smart-card geometry
- chip outlines
- reader silhouettes
- APDU data streams
- cryptographic key abstractions
- Secure Element diagrams
- HSM architecture
- cloud/API diagrams
- PCB traces
- protocol layers

Technical visuals should explain architecture.

Avoid generic “cybersecurity hacker” imagery.

---

# 32. Image Strategy

Priority:

1. Real NFCTEC product assets
2. Real hardware photography
3. Technical diagrams
4. Technical illustrations
5. Contextual photography only when useful

Do not use generic handshake/business-team images unless there is a strong reason.

Product pages should use actual product photography whenever available.

Technology pages should favor diagrams and technical illustrations.

---

# 33. Existing Technical Content to Preserve

Do not remove existing valuable technical content merely because the homepage is being simplified.

Preserve and reorganize:

- JavaCard
- GlobalPlatform
- SCP02
- SCP03
- EMV
- NTAG 424 DNA
- DESFire EV2/EV3
- MIFARE
- FeliCa
- ePassport
- ICAO 9303
- PACE
- BAC
- EAC
- FIDO2
- WebAuthn
- Secure Elements
- NCI
- PN5180
- PN7150
- ST25R3916
- SE050
- SE051
- NFC Forum
- NDEF
- SUN
- HSM
- key management
- cryptography
- verification API
- PIV
- PC/SC
- OSDP
- NFC readers
- embedded NFC
- NFC personalization

The redesign is an information architecture improvement, not a content deletion project.

---

# 34. Developer Example

A developer-facing reader SDK page could contain:

```text
Reader SDK

Platforms
- Windows
- Linux
- Android

Interfaces
- USB
- Serial
- PC/SC

Protocols
- ISO14443
- ISO15693
- NFC Forum

Features
- Reader discovery
- Card detection
- APDU exchange
- NDEF
- Smart-card communication
- Diagnostics

Downloads
Documentation
API Reference
Examples
Release Notes
```

Developer pages should be useful to engineers without requiring them to contact sales for basic technical information.

---

# 35. Public Search

Implement global public search across:

- Products
- Solutions
- Technologies
- Developer Tools
- Blog
- Downloads

Search results should show:

```text
Title
Type
Description
Category
```

Never expose:

- leads
- private admin content
- drafts
- internal notes
- private files

---

# 36. Analytics

Track useful events:

```text
product_view
solution_view
technology_view
download_click
documentation_click
contact_submit
talk_to_engineer_click
article_view
developer_tool_download
```

Do not collect unnecessary personal information.

---

# 37. Localization

Support:

- English
- Chinese

English is the primary international presentation.

Chinese must be natural Chinese, not literal machine translation.

Preserve technical terminology:

- JavaCard
- GlobalPlatform
- EMV
- DESFire
- NTAG 424 DNA
- FIDO2
- WebAuthn
- ePassport
- PACE
- BAC
- EAC
- HSM
- APDU
- PC/SC

Do not translate technical product names incorrectly.

---

# 38. Sitemap / Robots

Sitemap must contain only canonical indexable pages.

Exclude:

- Admin
- drafts
- previews
- internal search
- duplicate filters
- temporary URLs

Admin routes must not be publicly indexable.

---

# 39. Performance

Target:

- Lighthouse 90+ where practical
- strong mobile performance
- optimized images
- WebP/AVIF
- responsive image sizes
- lazy loading
- minimal unnecessary JavaScript
- avoid heavy animation
- avoid autoplay video unless necessary

---

# 40. Responsive Design

Explicitly test:

```text
1440
1280
1024
768
430
390
375
```

Mobile must be intentionally designed.

Requirements:

- no horizontal overflow
- readable typography
- usable navigation
- collapsible technology menus
- responsive tables
- usable forms
- touch-friendly controls
- optimized images

Do not simply shrink the desktop layout.

---

# 41. Accessibility

Use:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible buttons
- descriptive alt text
- sufficient contrast
- proper form labels
- useful validation/error messages
- accessible dropdowns
- accessible mobile navigation

---

# 42. Security

Admin security is mandatory.

Implement as appropriate:

- authentication
- authorization
- role-based access
- CSRF protection where applicable
- input validation
- XSS protection
- SQL/injection protection
- rate limiting
- secure password handling
- audit logs
- secure sessions
- secure file uploads

Uploaded files:

- must not execute
- must validate extension
- must validate MIME type
- must validate size
- should validate content type where appropriate
- must use safe filenames
- must not expose sensitive paths

Do not expose secrets in frontend code.

Do not expose raw database structures through public APIs.

---

# 43. API Architecture

Recommended endpoints:

```text
/api/products
/api/solutions
/api/technologies
/api/tools
/api/articles
/api/downloads
/api/media
/api/pages
/api/navigation
/api/leads
```

Rules:

- Admin APIs require authentication.
- Public APIs expose only published content.
- Do not expose raw database structures.
- Validate all incoming data.
- Enforce authorization server-side.
- Do not trust frontend permissions.

---

# 44. Structured Content Model

Prefer structured entities over giant HTML blobs.

Use structured fields for:

- products
- technologies
- solutions
- tools
- downloads
- relationships
- SEO

Articles may use rich text/Markdown.

This is important for:

- search
- SEO
- internal linking
- localization
- reuse
- API access
- future mobile applications

---

# 45. Homepage Content Philosophy

The homepage should do **subtraction**.

Inner pages should do **addition**.

Homepage should answer:

1. What is NFCTEC?
2. What technologies does NFCTEC work with?
3. What can NFCTEC provide?
4. What problems can NFCTEC solve?
5. Why should an engineer continue exploring?
6. How can a customer contact NFCTEC?

Do not put every product, chip, protocol and technology on the homepage.

---

# 46. Content Hierarchy Rule

The hierarchy must be:

```text
NFCTEC
│
├── 3 Core Technologies
│   ├── NFC & RF
│   ├── Smart Cards
│   └── Security & Identity
│
├── 3 Delivery Layers
│   ├── Hardware
│   ├── Software
│   └── Cloud
│
├── 6 Solutions
│   ├── Payment
│   ├── Identity
│   ├── Access Control
│   ├── Brand Protection
│   ├── Transit
│   └── IoT
│
└── Developer
    ├── SDK
    ├── Tools
    ├── API
    ├── Documentation
    └── Downloads
```

This hierarchy must be visible in the code architecture and CMS architecture.

---

# 47. Important Naming Rule

Use:

> Security & Identity

instead of creating separate top-level categories for:

- Security
- Cryptography
- Authentication
- Digital Identity
- FIDO
- ePassport
- HSM

These are subtopics of the same core technology.

This prevents the website from feeling fragmented.

---

# 48. Cryptocurrency / Web3 Rule

Do NOT add Cryptocurrency or Web3 as a core NFCTEC theme unless there are actual products/services to support it.

Cryptography belongs under:

```text
Technology
└── Security & Identity
    └── Cryptography
```

Cryptocurrency does not automatically belong there.

If future business development creates a real Digital Assets/Web3 offering, it may be evaluated as a separate Solution category at that time.

Do not manufacture a business category just for SEO or appearance.

---

# 49. Recommended Homepage Visual Layout

Desktop:

```text
┌──────────────────────────────────────────────────────┐
│ NFCTEC      Products Solutions Technology Developer │
│                                  Talk to an Engineer │
├──────────────────────────────────────────────────────┤
│                                                      │
│       NFC & Secure Technology Engineering            │
│                                                      │
│ Hardware, smart cards, FIDO, digital identity,      │
│ SDKs, security and cloud for secure products.       │
│                                                      │
│ [Talk to an Engineer] [Explore Technology]           │
│                                                      │
│          NFC → Smart Cards → Security → Cloud       │
│                                                      │
├──────────────────────────────────────────────────────┤
│             CORE TECHNOLOGY STACK                    │
│                                                      │
│ NFC & RF | Smart Cards | Security & Identity         │
├──────────────────────────────────────────────────────┤
│                    PRODUCTS                          │
│ Software | Hardware | Cloud                          │
├──────────────────────────────────────────────────────┤
│                    SOLUTIONS                         │
│ Payment | Identity | Access | Brand | Transit | IoT │
├──────────────────────────────────────────────────────┤
│             SECURITY & IDENTITY                      │
│ Crypto | HSM | FIDO | ePassport | PKI | SE          │
├──────────────────────────────────────────────────────┤
│                 FEATURED PRODUCTS                    │
├──────────────────────────────────────────────────────┤
│               TECHNOLOGY COVERAGE                    │
├──────────────────────────────────────────────────────┤
│               WHY NFCTEC                             │
├──────────────────────────────────────────────────────┤
│             PROTOTYPE → PRODUCTION                   │
├──────────────────────────────────────────────────────┤
│              DEVELOPER ECOSYSTEM                     │
├──────────────────────────────────────────────────────┤
│             ENGINEERING INSIGHTS                     │
├──────────────────────────────────────────────────────┤
│              TALK TO AN ENGINEER                     │
└──────────────────────────────────────────────────────┘
```

---

# 50. Why NFCTEC

Use factual capability-based messaging.

Possible themes:

- NFC + smart-card expertise
- hardware + software integration
- security-focused engineering
- developer tooling
- cloud integration
- prototype-to-production support
- practical engineering experience

Do not claim:

- “world's best”
- “most secure”
- “#1”
- “industry leader”

unless there is verifiable evidence.

---

# 51. Prototype → Production

Show a simple process:

```text
Requirements
    ↓
Architecture
    ↓
Prototype
    ↓
Firmware / SDK
    ↓
Security Integration
    ↓
Cloud / Backend
    ↓
Testing
    ↓
Production
```

This is an important differentiator.

NFCTEC should look capable of engineering complete systems, not only selling NFC cards/readers.

---

# 52. Footer

Footer:

```text
NFCTEC

Products
Solutions
Technology
Developer
Blog
Company

Documentation
Downloads
Developer Tools

Contact
Talk to an Engineer

Privacy
Terms
```

Only include social links that are actually used.

---

# 53. Existing Site Migration

Before coding the new frontend:

## Step 1 — Audit

Analyze current:

- pages
- URLs
- products
- technologies
- blog articles
- images
- downloads
- metadata
- navigation
- internal links

## Step 2 — Content inventory

Create:

```text
Current Page
Current URL
Page Type
Target Section
New URL
Keep / Merge / Redirect
SEO Priority
```

## Step 3 — Preserve valuable content

Do not delete technical pages without reviewing their SEO/content value.

## Step 4 — Migration

Use 301 redirects where necessary.

## Step 5 — Validate

Check:

- old URLs
- new URLs
- canonical URLs
- sitemap
- robots
- internal links
- images
- metadata
- structured data

---

# 54. Implementation Architecture

Cursor should first inspect the existing repository.

Do not immediately replace the project.

Determine:

- current framework
- frontend architecture
- backend architecture
- database
- authentication
- deployment
- existing CMS
- email integration
- analytics
- asset storage
- current routes
- existing API
- environment variables

Reuse good existing infrastructure where practical.

Avoid unnecessary technology replacement.

---

# 55. Required Implementation Phases

## Phase 1 — Audit

- repository audit
- website route audit
- content inventory
- SEO inventory
- asset inventory
- dependency review

Deliver an implementation report before destructive changes.

## Phase 2 — Information Architecture

Implement:

- 3 Core Technologies
- 3 Delivery Layers
- 6 Solutions
- Developer ecosystem

## Phase 3 — Design System

Implement:

- typography
- spacing
- colors
- buttons
- cards
- navigation
- forms
- responsive rules
- technical visual components

## Phase 4 — CMS / Data Model

Implement:

- products
- solutions
- technologies
- developer tools
- blog
- downloads
- media
- pages
- homepage
- navigation
- SEO
- leads

## Phase 5 — Admin Portal

Implement:

- authentication
- roles
- CRUD
- publishing
- media management
- relationships
- search/filter
- preview

## Phase 6 — Public Website

Implement:

- homepage
- products
- solutions
- technology
- developer
- blog
- company
- contact

## Phase 7 — SEO Migration

Implement:

- redirects
- metadata
- canonical URLs
- sitemap
- robots
- structured data
- internal links

## Phase 8 — QA

Test:

- desktop
- mobile
- forms
- authentication
- permissions
- uploads
- content publishing
- redirects
- SEO
- accessibility
- performance
- security

---

# 56. Definition of Done

The implementation is complete only when:

- NFCTEC clearly presents itself as an NFC & Secure Technology Engineering company.
- The public information architecture is centered on 3 Core Technologies.
- Hardware, Software and Cloud are delivery layers.
- Payment, Identity, Access Control, Brand Protection, Transit and IoT are solution categories.
- Security & Identity is a first-class category.
- Cryptography is explicitly included under Security & Identity.
- Cryptocurrency is not added unless supported by real NFCTEC products/services.
- Products are discoverable.
- Products are CMS-managed.
- Solutions are distinct from Technologies.
- Developer resources are easy to find.
- Existing technical content is preserved and reorganized.
- Existing valuable SEO URLs are preserved or redirected.
- Blog content is migrated.
- Downloads are manageable.
- Media is manageable.
- Homepage is CMS-managed.
- Leads are stored and manageable.
- Admin has role-based permissions.
- Admin uploads are secure.
- Public APIs expose only published content.
- Mobile layout is intentionally designed.
- Performance is strong.
- Accessibility is considered.
- SEO metadata is manageable.
- Sitemap and robots are correct.
- Internal linking uses the content relationship model.
- No unsupported marketing claims are introduced.
- The site looks like a serious international engineering company.

---

# 57. Things Cursor Must NOT Do

Do not:

1. Delete existing technical content just to simplify the homepage.
2. Turn every technology into a top-level navigation item.
3. Create separate top-level categories for Cryptography, FIDO, HSM, ePassport, PKI, etc.
4. Add Cryptocurrency/Web3 without actual NFCTEC products.
5. Build a generic SaaS-looking website.
6. Build a generic cybersecurity website.
7. Use excessive dark/cyberpunk styling.
8. Use excessive gradients.
9. Fill the site with generic stock photography.
10. Turn every section into cards.
11. Build an unnecessarily complex drag-and-drop CMS.
12. Expose admin data publicly.
13. Expose private leads.
14. Hard-code content that should be CMS-managed.
15. Hard-code navigation when it should be CMS-managed.
16. Break existing SEO URLs without redirects.
17. Invent product specifications.
18. Invent certifications.
19. Invent customers.
20. Invent partnerships.
21. Invent security guarantees.
22. Invent ratings or reviews.
23. Expose API/database secrets.
24. Make the homepage excessively long and repetitive.
25. Replace working infrastructure without first auditing it.

---

# 58. Final Brand Architecture

The final public architecture is:

```text
                         NFCTEC
                           │
          NFC & Secure Technology Engineering
                           │
             ┌─────────────┼─────────────┐
             ↓             ↓             ↓
         NFC & RF      Smart Cards   Security & Identity
                                         │
                              ┌──────────┼──────────┐
                              ↓          ↓          ↓
                         Cryptography  HSM/SE   Identity/Auth
                                         │
                           ┌─────────────┼─────────────┐
                           ↓             ↓             ↓
                       Hardware      Software        Cloud
                           │             │             │
                           └─────────────┼─────────────┘
                                         ↓
                                      Solutions
                                         │
                ┌────────┬────────┬──────┼──────┬────────┬───────┐
                ↓        ↓        ↓      ↓      ↓        ↓
             Payment  Identity  Access  Brand  Transit   IoT

                                         ↓
                                    Developer
                                         │
                         SDK / Tools / API / Docs
                                         │
                                         ↓
                               Prototype → Production
```

---

# 59. Final Visual Direction

The website should feel like:

> **A serious NFC and secure-technology engineering company that can build the complete stack — from RF and smart cards to cryptography, authentication, identity, software, hardware and cloud.**

It should NOT feel like:

> “A website containing many NFC-related technologies.”

The difference is extremely important.

The redesign is therefore about **building a coherent engineering system**, not merely making the existing website prettier.

---

# 60. Final Cursor Instruction

Cursor should implement this specification in the following order:

```text
1. Audit the existing project and website.
2. Produce a route/content/SEO inventory.
3. Identify reusable infrastructure.
4. Implement the final information architecture.
5. Implement the visual design system.
6. Implement the CMS/data model.
7. Implement the Admin Portal.
8. Migrate existing content.
9. Implement the public website.
10. Implement relationships between products, technologies,
    solutions, developer tools and articles.
11. Implement SEO migration and redirects.
12. Implement responsive behavior.
13. Implement accessibility.
14. Implement security controls.
15. Run QA.
16. Fix all critical issues.
```

Do not stop after building the homepage.

The required deliverable is the complete:

**NFCTEC Public Website + Admin/CMS Platform**

with:

- structured content
- manageable products
- manageable solutions
- manageable technologies
- manageable developer resources
- manageable blog
- manageable downloads
- manageable media
- manageable homepage
- manageable navigation
- manageable SEO
- lead management
- secure administration
- SEO-preserving migration

---

# FINAL PRINCIPLE

NFCTEC should be presented as:

> **NFC & Secure Technology Engineering**

with three clear technical foundations:

> **NFC & RF + Smart Cards + Security & Identity**

three delivery layers:

> **Hardware + Software + Cloud**

six practical solution areas:

> **Payment + Identity + Access Control + Brand Protection + Transit + IoT**

and a developer ecosystem:

> **SDK + Tools + API + Documentation + Downloads**

Everything else should fit underneath this structure.

That is the final information architecture and implementation direction for NFCTEC.
