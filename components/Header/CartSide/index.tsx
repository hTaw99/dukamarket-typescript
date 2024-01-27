"use client";

import { useGetCart } from "@/apis/cart";
import { formatPrice } from "@/lib/formatPrice";
import imgCart from "@/assets/noCartFound.svg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CustomImage from "@/components/utils/CustomImage";
import Link from "next/link";
import CartButton from "./CartButton";
import CartItem from "@/components/CartItem";

export default function CartSide() {
  //  #####################################################
  const { data: cart } = useGetCart();
  //  #####################################################

  return (
    <Sheet>
      <SheetTrigger>
        <CartButton />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {!cart || "message" in cart ? (
            <div className="flex flex-col gap-4 justify-center items-center">
              <CustomImage
                src={imgCart}
                width={500}
                height={500}
                className=" w-1/5"
                alt="No products found in cart"
              />
              <h1 className="text-gray-800 text-center">
                No products found in cart
              </h1>
            </div>
          ) : (
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart?.items?.map((item) => (
                <CartItem key={item._id} {...item} />
              ))}
            </ul>
          )}
        </div>
        <SheetFooter className="mt-auto block">
          <div className="border-t border-gray-200 py-6">
            <div className="flex justify-between gap-2  text-base font-medium text-gray-900">
              <div>
                <p>Subtotal</p>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
              <p className="px-4 py-2 border rounded-md self-start">
                {cart && !("message" in cart)
                  ? formatPrice(cart?.totalPrice)
                  : 0}
                <span className="ml-1 font-medium text-sm">EGP</span>
              </p>
            </div>

            <div className="mt-6 justify-between flex gap-4">
              <SheetClose asChild>
                <Button className="flex-1" asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild className="flex-1" variant={"outline"}>
                  <Link href="/cart">View Cart</Link>
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
