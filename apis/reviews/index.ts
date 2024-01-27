import { type TReview } from "@/types/reviews";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosDefault, baseURL } from "../AppClient";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { disableEditing } from "@/store/features/reviewSlice";
import { useAppDispatch } from "@/hooks/redux";

export const getAllReviews = async (
  productId: number
): Promise<{ reviews: TReview[] }> => {
  const { data } = await axiosDefault({
    url: `reviews?product=${productId}`,
    method: "GET",
  });
  return data;
};

export const getAllReviewsServer = async (
  productId: string
): Promise<{ reviews: TReview[] }> => {
  const resReviews = await fetch(`${baseURL}/reviews?product=${productId}`, {
    next: { tags: ["reviews"] },
  });
  return await resReviews.json();
};

export const useGetAllReviews = (productId: number) => {
  return useQuery({
    queryFn: () => getAllReviews(productId),
    queryKey: ["reviews", productId],
  });
};

export const useAddReview = ({ onSettled }: { onSettled: () => void }) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationFn: async (
      reviewData: Omit<
        TReview,
        "createdAt" | "product" | "updatedAt" | "user" | "_id"
      > & { product: string }
    ) => {
      const { data } = await axiosPrivate({
        url: "reviews",
        method: "POST",
        data: reviewData,
      });
      return data;
    },
    onError: (err) => {},
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries({ queryKey: ["reviews"] });
    //   queryClient.invalidateQueries({
    //     queryKey: ["get-single-product", data.review.product],
    //   });
    //   // addReviewRevalidation();
    //   // fetch(
    //   //   `http://localhost:3000/api?tag=newArrival&path=/products/[productId]`
    //   // );
    // },

    onSettled,
  });
};

export const useDeleteReview = ({ onSettled }: { onSettled: () => void }) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationFn: async (reviewId: string) => {
      const { data } = await axiosPrivate({
        url: `reviews/${reviewId}`,
        method: "DELETE",
        data: reviewId,
      });
      return data;
    },
    onError: (err) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["get-single-product"],
      });
      // addReviewRevalidation();
      // fetch(
      //   `http://localhost:3000/api?tag=newArrival&path=/products/[productId]`
      // );
      // router.refresh();
    },
    onSettled,
  });
};

export const useUpdateReview = ({ onSettled }: { onSettled: () => void }) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (
      reviewData: Omit<TReview, "createdAt" | "product" | "updatedAt" | "user">
    ) => {
      await axiosPrivate({
        url: `reviews/${reviewData._id}`,
        method: "PATCH",
        data: reviewData,
      });
    },
    onError: (err) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["get-single-product"],
      });
      dispatch(disableEditing());
      // fetch(
      //   `http://localhost:3000/api?tag=newArrival&path=/products/[productId]`
      // );
    },
    onSettled,
  });
};
