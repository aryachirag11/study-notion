import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  laoding: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    loginUser: (state) => {
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
    },
    setLoading(state, action) {
      state.laoding = action.payload;
    },
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setToken, setLoading, setSignupData } =
  authSlice.actions;

export default authSlice.reducer;
