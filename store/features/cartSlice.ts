import { createSlice, current } from "@reduxjs/toolkit";

type InitialState = {
  totalItems: number;
  totalPrice: number;
  items: [];
  itemAmount: number;
};

const initialState: InitialState = {
  totalItems: 0,
  totalPrice: 0,
  items: [],
  itemAmount: 1,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart(state, { payload }) {
      state.totalItems = payload.cart?.totalItems || 0;
      state.totalPrice = payload.cart?.totalPrice || 0;
      state.items = payload.cart?.items || [];
    },

    increaseItemAmount(state) {
      state.itemAmount = state.itemAmount + 1;
    },
    decreaseItemAmount(state) {
      if (state.itemAmount > 1) {
        state.itemAmount = state.itemAmount + -1;
      }
    },

    removeCart(state, { payload }) {
      state.totalItems = 0;
      state.totalPrice = 0;
      state.items = payload.cart.items;
    },
  },
});

export const { setCart, removeCart, increaseItemAmount, decreaseItemAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
