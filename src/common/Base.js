import {
  addConnectUs,
  saveDaily,
  sendResultData_4key,
  sendResultData_4key_2,
  sendResultData_7key,
  sendResultData_7key_2,
} from "../RestApi";
import { levelList } from "./Array";
export const checkId = () => {
  if (window.localStorage.getItem("userId")) {
    window.location.href = "/STAGE";
  } else {
    window.location.href = "/";
  }
};
export const setting_MessageList = () => {
  return [
    "변경할 키를 눌러주세요",
    "원하시는 키를 눌러주세요(영문,한글,넘버키 가능), 취소는 esc키를 눌러주세요",
    "해당키는 게임에서 사용하실수 없습니다.",
    "중복 키 입니다.",
    "변경이 완료되었습니다.",
  ];
};

// 화면표시,세팅이름에 맞는 데이터를 가지고옴
export const fnData = (settingName) => {
  const selectList = JSON.parse(window.localStorage.getItem("selectList"));

  const returnValue = selectList.find((el) => {
    if (el[0] === settingName) {
      return true;
    } else {
      return false;
    }
  });
  return returnValue[1];
};
export const saveData = (settingName, data) => {
  const selectList = JSON.parse(window.localStorage.getItem("selectList"));

  const returnIndex = selectList.findIndex((el) => {
    if (el[0] === settingName) {
      return true;
    } else {
      return false;
    }
  });

  if (returnIndex === -1) {
    alert("설정 데이터 혹은 설정데이터 이름이 잘못되어 있습니다. 관리자에게 문의해주세요");
    return false;
  } else {
    selectList[returnIndex] = [settingName, data];

    window.localStorage.setItem("selectList", JSON.stringify(selectList));

    return true;
  }
};

//헤더 주소변환
export const get_Src_HeaderImg = (imgName) => {
  return "/Header/" + imgName + ".png";
};
//이미지 주소변환
export const get_Src_Img = (imgName) => {
  return "/Emoticon/" + imgName + ".png";
};
//뮤직 주소변환
export const get_Src_MusicImg = (keyType, musicCnt) => {
  if (keyType === 4) {
    return `/4key/${musicCnt}/thumbnail.jpg`;
  } else if (keyType === 7) {
    return `/7key/${musicCnt}/thumbnail.jpg`;
  }
};
export const get_Src_MusicImg1 = (keyType, musicCnt) => {
  if (keyType === 4) {
    return `/4key/${musicCnt}/thumbnail1.jpg`;
  } else if (keyType === 7) {
    return `/7key/${musicCnt}/thumbnail.jpg`;
  }
};
export function timestamp() {
  var today = new Date();
  // 미국시간 기준이니까 9를 더해주면 대한민국 시간됨
  today.setHours(today.getHours() + 9);
  // 문자열로 바꿔주고 T를 빈칸으로 바꿔주면 yyyy-mm-dd hh:mm:ss 이런 형식 나옴
  return today.toISOString().replace("T", " ").substring(0, 10);
}

//오늘 첫 접속시 누적에 추가
export const addTodayView = () => {
  const today = window.localStorage.getItem("today");
  if (!today) {
    window.localStorage.setItem("today", timestamp());
    addConnectUs();
  } else {
    if (today !== timestamp()) {
      //접속+1 추가
      addConnectUs();
    }
    window.localStorage.setItem("today", timestamp());
  }
};

