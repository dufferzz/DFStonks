import { createSlice } from "@reduxjs/toolkit";
const initialState: any = { isLoggedIn: false };

const authSlice = createSlice({
  name: "SocketData",
  initialState: initialState,
  reducers: {
    doLogin(state: any) {
      state.isLoggedIn = true;
    },

    doLogout(state: any) {
      state.isLoggedIn = false;
    },
  },
});

export const { doLogin, doLogout } = authSlice.actions;

export default authSlice.reducer;
