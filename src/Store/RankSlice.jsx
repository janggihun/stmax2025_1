import { createSlice } from "@reduxjs/toolkit";

export const rankSlice = createSlice({
  name: "rank",
  initialState: {},
  reducers: {
    initRankList: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { initRankList } = rankSlice.actions;
export default rankSlice.reducer;
