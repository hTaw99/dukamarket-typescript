import Link from "next/link";
import AddToCartButton from "@/components/utils/AddToCartButton";
import QuickViewButton from "@/components/utils/QuickViewButton";
import CompareButton from "@/components/utils/CompareButton";
import RatingStars from "@/components/utils/RatingStars";
import CartdItemWrapper from "@/components/Wrappers/CartdItemWrapper";
import Price from "@/components/utils/Price";
import Sale from "@/components/utils/Sale";
import CustomImage from "@/components/utils/CustomImage";
import { TGetProductsReturn, type TProduct } from "@/types/products";

const CardItem = ({
  name,
  images,
  price,
  _id,
  description,
  colors,
  averageRating,
  priceAfterDiscount,
  numReviews,
}: TGetProductsReturn["products"][number]) => {
  return (
    <CartdItemWrapper>
      {/* sale */}
      <Sale priceAfterDiscount={priceAfterDiscount} price={price} />

      {/* image */}
      <div className="relative overflow-hidden self-center mb-2">
        <Link
          href={`products/${_id}`}
          className=" flex justify-center items-center w-40 h-40 md:w-48 md:h-48 aspect-square "
        >
          <CustomImage
            className="p-2 w-4/5 cursor-pointer aspect-square object-contain group-hover:scale-110"
            src={images[0]}
            alt="product-img"
            width={300}
            height={300}
          />
        </Link>
        {/* on hover icons */}
        <div className="flex flex-col  gap-2 absolute top-0 -right-10 group-hover:right-0 transition-all duration-300 text-gray-500">
          <QuickViewButton
            name={name}
            images={images}
            price={price}
            _id={_id}
            description={description}
            colors={colors}
            priceAfterDiscount={priceAfterDiscount}
            averageRating={averageRating}
            numReviews={numReviews}
            icon={true}
          />

          {/* <button className="relative group/wishlist">
            <div className="bg-gray-100 rounded-md p-2  hover:bg-red-500 hover:text-white cursor-pointer">
              <AiOutlineHeart size={24} />
            </div>
            <span className="bg-gray-500 text-white absolute top-8 right-[43px] -translate-y-full whitespace-nowrap  invisible opacity-0 px-2 py-1 text-sm rounded-md group-hover:visible group-hover/wishlist:opacity-100 transition pointer-events-none">
              WishList
            </span>
          </button> */}

          <CompareButton
            name={name}
            images={images}
            price={price}
            _id={_id}
            description={description}
            colors={colors}
            priceAfterDiscount={priceAfterDiscount}
            averageRating={averageRating}
            numReviews={numReviews}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-2">
        {/* ------------- Title --------------- */}
        <Link href={`products/${_id}`}>
          <h1 className="text-blue-700 font-semibold capitalize line-clamp-2">
            {name}
          </h1>
        </Link>
        {/* ------------- Stars --------------- */}

        <div className="flex items-center gap-2">
          <div className="flex text-yellow-500 ">
            <RatingStars averageRating={averageRating} />
          </div>
        </div>
      </div>

      {/* -------------- price ------------------ */}
      <Price priceAfterDiscount={priceAfterDiscount} price={price} />

      {/* -------------- button ------------------ */}
      <div className="mt-auto w-full">
        <AddToCartButton colorId={colors[0]._id} productId={_id} />
      </div>
    </CartdItemWrapper>
  );
};

export default CardItem;
