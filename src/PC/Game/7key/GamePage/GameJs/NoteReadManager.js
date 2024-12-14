export const NoteReadManager = async (musicCnt, level) => {
  let timingPointList = [];
  let hitList = [];
  let newHitList = [];
  let lastTime = 0;
  let content = null;
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", `/7key/${musicCnt}/${level}.osu`, false);
  xmlhttp.send();

  //파일 로드 성공 시 파일에서 읽은 텍스트를 content에 담음
  if (xmlhttp.status === 200) {
    content = xmlhttp.responseText;
  }
  const allList1 = content.split(`\n`);
  const judgeInd = allList1[0].indexOf("osu");

  if (judgeInd === -1) {
    if (level === "nomal") {
      xmlhttp.open("GET", `/7key/${musicCnt}/normal.osu`, false);
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

    let shortKey = 192;

    //구버전
    ///////////////////히트리스트 변환 /////////////
    if (hitIndex) {
      let tmpList = el.replace("\r", "").split(",");

      tmpList.splice(1, 1);
      const tmpLast = tmpList[tmpList.length - 1];
      const tmpLastList = tmpLast.split(":");
      tmpList.push(tmpLastList[0]);

      tmpList.splice(tmpList.length - 2, 1);

      tmpList.forEach((el, i) => {
        tmpList[i] = parseInt(tmpList[i]);
      });
      if (version === 14) {
        //오스의 키 버전8
        const key0 = 36;
        const key1 = 109;
        const key2 = 182;
        const key3 = 256;
        const key4 = 329;
        const key5 = 402;
        const key6 = 475;

        let newList = [];
        if (tmpList[0] === key0) {
          newList.push(0);
        } else if (tmpList[0] === key1) {
          newList.push(1);
        } else if (tmpList[0] === key2) {
          newList.push(2);
        } else if (tmpList[0] === key3) {
          newList.push(3);
        } else if (tmpList[0] === key4) {
          newList.push(4);
        } else if (tmpList[0] === key5) {
          newList.push(5);
        } else if (tmpList[0] === key6) {
          newList.push(6);
        }

        newList.push(tmpList[1]);
        if (tmpList[2] === 128) {
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
        //오스의 키 버전128

        const key0 = 0;
        const key1 = 74;
        const key2 = 147;
        const key3 = 220;
        const key4 = 293;
        const key5 = 366;
        const key6 = 439;

        let newList = [];
        if (tmpList[0] === key0) {
          newList.push(0);
        } else if (tmpList[0] === key1) {
          newList.push(1);
        } else if (tmpList[0] === key2) {
          newList.push(2);
        } else if (tmpList[0] === key3) {
          newList.push(3);
        } else if (tmpList[0] === key4) {
          newList.push(4);
        } else if (tmpList[0] === key5) {
          newList.push(5);
        } else if (tmpList[0] === key6) {
          newList.push(6);
        }

        newList.push(tmpList[1]);
        if (tmpList[2] === 128) {
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
    }
  });

  return [timingPointList, newHitList, lastTime, version];
};
