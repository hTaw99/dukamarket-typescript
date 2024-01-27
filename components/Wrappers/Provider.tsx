"use client";
import store from "@/store";
import { type ReactNode } from "react";
import { Provider } from "react-redux";

const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
