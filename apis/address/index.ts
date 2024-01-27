import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { setMyAddress, setStep } from "@/store/features/checkoutSlice";
import { TAddress, type TGetAddressReturn } from "@/types/address";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// export const useCreateAddress = () => {
//   const axiosPrivate = useAxiosPrivate();

//   return useMutation({
//     mutationFn: async (address) => {
//        await axiosPrivate({
//         url: `address`,
//         method: "POST",
//         data: address,
//       });
//     },
//   });
// };

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (address: Omit<TAddress, "_id" | "user">) => {
      const { data: addressData } = await axiosPrivate({
        url: `address`,
        method: "POST",
        data: address,
      });
      return addressData;
    },
    onSuccess: (addressData) => {
      dispatch(setStep(2));
      dispatch(setMyAddress(addressData.address));
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};

export const useGetAddress = () => {
  const axiosPrivate = useAxiosPrivate();
  const { name } = useAppSelector((state) => state.auth.user);

  return useQuery({
    queryKey: ["address", name],
    queryFn: async (): Promise<TGetAddressReturn> => {
      const { data } = await axiosPrivate({
        url: `address`,
        method: "GET",
      });
      return data;
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { name } = useAppSelector((state) => state.auth.user);
  
  return useMutation({
    mutationFn: async (addressId: string) => {
      const { data } = await axiosPrivate({
        url: `address`,
        method: "DELETE",
        data: { addressId },
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["address", name] });
      // dispatch(setMyAddress(null));
    },
  });
};
