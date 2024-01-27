import Link from "next/link";
import CardItem from "@/app/products/components/CardItem";
import NewArrivalWrapper from "@/components/Wrappers/NewArrivalWrapper";
import { getProducts } from "@/apis/products";

const NewArrival = async () => {
  
  // #################################
  const data = await getProducts(
    { variables: { queries: { limit: 5, sort: "-createdAt" } } },
    "onServer"
  );
  // #################################

  return (
    <NewArrivalWrapper>
      <div className=" p-6 md:p-10">
        <h1 className="text-2xl font-semibold mb-2">
          Week Deals <br />
          Limited, Just Now!
        </h1>
        <h2 className="text-8xl lg:text-9xl mb-6">50%</h2>
        <Link
          href={"/products"}
          className="font-semibold py-2 px-4 text-sm md:text-base md:py-4 md:px-8 rounded-md text-red-500 bg-white "
        >
          See More
        </Link>
      </div>

      <div className="w-full bg-gray-200">
        <div className="rounded-lg gap-[1px] lg:grid lg:grid-cols-5 sm:grid sm:grid-cols-2 bg-gray-200">
          {data.products?.map((p) => (
            <CardItem key={p._id} {...p} />
          ))}
        </div>
      </div>
    </NewArrivalWrapper>
  );
};

export default NewArrival;
