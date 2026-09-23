import { revalidatePath } from "next/cache";

export function revalidatePublic() {
  revalidatePath("/", "layout");
}
