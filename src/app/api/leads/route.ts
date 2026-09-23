import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads";
import { str } from "@/lib/utils";

export async function POST(req: Request) {
  const type = req.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return NextResponse.json({ ok: false }, { status: 400 });
    const result = await createLead(body, null, String((body as { website?: string }).website || ""));
    if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: result.error === "rate" ? 429 : 400 });
    return NextResponse.json({ ok: true });
  }
  const form = await req.formData();
  const file = form.get("attachment");
  const result = await createLead(
    {
      name: str(form, "name"),
      company: str(form, "company"),
      email: str(form, "email"),
      country: str(form, "country"),
      projectType: str(form, "projectType"),
      interestedProduct: str(form, "interestedProduct"),
      message: str(form, "message"),
    },
    file instanceof File ? file : null,
    str(form, "website"),
  );
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: result.error === "rate" ? 429 : 400 });
  return NextResponse.json({ ok: true });
}
