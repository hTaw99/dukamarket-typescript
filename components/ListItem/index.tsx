import Link from "next/link";
import Price from "@/components/utils/Price";
import Sale from "@/components/utils/Sale";
import CustomImage from "@/components/utils/CustomImage";
import { TGetProductsReturn } from "@/types/products";

type ListItemProps = { product: TGetProductsReturn["products"][number] };

const ListItem = ({ product }: ListItemProps) => {
  return (
    <div className="group flex  gap-4 p-4  border border-gray-300 rounded-md">
      <Sale
        priceAfterDiscount={product.priceAfterDiscount}
        price={product.price}
      />
      <Link
        href={`/products/${product?._id}`}
        className="self-center w-20 h-20 aspect-square"
      >
        <CustomImage
          width={100}
          height={100}
          className=" w-full aspect-square h-full object-contain group-hover:scale-110"
          src={product?.images[0]}
          alt=""
        />
      </Link>
      <div className="flex flex-col justify-between">
        <div className="flex justify-between gap-2 ">
          <Link
            href={`/products/${product?._id}`}
            className="hover:text-blue-600 text-gray-700 font-semibold capitalize mb-4 text-sm md:text-base line-clamp-2"
          >
            {product?.name}
          </Link>
          <p className="hidden lg:inline-block text-green-600 text-xs flex-shrink-0">
            {product.quantity} in stock
          </p>
        </div>

        {/* ----------- price ------------- */}
        <Price
          priceAfterDiscount={product.priceAfterDiscount}
          price={product.price}
        />
      </div>
    </div>
  );
};

export default ListItem;

{
  /* ----------- buttons ------------- */
}
{
  /* <div className="justify-between gap-2 mt-auto">
          <div className="hidden">
            <AddToCartButton
              colorId={product.colors[0]._id}
              productId={product._id}
            />
          </div>
          <div className="hidden">
            <QuickViewButton
              name={product.name}
              images={product.images}
              price={product.price}
              _id={product._id}
              description={product.description}
              colors={product.colors}
              priceAfterDiscount={product.priceAfterDiscount}
              averageRating={product.averageRating}
              numReviews={product.numReviews}
            />
          </div>
        </div> */
}
