import { TProduct } from "@/types/products";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TProductToView = Omit<
  TProduct<{ _id: string; name: string }>,
  | "createdAt"
  | "updatedAt"
  | "brand"
  | "category"
  | "subCategory"
  | "featured"
  | "user"
  | "freeShipping"
  | "quantity"
  | "sizes"
  | "sold"
  | "slug"
>;

type InitialState = {
  productToView: TProductToView | Record<string, never>;
};

const initialState: InitialState = {
  productToView: {},
};

const quickViewSlice = createSlice({
  name: "quickview",
  initialState,
  reducers: {
    setProductToView: (state, action: PayloadAction<TProductToView>) => {
      const { payload } = action;
      state.productToView = {
        _id: payload._id,
        name: payload.name,
        price: payload.price,
        images: payload.images,
        description: payload.description,
        colors: payload.colors,
        priceAfterDiscount: payload.priceAfterDiscount,
        averageRating: payload.averageRating,
        numReviews: payload.numReviews,
      };
    },
  },
});

export const { setProductToView } = quickViewSlice.actions;
export default quickViewSlice.reducer;
