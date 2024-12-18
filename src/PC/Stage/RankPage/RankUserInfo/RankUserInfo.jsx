import { useNavigate } from "react-router-dom";
import "./RankUserInfo.css";
import { fnData, fnLevelColor, fnMember, LevelTransfer, rankCheck } from "../../../../common/Base";
import { levelList } from "../../../../common/Array";
import { changeLevel } from "../../../../Store/LevelSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { openModal } from "../../../../Store/ModalSlice";

export const RankUserInfo = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const keyType = props.keyType;
  const singerList = props.singerList;
  const musicMap = props.musicMap;
  const rankMap = props.rankMap;
  const level = props.level;

  const replay = () => {
    //리플데이터 만들기
    dispatch(openModal("시즌1 리플은 준비중입니다."));
    return false;

    const temp_replayMap = {
      recordCnt: rankMap.recordCnt,
      level: rankMap.level,
      speed: rankMap.speed,
      musicCnt: rankMap.musicCnt,
      helpInt: rankMap.helpInt,
      userAudioOffset: rankMap.userAudioOffset,
    };

    const temp_selectMap = {
      gamePosition: fnData("gamePosition"),
      opacity: fnData("opacity"),
      audioVolume: fnData("audioVolume"),
      isYoutube: fnData("isYoutube"),
      headerImg: "lize",

      //노트가 내려오는 입력지연은 본인 컴퓨터에 맞게 , 데이터는 리플레이id에 맞게
      helpInt: rankMap.helpInt,
      userAudioOffset: fnData("userAudioOffset"),
    };

    const Group = fnMember(singerList, musicMap.musicCnt);

    if (keyType === 4) {
      navigate("/Replay/4key", {
        state: {
          replayMap: temp_replayMap,
          selectMap: temp_selectMap,
          musicMap: musicMap,
          Group: Group,
        },
      });
    } else if (keyType === 7) {
      navigate("/Replay/7key", {
        state: {
          replayMap: temp_replayMap,
          selectMap: temp_selectMap,
          musicMap: musicMap,
          Group: Group,
        },
      });
    }
  };
  const clickLevel = (value) => {
    if (value === "right") {
      const returnIndex = levelList.findIndex((el) => {
        if (el.level === level) {
          return true;
        } else {
        }
      });

      if (returnIndex + 1 < levelList.length) {
        dispatch(changeLevel(levelList[returnIndex + 1].level));
      } else {
        dispatch(changeLevel(levelList[0].level));
      }
    } else if (value === "left") {
      const returnIndex = levelList.findIndex((el) => {
        if (el.level === level) {
          return true;
        } else {
        }
      });

      if (returnIndex - 1 < 0) {
        dispatch(changeLevel(levelList[levelList.length - 1].level));
      } else {
        dispatch(changeLevel(levelList[returnIndex - 1].level));
      }
    }
  };
  return (
    <>
      <div className="RankUserInfo_Top">
        <div className="RankUserInfo_MusicInfo1">Record</div>
        <div className="RankUserInfo_MusicInfo2">
          <div className="RankUserInfo_title">
            <div className="RankUserInfo_TB">
              <img className="RankUserImg1" src="/asset/arrow/keyboardArrow_top.png" />
              <img className="RankUserImg1" src="/asset/arrow/keyboardArrow_bottom.png" />
            </div>
            <div className="RankUserInfo_ArrowUpDown"></div>

            <div className="RankUserInfo_titleBox">{musicMap && musicMap.title}</div>
          </div>
          <div className="RankUserInfo_level">
            <div className="RankUserInfo_Img">
              <motion.img
                className="RankUserImg"
                src="/arrow/keyboardArrow_left.png"
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                  clickLevel("left");
                }}
              />
            </div>
            <div
              className="RankUserInfo_Img1 .text-shadow-1"
              style={{ color: `${fnLevelColor(level)}` }}
            >
              {LevelTransfer(level)}
            </div>
            <div className="RankUserInfo_Img">
              <motion.img
                className="RankUserImg"
                src="/arrow/keyboardArrow_right.png"
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                  clickLevel("right");
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="RankUserInfo_Bottom">
        {!rankMap && <div>데이터가 없습니다.</div>}
        {rankMap && (
          <>
            <div className="RankUserInfo_Detail1">
              <div className="RankUserInfo_Row">
                <div className="RankUserInfo_Row_Point">Id </div>
                <div className="RankUserInfo_Row_Point">{rankMap.userId} </div>
              </div>
              <div className="RankUserInfo_Row">
                <div className="RankUserInfo_Row_Point">Stella </div>
                <div className="RankUserInfo_Row_Point">{rankMap.stella}</div>
              </div>
              <div className="RankUserInfo_Row">
                <div className="RankUserInfo_Row_Point">Perfect </div>
                <div className="RankUserInfo_Row_Point">{rankMap.perfect} </div>
              </div>
              <div className="RankUserInfo_Row">
                <div className="RankUserInfo_Row_Point">Good </div>
                <div className="RankUserInfo_Row_Point">{rankMap.good} </div>
              </div>
              <div className="RankUserInfo_Row">
                <div className="RankUserInfo_Row_Point">Bad</div>
                <div className="RankUserInfo_Row_Point">{rankMap.bad}</div>
              </div>
              <div className="RankUserInfo_Row">
                <div className="RankUserInfo_Row_Point">Miss </div>
                <div className="RankUserInfo_Row_Point">{rankMap.miss} </div>
              </div>
              <div className="RankUserInfo_Row">
                <div className="RankUserInfo_Row_Point">MaxCombo </div>
                <div className="RankUserInfo_Row_Point">{rankMap.maxCombo} </div>
              </div>
              <div className="RankUserInfo_Row">
                <div className="RankUserInfo_Row_Point">Score </div>
                <div className="RankUserInfo_Row_Point">
                  <div>{rankMap.score}</div>
                </div>
              </div>
              <div className="RankUserInfo_Row">
                <div className="RankUserInfo_Row_Point">Date </div>
                <div className="RankUserInfo_Row_Point">{rankMap.saveDate} </div>
              </div>
              <div className="RankUserInfo_Row">
                <div className="RankUserInfo_Row_Point">Replay </div>
                <div className="RankUserInfo_Row_Point">
                  <div
                    className="RankUserInfo_Row_Replay"
                    onClick={() => {
                      replay(rankMap.recordCnt);
                    }}
                  >
                    {rankMap.userId}님의 리플레이 보기 [클릭!]
                  </div>
                </div>
              </div>
            </div>
            <div className="RankUserInfo_Detail2">
              <div className="RankUserInfo_JudgeRankBox1"> {rankMap.percent}%</div>
              <div className="RankUserInfo_JudgeRankBox2">{rankCheck(rankMap.percent)}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
