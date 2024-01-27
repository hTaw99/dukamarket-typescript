"use client";

import { addProductToCompare } from "@/store/features/compareSlice";
import { openCompareModel } from "@/store/features/modelSlice";
import { BiLayer } from "react-icons/bi";
import { TProduct } from "@/types/products";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

type CompareButtonProp = Omit<
  TProduct<{ _id: string; name: string }>,
  | "createdAt"
  | "updatedAt"
  | "brand"
  | "category"
  | "subCategory"
  | "featured"
  | "user"
  | "freeShipping"
  | "quantity"
  | "sizes"
  | "sold"
  | "slug"
>;

const CompareButton = ({
  name,
  images,
  price,
  _id,
  description,
  colors,
  priceAfterDiscount,
  averageRating,
  numReviews,
}: CompareButtonProp) => {
  const dispatch = useAppDispatch();
  const { productsToCompare } = useAppSelector((state) => state.compare);
  const selectedProduct = productsToCompare?.find((p) => p.sku === _id);

  let obj = {
    image: images[0],
    name,
    sku: _id,
    description,
    price: priceAfterDiscount ? priceAfterDiscount : price,
    colors: colors,
    "numbers of reviews": `${numReviews} Reviews`,
    "average rating": averageRating,
  };

  return (
    <button
      onClick={() => {
        dispatch(addProductToCompare(obj));
        dispatch(openCompareModel());
      }}
      className="relative group/compare"
    >
      <div
        className={`bg-gray-100 rounded-md p-2 ${
          selectedProduct ? "bg-primary text-white" : "bg-gray-100"
        } hover:bg-primary hover:text-white cursor-pointer`}
      >
        <BiLayer size={24} />
      </div>
      <span className="bg-gray-500 text-white absolute top-8 right-[43px] -translate-y-full whitespace-nowrap  invisible opacity-0 px-2 py-1 text-sm rounded-md group-hover:visible group-hover/compare:opacity-100 transition pointer-events-none">
        Compare
      </span>
    </button>
  );
};

export default CompareButton;
