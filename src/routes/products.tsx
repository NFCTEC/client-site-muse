import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Software & Hardware | NFCTEC" },
      { name: "description", content: "Software SDKs, JavaCard applets, EMV kernels and certified hardware — readers, terminals, smart cards, antennas." },
      { property: "og:title", content: "Products — NFCTEC" },
      { property: "og:description", content: "Full-stack NFC software and hardware." },
    ],
  }),
  component: () => <Outlet />,
});
