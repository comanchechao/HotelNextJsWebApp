import { createSlice } from "@reduxjs/toolkit";

export const reservation = createSlice({
  name: "reservation",
  initialState: {
    enterDate: "",
    exitDate: "",
    dates: [],
    passenger: 1,
    city: "",
    cities: [],
    hotelInfo: {
      title: "",
      id: null,
      price: null,
      stars: null,
    },
    room: "",
    people: "",
    passengers: [],
    passengerOne: {
      name: "",
      socialNumber: null,
      phoneNumber: null,
      gender: null,
    },
    passengerTwo: {
      name: "",
      socialNumber: null,
      phoneNumber: null,
      gender: null,
    },
    passengerThree: {
      name: "",
      socialNumber: null,
      phoneNumber: null,
      gender: null,
    },
    passengerFour: {
      name: "",
      socialNumber: null,
      phoneNumber: null,
      gender: null,
    },
  },
  reducers: {
    setDates: (state, actions) => {
      state.dates = actions.payload;
    },
    setEnterting: (state, actions) => {
      state.enterDate = actions.payload;
    },
    setExiting: (state, actions) => {
      state.exitDate = actions.payload;
    },
    setCities: (state, action) => {
      if (state.cities.indexOf(action.payload) === -1) {
        state.cities.push(action.payload);
      } else {
        state.cities.splice(state.cities.indexOf(action.payload), 1);
      }
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
    setPassengers: (state, actions) => {
      state.passengers = actions.payload;
    },
    setEnterting: (state, actions) => {
      state.enterDate = actions.payload;
    },
    increasePassenger: (state, action) => {
      if (state.passenger > 0 && state.passenger < 4) {
        state.passenger++;
      } else {
        console.log("no");
      }
    },
    decreamentPassenger: (state, action) => {
      if (state.passenger > 1) {
        state.passenger--;
      }
    },
    setPassengerOne: (state, actions) => {
      state.passengerOne.name = actions.payload.passengerOneName;
      state.passengerOne.socialNumber =
        actions.payload.passengerOneSocialNumber;
      state.passengerOne.phoneNumber = actions.payload.passengerOnePhoneNumber;
      state.passengerOne.gender = actions.payload.passengerOneGender;
    },
    setPassengerTwo: (state, actions) => {
      state.passengerTwo.name = actions.payload.passengerTwoName;
      state.passengerTwo.socialNumber =
        actions.payload.passengerTwoSocialNumber;
      state.passengerTwo.phoneNumber = actions.payload.passengerTwoPhoneNumber;
      state.passengerTwo.gender = actions.payload.passengerTwoGender;
    },
    setPassengerThree: (state, actions) => {
      state.passengerThree.name = actions.payload.passengerThreeName;
      state.passengerThree.socialNumber =
        actions.payload.passengerThreeSocialNumber;
      state.passengerThree.phoneNumber =
        actions.payload.passengerThreePhoneNumber;
      state.passengerThree.gender = actions.payload.passengerThreeGender;
    },
    setPassengerFour: (state, actions) => {
      state.passengerFour.name = actions.payload.passengerFourName;
      state.passengerFour.socialNumber =
        actions.payload.passengerFourSocialNumber;
      state.passengerFour.phoneNumber =
        actions.payload.passengerFourPhoneNumber;
      state.passengerFour.gender = actions.payload.passengerFourGender;
    },
  },
});

export const reservationActions = reservation.actions;
export const reservationReducer = reservation.reducer;
