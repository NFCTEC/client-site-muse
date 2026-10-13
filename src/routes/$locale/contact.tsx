import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { fetchDisplayConfig } from "@/lib/cms";
import { isModuleEnabled } from "@/lib/display-config";
import type { Locale } from "@/lib/locale";

// Layout only. The printed support page is contact.index. Factory inquiries live at /inquiry.
export const Route = createFileRoute("/$locale/contact")({
  loader: async ({ params }) => {
    const config = await fetchDisplayConfig(params.locale as Locale);
    if (!isModuleEnabled(config, "contact")) throw notFound();
    return {};
  },
  component: () => <Outlet />,
});
