import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosDefault, axiosPrivate } from "../AppClient";

import { setUser } from "@/store/features/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const { data: resData } = await axiosPrivate({
    url: "auth/register",
    method: "POST",
    data: userData,
  });

  return resData;
};

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: ({ user, accessToken }) => {
      dispatch(setUser({ ...user, accessToken }));
      router.push("/");
    },
  });
};

export const login = async (userData: { email: string; password: string }) => {
  const { data: resData } = await axiosPrivate({
    url: "auth/login",
    method: "POST",
    data: userData,
  });

  return resData;
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ user, accessToken }) => {
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
      dispatch(setUser({ ...user, accessToken }));
      router.push(from);
      // navigate(from, { replace: true });
    },
  });
};

export const refreshTokenFn = async () => {
  const { data } = await axiosPrivate({
    url: "auth/refresh",
    method: "GET",
  });

  return data;
};

export function useRefreshToken({ enabled }: { enabled: boolean }) {
  return useQuery({
    queryKey: ["refresh-token"],
    queryFn: refreshTokenFn,
    enabled,
  });
}

export function useLogout() {
  return useQuery({
    queryKey: ["logout"],
    queryFn: async () => {
      const { data } = await axiosPrivate({
        url: "/auth/logout",
        method: "GET",
      });
      return data;
    },
    enabled: false,
  });
}

const forgotPassword = async (userData: { email: string }) => {
  const { data } = await axiosDefault({
    url: "/auth/forgotPassword",
    method: "POST",
    data: userData,
  });

  return data;
};

export const useForgotPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      router.push("/otp-verification");
    },
  });
};

const verifyOtp = async (otp: { otp: string }) => {
  const { data } = await axiosDefault({
    url: "/auth/otpVerification",
    method: "POST",
    data: otp,
  });

  return data;
};

export const useOtpVerification = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      router.push(`/reset-password/${data.resetToken}`);
    },
  });
};

const resetPassword = async ({
  password,
  resetToken,
}: {
  password: string;
  resetToken: string;
}) => {
  const { data } = await axiosDefault({
    url: `/auth/resetPassword/${resetToken}`,
    method: "PATCH",
    data: { password },
  });

  return data;
};

export const useResetPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: ({ user, accessToken }) => {
      dispatch(setUser({ ...user, accessToken })), router.replace("/");
    },
  });
};
