import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLogged: false,
    isManager: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    isManagerFunction: (state, action) => {
      state.isManager = true;
    },
  },
});

export const userActions = user.actions;
export const userReducer = user.reducer;
