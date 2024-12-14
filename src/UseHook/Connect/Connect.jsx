import { timestamp } from "../../common/Base";
import { addConnectUs } from "../../RestApi";

//누적 접속자수 판단 컴포넌트
export const Connect = () => {
  //오늘날짜를 취득
  const today = window.localStorage.getItem("today");

  if (!today) {
    window.localStorage.setItem("today", timestamp());
    addConnectUs();
  } else {
    //오늘날짜인 경우는 스킵
    if (today !== timestamp()) {
      //접속+1 추가
      addConnectUs();
    }
    window.localStorage.setItem("today", timestamp());
  }
};
