import { useEffect } from "react";
import { recordPostView } from "@/lib/cms";
import type { Locale } from "@/lib/locale";

type Props = {
  locale: Locale;
  slug: string;
  initialCount: number;
};

export function PostViewCounter({ locale, slug }: Props) {
  useEffect(() => {
    recordPostView(locale, slug)
      .catch(() => {});
  }, [locale, slug]);

  return null;
}
