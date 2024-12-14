import { createSlice } from "@reduxjs/toolkit";
import { fnData, saveData } from "../common/Base";

export const KeyTypeSlice = createSlice({
  name: "keyType",
  initialState: {},
  reducers: {
    changeKeyType: (state, action) => {
      state.value = action.payload;
      saveData("keyType", action.payload);
    },
  },
});
export const { changeKeyType } = KeyTypeSlice.actions;
export default KeyTypeSlice.reducer;
