import { fnData } from "../../../common/Base";
import { changeGameSet } from "../../../Store/GameSetSlice";
import { openModal } from "../../../Store/ModalSlice";

export const createLiveMap = () => {
  const scope100 = 16.67;
  const scope90 = 16.67;
  const scope80 = 16.67;
  const scope70 = 16.67;
  const scope60 = 16.67;
  const scope50 = 16.67;
  const scope40 = 16.67;
  const scope30 = 16.67;
  const scope20 = 16.67;
  const scope10 = 16.67;
  const scope0 = 16.67;

  const MissScope = 155;
  const BadScope = 150;
  const GoodScope = 100;
  const PerfectScope = 50;
  const SetllaScope = 16.67; //1프레임 98.5
  const fps = 120;
  const tempMap = {};
  /////////////////////////////////////////////
  tempMap.keyList_4 = JSON.parse(window.localStorage.getItem("4keyList"));
  tempMap.keyList_7 = JSON.parse(window.localStorage.getItem("7keyList"));

  tempMap.keyMemoryList = [];
  ////////////////////////////
  tempMap.gameSet = 0;
  tempMap.keyType = fnData("keyType");
  tempMap.timingPointList = [];
  tempMap.hitList = [];
  tempMap.timingPointList = [];
  tempMap.version = 0;
  tempMap.gameList = [];

  //
  tempMap.replayMap = {};
  tempMap.replayList = [];

  tempMap.realTimeList = [];
  /////////////////
  tempMap.speedGameList = [];
  tempMap.bpmList = [];
  tempMap.speedList = [];

  tempMap.gameHeight = 0;
  ///////////////////////
  tempMap.fps = 120;

  tempMap.score = 0;
  tempMap.stella = 0;
  tempMap.perfect = 0;
  tempMap.good = 0;
  tempMap.bad = 0;
  tempMap.miss = 0;
  tempMap.combo = 0;
  tempMap.maxCombo = 0;

  ///시즌2
  tempMap.stmax100 = 0;
  tempMap.stmax90 = 0;
  tempMap.stmax80 = 0;
  tempMap.stmax70 = 0;
  tempMap.stmax60 = 0;
  tempMap.stmax50 = 0;
  tempMap.stmax40 = 0;
  tempMap.stmax30 = 0;
  tempMap.stmax20 = 0;
  tempMap.stmax10 = 0;
  tempMap.stmax0 = 0;

  //////////////////
  tempMap.key0 = 0;
  tempMap.key1 = 0;
  tempMap.key2 = 0;
  tempMap.key3 = 0;
  tempMap.key4 = 0;
  tempMap.key5 = 0;
  tempMap.key6 = 0;
  ////////////////////////
  tempMap.barValue = 98;
  ////////////////////////////////
  tempMap.lifeCnt = 20;
  tempMap.feverMultifly = 1;
  tempMap.feverCnt = 0;
  tempMap.feverLifeRecureCnt = 0;
  tempMap.EffectCnt = 0;
  tempMap.nowIndex = 0;
  //////////////////////////////
  tempMap.audio = "";
  tempMap.audioIndex = 0;
  ///////////////////////////////
  tempMap.audioCurrent = 0;
  tempMap.intervalList = [];
  /////////////////////////////////
  //끝나는 시간
  tempMap.lastTime = 0;
  //////////////////////////
  tempMap.pos = 0;

  ////////////////////////////
  tempMap.Group = null;
  tempMap.musicMap = {};
  tempMap.musicCnt = 0;
  tempMap.level = "";
  tempMap.speed = 1;
  tempMap.userAudioOffset = 0;
  tempMap.helpInt = 0;

  ///////////
  //주소값
  tempMap.addrMap = {};
  tempMap.jhPool = {};
  tempMap.audioTime = 0; // frame값 == offsetY==audioTime

  // ticker
  tempMap.tickerInterval = null;
  tempMap.requestAni = null;
  //게임 시작값

  tempMap.startTime = 0;

  tempMap.dispatch = null;

  //렌더링시 보는값 정리

  ///
  /*





  함수 시작








*/

  tempMap.speedPlus = () => {
    //변동스피드
    let gameSpeed = 0;
    const speedList = tempMap.speedList;
    for (let i = 0; i < speedList.length; i++) {
      if (speedList[i + 1]) {
        if (speedList[i + 1][0] > tempMap.audioTime) {
          gameSpeed = speedList[i][1];
          break;
        }
      } else {
        gameSpeed = [speedList.length - 1][1];
      }
    }
    tempMap.gameHeight = tempMap.gameHeight + gameSpeed * Math.floor(1000 / fps);
  };
  //이펙트 표시
  tempMap.ShowEffect = (pos) => {
    tempMap.EffectCnt++;

    if (tempMap.EffectCnt === 20) {
      tempMap.EffectCnt = 0;
    }
    const nowEffect = tempMap.addrMap.EffectList[tempMap.EffectCnt];
    nowEffect.classList.remove("EffectAnimation");
    void nowEffect.offsetWidth;
    nowEffect.classList.add("EffectAnimation");
    nowEffect.style.left = pos + "px";
  };
  //치우치는 선 만들기
  tempMap.LitJudgeMent = (diff) => {
    const posX = 98 - diff / 2;

    const div = tempMap.jhPool.get();

    div.style.left = posX + "px";
  };
  // 판정하기
  tempMap.judgeMent = () => {
    // gameList [노트타입, 누르는키자리, 누르는시간, 때는시간, 인터벌용, 인덱스, 주소값, 사용한값확인]

    const audioFrameTime = tempMap.audioTime;

    const keyCheckList = [];
    //키체크 리스트 만들기

    tempMap.keyMemoryList.forEach((el, i) => {
      if (el[1] <= audioFrameTime) {
        keyCheckList.push(el);

        tempMap.keyMemoryList.splice(i, 1);
      }
    });

    //키 판정 시작
    keyCheckList.forEach((key_el, i) => {
      const pushList = [];

      const tmpList = keyCheckList[i];

      const keyStatus = tmpList[0];
      const keyTime = tmpList[1] - tempMap.helpInt;
      const keyIndex = tmpList[2];

      key_el.push(tempMap.nowIndex);
      key_el.push(i);
      tempMap.replayList.push(key_el);
      // console.log(gameList);
      tempMap.gameList.forEach((el) => {
        if (keyTime - BadScope <= el[2] && el[2] <= keyTime + MissScope && el[7] === 0) {
          pushList.push(el);
        }
      });
      if (keyStatus === 1) {
        pushList.find((el) => {
          if (el[1] === keyIndex) {
            el[7] = 1;

            if (el[0] === "L") {
              //롱노트인경우
              tempMap.intervalList.push(el);
              el[4] = 1;
            } else {
              //숏노트인경우, 천천히 사라지게 만듬
              el[6].style.transition = "all 0.2s";
              el[6].style.opacity = 0;
            }

            const diff = el[2] - keyTime;
            // console.log("diff : ", diff);
            tempMap.CheckjudgeMent(diff, el);
            tempMap.LitJudgeMent(diff);

            return true;
          }
        });
      } else {
        tempMap.intervalList.findIndex((el, i) => {
          if (el[1] === keyIndex) {
            const diff = el[3] - keyTime;
            tempMap.CheckjudgeMent(diff, el);
            tempMap.LitJudgeMent(diff);

            tempMap.intervalList.splice(i, 1);
            return true;
          }
        });
      }
    });

    //하단 미스 확인

    tempMap.gameList.forEach((el) => {
      if (el[2] < audioFrameTime - BadScope - tempMap.helpInt && el[7] === 0) {
        el[7] = 1;
        // console.log("미스");
        tempMap.CheckjudgeMent(160, el);
      }
    });

    // 롱노트 미스 확인
    tempMap.intervalList.forEach((el, i) => {
      if (
        audioFrameTime - el[2] - tempMap.helpInt >= el[4] * BadScope &&
        audioFrameTime <= el[3] - BadScope - tempMap.helpInt
      ) {
        el[4]++;
        tempMap.CheckjudgeMent(0, el);
      }

      if (el[3] < audioFrameTime - BadScope - tempMap.helpInt) {
        if (el[0] === "L") {
          el[6].className = "overPushed";
        }

        tempMap.CheckjudgeMent(160, el); // 미스
        tempMap.intervalList.splice(i, 1);
      }
    });

    //마지막 시간 구하기
    if (tempMap.lastTime < audioFrameTime) {
      tempMap.lastTime = 9999999;
      tempMap.addrMap.$LineContainer.style.transition = "all 1s";
      tempMap.addrMap.$LineContainer.style.backgroundColor = "#3c0014c4";
      setTimeout(() => {
        // 게임종료
        tempMap.dispatch(changeGameSet(2));
        clearInterval(tempMap.tickerInterval);
      }, 2000);
    }
  };
  tempMap.CheckRecure = () => {
    if (tempMap.lifeCnt <= 20) {
      if (tempMap.feverLifeRecureCnt === 20) {
        tempMap.feverLifeRecureCnt = 0;
        if (
          (tempMap.gameSet !== 2 || tempMap.gameSet !== 3) &&
          tempMap.lifeBoxList[19 - tempMap.lifeCnt]
        ) {
          if (tempMap.lifeCnt < 20) {
            tempMap.lifeCnt++;
          }
        }
      }
      tempMap.feverLifeRecureCnt++;
      // console.log("feverLifeRecureCnt : ", feverLifeRecureCnt.current);
    }
  };

  /*
  
  
  
  
  
  
  리플레이
  
  
  
  
  
  */
  tempMap.replayjudgeMent = () => {
    // gameList [노트타입, 누르는키자리, 누르는시간, 때는시간, 인터벌용, 인덱스, 주소값, 사용한값확인]

    const audioFrameTime = tempMap.audioTime;

    const keyCheckList = [];

    //리플레이 리스트 만들기
    if (tempMap.replayList[0]) {
      tempMap.replayList.forEach((el, i) => {
        if (el[3] <= tempMap.nowIndex) {
          keyCheckList.push(el);

          tempMap.replayList.splice(i, 1);
        }
      });
    }
    keyCheckList.sort((a, b) => {
      return a[4] - b[4];
    });

    //키 판정 시작
    keyCheckList.forEach((key_el, i) => {
      const tmpList = keyCheckList[i];

      const keyStatus = tmpList[0];
      const keyTime = tmpList[1] - tempMap.helpInt;
      const keyIndex = tmpList[2];
      const pushList = [];
      tempMap.gameList.forEach((el) => {
        if (keyTime - BadScope <= el[2] && el[2] <= keyTime + MissScope && el[7] === 0) {
          pushList.push(el);
        }
      });
      if (keyStatus === 1) {
        tempMap.findDownKey_replay(keyIndex);
        pushList.find((el) => {
          if (el[1] === keyIndex) {
            el[7] = 1;

            if (el[0] === "L") {
              //롱노트인경우
              tempMap.intervalList.push(el);
              el[4] = 1;
            } else {
              el[6].style.transition = "all 0.2s";
              el[6].style.opacity = 0;
            }

            const diff = el[2] - keyTime;

            tempMap.CheckjudgeMent(diff, el);
            tempMap.LitJudgeMent(diff);

            return true;
          }
        });
      } else {
        tempMap.findUpKey_replay(keyIndex);
        tempMap.intervalList.findIndex((el, i) => {
          if (el[1] === keyIndex) {
            const diff = el[3] - keyTime;
            tempMap.CheckjudgeMent(diff, el);
            tempMap.LitJudgeMent(diff);

            tempMap.intervalList.splice(i, 1);
            return true;
          }
        });
      }
    });

    //하단 미스 확인

    tempMap.gameList.forEach((el) => {
      if (el[2] < audioFrameTime - BadScope - tempMap.helpInt && el[7] === 0) {
        el[7] = 1;
        // console.log("미스");
        tempMap.CheckjudgeMent(160, el);
      }
    });

    // 롱노트 미스 확인
    tempMap.intervalList.forEach((el, i) => {
      if (
        audioFrameTime - el[2] - tempMap.helpInt >= el[4] * BadScope &&
        audioFrameTime <= el[3] - BadScope - tempMap.helpInt
      ) {
        el[4]++;
        tempMap.CheckjudgeMent(0, el);
      }

      if (el[3] < audioFrameTime - BadScope - tempMap.helpInt) {
        if (el[0] === "L") {
          el[6].className = "overPushed";
        }

        tempMap.CheckjudgeMent(160, el); // 미스
        tempMap.intervalList.splice(i, 1);
      }
    });

    //마지막 시간 구하기
    if (tempMap.lastTime < audioFrameTime) {
      tempMap.lastTime = 9999999;
      tempMap.addrMap.$LineContainer.style.transition = "all 1s";
      tempMap.addrMap.$LineContainer.style.backgroundColor = "#3c0014c4";

      setTimeout(() => {
        // 게임종료

        tempMap.dispatch(openModal("리플레이가  완료되었습니다. "));
        clearInterval(tempMap.tickerInterval);
      }, 2000);
    }
  };
  tempMap.CheckRecure = () => {
    if (tempMap.lifeCnt <= 20) {
      if (tempMap.feverLifeRecureCnt === 20) {
        tempMap.feverLifeRecureCnt = 0;

        if (tempMap.lifeCnt < 20) {
          tempMap.lifeCnt++;
        }
      }
      tempMap.feverLifeRecureCnt++;
    }
  };
  //피버 증가
  tempMap.feverCheck = () => {
    if (tempMap.feverCnt >= 50) {
      tempMap.feverCnt = 0;

      if (tempMap.feverMultifly < 5) {
        tempMap.feverMultifly++;
        tempMap.addrMap.$GameFever.innerHTML = `<div class="Game_FeverPannel_ani"> x ${tempMap.feverMultifly}</div>`;
      }
    }
  };
  //왼쪽부터 몇 px인지 확인후 리턴
  tempMap.checkPos = (index) => {
    let res = 0;
    if (tempMap.keyType === 4) {
      res = 90 * index;
    } else if (tempMap.keyType === 7) {
      if (index === 0) {
        res = 0;
      } else if (index === 1) {
        res = 60;
      } else if (index === 2) {
        res = 60 + 60;
      } else if (index === 3) {
        res = 60 + 60 + 60;
      } else if (index === 4) {
        res = 60 + 60 + 60 + 70;
      } else if (index === 5) {
        res = 60 + 60 + 60 + 70 + 60;
      } else if (index === 6) {
        res = 60 + 60 + 60 + 70 + 60 + 60;
      }
    }
    return res;
  };

  tempMap.CheckjudgeMent = (diff, el) => {
    const tempBar = diff / 5;

    const pos = tempMap.checkPos(el[1]);
    const abs_diff = Math.abs(diff);
    // console.log(diff);
    if (abs_diff <= SetllaScope) {
      // console.log("stella");
      tempMap.stella++;
      tempMap.combo++;
      tempMap.feverCnt++;
      tempMap.score = tempMap.score + 10 * tempMap.feverMultifly;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);

      tempMap.addrMap.$dataStatus.innerHTML = `<div class="AccPercentStella">Stella 100%</div>`;
      tempMap.CheckRecure();
      tempMap.feverCheck();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= PerfectScope) {
      // console.log("perfect");
      tempMap.perfect++;
      tempMap.combo++;
      tempMap.feverCnt++;
      tempMap.score = tempMap.score + 5 * tempMap.feverMultifly;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);
      tempMap.addrMap.$dataStatus.innerHTML = `<div class="AccPercentPerfect">Perfect 90%</div>`;

      tempMap.CheckRecure();
      tempMap.feverCheck();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= GoodScope) {
      tempMap.good++;
      tempMap.combo++;
      tempMap.feverCnt++;
      tempMap.score = tempMap.score + 3 * tempMap.feverMultifly;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);

      tempMap.addrMap.$dataStatus.innerHTML = `<div class="AccPercentGood">Good 60%</div>`;

      tempMap.CheckRecure();
      tempMap.feverCheck();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= BadScope) {
      tempMap.bad++;
      tempMap.combo++;
      tempMap.feverCnt++;
      tempMap.score = tempMap.score + 1 * tempMap.feverMultifly;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);

      tempMap.addrMap.$dataStatus.innerHTML = `<div class="AccPercentBad">Bad 30%</div>`;

      tempMap.CheckRecure();
      tempMap.feverCheck();
      tempMap.ShowEffect(pos);
    } else {
      tempMap.addrMap.$dataStatus.innerHTML = `<div class="AccPercentMiss">Miss 0%</div>`;

      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);

      tempMap.minusLife();

      tempMap.miss++;

      tempMap.feverLifeRecureCnt = 0;

      tempMap.combo = 0;

      tempMap.feverCnt = 0;

      tempMap.feverMultifly = 1;
    }

    //fever확인

    if (abs_diff > BadScope && el[0] === "L") {
      el[6].className = "overPushed";
    }
    tempMap.barValue = 98 - tempBar;
    tempMap.addrMap.$Game_ComboInt.innerHTML = `<div class="Game_ComboInt">${tempMap.combo}</div>`;
  };

  tempMap.minusLife = () => {
    tempMap.lifeCnt--;
    if (tempMap.lifeCnt < 0) {
      // 종료 메서드 실행
      if (tempMap.lifeCnt === -1) {
        //게임 종료 메서드
        tempMap.dispatch(changeGameSet(3));
      }
      return false;
    }
  };
  //키 누를때

  //리플 키 누름

  //키 누를때
  tempMap.findDownKey_replay = (keyValue) => {
    if (tempMap.keyType === 4) {
      replay_downKey_4(keyValue);
    } else if (tempMap.keyType === 7) {
      replay_downKey_7(keyValue);
    }
  };

  //키 떌떄
  tempMap.findUpKey_replay = (keyValue) => {
    //
    if (tempMap.keyType === 4) {
      replay_upKey_4(keyValue);
    } else if (tempMap.keyType === 7) {
      replay_upKey_7(keyValue);
    }
  };

  /*



 ****************    4키     ************************



*/
  const replay_downKey_4 = (keyValue) => {
    if (keyValue === 0) {
      if (tempMap.key0 === 0) {
        tempMap.key0 = 1;
      }
    } else if (keyValue === 1) {
      if (tempMap.key1 === 0) {
        tempMap.key1 = 1;
      }
    } else if (keyValue === 2) {
      if (tempMap.key2 === 0) {
        tempMap.key2 = 1;
      }
    } else if (keyValue === 3) {
      if (tempMap.key3 === 0) {
        tempMap.key3 = 1;
      }
    }
  };
  const replay_upKey_4 = (keyValue) => {
    if (keyValue === 0) {
      tempMap.key0 = 0;
    } else if (keyValue === 1) {
      tempMap.key1 = 0;
    } else if (keyValue === 2) {
      tempMap.key2 = 0;
    } else if (keyValue === 3) {
      tempMap.key3 = 0;
    }
  };
  /*



 ****************    7키     ************************



*/
  const replay_downKey_7 = (keyValue) => {
    if (keyValue === 0) {
      if (tempMap.key0 === 0) {
        tempMap.key0 = 1;
      }
    } else if (keyValue === 1) {
      if (tempMap.key1 === 0) {
        tempMap.key1 = 1;
      }
    } else if (keyValue === 2) {
      if (tempMap.key2 === 0) {
        tempMap.key2 = 1;
      }
    } else if (keyValue === 3) {
      if (tempMap.key3 === 0) {
        tempMap.key3 = 1;
      }
    } else if (keyValue === 4) {
      if (tempMap.key4 === 0) {
        tempMap.key4 = 1;
      }
    } else if (keyValue === 5) {
      if (tempMap.key5 === 0) {
        tempMap.key5 = 1;
      }
    } else if (keyValue === 6) {
      if (tempMap.key6 === 0) {
        tempMap.key6 = 1;
      }
    }
  };
  const replay_upKey_7 = (keyValue) => {
    if (keyValue === 0) {
      tempMap.key0 = 0;
    } else if (keyValue === 1) {
      tempMap.key1 = 0;
    } else if (keyValue === 2) {
      tempMap.key2 = 0;
    } else if (keyValue === 3) {
      tempMap.key3 = 0;
    } else if (keyValue === 4) {
      tempMap.key4 = 0;
    } else if (keyValue === 5) {
      tempMap.key5 = 0;
    } else if (keyValue === 6) {
      tempMap.key6 = 0;
    }
  };
  return tempMap;
};

///4키
