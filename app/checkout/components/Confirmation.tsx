import { usePay } from "@/apis/visa";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setStep } from "@/store/features/checkoutSlice";
import { FaCircle } from "react-icons/fa";

const Confirmation = () => {
  const { myAddress } = useAppSelector((state) => state.checkout);
  const dispatch = useAppDispatch();
  const { mutate: pay, isPending } = usePay();

  return (
    <>
      <div className="text-gray-700 p-2 rounded-md bg-gray-100">
        <h1 className="font-semibold">Billing and Shipping Address</h1>
      </div>
      <div className="text-gray-700 p-2 rounded-md bg-gray-100">
        <h1 className="font-semibold">Delivery and cash</h1>
      </div>
      <section className="border border-gray-300 rounded-lg ">
        <div className="text-white p-2 rounded-t-lg bg-gray-800">
          <h1 className="font-semibold">Review and confirm</h1>
        </div>
        <div className=" p-10">
          <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* <div className="flex flex-col gap-2">
                <h1 className="font-bold">Billing Address</h1>
                <div className="rounded-md border border-gray-300 p-4">
                  <p className="capitalize">
                    <span className="font-semibold">name:</span>
                    {myShippingAddress.fullname}
                  </p>
                  <p>
                    <span className="font-semibold">Mobile:</span>
                    {myShippingAddress.mobileNumber}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>
                    {myShippingAddress.address}
                  </p>
                  {myShippingAddress.buildingName && (
                    <p>
                      <span className="font-semibold">Building name:</span>
                      {myShippingAddress.buildingName}
                    </p>
                  )}
                  {myShippingAddress.apartmentNumber && (
                    <p>
                      <span className="font-semibold">Apartment No.:</span>
                      {myShippingAddress.apartmentNumber}
                    </p>
                  )}

                  {myShippingAddress.floorsNumber && (
                    <p>
                      <span className="font-semibold">Floors No.:</span>
                      {myShippingAddress.floorsNumber}
                    </p>
                  )}
                </div>
              </div> */}

            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Shipping Address</h1>
              <div className="rounded-md border border-gray-300 p-4">
                <p className="capitalize">
                  <span className="font-semibold">name:</span>
                  {myAddress?.fullname}
                </p>
                <p>
                  <span className="font-semibold">Mobile:</span>
                  {myAddress?.phone}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>
                  {myAddress?.street}
                </p>
                {myAddress?.building && (
                  <p>
                    <span className="font-semibold">Building name:</span>
                    {myAddress?.building}
                  </p>
                )}
                {!!myAddress?.apartment && (
                  <p>
                    <span className="font-semibold">Apartment No.:</span>
                    {myAddress?.apartment}
                  </p>
                )}
                {!!myAddress?.floor && (
                  <p>
                    <span className="font-semibold">Floors No.:</span>
                    {myAddress?.floor}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Delivery date and time</h1>
              <div className="rounded-md border h-full border-gray-300 p-4">
                <p className="capitalize">
                  <span className="font-semibold">Delivery Date:</span>
                  Monday, 19/06/2023
                </p>
                <p>
                  <span className="font-semibold">Delivery Time:</span> 10:00 AM
                  - 06:00 PM
                </p>
              </div>
            </div>
          </div>

          <h1 className="mb-8 text-xs text-gray-800">
            By clicking the &quot;Continue with the Payment&quot; you indicate
            that you agree to{" "}
            <span className="text-red-500">Terms and Conditions</span>
          </h1>

          <div className="justify-between flex items-center">
            <Button onClick={() => dispatch(setStep(2))} variant={"secondary"}>
              Back
            </Button>

            <Button
              onClick={() => {
                if (myAddress) {
                  pay(myAddress._id);
                }
              }}
            >
              {isPending ? (
                <div className="flex justify-center items-center w-full">
                  <FaCircle size={10} className=" animate-bounced" />
                </div>
              ) : (
                "Continue with payment"
              )}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Confirmation;