//유저 아이디 유효성검사
export const valUserId = (navigate) => {
  console.log(window.localStorage.getItem("userId"));
  if (window.localStorage.getItem("userId")) {
    navigate("/stage");
  } else {
    navigate("/");
  }
};
//로그아웃
export const logout = () => {
  window.localStorage.removeItem("userId");
  window.location.href = "/";
};
export const fnSinger = (singerList, musicCnt) => {
  let String_Member = "";
  let mystic = 0;
  let cliche = 0;
  let universe = 0;
  const returnList = singerList.filter((el) => {
    if (el.musicCnt === musicCnt) {
      return el;
    } else {
      return false;
    }
  });

  returnList.forEach((el) => {
    if (el.StelliveCnt === 3 || el.StelliveCnt === 4) {
      mystic++;
    }
    if (
      el.StelliveCnt === 5 ||
      el.StelliveCnt === 6 ||
      el.StelliveCnt === 7 ||
      el.StelliveCnt === 8
    ) {
      universe++;
    }
    if (
      el.StelliveCnt === 9 ||
      el.StelliveCnt === 10 ||
      el.StelliveCnt === 11 ||
      el.StelliveCnt === 12
    ) {
      cliche++;
    }
    String_Member += el.NameKor + ", ";
  });

  if (mystic === 2 && returnList.length === 2) {
    String_Member = "미스틱";
  } else if (universe === 4 && returnList.length === 4) {
    String_Member = "유니버스";
  } else if (cliche === 4 && returnList.length === 4) {
    String_Member = "클리셰";
  }

  return String_Member.replace(/,\s*$/, "");
};
export const fnMember = (singerList, musicCnt) => {
  const tempList = [];
  singerList.forEach((el) => {
    if (el.musicCnt === musicCnt) {
      tempList.push(el.NameEng);
    }
  });

  return tempList;
};

//4키 데이터 , 7키 데이터 context에서 분류하기

//틱소리 주소
export const sound1 = "//daveceddia.com/freebies/react-metronome/click1.wav";
export const sound2 = "//daveceddia.com/freebies/react-metronome/click2.wav";
export const sound3 = "/sound/LNHS.wav";

export const makeDailyData = (liveMap, clear) => {
  const tmpMap = {
    musicCnt: liveMap.musicCnt,
    level: liveMap.level,
    userId: window.localStorage.getItem("userId"),
    clear: clear,
    keyType: fnData("keyType"),
  };

  saveDaily(tmpMap);
};

export const rankCheck = (percent) => {
  if (percent >= 98) {
    return "SSS";
  } else if (percent >= 97) {
    return "SS";
  } else if (percent >= 95) {
    return "S";
  } else if (percent >= 90) {
    return "A";
  } else if (percent >= 80) {
    return "B";
  } else if (percent >= 70) {
    return "C";
  } else if (percent >= 60) {
    return "D";
  } else if (percent >= 50) {
    return "E";
  } else if (percent >= 40) {
    return "F";
  }
};
//레벨 색
export const fnLevelColor = (value) => {
  if (value === "easy") {
    return "rgb(229, 255, 0)";
  } else if (value === "nomal") {
    return "rgb(142, 255, 13)";
  } else if (value === "hard") {
    return "rgb(61, 97, 255)";
  } else if (value === "stella") {
    return "rgb(255, 0, 0)";
  }
};

