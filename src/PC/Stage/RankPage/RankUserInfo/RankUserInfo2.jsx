import { useNavigate } from "react-router-dom";
import "./RankUserInfo.css";
import { fnData, fnLevelColor, fnMember, LevelTransfer, rankCheck } from "../../../../common/Base";
import { levelList } from "../../../../common/Array";
import { changeLevel } from "../../../../Store/LevelSlice";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export const RankUserInfo2 = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const keyType = props.keyType;
  const singerList = props.singerList;
  const musicMap = props.musicMap;
  const rankMap = props.rankMap;
  const level = props.level;

  const replay = () => {
    //리플데이터 만들기

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
            <div className="RankUserInfo_Detail1" style={{ height: "80%" }}>
              <div style={{ display: "flex", height: "82%" }}>
                <div style={{ width: "50%", height: "100%" }}>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 100 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax100}</div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 90 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax90} </div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 80 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax80} </div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 70 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax70}</div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 60 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax60}</div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 50 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax50}</div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 40 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax40}</div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 30 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax30}</div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 20 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax20}</div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 10 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax10}</div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 1 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax1}</div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">STMAX 0 </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.stmax0} </div>
                  </div>
                </div>
                <div style={{ width: "50%", height: "100%" }}>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">Id </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.userId} </div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">MaxCombo </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.maxCombo} </div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">SPEED </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.speed} </div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">Score </div>
                    <div className="RankUserInfo_Row_Point">
                      <div>{rankMap.score}</div>
                    </div>
                  </div>
                  <div className="RankUserInfo_Row">
                    <div className="RankUserInfo_Row_Point">Date </div>
                    <div className="RankUserInfo_Row_Point">{rankMap.insertDate} </div>
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
                        {rankMap.userId} 리플레이 [클릭!]
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="RankUserInfo_Detail2" style={{ height: "20%" }}>
              <div className="RankUserInfo_JudgeRankBox1"> {rankMap.percent}%</div>
              <div className="RankUserInfo_JudgeRankBox2">{rankMap.rank}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
