import { createSlice } from "@reduxjs/toolkit";

export const filter = createSlice({
  name: "filter",
  initialState: {
    stars: 5,

    minPrice: [],
    features: [],
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
    setFeatures: (state, action) => {
      if (state.features.indexOf(action.payload) === -1) {
        state.features.push(action.payload);
      } else {
        state.features.splice(state.features.indexOf(action.payload), 1);
      }
    },
  },
});

export const filterActions = filter.actions;
export const filterReducer = filter.reducer;
