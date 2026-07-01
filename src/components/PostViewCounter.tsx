import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { formatViewCount, recordPostView } from "@/lib/cms";
import type { Locale } from "@/lib/locale";

type Props = {
  locale: Locale;
  slug: string;
  initialCount: number;
};

export function PostViewCounter({ locale, slug, initialCount }: Props) {
  const [viewCount, setViewCount] = useState(initialCount);

  useEffect(() => {
    recordPostView(locale, slug)
      .then((res) => setViewCount(res.viewCount))
      .catch(() => {});
  }, [locale, slug]);

  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
      <Eye size={12} /> {formatViewCount(viewCount, locale)}
    </span>
  );
}
