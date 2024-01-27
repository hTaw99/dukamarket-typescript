"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  closeQuickViewModel,
  openPictureModel,
} from "@/store/features/modelSlice";
import RatingStars from "@/components/utils/RatingStars";
import { formatPrice } from "@/lib/formatPrice";
import CustomImage from "@/components/utils/CustomImage";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Price from "../utils/Price";

const QuickViewModel = () => {
  const { isQuickViewModelOpen } = useAppSelector((state) => state.model);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLElement>(null);

  const productToView = useAppSelector(
    (state) => state.quickview.productToView
  );

  const [colorChoosed, setColorChoosed] = useState("");
  const colorName = productToView?.colors?.[0]?.name;

  useEffect(() => {
    setColorChoosed(colorName);
  }, [colorName]);

  return (
    <Transition appear show={isQuickViewModelOpen} as={Fragment}>
      <Dialog
        initialFocus={ref}
        as="div"
        className="relative z-50"
        onClose={() => dispatch(closeQuickViewModel())}
      >
        <Transition.Child
          ref={ref}
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* ---- Overlay ---- */}
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className=" w-5/6 h-[600px] overflow-y-auto lg:max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className=" flex flex-col h-full md:grid md:grid-cols-2 gap-8">
                  {/* --------- IMG ----------- */}
                  <div
                    className=" p-4 w-full min-h-[150px] flex justify-center items-cneter border border-gray-300 rounded-md overflow-hidden"
                    // onClick={() => dispatch(openPictureModel())}
                  >
                    <CustomImage
                      className="w-1/2 md:w-1/2 object-contain"
                      width={500}
                      height={500}
                      src={productToView?.images?.[0]}
                      alt=""
                    />
                  </div>

                  {/* --------- Details ----------- */}
                  <div className="flex flex-col">
                    <h1 className="text-lg md:text-2xl font-semibold text-blue-700 mb-2">
                      {productToView.name}
                    </h1>
                    {/* </Link> */}
                    <div className="flex mb-4 items-center gap-4">
                      <div className="flex text-yellow-500 ">
                        <RatingStars
                          averageRating={productToView.averageRating}
                        />
                      </div>
                      <p className="text-gray-400 text-sm px-4 border-l">
                        {productToView.numReviews} Review
                      </p>
                    </div>
                    <Price
                      price={productToView.price}
                      priceAfterDiscount={productToView.priceAfterDiscount}
                      isForPage
                    />
                    <ul className="text-sm md:text-base mb-6 text-gray-500">
                      <li>{productToView.description}</li>
                    </ul>

                    {/* colors */}
                    <div className="mt-4">
                      <h1 className="mb-2 text-sm md:text-base ">Color:</h1>
                      <div className="flex ">
                        {productToView?.colors?.map((color) => (
                          <div
                            key={color._id}
                            style={{
                              border:
                                colorChoosed === color.name
                                  ? `solid 2px ${color.name}`
                                  : "none",
                            }}
                            className={`p-1 rounded-lg `}
                          >
                            <div
                              onClick={() => setColorChoosed(color.name)}
                              style={{
                                backgroundColor: color.name,
                              }}
                              className={`cursor-pointer w-6 h-6 border-red-500 rounded-md`}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* colors */}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QuickViewModel;
