import { createSlice, current } from "@reduxjs/toolkit";

type InitialState = {
  isEditing: boolean;
};

const initialState: InitialState = {
  isEditing: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,

  reducers: {
    enableEditing(state) {
      state.isEditing = true;
    },
    disableEditing(state) {
      state.isEditing = false;
    },
  },
});

export const { enableEditing, disableEditing } = reviewSlice.actions;
export default reviewSlice.reducer;
