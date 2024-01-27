import React from "react";
import Link from "next/link";
import Price from "@/components/utils/Price";
import Sale from "@/components/utils/Sale";
import CustomImage from "@/components/utils/CustomImage";
import { type TGetProductsReturn } from "@/types/products";

const CategoryProduct = ({
  _id,
  images,
  name,
  price,
  description,
  priceAfterDiscount,
}: TGetProductsReturn["products"][number]) => {
  return (
    <div className=" bg-white p-6">
      <Sale priceAfterDiscount={priceAfterDiscount} price={price} />
      <Link
        href={`/products/${_id}`}
        className="flex justify-center items-center w-52 h-52  aspect-square m-auto"
        aria-label="Top seller product"
      >
        <CustomImage
          className="w-4/5 aspect-square cursor-pointer hover:scale-110"
          src={images[0]}
          width={500}
          height={500}
        />
      </Link>
      <div className="flex flex-col gap-2 py-6 my-6 border-b">
        <h1 className="text-blue-700 font-semibold capitalize">{name}</h1>
        <Price price={price} priceAfterDiscount={priceAfterDiscount} />
      </div>
      <div>{description}</div>
    </div>
  );
};

export default CategoryProduct;
