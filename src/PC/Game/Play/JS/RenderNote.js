import Phaser from "phaser";
import { getNowList, speedTimeHeight_play } from "../../../../common/Base";
//숏노트 눌렀을때 효과
const noteHeight = 30;
const noteWidth = 90;
const marginLeft = 340;
//왼쪽부터 몇 px인지 확인후 리턴
const checkPos = (index) => {
  //간격
  return index * noteWidth + index * 15;
};
/*노트 색깔별 */
const white = "linear-gradient(to right, gray, white, white, gray)";
const blue =
  "linear-gradient(to right,rgb(45, 57, 90),rgb(51, 158, 247),rgb(51, 158, 247),rgb(45, 57, 90))";
const gold = "linear-gradient(to right, rgb(175, 149, 0), gold, gold, rgb(175, 149, 0))";

export function RenderingNoteBox(
  graphics_short,
  graphics_long,
  allGameList,
  audioTime1,
  speed,
  speedList,
  intervalList,
  renderList_short,
  renderList_long
) {
  const gameList = getNowList(allGameList, audioTime1);

  //전체 화면을 지운다.
  //   graphics_short.clear();
  //   graphics_long.clear();
  let bpmIndex = 0;
  let j = 0;

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
        renderList_short.push(
          new Phaser.Geom.Rectangle(
            marginLeft + NotePos,
            -EndTime + audioTime + 710 + noteHeight / 2,
            noteWidth,
            noteHeight
          )
        );
      } else {
        //원래길이
        const LongHeight = EndTime - StartTime;
        //누른후 길이
        const LongHeight2 = EndTime - audioTime;
        // div.style.left = NotePos + "px";
        // div.style.top = -EndTime + audioTime + 710 + "px";
        renderList_long.push(
          new Phaser.Geom.Rectangle(
            marginLeft + NotePos,
            -EndTime + audioTime + 710 + LongHeight / 2 + noteHeight / 2,
            noteWidth,
            noteHeight
          )
        );
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

      const StartTime = nowNote[2] * speed;
      const EndTime = nowNote[3] * speed;

      //색 조건

      if (NoteType === "S") {
        renderList_short.push(
          new Phaser.Geom.Rectangle(
            marginLeft + NotePos,
            -EndTime + audioTime + 710 + noteHeight / 2,
            noteWidth,
            noteHeight
          )
        );
      } else {
        const LongHeight = EndTime - StartTime;
        const LongHeight2 = EndTime - audioTime;
        renderList_long.push(
          new Phaser.Geom.Rectangle(
            marginLeft + NotePos,
            -EndTime + audioTime + 710 + LongHeight / 2 + noteHeight / 2,
            noteWidth,
            noteHeight
          )
        );
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
  renderList_short.forEach((el) => {
    graphics_short.fillRectShape(el);
  });
  console.log(renderList_short);
}
