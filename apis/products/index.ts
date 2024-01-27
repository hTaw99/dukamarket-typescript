import { TGetProductsReturn, TProduct } from "@/types/products";
import { axiosDefault, baseURL } from "../AppClient";
import {
  DehydratedState,
  QueryFunctionContext,
  dehydrate,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import qs from "query-string";
import getQueryClient from "@/components/utils/getQueryClient";
import { TFilterState } from "@/types/filter";

export const productKeys = {
  all: (props: TGetProductsQueryKeyVariables) => ["products", props] as const,
  single: (productId: string) => ["get-single-product", productId] as const,
  similar: (props: TGetSimilarProductsQueryKeyVariables) =>
    ["get-similar-products", props] as const,
};



type TGetProductsQueryKeyVariables = {
  filters?: TFilterState;
  queries?: {
    [key: string]: string | number;
  };
  enabled?: boolean;
};

type TGetSimilarProductsQueryKeyVariables = {
  productId: string;
  limits: number;
};

// ######################### Get All Products #########################

type TOption = "onServer" | "onClient";

type ServerType = {
  pageParam?: never;
  variables: Omit<TGetProductsQueryKeyVariables, "enabled">;
};
type ClientType = {
  pageParam: number;
  variables: TGetProductsQueryKeyVariables;
};

type FirstArgument<T extends TOption> = T extends "onServer"
  ? ServerType
  : ClientType;

export const getProducts = async <T extends TOption>(
  { pageParam, variables }: FirstArgument<T>,
  option: T
): Promise<TGetProductsReturn> => {
  let filters = {} as TFilterState;
  if (variables?.hasOwnProperty("filters")) {
    for (let key in variables.filters) {
      if (key === "sort") {
        filters[key] = variables.filters[key].split(",")[0];
      } else {
        filters[key as keyof Omit<TFilterState, "sort">] = variables.filters[
          key as keyof Omit<TFilterState, "sort">
        ].map((f: string) => f.split(",")[0]);
      }
    }
  }

  filters = { ...filters, ...variables?.queries };

  const queryStr = qs.stringify(filters, {
    arrayFormat: "bracket",
    skipEmptyString: true,
    skipNull: true,
  });
  if (option === "onServer") {
    const res = await fetch(`${baseURL}/products?${queryStr}`, {
      next: { revalidate: 10, tags: ["allProducts"] },
    });
    return res.json();
  } else {
    const { data } = await axiosDefault({
      url: `/products?page=${pageParam}&${queryStr}`,
      method: "GET",
    });
    return data;
  }
};

// ------------------ ON SERVER ------------------
// export async function getProductsServer(queries?: {
//   [key: string]: string | number;
// }): Promise<TGetProductsReturn> {
//   const queryStr = qs.stringify(
//     queries as {
//       [key: string]: string | number;
//     },
//     {
//       arrayFormat: "bracket",
//       skipEmptyString: true,
//       skipNull: true,
//     }
//   );
//   const res = await fetch(`${baseURL}/products?${queryStr}`, {
//     next: { revalidate: 10 },
//   });
//   return res.json();
// }

// ------------------ PREFETCH ON SERVER ------------------
export const prefetchProducts = async (
  props: TGetProductsQueryKeyVariables
): Promise<DehydratedState> => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: productKeys.all(props),
    queryFn: ({ pageParam, queryKey }) => {
      const [string, variables] = queryKey;
      return getProducts({ pageParam, variables }, "onClient");
    },
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return dehydratedState;
};

export const useGetProducts = (props: TGetProductsQueryKeyVariables) => {
  return useInfiniteQuery({
    queryKey: productKeys.all(props),
    queryFn: ({ pageParam, queryKey }) => {
      const [string, variables] = queryKey;
      return getProducts({ pageParam, variables }, "onClient");
    },
    enabled: props.enabled ?? true,
    initialPageParam: 1,
    getNextPageParam: ({ currentPage, lastPage }) => {
      if (currentPage < lastPage) {
        return currentPage + 1;
      } else {
        return undefined;
      }
    },
  });
};

// ######################### Get Single Product #########################
export async function getProduct(
  productId: string,
  option: "onServer" | "onClient"
): Promise<{ product: TProduct<{ _id: string; name: string }> }> {
  if (option === "onServer") {
    const resProduct = await fetch(`${baseURL}/products/${productId}`, {
      // cache: "no-store",
      next: { tags: ["singleProduct"] },
    });
    return resProduct.json();
  } else {
    const { data } = await axiosDefault({
      url: `/products/${productId}`,
      method: "GET",
    });
    return data;
  }
}

export const useGetSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: productKeys.single(productId),
    queryFn: () => getProduct(productId, "onClient"),
    select: (data) => data.product,
  });
};

// ######################### Get Similar Products #########################
export async function getSimilarProducts(
  { productId, limits }: TGetSimilarProductsQueryKeyVariables,
  option: "onServer" | "onClient"
): Promise<{
  products: TProduct<{ _id: string; name: string }>[];
}> {
  const queryStr = qs.stringify(
    { limits },
    {
      skipNull: true,
    }
  );

  if (option === "onServer") {
    const res = await fetch(
      `${baseURL}/products/${productId}/similar?${queryStr}`
    );
    return res.json();
  } else {
    const { data } = await axiosDefault({
      url: `/products/${productId}/similar?${queryStr}`,
      method: "GET",
    });
    return data;
  }
}

export const useGetSimilarProducts = (
  props: TGetSimilarProductsQueryKeyVariables
) => {
  return useQuery({
    queryKey: productKeys.similar(props),
    queryFn: () => getSimilarProducts(props, "onClient"),
    select: (data) => data.products,
  });
};

type GetProductsType = "onServer" | "onClient";

const asasas = async <T extends GetProductsType>(
  firstArg: T extends "onServer" ? number : string,
  option: GetProductsType
): Promise<void> => {
  // Your implementation here
};

// const product = asasas<"onServer">("asas", "onServer");

// if I have a function like this const getProducts = (firstArg: {name: string, age: number}| {name: string}, option: "onServer" | "onClient") => {} I want to make the firstArg is of type {name:string}  when the option is "onClient" and the firstArg is of type {name: string, age: number}  when the option is "onServer" and when I call the function like this const product = await getProduct({name: string, age: number}, "onClient") I want the typescript give me error because I called function with its firstArg of type {name: string, age: number} but it should be of type {name: string} as an option is "onClient" ..... how to get this?
