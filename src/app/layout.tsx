import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "NFCTEC",
  description: "NFC & Secure Technology Engineering",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") || "";
  const lang = pathname.startsWith("/zh") || pathname.startsWith("/admin") ? "zh" : "en";
  return (
    <html lang={lang}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
