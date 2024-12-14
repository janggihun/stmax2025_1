import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import "./End.css";
import { fnData, get_Src_MusicImg, rankCheck } from "../../../common/Base";

export const EndView = () => {
  const location = useLocation();
  const resultMap = location.state.resultMap;

  const musicMap = location.state.musicMap;
  const level = location.state.level;

  const score = resultMap.score;
  const stella = resultMap.stella;
  const perfect = resultMap.perfect;
  const good = resultMap.good;
  const bad = resultMap.bad;
  const miss = resultMap.miss;

  const maxCombo = resultMap.maxCombo;

  const speed = resultMap.speed;

  //test깃헙
  //test code
  // const perfect = 666;
  // const good = 3;
  // const miss = 0;
  // const bad = 2;
  // const combo = 0;
  // const score = 250;
  // let maxCombo = 0;
  // const videoId = "Jt6UCd7JhAA";
  // const musicCnt = 1;
  // const level = "easy";
  // const title = "노래제목";
  ////////////////////////
  const navigator = useNavigate();
  const GoMain = () => {
    navigator("/stage", { replace: true });
  };

  const findLevelColor = () => {
    if (level === "EASY") {
      return "yellow";
    } else if (level === "NOMAL") {
      return "green";
    } else if (level === "HARD") {
      return "#0746f2";
    } else if (level === "STELLA") {
      return "red";
    }
  };
  const percent =
    (stella * 100 + perfect * 90 + good * 60 + bad * 30) /
    (stella + perfect + good + bad + miss).toFixed(2);

  return (
    <AnimatePresence>
      <motion.div
        className="End_Container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          className="End_YoutubeThumnail"
          src={get_Src_MusicImg(fnData("keyType"), musicMap.musicCnt)}
        />

        <div className="End_Top">
          <div className="End_Logo_Img">
            <img className="img" src="/Icon/STMAX.png" />
          </div>
          <div className="End_Now_Page">ReSult</div>
          <div className="End_Header_Middle">
            <div className="End_Header_L">
              <div className="End_Header_L_ImgBox">
                <img className="img" src={get_Src_MusicImg(fnData("keyType"), musicMap.musicCnt)} />
              </div>
              <div className="End_Header_L_LevelBox">
                <div className="End_Header_L_LevelBox_Level">{level}</div>
              </div>
            </div>
            <div className="End_Header_M" style={{ backgroundColor: findLevelColor() }}></div>
            <div className="End_Header_R_Blank"></div>
            <div className="End_Header_R">
              <div>{musicMap.title}</div>
              <div></div>
            </div>
            <div className="End_Header_R_Level"></div>
          </div>
          <div className="End_Header_Blank"></div>
        </div>
        <div className="End_Body">
          <motion.div
            className="EndResultBox1"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1 }}
          >
            <div className="End_Result_Str_Box">
              <div className="End_Result_Str">
                Score Result
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {+fnData("keyType") + "KEY"}
              </div>
            </div>
            <div className="End_Result_Bar_Box">
              <div className="End_Result_Bar"></div>
            </div>

            <div className="End_Result_ScoreBox">
              <div className="End_Result_ScoreBox_Detail">
                <div className="EndResultRow_L">
                  <div className="EndResultRow">Stella</div>
                  <div className="EndResultRow">PerFect</div>
                  <div className="EndResultRow">Good</div>
                  <div className="EndResultRow">Bad</div>
                  <div className="EndResultRow">Miss</div>
                </div>
                <div className="EndResultRow_R">
                  <div className="EndResultRow">{stella}</div>
                  <div className="EndResultRow">{perfect}</div>
                  <div className="EndResultRow">{good}</div>
                  <div className="EndResultRow">{bad}</div>
                  <div className="EndResultRow">{miss}</div>
                </div>
              </div>
            </div>
            <div className="End_Result_Str_Box">
              <div className="End_Result_Str">Speed x{speed}</div>
            </div>
            <div className="End_Result_Bar_Box">
              <div className="End_Result_Bar"></div>
            </div>
            <div className="End_Result_EffectBox">
              <div className="End_Result_EffectBox_Detail">
                Rank : {rankCheck(parseInt(percent))}
              </div>
            </div>
            <div></div>
            <div></div>
          </motion.div>
          <motion.div
            className="EndResultBox2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="End_Result_Middle_Top">
              <div className="End_Result_Circle_Img">
                <img className="img" src="/End/circle1.png" />
              </div>
              <div className="End_Result_Img">
                <img className="img" src="/Icon/STMAX.png" />
              </div>

              <div className="End_Result_Stella_Int">{stella}</div>
              <div className="End_Result_Stella">
                <div className="End_Result_Stella_Str">Stella Max</div>
              </div>

              <div className="End_Result_MaxCombo_Int">{maxCombo}</div>
              <div className="End_Result_MaxCombo">
                <div className="End_Result_MaxCombo_Str"> Max Combo</div>
              </div>

              <div className="End_Result_Miss_Int">{miss}</div>
              <div className="End_Result_Miss">
                <div className="End_Result_Miss_Str"> Miss</div>
              </div>
            </div>
            <div className="End_Result_Middle_Bottom">
              <div className="End_Result_Middle_Bottom_Blank"></div>
              <div className="End_Result_Middle_Bottom_Detail">
                <div className="End_Result_Acc">
                  {(
                    (stella * 100 + perfect * 90 + good * 60 + bad * 30) /
                    (stella + perfect + good + bad + miss)
                  ).toFixed(2)}
                  %
                </div>
                <div className="End_Result_Score">
                  <div className="End_Result_ScoreBox_1">
                    <div className="End_Result_ScoreBox_object">
                      <div className="End_Result_ScoreBox_object_Str">Score</div>
                    </div>
                  </div>
                  <div className="End_Result_ScoreInt">{score}</div>
                </div>
              </div>
              <div className="End_Result_Middle_Bottom_Blank"></div>
            </div>
          </motion.div>

          <motion.div
            className="EndResultBox3"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1 }}
          >
            <div className="End_R_Top"></div>
            <div className="End_R_Body">
              <div className="End_R_Body_Box">
                <div className="End_R_Body_Box_Detail">순위 : ...</div>
              </div>
              <div className="End_R_Body_Box">
                <div className="End_R_Body_Box_Detail">칭호</div>
              </div>
              <div className="End_R_Body_Box">
                <div className="End_R_Body_Box_Detail">스텔라포인트 : 준비중</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="End_Bottom">
          <div className="End_Bottom_Left"></div>
          <div className="End_Bottom_Middle"></div>
          <div className="End_Bottom_Right">
            <button
              className="End_Bottom_Btn"
              onClick={() => {
                GoMain();
              }}
            >
              나가기
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
