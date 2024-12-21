import { fnData, getNowList, speedTimeHeight } from "../../../../common/Base";

//왼쪽부터 몇 px인지 확인후 리턴
const checkPos = (index) => {
  return index * 90;
};
/*노트 색깔별 */
const white = "linear-gradient(to right, gray, white, white, gray)";
const blue =
  "linear-gradient(to right,rgb(45, 57, 90),rgb(51, 158, 247),rgb(51, 158, 247),rgb(45, 57, 90))";
const gold = "linear-gradient(to right, rgb(175, 149, 0), gold, gold, rgb(175, 149, 0))";

//숏노트 눌렀을때 효과
const changeOpacity1To0 = (div, StartTime, audioTime) => {
  const gijunTime = 0.4;
  const opacityCnt = 1 - (audioTime - StartTime) / gijunTime;
  console.log(audioTime);
  console.log(StartTime);
  div.style.opacity = opacityCnt;
};

export function CreateNote(liveMap) {
  const gameList = getNowList(liveMap.current.gameList, liveMap.current.audioTime);
  const speed = liveMap.current.speed;
  const addrMap = liveMap.current.addrMap;

  //전체 화면을 지운다.
  liveMap.current.objPoolingShortNoteList.forEach((el) => {
    el.style.left = 700 + "px";
  });
  liveMap.current.objPoolingLongNoteList.forEach((el) => {
    el.style.left = 700 + "px";
  });

  let bpmIndex = 0;
  let j = 0;
  //풀링 인덱스
  let shortIndex = 0;
  let longIndex = 0;
  //노트 색조정
  const noteColorFlag = fnData("noteColor");

  const CopyHitList = gameList.map((el) => {
    return el;
  });

  // 노트만들기

  const audiotTime1 = liveMap.current.audioTime;
  if (liveMap.current.speedList.length > 0) {
    const audioTime = speedTimeHeight(audiotTime1, liveMap, speed);
    CopyHitList.forEach((el, i) => {
      const nowNote = el;
      const NoteType = nowNote[0];
      const NotePos = checkPos(nowNote[1]);

      const StartTime = speedTimeHeight(nowNote[2], liveMap, speed);
      const EndTime = speedTimeHeight(nowNote[3], liveMap, speed);

      // const div = document.createElement("div");

      // div.style.border = "1px solid white";
      // div.style.boxSizing = "border-box";
      // div.style.width = 90 + "px";
      let div = null;
      if (NoteType === "S") {
        div = liveMap.current.objPoolingShortNoteList[shortIndex];
        if (!div) {
          createObjPooling(liveMap, "S");
          div = liveMap.current.objPoolingShortNoteList[shortIndex];
        }
        shortIndex++;
      } else if (NoteType === "L") {
        div = liveMap.current.objPoolingLongNoteList[longIndex];
        if (!div) {
          createObjPooling(liveMap, "L");
          div = liveMap.current.objPoolingLongNoteList[longIndex];
        }
        longIndex++;
      }

      //색 조건

      if (noteColorFlag === 0) {
        // noteColorFlag === 0 , 숏 : 노란색, 롱 : 흰색
        if (NoteType === "S") {
          div.style.background = gold;
        } else {
          div.style.background = white;
        }
      } else if (noteColorFlag === 1) {
        // noteColorFlag === 1 , 외부 : 흰색, 내부 : 파란색

        if (nowNote[1] === 0 || nowNote[1] === 3) {
          div.style.background = white;
        } else {
          div.style.background = blue;
        }
      }
      if (NoteType === "S") {
        div.style.top = -EndTime + audioTime + 710 + "px";
        div.style.left = NotePos + "px";
      } else {
        const LongHeight = EndTime - StartTime;
        const LongHeight2 = EndTime - audioTime;
        div.style.left = NotePos + "px";
        div.style.top = -EndTime + audioTime + 710 + "px";

        if (StartTime > audioTime) {
          div.style.height = LongHeight + 30 + "px";
        } else {
          const returnValue = liveMap.current.intervalList.find((el_i, index) => {
            if (el_i[5] === el[5]) {
              // liveMap.current.intervalList[index][3] = audioTime;
              return true;
            }
          });
          if (returnValue) {
            div.style.height = LongHeight2 + 30 + "px";
          } else {
            div.style.height = LongHeight + 30 + "px";
          }
        }
      }
    });
  } else {
    const audioTime = liveMap.current.audioTime;

    CopyHitList.forEach((el, i) => {
      const nowNote = el;
      const NoteType = nowNote[0];
      const NotePos = checkPos(nowNote[1]);

      const StartTime = nowNote[2];
      const EndTime = nowNote[3];
      //색 조건
      let div = null;
      if (NoteType === "S") {
        div = liveMap.current.objPoolingShortNoteList[shortIndex];
        if (!div) {
          createObjPooling(liveMap, "S");
          div = liveMap.current.objPoolingShortNoteList[shortIndex];
        }
        shortIndex++;
      } else if (NoteType === "L") {
        div = liveMap.current.objPoolingLongNoteList[longIndex];
        if (!div) {
          createObjPooling(liveMap, "L");
          div = liveMap.current.objPoolingLongNoteList[longIndex];
        }
        longIndex++;
      }

      if (noteColorFlag === 0) {
        // noteColorFlag === 0 , 숏 : 노란색, 롱 : 흰색
        if (NoteType === "S") {
          div.style.background = gold;
        } else {
          div.style.background = white;
        }
      } else if (noteColorFlag === 1) {
        // noteColorFlag === 1 , 외부 : 흰색, 내부 : 파란색

        if (nowNote[1] === 0 || nowNote[1] === 3) {
          div.style.background = white;
        } else {
          div.style.background = blue;
        }
      }
      if (NoteType === "S") {
        div.style.top = (-EndTime + audioTime) * speed + 710 + "px";
        div.style.left = NotePos + "px";
      } else {
        const LongHeight = EndTime * speed - StartTime * speed;
        const LongHeight2 = EndTime * speed - audioTime * speed;
        div.style.left = NotePos + "px";
        div.style.top = (-EndTime + audioTime) * speed + 710 + "px";
        if (StartTime > audioTime) {
          div.style.height = LongHeight + 30 + "px";
        } else {
          const returnValue = liveMap.current.intervalList.find((el_i, index) => {
            if (el_i[5] === el[5]) {
              // liveMap.current.intervalList[index][3] = audioTime;
              return true;
            }
          });
          if (returnValue) {
            div.style.height = LongHeight2 + 30 + "px";
          } else {
            div.style.height = LongHeight + 30 + "px";
          }
        }
      }
    });
  }
}
// const creteTempLine = () => {
//   //템포선 만들기
//   const lastTime1 = Math.floor(lastTime * speed); // 마지막 템포선 높이
//   // console.log(lastTime1);

