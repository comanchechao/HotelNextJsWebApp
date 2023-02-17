import { createSlice } from "@reduxjs/toolkit";

export const map = createSlice({
  name: "map",
  initialState: {
    lat: "",
    lng: "",
    marker2: "",
    marker3: "",
    lat2: "",
    lng2: "",
    lat3: "",
    lng3: "",
  },
  reducers: {
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setLng: (state, action) => {
      state.lng = action.payload;
    },
    setLat2: (state, action) => {
      state.lat2 = action.payload;
    },
    setLng2: (state, action) => {
      state.lng2 = action.payload;
    },
    setLat3: (state, action) => {
      state.lat3 = action.payload;
    },
    setLng3: (state, action) => {
      state.lng3 = action.payload;
    },
    setMarker2: (state, action) => {
      state.marker2 = action.payload;
    },
    setMarker3: (state, action) => {
      state.marker3 = action.payload;
    },
  },
});

export const mapActions = map.actions;
export const mapReducer = map.reducer;
