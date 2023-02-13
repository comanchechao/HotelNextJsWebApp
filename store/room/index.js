import { createSlice } from "@reduxjs/toolkit";

export const room = createSlice({
  name: "room",
  initialState: {
    room: {
      id: 1,
      title: "",
      price: null,
      meal: null,
      quantity: 0,
    },
    room2: {
      id: 2,
      title: "",
      price: null,
      meal: null,
      quantity: 0,
    },
  },
  reducers: {
    setRoom: (state, action) => {
      state.room.price = action.payload.price;
      state.room.title = action.payload.title;
      state.room.meal = action.payload.meal;
      state.room.quantity = action.payload.quantity;
    },
    setRoom2: (state, action) => {
      state.room2.price = action.payload.price;
      state.room2.title = action.payload.title;
      state.room2.meal = action.payload.meal;
      state.room2.quantity = action.payload.quantity;
    },
    increaseQuantityRoomOne: (state, action) => {
      state.room.quantity++;
    },
  },
});

export const roomActions = room.actions;
export const roomReducer = room.reducer;
