import { TAddress } from "@/types/address";
import { createSlice, current } from "@reduxjs/toolkit";

type InitialState = {
  // shippingAddress: [];
  myAddress: TAddress | null;
  step: 1 | 2 | 3;
};

const initialState: InitialState = {
  // shippingAddress: [],
  myAddress: null,
  step: 1,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,

  reducers: {
    // setShippingAddress(state, { payload }) {
    //   if (state.shippingAddress.length === 0) {
    //     state.shippingAddress.push(payload);
    //     state.shippingAddress.forEach((item, i) => {
    //       item.id = i + 1;
    //     });
    //     state.myAddress = state.shippingAddress[0];
    //   } else {
    //     if (payload.useAsShippingAddress === true) {
    //       state.shippingAddress.map((add) =>
    //         add?.useAsShippingAddress
    //           ? (add.useAsShippingAddress = false)
    //           : null
    //       );
    //     }
    //     state.shippingAddress.push(payload);
    //     state.shippingAddress.forEach((item, i) => {
    //       item.id = i + 1;
    //     });

    //     state.myAddress = state.shippingAddress.find(
    //       (add) => add.useAsShippingAddress
    //     );
    //     
    //   }
    // },

    setMyAddress(state, { payload }) {
      // state.myAddress = state.shippingAddress.find((add) => add.id === payload);
      state.myAddress = payload;
    },

    setStep(state, { payload }) {
      state.step = payload;
    },
  },
});

export const { setMyAddress, setStep } = checkoutSlice.actions;
export default checkoutSlice.reducer;
