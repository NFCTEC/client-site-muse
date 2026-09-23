"use server";

import { redirect } from "next/navigation";
import { createLead } from "@/lib/leads";
import { str } from "@/lib/utils";

export async function submitLead(formData: FormData) {
  const locale = str(formData, "locale") === "zh" ? "zh" : "en";
  const file = formData.get("attachment");
  const result = await createLead(
    {
      name: str(formData, "name"),
      company: str(formData, "company"),
      email: str(formData, "email"),
      country: str(formData, "country"),
      projectType: str(formData, "projectType"),
      interestedProduct: str(formData, "interestedProduct"),
      message: str(formData, "message"),
    },
    file instanceof File ? file : null,
    str(formData, "website"),
  );
  if (!result.ok) redirect(`/${locale}/contact?error=${result.error}`);
  redirect(`/${locale}/contact?sent=1`);
}
