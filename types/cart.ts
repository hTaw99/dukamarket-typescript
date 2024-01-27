import { TProduct } from "./products";

export type TCart = {
  createdAt: string;
  items: {
    amount: number;
    product: TProduct<{ _id: string; name: string }>;
    selectedColor: TProduct<{ _id: string; name: string }>["colors"][number];
    totalProductPrice: 39999;
    _id: string;
  }[];
  shippingFee: number;
  totalItems: number;
  totalPrice: number;
  updatedAt: string;
  _id: string;
};

export type TNotFoundCart = {
  message: string;
};

export type TGetCartReturn = TCart | TNotFoundCart;
