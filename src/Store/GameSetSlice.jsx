import { createSlice } from "@reduxjs/toolkit";

export const gameSetSlice = createSlice({
  name: "gameSet",
  initialState: {},
  reducers: {
    changeGameSet: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { changeGameSet } = gameSetSlice.actions;
export default gameSetSlice.reducer;
