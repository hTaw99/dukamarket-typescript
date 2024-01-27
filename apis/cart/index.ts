import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../AppClient";
import { type TGetCartReturn } from "@/types/cart";
// import { setCart } from "@/store/features/cartSlice";
// import Cookies from "js-cookie";
// import { revalidatePath } from "next/cache";

export const getCart = async (): Promise<TGetCartReturn> => {
  const { data } = await axiosPrivate({
    url: `carts`,
    method: "GET",
  });

  if (typeof data === "object" && "cart" in data) {
    const { cart } = data;
    return cart;
  } else {
    return data;
  }
};

export const useGetCart = () => {
  return useQuery({
    queryKey: ["get-cart"],
    queryFn: getCart,
  });
};

const addProductToCart = async (product: {
  amount: number;
  color: string;
  productId: string;
}) => {
  const { data } = await axiosPrivate({
    url: "carts",
    method: "POST",
    data: product,
  });
  return data;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProductToCart,

    // onMutate: async (mutationData) => {
    //   await queryClient.cancelQueries({ queryKey: ["get-cart"] });
    //   const prevData = queryClient.getQueryData({
    //     queryKey: ["get-cart"],
    //   });
    //   queryClient.setQueryData(["get-cart"], (oldData) => {
    //     if (!oldData?.cart?.items) {
    //       return {
    //         cart: {
    //           items: [],
    //           totalItems: mutationData.amount,
    //           // totalPrice,
    //         },
    //       };
    //     }
    //     // console.log(oldData);
    //     // const newItemsAfterAddition = [...oldData?.cart?.items, product];
    //   });
    //   return prevData;
    // },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
  });
};

const removeItemFromCart = async (itemId: string) => {
  const { data } = await axiosPrivate({
    url: `carts/${itemId}`,
    method: "DELETE",
  });

  return data;
};

export const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeItemFromCart,

    // onMutate: async (mutationData) => {
    //   await queryClient.cancelQueries({ queryKey: ["get-cart"] });
    //   const prevData = queryClient.getQueryData({
    //     queryKey: ["get-cart"],
    //   });
    //   queryClient.setQueryData(["get-cart"], (oldData) => {
    //     const removedItem = oldData.cart.items.find(
    //       (item) => item._id === mutationData
    //     );
    //     const newItemsArrAfterRemoval = oldData.cart.items.filter(
    //       (item) => removedItem._id !== item._id
    //     );
    //     const newCart = {
    //       cart: {
    //         items: newItemsArrAfterRemoval,
    //         totalItems: oldData.cart.totalItems - removedItem.amount,
    //         totalPrice: oldData.cart.totalPrice - removedItem.totalProductPrice,
    //       },
    //     };
    //     return newCart;
    //   });
    //   return prevData;
    // },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
  });
};
