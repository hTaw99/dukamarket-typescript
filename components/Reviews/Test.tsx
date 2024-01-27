import { baseURL } from "@/apis/AppClient";
import { getProduct } from "@/apis/products";
import RatingStars from "@/components/utils/RatingStars";
import { wait } from "@/lib/wait";
import { unstable_noStore } from "next/cache";
import React from "react";

export default async function Test({ productId }: { productId: string }) {
  const { product } = await getProduct(productId, "onServer");

  return (
    <>
      <div>
        <h1 className="md:text-lg text-neutral-700">
          {product?.averageRating.toFixed(1)} <span className="">out of 5</span>
        </h1>
        <h3 className="text-xs md:text-sm text-gray-500">
          {product?.numReviews} Reviews
        </h3>
      </div>
      <div className="flex  text-yellow-500 ">
        <RatingStars size={24} averageRating={product?.averageRating} />
      </div>
    </>
  );
}
