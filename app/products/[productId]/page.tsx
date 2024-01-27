import SimilarProducts from "@/components/singleProduct/SimilarProducts";
import ProductDetail from "@/components/singleProduct/ProductDetails";

import Reviews from "@/components/Reviews";
import Description from "@/components/Description";
import { getProduct, getProducts } from "@/apis/products";
import SwitchTabs from "@/components/singleProduct/SwitchTabs";

type SingleProductPageProps = {
  params: { productId: string };
};

// ####################################
export const generateMetadata = async ({ params }: SingleProductPageProps) => {
  const { productId } = params;
  const { product } = await getProduct(productId, "onServer");

  return {
    title: `Dukamarket - ${product?.name}`,
    description: `${product?.description}`,
  };
};

export const generateStaticParams = async () => {
  const data = await getProducts(
    { variables: { queries: { limit: 50 } } },
    "onServer"
  );

  return data.products.map((p) => ({
    productId: p._id,
  }));
};
// ####################################

const Product = async ({ params }: SingleProductPageProps) => {
  const { productId } = params;

  // #########################################################
  const { product } = await getProduct(productId, "onServer");
  // #########################################################

  return (
    <div className="container min-h-screen">
      <div className="grid grid-cols-1 xl:grid-cols-[5fr_2fr] w-full gap-4  mb-8">
        <div className="bg-white p-8 rounded-md">
          <ProductDetail productId={productId} {...product} />
        </div>

        <div className="bg-white p-8 rounded-md">
          <SimilarProducts productId={productId} />
        </div>
      </div>

      <div className="bg-white p-8 rounded-md">
        <SwitchTabs>
          <Reviews productId={productId} />
          <Description productId={productId} />
        </SwitchTabs>
      </div>
    </div>
  );
};

export default Product;
