"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ReviewForm from "../ReviewForm";
import { useAppSelector } from "@/hooks/redux";
import { Button } from "../ui/button";

export default function ReviewFormWrapper({
  productId,
}: {
  productId: string;
}) {
  const { isAuthenticated } = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      {isAuthenticated ? (
        <ReviewForm productId={productId} />
      ) : (
        <Button
          onClick={() => router.push(`/login?from=${pathname}`)}
          className="capitalize self-stretch"
        >
          Add review
        </Button>
      )}
    </>
  );
}
