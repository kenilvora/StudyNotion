import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  signupData: null,
  loading: false,
  token: Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null,
  isValidToken: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setIsValidToken(state, action) {
      state.isValidToken = action.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken, setIsValidToken } =
  authSlice.actions;

export default authSlice.reducer;
