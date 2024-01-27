import { useState } from "react";
import { setMyAddress, setStep } from "@/store/features/checkoutSlice";

// Apis
import {
  useCreateAddress,
  useDeleteAddress,
  useGetAddress,
} from "@/apis/address";

//Icons
import { BiTrash } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";

// Components
import AddressForm from "./AddressForm";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/button";

const BillingAddress = () => {
  const { mutate: deleteAddress } = useDeleteAddress();
  const { data, isPending, isError, error } = useGetAddress();

  if (isError) {
    throw error;
  }

  const dispatch = useAppDispatch();
  const { myAddress } = useAppSelector((state) => state.checkout);

  const [isAddingNewAddressFormOpened, setIsAddingNewAddressFormOpened] =
    useState(false);
  const [isNoAddressSelected, setIsNoAddressSelected] = useState(false);

  return (
    <>
      <section className="border border-gray-300 rounded-md">
        <div className="text-white p-2 rounded-t-md bg-gray-800">
          <h1 className="font-semibold">Billing and Shipping Address</h1>
        </div>
        <div className="p-8">
          {isPending ? (
            <div className="w-full flex justify-center items-center h-64">
              <FaCircle size={10} className=" animate-bounced text-gray-800" />
            </div>
          ) : data?.addresses?.length === 0 ? (
            <>
              <h2 className="font-medium">Add New Address</h2>
              <AddressForm />
            </>
          ) : (
            <>
              <h2 className="font-medium mb-4">Shipping Address</h2>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4 ${
                  isNoAddressSelected ? "mb-2" : "mb-8"
                } `}
              >
                {data?.addresses?.map((address, i) => (
                  <div
                    onClick={() => {
                      setIsNoAddressSelected(false);
                      dispatch(setMyAddress(address));
                    }}
                    key={i}
                    className={`${
                      address?._id === myAddress?._id
                        ? "border-purple-500 border-2 bg-purple-50 hover:bg-purple-50"
                        : "border border-gray-300"
                    } rounded-md text-sm hover:bg-gray-100 cursor-pointer p-6`}
                  >
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="capitalize">
                          <span className="font-semibold">name:</span>
                          {address.fullname}
                        </p>
                        <p>
                          <span className="font-semibold">Mobile:</span>
                          {address.phone}
                        </p>
                        <p>
                          <span className="font-semibold">Address:</span>
                          {address.street}
                        </p>
                        {address.building && (
                          <p>
                            <span className="font-semibold">
                              Building name:
                            </span>
                            {address.building}
                          </p>
                        )}
                        {!!address.apartment && (
                          <p>
                            <span className="font-semibold">
                              Apartment No.:
                            </span>
                            {address.apartment}
                          </p>
                        )}
                        {!!address.floor && (
                          <p>
                            <span className="font-semibold">Floors No.:</span>
                            {address.floor}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <FiEdit size={20} />
                        <BiTrash
                          onClick={() => deleteAddress(address._id)}
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isNoAddressSelected && (
                <div className="mb-8">
                  <p className="text-red-500 text-sm">
                    Please select address or add new one
                  </p>
                </div>
              )}
              <div className="mb-8">
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  onClick={() => {
                    setIsNoAddressSelected(false);
                    setIsAddingNewAddressFormOpened(
                      !isAddingNewAddressFormOpened
                    );
                  }}
                >
                  <BsPlus size={18} />
                  Add new address
                </Button>
              </div>

              {isAddingNewAddressFormOpened && (
                <div className="mb-4">
                  <AddressForm
                    setIsAddingNewAddressFormOpened={
                      setIsAddingNewAddressFormOpened
                    }
                    isAddingNewAddressFormOpened={isAddingNewAddressFormOpened}
                  />
                </div>
              )}

              <div className="flex justify-end w-full">
                <Button
                  onClick={() => {
                    if (data?.addresses.find((e) => e._id === myAddress?._id)) {
                      // if (myAddress) {
                      setIsNoAddressSelected(false);
                      dispatch(setStep(2));
                    } else {
                      setIsNoAddressSelected(true);
                    }
                  }}
                >
                  Continue
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="text-gray-700 p-2 rounded-md bg-gray-100">
        <h1 className="font-semibold">Delivery and cash</h1>
      </div>
      <div className="text-gray-700 p-2 rounded-md bg-gray-100">
        <h1 className="font-semibold">Review and confirm</h1>
      </div>
    </>
  );
};

export default BillingAddress;
