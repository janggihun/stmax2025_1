import { getNowList, speedTimeHeight_play } from "../../../../../common/Base";
//숏노트 눌렀을때 효과
const noteHeight = 30;
const noteWidth = 95;
const marginLeft = 288;
const pannelTop = 710;
//왼쪽부터 몇 px인지 확인후 리턴
const checkPos = (index) => {
  //간격
  return index * noteWidth + index * 13;
};
/*노트 색깔별 */
const white = "linear-gradient(to right, gray, white, white, gray)";
const blue =
  "linear-gradient(to right,rgb(45, 57, 90),rgb(51, 158, 247),rgb(51, 158, 247),rgb(45, 57, 90))";
const gold = "linear-gradient(to right, rgb(175, 149, 0), gold, gold, rgb(175, 149, 0))";

export function RenderingNoteBox(
  self,
  allGameList,
  audioTime1,
  speed,
  speedList,
  intervalList,
  renderList_short,
  renderList_long,
  note_blue_List,
  note_white_List
) {
  const gameList = getNowList(allGameList, audioTime1);

  let bpmIndex = 0;
  let j = 0;

  //숏노트 롱노트를 그릴 인덱스 번째수
  let shortIndex = 0;
  let longIndex = 0;
  const CopyHitList = gameList.map((el) => {
    //숏노트인경우, 천천히 사라지게 만듬
    return el;
  });

  // 노트만들기
  if (speedList.length > 0) {
    const audioTime = speedTimeHeight_play(audioTime1, speedList, speed);
    CopyHitList.forEach((el, i) => {
      const nowNote = el;
      const NoteType = nowNote[0];
      const NotePos = checkPos(nowNote[1]);

      const StartTime = speedTimeHeight_play(nowNote[2], speedList, speed);
      const EndTime = speedTimeHeight_play(nowNote[3], speedList, speed);

      if (NoteType === "S") {
        if (!note_blue_List[shortIndex]) {
          createObjPooling(self, "S", note_blue_List);
        }
        note_blue_List[shortIndex].x = marginLeft + NotePos;
        note_blue_List[shortIndex].y = -EndTime + audioTime + pannelTop;

        shortIndex++;
      } else {
        if (!note_white_List[shortIndex]) {
          createObjPooling(self, "L", note_white_List);
        }
        //원래길이
        const LongHeight = EndTime - StartTime;
        //누른후 길이
        const LongHeight2 = EndTime - audioTime;
        note_white_List[longIndex].x = marginLeft + NotePos;
        note_white_List[longIndex].y = -EndTime + audioTime + pannelTop;
        note_white_List[longIndex].displayHeight = LongHeight + noteHeight;
        longIndex++;
        if (StartTime > audioTime) {
          //   div.style.height = LongHeight + 30 + "px";
        } else {
          //   const returnValue = intervalList.find((el_i, index) => {
          //     if (el_i[5] === el[5]) {
          //       // liveMap.current.intervalList[index][3] = audioTime;
          //       return true;
          //     }
          //   });
          //   if (returnValue) {
          //     div.style.height = LongHeight2 + 30 + "px";
          //   } else {
          //     div.style.height = LongHeight + 30 + "px";
          //   }
        }
      }
    });
  } else {
    const audioTime = audioTime1;

    CopyHitList.forEach((el, i) => {
      const nowNote = el;
      const NoteType = nowNote[0];
      const NotePos = checkPos(nowNote[1]);

      const StartTime = nowNote[2];
      const EndTime = nowNote[3];

      //색 조건

      if (NoteType === "S") {
        if (!note_blue_List[shortIndex]) {
          createObjPooling(self, "S", note_blue_List);
        }
        note_blue_List[shortIndex].x = marginLeft + NotePos;
        note_blue_List[shortIndex].y = (-EndTime + audioTime) * speed + pannelTop;
        shortIndex++;
      } else {
        if (!note_white_List[shortIndex]) {
          createObjPooling(self, "L", note_white_List);
        }
        const LongHeight = EndTime * speed - StartTime * speed;
        const LongHeight2 = EndTime * speed - audioTime * speed;
        note_white_List[longIndex].x = marginLeft + NotePos;
        note_white_List[longIndex].y = (-EndTime + audioTime) * speed + pannelTop;
        note_white_List[longIndex].displayHeight = LongHeight + noteHeight;
        longIndex++;

        // note_white_List[longIndex].height = LongHeight + noteHeight;
        // const returnValue = intervalList.find((el_i, index) => {
        //   if (el_i[5] === el[5]) {
        //     // liveMap.current.intervalList[index][3] = audioTime;
        //     return true;
        //   }
        // });
        // if (returnValue) {
        // } else {
        // }
      }
    });
  }
}

//만약 오브젝트 풀링 노트수가 부족한 경우에는 순간적으로 만들어서 사용한다
const createObjPooling = (self, noteType, list) => {
  if (noteType === "S") {
    const blue = self.add.image(900, 840, "note_blue").setOrigin(0);
    blue.depth = -1;
    list.push(blue);
  } else if (noteType === "L") {
    const white = self.add.image(900, 840, "note_white").setOrigin(0);
    white.depth = -1;
    list.push(white);
  }
};
