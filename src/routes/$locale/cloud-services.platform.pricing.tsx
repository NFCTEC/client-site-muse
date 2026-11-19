import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/cloud-services/platform/pricing")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$locale/cloud-services/platform",
      params: { locale: params.locale },
      statusCode: 301,
    });
  },
});
