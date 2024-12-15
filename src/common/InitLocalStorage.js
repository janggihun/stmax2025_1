//키확인

export const check_KEY4 = () => {
  //키 리스트가 없는 경우
  const keyData = JSON.parse(window.localStorage.getItem("4keyList"));
  if (!keyData) {
    window.localStorage.setItem("4keyList", JSON.stringify([68, 70, 74, 75]));
  }
  //키 리스트가 영문인 경우
  const keyData1 = JSON.parse(window.localStorage.getItem("4keyList"));
  keyData1.forEach((el) => {
    if (isNaN(el)) {
      window.localStorage.setItem("4keyList", JSON.stringify([68, 70, 74, 75]));
    }
  });
};
//키확인

export const check_KEY7 = () => {
  //키 리스트가 없는 경우
  const keyData = JSON.parse(window.localStorage.getItem("7keyList"));
  if (!keyData) {
    window.localStorage.setItem("7keyList", JSON.stringify([83, 68, 70, 32, 74, 75, 76]));
  }
  //키 리스트가 영문인 경우
  const keyData1 = JSON.parse(window.localStorage.getItem("7keyList"));
  keyData1.forEach((el) => {
    if (isNaN(el)) {
      window.localStorage.setItem("7keyList", JSON.stringify([83, 68, 70, 32, 74, 75, 76]));
    }
  });
};
//selectList 추가 리스트
const tempList = [
  //keyType
  ["keyType", 4],
  //fps
  ["fps", 120],
  //speed
  ["speed", 1],
  //백그라운드 유튜브
  ["isYoutube", true],
  //미세조절
  ["helpInt", 0],
  //노트조절
  ["userAudioOffset", 0],
  //백그라운드 소리
  ["audioVolume", 0.5],
  //클릭시 소리
  ["eventVolume", 0.5],

  //음소거 ,
  ["soundOnOff", false],
  //난이도
  ["level", "easy"],
  //게임 패널위치
  ["gamePosition", "Left"],
  //어두움정도
  ["opacity", 0],
  //내 캐릭터 세팅
  ["emoticon", "gangzi"],
  //마지막 뮤직넘버
  ["lastMusicCnt_4", 1],
  //마지막 뮤직넘버
  ["lastMusicCnt_7", 1],

  //노트 색 변경
  ["noteColor", 0],
  //눌렀을때 소리
  ["effectVol", false],
  //눌렀을때 소리
  ["season", 2],
];

//selectList를 확인하여 최신이 아니면 최신과 같게 만들어준다.
export const check_SelectList = () => {
  const selectList = JSON.parse(window.localStorage.getItem("selectList"));

  //없다면 초기값 등록
  if (!selectList) {
    window.localStorage.setItem(`selectList`, JSON.stringify(tempList));
  } else {
    //최신 리스트인지확인
    if (JSON.stringify(selectList) !== JSON.stringify(tempList)) {
      const updateList = [];
      tempList.forEach((el, i) => {
        const returnValue = selectList.find((s_el) => {
          if (s_el[0] === el[0]) {
            return true;
          } else {
            return false;
          }
        });

        if (!returnValue) {
          updateList.push(tempList[i]);
        } else {
          updateList.push(returnValue);
        }
      });
      window.localStorage.setItem(`selectList`, JSON.stringify(updateList));
    }
  }
};
