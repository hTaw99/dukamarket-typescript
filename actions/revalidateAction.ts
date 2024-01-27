"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateAction = async (id: string) => {
  revalidatePath(`/products/[productId]`, "page");
  // revalidatePath(`/`, "page");
  revalidateTag("singleProduct");
  revalidateTag("allProducts");
  revalidateTag("reviews");
};
