"use client";

import { useGetProducts } from "@/apis/products";
import { FaSpinner } from "react-icons/fa";

import { Fragment } from "react";
import ProductItem from "../ProductItem";
import ProductCardSkeleton from "../CardItem/Skeleton";
import { useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/button";

const ProductsList = () => {
  const { filters } = useAppSelector((state) => state.filter);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetchingNextPage,
  } = useGetProducts({
    filters,
    queries: { limit: 12 },
  });

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
        {isPending
          ? Array.from({ length: 12 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))
          : data?.pages?.map((group, i) => (
              <Fragment key={i}>
                {group.products.map((p) => (
                  <ProductItem {...p} key={p._id} />
                ))}
              </Fragment>
            ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <Button variant={"outline"} onClick={() => fetchNextPage()} >
            {isFetchingNextPage ? (
              <FaSpinner className=" animate-spin" />
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductsList;
