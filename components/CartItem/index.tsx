"use client";

import { type TCart } from "@/types/cart";
import { useRemoveItemFromCart } from "@/apis/cart";
import CustomImage from "@/components/utils/CustomImage";
import { BiTrash } from "react-icons/bi";
import Price from "@/components/utils/Price";
import IncreaseDecreaseButtons from "@/components/utils/IncreaseDecreaseButtons";
import { Button } from "@/components/ui/button";

const CartItem = ({
  amount,
  product,
  totalProductPrice,
  selectedColor,
  _id,
}: TCart["items"][number]) => {
  const { mutate: removeItemFromCart } = useRemoveItemFromCart();

  return (
    <div className=" p-4 pb-8 border-b border-gray-300 flex gap-4">
      <div className="h-24 w-24 flex justify-center items-center flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <CustomImage
          src={product?.images?.[0]}
          width={500}
          height={500}
          className="object-cover p-2 max-w-[90%]"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex justify-between gap-8  items-start mb-4">
          <div className="flex flex-col ">
            <h1 className="text-gray-800 lg:text-lg line-clamp-2 md:line-clamp-3 font-semibold">
              {product.name}
            </h1>
            <span className="capitalize text-gray-500 font-light">
              {selectedColor.name}
            </span>
          </div>
          <Button
            onClick={() => {
              removeItemFromCart(_id);
            }}
            size={"icon"}
            variant={"ghost"}
          >
            <BiTrash size={24} />
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <IncreaseDecreaseButtons
            onDecrease={() => 1 + 1}
            onIncrease={() => 1 + 1}
            itemAmount={amount}
          />
          <Price
            className="mb-0"
            price={totalProductPrice}
            priceAfterDiscount={0}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
