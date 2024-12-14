import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {},
  reducers: {
    changePlayer: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { changePlayer } = playerSlice.actions;
export default playerSlice.reducer;
