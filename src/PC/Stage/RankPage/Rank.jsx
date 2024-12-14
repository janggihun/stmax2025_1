import { useEffect, useRef, useState } from "react";
import "./Rank.css";
import { AnimatePresence, motion } from "framer-motion";
import { RankUserList } from "./RankUserList/RankUserList";
import { RankUserInfo } from "./RankUserInfo/RankUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { fnData } from "../../../common/Base";
import { getRank } from "../../../RestApi";
import { useLoading } from "../../../UseHook/Loading/Loading";

export const Rank = () => {
  const [rankMap, setRankMap] = useState();
  const [rankList, setRankList] = useState();
  const [nowList, setNowList] = useState();

  const musicMap = useSelector((state) => state.musicMap.value);
  const data = useSelector((state) => state.data.value);
  const level = useSelector((state) => state.level.value);
  const categoryCnt = useSelector((state) => state.category.value);

  const musicList = data.musicList;
  // const noteList = data.noteList;
  const singerList = data.singerList;

  const keyType = fnData("keyType");
  const focusFlag = useRef();
  //로딩모달
  const { openLoading, closeLoading, renderLoading } = useLoading();
  const get_RankList = async () => {
    setRankList(false);
    let musicCnt = 0;
    if (keyType === 4) {
      musicCnt = fnData("lastMusicCnt_4");
    } else if (keyType === 7) {
      musicCnt = fnData("lastMusicCnt_7");
    }
    const temp = { keyType: keyType, musicCnt: musicCnt };
    const res = await getRank(temp);

    setRankList(res);
  };
  useEffect(() => {
    get_RankList();
  }, [musicMap]);
  useEffect(() => {
    if (rankList) {
      closeLoading();
    } else {
      openLoading();
    }
  }, [rankList]);
  useEffect(() => {
    get_RankList();
  }, []);
  useEffect(() => {
    //난이도 변경시 전체 리스트와 한개의 맵을 usestate에 저장

    if (rankList) {
      const musicRankList = rankList.filter((el) => {
        if (el.level === level) {
          return true;
        }
      });

      setRankMap(musicRankList[0]);
      setNowList(musicRankList);
    }
  }, [level, musicMap, rankList]);

  return (
    <div className="RankContainer">
      <AnimatePresence>
        <>
          <div className="Rank_Top" ref={focusFlag}></div>
          <div className="Rank_Body">
            <motion.div
              className="Rank_MyInfo"
              initial={{ x: -500 }}
              animate={{ x: 0 }}
              exit={{ x: -500 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            >
              <RankUserInfo
                rankMap={rankMap}
                musicMap={musicMap}
                level={level}
                keyType={keyType}
                musicList={musicList}
                // noteList={noteList}
                singerList={singerList}
              />
            </motion.div>

            <motion.div
              className="Rank_Ranking"
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            >
              <RankUserList nowList={nowList} rankMap={rankMap} setRankMap={setRankMap} />
            </motion.div>
          </div>
        </>

        {renderLoading()}
      </AnimatePresence>
      <div className="Rank_Bottom"></div>
    </div>
  );
};
