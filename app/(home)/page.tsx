import Category from "@/components/Category";
import Hero from "@/components/Hero";
import NewArrival from "@/components/NewArrival";
import { getCategories } from "@/apis/public";

export const dynamic = "force-dynamic";

export default async function Home() {
  // #################################
  const categories = await getCategories("onServer");
  // #################################

  return (
    <div className="container min-h-screen">
      <Hero />
      <NewArrival />
      {categories?.map((cat) => (
        <Category key={cat._id} {...cat} />
      ))}
    </div>
  );
}
