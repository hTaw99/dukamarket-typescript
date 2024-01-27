export type TProduct<T> = {
  _id: string;
  averageRating: number;
  brand: T;
  category: T;
  subCategory: T;
  colors: T[];
  createdAt: string;
  description: string;
  featured: boolean;
  freeShipping: boolean;
  images: string[];
  name: string;
  numReviews: number;
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  sizes: string[];
  slug: string;
  sold: number;
  updatedAt: string;
  user: string;
};

export type TGetProductsReturn = {
  currentPage: number;
  lastPage: number;
  pageCount: number;
  products: TProduct<{ _id: string; name: string }>[];
  totalCount: number;
};

export type TProductToCompare = {
  image: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  colors: { _id: string; name: string }[];
  "numbers of reviews": string;
  "average rating": number;
};
