import { createSlice } from "@reduxjs/toolkit";
import { fnData, saveData } from "../common/Base";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {},
  reducers: {
    openModal: (state, action) => {
      state.value = action.payload;
    },
    closeModal: (state, action) => {
      state.value = false;
    },
  },
});
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
