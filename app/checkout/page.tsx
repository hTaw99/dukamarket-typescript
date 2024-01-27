"use client";

import BillingAddress from "./components/BillingAddress";
import Delivery from "./components/Delivery";
import Confirmation from "./components/Confirmation";
import { useGetCart } from "@/apis/cart";
import { useAppSelector } from "@/hooks/redux";
import { redirect, usePathname } from "next/navigation";

const Checkout = () => {
  const { step } = useAppSelector((state) => state.checkout);
  const isAuthenticated = useAppSelector(
    (state) => state.auth.user.isAuthenticated
  );
  const pathname = usePathname();

  if (!isAuthenticated) {
    redirect(`/login?from=${pathname}`);
  }
  const { data: cart } = useGetCart();

  const stepsComponents = {
    1: <BillingAddress />,
    2: <Delivery />,
    3: <Confirmation />,
  };

  return (
    <div className="container bg-white p-6 h-screen xl:w-3/5 2xl:w-2/5 mx-auto ">
      {/* <header className="mb-16 ">
        <nav className="text-white bg-gray-800 rounded-b-lg p-8 flex items-center justify-between">
          <Link href="/" className="w-36">
            <img src="/images/logo.svg" alt="Dujamarket logo" />
          </Link>
          <Link href="/" className="text-xs underline capitalize">
            continue shoping
          </Link>
        </nav>
      </header> */}

      {/* <p className="text-sm">
          There is no shoppingcart available. Add products to the shopping cart
          in the store.
        </p>
       */}

      {cart && "message" in cart ? (
        <h1>Your cart is Empty</h1>
      ) : (
        <div className="flex flex-col gap-6">{stepsComponents[step]}</div>
      )}
    </div>
  );
};

export default Checkout;
