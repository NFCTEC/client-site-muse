import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — NFCTEC Platform" },
      { name: "description", content: "The NFCTEC issuance platform is hosted at platform.nfctec.com." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthRedirectPage,
});

const PLATFORM_URL = "https://platform.nfctec.com";

function AuthRedirectPage() {
  useEffect(() => {
    const t = window.setTimeout(() => {
      window.location.replace(PLATFORM_URL);
    }, 4000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen pt-28 pb-20 bg-hero-glow">
      <div className="mx-auto max-w-md px-6">
        <div className="rounded-2xl border border-border bg-card-gradient p-8 shadow-float text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-mono text-primary">
            <Sparkles size={12} /> Platform Moved
          </div>
          <h1 className="mt-5 font-display text-3xl tracking-tight">
            The platform lives at platform.nfctec.com
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Sign-up, sign-in, API keys, usage tracking and billing are handled on the
            dedicated NFCTEC issuance platform. You will be redirected automatically in a
            few seconds.
          </p>

          <a
            href={PLATFORM_URL}
            className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:shadow-glow-strong transition-all"
          >
            Go to platform.nfctec.com <ArrowRight size={16} />
          </a>

          <p className="mt-5 text-xs font-mono text-muted-foreground break-all">
            {PLATFORM_URL}
          </p>

          <div className="mt-7 pt-6 border-t border-border text-xs text-muted-foreground">
            If you are not redirected,{" "}
            <a href={PLATFORM_URL} className="text-primary hover:underline">
              click here
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
