import Comment from "./Comment";
import RatingStars from "@/components/utils/RatingStars";
import { getAllReviews, getAllReviewsServer } from "@/apis/reviews";
import imgReview from "@/assets/noReviewsFound.svg";
import { getProduct } from "@/apis/products";
import CustomImage from "@/components/utils/CustomImage";
import ReviewFormWrapper from "../ReviewFormWrapper";
import Test from "./Test";
import { Suspense } from "react";
import List from "./List";

const Reviews = async ({ productId }: { productId: string }) => {
  // const allRating = reviews?.map((el) => el.rating);
  // const ratingObj = allRating?.reduce(
  //   (acc, el, i) => ((acc[el] = acc[el] + 1 || 1), acc),
  //   {}
  // );

  return (
    <div className="grid md:grid-cols-[2fr_4fr] gap-8  md:gap-20 ">
      <div className="flex flex-col">
        <div className="pb-6 mb-6 border-b border-gray-300">
          <h1 className="md:text-xl text-lg mb-2 text-gray-700 font-semibold">
            Customer reviews
          </h1>
          <div className="flex gap-4 items-start mb-4">
            <Suspense fallback={"loading Rating..."}>
              <Test productId={productId} />
            </Suspense>
          </div>
          {/* {Array.from({ length: 5 }, (el, i) => (
            <div key={i} className="flex gap-4 items-center mb-2">
              <h3>{i + 1} star</h3>
              <div className="w-36  h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-full bg-yellow-500 rounded-full`}
                  style={{
                    width: `${Math.trunc(
                      (ratingObj[i + 1] / allRating.length) * 100 || 0
                    )}%`,
                  }}
                ></div>
              </div>
              <h3>
                {Math.trunc((ratingObj[i + 1] / allRating.length) * 100 || 0)}%
              </h3>
            </div>
          ))} */}
        </div>
        <div className="flex flex-col gap-1 mb-4 ">
          <h1 className="text-lg md:text-xl text-gray-700 font-semibold">
            Review this product
          </h1>
          <p className="text-sm md:text-base">
            Share your thoughts with other customers
          </p>
        </div>
        <ReviewFormWrapper productId={productId} />
      </div>
      <Suspense fallback={"loading List Reviews..."}>
        <List productId={productId} />
      </Suspense>
    </div>
  );
};

export default Reviews;
