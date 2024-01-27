import { useGetCart } from "@/apis/cart";
import { formatPrice } from "@/lib/formatPrice";
import { BsHandbag } from "react-icons/bs";

export default function CartButton() {
  const { data: cart, isFetching: isCartFetching } = useGetCart();

  return (
    <button className="flex items-center gap-3">
      <div className="relative ">
        <BsHandbag className="w-7 h-7 md:w-8 md:h-8" />
        <span
          className={`absolute -top-2 -left-2  bg-red-500 w-5 h-5 md:h-6 md:w-6 flex justify-center items-center rounded-full`}
        >
          {cart && !("message" in cart) ? cart.totalItems : 0}
        </span>
      </div>
      <div className="hidden md:block">
        <h3 className="capitalize text-left text-neutral-400">your cart</h3>
        {isCartFetching ? (
          <p className="h-5 rounded-sm w-20 animate-pulse bg-gray-700"></p>
        ) : (
          <h2>
            {cart && !("message" in cart) ? formatPrice(cart?.totalPrice) : 0}
            <span className="ml-1 text-sm">EGP</span>
          </h2>
        )}
      </div>
    </button>
  );
}
