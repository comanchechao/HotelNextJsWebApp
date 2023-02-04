import { createSlice } from "@reduxjs/toolkit";

export const map = createSlice({
  name: "map",
  initialState: {
    lat: "",
    lng: "",
  },
  reducers: {
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setLng: (state, action) => {
      state.lng = action.payload;
    },
  },
});

export const mapActions = map.actions;
export const mapReducer = map.reducer;
