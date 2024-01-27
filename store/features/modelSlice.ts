import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isPictureModelOpen: boolean;
  isQuickViewModelOpen: boolean;
  isCartSideModelOpen: boolean;
  isCompareModelOpen: boolean;
};

const initialState: InitialState = {
  isPictureModelOpen: false,
  isQuickViewModelOpen: false,
  isCartSideModelOpen: false,
  isCompareModelOpen: false,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    openPictureModel(state) {
      state.isPictureModelOpen = true;
    },
    openQuickViewModel(state) {
      state.isQuickViewModelOpen = !state.isQuickViewModelOpen;
    },
    openCartSideModel(state) {
      state.isCartSideModelOpen = true;
    },
    openCompareModel(state) {
      state.isCompareModelOpen = true;
    },
    closePictureModel(state) {
      state.isPictureModelOpen = false;
    },
    closeQuickViewModel(state) {
      state.isQuickViewModelOpen = false;
    },
    closeCartSideModel(state) {
      state.isCartSideModelOpen = false;
    },
    closeCompareModel(state) {
      state.isCompareModelOpen = false;
    },
  },
});

export const {
  openPictureModel,
  openQuickViewModel,
  openCartSideModel,
  openCompareModel,
  closePictureModel,
  closeQuickViewModel,
  closeCartSideModel,
  closeCompareModel,
} = modelSlice.actions;
export default modelSlice.reducer;
