import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  tapValue: string;
  shownPicture: string;
};

const initialState: InitialState = {
  tapValue: "review",
  shownPicture: "",
};

const productDetailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    showDescription: (state) => {
      state.tapValue = "description";
    },
    showReview: (state) => {
      state.tapValue = "review";
    },
    setShownPicture: (state, { payload }) => {
      state.shownPicture = payload;
    },
  },
});

export const { showDescription, showReview, setShownPicture } =
  productDetailSlice.actions;
export default productDetailSlice.reducer;
