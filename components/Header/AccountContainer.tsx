"use client";

import React from "react";
import AccountMenu from "./AccountMenu";
import SignInButton from "./SignInButton";
import { useAppSelector } from "@/hooks/redux";

export default function AccountContainer() {
  const { isAuthenticated } = useAppSelector((state) => state.auth.user);
  return isAuthenticated ? <AccountMenu /> : <SignInButton />;
}
