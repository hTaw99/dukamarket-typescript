import { useAppDispatch } from "@/hooks/redux";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePay = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (addressId: string) => {
      const { data } = await axiosPrivate({
        url: `visa`,
        method: "POST",
        data: { addressId },
      });
      return data;
    },
    onError: (err) => {},
    onSuccess: (data) => {
      window.location.href = data.paymentLink;
    },
  });
};
