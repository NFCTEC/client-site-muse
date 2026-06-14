import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, KeyRound, Activity, LogOut, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — NFCTEC" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ full_name: string | null; plan: string } | null>(null);

  useEffect(() => {
    supabase.from("profiles").select("full_name, plan").eq("id", user.id).maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user.id]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const displayName = profile?.full_name || user.email?.split("@")[0] || "there";

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-mono text-primary uppercase tracking-wider">Dashboard</p>
            <h1 className="mt-2 font-display text-4xl lg:text-5xl tracking-tight">
              Welcome, {displayName}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-mono text-primary uppercase">
              <ShieldCheck size={12} /> {profile?.plan ?? "free"} plan
            </span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm hover:border-primary/50 transition-colors"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: CreditCard, label: "Cards Issued", value: "0", hint: "this month" },
            { icon: Activity, label: "Verifications", value: "0", hint: "this month" },
            { icon: KeyRound, label: "API Keys", value: "0", hint: "active" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-2xl border border-border bg-card-gradient p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 grid place-items-center">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">{s.hint}</span>
                </div>
                <div className="text-3xl font-display font-semibold">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card-gradient p-8 text-center">
          <h2 className="font-display text-2xl">Get started</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Generate your first API key and start issuing NFC cards in minutes. Need more capacity? Upgrade anytime.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:shadow-glow-strong transition-all">
              Generate API key
            </button>
            <Link to="/pricing" className="rounded-full border border-border bg-surface/50 px-5 py-2.5 text-sm font-semibold hover:border-primary/50 transition-colors">
              View plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
