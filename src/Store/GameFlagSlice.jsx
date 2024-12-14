import { createSlice } from "@reduxjs/toolkit";

export const gameFlagSlice = createSlice({
  name: "gameFlag",
  initialState: { value: true },
  reducers: {
    changeGameFlag: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { changeGameFlag } = gameFlagSlice.actions;
export default gameFlagSlice.reducer;
