"use client";

import { useState, useEffect } from "react";
import { openPictureModel } from "@/store/features/modelSlice";
import {
  setShownPicture,
  showReview,
} from "@/store/features/productDetailSlice";
import RatingStars from "@/components/utils/RatingStars";
import AddToCartButton from "@/components/utils/AddToCartButton";
import { setAsViewedProduct } from "@/store/features/recentlyViewedProductsSlice";
import CustomImage from "@/components/utils/CustomImage";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Colors from "@/components/utils/Colors";
import { TGetProductsReturn } from "@/types/products";
import Price from "@/components/utils/Price";
import IncreaseDecreaseButtons from "@/components/utils/IncreaseDecreaseButtons";

const ProductDetail = ({
  productId,
  category,
  description,
  images,
  name,
  numReviews,
  price,
  colors,
  priceAfterDiscount,
  averageRating,
}: TGetProductsReturn["products"][number] & { productId: string }) => {
  const [colorChoosed, setColorChoosed] = useState(colors?.[0]);
  
  const [amount, setAmount] = useState(1);

  const dispatch = useAppDispatch();
  const shownPicture = useAppSelector((state) => state.detail.shownPicture);

  const addReviewHandler = () => {
    dispatch(showReview());
    setTimeout(() => {
      window.scroll({
        top: 860,
        behavior: "smooth",
      });
    }, 1);
  };

  useEffect(() => {
    dispatch(
      setAsViewedProduct({
        name: `${name.substring(0, 40)}...`,
        images: images,
        price: price,
        _id: productId,
      })
    );
  }, [name, images, price, productId, dispatch]);

  useEffect(() => {
    dispatch(setShownPicture(images[0]));
  }, [dispatch, images]);

  return (
    <>
      <div className="flex flex-col lg:grid  lg:grid-cols-2 gap-8">
        {/* --------- IMG ----------- */}

        {shownPicture && (
          <div className="flex flex-col gap-4 ">
            <div
              className=" border p-4 border-gray-300 flex justify-center items-center w-full h-48 lg:h-full aspect-square rounded-md overflow-hidden cursor-zoom-in "
              onClick={() => dispatch(openPictureModel())}
            >
              <CustomImage
                className="w-4/5 h-4/5 aspect-square object-contain"
                width={500}
                height={500}
                src={shownPicture}
                // priority
                alt=""
              />
            </div>
            <div className="flex gap-4">
              {images?.map((image) => (
                <div
                  key={image}
                  className={`border rounded-md cursor-pointer p-2 w-[70px] h-[70px] overflow-hidden ${
                    image === shownPicture
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    dispatch(setShownPicture(image));
                  }}
                >
                  <CustomImage
                    width={100}
                    height={100}
                    className="w-full h-full object-contain "
                    src={image}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* --------- Details ----------- */}
        <div className="flex flex-col">
          <h1 className="text-xl lg:text-2xl font-semibold text-blue-700 mb-4">
            {name}
          </h1>
          <div className="flex mb-4 items-center gap-4">
            <div className="flex text-yellow-500 ">
              <RatingStars averageRating={averageRating} />
            </div>
            <p className="text-gray-400 text-xs lg:text-sm px-4 border-r border-l">
              {numReviews} review
            </p>
            <button
              className="text-gray-400 text-xs lg:text-sm capitalize hover:text-red-500"
              onClick={addReviewHandler}
            >
              Add your review
            </button>
          </div>
          <Price
            price={price}
            isForPage={true}
            priceAfterDiscount={priceAfterDiscount}
          />

          <ul className="text-sm lg:text-base mb-6 text-gray-500 pt-6 border-t border-gray-200">
            <li>{description}</li>
          </ul>

          <div className=" mb-6 pb-6 border-b border-gray-200 flex flex-col gap-4">
            <div className="flex justify-between gap-4">
              <AddToCartButton
                amount={amount}
                colorId={colorChoosed._id}
                productId={productId}
              />
              <IncreaseDecreaseButtons
                itemAmount={amount}
                onDecrease={() =>
                  setAmount((perv) => {
                    if (perv > 1) {
                      return perv - 1;
                    } else {
                      return 1;
                    }
                  })
                }
                onIncrease={() => setAmount((perv) => perv + 1)}
              />
            </div>

            {/* colors */}
            <Colors
              colors={colors}
              colorChoosed={colorChoosed.name}
              setColorChoosed={setColorChoosed}
            />
          </div>

          <div className="text-sm lg:text-base grid grid-cols-[1fr_2fr]">
            <p>SKU:</p>
            <p className="text-gray-500">{productId}</p>
            <p>Category:</p>
            <p className="text-gray-500 capitalize">{category?.name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
