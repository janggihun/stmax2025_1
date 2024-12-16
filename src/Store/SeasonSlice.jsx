import { createSlice } from "@reduxjs/toolkit";
import { fnData, saveData } from "../common/Base";

export const seasonSlice = createSlice({
  name: "season",
  initialState: { value: "" },
  reducers: {
    changeSeason: (state, action) => {
      state.value = action.payload;
      saveData("season", action.payload);
    },
  },
});
export const { changeSeason } = seasonSlice.actions;
export default seasonSlice.reducer;
