import React from "react";
import Link from "next/link";
import ListItem from "../../ListItem";
import { TbChevronsRight } from "react-icons/tb";
import { getSimilarProducts } from "@/apis/products";

const SimilarProducts = async ({ productId }: { productId: string }) => {
  // #########################################################
  const { products: similarProducts } = await getSimilarProducts(
    {
      productId,
      limits: 3,
    },
    "onServer"
  );
  // #########################################################

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-gray-800 font-semibold ">
          Similar Products
        </h3>
        <div className="flex items-center text-red-500 font-semibold text-sm gap-1">
          <Link href="/products">See all products</Link>
          <TbChevronsRight />
        </div>
      </div>
      <div className="sm:grid-cols-2 grid lg:flex xl:flex-col gap-4">
        {similarProducts?.map((product) => (
          <ListItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