//   for (let i = 0; i < lastTime1; i++) {
//     if (bpmList[bpmIndex + 1]) {
//       //아직 뒤값이 있음
//       if (i > parseFloat(bpmList[bpmIndex + 1][0])) {
//         bpmIndex++;
//         j = 0;
//       } else {
//         const startValue = parseFloat(bpmList[bpmIndex][0]);
//         const bpmValue = parseFloat(bpmList[bpmIndex][1]);
//         const echoValue = parseFloat(bpmList[bpmIndex][2]);
//         if (startValue + bpmValue * echoValue * j < i) {
//           const div = document.createElement("div");
//           div.classList.add("noteTempoLine");
//           div.style.top = -(3000 + startValue + bpmValue * echoValue * j) * speed + 30 + "px";
//           addrMap.$scrollBox.appendChild(div);
//           j++;
//         }
//       }
//     } else {
//       // 마지막임

//       const startValue = parseFloat(bpmList[bpmIndex][0]);
//       const bpmValue = parseFloat(bpmList[bpmIndex][1]);
//       const echoValue = parseFloat(bpmList[bpmIndex][2]);

//       if (startValue + bpmValue * echoValue * j < i) {
//         const div = document.createElement("div");
//         div.classList.add("noteTempoLine");
//         div.style.top = -(3000 + startValue + bpmValue * echoValue * j) * speed + 30 + "px";
//         addrMap.$scrollBox.appendChild(div);

//         j++;
//         // console.log(startValue + bpmValue * echoValue * j);
//       }
//     }
//   }
// };
export function CreateNote1(gameList, speed, addrMap, bpmList, lastTime) {
  // 노트만들기 // 인덱스 6번째 7번째 맞추기위함
  gameList.forEach((el, i) => {
    const div = "미정";
    //색 조건
    gameList[i].push(div);
    gameList[i].push(0);
  });
}

//오브젝트 풀링 갯수가 부족할때 실행

const createObjPooling = (liveMap, noteType) => {
  if (noteType === "S") {
    const div_short = document.createElement("div");
    div_short.style.border = "1px solid white";
    div_short.style.boxSizing = "border-box";
    div_short.style.width = 90 + "px";
    div_short.classList.add("ShortNote_4");
    liveMap.current.addrMap.$scrollBox.appendChild(div_short);
    liveMap.current.objPoolingShortNoteList.push(div_short);
  } else if (noteType === "L") {
    const div_long = document.createElement("div");
    div_long.style.border = "1px solid white";
    div_long.style.boxSizing = "border-box";
    div_long.style.width = 90 + "px";
    div_long.classList.add("LongNote_4");
    liveMap.current.addrMap.$scrollBox.appendChild(div_long);
    liveMap.current.objPoolingLongNoteList.push(div_long);
  }
};
