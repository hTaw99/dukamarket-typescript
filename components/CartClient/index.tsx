"use client";

import React from "react";
import Link from "next/link";
import CartItem from "@/components/CartItem";
import { formatPrice } from "@/lib/formatPrice";
import { useGetCart } from "@/apis/cart";
import imgCart from "@/assets/noCartFound.svg";
import CustomImage from "@/components/utils/CustomImage";

const CartClient = () => {
  const { data: cart } = useGetCart();

  return (
    <>
      <div className="bg-white rounded-md p-6 ">
        <h1 className="text-2xl capitalize font-semibold text-gray-800 mb-6">
          your cart
        </h1>
        <div className="flex justify-between items-center pb-4 border-b border-gray-300 mb-4">
          <p className="text-gray-400">
            {cart && !("message" in cart) ? cart?.totalItems : 0} items in total
          </p>
          {/* <span>
            Total Price: {formatPrice(cart?.totalPrice)}{" "}
            <span className="ml font-medium text-sm">EGP</span>
          </span> */}
        </div>

        {(cart && "message" in cart) || !cart ? (
          <div className="flex flex-col mt-8 gap-4 justify-center items-center">
            <CustomImage
              src={imgCart}
              width={500}
              height={500}
              className="w-1/12 "
              alt="SVG logo image"
            />
            <h1 className="text-gray-800 text-center">Your cart is empty</h1>
          </div>
        ) : (
          <div className="grid gap-4">
            {cart?.items.map((cartItem) => (
              <CartItem key={cartItem._id} {...cartItem} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-md p-6 flex flex-col justify-between h-max">
        <h1 className="text-2xl capitalize font-semibold text-gray-800 pb-4 border-b mb-4">
          cart summary
        </h1>

        <div className="capitalize flex justify-between items-center mb-2">
          <p>products</p>
          <span>
            {cart && !("message" in cart) ? formatPrice(cart?.totalPrice) : 0}{" "}
            EGP
          </span>
        </div>
        <div className="text-sm text-gray-400 pb-4 border-b border-gray-300 mb-4">
          Shipping and taxes calculated at checkout.
        </div>
        <div className="flex text-red-500 justify-between font-semibold items-center capitalize mb-4">
          <p className="text-black">Sub-total inc. VAT</p>
          <span className="font-semibold text-lg">
            {cart && !("message" in cart) ? formatPrice(cart.totalPrice) : 0}{" "}
            EGP
          </span>
        </div>
        <Link
          href="/checkout"
          className={`text-center capitalize font-medium ${
            (cart && "message" in cart) || !cart
              ? "bg-gray-200 text-gray-400 pointer-events-none"
              : "bg-red-500 text-white"
          } py-3 rounded-md`}
        >
          proceed to checkout
        </Link>
      </div>
    </>
  );
};

export default CartClient;
