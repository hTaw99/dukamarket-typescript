import { TProduct, TProductToCompare } from "@/types/products";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  productsToCompare: TProductToCompare[];
};

const initialState: InitialState = {
  productsToCompare: [],
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addProductToCompare: (state, action: PayloadAction<TProductToCompare>) => {
      const { payload } = action;
      const selectedProduct = state.productsToCompare.findIndex(
        (p) => p.sku === payload.sku
      );

      selectedProduct !== -1 ? state : state.productsToCompare.push(payload);
    },
    removeProductFromCompare: (state, { payload }) => {
      state.productsToCompare.length === 1
        ? (state.productsToCompare = [])
        : (state.productsToCompare = state.productsToCompare.filter(
            (p) => p.sku !== payload.sku
          ));
    },
  },
});

export const { addProductToCompare, removeProductFromCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
