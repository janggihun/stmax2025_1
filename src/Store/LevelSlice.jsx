import { createSlice } from "@reduxjs/toolkit";
import { fnData, saveData } from "../common/Base";

export const levelSlice = createSlice({
  name: "level",
  initialState: {},
  reducers: {
    changeLevel: (state, action) => {
      state.value = action.payload;
      saveData("level", action.payload);
    },
  },
});
export const { changeLevel } = levelSlice.actions;
export default levelSlice.reducer;
