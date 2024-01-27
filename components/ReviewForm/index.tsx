"use client";

import { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaCheck, FaCircle } from "react-icons/fa";
import { useAddReview } from "@/apis/reviews";
import { SubmitHandler, useForm } from "react-hook-form";
import { revalidateAction } from "@/actions/revalidateAction";

import { Button } from "../ui/button";
import { ReviewFormValues } from "@/types/forms";

const ReviewForm = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>();

  const {
    mutate: addReview,
    error,
    isPending,
  } = useAddReview({
    onSettled: async () => await revalidateAction(productId),
  });

  const regPattern = new RegExp("true");
  const onSubmit: SubmitHandler<ReviewFormValues> = async (data) => {
    addReview({
      rating: data.rating,
      comment: data.comment,
      title: data.title,
      isRecommended: regPattern.test(data.isRecommended),
      product: productId,
    });
  };

  return (
    <>
      {error && (
        <h1 className="text-red-500 mb-4 -mt-2 pt-2 border-t border-neutral-300">
          {error?.response?.data?.msg}
        </h1>
      )}
      <div className={error ? `opacity-50 pointer-events-none` : ""}>
        {/* <p>{result?.msg}</p> */}
        {/* <div className={false ? `opacity-50 pointer-events-none` : ""}> */}
        <div className="flex gap-2 text-gray-400 mb-1">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <div
                  onClick={() => setRating(ratingValue)}
                  className={
                    rating && ratingValue <= rating
                      ? "cursor-pointer p-2 border border-neutral-300 rounded-md group "
                      : "cursor-pointer p-2 border border-neutral-300 rounded-md"
                  }
                  //   onMouseEnter={() => setHover(ratingValue)}
                  //   onMouseLeave={() => setHover(null)}
                >
                  {rating && ratingValue <= rating ? (
                    <AiFillStar className={"text-yellow-500 "} size={24} />
                  ) : (
                    <AiOutlineStar
                      className={"group-hover:text-white"}
                      size={24}
                    />
                  )}
                </div>
                <input
                  type="radio"
                  className="hidden"
                  value={ratingValue}
                  {...register("rating", {
                    required: "Please give a rating to product ",
                  })}
                />
              </label>
            );
          })}
        </div>
        <div className="text-sm text-gray-400 mb-6">
          {rating ? <p>Your rating is {rating} star</p> : <p>Click To Rate</p>}
          <span className="text-red-500">{errors.rating?.message}</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col ">
            <label
              className="font-semibold text-gray-700 mb-1"
              htmlFor="review-title"
            >
              Review Title
            </label>
            <input
              {...register("title", {
                required: "Please provide a title for review ",
              })}
              className="border border-neutral-300 p-2 rounded-md outline-none"
              type="text"
              id="review-title"
              placeholder="Example: Easy To Use"
            />
            <span className="text-red-500 text-sm">
              {errors.title?.message}
            </span>
          </div>
          <h3 className="font-semibold text-gray-700">
            Would you Recommend this product to a friend
          </h3>
          <div className="flex gap-6">
            <div className="relative flex gap-2">
              <input
                className="cursor-pointer appearance-none w-5 h-5 accent-red-500 rounded-full border border-neutral-300 checked:bg-red-500 checked:border-0"
                type="radio"
                id="yes"
                value="true"
                {...register("isRecommended", {
                  required: "This field is required ",
                })}
              />
              <div className="pointer-events-none absolute w-2 h-2 bg-white rounded-full left-[6px] top-[6px]" />
              <label
                className="cursor-pointer  font-semibold text-gray-700"
                htmlFor="yes"
              >
                Yes
              </label>
            </div>
            <div className="relative flex gap-2">
              <input
                className="cursor-pointer appearance-none w-5 h-5 accent-red-500 rounded-full border border-neutral-300 checked:bg-red-500 checked:border-0"
                type="radio"
                id="no"
                value="false"
                {...register("isRecommended", {
                  required: "This field is required ",
                })}
              />
              <div className="pointer-events-none absolute w-2 h-2 bg-white rounded-full left-[6px] top-[6px]" />
              <label
                className="cursor-pointer  font-semibold text-gray-700"
                htmlFor="no"
              >
                No
              </label>
            </div>
          </div>
          <span className="text-red-500 text-sm">
            {errors.isRecommended?.message}
          </span>
          <div className="flex flex-col ">
            <label
              className="font-semibold text-gray-700 mb-1"
              htmlFor="review-comment"
            >
              Product Review
            </label>
            <textarea
              className="border border-neutral-300 p-2 rounded-md outline-none pb-8 flex-wrap"
              id="reviewComment"
              placeholder="Example: Easy To Use"
              {...register("comment", {
                required: "please provide a comment for review",
              })}
            />
            <span className="text-red-500 text-sm">
              {errors.comment?.message}
            </span>
          </div>

          <div className="flex gap-2 items-center relative">
            <input
              className=" appearance-none  w-5 h-5 checked:bg-red-500 checked:border-red-500 focus:outline-none rounded-md border border-neutral-300 cursor-pointer"
              type="checkbox"
              id="accept"
              value="yes"
              {...register("acceptTerms", {
                required:
                  " Please agree to all the terms and conditions before placing review ",
              })}
            />
            <FaCheck
              size={12}
              className="text-white absolute left-[4px] pointer-events-none"
            />
            <label
              className="flex gap-1 font-semibold text-gray-700"
              htmlFor="accept"
            >
              <span>I accept the</span>
              <span className="underline underline-offset-1">
                terms and condition
              </span>
            </label>
          </div>

          <span className="text-red-500 text-sm">
            {errors.acceptTerms?.message}
          </span>

          {isPending ? (
            <div className="flex justify-center items-center w-full">
              <FaCircle size={10} className=" animate-bounced" />
            </div>
          ) : (
            <Button
              type="submit"
              className="capitalize self-stretch"
            >
              submit
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
