import React from "react";
import Link from "next/link";
import Image from "next/image";
import notFoundImage from "@/assets/404-2.svg";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 dark:bg-slate-900">
      <Image width={300} height={300} src={notFoundImage} alt="" />
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <h4 className="text-slate-900 mb-4 text-2xl font-bold">
          Page not found
        </h4>

        <div className="dark:text-white text-base font-normal mb-10">
          The page you are looking for might have been removed or its name
          changed or is temporarily unavailable.
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Link href="/" className="">
          go to home page
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
