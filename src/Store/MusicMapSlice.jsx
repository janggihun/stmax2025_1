import { createSlice } from "@reduxjs/toolkit";
import { fnData, saveData } from "../common/Base";

export const musicMapSlice = createSlice({
  name: "musicMap",
  initialState: {},
  reducers: {
    changeMusicMap: (state, action) => {
      state.value = action.payload;
      dataSave(action.payload);
    },
  },
});
export const { changeMusicMap } = musicMapSlice.actions;

export default musicMapSlice.reducer;

const dataSave = (data) => {
  const keyType = fnData("keyType");

  if (data) {
    if (keyType === 4) {
      saveData("lastMusicCnt_4", data.musicCnt);
    } else if (keyType === 7) {
      saveData("lastMusicCnt_7", data.musicCnt);
    }
  }
};
