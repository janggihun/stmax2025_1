import { NoteReadManager } from "../../../GameJsCommon/NoteReadManager";

//노트를 파싱
export async function get_noteList(musicCnt, level) {
  const res1 = await NoteReadManager(musicCnt, level);

  const timingPointList = res1[0];
  const hitList = res1[1];
  const lastTime = res1[2];
  const maxScore = 1000000;
  let noteCount = 0;
  res1[1].forEach((el) => {
    if (el[0] === "S") {
      noteCount += 1;
    } else if (el[0] === "L") {
      noteCount += 2;
    }
  });
  const singleNoteScore = maxScore / noteCount;
  const speedList = [];
  const bpmList = [];
  const gameList = res1[1].map((el) => {
    return el;
  });
  // console.log(res1[0]);
  res1[0].forEach((el) => {
    if (parseInt(el[1]) > 0) {
      bpmList.push(el);
    } else {
      const tempList = [];
      //3초 딜레이
      tempList.push(parseFloat(el[0]) + 3000);
      tempList.push(parseFloat(Math.abs(100 / el[1]).toFixed(2)));
      tempList.push(parseFloat(el[2]));
      tempList.push(parseFloat(el[3]));
      speedList.push(tempList);
    }
  });

  const check_bpmListAndSpeedList = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (res1[0].length === bpmList.length + speedList.length) {
          return resolve(1);
        } else {
          return resolve(check_bpmListAndSpeedList());
        }
      }, 500);
    });
  };
  // bpm리스트와 스피드 리스트가 잘 들어갔는지 체크 후 실행하는 메서드
  await check_bpmListAndSpeedList();

  return {
    timingPointList: timingPointList,
    hitList: hitList,
    lastTime: lastTime,
    singleNoteScore: singleNoteScore,
    speedList: speedList,
    gameList: gameList,
  };
}
