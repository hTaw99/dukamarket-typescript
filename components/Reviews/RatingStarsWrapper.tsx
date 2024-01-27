import { getProduct } from "@/apis/products";
import RatingStars from "@/components/utils/RatingStars";

export default async function RatingStarsWrapper({
  productId,
}: {
  productId: string;
}) {
  const { product } = await getProduct(productId, "onServer");

  return (
    <div className="flex  text-yellow-500 ">
      <RatingStars size={24} averageRating={product?.averageRating} />
    </div>
  );
}
