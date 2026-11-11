import { createFileRoute } from "@tanstack/react-router";

// Baidu file verification. This path must stay a 200. The /$locale route
// treats any other single segment as a language code and redirects it to /en.
const BAIDU_VERIFY = "codeva-pSQwoIXzau";

export const Route = createFileRoute("/baidu_verify_codeva-pSQwoIXzau.html")({
  server: {
    handlers: {
      GET: async () =>
        new Response(BAIDU_VERIFY, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-cache",
          },
        }),
    },
  },
});
