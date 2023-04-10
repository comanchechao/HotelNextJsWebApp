import { createSlice } from "@reduxjs/toolkit";

export const room = createSlice({
  name: "room",
  initialState: {
    roomCheckout: null,
  },

  reducers: {
    setCheckout: (state, actions) => {
      state.roomCheckout = actions.payload;
    },
  },
});

export const roomActions = room.actions;
export const roomReducer = room.reducer;
