import Menu from "../Menu";
import { getBrands, getCategories } from "@/apis/public";

export default async function FiltersComponent() {
  const categories = await getCategories("onServer");
  const brands = await getBrands("onServer");

  return (
    <div className="flex gap-2 ">
      <Menu
        name="sort"
        multiple={false}
        options={[
          { _id: "-averageRating", name: "customer rating" },
          { _id: "name", name: "name" },
          { _id: "-createdAt", name: "newest" },
          { _id: "-price", name: "price-high to low" },
          { _id: "price", name: "price-low to high" },
          { _id: "-sold", name: "top-seller" },
        ]}
      />
      <Menu name="category" multiple={true} options={categories} />
      <Menu name="brand" multiple={true} options={brands} />
    </div>
  );
}
