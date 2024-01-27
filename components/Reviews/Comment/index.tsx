"use client";

import { FiEdit } from "react-icons/fi";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiFillCheckCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import RatingStars from "@/components/utils/RatingStars";
import { useDeleteReview } from "@/apis/reviews";
import { enableEditing } from "@/store/features/reviewSlice";
import EditableComment from "./EditableComment";
import { revalidateAction } from "@/actions/revalidateAction";
import { useTransition } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import { TReview } from "@/types/reviews";

const Comment = ({
  comment,
  rating,
  createdAt,
  title,
  isRecommended,
  user,
  _id,
  productId,
}: TReview & { productId: string }) => {
  // const [isPendingTransition, startTransition] = useTransition();
  const date = createdAt.split("T");
  const { name } = useAppSelector((state) => state.auth.user);
  const { isEditing } = useAppSelector((state) => state.review);

  const { mutate: deleteReview, isPending } = useDeleteReview({
    onSettled: async () => await revalidateAction(productId),
  });
  const dispatch = useAppDispatch();

  const isMyOwnReview = user?.name === name;

  if (isEditing) {
    if (isMyOwnReview) {
      return (
        <EditableComment
          comment={comment}
          rating={rating}
          title={title}
          isRecommended={isRecommended}
          productId={productId}
          _id={_id}
        />
      );
    }
  }

  return (
    <div
      className={`flex items-start gap-2 border-b pb-4 px-4 rounded-md ${
        isPending ? "opacity-50" : ""
      }`}
    >
      <div className="w-full">
        <div className=" flex justify-between">
          <h1 className="text-gray-800 capitalize text-lg font-bold">
            {title}
          </h1>
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <AiFillCheckCircle color="green" />
            Verified reviewer
          </p>
        </div>
        <div className="flex text-yellow-500 mb-1">
          <RatingStars averageRating={rating} />
        </div>
        <p className="text-gray-400 mb-3">{date[0]}</p>
        <p className="text-lg flex-wrap mb-6">{comment}</p>
        <div className="flex md:flex-row flex-col gap-4 justify-between md:items-center">
          <p className="flex items-center gap-2 text-sm md:text-base text-gray-500">
            {isRecommended ? (
              <>
                <AiOutlineCheckCircle /> Yes, I recommend this product
              </>
            ) : (
              <>
                <AiOutlineCloseCircle />
                No, I don`t recommend this product
              </>
            )}
          </p>

          {isMyOwnReview && (
            <div className="flex gap-2">
              <Button
                variant={"outline"}
                onClick={() => {
                  dispatch(enableEditing());
                }}
                className="flex gap-2"
              >
                <FiEdit size={20} />
                Edit review
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => {
                  deleteReview(_id);
                  // startTransition(() => revalidateAction(productId));
                }}
                className="flex gap-2 items-center text-destructive hover:text-destructive"
              >
                <AiOutlineDelete size={20} />
                Delete review
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
