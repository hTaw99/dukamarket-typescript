// "use client";

// import { useGetSimilarProducts } from "@/apis/products";
// import ListItem from "../ListItem";
// import ListItemSkeleton from "../ListItem/ListItemSkeleton";

// const SimilarProductClientWrapper = () => {
//   const { data: similarProducts, isPending } = useGetSimilarProducts({
//     productId,
//     limits: 3,
//   });

//   return (
//     <div className="sm:grid-cols-2 grid lg:flex xl:flex-col gap-4">
//       {isPending
//         ? Array.from({ length: 3 }, (e, i) => <ListItemSkeleton key={i} />)
//         : similarProducts?.map((product) => (
//             <ListItem key={product._id} product={product} />
//           ))}{" "}
//     </div>
//   );
// };

// export default SimilarProductClientWrapper;
