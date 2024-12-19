import { createSlice } from "@reduxjs/toolkit";

export const youtubeSlice = createSlice({
  name: "youtube",
  initialState: { value: false, startTime: 0 },
  reducers: {
    changeYoutube: (state, action) => {
      state.value = action.payload.value;
      state.startTime = action.payload.startTime;
    },
  },
});
export const { changeYoutube } = youtubeSlice.actions;
export default youtubeSlice.reducer;
