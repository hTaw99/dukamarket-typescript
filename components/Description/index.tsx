"use server";
import { getProduct } from "@/apis/products";

const Description = async ({ productId }: { productId: string }) => {
  const { product } = await getProduct(productId, "onServer");
  return <div>{product?.description}</div>;
};

export default Description;
