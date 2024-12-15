import { useEffect, useRef, useState } from "react";
import "./Rank.css";
import { AnimatePresence, motion } from "framer-motion";
import { RankUserList } from "./RankUserList/RankUserList";
import { RankUserInfo } from "./RankUserInfo/RankUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { fnData } from "../../../common/Base";
import { getRank, getRank_2 } from "../../../RestApi";
import { closeLoading, openLoading } from "../../../Store/LoadingSlice";
import { RankUserInfo2 } from "./RankUserInfo/RankUserInfo2";
import { RankUserList2 } from "./RankUserList/RankUserList2";

export const Rank = () => {
  const dispatch = useDispatch();
  const [rankMap, setRankMap] = useState();
  const [rankList, setRankList] = useState();
  const [nowList, setNowList] = useState();

  const musicMap = useSelector((state) => state.musicMap.value);
  const data = useSelector((state) => state.data.value);
  const level = useSelector((state) => state.level.value);
  const categoryCnt = useSelector((state) => state.category.value);
  const season = useSelector((state) => state.season.value);
  const musicList = data.musicList;
  // const noteList = data.noteList;
  const singerList = data.singerList;

  const keyType = fnData("keyType");
  const focusFlag = useRef();

  const get_RankList = async () => {
    let musicCnt = 0;
    if (keyType === 4) {
      musicCnt = fnData("lastMusicCnt_4");
    } else if (keyType === 7) {
      musicCnt = fnData("lastMusicCnt_7");
    }

    const temp = { keyType: keyType, musicCnt: musicCnt, season: season };

    if (season === 1) {
      const res = await getRank(temp);

      setRankList(res);
    } else if (season === 2) {
      const res = await getRank_2(temp);

      setRankList(res);
    }
  };
  //시즌 변경시

  useEffect(() => {
    get_RankList();
  }, [musicMap, season]);
  useEffect(() => {
    if (rankList) {
      dispatch(closeLoading());
    } else {
      dispatch(openLoading());
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
              {season === 1 ? (
                <RankUserInfo
                  rankMap={rankMap}
                  musicMap={musicMap}
                  level={level}
                  keyType={keyType}
                  musicList={musicList}
                  singerList={singerList}
                />
              ) : (
                <RankUserInfo2
                  rankMap={rankMap}
                  musicMap={musicMap}
                  level={level}
                  keyType={keyType}
                  musicList={musicList}
                  singerList={singerList}
                />
              )}
            </motion.div>

            <motion.div
              className="Rank_Ranking"
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            >
              {season === 1 ? (
                <RankUserList
                  nowList={nowList}
                  season={season}
                  rankMap={rankMap}
                  setRankMap={setRankMap}
                  setRankList={setRankList}
                  setNowList={setNowList}
                />
              ) : (
                <RankUserList2
                  nowList={nowList}
                  season={season}
                  rankMap={rankMap}
                  setRankMap={setRankMap}
                  setRankList={setRankList}
                  setNowList={setNowList}
                />
              )}
            </motion.div>
          </div>
        </>
      </AnimatePresence>
      <div className="Rank_Bottom"></div>
    </div>
  );
};
