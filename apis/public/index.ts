import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { axiosDefault, baseURL } from "../AppClient";
import { TCategories } from "@/types/categories";
import { TBrands } from "@/types/brands";

// ######################### Get All Categories #########################
export async function getCategories(
  option: "onServer" | "onClient"
): Promise<TCategories> {
  if (option === "onServer") {
    const res = await fetch(`${baseURL}/categories`);
    return res.json();
  } else {
    const { data } = await axiosDefault({
      url: "/categories",
      method: "GET",
    });
    return data;
  }
}

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: () => getCategories("onClient"),
  });
};

// ######################### Get All Brands #########################
export async function getBrands(
  option: "onServer" | "onClient"
): Promise<TBrands> {
  if (option === "onServer") {
    const res = await fetch(`${baseURL}/brands`);
    return res.json();
  } else {
    const { data } = await axiosDefault({
      url: "/brands",
      method: "GET",
    });
    return data;
  }
}

export const useGetBrands = () => {
  return useQuery({
    queryKey: ["get-brands"],
    queryFn: () => getBrands("onClient"),
  });
};
