/**
 * Push solution SEO fields to CMS when you have an admin token.
 * Frontend already fills empty CMS fields from src/lib/solutions-content.ts.
 * Once CMS has a non-empty `body`, the local overlay stops overriding copy.
 *
 *   $env:CMS_ADMIN_TOKEN="..."
 *   $env:CMS_API_URL="https://admin.nfctec.com/api"
 *   node scripts/sync-solutions-cms.mjs
 */
const API = (process.env.CMS_API_URL || "https://admin.nfctec.com/api").replace(/\/$/, "");
const TOKEN = process.env.CMS_ADMIN_TOKEN || "";

if (!TOKEN) {
  console.log("No CMS_ADMIN_TOKEN. Skip CMS sync. Local overlay still applies after deploy.");
  process.exit(0);
}

console.log("CMS sync is opt-in. Map slugs to IDs and PATCH seoTitle, intro, deliverables, workflow, faqs, body.");
console.log("API", API);
