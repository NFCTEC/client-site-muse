"use client";

import { useEffect } from "react";

export function TrackView({ name }: { name: string }) {
  useEffect(() => {
    const path = window.location.pathname;
    fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, path }),
      keepalive: true,
    }).catch(() => undefined);
  }, [name]);
  return null;
}