export const endGameSuccess = (liveMap) => {
  const tmpMap = {
    score: liveMap.current.score,
    stella: liveMap.current.stella,
    perfect: liveMap.current.perfect,
    good: liveMap.current.good,
    bad: liveMap.current.bad,
    miss: liveMap.current.miss,
    combo: liveMap.current.combo,
    maxCombo: liveMap.current.maxCombo,
    musicCnt: liveMap.current.musicCnt,
    level: liveMap.current.level,
    userId: window.localStorage.getItem("userId"),
    speed: liveMap.current.speed,
    success: 1,
    helpInt: liveMap.current.helpInt,
    userAudioOffset: liveMap.current.userAudioOffset,
    saveDate: timestamp(),
  };

  function timestamp() {
    var today = new Date();
    // 미국시간 기준이니까 9를 더해주면 대한민국 시간됨
    today.setHours(today.getHours() + 9);
    // 문자열로 바꿔주고 T를 빈칸으로 바꿔주면 yyyy-mm-dd hh:mm:ss 이런 형식 나옴
    return today.toISOString().replace("T", " ").substring(0, 19);
  }
  if (fnData("keyType") === 4) {
    sendResultData_4key(tmpMap, liveMap.current.replayList);
  } else if (fnData("keyType") === 7) {
    sendResultData_7key(tmpMap, liveMap.current.replayList);
  }
};
//시즌2 연습용
export const endGameSuccess2 = (liveMap) => {
  const tmpMap = {
    recordCnt: 0,
    season: 2,
    musicCnt: liveMap.current.musicCnt,
    userId: window.localStorage.getItem("userId"),
    level: liveMap.current.level,
    speed: liveMap.current.speed,
    score: liveMap.current.score,

    stmax100: liveMap.current.stella,
    stmax90: liveMap.current.perfect,
    stmax60: liveMap.current.good,
    stmax30: liveMap.current.bad,
    stmax0: liveMap.current.miss,

    maxCombo: liveMap.current.maxCombo,

    helpInt: liveMap.current.helpInt,
    userAudioOffset: liveMap.current.userAudioOffset,
    insertDate: timestamp(),
  };

  function timestamp() {
    var today = new Date();
    // 미국시간 기준이니까 9를 더해주면 대한민국 시간됨
    today.setHours(today.getHours() + 9);
    // 문자열로 바꿔주고 T를 빈칸으로 바꿔주면 yyyy-mm-dd hh:mm:ss 이런 형식 나옴
    return today.toISOString().replace("T", " ").substring(0, 19);
  }
  if (fnData("keyType") === 4) {
    sendResultData_4key_2(tmpMap, liveMap.current.replayList);
  } else if (fnData("keyType") === 7) {
    sendResultData_7key_2(tmpMap, liveMap.current.replayList);
  }
};

export const getNowList = (gameList, nowHeight) => {
  const nowList = [];

  for (let i = 0; i < gameList.length; i++) {
    if (gameList[i][3] < nowHeight - 500) {
      //해당시간 전에 있는 노트는 제외
      continue;
    } else if (gameList[i][2] > nowHeight + 1500) {
      //해당 시간보다 미래에 있는 노트는 제외
      break;
    } else {
      nowList.push(gameList[i]);
    }
  }

  return nowList;
};
//마지막 정보 넣기
export const lastMusicCnt = () => {
  const keyType = fnData("keyType");
  if (keyType === 4) {
    return fnData("lastMusicCnt_4");
  } else {
    return fnData("lastMusicCnt_7");
  }
};
//한국어로 레벨 변환
export const LevelTransfer = (temp) => {
  const level_Kor = levelList.find((el) => {
    if (el.level === temp) {
      return true;
    }
  });
  return level_Kor.kor;
};

export const getSampleList = (sampleCnt) => {
  let tmpList = [];

  for (let i = 0; i < sampleCnt; i++) {
    tmpList.push(i);
  }
  return tmpList;
};

//speed 에 대한 높이 구하는 메서드
export const speedTimeHeight = (time, liveMap, userSpeed) => {
  let returnHeight = 0;
  //speedList 0번째 : 구간 , 1번째 : 속도
  const speedList = liveMap.current.speedList;

  for (let i = 0; i < speedList.length; i++) {
    const iSpeed = speedList[i];

    const iNextSpeed = speedList[i + 1];
    if (iNextSpeed) {
      //항상 다음구간이 있음speedTimeHeight
      if (iNextSpeed[0] < time) {
        //이번 구간 전체값
        returnHeight += (iNextSpeed[0] - iSpeed[0]) * iSpeed[1] * userSpeed;
      } else {
        //이번구간내에서 값구하고 종료
        returnHeight += (time - iSpeed[0]) * iSpeed[1] * userSpeed;
        break;
      }
    } else {
      //다음구간이 없음 == 초과 구간
      returnHeight += (time - speedList[speedList.length - 1][0]) * iSpeed[1] * userSpeed;
      break;
    }
  }
  return returnHeight;
};
