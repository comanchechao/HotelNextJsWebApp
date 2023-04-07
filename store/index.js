import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { filterReducer } from "./filterActivation";
import { mapReducer } from "./map/index";
import { reservationReducer } from "./reservation";
import { roomReducer } from "./room/index";
import { userReducer } from "./user/user";
import { mobileFilterReducer } from "./filterActivation/phoneFilters";
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
    room: roomReducer,
    user: userReducer,
    reserve: reservationReducer,
    filter: filterReducer,
    mobileFilter: mobileFilterReducer,
  },
});

// export default the store
export default store;

// export the action
export const mainActions = mainSlice.actions;
