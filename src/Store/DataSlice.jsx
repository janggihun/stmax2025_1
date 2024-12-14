import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {},
  reducers: {
    initDataList: (state, action) => {
      state.value = action.payload;
    },
    changeDatailList: (state, action) => {
      if (state.value) {
        state.value.detailList = action.payload;
      }
    },
  },
});
export const { initDataList, changeDatailList } = dataSlice.actions;
export default dataSlice.reducer;
