import { createSlice } from "@reduxjs/toolkit";

export const filter = createSlice({
  name: "filter",
  initialState: {
    stars: 5,
    maxPrice: 1000000,
    minPrice: 0,
    feature: null,
  },
  reducers: {
    setStars: (state, action) => {
      state.stars = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
  },
});

export const filterActions = filter.actions;
export const filterReducer = filter.reducer;
