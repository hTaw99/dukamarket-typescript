"use client";

import { type TProduct } from "@/types/products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

type PriceProp = Pick<
  TProduct<{ id: string; name: string }>,
  "priceAfterDiscount" | "price"
> & { isForPage?: boolean } & HtmlHTMLAttributes<HTMLDivElement>;

const Price = ({
  priceAfterDiscount,
  price,
  isForPage = false,
  className,
}: PriceProp) => {
  return (
    <div className={cn("flex items-center flex-wrap gap-2 mb-4", className)}>
      <span
        className={`text-neutral-900 font-semibold flex justify-start gap-1 ${
          isForPage ? "text-2xl lg:text-3xl" : "text-xl"
        }`}
      >
        <span className="text-base font-medium">EGP</span>
        {formatPrice(priceAfterDiscount || price)}
      </span>
      {priceAfterDiscount ? (
        <p className="text-neutral-500  text-lg line-through flex items-start gap-1">
          {formatPrice(price)}
        </p>
      ) : undefined}
    </div>
  );
};

export default Price;
