import { createSlice } from "@reduxjs/toolkit";

export const reservation = createSlice({
  name: "reservation",
  initialState: {
    enterDate: "",
    exitDate: "",
  },
  reducers: {
    setEnterting: (state, actions) => {
      state.enterDate = actions.payload;
    },
  },
});

export const reservationActions = reservation.actions;
export const reservationReducer = reservation.reducer;
