import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route: no head() here to avoid duplicating canonical/hreflang from child leaves.
export const Route = createFileRoute("/$locale/products")({
  component: () => <Outlet />,
});
