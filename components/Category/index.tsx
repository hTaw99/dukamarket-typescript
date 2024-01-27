import { type TCategory } from "@/types/categories";

import { getProducts } from "@/apis/products";

import CardItem from "@/app/products/components/CardItem";
import CategoryList from "@/components/Category/CategoryList";
import CategoryProduct from "@/components/Category/CategoryProduct";

const Category = async ({ _id, name, images }: TCategory) => {
  // #################################
  const data = await getProducts(
    {
      variables: {
        queries: {
          limit: 7,
          sort: "-sold",
          category: _id,
        },
      },
    },
    "onServer"
  );
  // #################################

  const topSellerProduct = data.products.slice(0, 1)[0];
  const restProducts = data.products.slice(1);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900 capitalize">
          {name}
        </h1>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2fr_1fr] rounded-md overflow-hidden">
        <CategoryList images={images} />

        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 bg-gray-200 gap-[1px] border-r">
          {restProducts.map((p) => (
            <CardItem key={p._id} {...p} />
          ))}
        </div>

        <CategoryProduct {...topSellerProduct} />
      </div>
    </div>
  );
};

export default Category;
