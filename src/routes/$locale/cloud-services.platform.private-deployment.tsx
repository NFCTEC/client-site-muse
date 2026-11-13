import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/cloud-services/platform/private-deployment")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/$locale/inquiry", params: { locale: params.locale } });
  },
});
