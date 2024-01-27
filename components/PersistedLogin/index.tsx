"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRefreshToken } from "@/apis/auth";
import { logout, setUserOnRefresh } from "@/store/features/authSlice";
import { FaCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { TooLongTimeError } from "@/lib/exception";

export default function PersistLogin({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth.user);
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(true);

  const { fetchStatus, data, error } = useRefreshToken({
    enabled: !isAuthenticated && status === "unknown",
  });

  // if (error?.code === "404") {
  //   throw new Error()
  // }
  // console.log({ data, error });
  // throw new Error("Something went wrong!");

  useEffect(() => {
    if (data) {
      dispatch(setUserOnRefresh(data));
    }
    if (error) {
      dispatch(logout());
    }

    if (fetchStatus === "idle") {
      setLoading(false);
    }
  }, [dispatch, error, fetchStatus, data]);

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <FaCircle size={10} className="text-gray-700 animate-bounced" />
      </div>
    );
  return <>{children}</>;
}
