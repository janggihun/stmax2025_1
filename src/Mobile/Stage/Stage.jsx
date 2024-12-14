import { useNavigate } from "react-router-dom";
import style from "./Stage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fnData, lastMusicCnt, valUserId } from "../../common/Base";
import { changeKeyType } from "../../Store/KeyTypeSlice";
import { changeLevel } from "../../Store/LevelSlice";
import { changeCategory } from "../../Store/CategorySlice";
import { changePage } from "../../Store/PageSlice";
import { StelliveList } from "../../common/Array";
import { useLoading } from "../../UseHook/Loading/Loading";
import { useEffect } from "react";
import { get_initMusic } from "../../RestApi";
import { changeDatailList, initDataList } from "../../Store/DataSlice";
import { changeMusicMap } from "../../Store/MusicMapSlice";
import { musicListColor } from "../mobileCss";
import { motion } from "framer-motion";
export const Stage = () => {
  //키보드 푸시 이벤트
  //로그인 확인후 페이지설정
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const keyType = useSelector((state) => state.keyType.value);
  const level = useSelector((state) => state.level.value);
  // const musicMap = useSelector((state) => state.musicMap.value);
  const category = useSelector((state) => state.category.value);
  const page = useSelector((state) => state.page.value);
  const data = useSelector((state) => state.data.value);
  //데이터 없으면 넣기
  if (!keyType) dispatch(changeKeyType(fnData("keyType")));
  if (!level) dispatch(changeLevel(fnData("level")));
  if (!category) dispatch(changeCategory(StelliveList[0]));
  if (!page) dispatch(changePage(1));

  //로딩모달
  const { openLoading, closeLoading, renderLoading } = useLoading();

  //로그인 확인후 페이지설정
  useEffect(() => {
    valUserId(navigate);
  }, []);

  const getInitData = async () => {
    openLoading();
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

    closeLoading();
  };

  useEffect(() => {
    getInitData();
  }, [keyType]);
  const renderMusicList = () => {
    if (data) {
      const musicList = data.musicList;

      return (
        <div>
          {musicList.map((el) => {
            return (
              <motion.div
                style={{
                  height: "50px",
                  backgroundColor: "white",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.93 }}
                  whileHover={{ scale: 0.95 }}
                  style={{ backgroundColor: musicListColor, height: "100%", color: "white" }}
                >
                  {el.title}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      );
    }
  };
  return (
    <>
      <div className={style.StageContainer}>
        <div style={{ width: "100%", height: "60px" }}></div>
        <div className={style.StageBox}>
          <div>{renderMusicList()}</div>
        </div>
      </div>
      {renderLoading()}
    </>
  );
};
