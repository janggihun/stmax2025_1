import axios from "axios";

// const httpUrl = "https://port-0-stellivemusic-9zxht12blqae5mw2.sel4.cloudtype.app/api";

const httpUrl = "http://localhost:8080/api";
const getUrl = (url) => {
  return httpUrl + url;
};

//db통신 확인용

export const dbCheck = async () => {
  const res = await axios.post(getUrl("/stmax/dbCheck"));
  // const res = await axios.post("http://localhost:8080/api/stmax/dbCheck");

  return res.data;
};

// 로그인 서버 통신
export const Login = async (params) => {
  // const res = await axios.post("http://localhost:8080/stmax/login", {}
  const res = await axios.post(getUrl("/stmax/login"), {
    userId: params.userId,
    userPw: params.userPw,
  });
  return res.data;
};

//회원가입 서버 통신
export const Join = async (params) => {
  // const res = await axios.post("http://localhost:8080/stmax/join", {
  const res = await axios.post(getUrl("/stmax/join"), {
    userId: params.userId,
    userPw: params.userPw,
  });
  return res.data;
};

//회원가입 서버 통신
export const updateUserPw = async (params) => {
  // const res = await axios.post("http://localhost:8080/stmax/updatePw", {
  const res = await axios.post(getUrl("/stmax/updatePw"), {
    userId: params.userId,
    userPw: params.userPw,
  });

  return res.data;
};
export const loginUpdate = async () => {
  const userId = window.localStorage.getItem("userId");
  if (!userId) {
    return false;
  }
  await axios.post(getUrl("/connect/loginUpdate"), {
    userId: userId,
  });
};
/**
 *
 * 4키 7키 정보
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
//서버를 통해서 전체 데이터 취득
export const get_initMusic = async (keyType) => {
  const res = await axios.post(getUrl("/music/initData"), { keyType: keyType });
  // const res = await axios.post("http://localhost:8080/music/initData", { keyType: keyType });

  return res.data;
};

//서버를 통해서 랭크 데이터 취득
export const get_initRank = async (params) => {
  const res = await axios.post(getUrl("/music/rankData"), { keyType: params });

  // const res = await axios.post("http://localhost:8080/music/rankData", { keyType: params });

  return res.data;
};

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
//첫 채팅 클릭시 전체 데이터 획득
export const findMsg = async (userId) => {
  const res = await axios.post(getUrl("/chatt/findMsgbyRoomName"), { roomName: userId });
  // const res = await axios.post("http://localhost:8080/chatt/findMsgbyRoomName", {
  //   roomName: userId,
  // });
  return res.data;
};
//해더이미지 저장
export const saveHeaderImg = async (params) => {
  // const res = await axios.post("http://localhost:8080/music7/changeEmoticon", {
  const res = await axios.post(getUrl("/my/changeEmoticon"), {
    userId: params.userId,
    emoticon: params.emoticon,
  });
  return res.data;
};

export const sendResultData_7key = async (tmpMap, replayList) => {
  const limitCnt = 400;
  const tmpList = chunk(replayList, limitCnt);
  const res1 = await axios.post(getUrl("/music7/findScore"), tmpMap);

  // const res1 = await axios.post("http://localhost:8080/music7/findScore", tmpMap);

  if (res1.data === 1) {
    //기존 스코어보다 더 높은경우
    const res = await axios.post(getUrl("/music7/saveEndData"), tmpMap);
    // const res = await axios.post("http://localhost:8080/music7/saveEndData", tmpMap);

    const recordCnt = res.data;

    tmpList.forEach(async (elList) => {
      await axios.post(getUrl("/music7/saveReplayData"), {
        recordCnt: recordCnt,
        replayData: JSON.stringify(elList),
      });
    });
  }
};
export const sendResultData_4key = async (tmpMap, replayList) => {
  const limitCnt = 400;
  const tmpList = chunk(replayList, limitCnt);
  const res1 = await axios.post(getUrl("/key4/music/findScore"), tmpMap);

  // const res1 = await axios.post("http://localhost:8080/music7/findScore", tmpMap);

  if (res1.data === 1) {
    //기존 스코어보다 더 높은경우
    const res = await axios.post(getUrl("/key4/music/saveEndData"), tmpMap);
    // const res = await axios.post("http://localhost:8080/music7/saveEndData", tmpMap);

    const recordCnt = res.data;

    tmpList.forEach(async (elList) => {
      await axios.post(getUrl("/key4/music/saveReplayData"), {
        recordCnt: recordCnt,
        replayData: JSON.stringify(elList),
      });
    });
  }
};

function chunk(data, size) {
  let arr = [];

  for (let i = 0; i < data.length; i += size) {
    arr.push(data.slice(i, i + size));
  }

  return arr;
}
//리플레이 데이터 취득
export const getReplay_4key = async (recordCnt) => {
  // const res = await axios.post("http://localhost:8080/music7/getReplay", recordCnt);
  const res = await axios.post(getUrl("/key4/music/getReplay"), recordCnt);

  return res.data;
};
export const getReplay_7key = async (recordCnt) => {
  // const res = await axios.post("http://localhost:8080/music7/getReplay", recordCnt);
  const res = await axios.post(getUrl("/music7/getReplay"), recordCnt); //실행

  return res.data;
};

// export const delReplay = async (recordCnt) => {
//   const res = await axios.delete(
//     "/music/delReplay",
//     {
//       // const res = await axios.delete("http://localhost:8080/music/delReplay", {
//       params: {
//         recordCnt: recordCnt,
//       },
//     }
//   );
//   return res.data;
// };

export const getUpdateInfo = async (cnt) => {
  const res = await axios.post(getUrl("/update/info"), { pageNumber: cnt });
  // const res = await axios.post("http://localhost:8080/update/info", { pageNumber: cnt });
  return res.data;
};
export const getUpdateDetailInfo = async (updateCnt) => {
  const res = await axios.post(getUrl("/update/Detail"), { updateCnt: updateCnt });
  // const res = await axios.post("http://localhost:8080/update/Detail", { updateCnt: updateCnt });
  return res.data;
};
// export const getUpdatePage = async (cnt) => {
//   // const res = await axios.post("http://localhost:8080/update/page", { pageNumber: cnt });
//   const res = await axios.get(
//     "/update/page",
//     { cnt: cnt }
//   );
//   return res.data;
// };

export const getConnectUs = async () => {
  const res = await axios.get(getUrl("/connect/Us"));
  // const res = await axios.get("http://localhost:8080/music/connectUs");
  return res.data;
};

export const addConnectUs = async () => {
  await axios.get(getUrl("/connect/add"));
  // const res = await axios.get("http://localhost:8080/music/connectUs");
};
export const saveRequest = async (rq, userId) => {
  // const res = await axios.get("/music/connectUs");
  function timestamp() {
    var today = new Date();
    // 미국시간 기준이니까 9를 더해주면 대한민국 시간됨
    today.setHours(today.getHours() + 9);
    // 문자열로 바꿔주고 T를 빈칸으로 바꿔주면 yyyy-mm-dd hh:mm:ss 이런 형식 나옴
    return today.toISOString().replace("T", " ").substring(0, 19);
  }

  const tmpMap = { request_detail: rq, request_userId: userId, request_date: timestamp() };
  // const res = await axios.post("http://localhost:8080/save/request", tmpMap);
  const res = await axios.post(getUrl("/save/request"), tmpMap);
  return res.data;
};

export const getMessage = async (userId) => {
  const res = await axios.post(getUrl("/get/request"), { request_userId: userId });
  // const res = await axios.post("http://localhost:8080/get/request", { request_userId: userId });

  return res.data;
};
export const getAllMessage = async () => {
  const res = await axios.post(getUrl("/get/AllMessage"));
  // const res = await axios.post("http://localhost:8080/get/AllMessage");

  return res.data;
};
export const updateAns = async (requestCnt, request_ans) => {
  await axios.post(getUrl("/update/MessageAns"), {
    requestCnt: requestCnt,
    request_ans: request_ans,
  });
  // const res = await axios.post("http://localhost:8080/update/MessageAns", { requestCnt: requestCnt, request_ans: request_ans });
};
export const getAllReplay = async () => {
  const res = await axios.post(getUrl("/music/getReplayNote"));
  // const res = await axios.post("http://localhost:8080/music/getReplayNote");
  return res.data;
};

//데일리 저장

export const saveDaily = async (params) => {
  await axios.post(getUrl("/music/daily"), params);
  // const res = await axios.post("http://localhost:8080/music/daily", params);
};

export const getTryInfo = async (userId) => {
  const res = await axios.post(getUrl("/main/try"), {
    userId: userId,
  });
  // const res = await axios.post("http://localhost:8080/main/try", { userId: userId });

  return res.data;
};

//랭크 뮤직별로
export const getRank = async (params) => {
  const res = await axios.post(getUrl("/music/infoRank"), params);
  // const res = await axios.post("http://localhost:8080/music/infoRank", params);
  res.data.sort((a, b) => {
    return b.score - a.score;
  });
  return res.data;
};
//시즌2
export const getRank_2 = async (params) => {
  const res = await axios.post(getUrl("/music/seoson2/infoRank"), params);
  // const res = await axios.post("http://localhost:8080/music/infoRank", params);
  res.data.sort((a, b) => {
    return b.score - a.score;
  });
  return res.data;
};
//랭크 뮤직별로
export const getTitle = async () => {
  const res = await axios.post(getUrl("/title/initData"));
  // const res = await axios.post("http://localhost:8080/title/initData");

  return res.data;
};
//타이틀 로직 처리시작
export const logicTitle = async (conditionCnt) => {
  const userId = window.localStorage.getItem("userId");
  const res = await axios.post(getUrl("/title/logic"), {
    userId: userId,
    conditionCnt: conditionCnt,
  });
  return res.data;
};
// export const testlogicTitle = async (conditionCnt) => {
//   const userId = window.localStorage.getItem("userId");
//   const res = await axios.post("http://localhost:8080/title/logic", {
//     userId: userId,
//     conditionCnt: conditionCnt,
//   });
//   return res.data;
// };
//나의 칭호 찾기
export const getMyTitle = async (userId) => {
  const res = await axios.post(getUrl("/title/myTitleData"), { userId: userId });
  // const res = await axios.post("http://localhost:8080/title/myTitleData", { userId: userId });

  return res.data;
};
//칭호 적용하기
export const setMyTitle = async (params) => {
  const res = await axios.post(getUrl("/title/updateMyTitle"), params);
  // const res = await axios.post("http://localhost:8080/title/updateMyTitle", params);

  return res.data;
};
//랭킹에 적용할 타이틀 찾기
export const get_myTitle = async (userId) => {
  const res = await axios.post(getUrl("/title/getMyTitle"), { userId: userId });
  // const res = await axios.post("http://localhost:8080/title/getMyTitle", { userId: userId });

  return res.data;
};
//유저디테일 가지고 오기 적용할 타이틀 찾기
export const getUserLevel = async (userId) => {
  const res = await axios.post(getUrl("/my/getUserDetail"), { userId: userId });
  // const res = await axios.get("http://localhost:8080/main/UserDetail", {
  //   params: { userId: userId },
  // });

  return res.data;
};

export const getReplay_4 = async (cnt) => {
  const res = await axios.post(getUrl("/music/getReplay"), cnt);
  return res.data;
};
export const delReplay_4 = async (cnt) => {
  const res = await axios.delete(getUrl("/music/delReplay"), {
    params: {
      replayCnt: cnt,
    },
  });
  return res.data;
};

///시즌2///

export const sendResultData_4key_2 = async (tmpMap, replayList) => {
  const limitCnt = 400;
  const tmpList = chunk(replayList, limitCnt);
  const res = await axios.post(getUrl("/music/key4/saveEndData"), tmpMap);
  const recordCnt = res.data;
  console.log("recordCnt :", recordCnt);
  tmpList.forEach(async (elList) => {
    await axios.post(getUrl("/music/key4/saveReplayData"), {
      recordCnt: recordCnt,
      replayData: JSON.stringify(elList),
    });
  });
};

export const sendResultData_7key_2 = async (tmpMap, replayList) => {
  const limitCnt = 400;
  const tmpList = chunk(replayList, limitCnt);
  //기존 스코어보다 더 높은경우
  const res = await axios.post(getUrl("/music/key7/saveEndData"), tmpMap);
  const recordCnt = res.data;

  tmpList.forEach(async (elList) => {
    await axios.post(getUrl("/music/key7/saveReplayData"), {
      recordCnt: recordCnt,
      replayData: JSON.stringify(elList),
    });
  });
};
