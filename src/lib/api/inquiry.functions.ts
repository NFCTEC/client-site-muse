import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { submitInquiry as cmsSubmitInquiry } from "@/lib/cms";

const inquirySchema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  country: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator(inquirySchema)
  .handler(async ({ data }) => {
    await cmsSubmitInquiry(data);
    return { ok: true as const };
  });
