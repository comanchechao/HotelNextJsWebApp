import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { mapReducer } from "./map/index";

// create a slice
export const mainSlice = createSlice({
  name: "name",
  initialState: {
    title: "name",
  },
  reducers: {},
});
// config the store
const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    map: mapReducer,
  },
});

// export default the store
export default store;

// export the action
export const mainActions = mainSlice.actions;
