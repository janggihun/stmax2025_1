import { fnData } from "../../../../../common/Base";

export const createLiveMap_play = () => {
  const scope100 = 24; //1프레임 98.5
  const scope90 = 36;
  const scope80 = 48;
  const scope70 = 70;
  const scope60 = 85;
  const scope50 = 100;
  const scope40 = 110;
  const scope30 = 120;
  const scope20 = 130;
  const scope10 = 140;
  const scope1 = 150;
  const scope0 = 155;
  const fps = 120;
  const tempMap = {};

  tempMap.this = null;

  //  //이펙트 렌더링
  tempMap.effectList = [];
  tempMap.effectIndex = 0;
  //이펙트 배열 갯수
  tempMap.effectCount = 20;

  const baseEffectRowPoint = 340;
  /////////////////////////////////////////////
  tempMap.keyList_4 = JSON.parse(window.localStorage.getItem("4keyList"));
  tempMap.keyList_7 = JSON.parse(window.localStorage.getItem("7keyList"));

  tempMap.keyMemoryList = [];

  ////////////////////////////
  tempMap.gameSet = 0;
  tempMap.keyType = fnData("keyType");
  tempMap.timingPointList = [];
  tempMap.hitList = [];
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
  ///시즌2
  tempMap.maxScore = 1000000;
  tempMap.noteCount = 0;
  tempMap.singleNoteScore = 0;

  tempMap.score = 0;
  tempMap.combo = 0;
  tempMap.maxCombo = 0;

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
  tempMap.stmax1 = 0;
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
  tempMap.LifeRecureCnt = 0;

  tempMap.EffectCnt = 0;

  //
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

  tempMap.startTime = false;

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
  tempMap.ShowEffect_pre = (pos) => {
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

  tempMap.ShowEffect = (pos) => {
    tempMap.effectIndex++;
    if (tempMap.effectIndex === tempMap.effectCount) {
      tempMap.effectIndex = 0;
    }
    const effect = tempMap.effectList[tempMap.effectIndex];
    effect.x = baseEffectRowPoint + pos * 108;
    effect.y = 760;
    effect.explode(50);
  };

  //치우치는 선 만들기
  tempMap.LitJudgeMent = (diff) => {
    const posX = 98 - diff / 2;

    const div = tempMap.jhPool.get();

    div.style.left = posX + "px";
  };
  // 판정하기
  tempMap.judgeMent = () => {
    // gameList [노트타입, 누르는키자리, 누르는시간, 때는시간, 인터벌용, 인덱스, 현재미정, 사용한값확인]

    const audioFrameTime = tempMap.audioTime;

    const keyCheckList = [];
    //키체크 리스트 만들기

    tempMap.keyMemoryList.forEach((el, i) => {
      keyCheckList.push(el);
      el.push(tempMap.nowIndex);
      el.push(i);
      tempMap.replayList.push(el);
    });
    tempMap.keyMemoryList = [];
    //키 판정 시작
    keyCheckList.forEach((key_el, i) => {
      const pushList = [];

      const tmpList = keyCheckList[i];

      const keyStatus = tmpList[0];
      const keyTime = tmpList[1] - tempMap.helpInt;
      const keyIndex = tmpList[2];

      // console.log(gameList);
      tempMap.gameList.forEach((el) => {
        if (keyTime - scope30 <= el[2] && el[2] <= keyTime + scope0 && el[7] === 0) {
          pushList.push(el);
        }
      });
      if (keyStatus === 1) {
        pushList.find((el) => {
          if (el[1] === keyIndex) {
            el[7] = 1;
            const diff = el[2] - keyTime;

            if (el[0] === "L") {
              //롱노트인경우
              el.push(diff); // el[8]
              tempMap.intervalList.push(el);
              el[4] = 1;
            }

            // console.log("diff : ", diff);
            tempMap.CheckjudgeMent(diff, el);
            // tempMap.LitJudgeMent(diff);

            return true;
          }
        });
      } else {
        //롱노트 손 땐거 확인
        tempMap.intervalList.findIndex((el, i) => {
          if (el[1] === keyIndex) {
            const diff = el[3] - keyTime;
            //미스범위 안에 있는경우 눌렀을때와 같은 결과값을 추가
            if (diff < scope0) {
              tempMap.CheckjudgeMent(el[8], el);
              // tempMap.LitJudgeMent(el[8]);
            } else {
              //미스범위보다 큰경우
              tempMap.CheckjudgeMent(160, el); // 강제미스
            }

            tempMap.intervalList.splice(i, 1);
            return true;
          }
        });
      }
    });

    //하단 미스 확인

    tempMap.gameList.forEach((el) => {
      if (el[2] < audioFrameTime - scope30 - tempMap.helpInt && el[7] === 0) {
        el[7] = 1;
        // console.log("미스");
        tempMap.CheckjudgeMent(160, el);
        if (el[0] === "L") {
          tempMap.stmax0++;
        }
      }
    });

    // 롱노트 미스 확인
    const temp1List = [];
    tempMap.intervalList.forEach((el, i) => {
      //정상적으로 누르고 있는 경우
      if (
        audioFrameTime - el[2] - tempMap.helpInt >= el[4] * scope30 &&
        audioFrameTime <= el[3] - scope30 - tempMap.helpInt
      ) {
        //롱노트 누르고 있기에 해당 시간 만큼 콤보만 추가
        el[4]++;
        tempMap.combo++;
        const returnValue = tempMap.diffJudge(el[8]);
        // tempMap.addrMap.$Game_ComboInt_Box.innerHTML = `<div class="Game_ComboInt">${tempMap.combo}</div>`;
        tempMap.renderText(returnValue);
        const pos = el[1];
        tempMap.ShowEffect(pos);
      }

      // 계속 누르고 있는 경우
      if (el[3] < audioFrameTime - scope30 - tempMap.helpInt) {
        tempMap.CheckjudgeMent(scope1, el); //강제 1%
      } else {
        temp1List.push(el);
      }
    });
    tempMap.intervalList = temp1List;
    //마지막 시간 구하기
    if (tempMap.lastTime < audioFrameTime) {
      tempMap.lastTime = 9999999;

      setTimeout(() => {
        // 게임종료
        // tempMap.dispatch(changeGameSet(2));
        // clearInterval(tempMap.tickerInterval);
      }, 2000);
    }
  };
  tempMap.CheckRecure = () => {
    if (tempMap.lifeCnt <= 20) {
      if (tempMap.LifeRecureCnt === 20) {
        tempMap.LifeRecureCnt = 0;
        if (
          (tempMap.gameSet !== 2 || tempMap.gameSet !== 3) &&
          tempMap.lifeBoxList[19 - tempMap.lifeCnt]
        ) {
          if (tempMap.lifeCnt < 20) {
            tempMap.lifeCnt++;
          }
        }
      }
      tempMap.LifeRecureCnt++;
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
      const tempReplayList = [];
      tempMap.replayList.forEach((el, i) => {
        if (el[3] === tempMap.nowIndex) {
          keyCheckList.push(el);
        } else {
          tempReplayList.push(el);
        }
      });

      tempMap.replayList = tempReplayList;
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
        if (keyTime - scope30 <= el[2] && el[2] <= keyTime + scope0 && el[7] === 0) {
          pushList.push(el);
        }
      });
      if (keyStatus === 1) {
        //누른 이펙트
        tempMap.findDownKey_replay(keyIndex);

        pushList.find((el) => {
          if (el[1] === keyIndex) {
            el[7] = 1;
            const diff = el[2] - keyTime;
            if (el[0] === "L") {
              //롱노트인경우
              el.push(diff); // el[8]
              tempMap.intervalList.push(el);
              el[4] = 1;
            }

            tempMap.CheckjudgeMent(diff, el);
            // tempMap.LitJudgeMent(diff);

            return true;
          }
        });
      } else {
        tempMap.findUpKey_replay(keyIndex);
        //롱노트 손 땐거 확인
        tempMap.intervalList.findIndex((el, i) => {
          if (el[1] === keyIndex) {
            const diff = Math.abs(el[3] - keyTime);

            //미스범위 안에 있는경우 눌렀을때와 같은 결과값을 추가
            if (diff < scope0) {
              tempMap.CheckjudgeMent(el[8], el);
              // tempMap.LitJudgeMent(el[8]);
            } else {
              tempMap.CheckjudgeMent(160, el); // 강제미스
            }
            tempMap.intervalList.splice(i, 1);
            return true;
          }
        });
      }
    });

    //하단 미스 확인

    tempMap.gameList.forEach((el) => {
      if (el[2] < audioFrameTime - scope30 - tempMap.helpInt && el[7] === 0) {
        el[7] = 1;
        // console.log("미스");
        tempMap.CheckjudgeMent(160, el);
        if (el[0] === "L") {
          tempMap.stmax0++;
        }
      }
    });

    // 롱노트 미스 확인
    const temp1List = [];
    tempMap.intervalList.forEach((el, i) => {
      if (
        audioFrameTime - el[2] - tempMap.helpInt >= el[4] * scope30 &&
        audioFrameTime <= el[3] - scope30 - tempMap.helpInt
      ) {
        //롱노트 누르고 있기에 해당 시간 만큼 콤보만 추가
        el[4]++;
        tempMap.combo++;
        const returnValue = tempMap.diffJudge(el[8]);
        // tempMap.addrMap.$Game_ComboInt_Box.innerHTML = `<div class="Game_ComboInt">${tempMap.combo}</div>`;
        tempMap.renderText(returnValue);
        const pos = el[1];
        tempMap.ShowEffect(pos);
      }
      // 계속 누르고 있는 경우
      if (el[3] < audioFrameTime - scope30 - tempMap.helpInt) {
        tempMap.CheckjudgeMent(scope1, el); //강제 1%
      } else {
        temp1List.push(el);
      }
    });
    tempMap.intervalList = temp1List;

    //마지막 시간 구하기
    if (tempMap.lastTime < audioFrameTime) {
      tempMap.lastTime = 9999999;

      setTimeout(() => {
        // 게임종료
        // tempMap.dispatch(openModal("리플레이가  완료되었습니다. "));
        // clearInterval(tempMap.tickerInterval);
      }, 2000);
    }
  };
  tempMap.CheckRecure = () => {
    if (tempMap.lifeCnt <= 20) {
      if (tempMap.LifeRecureCnt === 20) {
        tempMap.LifeRecureCnt = 0;

        if (tempMap.lifeCnt < 20) {
          tempMap.lifeCnt++;
        }
      }
      tempMap.LifeRecureCnt++;
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
  tempMap.diffJudge = (diff) => {
    const abs_diff = Math.abs(diff);
    if (abs_diff <= scope100) {
      return 100;
    } else if (abs_diff <= scope90) {
      return 90;
    } else if (abs_diff <= scope80) {
      return 80;
    } else if (abs_diff <= scope70) {
      return 70;
    } else if (abs_diff <= scope60) {
      return 60;
    } else if (abs_diff <= scope50) {
      return 50;
    } else if (abs_diff <= scope40) {
      return 40;
    } else if (abs_diff <= scope30) {
      return 30;
    } else if (abs_diff <= scope20) {
      return 20;
    } else if (abs_diff <= scope10) {
      return 10;
    } else if (abs_diff <= scope1) {
      return 1;
    } else {
      return 0;
    }
  };

  tempMap.CheckjudgeMent = (diff, el) => {
    // console.log("diff : ", diff);
    const tempBar = diff / 5;

    const pos = el[1];
    const abs_diff = Math.abs(diff);

    if (abs_diff <= scope100) {
      tempMap.stmax100++;
      tempMap.combo++;

      tempMap.score = tempMap.score + tempMap.singleNoteScore;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);
      tempMap.renderText(100);
      // tempMap.addrMap.$dataStatus.innerHTML = `<div class="AccPercent_100">STMAX 100%</div>`;

      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= scope90) {
      // console.log("perfect");
      tempMap.stmax90++;
      tempMap.combo++;
      tempMap.renderText(90);
      tempMap.score = tempMap.score + tempMap.singleNoteScore * 0.9;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);
      // tempMap.addrMap.$dataStatus.innerHTML = `<div class="AccPercent_90" style="">STMAX 90%</div>`;
      // background: linear-gradient(to top, #f3f2ba 40px, #fc0b0b);
      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= scope80) {
      // console.log("perfect");
      tempMap.stmax80++;
      tempMap.combo++;

      tempMap.score = tempMap.score + tempMap.singleNoteScore * 0.8;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);
      tempMap.renderText(80);
      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= scope70) {
      // console.log("perfect");
      tempMap.stmax70++;
      tempMap.combo++;

      tempMap.score = tempMap.score + tempMap.singleNoteScore * 0.7;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);
      tempMap.renderText(70);
      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= scope60) {
      tempMap.stmax60++;
      tempMap.combo++;

      tempMap.score = tempMap.score + tempMap.singleNoteScore * 0.6;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);
      tempMap.renderText(60);
      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= scope50) {
      tempMap.stmax50++;
      tempMap.combo++;

      tempMap.score = tempMap.score + tempMap.singleNoteScore * 0.5;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);
      tempMap.renderText(50);
      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= scope40) {
      tempMap.stmax40++;
      tempMap.combo++;

      tempMap.score = tempMap.score + tempMap.singleNoteScore * 0.4;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);
      tempMap.renderText(40);
      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= scope30) {
      tempMap.stmax30++;
      tempMap.combo++;

      tempMap.score = tempMap.score + tempMap.singleNoteScore * 0.3;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);

      tempMap.renderText(30);
      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= scope20) {
      tempMap.stmax20++;
      tempMap.combo++;

      tempMap.score = tempMap.score + tempMap.singleNoteScore * 0.2;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);

      tempMap.renderText(20);
      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= scope10) {
      tempMap.stmax10++;
      tempMap.combo++;

      tempMap.score = tempMap.score + tempMap.singleNoteScore * 0.1;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);

      tempMap.renderText(10);
      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else if (abs_diff <= scope1) {
      tempMap.stmax1++;
      tempMap.combo++;
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);
      tempMap.renderText(1);
      tempMap.CheckRecure();
      tempMap.ShowEffect(pos);
    } else {
      tempMap.renderText(0);
      tempMap.maxCombo = Math.max(tempMap.maxCombo, tempMap.combo);

      tempMap.minusLife();

      tempMap.stmax0++;
      tempMap.LifeRecureCnt = 0;
      tempMap.combo = 0;
    }

    tempMap.barValue = 98 - tempBar;
    // tempMap.addrMap.$Game_ComboInt_Box.innerHTML = `<div class="Game_ComboInt">${tempMap.combo}</div>`;
  };

  tempMap.minusLife = () => {
    tempMap.lifeCnt--;
    if (tempMap.lifeCnt < 0) {
      // 종료 메서드 실행
      if (tempMap.lifeCnt === -1) {
        //게임 종료 메서드
        // tempMap.dispatch(changeGameSet(3));
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
  tempMap.fnTextColor = (value) => {
    let topColor = "#0000ff";
    let bottomColor = "#ff0000";
    if (value === 100) {
      topColor = "#FFFF00 ";
      bottomColor = "#FFE600";
    } else if (value === 90) {
      topColor = "#FFE600";
      bottomColor = "#FFCC00";
    } else if (value === 80) {
      topColor = "#FFCC00";
      bottomColor = "#FFB300";
    } else if (value === 70) {
      topColor = "#FFB300";
      bottomColor = "#FF9900";
    } else if (value === 60) {
      topColor = "#FF9900";
      bottomColor = "#FF8000";
    } else if (value === 50) {
      topColor = "#FF8000";
      bottomColor = "#FF6600";
    } else if (value === 40) {
      topColor = "#FF6600";
      bottomColor = "#FF4D00";
    } else if (value === 30) {
      topColor = "#FF4D00";
      bottomColor = "#FF3300";
    } else if (value === 20) {
      topColor = "#FF3300";
      bottomColor = "#FF1900";
    } else if (value === 10) {
      topColor = "#FF1900";
      bottomColor = "#ff0000";
    } else if (value === 1) {
      topColor = "#FF0000";
      bottomColor = "#ff0000";
    } else {
      topColor = "#0000ff";
      bottomColor = "#ff0000";
    }
    return { topColor: topColor, bottomColor: bottomColor };
  };
  tempMap.preText = null;
  tempMap.preComboText = null;
  tempMap.preScore = null;
  tempMap.renderText = (value) => {
    if (tempMap.preText) tempMap.preText.destroy();
    if (tempMap.preComboText) tempMap.preComboText.destroy();

    //stmax 값
    const colorMap = tempMap.fnTextColor(value);
    const self = tempMap.this;

    tempMap.text = self.add
      .text(500, 600, `STMAX ${value}`, {
        font: "48px KOTRAHOPE",
      })
      .setOrigin(0.5, 0.5);

    const text = tempMap.text;
    tempMap.preText = text;
    const gradient = text.context.createLinearGradient(0, 0, 0, text.height);

    gradient.addColorStop(1, colorMap.topColor); // 빨간색
    gradient.addColorStop(0, colorMap.bottomColor); // 파란색

    text.setFill(gradient);
    self.tweens.add({
      targets: text,

      duration: 500, // 3초 동안 페이드 아웃
      ease: "Expo.easeOut",
      alpha: 1,
      scale: 1.5, // 3배 크기로 확대
    });
    //스코어

    tempMap.preScore.setText(`Score :${Math.floor(tempMap.score)}`);

    // 콤보

    tempMap.preComboText = self.add
      .text(500, 250, `${tempMap.combo}`, {
        font: "110px KOTRAHOPE",
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5);
    if (value === 0) {
      tempMap.preComboText.y = 270;
      return false;
    }
    self.tweens.add({
      targets: tempMap.preComboText,
      y: 270,
      yoyo: true,
      duration: 200, // 3초 동안 페이드 아웃
      ease: "Linear",
      alpha: 1,
    });
  };
  return tempMap;
};

///4키

/// 시즌1 구버전 리플용
