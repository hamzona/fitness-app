import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { accessToken: null },
  reducers: {
    setCredentials(state, action) {
      state.accessToken = action.payload;
    },
    logOut(state, action) {
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
