import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import "./MusicBoard.css";
import "../../../../../style/Scroll.css";
import { useEffect, useRef, useState } from "react";
import { changeDatailList } from "../../../../../Store/DataSlice";
import { levelList } from "../../../../../common/Array";
import { getTryInfo, getUserLevel } from "../../../../../RestApi";
import { fnData, fnMember, fnSinger, timestamp } from "../../../../../common/Base";
import { changeMusicMap } from "../../../../../Store/MusicMapSlice";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../../../Store/ModalSlice";

export const MusicBoard = () => {
  const [playList, setPlayList] = useState();
  const [hoverBar, setHoverBar] = useState(false);
  const [hoverCnt, setHoverCnt] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.data.value);
  const myMusicMap = useSelector((state) => state.musicMap.value);
  const level = useSelector((state) => state.level.value);
  const keyType = useSelector((state) => state.keyType.value);
  const category = useSelector((state) => state.category.value);
  const detailList = data ? data.detailList : [];

  useEffect(() => {
    const fnDetailList = () => {
      if (category && data) {
        let tempMusicList = [];
        if (category.StelliveCnt !== 0) {
          const tempList = data.singerList
            .filter((el) => {
              if (el.StelliveCnt === category.StelliveCnt) {
                return true;
              }
              if (el.StelliveCnt === 0) {
                return true;
              }
            })
            .map((el) => {
              return el.musicCnt;
            });
          const returnList = data.musicList.filter((el) => {
            const returnValue = tempList.find((el_t) => {
              if (el.musicCnt === el_t) {
                return true;
              }
            });
            if (returnValue) {
              return true;
            }
          });
          tempMusicList = returnList;
        } else {
          tempMusicList = data.musicList;
        }
        return tempMusicList;
      } else {
        return [];
      }
    };

    dispatch(changeDatailList(fnDetailList()));
  }, [category]);

  const levelMap = levelList.find((el) => {
    if (level === el.level) {
      return true;
    }
  });
  //키에 맞는 색 클레스
  const fnClassBoardKeyType = (el) => {
    if (keyType === 4) {
      if (el.musicCnt === myMusicMap.musicCnt) {
        return "MusicBoard_Row_4keyTypeBox_pick";
      } else {
        return "MusicBoard_Row_4keyTypeBox";
      }
    } else {
      if (el.musicCnt === myMusicMap.musicCnt) {
        return "MusicBoard_Row_7keyTypeBox_pick";
      } else {
        return "MusicBoard_Row_7keyTypeBox";
      }
    }
  };
  useEffect(() => {
    const fnMyGameResult = async () => {
      const userId = window.localStorage.getItem("userId");
      const tempList = await getTryInfo(userId);
      const res2 = await getUserLevel(userId);

      setPlayList(tempList);
    };
    // const fnMyRank = async () => {
    //   const temp = { keyType: keyType, musicCnt: myMusicMap.musicCnt };
    //   const res_Rank = await getRank(temp);
    //   dispatch(initRankList(res_Rank));
    // };
    // fnMyRank();
    fnMyGameResult();
  }, []);

  //not played 찾기
  const fnPlayCheck = (el) => {
    if (playList) {
      const returnValue = playList.find((el_p) => {
        if (el_p.musicCnt === el.musicCnt && level === el_p.level) {
          return el;
        }
      });
      if (returnValue) {
        return false;
      } else {
        return true;
      }
    }
  };
  const MusicBoard_Container = useRef();
  const scrolling = () => {
    // const $ShowBoardBottom_Container = document.getElementById("MusicBoard_Container");

    if (MusicBoard_Container.current) {
      MusicBoard_Container.current.scrollTop =
        (data.musicList.length - myMusicMap.musicCnt) * 80 - 180;
    }
  };
  useEffect(() => {
    if (myMusicMap) {
      scrolling();
    }
  }, [myMusicMap, data]);

  const cal_ShowUpdate = (el) => {
    const today = new Date(timestamp());
    const musicInsertDate = new Date(el.updateDate);
    const diffTime = today.getTime() - musicInsertDate.getTime();
    const diff = diffTime / (1000 * 60 * 60 * 24);
    //날짜가 11일보다 덜된건 업데이트 표시
    if (diff > 11) {
      return false;
    } else {
      return true;
    }
  };
  const gameStart = (mMap) => {
    if (myMusicMap.musicCnt === mMap.musicCnt) {
      const noteMap = data.noteList.find((n_el) => {
        if (n_el.musicCnt === myMusicMap.musicCnt && n_el.level === level) {
          return true;
        }
      });

      if (noteMap.classify === 0) {
        dispatch(openModal("현재 준비중입니다."));
        return false;
      }
      const keyType = fnData("keyType");
      const singerList = data.singerList;
      const Group = fnMember(singerList, mMap.musicCnt);
      if (keyType === 4) {
        navigate("/Game/4key", { state: { musicMap: mMap, Group: Group } });
      } else if (keyType === 7) {
        navigate("/Game/7key", { state: { musicMap: mMap, Group: Group } });
      }
    }
  };
  return (
    <div className="MusicBoard_Container" ref={MusicBoard_Container}>
      {data && (
        <>
          {detailList.map((el, i) => {
            return (
              <motion.div
                key={i}
                className="MusicBoard_RowBox"
                // whileTap={{ scale: 1 }}
                onClick={() => {
                  dispatch(changeMusicMap(el));
                  gameStart(el);
                  // MusicBoard_Container.current.blur();
                }}
                onMouseOver={() => {
                  if (myMusicMap.musicCnt !== el.musicCnt) {
                    setHoverCnt(el.musicCnt);
                    setHoverBar(true);
                  }
                }}
                onMouseLeave={() => {
                  setHoverBar(false);
                }}
              >
                <div className="MusicBoard_Row1">
                  <motion.div
                    className="MusicBoard_HoverBar"
                    style={
                      hoverBar && hoverCnt === el.musicCnt ? { width: "100%" } : { width: "0%" }
                    }
                  ></motion.div>
                </div>
                <div
                  className="MusicBoard_Row"
                  style={
                    el.musicCnt === myMusicMap.musicCnt
                      ? { backgroundImage: levelMap && levelMap.backgroundImage }
                      : {}
                  }
                >
                  <div className={fnClassBoardKeyType(el)}>
                    <div
                      className={
                        keyType === 4
                          ? "MusicBoard_Row_4keyType font30"
                          : "MusicBoard_Row_7keyType font30"
                      }
                    >
                      <div className="MusicBoard_Row_keyType_Top sort "> {keyType}</div>
                      <div className="MusicBoard_Row_keyType_Bottom sort font10">Button</div>
                    </div>
                  </div>
                  <div className="MusicBoard_Row_Bar"></div>
                  <div className="MusicBoard_Row_Blank"></div>
                  <div className="MusicBoard_Row_InfoBox">
                    <div className="MusicBoard_Row_Title"> {el.title}</div>
                    <div className="MusicBoard_Row_Singer">
                      {fnSinger(data.singerList, el.musicCnt)}
                    </div>
                  </div>
                  <div className="MusicBoard_Row_Blank2"></div>
                  <div className="MusicBoard_Row_PlayCheck sort font20">
                    {fnPlayCheck(el) ? "Not Played" : ""}
                  </div>
                </div>
                <div className="MusicBoard_Row_UpdateImg">
                  {cal_ShowUpdate(el) && (
                    <img className="MusicRow_update" src="/update/update.png" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
};
