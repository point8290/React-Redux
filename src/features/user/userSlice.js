import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isVendor: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.paylod;
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
