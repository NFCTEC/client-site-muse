import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Industry Solutions — NFCTEC" },
      { name: "description", content: "End-to-end NFC solutions for banking, transit, government, IoT, brand protection and more." },
      { property: "og:title", content: "Industry Solutions — NFCTEC" },
      { property: "og:description", content: "Proven NFC playbooks across 11 industries." },
      { property: "og:url", content: "https://www.nfctec.com/solutions" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://www.nfctec.com/solutions" }],
  }),
  component: () => <Outlet />,
});
