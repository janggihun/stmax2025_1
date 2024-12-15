import { useEffect, useRef, useState } from "react";
import { fnData, get_Src_Img } from "../../../../common/Base";
import {
  allPosition_Left,
  allPosition_Middle,
  gameEmoticon_Left,
  gameEmoticon_Middle,
} from "../../../../common/Game_7key";
import "../../GameCssCommon/GameCommon.css";
import { motion } from "framer-motion";
import JudgeHighlightPool from "../../GameJsCommon/JudgeHighlightPool";
import { AddrManager } from "../../GameJsCommon/AddrManager";
import { CreateNote, CreateNote1 } from "../Scripts/CreateNote";
import { GameScoreBoard } from "../../GameComponentCommon/GameScoreBoard";

export const ReplayStation7 = (props) => {
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

          liveMap.current.replayjudgeMent();
          liveMap.current.speedPlus();
          // CreateNote(liveMap);
          const tmpLiveMap = { ...liveMap.current };
          setLiveData(tmpLiveMap);
          liveMap.current.nowIndex++;
        }
      }, 1);
    }
    return () => {
      cancelAnimationFrame(liveMap.current.requestAni);
      clearInterval(liveMap.current.tickerInterval);
    };
  }, []);

  //키 바인딩
  useEffect(() => {
    // esc 모달창
    document.addEventListener("keydown", liveMap.findDownKey);
    document.addEventListener("keyup", liveMap.findUpKey);
    return () => {
      document.removeEventListener("keydown", liveMap.findDownKey);
      document.removeEventListener("keyup", liveMap.findUpKey);
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
            <div className="Game_JudgeBar" id="judgeBar"></div>
            <div className="NoteBox" id="noteBox">
              <div className="ScrollBox" id="scrollBox"></div>
            </div>
          </div>
        </div>

        <div className="LineContainer" id="LineContainer"></div>
        <div className="Game_KeyBoardPushBox">
          <div className="KeyBtnBox1">
            {liveData.key0 === 0 ? (
              <img className="Keyimg1" src="/Gear7K/KL_White_off.png" />
            ) : (
              <img className="Keyimg1" src="/Gear7K/KL_White_on.png" />
            )}
          </div>
          <div className="KeyBtnBox1">
            {liveData.key1 === 0 ? (
              <img className="Keyimg1" src="/Gear7K/KL_Blue_off.png" />
            ) : (
              <img className="Keyimg1" src="/Gear7K/KL_Blue_on.png" />
            )}
          </div>
          <div className="KeyBtnBox1">
            {liveData.key2 === 0 ? (
              <img className="Keyimg1" src="/Gear7K/KL_White_off.png" />
            ) : (
              <img className="Keyimg1" src="/Gear7K/KL_White_on.png" />
            )}
          </div>
          <div className="KeyBtnBox3">
            {liveData.key3 === 0 ? (
              <img className="Keyimg2" src="/Gear7K/KL_Yellow_off.png" />
            ) : (
              <img className="Keyimg2" src="/Gear7K/KL_Yellow_on.png" />
            )}
          </div>
          <div className="KeyBtnBox1">
            {liveData.key4 === 0 ? (
              <img className="Keyimg1" src="/Gear7K/KL_White_off.png" />
            ) : (
              <img className="Keyimg1" src="/Gear7K/KL_White_on.png" />
            )}
          </div>
          <div className="KeyBtnBox1">
            {liveData.key5 === 0 ? (
              <img className="Keyimg1" src="/Gear7K/KL_Blue_off.png" />
            ) : (
              <img className="Keyimg1" src="/Gear7K/KL_Blue_on.png" />
            )}
          </div>
          <div className="KeyBtnBox1">
            {liveData.key6 === 0 ? (
              <img className="Keyimg1" src="/Gear7K/KL_White_off.png" />
            ) : (
              <img className="Keyimg1" src="/Gear7K/KL_White_on.png" />
            )}
          </div>
        </div>
        <div className="Game_ImgContainer">
          <img src="/Gear7K/frame.png" />
        </div>

        <div className="Game_LifeBoxContainer_7">
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
        <div className="Game_LightGraBox">
          {liveData.key0 === 0 ? (
            <div className="Game_LightGraOff1"></div>
          ) : (
            <div className="Game_LightGraOn1"></div>
          )}
          {liveData.key1 === 0 ? (
            <div className="Game_LightGraOff1"></div>
          ) : (
            <div className="Game_LightGraOn1"></div>
          )}
          {liveData.key2 === 0 ? (
            <div className="Game_LightGraOff1"></div>
          ) : (
            <div className="Game_LightGraOn1"></div>
          )}
          {liveData.key3 === 0 ? (
            <div className="Game_LightGraOff3"></div>
          ) : (
            <div className="Game_LightGraOn3"></div>
          )}
          {liveData.key4 === 0 ? (
            <div className="Game_LightGraOff1"></div>
          ) : (
            <div className="Game_LightGraOn1"></div>
          )}
          {liveData.key5 === 0 ? (
            <div className="Game_LightGraOff1"></div>
          ) : (
            <div className="Game_LightGraOn1"></div>
          )}
          {liveData.key6 === 0 ? (
            <div className="Game_LightGraOff1"></div>
          ) : (
            <div className="Game_LightGraOn1"></div>
          )}
        </div>
        <div className="Game_ComboDisplay">
          <div className="Game_Combo">
            <div className="Game_ComboDetailBlank"></div>
            <div className="Game_ComboDetail">
              <div className="Game_ComboStr">{Math.floor(liveData.score)}</div>
              <div key={liveData} className="Game_ComboInt_Box" id="Game_ComboInt_Box">
                0
              </div>
            </div>
          </div>
          <div className="Game_ComboAcc" id="ComboAcc">
            <div className="Game_JudgeSlowFast" ref={JudgeSlowFast}></div>
          </div>

          <div className="AccPercent" id="dataStatus">
            Game Start
          </div>

          <div className="Game_ComboBlank"></div>
        </div>
        <GameScoreBoard liveData={liveData} />
        <div className="Game_EffectBox">
          {[...Array(20)].map((el) => {
            return <div className="Effect"></div>;
          })}
        </div>
      </motion.div>
    </>
  );
};
