import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
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
