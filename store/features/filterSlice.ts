import { TFilterState } from "@/types/filter";
import { type PayloadAction, createSlice, current } from "@reduxjs/toolkit";

type InitialState = {
  filters: TFilterState;
};

const initialState: InitialState = {
  filters: {
    sort: "",
    category: [],
    brand: [],
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    setFilters(
      state,
      action: PayloadAction<{
        name: keyof TFilterState;
        value: string | string[];
      }>
    ) {
      const { name, value } = action.payload;
      if (name === "sort") {
        state.filters[name] = value as string;
      } else {
        state.filters[name] = value as string[];
      }
    },

    removeFilter(
      state,
      action: PayloadAction<{
        name: keyof TFilterState;
        value: string | string[];
      }>
    ) {
      const { name, value } = action.payload;
      if (name === "sort") {
        state.filters[name] = "";
      } else {
        state.filters[name] = state.filters[name].filter(
          (el) => el.split(",")[1] !== value
        );
      }
    },
    removeAllFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const { setFilters, removeFilter, removeAllFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
