import Link from "next/link";
import React from "react";
import { VscSignIn } from "react-icons/vsc";

export default function SignInButton() {
  return (
    <div>
      <h3 className="hidden md:block text-neutral-400 capitalize">
        my account
      </h3>
      <Link className=" capitalize" href="/login">
        <VscSignIn className="md:hidden" size={30} />
        <span className="hidden md:block">sign in</span>
      </Link>
    </div>
  );
}
