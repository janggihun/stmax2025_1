import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: { value: false },
  reducers: {
    openLoading: (state, action) => {
      state.value = true;
    },
    closeLoading: (state, action) => {
      state.value = false;
    },
  },
});
export const { openLoading, closeLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
  