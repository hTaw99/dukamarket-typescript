"use client";
import CustomImage from "@/components/utils/CustomImage";
import notFoundImage from "@/assets/404-2.svg";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const productId = pathname.split("/")[2];
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 dark:bg-slate-900">
      <CustomImage width={300} height={300} src={notFoundImage} />
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <h1 className="text-slate-900 mb-2 text-2xl font-bold">
          Page not found
        </h1>
        <h3 className="text-xl mb-4">No product found with id <span className="font-bold">({productId})</span></h3>
        {/* <div className="dark:text-white text-base font-normal mb-10">
          The page you are looking for might have been removed or its name
          changed or is temporarily unavailable.
        </div> */}
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          go to home page
        </Link>
      </div>
    </div>
  );
}
