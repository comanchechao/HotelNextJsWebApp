import { createSlice } from "@reduxjs/toolkit";

export const reservation = createSlice({
  name: "reservation",
  initialState: {
    enterDate: "",
    exitDate: "",
    city: "",
    hotelInfo: {
      title: "",
      id: null,
      price: null,
      stars: null,
    },
    room: "",
    people: "",
  },
  reducers: {
    setEnterting: (state, actions) => {
      state.enterDate = actions.payload;
    },
    setExiting: (state, actions) => {
      state.exitDate = actions.payload;
    },
    setCity: (state, actions) => {
      state.city = actions.payload;
    },
    setHotelInfo: (state, actions) => {
      state.hotelInfo.title = actions.payload.title;
      state.hotelInfo.id = actions.payload.id;
      state.hotelInfo.price = actions.payload.prices;
      state.hotelInfo.stars = actions.payload.stars;
    },
    setRoom: (state, actions) => {
      state.room = actions.payload;
    },
    setEnterting: (state, actions) => {
      state.enterDate = actions.payload;
    },
  },
});

export const reservationActions = reservation.actions;
export const reservationReducer = reservation.reducer;
