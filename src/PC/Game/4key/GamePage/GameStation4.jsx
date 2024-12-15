import { useEffect, useRef, useState } from "react";
import { fnData, get_Src_Img } from "../../../../common/Base";
import {
  allPosition_Left,
  allPosition_Middle,
  gameEmoticon_Left,
  gameEmoticon_Middle,
} from "../../../../common/Game_4key";
import "../../GameCommon.css";
import { motion } from "framer-motion";
import JudgeHighlightPool from "../../GameJsCommon/JudgeHighlightPool";
import { AddrManager } from "../../GameJsCommon/AddrManager";
import { CreateNote, CreateNote1 } from "./GameJs/CreateNote";

export const GameStation4 = (props) => {
  const audioFlag = useRef(true);
  const emoticon = props.emoticon; 

  // 로직용 맵
  const liveMap = props.liveMap;

  //렌더용 데이터
  const [liveData, setLiveData] = useState(liveMap.current);
  //오디오

  const JudgeSlowFast = useRef();

  const gamePos = fnData("gamePosition");
  // const game

  useEffect(() => {
    //마운트후 해야할 내용들
    liveMap.current.jhPool = new JudgeHighlightPool(20, JudgeSlowFast.current);

    //게임 시작전 해야할 내용들
    const fps = 120;

    // 게임시작
    StartGame();

    function StartGame() {
      //게임 시작 준비중
      liveMap.current.addrMap = AddrManager();

      CreateNote1(
        liveMap.current.gameList,
        liveMap.current.speed,
        liveMap.current.addrMap,
        liveMap.current.bpmList,
        liveMap.current.lastTime
      );
      //기본 3초 딜레이
      const startDelay = 3;

      setTimeout(() => {
        //변수 초
        const diffTime = Date.now() - liveMap.current.startTime;
        props.youtubeStart(diffTime);
      }, (startDelay + 0.5) * 1000);
      //노래재생

      //업데이트시작

      startTick();
      update();
    }
    function update() {
      CreateNote(liveMap);

      liveMap.current.requestAni = requestAnimationFrame(update);
    }
    function startTick() {
      liveMap.current.startTime = Date.now();
      const userAudioOffset = fnData("userAudioOffset");

      liveMap.current.tickerInterval = setInterval(() => {
        const diffTime = Date.now() - liveMap.current.startTime;

        //1000ms
        if (audioFlag.current) {
          if (diffTime > 1000 - userAudioOffset) {
            audioFlag.current = false;
            liveMap.current.audio.start(0, 1);
          }
        }
        // 화면만들기
        if (diffTime > (1000 / fps) * liveMap.current.nowIndex) {
          liveMap.current.audioTime = Math.floor((1000 / fps) * liveMap.current.nowIndex);

          liveMap.current.judgeMent();
          liveMap.current.speedPlus();
          // CreateNote(liveMap);
          const tmpLiveMap = { ...liveMap.current };
          setLiveData(tmpLiveMap);
          liveMap.current.nowIndex++;
        }
      }, 1);
    }
    //test
    // setTimeout(() => {
    //   liveMap.current.dispatch(changeGameSet(2));
    // }, 5000);
    return () => {
      cancelAnimationFrame(liveMap.current.requestAni);
      clearInterval(liveMap.current.tickerInterval);
    };
  }, []);
  //키 누를때

  const findDownKey = (e) => {
    const diffTime = Date.now() - liveMap.current.startTime;

    if (e.keyCode === liveMap.current.keyList_4[0]) {
      if (liveMap.current.key0 === 0) {
        // audioPlaySound();
        liveMap.current.key0 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 0]);
      }
    } else if (e.keyCode === liveMap.current.keyList_4[1]) {
      if (liveMap.current.key1 === 0) {
        // audioPlaySound();
        liveMap.current.key1 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 1]);
      }
    } else if (e.keyCode === liveMap.current.keyList_4[2]) {
      if (liveMap.current.key2 === 0) {
        // audioPlaySound();
        liveMap.current.key2 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 2]);
      }
    } else if (e.keyCode === liveMap.current.keyList_4[3]) {
      if (liveMap.current.key3 === 0) {
        // audioPlaySound();
        liveMap.current.key3 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 3]);
      }
    }
  };

  //키 떌떄
  const findUpKey = (e) => {
    //
    const diffTime = Date.now() - liveMap.current.startTime;
    if (e.keyCode === liveMap.current.keyList_4[0]) {
      liveMap.current.key0 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 0]);
    } else if (e.keyCode === liveMap.current.keyList_4[1]) {
      liveMap.current.key1 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 1]);
    } else if (e.keyCode === liveMap.current.keyList_4[2]) {
      liveMap.current.key2 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 2]);
    } else if (e.keyCode === liveMap.current.keyList_4[3]) {
      liveMap.current.key3 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 3]);
    }
  };
  //키 바인딩
  useEffect(() => {
    // esc 모달창
    document.addEventListener("keydown", findDownKey);
    document.addEventListener("keyup", findUpKey);
    return () => {
      document.removeEventListener("keydown", findDownKey);
      document.removeEventListener("keyup", findUpKey);
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="Game_AllPosition"
        style={
          gamePos === "Left"
            ? { left: allPosition_Left }
            : gamePos === "Middle"
            ? { left: allPosition_Middle }
            : { left: allPosition_Left }
        }
      >
        <div className="GamePlay_Container">
          <div className="Game_NoteContainer">
            <div className="Game_JudgeBar_4" id="judgeBar"></div>
            <div className="NoteBox_4" id="noteBox">
              <div className="ScrollBox" id="scrollBox"></div>
            </div>
          </div>
        </div>

        <div className="LineContainer_4" id="LineContainer"></div>
        <div className="Game_KeyBoardPushBox_4">
          <div className="KeyBtnBox1_4">
            {liveData.key0 === 0 ? (
              <img className="Keyimg1" src="/Gear7K/KL_White_off.png" />
            ) : (
              <img className="Keyimg1" src="/Gear7K/KL_White_on.png" />
            )}
          </div>

          <div className="KeyBtnBox1_4">
            {liveData.key1 === 0 ? (
              <img className="Keyimg1" src="/Gear7K/KL_White_off.png" />
            ) : (
              <img className="Keyimg1" src="/Gear7K/KL_White_on.png" />
            )}
          </div>

          <div className="KeyBtnBox1_4">
            {liveData.key2 === 0 ? (
              <img className="Keyimg1" src="/Gear7K/KL_White_off.png" />
            ) : (
              <img className="Keyimg1" src="/Gear7K/KL_White_on.png" />
            )}
          </div>

          <div className="KeyBtnBox1_4">
            {liveData.key3 === 0 ? (
              <img className="Keyimg1" src="/Gear7K/KL_White_off.png" />
            ) : (
              <img className="Keyimg1" src="/Gear7K/KL_White_on.png" />
            )}
          </div>
        </div>
        <div className="Game_ImgContainer_4">
          <img style={{ width: "643px", height: "100%" }} src="/Gear7K/frame.png" />
        </div>

        <div className="Game_LifeBoxContainer_4">
          <div className="Game_LifeBoxContainer_4_Box">
            <div
              className="Game_LifeBoxContainer_4_Box_grid"
              style={{ height: liveData.lifeCnt * 5 + "%" }}
            ></div>
            <div className="Game_LifeBoxContainer_4_Box_grid1">
              {[...Array(20)].map((el) => {
                return <div className="Game_LifeBoxContainer_4_Box_grid_row1"></div>;
              })}
            </div>
          </div>
        </div>
        <div className="Game_LightGraBox_4">
          {liveData.key0 === 0 ? (
            <div className="Game_LightGraOff1_4"></div>
          ) : (
            <div className="Game_LightGraOn1_4"></div>
          )}

          {liveData.key1 === 0 ? (
            <div className="Game_LightGraOff1_4"></div>
          ) : (
            <div className="Game_LightGraOn1_4"></div>
          )}

          {liveData.key2 === 0 ? (
            <div className="Game_LightGraOff1_4"></div>
          ) : (
            <div className="Game_LightGraOn1_4"></div>
          )}

          {liveData.key3 === 0 ? (
            <div className="Game_LightGraOff1_4"></div>
          ) : (
            <div className="Game_LightGraOn1_4"></div>
          )}
        </div>
        <div className="Game_ComboDisplay_4">
          <div className="Game_Combo">
            <div className="Game_ComboDetailBlank"></div>
            <div className="Game_ComboDetail">
              <div className="Game_ComboStr">Combo x{liveData.feverMultifly}</div>
              <div className="Game_ComboInt_Box" id="Game_ComboInt">
                0
              </div>
            </div>
          </div>
          <div className="Game_ComboAcc" id="ComboAcc">
            <div className="Game_JudgeSlowFast_4" ref={JudgeSlowFast}></div>
          </div>
          <div className="Game_Fever">
            <div className="Game_FeverBar">
              <div
                className="Game_ActiveBar"
                id="ActiveBar"
                style={{ width: 4 * liveData.feverCnt + "px" }}
              ></div>
            </div>
          </div>

          <div className="AccPercent" id="dataStatus">
            Game Start
          </div>

          <div className="Game_ComboBlank"></div>
        </div>
        <div className="Game_FeverEffect" id="FeverEffect">
          <img className="img" src="/Fever/circle.png" />
        </div>
        <div className="Game_FeverStr" id="FeverStr">
          x1
        </div>
        <div className="Game_EffectBox_4">
          {[...Array(20)].map((el) => {
            return <div className="Effect_4"></div>;
          })}
        </div>
        <div className="Game_ScorePannel font30">
          <div className="Game_ScorePannel_Row sort">Score:{liveData.score}</div>
        </div>
        <div className="Game_FeverPannel sort " id="GameFever"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="Game_Emoticon_MultyBox"
        key={liveData.feverMultifly}
        style={gamePos === "Left" ? { left: gameEmoticon_Left } : { left: gameEmoticon_Middle }}
      >
        {[...Array(liveData.feverMultifly)].map((el) => {
          return <img className="emoticonImg" src={get_Src_Img(emoticon.current)} />;
        })}
      </motion.div>
    </>
  );
};
