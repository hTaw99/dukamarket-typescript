import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type JwtPayload, jwtDecode } from "jwt-decode";

type CustomJwtPayload = {
  name: string;
  email: string;
  password: string;
} & JwtPayload;

type InitialState = {
  status: "unknown" | "logged_in" | "logged_out";
  user: {
    name: null | string;
    email: null | string;
    password: null | string;
    isAuthenticated: boolean;
    accessToken: null | string;
  };
};

const initialState: InitialState = {
  status: "unknown",
  user: {
    name: null,
    email: null,
    password: null,
    isAuthenticated: false,
    accessToken: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser(state, { payload }) {
      const { name, email, password, confirmPassword, accessToken } = payload;
      state.user.name = name;
      state.user.email = email;
      state.user.password = password;
      state.user.isAuthenticated = true;
      state.user.accessToken = accessToken;
      state.status = "logged_in";
    },

    setUserOnRefresh(state, action: PayloadAction<{ accessToken: string }>) {
      const { payload } = action;
      const { name, email, password } = jwtDecode<CustomJwtPayload>(
        payload.accessToken
      );

      state.user.name = name;
      state.user.email = email;
      state.user.password = password;
      state.user.isAuthenticated = true;
      state.user.accessToken = payload.accessToken;
      state.status = "logged_in";
    },
    logout(state) {
      state.user.name = null;
      state.user.email = null;
      state.user.password = null;
      state.user.accessToken = null;
      state.user.isAuthenticated = false;
      state.status = "logged_out";
    },
  },
});

export const { setUser, setUserOnRefresh, logout } = authSlice.actions;
export default authSlice.reducer;
