import { createSlice } from "@reduxjs/toolkit";

export const room = createSlice({
  name: "room",
  initialState: {
    room: {
      title: "",
      price: null,
      meal: null,
    },
    room2: {
      title: "",
      price: null,
      meal: null,
    },
  },
  reducers: {
    setRoom: (state, action) => {
      state.room.price = action.payload.price;
      state.room.title = action.payload.title;
      state.room.meal = action.payload.meal;
    },
    setRoom2: (state, action) => {
      state.room2.price = action.payload.price;
      state.room2.title = action.payload.title;
      state.room2.meal = action.payload.meal;
    },
  },
});

export const roomActions = room.actions;
export const roomReducer = room.reducer;
