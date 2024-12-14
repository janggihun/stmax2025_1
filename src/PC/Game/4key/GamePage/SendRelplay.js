import axios from "axios";
const httpUrl = "https://stmax.online/api";
const getUrl = (url) => {
  return httpUrl + url;
};
export const getReplay = async (cnt) => {
  const res = await axios.post(getUrl("/music/getReplay"), cnt);
  return res.data;
};
export const delReplay = async (cnt) => {
  const res = await axios.delete(getUrl("/music/delReplay"), {
    params: {
      replayCnt: cnt,
    },
  });
  return res.data;
};
