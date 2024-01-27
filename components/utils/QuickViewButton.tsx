"use client";

import { openQuickViewModel } from "@/store/features/modelSlice";
import { setProductToView } from "@/store/features/quickViewSlice";
import { AiOutlineEye } from "react-icons/ai";
import { TProduct } from "@/types/products";
import { useAppDispatch } from "@/hooks/redux";
import { Button } from "../ui/button";

type GeneralProp = {
  icon?: boolean;
};

type QuickViewButtonProp = Omit<
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

const QuickViewButton = ({
  name,
  images,
  price,
  _id,
  description,
  colors,
  priceAfterDiscount,
  averageRating,
  numReviews,
  icon = false,
}: GeneralProp & QuickViewButtonProp) => {
  const dispatch = useAppDispatch();

  const quickViewHandler = () => {
    dispatch(openQuickViewModel());

    dispatch(
      setProductToView({
        name,
        images,
        price,
        _id,
        description,
        colors,
        priceAfterDiscount,
        averageRating,
        numReviews,
      })
    );
  };
  return (
    <>
      {icon ? (
        <button onClick={quickViewHandler} className="relative group/quickview">
          <div className="bg-gray-100 rounded-md p-2 hover:bg-primary hover:text-white cursor-pointer">
            <AiOutlineEye size={24} />
          </div>
          <span className="bg-gray-500 text-white absolute z-50 top-8 right-[43px] -translate-y-full whitespace-nowrap  invisible opacity-0 px-2 py-1 text-sm rounded-md group-hover/quickview:visible group-hover/quickview:opacity-100 transition pointer-events-none">
            Quick View
          </span>
        </button>
      ) : (
        <Button onClick={quickViewHandler} variant={"outline"}>
          Quick view
        </Button>
      )}
    </>
  );
};

export default QuickViewButton;
