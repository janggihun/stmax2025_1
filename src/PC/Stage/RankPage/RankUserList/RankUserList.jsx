import "./RankUserList.css";
import "../../../../style/Scroll.css";
import { useEffect, useRef } from "react";
import { get_Src_Img, rankCheck } from "../../../../common/Base";
import { useDispatch } from "react-redux";

export const RankUserList = (props) => {
  const userId = window.localStorage.getItem("userId");
  const rankMap = props.rankMap;

  const rankList = props.nowList;
  const scrollFlag = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (scrollFlag.current) {
      scrollFlag.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [rankList]);
  const clickRank = (data) => {
    props.setRankMap(data);
  };
  const fnRecordCnt = () => {
    return rankMap.recordCnt;
  };

  return (
    <>
      <div className="RankUserList_Top">
        <div className="RankUserList_MusicSeasonBox">
          <div className="RankUserList_MusicSeasonBox_detail sort" style={{ color: "white" }}>
            시즌1
          </div>
          <div className="RankUserList_MusicSeasonBox_detail sort">시즌2</div>
        </div>
        <div className="RankUserList_MusicInfo1">UserInfo</div>
      </div>
      {!rankList && <div>데이터가 없습니다.</div>}
      {rankList && (
        <>
          <div className="RankUser_Container scrollBar" ref={scrollFlag}>
            {rankList &&
              rankList.map((el, i) => {
                return (
                  <div
                    key={i}
                    className={
                      el.userId.toUpperCase() === userId.toUpperCase()
                        ? "RankUser_Row_My"
                        : "RankUser_Row"
                    }
                    style={fnRecordCnt() === el.recordCnt ? { border: "3px solid white" } : {}}
                    onClick={() => {
                      clickRank(el);
                    }}
                  >
                    <div className="RankUser_Rank">
                      <div>{i + 1}</div>
                    </div>
                    <div className="RankUser_Img">
                      <img
                        className="RankUser_Img_Status"
                        src={el.emoticon ? get_Src_Img(el.emoticon) : get_Src_Img("STLcircle")}
                        alt="선택없음"
                      />
                    </div>
                    <div className="RankUser_Bar"></div>
                    <div className="RankUser_Blank"></div>
                    <div className="RankUser_UserLevel">Lv.{el.userLevel}</div>
                    <div
                      style={el.color ? { color: el.color } : {}}
                      className={el.userId === userId ? "RankUser_title" : "RankUser_title_not"}
                    >
                      {el.titleName && el.titleName}
                    </div>
                    <div className="RankUser_UserId">{el.userId}</div>
                    {el.miss === 0 ? (
                      <div className="RankUser_Blank2 ShowRank_AllCombo"> All Combo</div>
                    ) : (
                      <div className="RankUser_Blank2"></div>
                    )}

                    <div className={el.percent >= 95 ? "RankUser_Judge_S" : "RankUser_Judge"}>
                      {rankCheck(el.percent)}
                    </div>
                    <div className="RankUser_date">{el.saveDate.substring(0, 10)}</div>
                    <div className="RankUser_Score">{el.score}</div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};
