import "./Record.css";
import "../../../style/Scroll.css";
import { useEffect, useState } from "react";
import { getRank, getTryInfo, getUserLevel } from "../../../RestApi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeLevel } from "../../../Store/LevelSlice";
import { useLoading } from "../../../UseHook/Loading/Loading";
import { get_Src_MusicImg } from "../../../common/Base";
import { levelList } from "../../../common/Array";
export const Record = () => {
  const dispatch = useDispatch();
  const [playList, setPlayList] = useState();
  const [playDetail, setPlayDetail] = useState();
  const [myDetail, setMyDetail] = useState();
  const [musicRank, setMusicRank] = useState();
  const [playKeyTypeList, setPlayKeyTypeList] = useState();
  const level = useSelector((state) => state.level.value);
  const keyType = useSelector((state) => state.keyType.value);
  //로딩모달
  const { openLoading, closeLoading, renderLoading } = useLoading();

  /* 

 ==============================    함수     ====================================


  */
  //최초 진입
  useEffect(() => {
    const fnMyGameResult = async () => {
      openLoading();
      const userId = window.localStorage.getItem("userId");
      const tempList = await getTryInfo(userId);
      const tempMyList = await getUserLevel(userId);

      setMyDetail(tempMyList);
      setPlayList(tempList);
      closeLoading();
    };

    fnMyGameResult();
  }, []);

  //레벨 변경시 초기화
  useEffect(() => {
    setPlayDetail(false);
    setMusicRank(false);
  }, [level]);

  //키 변경시 초기화
  useEffect(() => {
    setMusicRank(false);
    setPlayDetail(false);
  }, [keyType]);

  //레벨을 누르면 레벨 변화
  const clickLevel = (tempLevel) => {
    dispatch(changeLevel(tempLevel));
  };
  /* 

 ==============================    데이터     ====================================


  */

  //데이터 - 왼쪽 뮤직 선택창 데이터를 가공
  useEffect(() => {
    if (playList) {
      const tempPlayKeyTypeList = playList.filter((el) => {
        if (el.keyType === keyType && el.level === level) {
          return el;
        }
      });
      tempPlayKeyTypeList.sort((a, b) => {
        return b.musicCnt - a.musicCnt;
      });

      setPlayKeyTypeList(tempPlayKeyTypeList);
    }
  }, [playList, level, keyType]);

  //데이터 - 곡 선택 변경
  const clickMusicRow = async (value) => {
    openLoading();
    const userId = window.localStorage.getItem("userId");

    const temp = { keyType: keyType, musicCnt: value.musicCnt };
    const resList = await getRank(temp);

    const returnValue = resList.find((el) => {
      if (el.level === level && el.musicCnt === value.musicCnt && el.userId === userId) {
        return true;
      }
    });

    setMusicRank(returnValue);
    setPlayDetail(value);
    closeLoading();
  };

  /* 

 ==============================    렌더링     ====================================


  */

  //렌더링 - 왼쪽 노래 선택창
  const render_PlayKeyTypeList = () => {
    return (
      <>
        <div className="Record_selectBox sort font20">노래 선택</div>
        {playKeyTypeList.map((el, i) => {
          return (
            <motion.div
              className="Record_MusicRow "
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                clickMusicRow(el);
              }}
            >
              <div
                className={
                  el.musicCnt === playDetail.musicCnt
                    ? "Record_MusicRow_Box_click"
                    : "Record_MusicRow_Box"
                }
              >
                <div className="Record_MusicRow_Blank1"></div>
                <div className="Record_MusicRow_title"> {el.title}</div>
              </div>
            </motion.div>
          );
        })}
      </>
    );
  };

  //랜더링 - 버튼
  const render_Button = () => {
    //레벨 리스트로부터 난이도에 맞는 버튼 생성

    //버튼간격
    const marginLeft = 15;

    //버튼이 위에서부터 떨어진 거리
    const margintTop = 25;

    return (
      <div className="Record_levelBox">
        <div style={{ width: "5%", height: "100%" }}></div>
        {levelList.map((el_l, i) => {
          return (
            <button
              style={
                el_l.level === level
                  ? {
                      color: "white",
                      border: "1px solid white",
                      backgroundImage: el_l.backgroundImage,
                      marginTop: `${margintTop}px`,
                      marginLeft: `${marginLeft}px`,
                    }
                  : { color: "white", marginLeft: `${marginLeft}px`, marginTop: `${margintTop}px` }
              }
              onClick={() => {
                clickLevel(el_l.level);
              }}
            >
              {el_l.kor}
            </button>
          );
        })}
      </div>
    );
  };

  //렌더링 - 기록
  const renderPlayDetail = () => {
    return (
      <>
        <div className="Record_display_left font20">
          {playDetail && (
            <>
              <div>{"☆ 기록실 "}</div>
              <div>{"☆ 타이틀 : " + playDetail.title}</div>
              <div>{"☆ 총 도전 : " + (playDetail.successCnt + playDetail.failCnt)}</div>
              <div>{"☆ 완주 : " + playDetail.successCnt}</div>
              <div>{"☆ 실패 : " + playDetail.failCnt}</div>
            </>
          )}
        </div>
      </>
    );
  };

  //최종 렌더링
  return (
    <div className="Base_container">
      <div className="Record_Header"></div>
      <div className="Record_Container">
        <motion.div
          className="Record_Left scrollBar"
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          exit={{ x: -500 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
        >
          {playKeyTypeList && render_PlayKeyTypeList()}
        </motion.div>
        <motion.div
          className="Record_Right"
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          exit={{ x: 500 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
        >
          {render_Button()}

          <div className="Record_recordDetailBox">
            <div className="Record_InfoBox_Left">
              <div className="Record_InfoBox_ImgBox">
                {playDetail ? (
                  <img
                    className="img"
                    style={{ border: "1px solid white", boxSizing: "border-box" }}
                    src={get_Src_MusicImg(keyType, playDetail.musicCnt)}
                    alt="없음"
                  />
                ) : (
                  <img
                    className="img"
                    style={{ border: "1px solid white", boxSizing: "border-box" }}
                    src={get_Src_MusicImg(keyType, 0)}
                    alt="없음"
                  />
                )}
              </div>
              <div className="Record_InfoBox_RecordInfo">
                {playDetail
                  ? renderPlayDetail()
                  : "11월 4일 이후 기록 데이터가 발견되지 않았습니다."}
              </div>
            </div>
            <div className="Record_InfoBox_Right font30">
              <div className="Record_InfoBox_Blank"></div>
              {musicRank && (
                <>
                  <div className="Record_InfoBox_Row_Result">
                    <div className="Record_InfoBox_Row_Left">▶ 정확도 랭크 </div>
                    <div className="Record_InfoBox_Row_Right">{musicRank.rank}</div>
                  </div>
                  <div className="Record_InfoBox_Row_Result" style={{ color: "#f0f03d" }}>
                    <div className="Record_InfoBox_Row_Left">▶ 정확도 </div>
                    <div className="Record_InfoBox_Row_Right">{musicRank.percent}%</div>
                  </div>
                  <div className="Record_InfoBox_Row_Result"></div>
                  <div
                    className="Record_InfoBox_Row_Result"
                    style={{ color: "rgb(253, 202, 109)" }}
                  >
                    <div className="Record_InfoBox_Row_Left">◆ 스코어 </div>
                    <div className="Record_InfoBox_Row_Right">{musicRank.score}</div>
                  </div>
                  <div className="Record_InfoBox_Row_Result">
                    <div className="Record_InfoBox_Row_Left">▷ 스텔라 </div>
                    <div className="Record_InfoBox_Row_Right">{musicRank.stella}</div>
                  </div>
                  <div className="Record_InfoBox_Row_Result">
                    <div className="Record_InfoBox_Row_Left">▷ 퍼펙트 </div>
                    <div className="Record_InfoBox_Row_Right">{musicRank.perfect}</div>
                  </div>
                  <div className="Record_InfoBox_Row_Result">
                    <div className="Record_InfoBox_Row_Left">▷ 굳 </div>
                    <div className="Record_InfoBox_Row_Right">{musicRank.good}</div>
                  </div>
                  <div className="Record_InfoBox_Row_Result">
                    <div className="Record_InfoBox_Row_Left">▷ 배드 </div>
                    <div className="Record_InfoBox_Row_Right">{musicRank.bad}</div>
                  </div>
                  <div className="Record_InfoBox_Row_Result">
                    <div className="Record_InfoBox_Row_Left">▷ 미스 </div>
                    <div className="Record_InfoBox_Row_Right">{musicRank.miss}</div>
                  </div>
                  <div className="Record_InfoBox_Row_Result"></div>
                  <div className="Record_InfoBox_Row_Result">
                    <div className="Record_InfoBox_Row_Left">◎ 갱신날짜 </div>
                    <div className="Record_InfoBox_Row_Right">{musicRank.saveDate}</div>
                  </div>
                  <div className="Record_InfoBox_Row_Result">
                    <div className="Record_InfoBox_Row_Left">◎ 배속 </div>
                    <div className="Record_InfoBox_Row_Right">x {musicRank.speed}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      {renderLoading()}
    </div>
  );
};
