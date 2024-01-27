"use server";

import { baseURL } from "@/apis/AppClient";
import { TReview } from "@/types/reviews";
import { revalidateTag } from "next/cache";

export const addReview = async (data: TReview, accessToken: string) => {
  try {
    const resReviews = await fetch(`${baseURL}/review`, {
      next: { tags: ["reviews"], revalidate: 10 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const res = await resReviews.json();
    revalidateTag("singleProduct");
    revalidateTag("reviews");
    return res;
  } catch (err) {
    return err;
  }
};
