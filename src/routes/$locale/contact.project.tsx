import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/contact/project")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/$locale/inquiry", params: { locale: params.locale } });
  },
});
