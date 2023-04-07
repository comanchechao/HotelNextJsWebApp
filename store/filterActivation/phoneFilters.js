import { createSlice } from "@reduxjs/toolkit";

export const MobileFilters = createSlice({
  name: "mobileFilters",
  initialState: {
    stars: null,
    city: "",
    minPrice: [],
    features: [],
    residenceTypes: [],
    residenceType: "",
    country: "",
  },
  reducers: {
    setStars: (state, action) => {
      state.stars = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
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
    setResidenceType: (state, actions) => {
      state.residenceType = actions.payload;
    },
    setCountry: (state, actions) => {
      state.country = actions.payload;
    },
    setResidenceTypes: (state, action) => {
      if (state.residenceTypes.indexOf(action.payload) === -1) {
        state.residenceTypes.push(action.payload);
      } else {
        state.residenceTypes.splice(
          state.residenceTypes.indexOf(action.payload),
          1
        );
      }
    },
  },
});

export const mobileFilterActions = MobileFilters.actions;
export const mobileFilterReducer = MobileFilters.reducer;
