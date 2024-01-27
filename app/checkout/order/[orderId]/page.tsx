"use client";
import useSearchQuery from "@/hooks/useQuery";
import { formatPrice } from "@/lib/formatPrice";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useGetCart } from "@/apis/cart";
import CustomImage from "@/components/utils/CustomImage";

const AfterPayment = ({ params }: { params: { orderId: string } }) => {
  // #########################################
  const { data: cart } = useGetCart();
  // #########################################

  const query = useSearchQuery();
  const { orderId } = params;

  return (
    <div className=" container ">
      {query.get("validation") === "true" ? (
        query.get("success") === "true" ? (
          <div className="mb-8 flex items-start gap-4">
            <AiOutlineCheckCircle size={32} className=" text-green-600" />
            <div className="flex flex-col gap-2">
              <h1 className="text-green-600  capitalize text-3xl font-semibold">
                Your Order payement is successfully
              </h1>
              <span className="text-gray-500  text-3xl">
                Order reference :
                <span className="font-semibold">{orderId}</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-8 flex items-start gap-4">
            <AiOutlineCloseCircle size={32} className=" text-red-500" />
            <div className="flex flex-col gap-2">
              <h1 className="text-red-500  capitalize text-3xl font-semibold">
                Your Order Has Payment Failure
              </h1>
              <span className="text-gray-500  text-3xl">
                Order reference :
                <span className="font-semibold">{orderId}</span>
              </span>
            </div>
          </div>
        )
      ) : (
        <div>unknown error is happen</div>
      )}

      <div className="py-4 px-10 mb-8">
        {cart &&
          !("message" in cart) &&
          cart?.items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-4 pb-4 border-b border-gray-300 "
            >
              <div className="flex justify-center items-center gap-4">
                <div className=" w-[60px] p-2 h-[60px] border rounded-md border-gray-300 flex justify-center aspect-square">
                  <CustomImage
                    src={item.product.images[0]}
                    width={500}
                    height={500}
                    className="mix-blend-multiply w-[80%] aspect-square object-contain"
                  />
                </div>
                <div className="text-sm ">
                  <h1 className="line-clamp-1">{`${item.amount} X ${item.product.name}`}</h1>
                  <span className="font-bold">
                    {item.product.priceAfterDiscount
                      ? formatPrice(item.product.priceAfterDiscount)
                      : formatPrice(item.product.price)}
                    EGP
                  </span>
                </div>
              </div>
              <span className="font-bold text-sm">
                {formatPrice(item.totalProductPrice)} EGP
              </span>
            </div>
          ))}

        <div className="text-sm w-1/4 ml-auto">
          <div className="flex justify-between">
            <h1>Item Sub-Total:</h1>
            <span>
              {" "}
              {cart && !("message" in cart)
                ? formatPrice(cart.totalPrice)
                : 0}{" "}
              EGP
            </span>
          </div>
          <div className="flex justify-between">
            <h1>Shipping: </h1>
            <span>
              {cart && !("message" in cart) ? formatPrice(cart.shippingFee) : 0}{" "}
              EGP
            </span>
          </div>
          <div className="flex justify-between">
            <h1>Order Total:</h1>
            <span className="font-bold">
              {cart && !("message" in cart)
                ? formatPrice(cart.totalPrice + cart.shippingFee)
                : 0}{" "}
              EGP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterPayment;
