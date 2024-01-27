import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { clearHistory } from "@/store/features/recentlyViewedProductsSlice";
import { TGetProductsReturn } from "@/types/products";
import CustomImage from "@/components/utils/CustomImage";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import React, { SetStateAction } from "react";

export default function SearchList({
  debouncedValue,
  pages,
  setIsListOpen,
  isFetching,
}: {
  debouncedValue: string;
  pages: TGetProductsReturn[] | undefined;
  setIsListOpen: (value: SetStateAction<boolean>) => void;
  isFetching: boolean;
}) {
  const dispatch = useAppDispatch();
  const { recentlyViewedProducts } = useAppSelector((state) => state.history);
  const clearHistoryHandler = () => {
    dispatch(clearHistory());
  };

  const isQueryFound = debouncedValue !== "";
  const isViewedProductFound = recentlyViewedProducts?.length !== 0;
  const isDataFound = !!(pages && pages?.[0].products.length !== 0);

  if (isDataFound) {
    return (
      <div className=" z-50  absolute left-0 max-h-96 w-full overflow-auto rounded-br-md rounded-bl-md bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {pages?.[0]?.products?.map((p) => (
          <li
            key={p._id}
            className={`hover:bg-slate-100 relative p-6 cursor-default select-none`}
          >
            <Link
              onClick={() => setIsListOpen(false)}
              href={`products/${p._id}`}
            >
              <div className=" flex gap-4">
                <div className="w-[60px] h-[60px] flex justify-center aspect-square ">
                  <CustomImage
                    src={p.images[0]}
                    alt=""
                    width={300}
                    height={300}
                    className="mix-blend-multiply w-[80%] aspect-square object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2  text-sm ">
                  <h1 className="text-blue-700 font-semibold capitalize block line-clamp-2">
                    {p.name}
                  </h1>

                  <h1 className="text-red-500 font-semibold capitalize">
                    {formatPrice(p.price)}
                    <span className="font-normal"> EGP</span>
                  </h1>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </div>
    );
  } else {
    if (isQueryFound && !isFetching) {
      return (
        <div className=" z-50  absolute left-0 max-h-96 w-full overflow-auto rounded-br-md rounded-bl-md bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <p className=" relative cursor-default select-none p-6 capitalize text-gray-700">
            nothing found
          </p>
        </div>
      );
    }

    if (isViewedProductFound) {
      return (
        <div className=" z-50  absolute left-0 max-h-96 w-full overflow-auto rounded-br-md rounded-bl-md bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <div className="text-xs capitalize text-neutral-500  p-6 flex justify-between">
            <p className=" ">recently viewed products </p>
            <button
              type="button"
              onClick={clearHistoryHandler}
              className="underline"
            >
              clear
            </button>
          </div>
          <ul>
            {recentlyViewedProducts?.map((product) => (
              <li
                key={product._id}
                className={` relative p-6 pt-0 cursor-default select-none`}
              >
                <div className=" flex gap-4">
                  <div className="w-[60px] p-2 h-[60px] border rounded-md  border-gray-300 flex justify-center aspect-square ">
                    <CustomImage
                      src={product.images[0]}
                      width={200}
                      height={200}
                      className=" mix-blend-multiply w-[80%] aspect-square object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-1  text-sm ">
                    <Link
                      onClick={() => setIsListOpen(false)}
                      href={`/products/${product._id}`}
                      className="text-gray-700 hover:underline font-semibold capitalize block line-clamp-2"
                    >
                      {product.name}
                    </Link>

                    <h1 className="text-gray-500 capitalize">
                      {formatPrice(product.price)}
                      <span className="font-normal"> EGP</span>
                    </h1>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className=" z-50  absolute left-0 max-h-96 w-full overflow-auto rounded-br-md rounded-bl-md bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <div className="text-xs capitalize text-neutral-500  p-6 flex justify-between">
          <p className=" ">recently viewed products </p>
          <button
            type="button"
            onClick={clearHistoryHandler}
            className="underline"
          >
            clear
          </button>
        </div>
      </div>
    );
  }
}
