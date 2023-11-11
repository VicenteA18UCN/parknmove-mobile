import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  id: null,
  name: null,
  lastname: null,
  email: null,
  token: null,
};

export const index = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const payload = jwtDecode(action.payload);
      state.id = payload.id;
      state.name = payload.name;
      state.lastname = payload.lastname;
      state.email = payload.email;
      state.token = action.payload;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.lastname = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const selectToken = (state) => state.user.token;
export const selectId = (state) => state.user.id;
export const selectName = (state) => state.user.name;
export const selectLastname = (state) => state.user.lastname;
export const selectEmail = (state) => state.user.email;

export const { login, logout } = index.actions;
