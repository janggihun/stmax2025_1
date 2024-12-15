import { useEffect } from "react";
import { Footer } from "../Inc/Footer";
import { Header } from "../Inc/Header";
import { STMAX } from "./Stmax/Stmax";
import { useDispatch, useSelector } from "react-redux";
import { get_initMusic } from "../../RestApi";
import { changeDatailList, initDataList } from "../../Store/DataSlice";
import { changeMusicMap } from "../../Store/MusicMapSlice";
import { useLoading } from "../../UseHook/Loading/Loading";
import { UseYoutube } from "../../UseHook/Youtube/useYoutube";
import { fnData, lastMusicCnt, valUserId } from "../../common/Base";
import { changeLevel } from "../../Store/LevelSlice";
import { changeKeyType } from "../../Store/KeyTypeSlice";
import { changeCategory } from "../../Store/CategorySlice";
import { StelliveList } from "../../common/Array";
import { changePage } from "../../Store/PageSlice";
import { AnimatePresence } from "framer-motion";
import { Setting_4key } from "./Setting/Setting_4";
import { Setting_7key } from "./Setting/Setting_7";
import { useKeyBoard } from "../../UseHook/KeyBoardEvent/useKeyBoard";
import { Rank } from "./RankPage/Rank";
import { useNavigate } from "react-router-dom";
import { Notice } from "./Notice/Notice";
import { Record } from "./Record/Record";
import { Tutorial } from "./Tutorial/Tutorial";

import { MyCha } from "./Charater/MyCha";
import { MyTitle } from "./Title/MyTitle";
import { closeLoading, openLoading } from "../../Store/LoadingSlice";

//스테이지
export const Stage = () => {
  //초기 임포트
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 초기값

  //키타입
  const keyType = useSelector((state) => state.keyType.value);

  //레벨
  const level = useSelector((state) => state.level.value);

  //카테고리
  const category = useSelector((state) => state.category.value);

  //페이지번호
  const page = useSelector((state) => state.page.value);

  //데이터 없으면 넣기
  if (!keyType) dispatch(changeKeyType(fnData("keyType")));
  if (!level) dispatch(changeLevel(fnData("level")));
  if (!category) dispatch(changeCategory(StelliveList[0]));
  if (!page) dispatch(changePage(1));

  //페이지 번호에 따라서 키보드 이벤트발생을 조절한다.
  useKeyBoard();

  //로그인 확인후 페이지설정
  useEffect(() => {
    valUserId(navigate);
  }, []);

  const getInitData = async () => {
    dispatch(openLoading());
    if (keyType) {
      const res_Data = await get_initMusic(keyType);

      const musicCnt = lastMusicCnt();

      const returnIndex = res_Data.musicList.findIndex((el) => {
        if (el.musicCnt === musicCnt) {
          return true;
        }
      });

      dispatch(initDataList(res_Data));
      dispatch(changeDatailList(res_Data.musicList));
      dispatch(changeMusicMap(res_Data.musicList[returnIndex]));
    }

    dispatch(closeLoading());
  };

  useEffect(() => {
    getInitData();
  }, [keyType]);

  return (
    <AnimatePresence>
      <UseYoutube />
      <div className="Base_container">
        {page === 1 && <STMAX />}
        {page === 2 && <Rank />}
        {page === 5 && keyType === 4 && <Setting_4key />}
        {page === 5 && keyType === 7 && <Setting_7key />}
        {page === 6 && <Notice />}
        {page === 7 && <Tutorial />}
        {page === 8 && <MyTitle />}
        {page === 9 && <Record />}
        {page === 10 && <MyCha />}
        <Header />
        <Footer />
      </div>
    </AnimatePresence>
  );
};
