"use client";

import { useAddToCart } from "@/apis/cart";
import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";
import { TProduct } from "@/types/products";
import { Button } from "../ui/button";

type AddToCartButtonProp = {
  amount?: number;
  colorId: string;
  productId: TProduct<string>["_id"];
};

const AddToCartButton = ({
  amount = 1,
  colorId,
  productId,
}: AddToCartButtonProp) => {
  const { mutate: addToCart, isPending, isSuccess } = useAddToCart();
  const [isAddedEnd, setIsAddedEnd] = useState(false);


  useEffect(() => {
    setIsAddedEnd(false);
    if (isSuccess) {
      const id = setTimeout(() => setIsAddedEnd(true), 500);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isSuccess]);

  return (
    <Button
      onClick={() =>
        addToCart({
          amount: amount,
          color: colorId,
          productId,
        })
      }
      className={` w-full relative flex justify-center items-center capitalize flex-1`}
    >
      {isPending ? (
        <FaCircle size={10} className=" animate-bounced" />
      ) : isSuccess && !isAddedEnd ? (
        <>
          <BsCheck size={24} className="absolute" />
        </>
      ) : (
        <span>add to cart</span>
      )}
    </Button>
  );
};

export default AddToCartButton;
