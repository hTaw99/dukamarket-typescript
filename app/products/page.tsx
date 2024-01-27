import FiltersComponent from "@/app/products/components/Filters";
import SelectedFiltersComponent from "./components/SelectedFilters";
import ProductsList from "@/app/products/components/ProductsList";
import { HydrationBoundary } from "@tanstack/react-query";
import { prefetchProducts } from "@/apis/products";

export const metadata = {
  title: "Dukamarket - Products",
  description:
    "Products page have several product items that may you intersted in ",
};

const Products = async () => {
  const dehydratedState = await prefetchProducts({
    filters: { sort: "", category: [], brand: [] },
    queries: { limit: 12 },
  });

  return (
    <div className="container mx-auto bg-white rounded-md p-6">
      <h1 className="mb-12 text-2xl md:text-3xl font-semibold">All Products</h1>
      <div className="pb-4 border-b border-gray-300 ">
        <div className="flex items-center overflow-x-auto  text-sm md:text-base justify-between mb-2">
          <FiltersComponent />
        </div>
        <SelectedFiltersComponent />
      </div>

      <HydrationBoundary state={dehydratedState}>
        <ProductsList />
      </HydrationBoundary>
    </div>
  );
};

export default Products;
