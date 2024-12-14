export const NoteReadManager = async (musicCnt, level) => {
  const width = 90;
  let timingPointList = [];
  let hitList = [];
  let newHitList = [];
  let lastTime = 0;
  let content = null;
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", `/4key/${musicCnt}/${level}.osu`, false);
  xmlhttp.send();

  const findIndexInt = xmlhttp.responseURL.indexOf("nomal");
  if (findIndexInt !== -1) {
  }

  //파일 로드 성공 시 파일에서 읽은 텍스트를 content에 담음
  if (xmlhttp.status === 200) {
    content = xmlhttp.responseText;
  }
  const allList1 = content.split(`\n`);
  const judgeInd = allList1[0].indexOf("osu");

  if (judgeInd === -1) {
    if (level === "nomal") {
      xmlhttp.open("GET", `/Note/${musicCnt}/normal.osu`, false);
      xmlhttp.send();
      content = xmlhttp.responseText;
    }
  }
  // console.log(content);
  const allList = content.split(`\n`);
  //
  const version = parseInt(allList[0].replace("osu file format v", ""));

  let timgIndex = false;
  let hitIndex = false;
  allList.forEach((el, i) => {
    if (el.indexOf("TimingPoints") !== -1) {
      timgIndex = true;
    }
    if (el.indexOf("HitObjects") !== -1) {
      hitIndex = true;
      timgIndex = false;
    }

    if (timgIndex) {
      if (el.replace("\r", "").split(",") !== "") {
        let tmpList = el.replace("\r", "").split(",");
        tmpList.splice(3, 3);
        tmpList.splice(tmpList.length - 1, 1);
        if (tmpList.length === 0) {
          return false;
        }
        timingPointList.push(tmpList);
      }
    }

    ///////////////////히트리스트 변환 /////////////
    if (hitIndex) {
      let tmpList = el.replace("\r", "").split(",");
      tmpList.splice(1, 1);
      const tmpLast = tmpList[tmpList.length - 1];
      const tmpLastList = tmpLast.split(":");
      tmpList.push(tmpLastList[0]);

      tmpList.splice(tmpList.length - 2, 1);

      if (version === 14) {
        let newList = [];
        if (tmpList[0] === "64") {
          newList.push(0);
        } else if (tmpList[0] === "192") {
          newList.push(1);
        } else if (tmpList[0] === "320") {
          newList.push(2);
        } else if (tmpList[0] === "448") {
          newList.push(3);
        }

        newList.push(tmpList[1]);
        if (tmpList[2] === "128") {
          newList.unshift("L");
        } else {
          newList.unshift("S");
        }

        // newList.push(tmpList[3]);
        newList.push(tmpList[4]);
        if (newList[2] === undefined || newList[3] === undefined) {
          return false;
        }

        hitList.push(newList);
        newHitList = [];
        let hitCnt = 0;
        const tempValue = 3000; // 높이 보정값
        for (let el of hitList) {
          let tmpList = [];
          tmpList.push(el[0]);
          tmpList.push(el[1]);
          tmpList.push(parseInt(el[2]) + tempValue);
          if (el[0] === "S") {
            tmpList.push(parseInt(el[2]) + tempValue);
          } else {
            tmpList.push(parseInt(el[3]) + tempValue);
          }
          tmpList.push(0);
          tmpList.push(hitCnt);

          newHitList.push(tmpList);
          hitCnt++;
        }

        // console.log("시작");

        newHitList.forEach((el) => {
          let nowTmp = 0;
          if (el[0] === "S") {
            nowTmp = parseInt(el[2]);
          } else {
            nowTmp = parseInt(el[3]);
          }

          lastTime = Math.max(lastTime, nowTmp);
        });

        //다른버전
      } else if (version === 128) {
        let newList = [];
        if (tmpList[0] === "0") {
          newList.push(0);
        } else if (tmpList[0] === "128") {
          newList.push(1);
        } else if (tmpList[0] === "256") {
          newList.push(2);
        } else if (tmpList[0] === "384") {
          newList.push(3);
        }

        newList.push(tmpList[1]);
        if (tmpList[2] === "128") {
          newList.unshift("L");
        } else {
          newList.unshift("S");
        }

        // newList.push(tmpList[3]);
        newList.push(tmpList[4]);
        if (newList[2] === undefined || newList[3] === undefined) {
          return false;
        }

        hitList.push(newList);
        newHitList = [];
        let hitCnt = 0;
        const tempValue = 3000; // 높이 보정값
        // const tempValue = 0; // 높이 보정값
        for (let el of hitList) {
          let tmpList = [];
          tmpList.push(el[0]);
          tmpList.push(el[1]);
          tmpList.push(parseInt(el[2]) + tempValue);
          if (el[0] === "S") {
            tmpList.push(parseInt(el[2]) + tempValue);
          } else {
            tmpList.push(parseInt(el[3]) + tempValue);
          }
          tmpList.push(0);
          tmpList.push(hitCnt);

          newHitList.push(tmpList);
          hitCnt++;
        }

        // console.log("시작");

        newHitList.forEach((el) => {
          let nowTmp = 0;
          if (el[0] === "S") {
            nowTmp = parseInt(el[2]);
          } else {
            nowTmp = parseInt(el[3]);
          }

          lastTime = Math.max(lastTime, nowTmp);
        });
      }

      // console.log(newHitList);
    }
  });

  return [timingPointList, newHitList, lastTime];
};
