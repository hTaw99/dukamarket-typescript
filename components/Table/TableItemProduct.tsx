import React, { useEffect, useState } from "react";
import CustomImage from "../utils/CustomImage";
import Link from "next/link";
import { Button } from "../ui/button";
import RatingStars from "../utils/RatingStars";
import Colors from "../utils/Colors";
import { AiOutlineClose } from "react-icons/ai";
import AddToCartButton from "../utils/AddToCartButton";
import { TProductToCompare } from "@/types/products";
import { useAppDispatch } from "@/hooks/redux";
import { closeCompareModel } from "@/store/features/modelSlice";
import { removeProductFromCompare } from "@/store/features/compareSlice";
import { formatPrice } from "@/lib/formatPrice";

export default function TableItemProduct({
  product,
  field,
}: {
  product: TProductToCompare;
  field: { id: number; name: string };
}) {
  const dispatch = useAppDispatch();
  const [colorChoosed, setColorChoosed] = useState(product.colors?.[0]);

  return field.name === "image" ? (
    <td key={product?.sku} className=" border-b border-slate-300 p-4">
      <div className="p-4 rounded-md ">
        <div className="flex gap-4 items-start">
          <div className="w-[125px] h-[125px] flex justify-center aspect-square bg-slate-100 p-4 rounded-md ">
            <CustomImage
              width={100}
              height={100}
              src={product?.[field?.name]}
              className="w-full mix-blend-multiply  object-contain "
              alt="product img"
            />
          </div>
          <div className="flex flex-col justify-between gap-8">
            <div className="flex  justify-between items-start">
              <Link
                href={`/products/${product?.sku}`}
                onClick={() => dispatch(closeCompareModel())}
                className="hover:text-red-500 text-gray-700 font-semibold capitalize text-base line-clamp-2"
              >
                {product?.name}
              </Link>
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() =>
                  dispatch(
                    removeProductFromCompare({
                      sku: product.sku,
                    })
                  )
                }
              >
                <AiOutlineClose size={20} />
              </Button>
            </div>
            <AddToCartButton
              colorId={colorChoosed._id}
              productId={product.sku}
            />
          </div>
        </div>
      </div>
    </td>
  ) : field.name === "average rating" ? (
    <td
      key={product?.sku}
      className=" text-yellow-500 border-b border-slate-300  p-4"
    >
      <div className="flex">
        <RatingStars averageRating={product?.[field.name]} />
      </div>
    </td>
  ) : field.name === "price" ? (
    <td
      key={product?.sku}
      className={` w-[400px]  bg-white p-6  border-b  border-slate-300`}
    >
      {formatPrice(product?.[field.name])} EGP
    </td>
  ) : field.name === "colors" ? (
    <td className="w-[400px] bg-white p-6  border-b  border-slate-300">
      <Colors
        setColorChoosed={setColorChoosed}
        colorChoosed={colorChoosed.name}
        colors={product.colors}
      />
    </td>
  ) : (
    <td className="w-[400px]  bg-white p-6  border-b  border-slate-300">
      {
        product?.[
          field.name as keyof Omit<
            TProductToCompare,
            "price" | "colors" | "average rating" | "image"
          >
        ]
      }
    </td>
  );
}
