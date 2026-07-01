import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageSectionProps = {
  children: ReactNode;
  tone?: "default" | "muted";
  spacing?: "main" | "tight" | "band";
  className?: string;
  containerClassName?: string;
};

export function PageSection({
  children,
  tone = "default",
  spacing = "main",
  className,
  containerClassName,
}: PageSectionProps) {
  return (
    <section
      className={cn(
        spacing === "main" && "section-main",
        spacing === "tight" && "section-tight",
        spacing === "band" && "section-band",
        tone === "muted" && "bg-surface/40 border-y border-border",
        className,
      )}
    >
      <div className={cn("mx-auto max-w-7xl px-6 lg:px-10", containerClassName)}>{children}</div>
    </section>
  );
}
