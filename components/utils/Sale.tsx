import { TProduct } from "@/types/products";

type SaleProp = Pick<TProduct<string>, "priceAfterDiscount" | "price">;

const Sale = ({ priceAfterDiscount, price }: SaleProp) => {
  return (
    <>
      {priceAfterDiscount ? (
        <div className=" absolute z-10 text-sm px-3 text-white rounded-md bg-green-600">
          <p>-{(((price - priceAfterDiscount) / price) * 100).toFixed()}%</p>
        </div>
      ) : undefined}
    </>
  );
};

export default Sale;
